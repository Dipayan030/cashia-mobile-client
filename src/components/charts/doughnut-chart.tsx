import { Text } from '@/components/ui/text';
import { useColor } from '@/hooks/useColor';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, Pressable, View, ViewStyle } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';

// Animated SVG Components
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type AnimatedSliceProps = {
  d: string;
  fill: string;
  animationProgress: SharedValue<number>;
  isSelected: boolean;
  hasSelection: boolean;
  onPress: () => void;
  accessibilityLabel: string;
  // A single 100%-share slice makes the arc's start/end points coincide,
  // which SVG's arc command can't draw — render a stroked ring instead.
  fullRing?: {
    cx: number;
    cy: number;
    meanRadius: number;
    strokeWidth: number;
  };
};

// Per-item hook must live in its own mounted subcomponent, not in the
// parent's .map() body — calling useAnimatedProps per loop iteration
// violates Rules of Hooks the moment data.length changes.
const AnimatedSlice = React.memo(
  ({
    d,
    fill,
    animationProgress,
    fullRing,
    isSelected,
    hasSelection,
    onPress,
    accessibilityLabel,
  }: AnimatedSliceProps) => {
    const sliceAnimatedProps = useAnimatedProps(() => ({
      opacity: animationProgress.value * (hasSelection && !isSelected ? 0.3 : 1),
    }));

    if (fullRing) {
      return (
        <AnimatedCircle
          cx={fullRing.cx}
          cy={fullRing.cy}
          r={fullRing.meanRadius}
          fill='none'
          stroke={fill}
          strokeWidth={fullRing.strokeWidth + (isSelected ? 3 : 0)}
          accessible
          accessibilityLabel={`${accessibilityLabel}${isSelected ? ', selected' : ''}`}
          onPress={onPress}
          animatedProps={sliceAnimatedProps}
        />
      );
    }

    return (
      <AnimatedPath
        d={d}
        fill={fill}
        stroke={isSelected ? '#FFFFFF' : undefined}
        strokeWidth={isSelected ? 3 : 0}
        accessible
        accessibilityLabel={`${accessibilityLabel}${isSelected ? ', selected' : ''}`}
        onPress={onPress}
        animatedProps={sliceAnimatedProps}
      />
    );
  }
);

AnimatedSlice.displayName = 'AnimatedSlice';

interface ChartConfig {
  width?: number;
  height?: number;
  showLabels?: boolean;
  animated?: boolean;
  duration?: number;
  innerRadius?: number;
}

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

type Props = {
  data: ChartDataPoint[];
  config?: ChartConfig;
  style?: ViewStyle;
};

export const DoughnutChart = ({ data, config = {}, style }: Props) => {
  const [containerWidth, setContainerWidth] = useState(300);

  const {
    height = 200,
    showLabels = true,
    animated = true,
    duration = 1000,
    innerRadius = 0.5, // Default inner radius as ratio of outer radius
  } = config;

  const chartWidth = containerWidth || config.width || 300;

  const primaryColor = useColor('primary');
  const textColor = useColor('text');
  const mutedColor = useColor('textMuted');
  const colors = [
    primaryColor,
    useColor('blue'),
    useColor('green'),
    useColor('orange'),
    useColor('purple'),
    useColor('pink'),
  ];

  const animationProgress = useSharedValue(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width: measuredWidth } = event.nativeEvent.layout;
    if (measuredWidth > 0) {
      setContainerWidth(measuredWidth);
    }
  };

  useEffect(() => {
    if (animated) {
      animationProgress.value = withTiming(1, { duration });
    } else {
      animationProgress.value = 1;
    }
  }, [data, animated, duration, animationProgress]);

  if (!data.length) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  if (total === 0) return null;

  const outerRadius = Math.min(chartWidth, height) / 2 - 20;
  const clampedInnerRadius = Math.max(0, Math.min(0.95, innerRadius));
  const innerRadiusValue = outerRadius * clampedInnerRadius;
  const centerX = chartWidth / 2;
  const centerY = height / 2;

  return (
    <View
      style={[{ width: '100%' }, style]}
      onLayout={handleLayout}
      accessibilityLabel={`Doughnut chart with ${data.length} slices, total ${Math.round(total)}`}
    >
      <Svg width={chartWidth} height={height}>
        {data.map((item, index) => {
          const sliceAngle = (item.value / total) * 2 * Math.PI;
          const previousValue = data
            .slice(0, index)
            .reduce((sum, previousItem) => sum + previousItem.value, 0);
          const startAngle = -Math.PI / 2 + (previousValue / total) * 2 * Math.PI;
          const endAngle = startAngle + sliceAngle;

          const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

          // Outer arc points
          const x1 = centerX + outerRadius * Math.cos(startAngle);
          const y1 = centerY + outerRadius * Math.sin(startAngle);
          const x2 = centerX + outerRadius * Math.cos(endAngle);
          const y2 = centerY + outerRadius * Math.sin(endAngle);

          // Inner arc points
          const x3 = centerX + innerRadiusValue * Math.cos(endAngle);
          const y3 = centerY + innerRadiusValue * Math.sin(endAngle);
          const x4 = centerX + innerRadiusValue * Math.cos(startAngle);
          const y4 = centerY + innerRadiusValue * Math.sin(startAngle);

          const pathData = [
            `M ${x1} ${y1}`,
            `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `L ${x3} ${y3}`,
            `A ${innerRadiusValue} ${innerRadiusValue} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
            'Z',
          ].join(' ');

          // Label position
          const labelAngle = startAngle + sliceAngle / 2;
          const labelRadius = (outerRadius + innerRadiusValue) / 2;
          const labelX = centerX + labelRadius * Math.cos(labelAngle);
          const labelY = centerY + labelRadius * Math.sin(labelAngle);

          // A single slice spanning the full circle (only one item, or every
          // other item has a value of 0) has coincident arc start/end points.
          const isFullCircle = sliceAngle >= 2 * Math.PI - 1e-6;

          return (
            <G key={`slice-${index}`}>
              <AnimatedSlice
                d={pathData}
                fill={item.color || colors[index % colors.length]}
                animationProgress={animationProgress}
                isSelected={selectedIndex === index}
                hasSelection={selectedIndex !== null}
                onPress={() =>
                  setSelectedIndex((current) => current === index ? null : index)
                }
                accessibilityLabel={`${item.label}: ${item.value}, ${Math.round((item.value / total) * 100)} percent`}
                fullRing={
                  isFullCircle
                    ? {
                        cx: centerX,
                        cy: centerY,
                        meanRadius: (outerRadius + innerRadiusValue) / 2,
                        strokeWidth: outerRadius - innerRadiusValue,
                      }
                    : undefined
                }
              />

              {showLabels && (
                <SvgText
                  x={labelX}
                  y={labelY}
                  textAnchor='middle'
                  fontSize={12}
                  fill='#FFFFFF'
                  fontWeight='600'
                >
                  {Math.round((item.value / total) * 100)}%
                </SvgText>
              )}
            </G>
          );
        })}
        <SvgText
          x={centerX}
          y={centerY - 4}
          textAnchor='middle'
          fontSize={12}
          fill={mutedColor}
        >
          Total spent
        </SvgText>
        <SvgText
          x={centerX}
          y={centerY + 19}
          textAnchor='middle'
          fontSize={18}
          fontWeight='700'
          fill={textColor}
        >
          {total.toLocaleString()}
        </SvgText>
      </Svg>

      {/* Legend */}
      {/* <View style={{ marginTop: 10 }}>
        {data.map((item, index) => (
          <Pressable
            key={`legend-${index}`}
            onPress={() =>
              setSelectedIndex((current) => current === index ? null : index)
            }
            accessibilityRole='button'
            accessibilityLabel={`${item.label}: ${item.value}`}
            accessibilityState={{ selected: selectedIndex === index }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
              opacity: selectedIndex !== null && selectedIndex !== index ? 0.45 : 1,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: item.color || colors[index % colors.length],
                marginRight: 8,
              }}
            />
            <Text
              variant='caption'
              style={{ fontWeight: selectedIndex === index ? '700' : '400' }}
            >
              {item.label}: {item.value}
            </Text>
          </Pressable>
        ))}
      </View> */}
    </View>
  );
};

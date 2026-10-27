import { useColor } from '@/hooks/useColor';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

type Props = {
  title: string;
};

export default function MainTabPlaceholder({ title }: Props) {
  const backgroundColor = useColor('background');
  const textColor = useColor('foreground');
  const mutedColor = useColor('mutedForeground');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }} className="px-6 py-6">
      <View className="flex-1 justify-center items-center">
        <Text style={{ color: textColor }} className="font-inter text-2xl">
          {title}
        </Text>
        <Text style={{ color: mutedColor }} className="font-inter mt-2">
          Coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
}

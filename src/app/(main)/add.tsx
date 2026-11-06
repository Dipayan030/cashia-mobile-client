import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import NumPad from '@/components/NumPad';
import { TextInput } from 'react-native-gesture-handler';

function LogTypeTab({
  logType,
  selected,
  onPress,
}: {
  logType: string;
  selected: boolean;
  onPress: () => void;
}) {
  const highlightOpacity = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(highlightOpacity, {
      toValue: selected ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [highlightOpacity, selected]);

  return (
    <Pressable
      className="relative rounded-full px-4 py-2"
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected }}
    >
      <Animated.View
        className="absolute inset-0 rounded-full bg-lime-300"
        style={{ opacity: highlightOpacity }}
        pointerEvents="none"
      />
      <Text className="font-inter">{logType}</Text>
    </Pressable>
  );
}

export default function AddScreen() {
  const [selectedLogType, setSelectedLogType] = useState('Expense');
  const [selectedCategory, setSelectedCategory] = useState('Manual');
  const logTypes = ['Expense', 'Deposite'];
  const categories = [
    { name: 'Manual', icon: 'pen-to-square' },
    { name: 'Scan', icon: 'camera' },
    { name: 'Voice', icon: 'microphone' }
  ] as const;
  const [ num, setNum ] = useState('0');
  
  const enterNumber = ( currNum: string ) => {
    if(currNum === 'enter'){
      // Number(num);
    } else if(currNum === 'delete') {
      setNum(num.slice(0,-1));
    } else {
      setNum(num+currNum);
    }
  } 

  return (
    <SafeAreaView className="flex flex-col bg-indigo-50 pt-6 pb-32 h-full">
        <StatusBar></StatusBar>
        <Header marginX='mx-6'/>
        <View className='flex flex-row justify-center items-start mt-4 gap-2'>
          <View className='flex flex-row bg-white rounded-full p-1'>
            {logTypes.map((logType) => (
              <LogTypeTab
                key={logType}
                logType={logType}
                selected={selectedLogType === logType}
                onPress={() => setSelectedLogType(logType)}
              />
            ))}
          </View>
          <View className='flex flex-row bg-white rounded-full p-1'>
            {categories.map((category) => {
              const selected = selectedCategory === category.name;

              return (
                <Pressable
                  key={category.name}
                  className={`w-12 h-12 rounded-full items-center justify-center ${selected ? 'bg-lime-300' : ''}`}
                  onPress={() => setSelectedCategory(category.name)}
                  accessibilityRole="tab"
                  accessibilityLabel={category.name}
                  accessibilityState={{ selected }}
                >
                  <FontAwesome6
                    name={category.icon}
                    size={18}
                    color={selected ? '#365314' : '#64748b'}
                  />
                </Pressable>
              );
            })}
          </View>
        </View>
        <View className='flex-1 justify-end items-center'>
          <View className='px-3 min-w-60 h-16 mx-24 bg-green-950/5 border-b-2 border-b-lime-400 rounded-lg flex flex-row items-center justify-center'>
            <Text className='text-green-950 font-roboto-mono text-3xl'>{num}</Text>
          </View>
          <TextInput 
            className='mx-12 mt-6 text-green-950 text-center text-2xl min-w-36'
            placeholder='Note' 
            placeholderTextColor="#64748b"
          />
          <Text className='text-lg text-green-950/40 mb-6'>Transportation</Text>
          <NumPad onKeyPress={enterNumber}></NumPad>
        </View>
    </SafeAreaView>
  );
}

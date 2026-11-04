import React from 'react'
import { Pressable, View, Text } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Feather from '@expo/vector-icons/Feather';

interface NumpadProps {
  onKeyPress: ( value: string ) => void;
}

function NumPad({ onKeyPress }: NumpadProps) {
  const keys = [['1','2','3'],['4','5','6'],['7','8','9']];

  return (
    <View className="flex flex-col items-center gap-4 pt-4">
      {[0,1,2].map((row) => (
        <View key={row} className='flex flex-row gap-4'>
          {keys[row].map((num) => (
            <Pressable key={num} onPress={() => onKeyPress(num)} className='h-12 w-24 rounded-full flex justify-center items-center bg-green-950/5'>
              <Text className='text-green-950 font-roboto-mono'>{num}</Text>
            </Pressable>
          ))}
        </View>
      ))}
      <View className='flex flex-row gap-4'>
        <Pressable onPress={() => onKeyPress('enter')} key={'enter'} className='h-12 w-24 rounded-full flex justify-center items-center bg-green-950/5'>
          <Feather name="arrow-right" size={18} color="black" />
        </Pressable>
        <Pressable onPress={() => onKeyPress('0')} key={'0'} className='h-12 w-24 rounded-full flex justify-center items-center bg-green-950/5'>
          <Text className='text-green-950 font-roboto-mono'>0</Text>
        </Pressable>
        <Pressable onPress={() => onKeyPress('delete')} key={'delete'} className='h-12 w-24 rounded-full flex justify-center items-center bg-green-950/5'>
          <Feather name="delete" size={18} color="black" />
        </Pressable>
      </View>
    </View>
  )
}

export default NumPad
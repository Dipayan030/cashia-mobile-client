import React from 'react'
import { Pressable, View, Text } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

function NumPad() {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'cross', '0', 'enter']

  return (
    <View className="items-center gap-3">
      {[0, 1, 2, 3].map((row) => (
        <View key={row} className="flex-row gap-3">
          {keys.slice(row * 3, row * 3 + 3).map((key) => (
            <Pressable
              key={key}
              className="h-16 w-24 items-center justify-center rounded-full bg-green-950/5"
              accessibilityRole="button"
              accessibilityLabel={key === 'cross' ? 'Clear' : key === 'enter' ? 'Enter' : key}
            >
              {key === 'cross' || key === 'enter' ? (
                <FontAwesome6
                  name={key === 'cross' ? 'xmark' : 'arrow-right'}
                  size={20}
                  color="#14532d"
                />
              ) : (
                <Text className="text-xl font-roboto-mono text-green-950">{key}</Text>
              )}
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  )
}

export default NumPad
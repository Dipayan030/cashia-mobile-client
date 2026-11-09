import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import NumPad from '@/components/NumPad';
import { TextInput } from 'react-native-gesture-handler';

export default function AddScreen() {
  const [ selectedLogType, setSelectedLogType ] = useState('Expense');
  const [ note, setNote ] = useState('');
  const [ error, setError ] = useState< null|string >(null);
  const logTypes = ['Expense', 'Deposite'];
  const [ amount, setAmount ] = useState('0');
  
  const enterNumber = ( currNum: string ) => {
    if(currNum === 'enter'){
      Number(amount);
      if(note==''){
        setError('Please add a note');
      } else if(note!=''){
        setError(null);
      }
    } else if(currNum === 'delete') {
      setAmount(amount.slice(0,-1));
    } else if(amount=='0') {
      setAmount(currNum);
    } else {
      setAmount(amount+currNum);
    }
  } 

  return (
    <SafeAreaView className="flex flex-col bg-indigo-50 pt-6 pb-32 h-full">
        <StatusBar></StatusBar>
        <Header marginX='mx-6'/>
        <View className='flex flex-row justify-center items-start mt-4 gap-2'>
          <View className='flex flex-row bg-white rounded-full p-1'>
            {logTypes.map((type) => {
              const selected = selectedLogType === type;
              return (
                <Pressable
                  key={type}
                  className={`h-12 px-4 rounded-full items-center justify-center ${selected ? 'bg-lime-300' : ''}`}
                  onPress={() => setSelectedLogType(type)}
                  accessibilityRole="tab"
                  accessibilityLabel={type}
                  accessibilityState={{ selected }}
                >
                  <Text className='font-inter text-green-950'>{type}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
        <View className='flex-1 justify-end items-center'>
          <View className='px-3 min-w-60 h-16 mx-24 bg-green-950/5 border-b-2 border-b-lime-400 rounded-lg flex flex-row items-center justify-center'>
            <Text className='text-green-950 font-roboto-mono text-3xl'>{amount}</Text>
          </View>
          <TextInput 
            className='mx-12 mt-6 text-green-950 text-center text-2xl min-w-36'
            placeholder='Note' 
            placeholderTextColor="#64748b"
            onChangeText={(text) => setNote(text)}
          />
          {error? 
            <Text className='text-lg text-inter text-rose-500 mb-6'>{error}</Text>
          :
            <Text className='text-lg text-inter text-green-950/40 mb-6'>Transportation</Text>
          }
          <NumPad onKeyPress={enterNumber}></NumPad>
        </View>
    </SafeAreaView>
  );
}

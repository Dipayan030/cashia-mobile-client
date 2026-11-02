import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import Header from '@/components/Header';
import { Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { AreaChart } from '@/components/charts/area-chart';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { useColor } from '@/hooks/useColor';
import { StatusBar } from 'expo-status-bar';
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function HomeScreen() {
  const color = useColor('lime');

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert('Error signing out', error.message);
  };

  const data = [
    { x: 'Mon', y: 100, label: 'Mon' },
    { x: 'Feb', y: 120, label: 'Tue' },
    { x: 'Mar', y: 110, label: 'Wed' },
    { x: 'Apr', y: 130, label: 'Thu' },
    { x: 'May', y: 100, label: 'Fri' },
    { x: 'May', y: 110, label: 'Sat' },
    { x: 'May', y: 105, label: 'Sun' },
  ];

  return (
    <SafeAreaView className="flex flex-col bg-indigo-50 justify-between py-6">
      <StatusBar></StatusBar>
      <Header marginX={'mx-6'}/>
      <View className='px-6 mt-4'>
        <View className='bg-emerald-900 p-6 flex flex-col gap-6 rounded-2xl'>
          <View className='flex flex-row justify-between'>
            <Text className='text-white/50 font-inter'>Current Balance</Text>
            {/* <Pressable className='h-10 w-10 rounded-full bg-lime-300 flex justify-center items-center'>
              <Feather name="arrow-up-right" size={24} color="black" />
            </Pressable> */}
          </View>
          <View className='flex flex-row gap-1'><Text className='font-roboto-mono-medium text-5xl text-white'>₹4500.00</Text></View>
        </View>
      </View>
      <ScrollView className='flex-grow mt-6 bg-white rounded-t-[2rem] px-8 py-6 '>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="flex-grow pb-40">
          <View className='bg-white flex flex-col rounded-xl mt-6'>
            <Text className='text-green-950 font-inter text-lg mb-4'>Spendings</Text>
            <View className="flex flex-row justify-between items-center">
              <View className='flex flex-row'>
                <Text className='font-roboto-mono-medium text-green-950 text-3xl'>2000.00</Text>
                <Text className='font-inter text-xs text-green-950 mt-1 ml-1'>INR</Text>
              </View>
              <Pressable className='w-24 py-2 bg-green-950/5 rounded-full flex flex-row items-center justify-center'> 
                <Text className='text-green-950/40 text-xs'>7 Days</Text>
                <EvilIcons name="chevron-down" size={18} color="#1a2e0566" />
              </Pressable>
            </View>
            <AreaChart
              data={data}
              style={{
                borderColor: color,
                outlineColor: color,
              }}
              config={{
                height: 200,
                showGrid: false,
                showLabels: true,
                animated: true,
                showYLabels: false
              }}
            />
          </View>
          <View className='py-6 bg-white rounded-xl mt-6 mb-40'>
            <View className='flex flex-row justify-between mb-4'>
              <Text className='text-green-950 font-inter text-lg'>Transactions</Text>
              <Pressable className='w-24 py-2 bg-green-950/5 rounded-full flex flex-row items-center justify-center'> 
                <Text className='text-green-950/40 text-xs'>See all</Text>
              </Pressable>
            </View>
            <View className='flex flex-col gap-4'>
              <View className='p-4 flex flex-row justify-between items-center bg-[#1a2e0505] rounded-2xl'>
                <View className='flex flex-row gap-4 items-center'>
                  <View className='p-3 bg-white rounded-full'>
                    <Ionicons name="fast-food-outline" size={24} color="#314158" />
                  </View>
                  <View>
                    <Text className='font-inter text-lg'>Dosa</Text>
                    <Text className='font-inter text-xs text-green-950/40'>Food</Text>
                  </View>
                </View>
                <Text className="font-roboto-mono-medium text-green-950/80 text-xl mr-4">-$60</Text>
              </View>
              <View className='p-4 flex flex-row justify-between items-center bg-[#1a2e0505] rounded-2xl'>
                <View className='flex flex-row gap-4 items-center'>
                  <View className='p-3 bg-white rounded-full'>
                    <Ionicons name="fast-food-outline" size={24} color="#314158" />
                  </View>
                  <View>
                    <Text className='font-inter text-lg'>Dosa</Text>
                    <Text className='font-inter text-xs text-green-950/40'>Food</Text>
                  </View>
                </View>
                <Text className="font-roboto-mono-medium text-green-950/80 text-xl mr-4">-$60</Text>
              </View>
              <View className='p-4 flex flex-row justify-between items-center bg-[#1a2e0505] rounded-2xl'>
                <View className='flex flex-row gap-4 items-center'>
                  <View className='p-3 bg-white rounded-full'>
                    <Ionicons name="fast-food-outline" size={24} color="#314158" />
                  </View>
                  <View>
                    <Text className='font-inter text-lg'>Dosa</Text>
                    <Text className='font-inter text-xs text-green-950/40'>Food</Text>
                  </View>
                </View>
                <Text className="font-roboto-mono-medium text-green-950/80 text-xl mr-4">-$60</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
      
      
      {/* <TouchableOpacity activeOpacity={0.8} onPress={handleSignOut} className="w-full bg-red-500/10 border border-red-500/20 h-14 rounded-xl items-center justify-center active:bg-red-500/20">
        <Text className="text-red-400 font-semibold text-base">Sign Out of Account</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

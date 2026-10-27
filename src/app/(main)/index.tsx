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

export default function HomeScreen() {
  const color = useColor('lime');

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert('Error signing out', error.message);
  };

  const data = [
    { x: 'Jan', y: 100, label: 'January' },
    { x: 'Feb', y: 120, label: 'February' },
    { x: 'Mar', y: 110, label: 'March' },
    { x: 'Apr', y: 130, label: 'April' },
    { x: 'May', y: 125, label: 'May' },
  ];

  return (
    <SafeAreaView className="flex flex-col bg-indigo-50 justify-between px-6 py-6">
      <StatusBar></StatusBar>
      <Header pageTitle='Dashboard'/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="flex-grow pb-40">
        <View className='bg-lime-300 p-6 flex flex-col gap-8 rounded-xl mt-6'>
          <View className='flex flex-row justify-between'>
            <Text className='text-green-950/80 font-inter'>Current Balance</Text>
            <Pressable className='h-10 w-10 rounded-full bg-green-950 flex justify-center items-center'>
              <Feather name="arrow-up-right" size={24} color="white" />
            </Pressable>
          </View>
          <View className='flex flex-row gap-1'><Text className='font-inter text-4xl text-green-950'>4500.00</Text><Text className='text-green-950 font-inter text-lg'>INR</Text></View>
        </View>
        <View className='p-6 bg-white flex flex-col rounded-xl mt-6'>
          <View className='flex flex-row justify-between'>
            <Text className='text-green-950/80 font-inter'>Spendings over last 4 days</Text>
            <Pressable className='h-10 w-10 rounded-full bg-lime-300 flex justify-center items-center'>
              <Feather name="arrow-up-right" size={24} color="#032e15" />
            </Pressable>
          </View>
          <View className="flex flex-row items-start"><Text className='font-inter text-green-950 text-2xl'>2000</Text><Text className='font-inter text-xs text-green-950 mt-1 ml-1'>INR</Text></View>
          <AreaChart
            data={data}
            style={{
              borderColor: color,
              outlineColor: color,
            }}
            config={{
              height: 200,
              showGrid: false,
              showLabels: false,
              animated: true,
              showYLabels: false
            }}
          />
        </View>
        <View className='p-6 bg-white rounded-xl mt-6'>
          <View className='flex flex-row justify-between'>
            <Text className='text-green-950/80 font-inter'>Transaction History</Text>
            <Pressable className='h-10 w-10 rounded-full bg-lime-300 flex justify-center items-center'>
              <Feather name="arrow-up-right" size={24} color="#032e15" />
            </Pressable>
          </View>
          <View className='flex flex-col '>
            <View className='py-3 flex flex-row justify-between items-center border-b border-slate-200'>
              <View className='flex flex-row gap-4 items-center'>
                <View className='p-3 bg-slate-100 rounded-full'>
                  <Ionicons name="fast-food-outline" size={24} color="#314158" />
                </View>
                <Text className='font-inter text-lg'>Dosa</Text>
              </View>
              <Text className="font-inter-medium text-rose-500 text-xl">-60</Text>
            </View>
            <View className='py-3 flex flex-row justify-between items-center border-b border-slate-200'>
              <View className='flex flex-row gap-4 items-center'>
                <View className='p-3 bg-slate-100 rounded-full'>
                  <MaterialIcons name="ondemand-video" size={24} color="#314158" />
                </View>
                <Text className='font-inter text-lg'>Spider-Man movie</Text>
              </View>
              <Text className="font-inter-medium text-rose-500 text-xl">-200</Text>
            </View>
            <View className='py-3 flex flex-row justify-between items-center border-b border-slate-200'>
              <View className='flex flex-row gap-4 items-center'>
                <View className='p-3 bg-slate-100 rounded-full'>
                  <MaterialIcons name="ondemand-video" size={24} color="#314158" />
                </View>
                <Text className='font-inter text-lg'>Spider-Man movie</Text>
              </View>
              <Text className="font-inter-medium text-rose-500 text-xl">-100</Text>
            </View>
            <View className='py-3 flex flex-row justify-between items-center border-b border-slate-200'>
              <View className='flex flex-row gap-4 items-center'>
                <View className='p-3 bg-slate-100 rounded-full'>
                  <MaterialIcons name="ondemand-video" size={24} color="#314158" />
                </View>
                <Text className='font-inter text-lg'>Spider-Man movie</Text>
              </View>
              <Text className="font-inter-medium text-rose-500 text-xl">-90</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* <TouchableOpacity activeOpacity={0.8} onPress={handleSignOut} className="w-full bg-red-500/10 border border-red-500/20 h-14 rounded-xl items-center justify-center active:bg-red-500/20">
        <Text className="text-red-400 font-semibold text-base">Sign Out of Account</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

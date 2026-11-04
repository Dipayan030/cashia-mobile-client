import MainTabPlaceholder from '@/components/MainTabPlaceholder';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import Header from '@/components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { StackedBarChart } from '@/components/charts/stacked-bar-chart';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { DoughnutChart } from '@/components/charts/doughnut-chart';
import { ProgressRingChart } from '@/components/charts/progress-ring-chart';

export default function AnalyticsScreen() {
  const barData = [
    { label: 'Q1', values: [120, 98, 70] },
    { label: 'Q2', values: [140, 110, 95] },
    { label: 'Q3', values: [160, 130, 105] },
  ];
  const categories = ['Sales', 'Marketing', 'Support'];
  const doughnoutData = [
    { label: 'Sales', value: 120 },
    { label: 'Marketing', value: 98 },
    { label: 'Support', value: 86 },
    { label: 'Development', value: 140 },
  ];
  
  return (
    <SafeAreaView className="flex flex-col bg-indigo-50 justify-between px-6 py-6">
      <StatusBar></StatusBar>
      <Header pageTitle='Analytics'/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="flex-grow pb-40">
        <View className="p-6 bg-white flex flex-col rounded-xl mt-6">
          <View className='flex flex-row justify-between'>
            <Text className='text-green-950/80 font-inter'>Spendings over last 4 days</Text>
          </View>
          <StackedBarChart
            data={barData}
            categories={categories}
            config={{
              height: 300,
              showLabels: true,
              animated: true,
              showGrid: false,
              padding: 40
            }}
          />
        </View>
        <View className="p-6 bg-white flex flex-col rounded-xl mt-6">
          <View className='flex flex-row justify-between'>
            <Text className='text-green-950/80 font-inter'>Spendings over last 4 days</Text>
          </View>
          <DoughnutChart
            data={doughnoutData}
            config={{
              height: 300,
              showLabels: true,
              animated: true,
              innerRadius: 0.5,
              width: 40,
            }}
          />
        </View>
        <View className="p-6 bg-white flex flex-col rounded-xl mt-6 gap-4">
          <View className='flex flex-row justify-between'>
            <Text className='text-green-950/80 font-inter'>Spendings over last 4 days</Text>
          </View>
          <ProgressRingChart
            progress={75}
            size={120}
            strokeWidth={12}
            config={{
              animated: true,
              duration: 1000,
              gradient: true,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

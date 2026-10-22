import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';

export default function HomeScreen() {
  const [email, setEmail] = useState<string | undefined>('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setEmail(user?.email);
    });
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert('Error signing out', error.message);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900 justify-between px-6 py-10">
      <View className="flex-1 justify-center items-center">
        <View className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full items-center justify-center mb-4">
          <Text className="text-emerald-400 text-3xl">👋</Text>
        </View>
        <Text className="text-white text-2xl font-bold mb-1">Hello User!</Text>
        <Text className="text-slate-400 text-sm">{email || 'Authenticated Session'}</Text>
        
        <View className="mt-8 bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl w-full">
          <Text className="text-slate-300 text-xs uppercase tracking-wider font-semibold mb-1">Session Status</Text>
          <Text className="text-emerald-400 font-medium text-sm">✓ Persistently Logged In Natively</Text>
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={handleSignOut} className="w-full bg-red-500/10 border border-red-500/20 h-14 rounded-xl items-center justify-center active:bg-red-500/20">
        <Text className="text-red-400 font-semibold text-base">Sign Out of Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

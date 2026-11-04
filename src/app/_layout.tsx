import React, { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  RobotoMono_400Regular,
  RobotoMono_500Medium,
  RobotoMono_600SemiBold,
  RobotoMono_700Bold,
} from '@expo-google-fonts/roboto-mono';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase'; // Path to your setup file
import '../../global.css'; // Ensure your Tailwind CSS is imported here

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    RobotoMono_400Regular,
    RobotoMono_500Medium,
    RobotoMono_600SemiBold,
    RobotoMono_700Bold,
  });
  
  const segments = useSegments();
  const router = useRouter();

  // 1. Listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'INITIAL_SESSION') {
        setIsReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Handle protection and redirection logic
  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = (segments as string[]).includes('(auth)');

    if (!session && !inAuthGroup) {
      // User is logged out but trying to view app screens -> redirect to login
      router.replace('/login');
    } else if (session && inAuthGroup) {
      // User is logged in but stuck on login screen -> redirect to home
      router.replace('/(main)');
    }
  }, [session, segments, isReady, router]);

  if (fontError) throw fontError;

  // Render a sleek global splash spinner while verifying cached login token
  if (!isReady || !fontsLoaded) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className="flex-1 justify-center items-center bg-slate-950">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slot />
    </GestureHandlerRootView>
  );
}

import React, { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase'; // Path to your setup file
import '../../global.css'; // Ensure your Tailwind CSS is imported here

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  const segments = useSegments();
  const router = useRouter();

  // 1. Listen for auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Handle protection and redirection logic
  useEffect(() => {
    if (!isReady) return;

    // Check if the user is currently inside the (auth) group folder
      const inAuthGroup = (segments as string[]).includes('(auth)');

    if (!session && !inAuthGroup) {
      // User is logged out but trying to view app screens -> redirect to login
      router.replace('/(auth)/login' as any);
    } else if (session && inAuthGroup) {
      // User is logged in but stuck on login screen -> redirect to home
      router.replace('/(main)/index' as any);
    }
  }, [session, segments, isReady]);

  // Render a sleek global splash spinner while verifying cached login token
  if (!isReady) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-950">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return <Slot />;
}

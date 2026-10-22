// app/(auth)/login.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { supabase } from '../../lib/supabase';

WebBrowser.maybeCompleteAuthSession();
GoogleSignin.configure({ webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID });

export default function LoginScreen() {
  const handleGoogleLogin = async () => {
    const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

    if (isExpoGo) {
      try {
        const redirectUrl = AuthSession.makeRedirectUri();
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: redirectUrl, skipBrowserRedirect: true },
        });

        if (error) throw error;

        if (data?.url) {
          const res = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
          if (res.type === 'success' && res.url) {
            const urlObj = new URL(res.url.replace('#', '?'));
            const accessToken = urlObj.searchParams.get('access_token');
            const refreshToken = urlObj.searchParams.get('refresh_token');

            if (accessToken && refreshToken) {
              await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
            }
          }
        }
      } catch (err: any) {
        Alert.alert('Expo Go Login Error', err.message);
      }
    } else {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const idToken = userInfo.data?.idToken;

        if (!idToken) throw new Error('No ID token returned from Google.');
        const { error } = await supabase.auth.signInWithIdToken({ provider: 'google', token: idToken });
        if (error) throw error;
      } catch (err: any) {
        Alert.alert('Native Login Error', err.message);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950 justify-between px-6 py-12">
      <View className="flex-1 justify-center items-center">
        <View className="w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
          <Text className="text-white text-3xl font-black">S</Text>
        </View>
        <Text className="text-white text-3xl font-bold tracking-tight text-center">Welcome Back</Text>
        <Text className="text-slate-400 text-base text-center mt-2 px-4">Sign in securely to your account using your Google profile.</Text>
      </View>

      <View className="w-full">
        <TouchableOpacity activeOpacity={0.8} onPress={handleGoogleLogin} className="w-full bg-white h-14 rounded-xl flex-row items-center justify-center border border-slate-200 shadow-sm active:bg-slate-50">
          <View className="w-5 h-5 bg-red-500 rounded-full mr-3 items-center justify-center">
            <Text className="text-white text-xs font-bold">G</Text>
          </View>
          <Text className="text-slate-900 font-semibold text-base">Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
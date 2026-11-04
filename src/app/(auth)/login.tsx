// app/(auth)/login.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { supabase } from '../../lib/supabase';
import Feather from '@expo/vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';

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
    <SafeAreaView className="flex-1 gap-8 bg-lime-300 justify-between px-6 py-8">
      <StatusBar></StatusBar>
      <Text className='text-green-950 text-xl font-inter-bold'>Cashia</Text>
      <View className="flex-1">
        <ImageBackground
          source={require('../../../assets/illustrations/cards.png')}
          resizeMode="contain"
          className="flex-1"
        >
        </ImageBackground>
      </View>
      <View className='flex-1 flex-row items-end'>
          <Text className='text-6xl font-inter-bold text-green-950'>Track Your Spendings Effortlessly</Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={handleGoogleLogin} className="w-full p-2 relative flex flex-row justify-center items-center bg-lime-300 border-green-950 h-16 rounded-full border active:bg-green-950">
        <Text className="text-green-950 font-inter-semibold">Sign In</Text>
        <View className='h-12 w-12 bg-green-950 rounded-full absolute right-2 flex flex-row justify-center items-center'>
          <Feather name="arrow-up-right" size={24} color="#bbf451" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
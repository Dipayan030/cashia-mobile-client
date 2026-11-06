import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useFonts as useInter, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';

type HeaderProps = {
    marginX?: string;
};

export default function Header({ marginX = '' }: HeaderProps) {
    const router = useRouter();
    const [interLoaded] = useInter({
        Inter_400Regular,
        Inter_700Bold,
    });
    const [ name, setName ] = useState<string | undefined>('');
    const [ avatar, setAvatar ] = useState<string | undefined>('');

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setName(user?.user_metadata?.full_name);
            setAvatar(user?.user_metadata?.avatar_url);
        });
    }, []);

    if (!interLoaded) {
        return null; 
    };
    return (
        <View className={`flex flex-col gap-4 pb-6 ${marginX}`}>
            <View className="flex flex-row justify-between">
                <View className="flex-row gap-4 items-center">
                    <TouchableOpacity
                        onPress={() => router.push('/profile')}
                        accessibilityRole="button"
                        accessibilityLabel="Open profile"
                    >
                        <Image source={avatar ? { uri: avatar } : undefined} resizeMode="cover" className="h-10 w-10 rounded-full bg-white/95 p-1 bg-center"/>
                    </TouchableOpacity>
                    <View>
                        <Text className='text-green-950/50 font-inter text-xs'>Welcome Back,</Text>
                        <Text className="font-inter-semibold text-green-950 text-lg">{name}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => router.push('/notifications')}
                    accessibilityRole="button"
                    accessibilityLabel="Open notifications"
                    className="flex flex-row items-center gap-1 px-4 py-2 bg-white rounded-full"
                >
                    <Feather name="bell" size={20} color="black" />
                    <Text>3</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
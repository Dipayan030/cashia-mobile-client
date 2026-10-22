import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useFonts as useInter, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

type props = {
    pageTitle: string,
    name: string | null | undefined,
    avatar: string | null | undefined
}

export default function Header({ pageTitle, name, avatar }: props) {
    const [interLoaded] = useInter({
        Inter_400Regular,
        Inter_700Bold,
    });
    if (!interLoaded) {
        return null; 
    };
    const profileStyle = {
        avatar: `bg-[url(${avatar})]`
    }
    return (
        <View className='flex flex-col gap-4'>
            <View className="flex flex-row justify-between">
                <View className="flex-row gap-4 items-center">
                    <Image source={avatar ? { uri: avatar } : undefined} resizeMode="cover" className="h-8 w-8 rounded-full bg-white/95 p-1 bg-center"/>
                    <Text className="font-inter-bold text-green-950">Hi! {name}</Text>
                </View>
                <View className="flex flex-row gap-1 px-4 py-2 bg-white rounded-full ">
                    <Feather name="bell" size={20} color="black" />
                    <Text>3</Text>
                </View>
            </View>
            <View>
                <Text className='font-inter-medium text-lg text-green-950'>{pageTitle}</Text>
            </View>
        </View>
    )
}
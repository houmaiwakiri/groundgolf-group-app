import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../index';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  useEffect(() => {
    // front-web の <Navigate replace /> 相当
    navigation.replace('Scores');
  }, []);

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

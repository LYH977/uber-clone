import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import tw from 'tailwind-react-native-classnames';
import { NavigationStackParamList } from '../interface/Root';
import { setDestination } from '../slices/navSlice';
import Autocomplete from './Autocomplete/Autocomplete';

export type NavCardProps = NativeStackScreenProps<
  NavigationStackParamList,
  'NavigateCard'
>;

const NavigateCard = ({ navigation }: NavCardProps) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good morning You</Text>
      <Autocomplete
        onSelect={(place: any) => {
          dispatch(
            setDestination({
              location: {
                lat: place.geometry.coordinates[1],
                long: place.geometry.coordinates[0],
              },
              description: place.place_name,
            })
          );
          navigation.navigate('RideOptionCard');
        }}
      />
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({});

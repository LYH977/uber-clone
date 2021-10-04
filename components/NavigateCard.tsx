import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import tw from 'tailwind-react-native-classnames';
import { NavigationStackParamList } from '../interface/Root';
import { setDestination } from '../slices/navSlice';
import Autocomplete from './Autocomplete/Autocomplete';
import NavFavourite from './NavFavourite';

type NavCardProps = NativeStackScreenProps<
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
      <NavFavourite />
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          style={tw`flex flex-row bg-black w-24 p-3 rounded-full justify-evenly`}
          onPress={() => navigation.navigate('RideOptionCard')}
        >
          <Icon name='car' type='font-awesome' color='white' size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row w-24 p-3 rounded-full border justify-evenly`}
        >
          <Icon
            name='fast-food-outline'
            type='ionicon'
            color='black'
            size={16}
          />
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({});

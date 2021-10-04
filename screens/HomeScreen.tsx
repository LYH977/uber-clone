import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interface/Root';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TextInput } from 'react-native-gesture-handler';
import { setDestination, setOrigin } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import Autocomplete from '../components/Autocomplete/Autocomplete';
import NavFavourite from '../components/NavFavourite';

export type HomeProps = NativeStackScreenProps<
  RootStackParamList,
  'HomeScreen'
>;

const HomeScreen = ({ route, navigation }: HomeProps) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-gray-100 h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
          source={{
            uri: 'https://links.papareact.com/gzs',
          }}
        />

        <Autocomplete
          onSelect={(place: any) => {
            dispatch(
              setOrigin({
                location: {
                  lat: place.geometry.coordinates[1],
                  long: place.geometry.coordinates[0],
                },
                description: place.place_name,
              })
            );
          }}
        />
        <NavOptions navigation={navigation} />
        <NavFavourite />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

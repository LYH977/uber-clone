import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationStackParamList } from '../interface/Root';
import tw from 'tailwind-react-native-classnames';

type NavCardProps = NativeStackScreenProps<
  NavigationStackParamList,
  'RideOptionCard'
>;

type dataType = {
  id: string;
  title: string;
  multiplier: number;
  image: string;
};

const RideOptionCard = ({ navigation }: NavCardProps) => {
  const [selected, setselected] = useState<dataType | null>(null);
  const data: dataType[] = [
    {
      id: '123',
      title: 'UberX',
      multiplier: 1,
      image: 'https://links.papareact.com/3pn',
    },
    {
      id: '45435',
      title: 'Uber XL',
      multiplier: 1.2,
      image: 'https://links.papareact.com/5w8',
    },
    {
      id: '54646',
      title: 'Uber LUX',
      multiplier: 1.5,
      image: 'https://links.papareact.com/7pf',
    },
  ];

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NavigateCard')}
          style={tw`absolute top-3 left-5 p-3 rounded-full`}
        >
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text style={tw`text-center text-xl py-5`}>Select a Ride</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, image, multiplier, title }, item }) => (
          <TouchableOpacity
            style={[
              tw`flex-row justify-between items-center px-10`,
              selected?.id === id ? { backgroundColor: 'gray' } : {},
            ]}
            onPress={() => setselected(item)}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>Travel time...</Text>
            </View>
            <Text style={tw`text-xl`}>Rm99</Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity style={tw`bg-black py-3 m-3`} disabled={!selected}>
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionCard;

const styles = StyleSheet.create({});

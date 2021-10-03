import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { RootStackParamList } from '../interface/Root';
import { HomeProps } from '../screens/HomeScreen';
import { selectOrigin } from '../slices/navSlice';

type dataType = {
  id: string;
  title: string;
  image: string;
  screen: string;
};

const data: dataType[] = [
  {
    id: '123',
    title: 'get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen',
  },
  {
    id: '556',
    title: 'order food',
    image: 'https://links.papareact.com/28w',
    screen: 'MapScreen',
  },
];

const NavOptions = ({ navigation }: any) => {
  // const navigation = useNavigation<HomeProps>();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item: dataType) => item.id}
      renderItem={({ item }: ListRenderItemInfo<dataType>) => {
        return (
          <TouchableOpacity
            style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 `}
            onPress={() => navigation.navigate(item.screen)}
            disabled={!origin}
          >
            <View style={!origin && tw`opacity-20`}>
              <Image
                style={{ width: 120, height: 120, resizeMode: 'contain' }}
                source={{ uri: item.image }}
              />
              <Text style={tw`mt-2 text-lg font-bold`}>{item.title}</Text>
              <Icon
                name='arrowright'
                color='white'
                type='antdesign'
                style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default NavOptions;

const styles = StyleSheet.create({});

import React, { Component } from 'react';
// import 'Autocomplete.css';
import axios from 'axios';
import { REACT_APP_MAPBOX_API_KEY } from '@env';
import {
  FlatList,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Autocomplete1 from 'react-native-autocomplete-input';
import tw from 'tailwind-react-native-classnames';

type autoCompState = {
  search: string;
  results: string[];
  isLoading: boolean;
};

type autoCompProps = {
  onSelect: any;
};

export default class AutocompletePlace extends Component<
  autoCompProps,
  autoCompState
> {
  timeoutId: undefined | number | NodeJS.Timeout;

  constructor(props: any) {
    super(props);
    this.state = {
      search: '',
      results: [],
      isLoading: false,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);

    if (!REACT_APP_MAPBOX_API_KEY) {
      throw new Error(
        "You don't have any 'process.env.REACT_APP_MAPBOX_API_KEY'"
      );
    }
  }

  handleSearchChange(search: string) {
    this.setState({
      search,
      isLoading: true,
    });

    // Stop the previous setTimeout if there is one in progress
    clearTimeout(this.timeoutId as NodeJS.Timeout);

    // Launch a new request in 1000ms
    this.timeoutId = setTimeout(() => {
      this.performSearch();
    }, 500);
  }

  performSearch() {
    if (this.state.search === '') {
      this.setState({
        results: [],
        isLoading: false,
      });
      return;
    }
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?access_token=${REACT_APP_MAPBOX_API_KEY}`
      )
      .then((response) => {
        // console.log((response.data as any).features);
        this.setState({
          results: (response.data as any).features,
          isLoading: false,
        });
      });
  }

  handleItemClicked(item: any) {
    this.setState({
      search: item.place_name,
      results: [],
    });
    this.props.onSelect(item);
  }

  render() {
    return (
      <View style={{ margin: 10, padding: 10 }}>
        <View style={styles.autocompleteContainer}>
          <Autocomplete1
            style={{ backgroundColor: 'lightgrey' }}
            data={this.state.results}
            value={this.state.search}
            onChangeText={this.handleSearchChange}
            flatListProps={{
              keyExtractor: (_, idx) => _.id,
              renderItem: ({ item }) => (
                <TouchableOpacity
                  onPress={() => this.handleItemClicked(item)}
                  style={tw`p-2 border-b`}
                >
                  <Text>{item.place_name}</Text>
                </TouchableOpacity>
              ),
            }}
          />
        </View>
        <View>
          <Text>Some content</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    marginBottom: 5,
  },
});

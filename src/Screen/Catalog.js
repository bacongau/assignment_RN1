/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import {
  StyleSheet,
  Text,
  View, ImageBackground, Image, Button, TouchableOpacity
} from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const flickrAPI = 'https://www.flickr.com/services/rest/?method=flickr.favorites.getList&api_key=c42b25f9d5b059993d623b04e1261213&user_id=193194849%40N08&extras=url_o%2C+views&format=json&nojsoncallback=1';

const Catalog = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [list, setList] = useState([
    {}
  ])

  useEffect(async () => {
    try {
      let response = await fetch(flickrAPI);
      let json = await response.json();
      let a = json.photos.photo;
      setList(a);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#505050', justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
      <MasonryList
        data={list}
        keyExtractor={({ item }) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedId(item.id)
              navigation.navigate('picture', { url: item.url_o, h: item.height_o, w: item.width_o })
            }}
          >
            <ImageBackground
              source={{ uri: item.url_o }}
              style={{
                width: (windowWidth - 15) / 2,
                height: 200,
                //   height: ((windowWidth - 10) / 2) * item.height_o / item.width_o,
                alignSelf: 'center',
                marginBottom: 5,
                justifyContent: 'flex-end'
              }}
              imageStyle={{ borderRadius: 6 }}
            >
              <View style={{ backgroundColor: '#50505050', flexDirection: 'row', alignItems: 'center', paddingLeft: 6, paddingVertical: 3 }}>
                <Image
                  source={{ uri: 'https://cdn1.iconfinder.com/data/icons/materia-video-games/24/003_003_eye_watch_view_views-512.png' }}
                  style={{ width: 20, height: 20, tintColor: '#DCDCDC' }}
                />
                <Text style={{ color: '#DCDCDC', marginLeft: 8 }}>{item.views} views</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
});

export default Catalog;

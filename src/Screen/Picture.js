/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text, Modal, Pressable,
  View, Button, ImageBackground, Image, Animated, TouchableWithoutFeedback, TouchableOpacity, Platform, PermissionsAndroid
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Picture = ({ navigation, route }) => {
  const url = route.params.url;
  const h = route.params.h;
  const w = route.params.w;

  const [isOpen, setIsOpen] = useState(false);

  const toggleAnimation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.timing(toggleAnimation, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false
    }).start();
    setIsOpen(!isOpen);
  }

  const checkPermission = async () => {
    if (Platform.OS == 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Cho phép truy cập vào bộ nhớ',
            message: 'Ứng dụng muốn truy cập vào bộ nhớ của thiết bị'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Cho phép truy cập');
          downloadImage();
        } else {
          alert('Từ chối truy cập');
        }
      } catch (error) {
        console.warn(error);
      }
    }
  }

  const downloadImage = () => {
    let date = new Date();
    let img_url = url;
    let ext = getExtention(img_url);
    //ext = '.' + ext[0];
    // get config and fs from RNFetchBlob
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // related to the android only
        useDownloadManager: true,
        notification: true,
        path: PictureDir + '/image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
        description: 'Image',
      }
    }
    config(options).fetch('GET', img_url).then(res => {
      // show alert after successful download
      console.log('res -> ', JSON.stringify(res));
      //alert('Tải xuống thành công');
    })
  }

  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.] + $ /.exec(filename) : undefined
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black', alignItems: 'flex-end' }}>
      <ImageBackground
        source={{ uri: url }}
        style={{ width: windowWidth, height: (windowWidth * h / w) }}
        resizeMode='cover'
      >
      </ImageBackground>
      <View style={{ marginRight: 30 }}>
        <TouchableWithoutFeedback
          onPress={
            checkPermission
          }
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateY: toggleAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [64, -5]
                  })
                },
                {
                  scaleX: toggleAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.2, 1]
                  })
                },
                {
                  scaleY: toggleAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.2, 1]
                  })
                }
              ],
            }}
          >
            <Image
              source={{ uri: 'https://icons-for-free.com/iconfiles/png/512/down+download+downloads+icon-1320196066868908267.png' }}
              style={{ width: 50, height: 50, borderRadius: 50, marginBottom: 15 }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        {/* Buttonmenu */}
        <TouchableWithoutFeedback onPress={() => { startAnimation() }}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: toggleAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"]
                  })
                }
              ]
            }}
          >
            <Image
              source={{ uri: 'https://banner2.cleanpng.com/20180531/qar/kisspng-computer-icons-symbol-information-plus-and-minus-s-5b10852dbd08b2.7381082015278093257743.jpg' }}
              style={{ width: 50, height: 50, borderRadius: 50, }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00000099'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    width: 140
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20
  }
});

export default Picture;

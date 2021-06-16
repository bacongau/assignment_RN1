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
  Text,
  View, Button, ImageBackground, Image, Animated, TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Picture = ({ navigation, route }) => {
  let MenuRef;
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black', alignItems: 'flex-end' }}>
      <ImageBackground
        source={{ uri: url }}
        style={{ width: windowWidth, height: (windowWidth * h / w) }}
        resizeMode='cover'
      >
      </ImageBackground>
      <View style={{marginRight:30}}>
        <TouchableWithoutFeedback style={{}}>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: toggleAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [64, -5]
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
});

export default Picture;

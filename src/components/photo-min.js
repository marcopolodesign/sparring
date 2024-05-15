import React from 'react'
import { ImageBackground } from 'react-native'
import profile from '../assets/images/profile-pic.jpg'


const PhotoMin = ({ width, height, size, border, transform }) => {
    if (size === 'small') {
        width = 50;
        height = 50;
    }

    return (
        <ImageBackground
            source={profile}
            style={{
                width: width,
                height: height,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: border ? border : '#fff',
                overflow: 'hidden',
                transform: transform ? [{translateX: transform}] : undefined,
            }}
            onPress={() => {
                console.log('navigate');
            }}
        ></ImageBackground>
    );
};

export default PhotoMin;

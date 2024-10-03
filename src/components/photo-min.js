import React from 'react'
import {useSelector } from 'react-redux'
import { ImageBackground } from 'react-native'
import profile from '../assets/images/profile-pic.jpg'


const PhotoMin = ({ width, height, size, border, transform, sourceImg, zIndexPosition }) => {
    if (size === 'small') {
        width = 40;
        height = 40;
    } else if (size === 'invite' || size === 'big') {
        width = 55;
        height = 55;
    }
    const backUrl = useSelector((state) => state.backUrl);

    const profilePicture  = sourceImg ? {uri:  backUrl + sourceImg} : profile;
    return (
        <ImageBackground
            source={profilePicture}
            imageStyle={{
                resizeMode: "cover",
              }}

            style={{
                width: width,
                height: height,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: border ? border : '#fff',
                backgroundPosition: 'center',
                overflow: 'hidden',
                zIndex: zIndexPosition ? zIndexPosition : 0,
                transform: transform ? [{translateX: transform}] : undefined,
            }}
            onPress={() => {
                console.log('navigate');
            }}
        ></ImageBackground>
    );
};

export default PhotoMin;

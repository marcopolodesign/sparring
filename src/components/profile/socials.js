import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { SubHeading } from '../styled-components.js'
import { Colors, Generals } from '../constants.js';
import Icons from '../icons.js';
import * as WebBrowser from 'expo-web-browser';

const  Socials = ({user}) => {

    const userSocials = [{
        title: 'instagram',
        data: `@${user.username}`,
        icon: 'instagram', 
        url: 'https://www.instagram.com/johndoe'
    }, {
        title: 'twitter',
        data: `@${user.username}`,
        icon: 'twitter',
        url: 'https://twitter.com/johndoe'

    }, {
        title: 'linkedin',
        data: `@${user.username}`,
        icon: 'linkedin-square',
        url: 'https://www.linkedin.com/in/johndoe'
    
    }]

    return (
        <View style={{ marginVertical: 20, alignSelf: 'flex-start', justifyContent: 'space-between', flex: 1 }}>
        <SubHeading color={'#000'}>Conectá con {user.firstName} {user.lastName}</SubHeading>
        <View style={{ gap: 10, justifyContent: 'stretch', width: '100%', marginTop: 10 }}>
            {userSocials.map((social, index) => (
          
                 <View key={index} style={{ borderRadius: Generals.borderRadius, flexDirection: 'row', gap: 5, paddingVertical: 15, paddingHorizontal: 30, backgroundColor: Colors.lightGrey, width: '100%' }}>
                <TouchableOpacity 
                    onPress={ () => {WebBrowser.openBrowserAsync(social.url)
                    }}
                    
                    style={{ flex: 1, gap: 5, flexDirection: 'row' }}>
                    <Icons icon={social.icon ? social.icon : social.title} color={'#000'} />
                     <SubHeading size={'15px'} style={{ color: '#000' }}>{social.data}</SubHeading>
                </TouchableOpacity>
                </View>
            ))}
        </View>
        </View>
    )
  
}

export default Socials;
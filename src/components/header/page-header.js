import React from 'react'
import { router } from 'expo-router';
import { TouchableOpacity, View, Image } from 'react-native';
import { BackArrow, SubHeading, ViewJustifyCenter } from '../styled-components';
import {Colors} from '../constants.js'
import Edit from '../../assets/icons/edit.js';
import Arrow from '../../assets/icons/arrow.js';

const PageHeader = ({...props}) => {
  return (
    <View style={{paddingRight: 20, paddingLeft: 20, zIndex: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        {/* <Link href="(tabs)" asChild> */}
            <TouchableOpacity onPress={() => {
              router.back()
              console.log('navigateeee')
              }}>
              <BackArrow>
                  <Arrow />
              </BackArrow>
            </TouchableOpacity>

            {props.canEdit && 
              <TouchableOpacity onPress={() => {
                router.back()
                console.log('navigateeee')
                }}>
                <ViewJustifyCenter style={{gap: 10}}>
                    <Edit />
                    <SubHeading style={{fontWeight: 'bold'}} size={'16px'}>Editar partido</SubHeading>
                </ViewJustifyCenter>
               
              </TouchableOpacity>
            }
        {/* </Link> */}
    </View>
  )
}


export default PageHeader;
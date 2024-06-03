import { StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SubHeading } from './styled-components'

const filterButton = ({...props}) =>  {
    return (
      <TouchableOpacity style={[styles.filter, {backgroundColor: props.bgColor}]} onPress={props.onPress}>
        <SubHeading color={props.color} style={{fontWeight: 'bold'}} size={props.size}>
            {props.name}
        </SubHeading>
      </TouchableOpacity>
    )
  
}

const styles =  StyleSheet.create({
    filter: {
        paddingVertical: 7.5,
        paddingHorizontal: 13.5,
        borderRadius: 100,
      },
})

export default filterButton
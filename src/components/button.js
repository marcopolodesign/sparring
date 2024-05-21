import React from 'react'
import {Text, Image} from 'react-native'
import {Button} from './styled-components.js'
import {ButtonFlex} from './styled-components.js'
import Add from '../assets/icons/add.js'

const MainButton = ({...props}) => {  
  return (

    {...props.willFlex ? (
        <Button onPress={props.onPress} bgColor={props.bgColor}  style={{flexDirection: 'row', gap: 10, justifyContent: 'center'}}>
          {props.icon && (
            { ...props.icon === 'Add' && (
            source= <Add />
            )}            
        )}
        <Text style={{color: props.color || '#fff', fontWeight: 700, fontFamily: 'TT Interphases Pro Demi Bold', fontSize: 18}}>{props.ctaText}</Text>
      </Button>

    ) : (
        <ButtonFlex onPress={props.onPress} bgColor={props.bgColor} willFlex={props.willFlex} style={{flexDirection: 'row', gap: 10, justifyContent: 'center'}}>
              {props.icon && (
                { ...props.icon === 'Add' && (
                source= <Add />
                )}            
            )}
            <Text style={{color: props.color || '#fff', fontWeight: 700, fontFamily: 'TT Interphases Pro Demi Bold', fontSize: 18}}>{props.ctaText}</Text>
        </ButtonFlex>
    )}      
)
}

export default MainButton;
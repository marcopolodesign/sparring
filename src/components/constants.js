import { Dimensions, Platform } from 'react-native';
const { height } = Dimensions.get('screen');
const {height : heightWindow} = Dimensions.get('window');


export const Colors = {
    darkGreen : "#163300",
    primaryGreen : "#9FE870",
    blue : "#1660B1",
    lightBlue: '#699FEF',
    orange: '#EE8C55',
    textGrey: "#545454",
    lightGrey: "#D9D9D9",
    white: '#FFF',
}   

export const Generals = {
    borderRadius: 13,
    modalBorderRadius: 40,

}

export const Fonts = {
    // heading : {
    //     fontFamily : "Thunder",
    //     fontSize: 34,
    //     fontStyle: "normal",
    //     fontWeight: 700,
    //     textTransform: "uppercase",
    // },
    interphrases : {
        fontFamily : "TT Interphases Pro",
    },
    interphrasesBold : {
        fontFamily : "TT Interphases Pro Demi Bold",
    }
}
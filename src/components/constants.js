import { Dimensions, Platform } from 'react-native';
const { height } = Dimensions.get('screen');
const {height : heightWindow} = Dimensions.get('window');


export const Colors = {
    darkGreen : "#163300",
    primaryGreen : "#9FE870",
    blue : "#1660B1",
    textGrey: "#545454;"
}   

export const Fonts = {
    heading : {
        fontFamily : "Thunder",
        fontSize: 34,
        fontStyle: "normal",
        fontWeight: 700,
        textTransform: "uppercase",
    }
}
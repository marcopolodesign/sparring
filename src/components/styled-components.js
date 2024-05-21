import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('screen');
import {Colors} from './constants.js'
const {width} = Dimensions.get('window');

// const {height : heightWindow} = Dimensions.get('window');
// import Colors  from './constants'
// Views
export const ContentContainer = styled.View`
  flex: 1;
  backgroundColor : ${({ bgColor }) => bgColor || '#fff'};
  minHeight: ${height}px;
  `;

  export const ViewJustifyCenter = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  `;

  export const Span = styled.View`
  marginTop: 15px;
  marginBottom: 15px;
  width: 100%;
  height: 1px;
  backgroundColor: ${({ bgColor }) => bgColor || ''};
  `

// TEXTS

export const Heading = styled.Text`
  fontFamily: "Thunder";
  fontSize: ${({ size }) => (size?+ "px" : "38px")};
  fontStyle: "normal";
  fontWeight: 700;
  textTransform: uppercase;
  color: ${({ color }) => color || "#fff"};
`;


export const SubHeading = styled.Text`
  fontFamily: "TT Interphases Pro";
  font-size: ${({ size }) => (size ? size + "px" : "19.5px")};
  font-style: normal;
  font-weight: 400;  fontStyle: "normal";
  color: ${({ color }) => color || "#fff"};
  line-height: ${({ size }) => size * 1.5 + "px" || '27.5px'};
`;

export const Text = styled.Text`
  fontFamily: "TT Interphases Pro";
  font-size: ${({ size }) => (size?+ "px" : "16px")};
  font-style: normal;
  font-weight: 400;
  color: ${({ color }) => color || "#fff"};
  line-height: ${({ size }) => size * 1.5  + "px" || '22px'};
`;

// INPUTS

export const Input = styled.TextInput`
padding: 15px 20px;
fontFamily: "TT Interphases Pro";
font-size: ${({ size }) => (size?+ "px" : "18px")};
font-style: normal;
font-weight: 600;
border-radius: 8px;
color: ${Colors.textGrey};
backgroundColor : ${({ bgColor }) => (bgColor ? bgColor : '#fff')};
`

export const Button = styled.TouchableOpacity`
  background-color: ${({ bgColor }) => bgColor || Colors.primaryGreen};
  padding: 15px 20px;
  border-radius: 100px;
  align-items: center;
`;

export const ButtonFlex = styled.TouchableOpacity`
  background-color: ${({ bgColor }) => bgColor || Colors.primaryGreen};
  padding: 15px 20px;
  border-radius: 100px;
  align-items: center;
  flex: ${({ willFlex }) =>  (willFlex ? 'willFlex' :  1)};
`;

// Components
export const BackArrow = styled.View`
  width: 33px;
  height: 33px;
  background: ${props => props.color || "#fff"};
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

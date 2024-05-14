import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
const { height } = Dimensions.get('screen');

// const {height : heightWindow} = Dimensions.get('window');
// import Colors  from './constants'

export const ContentContainer = styled.View`
  flex: 1;
  padding: 20px;
  backgroundColor : ${({ bgColor }) => bgColor || '#fff'};
  minHeight: ${height}px;
  `;


export const Heading = styled.Text`
  fontFamily: "Thunder";
  fontSize: 38px;
  fontStyle: "normal";
  fontWeight: 700;
  textTransform: uppercase;
  color: ${({ color }) => color || "#fff"};
`;

export const SubHeading = styled.Text`
  fontFamily: "TT Interphases Pro";
  font-size: 19.5px;
  font-style: normal;
  font-weight: 400;  fontStyle: "normal";
  color: ${({ color }) => color || "#fff"};
  line-height: 27.5px;
`;

export const BackArrow = styled.View`
  width: 33px;
  height: 33px;
  background: ${props => props.color || "#fff"};
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Button = styled.TouchableOpacity`
  background-color: ${({ bgColor }) => bgColor || "red"};
  padding: 15px 20px;
  border-radius: 100px;
  align-items: center;
  flex: 1;
`;
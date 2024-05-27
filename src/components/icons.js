import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Add from '../assets/icons/add.js';
import FaceId from '../assets/icons/face-id.js';

export default renderIcon = ({...props}) => {
    switch (props.icon) {
      case 'Add':
        return <Add />;
        case 'Face Id':
          return <FaceId color={props.color} />;
      case 'Apple':
        return <AntDesign name="apple1" size={20} color={props.color || "#000"} />;
      case 'Google':
        return <AntDesign name="google" size={20} color={props.color || "#fff"} />;
      case 'Email':
        return <MaterialCommunityIcons name="email-outline" size={20} color={props.color || "#fff"} />;
      default:
        return null;
    }
  };
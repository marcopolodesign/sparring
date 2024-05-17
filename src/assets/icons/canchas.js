
import * as React from 'react';
import { SvgXml } from 'react-native-svg';

export default (props) => (
  <SvgXml
    width={23}
    height={23}
    xml={`<svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.55723" y="0.842627" width="21.8853" height="20.1679" rx="0.85" stroke="${props.color}" stroke-width="1.3"/>
    <path d="M5.57275 1.06885V21.4263" stroke=${props.color} stroke-width="1.3"/>
    <path d="M19.2064 1.06885V21.4263" stroke=${props.color} stroke-width="1.3"/>
    <path d="M12.5 11.2476L12.5 21.4263" stroke=${props.color} stroke-width="1.3"/>
    <path d="M5.75952 11.7144H18.8331" stroke=${props.color} stroke-width="1.3"/>
    </svg>
    `}
  />
);





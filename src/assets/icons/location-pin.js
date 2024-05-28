import * as React from 'react';
import { SvgXml } from 'react-native-svg';

export default (props) => (
  <SvgXml
    width={24}
    height={26}
    xml={`<svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12.0745" cy="12.4187" r="10.7863" stroke="${props.color}" stroke-width="1.3"/>
    <path d="M12.0739 25.9819L9.41431 23.3223H14.7335L12.0739 25.9819Z" fill="${props.color}"/>
    <circle cx="12.0746" cy="12.4188" r="2.65905" fill="${props.color}"/>
    </svg>
    
    `}
  />
);





import * as React from 'react';
import { SvgXml } from 'react-native-svg';

export default (props) => (
  <SvgXml
    width={10}
    height={15}
    xml={`<svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.53832 0.946777L2.00084 7.48427L8.53832 14.0218" stroke="#163300" stroke-width="1.5"/>
    </svg>
    `}
  />
);


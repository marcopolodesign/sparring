import * as React from 'react';
import { SvgXml } from 'react-native-svg';

export default (props) => (
  <SvgXml
    width={15}
    height={10}
    xml={`<svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.25 1.20621L4.69495 4.65115L1.25 8.0961" stroke=${props.color}/>
    </svg>
    `}
  />
);


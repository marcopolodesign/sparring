

import * as React from 'react';
import { SvgXml } from 'react-native-svg';

export default (props) => (
  <SvgXml
    width={23}
    height={23}
    xml={`<svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.3923 17.2434L12.3078 20.6659L6.22339 17.2434V13.6274L4.48499 12.6616V18.2601L12.3078 22.6604L20.1307 18.2601V12.6616L18.3923 13.6274V17.2434Z" fill="#A8A8A8"/>
    <path d="M12.3078 0.692383L0.138916 7.00215V8.50881L12.3078 15.2691L22.7382 9.47461V14.275H24.4766V7.00215L12.3078 0.692383ZM20.9998 8.45172L19.2614 9.41746L12.3078 13.2808L5.35414 9.41746L3.61573 8.45172L2.41085 7.78232L12.3078 2.65059L22.2047 7.78232L20.9998 8.45172Z" fill=${props.color}/>
    </svg>
    
    `}
  />
);





import * as React from 'react';
import { SvgXml } from 'react-native-svg';

export default (props) => (
  <SvgXml
    width={24}
    height={24}
    xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.10677 1.54688H3.72331C3.09117 1.54688 2.48493 1.79799 2.03794 2.24498C1.59096 2.69196 1.33984 3.2982 1.33984 3.93034V6.3138M18.0241 1.54688H20.4076C21.0397 1.54688 21.6459 1.79799 22.0929 2.24498C22.5399 2.69196 22.791 3.2982 22.791 3.93034V6.3138M16.8324 7.50553V9.889M7.2985 7.50553V9.889M8.49023 17.0394C8.49023 17.0394 9.68197 18.2311 12.0654 18.2311C14.4489 18.2311 15.6406 17.0394 15.6406 17.0394M12.0654 7.50553V13.4642H10.8737M6.10677 22.998H3.72331C3.09117 22.998 2.48493 22.7469 2.03794 22.2999C1.59096 21.853 1.33984 21.2467 1.33984 20.6146V18.2311M18.0241 22.998H20.4076C21.0397 22.998 21.6459 22.7469 22.0929 22.2999C22.5399 21.853 22.791 21.2467 22.791 20.6146V18.2311" stroke="${props.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
    `}
  />
);




import { useState } from 'react';

const useInnerBox = () => {

    const [innerBox, setInnerBox] = useState('inner box');
    
    console.log('call innerBox');

    return {
        innerBox,
        setInnerBox
    };
}

export default useInnerBox;
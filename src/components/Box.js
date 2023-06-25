import React, { useEffect, useState } from 'react';
import useInnerBox from '../hooks/useInnerBox';

const Box = () => {

    
    const { innerBox, setInnerBox } = useInnerBox();
    
    // useEffect(() => {
    //     console.log('innerBox:' + innerBox);
    // }, [innerBox]);
    

    console.log('render box');
    
    return (
        <div className="box">
            <h1>Box</h1>
            <h2>{innerBox}</h2>
            <h3>....</h3>
            <button onClick={() => setInnerBox('new inner box')}>change inner box</button>
        </div>
    )
}

export default Box;
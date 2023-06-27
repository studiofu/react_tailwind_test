import React, { useEffect, useState } from 'react';
import useInnerBox from '../hooks/useInnerBox';
import { useBookStore } from '../hooks/useBook';

const Box = () => {

    
    const { innerBox, setInnerBox } = useInnerBox();
    
    // useEffect(() => {
    //     console.log('innerBox:' + innerBox);
    // }, [innerBox]);

    function randomUUID() { 
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }  
      
    const addBook = useBookStore(state => state.addBook);
    

    console.log('render box');
    
    return (
        <div className="box">
            <h1>Box</h1>
            <h2>{innerBox}</h2>
            <h3>....</h3>
            <button onClick={() => setInnerBox('new inner box')}>change inner box</button>

            <div><button 
                className='
                    bg-blue-500
                    hover:bg-blue-700
                    text-white
                    font-bold
                    py-2
                    px-4
                    rounded
                '
            onClick={
            () => {
              addBook({
                id: randomUUID(),
                title: randomUUID()
            })
          }}>inner add book</button></div>            
        </div>
    )
}

export default Box;
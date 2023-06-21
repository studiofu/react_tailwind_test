import React, { useCallback, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react'
import './App.css';

function App() {
  const [open, setOpen] = useState(false);
  const [isShowing, setIsShowing] = useState(false);

  const add = useCallback((a, b) => {
    return a + b;
  }, []);

  useEffect(() => {
    console.log('add(1, 2)', add(1, 2));
  }, [add]);
  

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <div className={`
      flex 
      flex-col 
      md:bg-red-200    
      border-red-300
      rounded-md
    `} >
        <button onClick={() => handleClick()}>click me</button>
        <div className='underline text-sm'>hello</div>
        <div className='
          w-[300px]
          h-20
          bg-sky-200
          rounded-md
          p-2
          m-2
          hover:bg-slate-400
          hover:scale-75
          hover:rotate-12
          hover:rounded-lg
          hover:text-white
          cursor-pointer
          transition
          ease-in-out
          duration-500
          fixed
          top-[500px]
          left-20
          text-opacity-10
          
        '>1111111111</div>
        <div>2222222222</div>

        {open && (
        <div className='
          absolute
          backdrop-blur-md
          bg-black/10
          z-10
          w-full
          h-full

        '>
          <div>
            modal
          </div>
          
        </div>
        )}

        <>
      <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
        Toggle
      </button>
      <Transition
        show={isShowing}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        I will fade in and out
      </Transition>
    </>        
    </div>
  );
}

export default App;

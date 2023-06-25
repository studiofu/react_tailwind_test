import React, { useCallback, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react'
import './App.css';
//import usePlaceHolder from './hooks/usePlaceHolder';
import useAAA from './hooks/useAAA';
import Box from './components/Box';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const POSTS = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
  { id: 4, title: 'Post 4' },
  { id: 5, title: 'Post 5' },  
];

function wait(duration) {
  return new Promise( (resolve, reject) => {
    setTimeout(resolve, duration);
  });
}

function  App()  {
  
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

  const a = useAAA();

  const b = a.then((res) => {
    //console.log('app a:' + res);
    return res;
  })

  console.log('app a:' + a);

  wait(1000).then(() => {
    return 'done'; 
  }).then((res) => {
    console.log('res:' + res);
  })


  // test react-query
  // use react query to get post

  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ['posts'],
    // queryFn: ({ queryKey }) => {
    queryFn: async () => {
      await wait(1000);      
      return [...POSTS];
    }
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() => {
        POSTS.push({
          id: crypto.randomUUID(),
          title,
        });
    })},
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });

  if(postsQuery.isLoading) {
    return (
      <div>loading</div>
    )
  }

  if(postsQuery.isError) {
    return (
      <div><pre>
        {JSON.stringify(postsQuery.error, null, 2)}
      </pre></div>
    )
  }  


  return (
    <div className={`
      flex 
      flex-col 
      md:bg-red-200    
      border-red-300
      rounded-md
    `} >
        <button 
          className='
            rounded-md
            bg-sky-500
            hover:bg-slate-400            
            hover:text-white
            transition
            p-2
            m-2
            w-[100px]
          '
        onClick={() => handleClick()}>click me</button>
        <div className='underline text-sm'>hello</div>
        <div className='
          w-[200px]
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


    <Box />
    <button onClick={() => {console.log('onclickkkk..')}}>click me</button>

      <div className='
        flex flex-col bg-black/20
        p-2        
      '>
        {postsQuery.data.map(post => (
          <div key={post.id} className=''>
            <div>{post.id} : {post.title}</div>
          </div>
        ))}
          
        <button className='
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
          disabled:opacity-50
          w-[200px]
        '
          disabled={newPostMutation.isLoading}
          onClick={() => {
          return newPostMutation.mutate('new post');
        }} >add post</button>
      </div>

    </div>
  );
}

export default App;

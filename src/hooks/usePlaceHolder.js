import useSWR from 'swr';
import axios from 'axios';

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

const usePlaceHolder =  () => {
    const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher);
    console.log(data);    

    return {
        data,
        isLoading: isLoading,
        isError: error,
    };
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

const axiosFetcher = (url) => axios.get(url).then(res => res.data);

export default usePlaceHolder;
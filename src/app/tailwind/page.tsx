'use client';

import axios, {isCancel, AxiosError} from 'axios';
import { useState, useEffect, useRef } from 'react';
import ImageCard from '../ui/imagecard.tsx';
import { type Cat, type Breed, type Category } from '../lib/definitions.js';


export default function Page() {
  const [data, setData] = useState<Cat[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      const API_URL =
        `https://api.thecatapi.com/v1/images/search?limit=10`;

      try {
        const res = await axios.get(API_URL, { headers: { 'x-api-key' : process.env.NEXT_PUBLIC_X_API_KEY } });
        console.log(res.data);
        setData((prevData) => [...prevData, ...res.data]);
      } catch (err) {
        if (isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          console.log('Request error:', err.message);
        }
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);


  return (
    <>
      <header>
        <a href='/'><h1 className="font-sans text-5xl text-center text-white drop-shadow-2xl">Many Cat Pics.com</h1></a>
      </header>
      <main
        className="min-h-screen items-start justify-center p-2 md:p-3 lg:p-4 xl:p-5 gap-2 md:gap-3 lg:gap-4 xl:gap-5"
        style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'masonry'}}
      >
        {data && data.map((cat: Cat, index: number) => ( <ImageCard key={index} cat={cat} /> ))}
      </main>
      <footer className='flex'>
        {loading && <p>Loading...</p>}
        <button className="m-auto" onClick={() => setPage((prevPage) => prevPage + 1)}>Give ME More!</button>
        <div ref={observerRef}></div>
      </footer>
    </>
  );
}

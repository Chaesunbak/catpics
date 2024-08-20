'use client'

import { useEffect, useRef, useState } from 'react';
import axios, {isCancel, AxiosError} from 'axios';
import ImageCard from '../ui/imagecard';
import { type Cat, type Breed, type Category } from '../lib/definitions.ts';


const Page = () => {
  const [data, setData] = useState<Cat[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [positions, setPositions] = useState([]);
  const [columns, setColumns] = useState<number>(2);

  //데이터 가져오기
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
    }

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

  const calculatePositions = () => {
    if (containerRef.current) {
      const columnHeights = Array(columns).fill(0); // Track the height of each column
      const newPositions = data.map((_, index) => {
        const column = index % columns;
        const x = column * (containerRef.current.clientWidth / columns);
        const y = columnHeights[column];
        columnHeights[column] += containerRef.current.children[index].clientHeight;
        return { x, y };
      });
      setPositions(newPositions);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumns(2);
      } else if (width < 768) {
        setColumns(3);
      } else if (width < 1024) {
        setColumns(4);
      } else {
        setColumns(5);
      }
      calculatePositions();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call to set columns based on initial window size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  useEffect(() => {
    calculatePositions();
  }, [data, columns]);

  return (
    <>
      <header>
        <a href='/'><h1 className="font-sans text-5xl text-center text-white drop-shadow-2xl">Many Cat Pics.com</h1></a>
      </header>
      <main ref={containerRef} className="relative min-h-screen p-2 md:p-3 lg:p-4 xl:p-5">
        {data && data.map((cat, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              transform: `translate(${positions[index]?.x}px, ${positions[index]?.y}px)`,
              width: `calc(${100 / columns}% - 1rem)`, // Adjust width based on the number of columns and gap
            }}
          >
            <ImageCard cat={cat} />
          </div>
        ))}
        <div ref={observerRef}></div>
      </main>
      <footer className='flex'>
        {loading && <p>Loading...</p>}
      </footer>
    </>
  );
}

export default Page;

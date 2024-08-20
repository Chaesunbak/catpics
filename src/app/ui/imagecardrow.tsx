'use client';

import ImageCard from "./imagecard"
import { useState, useEffect, useRef } from "react";
import { Cat } from "../lib/definitions";
import axios, { isCancel } from "axios";
import { ImageCardSkeleton, ImageCardRowSkeleton1, ImageCardRowSkeleton2 } from "./skeletons";
export default function ImageCardRow({index}:{index:number}) {

    const [data, setData] = useState<Cat[]>([]);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const [initialLoading, setInitialLoading] = useState<boolean>(false);
    const [additionalLoading, setAdditionalLoading] = useState<boolean>(false);
;
    const fetchInitialData = async (num:number) => {
        const API_URL =
          `https://api.thecatapi.com/v1/images/search?limit=${num}`;

        try {
          setInitialLoading(true);
          const res = await axios.get(API_URL, { headers: { 'x-api-key' : process.env.NEXT_PUBLIC_X_API_KEY } });
          setData((prevData) => [...prevData, ...res.data]);
        } catch (e) {
          console.log(e);
        } finally {
          setInitialLoading(false);
        }
    };

    const fetchAdditionalData = async (num:number) => {
        const API_URL =
          `https://api.thecatapi.com/v1/images/search?limit=${num}`;

        try {
          setAdditionalLoading(true);
          const res = await axios.get(API_URL, { headers: { 'x-api-key' : process.env.NEXT_PUBLIC_X_API_KEY } });
          setData((prevData) => [...prevData, ...res.data]);
        } catch (e) {
          console.log(e);
        } finally {
          setAdditionalLoading(false);
        }
    };

    useEffect(() => {

        fetchInitialData(5);
      }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              fetchAdditionalData(2);
            }
          },
          { threshold: 0.5 }
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
        <div className="flex flex-col">
            {initialLoading && (index % 2 === 0 ? <ImageCardRowSkeleton1 /> : <ImageCardRowSkeleton2 />)}
            {!initialLoading && data.map((cat, index) => (
                <ImageCard key={index} cat={cat} />
            ))}
            {additionalLoading && <ImageCardSkeleton imgWidth={300} imgHeight={300}/> }
        <div ref={observerRef}/>
        </div>
    )
}
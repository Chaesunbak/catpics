'use client';

import ImageCardRow from './ui/imagecardrow';
import { useMediaQuery } from 'react-responsive'

export default function Home() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  return (
    <>
      <header>
        <a href='/'><h1 className="font-sans text-5xl text-center text-white drop-shadow-2xl">Many Cat Pics.com</h1></a>
      </header>
      <main
        className="grid grid-cols-2 lg:grid-cols-4 min-h-screen items-start justify-center p-2 md:p-3 lg:p-4 xl:p-5 gap-2 md:gap-3 lg:gap-4 xl:gap-5"
      >
        <ImageCardRow index={0}/>
        <ImageCardRow index={1}/>
        {!isTabletOrMobile && <ImageCardRow index={3}/>}
        {!isTabletOrMobile && <ImageCardRow index={4}/>}
      </main>
    </>
  );
}

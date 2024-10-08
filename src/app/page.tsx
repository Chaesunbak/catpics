'use client';

import ImageCardCol from './ui/imagecardcol';
import { useMediaQuery } from 'react-responsive'
import ButtonScollToTop from './ui/buttonscolltotop';
import ButtonShare from './ui/buttonshare';

export default function Home() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  return (
    <>
      <header className='my-4'>
        <a href='/'><h1 className="font-sans text-5xl text-center text-white drop-shadow-2xl">Many Cat Pics.com</h1></a>
      </header>
      <main
        className="grid grid-cols-2 lg:grid-cols-4 min-h-screen items-start justify-center p-2 md:p-3 lg:p-4 xl:p-5 gap-2 md:gap-3 lg:gap-4 xl:gap-5"
      >
        <ImageCardCol index={0}/>
        <ImageCardCol index={1}/>
        {!isTabletOrMobile && <ImageCardCol index={3}/>}
        {!isTabletOrMobile && <ImageCardCol index={4}/>}
      </main>
      <footer>
        <nav id="footer-nav">
          <ButtonShare className='fixed bottom-20 right-5 px-3 py-2 bg-primary  text-white text-3xl z-50 border border-white' />
          <ButtonScollToTop className='fixed bottom-5 right-5 px-3 py-2 bg-primary  text-white text-3xl z-50 border border-white' />
        </nav>
      </footer>
    </>
  );
}

export default function ImageCardSkeleton() : JSX.Element{
    return (
        <div className=' bg-white rounded-xl p-2 shadow-lg shadow-accent mb-2 md:mb-3 lg:mb-4 xl:mb-5 overflow-hidden'>
            <div className='flex justify-center overflow-hidden mb-1 min-w-11'>
                <div className="bg-accent-light animate-pulse rounded h-[200px] aspect-square " />
            </div>
            <div className='flex flex-wrap justify-start gap-1'>
                <div className="bg-accent-light animate-pulse rounded h-[24px] w-[30.8px]" />
                <div className="bg-accent-light animate-pulse rounded h-[24px] w-[30.8px]" />
                <div className="bg-accent-light animate-pulse rounded h-[24px] w-[30.8px]" />
                <div className="bg-accent-light animate-pulse rounded h-[24px] w-[30.8px]" />
            </div>
        </div>
    )
}
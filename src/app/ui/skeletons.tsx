export function ImageCardSkeleton({ imgHeight, imgWidth }: { imgHeight: number; imgWidth: number }): JSX.Element {
    return (
        <div className=' bg-white rounded-xl p-2 shadow-lg shadow-accent mb-2 md:mb-3 lg:mb-4 xl:mb-5 overflow-hidden'>
            <div className='flex justify-center overflow-hidden mb-1 min-w-11'>
                <div
                    className="bg-accent-light animate-pulse rounded"
                    style={{ height: `${imgHeight}px`, width: `${imgWidth}px` }}
                />
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

export function ImageCardRowSkeleton1() : JSX.Element{
    return (
        <div className="flwx">
            <ImageCardSkeleton imgHeight={200} imgWidth={300} />
            <ImageCardSkeleton imgHeight={600} imgWidth={300} />
            <ImageCardSkeleton imgHeight={200} imgWidth={300} />
            <ImageCardSkeleton imgHeight={600} imgWidth={300} />
        </div>
    )
}

export function ImageCardRowSkeleton2() : JSX.Element{
    return (
        <div className="flwx">
            <ImageCardSkeleton imgHeight={600} imgWidth={300} />
            <ImageCardSkeleton imgHeight={200} imgWidth={300} />
            <ImageCardSkeleton imgHeight={600} imgWidth={300} />
            <ImageCardSkeleton imgHeight={200} imgWidth={300} />
        </div>
    )
}
import { Cat, Breed, Category } from "../lib/definitions";
import Image from 'next/image';

export default function ImageCard({ cat }: { cat: Cat }) {
    return (
        <div className=' bg-white rounded-xl p-2 shadow-lg shadow-accent mb-2 md:mb-3 lg:mb-4 xl:mb-5 overflow-hidden transition-transform'>
            <div className='flex justify-center overflow-hidden mb-1 min-w-11'>
                <Image className="rounded-lg hover:scale-110 hover:rounded-none transition-all duration-300 " src={cat.url} width={cat.width} height={cat.height} alt="cat pic" />
            </div>
            <div className='flex flex-wrap justify-start gap-1'>
                {cat.breeds && cat.breeds.map((breed : Breed, index:number) => (
                  <div className="bg-primary text-white rounded text-center px-1 hover:underline"key={index}><a href={breed.wikipedia_url} target='_blank'>{breed.name}</a></div>
                ))}
                {cat.categories && cat.categories.map((category : Category, index: number) => (
                  <div className="bg-secondary text-white rounded text-center px-1" key={index}>{category.name}</div>
                ))}
                {cat.url && <div className="bg-accent text-white rounded text-center px-1">{cat.url.slice(-3)}</div>}
                {cat.id && <div className="bg-teritiary text-white rounded text-center px-1">{cat.id}</div>}
            </div>
        </div>
    )
}
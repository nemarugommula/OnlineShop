import React from 'react'
import Card from './Card'
import {useRef} from 'react'
import {ArrowCircleRightIcon,ChevronDoubleRightIcon} from '@heroicons/react/solid';


function Productline({lineTag,products}) {
    const reference = useRef();

    const handle = () => {
        console.log(reference.current.scrollLeft);
        reference.current.scrollLeft+=200;
        console.log(reference.current.scrollLeft);

      };

    return (
        <section className="[background-color:white] my-3">
            <div className="flex align-center justify-between shadow-sm py-2 px-3">
            <h1 className="text-bold font-medium text-xl">{lineTag}</h1>
            <div className="bg-primary text-stone-100 p-2 flex gap-2 align-center justify-center shadow-sm"><button>View All</button> <ArrowCircleRightIcon className="w-5 h-5 text-white"/></div>
            </div>
            <div ref={reference} className=" group relative flex overflow-x-hidden scroll-smooth flex-nowrap  snap-x">
            {products.map((product,index) =><Card key={index} product={index} />)}
            <button onClick={handle} className="py-5 px-1 h-[50%] top-1/2 -translate-y-1/2 z-10 rounded-l-md shadow-xl bg-slate-50 text-primary sticky right-0 opacity-0  group-hover:opacity-100 " >
                <ChevronDoubleRightIcon className=" text-gray-800 h-9 w-9"/>
            </button>
            </div>
        </section>            
    )
}

export default Productline

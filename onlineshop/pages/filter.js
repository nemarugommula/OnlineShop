import React from 'react'
import Navbar from '../components/Navbar'
import {useState} from 'react'
import Product from '../components/Product'

import {ArrowNarrowDownIcon,ArrowNarrowUpIcon} from '@heroicons/react/solid'

function Filter() {

    const Drop = ({title,list})=>{
        const [hide,setHide] = useState(true);
        return (<div className="border-2 p-2">
                <div onClick={()=>setHide(s=>!s)} className="flex items-center justy-between" >
                    <h1>{title}</h1>
                   { hide ? ( <ArrowNarrowUpIcon className="w-3 h-3 text-primary"/> ) : ( <ArrowNarrowDownIcon className="w-3 h-3 text-primary"/> )}
                </div>
                {
                    hide ? (<div >
                    <ul>
                        {list.map((item,index)=>(<li className="p-2" key={index}>{item}</li>))}
                    </ul>
                </div>) : ""
                }
        </div>);
    }


    return (
        <div className="bg-slate-50">
            <Navbar/>
            <main className="mt-2 flex gap-2 max-w-screen-2xl mx-auto">
                <div className="sticky top-5 bg-white shadow-md min-w-[20%] px-2">
                   
                    <h1 classname="p-3 border-b-2 ">Filters</h1>
                    <Drop title="Customer Rating" list={["4 star","3 start" ,"2 start"]}/>
                </div>

                <div className="shadow-md bg-white">
                    <div className="flex gap-4 flex-wrap p-2">
                      <Product/>
                      <Product/>
                      <Product/>
                      <Product/>
                      <Product/>
                      <Product/>
                      <Product/>
                      <Product/>
                      <Product/>

                        </div>
                </div>
            </main>
        </div>
    )
}

export default Filter

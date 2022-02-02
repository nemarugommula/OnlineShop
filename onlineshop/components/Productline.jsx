import React from 'react'
import Card from './Card'

function Productline({lineTag,products}) {
    return (
        <section className="[background-color:white] my-3">
            <div className="flex align-center justify-between shadow-sm py-2 px-3">
            <h1 className="text-bold font-medium text-xl">{lineTag}</h1>
            <button className="bg-primary text-stone-100 p-2 shadow-sm">View All</button>
            </div>
            <div className="flex overflow-x-hidden ">
            {products.map((product,index) =><Card key={index} product={product} />)}
            </div>
        </section>            
    )
}

export default Productline

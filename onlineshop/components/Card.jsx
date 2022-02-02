import React from 'react'
import Image from 'next/image'
import logo from '../public/img.jpg'

function Card({product}) {
    return (
        <div className="flex text-center flex-col p-4 shadow-sm shrink-0">
            <Image className="" width="150px" height="150px" src={logo}/>
            <div>220 Rs.</div>
            <div>22:00:990</div>
        </div>
    )
}

export default Card

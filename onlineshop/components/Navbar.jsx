import React from 'react'
import Image from 'next/image'
import Searchbar from './Searchbar'
import Dropdown from './Dropdown'

function Navbar({logo = "/img.jpg",navItems=["Link1", "Link2", "Link3", "Link4", "Link5"]}) {
    return (
        <div className="sticky top-0 bg-primary shadow-md z-10">
        <div className="flex align-center justify-around py-2 px-2  max-w-screen-xl gap-1 mx-auto">
            <h1 className="underline decoration-wavy decoration-slate-300 text-slate-100 text-xl">BrandName</h1>
            <Searchbar />
            <div className="flex items-center justify-center gap-1">
            {navItems.map((item,index)=><Dropdown {...item} key={index} />)}
            </div>
        </div>
        </div>
    )
}

export default Navbar

import React from 'react'
import Image from 'next/image'
import Searchbar from './Searchbar'

function Navbar({logo = "/img.jpg",navItems=["Link1", "Link2", "Link3", "Link4", "Link5"]}) {
    return (
        <div className="sticky top-0 bg-primary z-10">
        <div className="flex items-center py-3 px-2  max-w-screen-xl	 mx-auto">
            <p className="underline decoration-wavy decoration-slate-300 text-slate-100 text-xl">BrandName</p>
            <Searchbar />
            {navItems.map(item=><p>{item}</p>)}
        </div>
        </div>
    )
}

export default Navbar

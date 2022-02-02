import React from 'react'
import {SearchIcon} from '@heroicons/react/solid'

function Searchbar() {
    return (
        <div className="flex-1 flex align-center justify-start ml-3">
            <input  className="bg-slate-50  focus:outline-none px-3 py-2  w-3/6" placeholder="Search.." type="text" />
            <button className="bg-slate-50 px-2 focus:outline-none"><SearchIcon  class="h-5 w-5 text-primary"/>
</button>
        </div>
    )
}

export default Searchbar;
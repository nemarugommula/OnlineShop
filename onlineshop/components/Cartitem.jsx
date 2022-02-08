import React from 'react'

function Cartitem() {
    return (
        <div className="bg-white shadow-md px-2 my-2 ">

        <div className="flex gap-2 px-1">
            <img 
            className="w-[150px] h-[150px] block cover"
            src="https://images.everydayhealth.com/images/home-remedies-to-stop-a-bad-cough-00-722x406.jpg" />
            <div >
                <h1> METRONAUT men Striped Casual Black, White shirt</h1>
                <p> size </p>
                <p> seller : </p>

            </div>
        </div>
        <div className="py-2 flex items-center gap-4  ml-3 ">
            <div className="flex items-center justify-center gap-2">
                <button className="px-2 rounded-full bg-slate-200"> - </button>
                <p className="border-2 px-1">2</p>
                <button className="px-2 rounded-full bg-slate-200"> + </button>
            </div>
            <button className="outline-none px-2 py-1 shadow-sm font-light"> save for later </button>
            <button className="outline-none px-2 py-1 shadow-sm font-light"> Remove</button>
        </div>
</div>
    )
}

export default Cartitem

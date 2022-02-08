import React from 'react'
import Navbar  from '../../components/Navbar'

function  Account() {
    return (
        <div className="bg-slate-50">
            <Navbar />
            <main className="flex gap-4 max-w-screen-xl mx-auto mt-5">
                <div className="width-[30%] " >
                    <div className="bg-white flex items-center gap-2 shadow-lg p-3 mb-3" >
                        <img className="rounded-full w-10 h-10" src="https://images.everydayhealth.com/images/home-remedies-to-stop-a-bad-cough-00-722x406.jpg"/>
                        <div>
                            <p className="font-light text-sm">Hello</p>
                            <p className="mt-1 font-semibold text-md">Vishnu Nemarugommula</p>
                        </div>
                    </div>

                    <div className="bg-white shadow-md py-4 px-2 ">
                        <div> Accoutn Settings</div>

                    </div>

                </div>

                <div className="flex-1 bg-white shadow-md h-screen overflow-y-scroll">

                </div>
            </main>
        </div>
    )
}

export default  Account

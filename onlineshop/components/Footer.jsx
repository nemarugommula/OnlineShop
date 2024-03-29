import React from 'react'
import navbarData from '../data_utils/navbarDataFiller'

function Footer() {
    return (
        <footer className="p-2 bg-gray-800 w-full text-white">
        <div className="flex flex-wrap gap-2 align-center">
          <div className=" flex flex-1 justify-around lg:border-r-2 border-slate-300 m-5 p-5">
            {navbarData.body.left.map((navsection) => (
              <div key={navsection.heading} className="p-4">
                <h1 className="font-bold text-slate-300 mb-2">{navsection.heading}</h1>
                <ul>
                  {navsection.list.map((link) => (
                    <li key={link} className="text-sm py-2">
                      <a href="">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-5 p-5 m-5 shrink-0">
            {navbarData.body.right.map((navsection) => (
              <div key={navsection.heading} className="p-3">
                <div className="">
                  <h1 className="font-bold text-slate-300 mb-2">{navsection.heading}</h1>
                  <ul>
                    {navsection.list.map((link) => (
                      <li key={link} className="underline decoration-1 decoration-slate-300">
                        <a href="">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex align-center gap-3 justify-around border-t-2 border-black-200 py-3 px-2">
                      <div className="flex gap-2">
                        {navbarData.footer.left.map(punch=><h1 key={punch} >punch</h1>)}
                      </div>

                      <div className="font-bold text-slate-300">
                        <h1>{navbarData.footer.center}</h1>
                      </div>
                      <div className="flex gap-2">
                        {navbarData.footer.right.map(logo=><h1 key={logo}>{logo}</h1>)}
                      </div>
        </div>
      </footer>
    )
}

export default Footer

import React from 'react'

function OTP() {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-stone-200">
        <div className="h-2/4 relative bg-primary rounded-lg aspect-square shadow-xl px-2 py-3 flex flex-col gap-5 ustify-start items-center">
          <div className="">
            <div className="text-center">
              <label className="block text-grey-500 my-2  font-light text-lg">
                ENTER OTP
              </label>
              <div className=" flex gap-2 ml-4 justify-center ">     
              {/* <div> timer can be inserted here</div>             */}
                  <input
                    placeHolder="123456"
                    type="number"
                    className=" placeholder:text-center outline-none px-3 py-1 text-xl leading-10 rounded-md tracking-widest"
                  />
                <button className="shadow-lg bg-orange-500 rounded-md outline-none px-3 ">
                  Verify 
                </button>
              </div>
            </div>
            <img className="block w-[80%] p-4 absolute bottom-0" src="/otp.svg"/>
          </div>
        </div>
      </div>
    )
}

export default OTP

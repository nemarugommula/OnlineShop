import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Carousel from '../../components/Carousel'

function Product() {
    return (
        <div >
            <Navbar/>
            <main className="flex gap-5">
                <div className="bg-slate-800" className="w-1/3 border-4  border-sky-800 m-5 ">
                <Carousel thumbWidth={"80px"}  showThumbs={true} showArrows={false} showIndicators={false}  apply={{ objectFit: 'cover'}} />
                </div>
                <div className="bg-green-200">

                </div>
            </main>

            <Footer/>
        
        </div>
    )
}

export default Product

import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Carousel from '../../components/Carousel'
import caroseldata from '../../data_utils/campaignDataFiller'
import Navlinksdata from '../../data_utils/navLinkDataFiller'
import ProductLine from '../../components/Productline'

function Product() {
    return (
        <div className="bg-slate-50">
            <Navbar navItems={Navlinksdata}/>
            <main className="flex flex-1 gap-5 max-w-screen-xl mx-auto p-5 shadow-md items-start bg-white ">
                <div  className="w-1/3  sticky top-[80px]">
                <Carousel data={caroseldata} thumbWidth={"80px"}  showThumbs={true} showArrows={false} showIndicators={true}  apply={{ objectFit: 'cover'}} />
                <div className="flex gap-2 p-2 items-center justify-center">
                    <button class="bg-orange-400 text-slate-50 px-4 py-3">Add to card</button>
                    <button class="bg-primary text-slate-50 px-4 py-3">Buy Now</button>
                </div>
                </div>
                <div className="p-2">
                    <h1 className="text-2xl font-semibold">Reynolds Jiffy Blue Pen Packet Gel Pen  (Pack of 25, Blue)</h1>
                    <p>4.31,351 Ratings & 125 Reviews</p>
                    <p>₹135₹15010% off</p>
                    <p className="[height:100vh]"> 

Available offers

Combo OfferBuy 2-3 items save 5%;Buy 4 or more save 10%See all productsT&C

Bank OfferFlat ₹50 Instant Cashback on Paytm Wallet. Min Order Value ₹500. Valid once per Paytm accountT&C

Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit CardT&C

Partner OfferSign up for Flipkart Pay Later and get Flipkart Gift Card worth ₹100*Know More</p>


                </div>
            </main>
            <div className="bg-stone-500 max-w-screen-xl mx-auto">
                <ProductLine lineTag="Related Products" products={[  "a",
              "b",
              "c",
              "d",
              "a",
              "b",
              "d",
              "a",
              "b",
              "d",]}/>
            </div>

            <Footer/>
        
        </div>
    )
}

export default Product

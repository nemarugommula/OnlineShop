import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Productline from "../components/Productline";
import Footer from "../components/Footer";
import campaigns from '../data_utils/campaignDataFiller';
import categories from '../data_utils/categoryDataFiller';
import Image from 'next/image'
import {ArrowRightIcon} from '@heroicons/react/solid';
import Navlinksdata from '../data_utils/navLinkDataFiller'


export default function Home() {
  return (
    <div className="bg-slate-100">
      <Meta />
      <Navbar navItems={Navlinksdata}/>
      <div className="bg-slate-50 p-3 shadow-sm">
        <div className=" flex gap-2 align-center justify-center  max-w-screen-xl mx-auto ">
          {categories.map((category,index)=>(
            <div className="px-2 text-center" key={index}>
              <img className="block w-24 h-24 object-cover rounded-md"  src={category.src} />
              <h1 className="font-light text-md">{category.label}</h1>
            </div>
          ))}
          <div className="px-2">
          <button className="shadow-md  p-4 rounded-full"><ArrowRightIcon className="h-7 w-7 text-primary" /></button>
          </div>
        </div>
      </div>
      
      <main className="my-1 ">
        <div className="max-w-screen-2xl mx-auto shadow my-2">
          <Carousel
            showThumbs={false}
            showArrows={true}
            showIndicators={false}
            autoFocus={true}
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            stopOnHover={true}
            data={campaigns}
            apply={{ height: "300px", objectFit: "cover" }}
          />
        </div>
       <div className="max-w-screen-2xl mx-auto">
       {[
          "Deals of the day",
          "Trending",
          "New Launched",
          "Discounts For you",
          "Recommended items",
          "more to explore",
          "Recently viewed",
        ].map((tag) => (
          <Productline
            key={tag}
            lineTag={tag}
            products={[
              "a",
              "b",
              "c",
              "d",
              "a",
              "b",
              "d",
              "a",
              "b",
              "d",
              "a",
              "b",
            
            ]}
          />
        ))}
       </div>
      </main>
      <Footer />
    </div>
  );
}

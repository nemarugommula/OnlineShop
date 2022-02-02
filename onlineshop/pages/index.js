import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Productline from "../components/Productline";
import Footer from "../components/Footer";
import campaigns from '../data_utils/campaignDataFiller';

export default function Home() {
  return (
    <div className="bg-slate-100">
      <Meta />
      <Navbar />
      <div className="bg-slate-50 p-3 shadow-sm">
        <div className="flex align-center content-center h-24"></div>
      </div>
      <main className="my-1 ">
        <div className="max-w-screen-2xl mx-auto shadow my-2">
          <Carousel
            showThumbs={false}
            showArrows={true}
            showIndicators={true}
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

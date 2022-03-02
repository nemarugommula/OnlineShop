import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import campaigns from "../data_utils/campaignDataFiller";
import { useRouter } from "next/router";

function Slider({ data = [], apply, ...props }) {
  const router = useRouter();

  return (
    <Carousel
      onClickItem={(index) => {
        if (data[index].record_id && data[index].table_name) {
          router.push(`/${data[index].table_name}/${data[index].record_id}`);
        }
      }}
      {...props}
    >
      {data.map((i, index) => (
        <img
          className="w-full h-full object-cover"
          key={index}
          style={apply}
          src={i.url}
        />
      ))}
    </Carousel>
  );
}

export default Slider;

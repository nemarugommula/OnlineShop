import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader



function Slider({data,apply,...props}) {
    return (
        <Carousel {...props}>
            {data.map((i,index)=><img key={index} style={apply} src={i}/>)}
        </Carousel>
    );
}


export default Slider

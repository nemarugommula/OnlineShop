import React from "react";
import Image from "next/image";
import logo from "../public/img.jpg";
import { motion } from "framer-motion";
import Link from "next/link";
function Card({ product }) {
  return (
    <div className="shadow-sm shadow-gray-500 snap-center   overflow-hidden pb-2 rounded-sm m-3 shrink-0">
      <Link href={`/products/${product.id}`}>
        <a className="block">
          <div className="w-72 overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.2 }}
              className="w-full aspect-video  inline-block object-cover"
              src={product.picture}
            />
          </div>
          <div className="px-2 w-full">
            <h1 className="font-light tracking-widest leading-10 text-lg text-grey-500">
              {product.name} - <span className="text-orange-300">rating</span>
            </h1>
            <h3 className="text-primary">{product.price}</h3>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default Card;

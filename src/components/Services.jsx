"use client";
import "../app/globals.css";
import Image from "next/image";
import { useState } from "react";
import ProductServices from "../components/ProductServices"

export default function Services() {
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="w-full h-[180vh] bg-[#0e0c15] flex-col overflow-hidden relative">
        <div
          className="w-full h-[50%] bg-[#0e0c15] flex justify-center  items-start gap-[100px]"
          id="page4up"
        >
          <div className="w-full  h-[70%] flex justify-center ">
          <div className="w-[40%] h-[80%] flex-col align-top pt-[6vw] flex gap-3">
            <h3>Why are you here?</h3>
            <h5 className="text-white">Explore our web design services</h5>
          </div>
          <div className="w-[30%] h-[80%] flex-col align-bottom pt-[6vw]">
            <p className="text-white">
              As a full-service web design agency, we handle all of your
              digital needs under one roof. Our custom web design services
              include thorough research and planning, bespoke designs and
              digital strategies tailored to grow your reach, drive traffic and
              encourage engagement.
            </p>
            {/* <h4>Continue Reading</h4> */}
          </div>
          </div>
        </div>
        <section className="allimages w-full h-[40%] flex z-5 align-middle justify-items-center bg-[#0e0c15]">
          <div className="imagediv ">
            <Image
              src={"/images/sample_project1.webp"}
              alt="rectangle"
              className="image1p4"
              height={100}
              width={100}
            />
          </div>
          <div className="imagediv bg-slate-100">
            <Image
              src={"/images/sample_project1.webp"}
              alt="rectangle"
              className="image1p4"
              height={1000}
              width={1000}
            />
          </div>
          <div className="imagediv ">
            <Image
              src={"/images/sample_project1.webp"}
              alt="rectangle"
              className="image1p4"
              height={1000}
              width={1000}
            />
          </div>
          <div className="imagediv ">
            <Image
              src={"/images/sample_project1.webp"}
              alt="rectangle"
              className="image1p4"
              height={1000}
              width={1000}
            />
          </div>
          <div className="imagediv ">
            <Image
              src={"/images/sample_project1.webp"}
              alt="rectangle"
              className="image1p4"
              height={1000}
              width={1000}
            />
          </div>
        </section>
        <section
          className="w-full h-[10%] bg-[#0e0c15] flex"
          id="belowp4"
        ></section>
      </div>
    </>
  );
}
"use client";
import React from "react";
import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa";
import { useRef, useEffect } from 'react';
import OnScrollAnimation from "./OnScrollAnimmation";





export default function AboutUs() {
 
  //On Scroll Animation Function
  useEffect(() => {
		if (typeof document !== 'undefined') {
			// will run in client's browser only
			var hiddenElements1 = document.querySelectorAll(".hidden3");
			var hiddenElements = document.querySelectorAll(".hidden2");
			var hiddenElement2 = document.querySelectorAll(".hidden1");
			var hiddenElement3 = document.querySelectorAll(".hidden4");
	
			//   var hiddenElement2 = document.querySelectorAll(".hidden3");
			// console.log(hiddenElements);
			OnScrollAnimation(hiddenElements1)
			OnScrollAnimation(hiddenElements)
			OnScrollAnimation(hiddenElement2)
			OnScrollAnimation(hiddenElement3)
	
			//    OnScrollAnimation(hiddenElement2)
		}
       
    }, []);
  
 


  return (
    <div className=" h-[120vh] md:h-screen xl:h-screen flex flex-col md:flex-row  bg-[#00042a] w-full relative " >
       <div className="circles" id="cir1"></div>
         
         
      <section className="abcd2 flex-1 flex flex-col justify-center z-4 items-start p-8 md:p-12 text-white hidden2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Creative Web Agency Delivering Custom Solutions
        </h1>
        <ul className=" space-y-6 text-lg md:text-xl lg:text-2xl">
          <li className="abcd flex items-center" >
            <FaLocationArrow fill="cyan" className="mr-2" />
            <span>
              Custom Web Design Solutions{" "}
              <span className="text-cyan-300 font-bold">
                To Drive Conversions
              </span>
            </span>
          </li>
          <li className=" abcd flex items-center">
            <FaLocationArrow fill="cyan" className="mr-2" />
            <span>
              Effective Marketing Campaigns{" "}
              <span className="text-cyan-300 font-bold">
                To Generate Growth
              </span>
            </span>
          </li>
          <li className="abcd flex items-center">
            <FaLocationArrow fill="cyan" className="mr-2" />
            <span>
              Tailored Branding Strategies{" "}
              <span className="text-cyan-300 font-bold">
                To Drive Engagement
              </span>
            </span>
          </li>
        </ul>
      </section>
      <section className="flex-1 flex justify-center items-center p-8 md:p-12 z-4 hidden4">
        <Image
          src="/images/solutions.webp"
          width={600}
          height={600}
          alt="solutions"
          className="rounded-lg shadow-lg"
        />
      </section>
    </div>
  );
}

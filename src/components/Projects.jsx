"use client";

import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa";
import { GoChevronRight } from "react-icons/go";
import Temp from "../Assets/IMG/tem1.png"
import Link from "next/link";
import { useRef,useEffect } from 'react';
import OnScrollAnimation from "./OnScrollAnimmation";


export default function Projects() {

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



  // Define the project objects
  const projects = [
    {
      src: "/images/temp2back.png",
      title: "SalahCar",
      src2:"/images/tem2.png",
      desc:"Unleashing Your Automotive Adventure",
      link:"https://thesalahcar.com/"
    },
   
    {
      src: "/images/temp5back.png",
      title: "Revol-Tail",
      src2:"/images/tem5.png",
      desc:"Featured Website Design Projects Custom B2C, B2B and eCommerce solutions",
      link:"https://silaaiwale.netlify.app/"
    },
   
    {
      src: "/images/projects/temp7back.png",
      title: "Sangeet",
      src2:"/images/projects/sangeet.png",
      desc:"Featured Website Design Projects Custom B2C, B2B and eCommerce solutions",
      link:"https://websangeet.netlify.app/"
    },
    {
      src: "/images/projects/girlcomputer.png",
      title: "Achivemap",
      src2:"/images/projects/tem4.png",
      desc:"Featured Website Design Projects Custom B2C, B2B and eCommerce solutions",
      link:"https://achievemap.vercel.app"
    },
  ];

  return (
    <div className=" min-h-screen flex flex-col items-center bg-[#00042a] w-full text-white p-8 pb-40 " >
      <section className="abcd2 flex justify-center items-center flex-col space-y-3 mb-8 gap-2 hidden1">
        <h2 className="scaleanimation  text-[2rem] md:text-[3rem] xl:text-[4rem] font-bold">OUR WORK</h2>
        <h1 className="scaleanimation  text-[1.6rem] md:text-[2] xl:text-[3rem] text-cyan-300  text-center">
          Featured Website Design Projects
        </h1>
        <div className="flex justify-center items-center flex-col gap-3">
          <p className="scaleanimation text-[0.8rem] xl:text-[1.2rem] ">
            Custom B2C, B2B and eCommerce solutions
          </p>
          <p className="scaleanimation text-[0.9rem] xl:text-[1rem] text-center">
            optimized for traffic, engagement and conversion.
          </p>
        </div>
      </section>
      <section className="projectspage flex flex-wrap justify-center w-full">
        {projects.map((project, index) => (
          <div key={index} className="contentimg relative  w-full md:w-1/2 p-2 rounded-xl hidden3"  >
            <Image
              src={project.src}
              alt={project.title}
              className="object-cover w-full h-full imagebig rounded-xl  "
              height={1000}
              width={1000}
            />
           <div className="insideimg ">
           <Image
              src={project.src2}
              alt={project.title}
              className=" object-cover"
              height={800}
              width={800}
            />
           </div>
            
            <div className="blackout w-full h-[80%] bg-black  ">
            <h3 className="projectnbtn absolute top-6 left-8 text-2xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-md">
              {project.title}
            </h3>
              <h5 className="projecth text-3xl md:text-4xl lg:text-5xl font-bold mb-6" >Featured Website Design</h5>
              <p className="projectp"> {project.desc} </p>
              <Link href={project.link} target="_blank">
              <h2 className="projectlink flex flex-row justify-center items-center">LAUNCH THE WEBSITE <GoChevronRight className="sideicon"/>
              </h2>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

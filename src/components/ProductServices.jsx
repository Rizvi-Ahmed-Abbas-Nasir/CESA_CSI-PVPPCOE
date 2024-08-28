"use client";
import { useState, useEffect } from "react";
import OnScrollAnimation from "./OnScrollAnimmation";

export default function ProductServices() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

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
    <div className="w-full h-[250vh] lg:h-[100vh] xl:h-[120vh] flex flex-col items-center justify-start bg-[#000125] relative py-10  gap-8 z-[100] pt-10">
      <div className="flex flex-col items-center w-full gap-2 justify-center hidden1">
        <h2 className=" text-[1.5rem] xl:text-[3rem] text-cyan-300 ">Our Website Design Process</h2>
        <h5 className="text-white text-[0.6rem] xl:text-2xl">
          How to create a website tailored to your unique business goals?
        </h5>
        <h5 className="text-white text-[0.7rem] xl:text-lg">
          Take a look at our design process that helps us deliver
        </h5>
        <h4 className="text-white text-[0.5rem] xl:text-sm">
          Customized and goal-oriented digital solutions.
        </h4>
      </div>
      <div
        className={`w-[95%]  h-[70%]  relative CardProduct ${
          isHovered ? "bg-img-hover" : "bg-img-default"
        }  ${isHovered2 ? "bg-img-hover2" : "bg-img-default"}
         ${isHovered1 ? "bg-img-hover1" : "bg-img-default"}`}
      >
        <div className="Cards"></div>
        <div className="flex flex-col lg:flex-row xl:flex-row justify-around h-full  w-full lg:h-[100%] xl:h-full relative z-2">
          <div
            className={` w-[100%]  lg:w-[40rem] xl:w-[30rem] lg:h-full h-[30rem] xl:h-full p-10 flex flex-col items-center justify-end   sm:border-b  xl:border-r  lg:border-r cursor-pointer   Cardone`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex items-center justify-center gap-5 CardDiv">
              <h1 className="text-[4rem] text-white">01</h1>
              <div>
                <h1 className="text-white text-[1.5rem] font-bold">
                  Custom Web Design & Development
                </h1>
              </div>
            </div>
            <div className="CardPara text-white w-full">
              <p>
              Unlock your brands potential with our custom web design services,
               tailored to meet your unique business needs.
                Partner with us to build a website that not only looks great but performs seamlessly.
              </p>
            </div>
          </div>
          <div
            className={` w-[100%] lg:w-[40rem] xl:w-[30rem] h-[30rem] xl:h-full lg:h-full p-10 flex flex-col items-center justify-end border-b xl:border-r  lg:border-r cursor-pointer   Cardone`}
            onMouseEnter={() => setIsHovered1(true)}
            onMouseLeave={() => setIsHovered1(false)}
          >
            <div className="flex items-center justify-center gap-5 CardDiv">
              <h1 className="text-[4rem] text-white">02</h1>
              <div>
                <h1 className="text-white text-[1.5rem] font-bold">
                  Android Design & Development
                </h1>
              </div>
            </div>
            <div className="CardPara text-white w-full">
              <p>
              Transform your ideas into powerful mobile and web applications with 
              our custom app development services. We specialize in creating tailored solutions
               that meet your specific business needs, ensuring a seamless user experience.
              </p>
            </div>
          </div>
          <div
            className={` w-[100%] xl:w-[30rem] h-[30rem] lg:w-[40rem] xl:h-full lg:h-full  p-10 flex flex-col items-center justify-end cursor-pointer   Cardone`}
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
          >
            <div className="flex items-center justify-center gap-5 CardDiv">
              <h1 className="text-[4rem] text-white">03</h1>
              <div>
                <h1 className="text-white text-[1.5rem] font-bold">
                  Software Design & Development
                </h1>
              </div>
            </div>
            <div className="CardPara text-white w-full">
              <p>
              Elevate your business with our custom software development services,
               designed to streamline operations and boost efficiency.
               Our experienced team ensures seamless integration, robust performance,
                and scalability for future growth.
              </p>
            </div>
          </div>
          {/* Repeat similar blocks for other cards */}
        </div>
      </div>
    </div>
  );
}

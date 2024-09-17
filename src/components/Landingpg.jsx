"use client";
import oneIMG from "../Assets/IMG/1.png";
import twoIMG from "../Assets/IMG/2.png";
import threeIMG from "../Assets/IMG/3.png";
import fourIMG from "../Assets/IMG/4.png";
import fiveIMG from "../Assets/IMG/7.png";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import OnScrollAnimation from "./OnScrollAnimmation";

export default function Landing() {
  const videoRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensures this part runs only on the client
    setIsClient(true);

    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }

    // On Scroll Animation Function
    if (typeof document !== "undefined") {
      const hiddenElements1 = document.querySelectorAll(".hidden3");
      const hiddenElements = document.querySelectorAll(".hidden2");
      const hiddenElement2 = document.querySelectorAll(".hidden1");
      const hiddenElement3 = document.querySelectorAll(".hidden4");

      OnScrollAnimation(hiddenElements1);
      OnScrollAnimation(hiddenElements);
      OnScrollAnimation(hiddenElement2);
      OnScrollAnimation(hiddenElement3);
    }
  }, []);

  return (
    <div className="w-full flex flex-col ">
      <div className="HomePage ">
        {/* Only render the video if on the client side */}
        {isClient && (
          <video ref={videoRef} autoPlay="autoplay" loop="loop" muted>
            <source src="/_next-video/gd.mp4" type="video/mp4" />
          </video>
        )}
        <div className="overlay"></div>
        <div className="text ">
          <h2 className="text-[0.8rem] md:text-[1.2rem] lg:text-[3rem] xl:text-[6rem] hidden2">
            CESA & CSI
          </h2>
          <h3 className="text-[0.6rem] md:text-[1.1rem] lg:text-[2rem] xl:text-[3.7rem] hidden2">
            VPPCOE-VA
          </h3>
          <p className="text-[05rem] md:text-[0.8rem] lg:text-[1rem] xl:text-[1.1rem] hidden2">
            Computer Engineering Student Association
          </p>
          <div className="hidden2">
            <a href="/contact-us" className="hidden2">
              Mission & Vision
            </a>
          </div>
        </div>
      </div>

      <div className="slider bg-gradient-to-br from-purple-700 to-blue-900 ">
        <div className="slide-track z-4">
          <div className="slide z-4">
            <Image src={oneIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={twoIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={threeIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={fourIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={fiveIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={threeIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={fiveIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={oneIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={fourIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={oneIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={twoIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={oneIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={fiveIMG} height="100" width="250" alt="" />
          </div>
          <div className="slide">
            <Image src={fourIMG} height="100" width="250" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

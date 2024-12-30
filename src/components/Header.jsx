"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../Assets/IMG/cesapng.png";
import Link from "next/link";
import { usePathname } from "next/navigation"; // For App Router, if using Pages Router, use next/router

export default function Header() {
  const [active, setActive] = useState(false);
  const pathname = usePathname(); // Get the current path

  

  return (
    <div className="fixed  w-full  top-0 flex justify-center left-0 z-50 ">
      <div className="lg:h-[10.5vh] h-[10vh] w-full flex justify-between items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <div className="flex items-center gap-1 md:gap-2 w-[20rem]">
          <div>
            <Image className="w-[4rem] md:w-[5rem]" src={Logo} width={50} height={50} alt="img" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-n-1">CESA-CSI VPPCOE-VA</h3>
            <p className="text-n-1 text-xs">Initiated by Computer Department</p>
          </div>
        </div>

        {/* <div className="hidden uppercase w-[45%] xl:flex justify-start text-n-1 transition-colors hover:text-color-1">
          <ul className="flex justify-center gap-15 text-xs text-neutral-100">
            <li>
              <Link href="/" className={`${
                    pathname === "/"
                      ? "bg-blue-500 text-[.9rem] p-2 rounded"
                      : " text-[.9rem] hover:bg-blue-500 p-2 rounded"
                  }`}>
                  Home
              </Link>
            </li>
            <li>
              <Link href="/about-us" className={`${
                    pathname === "/about-us"
                      ? "bg-blue-500  text-[.9rem] p-2 rounded"
                      : " text-[.9rem] hover:bg-blue-500 p-2 rounded"
                  }`}>
                  About Us
              </Link>
            </li>
            
            <li>
              <Link href="/our-work" className={`${
                    pathname === "/our-work"
                      ? "bg-blue-500 text-[1rem] p-2 rounded"
                      : "text-[1rem] hover:bg-blue-500 p-2 rounded"
                  }`}>
                  Events
              </Link>
            </li>
            <li>
              <Link href="/gallary" className={`${
                    pathname === "/gallary"
                      ? "bg-blue-500  text-[.9rem] p-2 rounded"
                      : " text-[.9rem] hover:bg-blue-500 p-2 rounded"
                  }`}>
                  Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className={`${
                    pathname === "/contact-us"
                      ? "bg-blue-500  text-[.9rem] p-2 rounded"
                      : " text-[.9rem] hover:bg-blue-500 p-2 rounded"
                  }`}>
                  Contact Us
              </Link>
            </li>
          </ul>
        </div> */}
        {/* <Link href="/login" className="cursor-pointer ">
        <div className="text-n-1 contactOnHover xl:inline-flex hidden cursor-pointer rounded-xl text-xs w-[7rem] border-[2px] button relative items-center justify-center h-11 transition-colors hover:text-color-1">
            <h4>
             
                Register
            </h4>
        </div>
        </Link> */}

        <div
          className="HamBurgerIcon flex justify-center h-[6vh] items-center w-[4rem] rounded-2xl  border-[2px]"
          onClick={() => setActive(!active)}
        >
          <label
            className="label flex h-[13vh] justify-center justify-items-center"
            htmlFor="check"
          >
            <input className="input" type="checkbox" id="check" />
            <span className="span"></span>
            <span className="span"></span>
          </label>
        </div>
        <div className={active ? "Sub-SideNav-on-click" : "Sub-SideNav"}>
          <div className="menuItems">
            <Link href="/">
              <h4>Home</h4>
            </Link>
            <Link href="/about-us">
              <h4>About Us</h4>
            </Link>
            <Link href="/contact-us">
              <h4>Contact Us</h4>
            </Link>
            <Link href="/our-work">
              <h4>Our Work</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

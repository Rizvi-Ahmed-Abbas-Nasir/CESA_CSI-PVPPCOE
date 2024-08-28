"use client";
import Image from "next/image";
import Logo from "../Assets/IMG/cesapng.png";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

export default function Header() {

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      //   var hiddenElements1 = document.querySelectorAll(".hidden1");
      //   OnScrollAnimation(hiddenElements1);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", isSticky);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", isSticky);
      }
    };
  });
  const isSticky = (e) => {
    const header = document.querySelector(".header-section");
    const scrollTop = window.scrollY;
    scrollTop >= 80
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };

  return (
    <div className="fixed Header w-full header-section top-0 flex justify-center left-0  z-50  border-b border-n-7  lg:backdrop-blur-sm  ">
      <div className=" lg:h-[10.5vh] h-[11vh] w-full flex justify-between items-center  px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <div className="flex items-center gap-1 md:gap-2 w-[20rem]">
          <div>
            <Image className="w-[4rem] md:w-[5rem]" src={Logo} width={50} height={50} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-n-1">CESA-CSI VPPCOE-VA</h3>
            <p className="text-n-1 text-xs">Initiated by Computer Department</p>
          </div>
        </div>

        <div className="  hidden uppercase w-[45%] xl:flex justify-start text-n-1 transition-colors hover:text-color-1">
          <ul className="flex justify-center gap-15 text-xs text-neutral-100">
            <Link href={"/"} className="cursor-pointer hover:text-white">
              Home
            </Link>
            <Link
              href={"/about-us"}
              className="cursor-pointer hover:text-white"
            >
              About us
            </Link>
            <Link href={'/contact-us'} className="cursor-pointer hover:text-white">Contact us</Link>
            <Link href={'/our-work'} className="cursor-pointer hover:text-white">Our Work</Link>
          </ul>
        </div>
        <div className="text-n-1 contactOnHover xl:inline-flex hidden cursor-pointer  roun
        ded-md text-xs  w-[7rem] border-[3px] button relative  items-center justify-center h-11 transition-colors hover:text-color-1  ">
          <Link href={'/contact-us'}>
          <button>
            <h3 className="uppercase">Register</h3>
          </button>
          </Link>
        </div>
        <div
          className="HamBurgerIcon  flex justify-center h-[8vh] items-center w-[4rem] rounded-2xl xl:hidden border-[2px]"
          onChange={() => setActive(!active)}
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
        <div className={active ? "Sub-SideNav-on-click" : "Sub-SideNav "}>

          <div className="menuItems">
            <Link href={"/"}>
              <h4>Home</h4>
            </Link>
            <Link href={"/about-us"}>
              <h4>About Us</h4>
            </Link>
            <Link href={"/contact-us"}>
              <h4>Contact Us</h4>
            </Link>
            <Link href={"/our-work"}>
              <h4>Our Work</h4>
            </Link>
            </div>
          </div>
      </div>
    </div>
  );
}

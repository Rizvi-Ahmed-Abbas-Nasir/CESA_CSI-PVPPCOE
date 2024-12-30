"use client";
import Image from "next/image";
import Logo from "../Assets/IMG/cesapng.png";
import Logo2 from "../Assets/IMG/pccoe-csi.png";
import { Lobster  } from 'next/font/google';
import { Rokkitt  } from 'next/font/google';
import { Oswald  } from 'next/font/google';
import { Courgette } from 'next/font/google';
import { useState, useEffect } from "react";


// Fonts Families
const lobster  = Lobster ({ 
  subsets: ['latin'],
  weight: ['400'] 
})

const rokkitt  = Rokkitt ({ 
  subsets: ['latin'],
  weight: ['200'],
  preload: false,
})


const oswald  = Oswald ({ 
  subsets: ['latin'],
  weight: ['400'],
  preload: false,
})

const courgette = Courgette({ 
  subsets: ['latin'],
  weight: ['400'],
  preload: false,
})
import Link from "next/link";

let date = new Date();
const year = date.getFullYear();

const services = [
  {
    title: "Main Services",
    items: [
      "Custom Web Design",
      "Custom App Design",
      "Custom Web Development",
      "Custom App Development",
      "Custom Software Development",
    ],
    links: [
      "#",
      "#",
      "#",
      "#",
      "#",
    ],
  },
  {
    title: "Other Services",
    items: [
      "eCommerce Design",
      "Shopify Website Design",
      "WordPress Web Design",
      "eCommerce Development",
    ],
    links: [
      "#",
      "#",
      "#",
      "#",
    ],
  },
  {
    title: "Location",
    items: [
      "Vasantdada Patil Educational Complex, Eastern Express Highway, Padmabhushan Vasantdada Patil Marg, Sion Mumbai 400022.",
    ],
    links: ["https://maps.apple.com/?address=Padmabhusan%20Vasantdada%20Patil%20Road,%20Chuna%20Bhatti,%20Mumbai,%20400022,%20Maharashtra,%20India&auid=10587837214898840279&ll=19.050103,72.878241&lsp=9902&q=Vasantdada%20Patil%20Pratishthans%20Manohar%20Phalke%20College%20of%20Architecture"],
  },
  {
    title: "Company",
    items: ["About us", "Our Work", "Contact us"],
    links: ["/about-us", "/our-work", "/contact-us"],
  },
];

const contactText = [
  ,
  ,
  "",
  "Call us at (91) 9834118161 9372603618",
];

const contactLinks = [
  {
    href: "#",
    children: ` ©${year} All rights reserved `,
  },
  {
    href: "mailto:consultancy@pvppcoe.ac.in",
    children : "consultancy@pvppcoe.ac.in",
  },
  {
    href: "/privacy-policy",
    children : "Privacy Policy",
  },
  {
    href: "tel:7738282824",
    children : "(91) 7738282824",
  },
 
];

export default function Footer() {
  return (
    <footer className="bg-[#00042a] w-full flex justify-center text-white py-10 md:px-20">
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex w-full justify-center items-center">
        <Image
          src={Logo}
          alt="Company Logo"
          width={150}
          height={150}
          className="mb-6 w-[18rem] teamshow"
        />
          <Image
          src={Logo2}
          alt="Company Logo"
          width={150}
          height={150}
          className="mb-6 w-[12rem] h-[11rem] rounded-[50%] teamshow"
        />
        </div>
       
        <h1 className={` ${courgette.className} text-3xl md:text-6xl font-bold p-4 md:p-6 text-center teamshow`}>
        Creativity & Innovative
        </h1>
        <div className="w-full  flex justify-center gap-5" >
          <div className="w-[50%] h-[50vh] bg-[#0d1238] shadow-xl rounded-xl RoundedCard2 cursor-pointer flex flex-col items-center justify-start p-8">
            <div>  <h1 className={ `${oswald.className} text-white w-full flex item-start text-[3.5rem]`}>CESA </h1></div>
            <div><p className={` ${courgette.className}  text-white text-[1.2rem] pl-20 pr-20 pt-8`}> As a member of the Computer Society of India committee, youll enjoy networking opportunities, skill development, access to the latest trends, career 
              advancement prospects, community contribution, recognition, and valuable resources.</p></div>
          

          </div>
          <div className="w-[50%] h-[50vh] bg-[#0d1238] shadow-xl rounded-xl RoundedCard2 cursor-pointer flex flex-col items-center justify-start p-8">
          <div>  <h1 className={ `${oswald.className} text-white w-full flex item-start text-[3.5rem]`}>CSI </h1></div>
            <div><p className={` ${courgette.className}  text-white text-[1.2rem] pl-20 pr-20 pt-8`}> As a member of the Computer Society of India committee, youll enjoy networking opportunities, skill development, access to the latest trends, career 
              advancement prospects, community contribution, recognition, and valuable resources.</p></div>

          </div>

        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {services.map((service, index) => (
          <div key={index} className="p-5 px-6 text-center">
            <ul className="border-l-4 pl-8">
              <p className="text-2xl md:text-3xl font-semibold pb-5 teamshow">
                {service.title}
              </p>
              {service.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={service.links[idx]}
                    className="pb-2 text-slate-100 font-light hover:text-sky-300 cursor-pointer teamshow"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-6">
        <h1 className="text-4xl font-bold p-6 text-center teamshow">
          PVPPCOE Consultancy
        </h1>
        <div className="w-full max-w-xs border-t border-gray-300"></div>
      </div>

      <div className="flex flex-wrap justify-center mt-4 text-center">
        {contactLinks.map((contact, index) => (
          <Link key={index} href={contact.href} className="px-8 text-slate-100 font-light hover:text-sky-300">
            {contact.children}
          </Link>
        ))}
      </div> */}
    </footer>
  );
}
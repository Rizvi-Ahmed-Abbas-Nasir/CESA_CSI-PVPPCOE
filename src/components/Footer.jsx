"use client";
import Image from "next/image";
import Logo from "../Assets/IMG/Logo.png";
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
    <footer className="bg-gradient-to-b from-darkblue-600 to-cyan-900 text-white py-10 md:px-20">
      <div className="flex flex-col items-center">
        <Image
          src={Logo}
          alt="Company Logo"
          width={150}
          height={150}
          className="mb-6 teamshow"
        />
        <h1 className="text-3xl md:text-6xl font-bold p-4 md:p-6 text-center teamshow">
          Lets Grow Your Brand
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
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
      </div>
    </footer>
  );
}
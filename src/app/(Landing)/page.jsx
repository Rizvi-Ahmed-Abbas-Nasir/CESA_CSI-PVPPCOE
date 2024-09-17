"use client";
import Image from "next/image";
import Landing from "@/components/Landingpg";
import AboutUs from "@/components/AboutUs";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import ProductServices from "@/components/ProductServices";
import LogoPage from "@/components/LogoPage";
import Footer from "@/components/Footer";


export default function Home() {
  
  return (
  
   <div className="bg-[#0e0c15] w-full h-[100vh]">
    
    <Landing />
    <LogoPage />
    {/* <AboutUs/>
    <Projects/>
    <ProductServices /> */}
    <Footer />
   </div>
  );
}


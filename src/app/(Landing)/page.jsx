'use client';

import { useEffect } from "react";
import ScrollProvider from "@/utils/ScrollProvider";
import Landing from "@/components/Landingpg";
import AboutUs from "@/components/AboutUs";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import ProductServices from "@/components/ProductServices";
import LogoPage from "@/components/LogoPage";
import Footer from "@/components/Footer";
import ScrollableCards from "@/components/ScrollableCards";


export default function Home() {

  
  return (
      <div className="h-[100vh]">
        <Landing />
        <LogoPage />
        <ScrollableCards />
        <Footer />
      </div>
  );
}

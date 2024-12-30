"use client";
import Footer from "@/components/Footer";
import { useState } from "react";
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
try {
  emailjs
    .sendForm('service_d5hpehs', 'template_8rhgy8r', '#form','z8Dw4X9gamLOG7blh',
    )
    
    .then(
      () => {
        console.log('SUCCESS!');
        alert('EMAIL Sent')
      },
      (error) => {
        console.log('FAILED...', error.text);
        alert("error: "+error.text)
      },
    );
  console.log("Form data submitted:", formData);

} catch (e) {
  console.log(e)
}
  };

  return (
    <>
      <div className=" h-[300vh] xl:h-[120vh] w-full bg-gradient-to-br from-purple-700 to-blue-900  text-white flex flex-col justify-start md:justify-center  md:flex-row items-center ">
        <div className="flex w-full xl:flex-row flex-col justify-start md:justify-center xl:items-start items-center">
        <div className="flex justify-center">
        <section className=" lg:max-w-3xl  flex flex-col justify-start  items-center md:items-start md:mb-12 md:mx-5 md:px-15 mt-20 ">
          <div className="flex flex-col justify-start items-center md:items-start ">
          <p className="text-xl leading-relaxed">
            TAKE THE ROAD TO
          </p>
          <h1 className=" text-[1.4rem] md:text-[4rem] text-gradient-to-br from-purple-700 to-blue-900 font-extrabold mb-8">
            Digitizing Your Business Growth
          </h1>
          </div>
          <div className="flex gap-10 md:flex-row flex-col justify-center items-center md:w-[80%]">
            <div className="flex flex-col border-none md:border-r pr-5"><div><h3 className=" text-[1rem] md:text-[1.2rem] font-bold">Expert</h3></div><div><p>Team Members</p></div></div>
            <div className="flex flex-col border-none md:border-r pr-5"><div><h3 className="text-[1rem] md:text-[1.2rem] font-bold">Expert</h3></div><div><p>Team Members</p></div></div>
            <div className="flex flex-col"><div><h3 className="md:text-[1.2rem] text-[1rem] font-bold">Expert</h3></div><div><p>Team Members</p></div></div>
          </div>
          <div className=" flex  mt-[5rem] ">
            <div>   <h1 className="text-[1rem] md:text-[1.5rem]">Premium Digital Agency Recognized by</h1></div>
           
         
          </div>
        </section>
        </div>
        <div className="min-h-screen  flex items-center justify-center p-6">
      <form className="bg-white pt-[5rem] p-15 xl:h-[55rem] shadow-md w-[20rem] h-[50rem] xl:w-[45rem] flex flex-col items-start">
        <div className="w-full flex flex-col gap-3">
        <div className="mb-6">
          <h2 className=" text-[0.8rem] md:text-[1.2rem] font-bold text-blue-900">LETS GROW YOUR BRAND ONLINE</h2>
          <h1 className=" text-[1rem] md:text-[2.5rem] font-bold text-blue-900">Start a conversation with us</h1>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-[0.9rem] md:text-[1.2rem] font-bold mb-2" htmlFor="name">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4a4 4 0 100 8 4 4 0 000-8zm0 8c-4.418 0-8 1.791-8 4v2h16v-2c0-2.209-3.582-4-8-4z" />
            </svg>
            Name*
          </label>
          <input className="border-b-2 w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:border-blue-500" id="name" type="text" placeholder="Enter your name" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700  text-[0.9rem] md:text-[1.2rem] font-bold mb-2" htmlFor="company">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h1m2 0h16m-2 0a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2-2 0 012-2zM4 6h16M4 6a2 2 0 012-2h10a2 2 0 012 2m0 0v4m0-4L12 3m0 0L4 6m8-3v4" />
            </svg>
            Company Name*
          </label>
          <input className="border-b-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" id="company" type="text" placeholder="Enter your company name" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700  text-[0.9rem] md:text-[1.2rem] font-bold mb-2" htmlFor="email">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12l-4-4-4 4m8 4v1a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1m0 0l-4-4m4 4l4-4" />
            </svg>
            Email*
          </label>
          <input className="border-b-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" id="email" type="email" placeholder="Enter your email" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-[0.9rem] md:text-[1.2rem ] font-bold mb-2" htmlFor="phone">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h1m2 0h16m-2 0a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2-2 0 012-2zM4 6h16M4 6a2 2 0 012-2h10a2 2 0 012 2m0 0v4m0-4L12 3m0 0L4 6m8-3v4" />
            </svg>
            Phone*
          </label>
          <input className="border-b-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" id="phone" type="tel" placeholder="Enter your phone number" />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700  text-[0.9rem] md:text-[1.2rem] font-bold mb-2" htmlFor="message">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h1m2 0h16m-2 0a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2-2 0 012-2zM4 6h16M4 6a2 2 0 012-2h10a2 2 0 012 2m0 0v4m0-4L12 3m0 0L4 6m8-3v4" />
            </svg>
            Your Message*
          </label>
          <textarea className="border-b-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" id="message" rows="3" placeholder="Enter your message"></textarea>
        </div>

        <div className="flex items-center justify-start">
          <button className="bg-transparent border-2 mt-[-2rem] border-blue-500 text-blue-500 font-bold py-5 px-6 rounded focus:outline-none focus:shadow-outline hover:bg-blue-500 hover:text-white" type="submit">
            SUBMIT
          </button>
        </div>
        </div>
      </form>
    </div>
    </div>
      </div>
      <Footer />
    </>
  );
}

// 'use client';

// import { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";

// const GSAPAnimation = () => {
//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     console.log("GSAP Animation component mounted.");

//     const animation = gsap.from(".scroll-element", {
//       scrollTrigger: {
//         trigger: ".scroll-element",
//         start: "top 80%",
//         end: "bottom top",
//         scrub: true,
//       },
//       opacity: 0,
//       y: 50,
//       duration: 1,
//       onStart: () => {
//         console.log("GSAP animation started.");
//       },
//       onComplete: () => {
//         console.log("GSAP animation completed.");
//       }
//     });

//     console.log("ScrollTrigger animation set up:", animation);

//     return () => {
//       animation.kill();
//       console.log("GSAP animation cleaned up.");
//     };
//   }, []);

//   return (
//     <div className="scroll-element">
//       <h2>Scroll-triggered Animation</h2>
//       <p>This element fades in and moves up as you scroll down!</p>
//     </div>
//   );
// };

// export default GSAPAnimation;

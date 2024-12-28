// 'use client';

// import { useEffect, useRef } from 'react';
// import LocomotiveScroll from 'locomotive-scroll';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// export default function ScrollProvider({ children }) {
//   const containerRef = useRef(null);

//   useEffect(() => {
  
//     const scroll = new LocomotiveScroll({
//       el: containerRef.current,
//       smooth: true,
//       lerp: 0.1, 
//       multiplier: 1.1, 
//     });

//     scroll.on('scroll', ScrollTrigger.update);

//     ScrollTrigger.scrollerProxy(containerRef.current, {
//       scrollTop(value) {
//         return arguments.length
//           ? scroll.scrollTo(value, { duration: 0, disableLerp: true })
//           : scroll.scroll.instance.scroll.y;
//       },
//       getBoundingClientRect() {
//         return {
//           top: 0,
//           left: 0,
//           width: window.innerWidth,
//           height: window.innerHeight,
//         };
//       },
//       pinType: containerRef.current.style.transform ? 'transform' : 'fixed',
//     });

//     ScrollTrigger.create({
//       trigger: '.example-trigger',
//       scroller: containerRef.current,
//       start: 'top center',
//       end: 'bottom center',
//       markers: true,
//       onEnter: () => console.log('Entered section!'),
//       onLeave: () => console.log('Left section!'),
//     });

//     ScrollTrigger.addEventListener('refresh', () => scroll.update());
//     ScrollTrigger.refresh();

//     return () => {
//       ScrollTrigger.removeEventListener('refresh', () => scroll.update());
//       scroll.destroy();
//     };
//   }, []);

//   return (
//     <div id="scroll-container" ref={containerRef} style={{ overflow: 'hidden' }}>
//       {children}
//     </div>
//   );
// }

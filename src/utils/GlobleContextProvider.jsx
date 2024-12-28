// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create the context
// const GlobalContext = createContext();

// // Context Provider component
// export const ContextProvider = ({ children }) => {
//   const [locoScroll, setLocoScroll] = useState(null);
//   const [preloader, setPreloader] = useState(true);
//   const [cursorSettings, setCursorSettings] = useState({
//     size: 1,
//     color: 'transparent',
//     isBlending: false,
//     text: '',
//     border: '#00000057',
//     blur: false,
//   });

//   useEffect(() => {
//     // This effect runs only in the client
//     if (typeof window !== 'undefined') {
//       // Perform any client-side setup here, if necessary
//     }
//   }, []);

//   return (
//     <GlobalContext.Provider
//       value={{
//         preloader,
//         setPreloader,
//         locoScroll,
//         setLocoScroll,
//         setCursorSettings,
//         cursorSettings,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// // Custom hook to use context values
// export const useContextProvider = () => {
//   const context = useContext(GlobalContext);
//   if (!context) {
//     throw new Error('useContextProvider must be used within a ContextProvider');
//   }
//   return context;
// };

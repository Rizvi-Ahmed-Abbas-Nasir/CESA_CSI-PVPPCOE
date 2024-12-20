import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/authProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CESA-CSI VPPCOE-VA",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={inter.className}> 
        <Toaster position="top-center" reverseOrder={false} />
          <div className="w-full"><AuthProvider>{children}</AuthProvider></div>        
        </div>
      </body>
    </html>
  );
}

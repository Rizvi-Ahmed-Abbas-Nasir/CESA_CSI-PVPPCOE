import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
          <div className="w-full">{children}</div>        
        </div>
      </body>
    </html>
  );
}

import Calculator from "@/components/calculator";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-custom">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-8 ">
        {/* Responsive Background & Header Section */}
        <div className="relative w-full bg-calculator bg-no-repeat bg-left bg-contain lg:h-[392px] md:h-[300px] h-[200px] flex items-center justify-start">
          <div className="ml-10 sm:ml-20 md:ml-32 lg:ml-40">
            <h1 className="text-white font-light pl-10 sm:pl-16 md:pl-20 text-4xl sm:text-5xl md:text-6xl lg:text-[96px] leading-tight lg:leading-[144px]">
              Calculator
            </h1>
          </div>
        </div>

        {/* Calculator Component */}
        <Calculator />
      </div>
      <Footer />
    </main>
  );
}

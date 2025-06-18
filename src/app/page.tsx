"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Hero from "@/components/hero/hero";
import Projetos from "@/components/projetos/projetos";
import Stact from "@/components/Stack/stack";

export default function Home() {
  const limit = 3;

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <>
      <div
        className="w-full min-h-screen flex flex-col overflow-x-hidden"
       
      >
        <Hero />
      </div>

      <div
        className="w-full min-h-screen flex flex-col overflow-x-hidden"
        data-aos="fade-up"
      >
        <Stact />
      </div>

      <div
        className="w-full min-h-screen flex flex-col overflow-x-hidden"
        data-aos="fade-up"
      >
        <Projetos limit={limit} />
        <div className="flex justify-center mt-6" data-aos="zoom-in">
          <a
            href="/projetos"
            className="bg-sky-700 text-white px-4 py-2 rounded flex items-center"
          >
            Ver mais projetos
          </a>
        </div>
      </div>

          
    </>
  );
}

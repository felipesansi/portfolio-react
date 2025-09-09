"use client";

import { motion } from "framer-motion";

const stacks = [
  { src: "/react.svg", alt: "React" },
  { src: "/js.svg", alt: "JavaScript" },
  { src: "/html.svg", alt: "HTML" },
  { src: "/css.svg", alt: "CSS" },
  { src: "/tailwind.svg", alt: "Tailwind CSS" },
  { src: "/bootstrap.svg", alt: "Bootstrap" },
  { src: "/nextjs-light.svg", alt: "Next.js" },
  { src: "/git-icon.svg", alt: "Git" },
  { src: "/vscode.svg", alt: "VSCode" },
  { src: "/csharp.svg", alt: "C#" },
  { src: "/python.svg", alt: "Python" },
  { src: "/nodejs-dark.svg", alt: "Node.js" },
];

export default function Stack() {
  return (
    <>
      <h1 className="flex text-5xl font-bold leading-tight justify-center mb-3 text-sky-700">
        Minhas Stack
      </h1>
      <p className="flex text-1xl font-light justify-center">
        Tecnologias que eu uso
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5 justify-items-center">
        {stacks.map((item, idx) => (
          <motion.img
            key={item.alt}
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="w-20 h-auto transition-transform duration-300 hover:scale-110"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          />
        ))}
      </div>
    </>
  );
}

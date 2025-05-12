export default function Stack() {
  return (
    <>
      <h1 className="flex text-5xl font-bold leading-tight justify-center mb-3 text-sky-700">
        Minhas Stack
      </h1>
      <p className="flex text-1xl font-light justify-center">
        Tecnologias que eu uso
      </p>
      <div className="grid grid-cols-3 gap-4 mt-5 justify-items-center">
        <img
          src="/react.svg"
          alt="React"
          className="w-20 h-auto transition-transform duration-300 hover:scale-110 animate-spin3d"
        />
        <img
          src="/js.svg"
          alt="JavaScript"
          className="w-20 h-auto transition-transform duration-300 hover:scale-110 animate-spin3d"
        />
        <img
          src="/html.svg"
          alt="HTML"
          className="w-20 h-auto transition-transform duration-300 hover:scale-110 animate-spin3d"
        />
        <img
          src="/css.svg"
          alt="CSS"
          className="w-20 h-auto transition-transform duration-300 hover:scale-110 animate-spin3d"
        />
        <img
          src="/tailwind.svg"
          alt="Tailwind CSS"
          className="w-20 h-auto transition-transform duration-300 hover:scale-110 animate-spin3d"
        />
        <img
          src="/bootstrap.svg"
          alt="Bootstrap"
          className="w-20 h-auto transition-transform duration-300 hover:scale-110 animate-spin3d"
        />
        <img
          src="/nextjs-light.svg"
          alt="Next.js"
          className="w-20 h-auto transition-transform duration-300 hover:scale-110 animate-spin3d"
        />
        <img
          src="/git-icon.svg"
          alt="Git"
          className="w-20 h-auto transition-transform duration-300 hover:scale-110 animate-spin3d"
        />
        <img
          src="/vscode.svg"
          alt="VSCode"
          className="w-20 h-auto transition-transform duration-300 hover:scale-110 animate-spin3d"
        />
        <img
          src="/csharp.svg"
          alt="C#"
          className="w-20 h-auto transition-transform duration-300 hover:scale-110 animate-spin3d"
        />
        <img
          src="/python.svg"
          alt="Python"
          className="w-20 h-auto transition-transform duration-300 hover:scale-110 animate-spin3d"
        />
        <img
          src="/nodejs-dark.svg"
          alt="Node.js"
          className="w-20 h-auto transition-transform duration-300 hover:scale-110 animate-spin3d"
        />
      </div>
    </>
  );
}

export default function Hero() {
    return (
        <div className="w-screen h-screen flex items-center justify-between px-20 bg-white text-gray-700">
        
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold leading-tight">Olá</h1>
            <p className="text-4xl font-light">meu nome é</p>
            <h2 className="text-5xl font-bold">
              <span className="text-blue-500">Felipe F.</span>
            </h2>
            <p className="text-4xl font-semibold mt-2">Sou desenvolvedor</p>
          </div>
    
          <div className="relative">
            <img
              src="/Hero.svg"
              alt="Felipe F."
              className=" object-cover"
            
            />
          </div>
        </div>
      );
    }
    
    
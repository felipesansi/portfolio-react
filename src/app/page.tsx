import Hero from "@/components/hero/hero";
import Projetos from "@/components/projetos/projetos";
import Stact from "@/components/Stack/stack";

 export default function Home() 
{
  const limit = 3;
  return(
    <>  

    <div className="w-screen min-h-screen flex-col">
      <Hero />
    </div>
    <div className="w-screen min-h-screen flex-col">
      <Stact />
    </div>
    <div className="w-screen min-h-screen flex-col">
     <Projetos limit={limit} />
    
     <div className="flex justify-center mt-6">
              <a
                href="/projetos" className="bg-sky-700 text-white px-4 py-2 rounded flex items-center" >
                Ver mais projetos
              </a>
            </div>
    </div>
  </>

  );
}
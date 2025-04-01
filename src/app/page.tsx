import Hero from "@/components/hero/hero";
import Projetos from "@/components/projetos/projetos";

 export default function Home() 
{
  const limit = 3;
  return(
    <>  

    <div className="w-screen min-h-screen flex-col">
      <Hero />
    </div>
    <div className="w-screen min-h-screen flex-col">
      
    </div>
    <div className="w-screen min-h-screen flex-col">
     <Projetos limit={limit} />
    </div>
  </>

  );
}
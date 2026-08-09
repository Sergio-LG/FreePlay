import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SobreElProyecto() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-[#f3f4f6]">
      <Navbar />
      <main className="flex-1 max-w-[760px] w-full mx-auto px-8 py-16">

        <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-black text-white mb-8 tracking-tight">
          Sobre el <span className="text-[#f97316]">proyecto</span>
        </h1>

        <div className="flex flex-col gap-4 mb-12 text-[#9ca3af] leading-7 text-base">
          <p>FreePlay es una plataforma que recopila juegos gratuitos de diversas fuentes, como Epic Games, Steam, GOG e itch.io.</p>
          <p>Mi objetivo es ofrecer una experiencia sencilla y directa para que los usuarios encuentren juegos gratuitos y puedan obtenerlos fácilmente.</p>
          <p>La plataforma se actualiza constantemente para ofrecer los últimos juegos gratuitos disponibles, para esto he usado la API gratuita de <a href="https://gamerpower.com/api" target="_blank" rel="noopener noreferrer" className="!text-[#f97316] !underline font-medium hover:!text-orange-400 transition-colors">GamerPower</a>.</p>
          <p>Espero que disfrutes usando FreePlay y que encuentres muchos juegos geniales para jugar.</p>
          <p>Si tienes alguna pregunta o sugerencia, no dudes en contactarme.</p>
          <p>Gracias por usar FreePlay.</p>
          <p className="italic">Sergio López Gil</p>
        </div>

        <div className="border-t border-white/[0.06] pt-10">
          <h2 className="text-[clamp(1.5rem,4vw,2rem)] font-black mb-6 tracking-tight">
            Contacto
          </h2>

          <div className="flex flex-row gap-3">
            <div className="bg-[#1a1a1a] rounded-[25%] px-5 py-2">
                <a href="https://github.com/Sergio-LG" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center w-15">
                    <img src="Github.png" alt="Github" width="50px"/>
                    <p>Github</p>
                </a>
            </div>
            <div className="bg-[#1a1a1a] rounded-[25%] px-5 py-2">
                <a href="https://www.linkedin.com/in/sergio-l%C3%B3pez-gil-1b544339a/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center w-15">
                    <img src="LinkedIn.png" alt="Linkedin" width="50px"/>
                    <p>Linkedin</p>
                </a>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
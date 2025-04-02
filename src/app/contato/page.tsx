export default function Contato() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Entre em contato</h1>
      <p className="text-lg mb-8">Estou aqui para ajudar!</p>
      <div className="w-full max-w-md">
        <p className="text-gray-600 mb-4">
          Se você tiver alguma dúvida ou quiser discutir um projeto, sinta-se à
          vontade para entrar em contato.
        </p>
        <a
          href="https://wa.me/5511997494922" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Fale comigo no WhatsApp
        </a>
      </div>

      <form className="w-full max-w-md">
        <input
          type="text"
          placeholder="Seu nome"
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />
        <input
          type="email"
          placeholder="Seu email"
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />
        <textarea
          placeholder="Sua mensagem"
          className="border border-gray-300 rounded p-2 mb-4 w-full h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-600 transition duration-200"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

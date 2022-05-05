import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="border-b-2 border-gray-100">
      <div className=" py-7 items-center justify-center max-w-6xl mx-auto ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <img
              className="h-8 w-auto sm:h-10"
              src="http://www.utfpr.edu.br/icones/cabecalho/logo-utfpr/@@images/efcf9caf-6d29-4c24-8266-0b7366ea3a40.png"
              alt="logo"
            />
            <Link to="/">Home</Link>
            <Link to="/about">Quem somos</Link>
            <Link to="/contact">Contato</Link>
            <Link to="/news">Novidades</Link>
          </div>

          <div className="flex space-x-10">
            <button>
              <Link to="/login">Entrar</Link>
            </button>
            <button>
              <Link to="/register">Inscrever-se</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

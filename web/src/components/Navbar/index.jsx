import { Link } from "react-router-dom";

export function Navbar({ loggedUser, userName }) {
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
            <Link to="/" className="font-medium text-gray-500 hover:text-indigo-600">Home</Link>
            <Link to="/about" className="font-medium text-gray-500 hover:text-indigo-600">Quem somos</Link>
            <Link to="/contact" className="font-medium text-gray-500 hover:text-indigo-600">Contato</Link>
            <Link to="/news" className="font-medium text-gray-500 hover:text-indigo-600">Novidades</Link>
          </div>
          {loggedUser ? <><div className="flex space-x-10">
            <span className="text-base font-medium text-gray-500">Seja bem-vindo, {userName}</span>
            <Link
              onClick={() => {
                localStorage.removeItem("authorization");
              }}
              to="/login"
              className="text-base font-medium text-gray-500 hover:text-indigo-600"
            >
              Sair
            </Link>

          </div> <button>
              <Link to="/dashboard" className="w-full flex  px-4 py-2  rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Dashboard</Link>
            </button></>
            :
            <div className="flex space-x-10">
              <button>
                <Link to="/login" className="text-base font-medium text-gray-500 hover:text-indigo-600">Entrar</Link>
              </button>
              <button>
                <Link to="/register" className="w-full flex  px-4 py-2  rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Inscrever-se</Link>
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

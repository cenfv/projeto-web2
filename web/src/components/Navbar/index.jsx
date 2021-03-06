import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser, logout } from "../../redux/userSlice";
import logo from "../../assets/logoH.png";

export function Navbar() {
  const { name, isLogged } = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="border-b-2 border-gray-100 shadow-sm">
      <div className=" py-7 items-center justify-center max-w-6xl mx-auto ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <img className="h-12 w-auto" src={logo} alt="logo" />
            <Link
              to="/"
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Quem somos
            </Link>
            <Link
              to="/contact"
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Contato
            </Link>
            <Link
              to="/news"
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Novidades
            </Link>
          </div>
          {isLogged ? (
            <>
              <div className="flex space-x-10">
                <span className="text-base font-medium text-gray-500">
                  Seja bem-vindo, {name}
                </span>
                <Link
                  onClick={() => {
                    localStorage.removeItem("authorization");
                    dispatch(logout());
                    navigate("/dashboard");
                  }}
                  to="/login"
                  className="text-base font-medium text-gray-500 hover:text-indigo-600"
                >
                  Sair
                </Link>
              </div>{" "}
              <button>
                <Link
                  to="/dashboard"
                  className="w-full flex  px-4 py-2  rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Dashboard
                </Link>
              </button>
            </>
          ) : (
            <div className="flex space-x-10">
              <button>
                <Link
                  to="/login"
                  className="text-base font-medium text-gray-500 hover:text-indigo-600"
                >
                  Entrar
                </Link>
              </button>
              <button>
                <Link
                  to="/register"
                  className="w-full flex  px-4 py-2  rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Inscrever-se
                </Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

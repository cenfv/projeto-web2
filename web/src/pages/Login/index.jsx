import Axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeUser } from "../../redux/userSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import * as yup from "yup";

export function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    return Axios.post(`${process.env.REACT_APP_API_URL}/auth`, {
      email: user.email,
      password: user.password,
    }).then((response) => {
      setLoading(false);
      if (response.status === 200 && response.statusText === "OK") {
        dispatch(
          changeUser({
            name: response.data.user.firstName,
            id: response.data.user._id,
          })
        );
        localStorage.setItem("authorization", `Bearer ${response.data.token}`);
        return true;
      }
    });
  };

  const validateUser = async (e) => {
    e.preventDefault();

    if (!(await validate())) return;
    let saveDataForm;
    try {
      saveDataForm = await handleLogin();
    } catch (err) {
      setLoading(false);
      if (
        err.response.status === 404 &&
        err.response.statusText === "Not Found"
      ) {
        setStatus({
          type: "error",
          message: "Usuário ou senha incorretos",
        });
      } else {
        setStatus({
          type: "error",
          message: "Houve um erro ao realizar o login!",
        });
      }
    }
    if (!saveDataForm) return;
    if (saveDataForm) {
      setStatus({
        type: "success",
        message: "Usuário logado com sucesso!",
      });
      setUser({
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  };

  async function validate() {
    let schema = yup.object().shape({
      password: yup
        .string("Por favor insira uma senha!")
        .required("Por favor insira uma senha!"),
      email: yup
        .string("Por favor insira um email!")
        .required("Por favor insira um email!")
        .email("Por favor insira um email válido!"),
    });

    try {
      await schema.validate(user);
      return true;
    } catch (err) {
      setStatus({
        type: "error",
        message: err.errors,
      });
      return false;
    }
  }

  return (
    <div className="bg-indigo-500">
      <div className="flex max-w-6xl m-auto justify-center ">
        <div className="flex min-h-screen items-center ">
          <div className="flex flex-col p-6 rounded-lg shadow-lg bg-white max-w-sm justify-center -mt-10">
            <img
              className="w-1/2 h-medium self-center"
              src="http://www.utfpr.edu.br/icones/cabecalho/logo-utfpr/@@images/efcf9caf-6d29-4c24-8266-0b7366ea3a40.png"
              alt="logo"
            />
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Entrar com sua conta
            </h2>
            <form onSubmit={validateUser}>
              <div className="mt-4">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  onChange={(event) =>
                    setUser({ ...user, email: event.target.value })
                  }
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="mt-3 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  onChange={(event) =>
                    setUser({ ...user, password: event.target.value })
                  }
                />
              </div>

              <div className="flex my-5 justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Lembrar-me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/recover"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Entrar
              </button>
            </form>
            <div className="flex text-sm mt-4">
              <span className="font-medium text-gray-500">
                Precisando de uma conta?
              </span>
              <Link
                to="/register"
                className="ml-1 font-bold text-indigo-600 hover:underline"
              >
                Registre-se
              </Link>
            </div>
            {status.type === "success" ? (
              <p className="text-center mt-4 text-green-500">
                {status.message}
              </p>
            ) : (
              ""
            )}
            {status.type === "error" ? (
              <p className="text-center mt-4 text-red-600">{status.message}</p>
            ) : (
              ""
            )}
            {loading && (
              <div className="flex mt-5 justify-center">
                <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin fill-indigo-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

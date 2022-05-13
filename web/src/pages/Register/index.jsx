import Axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

export function Register() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleRegister = async () => {
    return Axios.post("https://projeto-web2-nodejs.herokuapp.com/user", {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      gender: user.gender,
    }).then((response) => {
      if (response.status === 201 && response.statusText === "Created") {
        return true;
      }
    });
  };

  const addUser = async (e) => {
    e.preventDefault();

    if (!(await validate())) return;
    let saveDataForm;
    try {
      saveDataForm = await handleRegister();
    } catch (err) {
      if (
        err.response.status === 400 &&
        err.response.statusText === "Bad Request"
      ) {
        setStatus({
          type: "error",
          message: "O email fornecido já existe",
        });
      } else {
        setStatus({
          type: "error",
          message: "Houve um erro ao realizar o cadastro!",
        });
      }
    }
    if (!saveDataForm) return;
    if (saveDataForm) {
      setStatus({
        type: "success",
        message: "Usuário cadastrado com sucesso!",
      });
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  async function validate() {
    let schema = yup.object().shape({
      gender: yup
        .string("Por favor selecione o seu gênero!")
        .required("Por favor selecione o seu gênero!"),
      confirmPassword: yup
        .string("Por favor insira uma confirmação da senha!")
        .required("Por favor insira uma confirmação da senha!")
        .oneOf([yup.ref("password")], "As senhas não conferem."),
      password: yup
        .string("Por favor insira uma senha!")
        .required("Por favor insira uma senha!")
        .min(6, "A senha deve possuir um mínimo de 6 caracteres."),
      email: yup
        .string("Por favor insira um email!")
        .required("Por favor insira um email!")
        .email("Por favor insira um email válido!"),
      lastName: yup
        .string("Por favor insira o seu último nome!")
        .required("Por favor insira o seu último nome!"),
      firstName: yup
        .string("Por favor insira um nome!")
        .required("Por favor insira um nome!"),
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
    <div>
      <div className="flex max-w-6xl m-auto justify-center -mt-10">
        <div className="flex min-h-screen items-center">
          <div className="flex flex-col p-6 rounded-lg shadow-lg bg-white max-w-sm justify-center">
            <img
              className="w-1/2 h-medium self-center"
              src="http://www.utfpr.edu.br/icones/cabecalho/logo-utfpr/@@images/efcf9caf-6d29-4c24-8266-0b7366ea3a40.png"
              alt="logo"
            />
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Criar uma nova conta
            </h2>

            <form onSubmit={addUser}>
              <div className="flex mt-4">
                <input
                  id="primeiro-nome"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  className="mr-1 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Primeiro nome"
                  onChange={(event) =>
                    setUser({ ...user, firstName: event.target.value })
                  }
                />
                <input
                  id="sobrenome"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Último nome"
                  onChange={(event) =>
                    setUser({ ...user, lastName: event.target.value })
                  }
                />
              </div>

              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-3 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                className="mt-3 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar senha"
                onChange={(event) =>
                  setUser({ ...user, confirmPassword: event.target.value })
                }
              />

              <label className="font-medium text-black-500 mt-3">Gênero</label>
              <div className="flex text-sm mt-2 space-x-2">
                <div>
                  <input
                    type="radio"
                    id="masculino"
                    name="masculino"
                    value="Masculino"
                    onChange={() => setUser({ ...user, gender: "masculino" })}
                    checked={user.gender === "masculino"}
                  />
                  <label className="ml-1 text-base" htmlFor="masculino">
                    Masculino
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="feminino"
                    name="feminino"
                    value="Feminino"
                    onChange={() => setUser({ ...user, gender: "feminino" })}
                    checked={user.gender === "feminino"}
                  />
                  <label className="ml-1 text-base" htmlFor="feminino">
                    Feminino
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="outro"
                    name="outro"
                    value="Outro"
                    checked={user.gender === "outro"}
                    onChange={() => setUser({ ...user, gender: "outro" })}
                  />
                  <label className="ml-1 text-base" htmlFor="outro">
                    Outro
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cadastrar
              </button>
            </form>

            <div className="flex text-sm mt-2">
              <span className="font-medium text-gray-500">
                Já possui uma conta?
              </span>
              <Link
                to="/login"
                className="ml-1 font-bold text-indigo-600 hover:underline"
              >
                Login
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
          </div>
        </div>
      </div>
    </div>
  );
}

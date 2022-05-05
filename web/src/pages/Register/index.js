import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Register() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [gender, setGender] = useState(null);

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

            <div className="flex mt-4">
              <input
                id="primeiro-nome"
                name="nome"
                type="text"
                autoComplete="given-name"
                required
                className="mr-1 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Primeiro nome"
                onChange={(event) => setFirstName(event.target.value)}
              />
              <input
                id="sobrenome"
                name="sobrenome"
                type="text"
                autoComplete="family-name"
                required
                className="appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Último nome"
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>

            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-3 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-3 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Senha"
              onChange={(event) => setPassword(event.target.value)}
            />

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-3 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirmar senha"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />

            <label className="font-medium text-black-500 mt-3">Gênero</label>
            <div className="flex text-sm mt-2 space-x-2">
              <div>
                <input
                  type="radio"
                  id="masculino"
                  name="masculino"
                  value="Masculino"
                  onChange={() => setGender("masculino")}
                  checked={gender === 'masculino'}
                />
                <label className="ml-1 text-base" htmlFor="masculino" >Masculino</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="feminino"
                  name="feminino"
                  value="Feminino"
                  onChange={() => setGender("feminino")}
                  checked={gender === 'feminino'}
                />
                <label className="ml-1 text-base" htmlFor="feminino" >Feminino</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="outro"
                  name="outro"
                  value="Outro"
                  checked={gender === 'outro'}
                  onChange={() => setGender("outro")}
                />
                <label className="ml-1 text-base" htmlFor="outro" >Outro</label>
              </div>
            </div>

            <button
              onClick={() => {
                Axios.post("http://localhost:3001/User", {
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password,
                  gender: gender
                }).then((response) => {
                  console.log(response.data);
                });
              }
              }
              type="submit"
              className="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cadastrar
            </button>

            <div className="flex text-sm mt-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}

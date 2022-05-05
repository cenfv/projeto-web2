import { useState } from "react"
import { Link } from "react-router-dom"

export function Login() {
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
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
                        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Entrar com sua conta</h2>
                        <div className="mt-4">
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                onChange={(event)=> setEmail(event.target.value)}
                            />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-3 appearance-none rounded-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Senha"
                                onChange={(event)=> setPassword(event.target.value)}
                            />
                        </div>
                        <div className="flex my-5 justify-between" >
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Lembrar-me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/forgot_password" className="font-medium text-indigo-600 hover:underline">
                                    Esqueceu sua senha?
                                </Link>
                            </div>

                        </div>
                        <button
                            onClick={()=>console.log(email+","+password)}
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Entrar
                        </button>
                        <div className="flex text-sm mt-4">
                            <span className="font-medium text-gray-500">
                                Precisando de uma conta?
                            </span>
                            <Link to="/register" className="ml-1 font-bold text-indigo-600 hover:underline">
                                Registre-se
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import Axios from "axios";
import { useEffect, useState } from "react";
import { DashboardNavBar } from "../../components/DashboardNavBar";
import { Footer } from "../../components/Footer";
export function UserProfile() {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  useEffect(() => {
    Axios.get("https://projeto-web2-nodejs.herokuapp.com/auth", {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }).then((response) => {
      console.log(response.data);
      if (response.status === 200 && response.statusText === "OK") {
        setUser({
          id: response.data.user._id,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          gender: response.data.user.gender,
        });
      }
    });
  }, []);
  return (
    <div className="flex flex-col overflow-hidden h-screen bg-gray-50">
      <DashboardNavBar />
      <div>
        <div className="mt-8 flex rounded-lg bg-gray-100 max-w-6xl mx-auto p-5 flex-wrap sm:flex-nowrap">
          <div className="sm:px-0 p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Informações pessoais
            </h3>
            <p className="mt-1 text-sm text-gray-600 ">
              Mantenha suas informações sempre atualizadas.
            </p>
          </div>
          <div className=" bg-white rounded-md m-2 sm:m-6 sm:ml-10 justify-between w-full p-5">
            <div className="flex flex-wrap sm:flex-nowrap">
              <div className=" w-full">
                <label className="text-sm font-medium text-gray-700">
                  Primeiro nome
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                  autoComplete="given-name"
                  className="mt-1  w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={user.firstName}
                />
              </div>
              <div className="w-full sm:ml-4">
                <label className="text-sm font-medium text-gray-700">
                  Último nome
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                  autoComplete="family  -name"
                  className="mt-1  w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={user.lastName}
                />
              </div>
            </div>
            <div className="mt-4 w-3/5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email-address"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                autoComplete="family  -name"
                className="mt-1  w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={user.email}
              />
            </div>
            <div className="mt-4 w-3/5">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                autoComplete="family  -name"
                className="mt-1  w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="**********"
              />
            </div>
            <div className="mt-4 w-3/5">
              <label className="text-sm font-medium text-gray-700">
                Confirme sua senha
              </label>
              <input
                disabled={!user.password}
                type="password"
                name="confirm_password"
                id="confirm_password"
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
                autoComplete="family-name"
                placeholder="**********"
                className="mt-1  w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-4 w-full">
              <label className="text-sm font-medium text-gray-700">
                Gênero
              </label>
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
              <div className="text-right ">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    Axios.put(
                      `https://projeto-web2-nodejs.herokuapp.com/user/${user.id}`,
                      {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        password: user.password,
                        gender: user.gender,
                      },
                      {
                        headers: {
                          authorization: localStorage.getItem("authorization"),
                        },
                      }
                    ).then((response) => {
                      if (
                        response.status === 200 &&
                        response.statusText === "OK"
                      ) {
                        console.log("sucesso");
                      }
                    });
                  }}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5 fixed left-0 bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}

import { DashboardNavBar } from "../../components/DashboardNavBar";
import { Footer } from "../../components/Footer";
export function UserProfile() {
  return (
    <div className="overflow-hidden h-screen bg-gray-50">
      <DashboardNavBar />
      <div className=" h-full">
        <div className="flex mt-24 bg-gray-100 max-w-6xl mx-auto p-5 flex-wrap sm:flex-nowrap">
          <div className="sm:px-0 p-5">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Informações pessoais
            </h3>
            <p className="mt-1 text-sm text-gray-600 ">
              Mantenha suas informações sempre atualizadas.
            </p>
          </div>
          <div className=" bg-white rounded-md mt-4 sm:mt-0 sm:ml-10 justify-between w-full p-5">
            <div className="flex flex-wrap sm:flex-nowrap">
              <div className=" w-full">
                <label className="text-sm font-medium text-gray-700">
                  Primeiro nome
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="mt-1  w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  autoComplete="family  -name"
                  className="mt-1  w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-4 w-3/5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email-address"
                autoComplete="family  -name"
                className="mt-1  w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-4 w-3/5">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="family  -name"
                className="mt-1  w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-4 w-3/5">
              <label className="text-sm font-medium text-gray-700">
                Confirme sua senha
              </label>
              <input
                disabled
                type="password"
                name="confirm_password"
                id="confirm_password"
                autoComplete="family  -name"
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
                    // onChange={() => setGender("masculino")}
                    //checked={gender === "masculino"}
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
                    //onChange={() => setGender("feminino")}
                    // checked={gender === "feminino"}
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
                    //checked={gender === "outro"}
                    //onChange={() => setGender("outro")}
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

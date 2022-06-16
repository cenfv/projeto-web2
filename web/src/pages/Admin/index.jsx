import { Footer } from "../../components/Footer";
import { DashboardNavBar } from "../../components/DashboardNavBar";
import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Axios from "axios";
import { useEffect } from "react";
import { DataTable } from "../../components/DataTable";

export function Admin() {
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([{}]);
  const [queryUser, setQueryUser] = useState("");
  const [page, setPage] = useState(1);
  const [userSubmissionData, setUserSubmissionData] = useState({});

  const filteredUser =
    queryUser === ""
      ? users
      : users.filter((user) =>
          user.email
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryUser.toLowerCase().replace(/\s+/g, ""))
        );

  const handleLoadUser = async () => {
    setLoading(true);
    Axios.get(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }).then((response) => {
      setLoading(false);
      if (response.status === 200 && response.statusText === "OK") {
        setUsers(response.data.users);
      }
    });
  };

  useEffect(() => {
    handleLoadUser();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <DashboardNavBar />
        <div className=" bg-white max-w-6xl mx-auto rounded-lg p-10 my-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Admin
              </h1>
              <p className="mt-2 text-lg font-normal text-gray-900 sm:text-lg">
                Escolha o usuário que deseja monitorar:
              </p>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-5 mt-10">
              <div className="z-50">
                <Combobox value={selectedUser} onChange={setSelectedUser}>
                  <div className="rounded-lg bg-white text-left drop-shadow-lg focus:outline-none z-10">
                    <Combobox.Input
                      placeholder="Selecione um usuário"
                      className="border-none p-4 text-gray-900 focus:outline-none"
                      displayValue={(users) => users.email}
                      onChange={(event) => setQueryUser(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      afterLeave={() => setQueryUser("")}
                    >
                      <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg">
                        {filteredUser.length === 0 && queryUser !== "" ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nothing found.
                          </div>
                        ) : (
                          filteredUser.map((user) => (
                            <Combobox.Option
                              key={user.id}
                              className={({ active }) =>
                                `relative cursor-default select-none p-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-indigo-500 text-white"
                                    : "text-gray-900"
                                }`
                              }
                              value={user}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {user.email}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                        active ? "text-white" : "text-teal-600"
                                      }`}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              </div>
            </div>

            <div>
              <div>
                <h3 className="mt-8 text-2xl font-bold text-gray-900 sm:text-3xl">
                  Desempenho
                </h3>
              </div>
            </div>
            <div>
              <h3 className="mt-8 text-2xl font-bold text-gray-900 sm:text-3xl">
                Histórico
              </h3>
              <div className="my-6 justify-center">
                <nav className="flex my-6 items-center w-full">
                  <ul className="flex h-full w-auto">
                    <li>
                      <button
                        disabled={page === 1}
                        onClick={(e) => {
                          setPage(page - 1);
                        }}
                        className="h-full bg-white border border-gray-300 text-gray-500 disabled:opacity-50 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg  py-2 px-3 "
                      >
                        Anterior
                      </button>
                    </li>
                    <li>
                      <input
                        value={page}
                        id="page"
                        name="page"
                        className="h-full w-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="01"
                      />
                    </li>
                    <li>
                      <button
                        disabled={
                          Object.keys(userSubmissionData).length === 0 ||
                          userSubmissionData[0]?.data?.length < 10
                        }
                        onClick={() => {
                          setPage(page + 1);
                        }}
                        className="h-full bg-white border border-gray-300 text-gray-500  disabled:opacity-50 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-r-lg  py-2 px-3 "
                      >
                        Próxima
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              <DataTable data={userSubmissionData} />
            </div>
          </div>
        </div>
      </div>

      <div className="left-0 bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}

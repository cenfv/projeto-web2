import { Footer } from "../../components/Footer";
import { DashboardNavBar } from "../../components/DashboardNavBar";
import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Axios from "axios";
import { useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import { useNavigate } from "react-router-dom";

export function Admin() {
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([{}]);
  const [queryUser, setQueryUser] = useState("");
  const [page, setPage] = useState(1);
  const [userSubmissionData, setUserSubmissionData] = useState({});
  const filter = [
    {
      id: 0,
      description: "Questões finalizadas",
    },
    {
      id: 1,
      description: "Todas as submissões",
    },
  ];
  const [selectedFilter, setSelectedFilter] = useState(filter[0]);
  const [queryFilter, setQueryFilter] = useState("");

  let navigate = useNavigate();
  const handleGetUserPermission = async () => {
    return await Axios.get(`${process.env.REACT_APP_API_URL}/auth`, {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          if (response.data.user.role === 0) {
            navigate("/dashboard");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleGetUserPermission();
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
        setUsers(response.data.user);
      }
    });
  };

  useEffect(() => {
    handleLoadUser();
  }, []);

  const handleLoadUserSubmissionsByUserId = async () => {
    setLoading(true);
    let string;

    if (selectedFilter.id === 0) {
      string = "&correctOnly=true";
    }
    Axios.get(
      `${process.env.REACT_APP_API_URL}/submission/user/${selectedUser._id}?page=${page}&limit=10${string}`,
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      }
    )
      .then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setUserSubmissionData(response.data.submission);
          console.log(response.data.submission);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleLoadUserSubmissionsByUserId();
  }, [selectedUser]);
  useEffect(() => {
    handleLoadUserSubmissionsByUserId();
  }, [page]);
  useEffect(() => {
    handleLoadUserSubmissionsByUserId();
  }, [selectedFilter]);

  const filteredFilter =
    queryFilter === ""
      ? filter
      : filter.filter((filter) =>
          filter.description
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryFilter.toLowerCase().replace(/\s+/g, ""))
        );
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <DashboardNavBar />
        <div className=" bg-white max-w-6xl mx-auto rounded-lg p-10 my-5 shadow-md">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-3xl">
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
              <div className="my-2 justify-center">
                <div className="flex flex-row z-50 justify-between">
                  <nav className=" shadow-md flex my-2 items-center ">
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
                  <div className="my-2 ml-4 w-2/5">
                    <Combobox
                      value={selectedFilter}
                      onChange={setSelectedFilter}
                    >
                      <div className="rounded-lg bg-white text-left drop-shadow-lg focus:outline-none">
                        <Combobox.Input
                          placeholder="Selecione uma prova"
                          className="border-none p-4 text-gray-900 focus:outline-none"
                          displayValue={(filter) => filter.description}
                          onChange={(event) =>
                            setQueryFilter(event.target.value)
                          }
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
                          afterLeave={() => setQueryFilter("")}
                        >
                          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg">
                            {filteredFilter.length === 0 &&
                            queryFilter !== "" ? (
                              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                              </div>
                            ) : (
                              filteredFilter.map((filter) => (
                                <Combobox.Option
                                  key={filter.id}
                                  className={({ active }) =>
                                    `relative cursor-default select-none p-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-indigo-500 text-white"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={filter}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {filter.description}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                            active
                                              ? "text-white"
                                              : "text-teal-600"
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

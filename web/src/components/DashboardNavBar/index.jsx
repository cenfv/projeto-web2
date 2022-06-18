import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser, logout } from "../../redux/userSlice";
import { Popover, Transition } from "@headlessui/react";
import { CogIcon, LogoutIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import logo from "../../assets/logoH.png";

export function DashboardNavBar({ text }) {
  const [loading, setLoading] = useState(false);
  const { name, isLogged } = useSelector(selectUser);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const handleGetUserPermission = async () => {
    setLoading(true);
    return Axios.get(`${process.env.REACT_APP_API_URL}/auth`, {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setUser(response.data.user);
          return true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleGetUserPermission();
  }, []);
  return (
    <div className="border-b-2 bg-white  border-gray-100 shadow-sm">
      <div className=" py-5 items-center justify-center max-w-6xl mx-auto ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link to="/">
              <img className="h-12 w-auto" src={logo} alt="logo" />
            </Link>
            <Link
              to="/dashboard"
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Dashboard
            </Link>
            <Link
              to="/question"
              className="font-medium text-gray-500 hover:text-indigo-600"
            >
              Questões
            </Link>
            {user?.role === 1 && (
              <>
                <Link
                  to="/add-content"
                  className="font-medium text-gray-500 hover:text-indigo-600"
                >
                  Editar provas
                </Link>
                <Link
                  to="/admin"
                  className="font-medium text-gray-500 hover:text-indigo-600"
                >
                  Admin
                </Link>
              </>
            )}
          </div>

          <div className="flex space-x-10 items-center">
            <span className="text-base font-medium text-gray-500">
              Seja bem-vindo, {name}
            </span>

            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={` ${
                      open ? "" : "text-opacity-90"
                    } placeholder:group inline-flex items-center rounded-md px-3 py-2`}
                  >
                    <img
                      to="/profile"
                      src="https://i.imgur.com/XSzYJIX.png"
                      className="rounded-full max-h-11"
                      alt="profile"
                    />
                    <ChevronDownIcon
                      className={`${
                        open ? "" : "text-opacity-70"
                      } ml-2 h-5 w-5 text-gray-500 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-xs">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                          <Link
                            to="/profile"
                            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-50"
                          >
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center text-gray-500 sm:h-6 sm:w-6">
                              <CogIcon aria-hidden="true" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                Perfil
                              </p>
                              <p className="text-sm text-gray-500">
                                Visualizar ou editar perfil
                              </p>
                            </div>
                          </Link>
                          <Link
                            to="/login"
                            onClick={() => {
                              localStorage.removeItem("authorization");
                              dispatch(logout());
                            }}
                            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                          >
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center text-gray-500 sm:h-6 sm:w-6">
                              <LogoutIcon aria-hidden="true" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                Sair
                              </p>
                              <p className="text-sm text-gray-500">
                                Sair da sua conta
                              </p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

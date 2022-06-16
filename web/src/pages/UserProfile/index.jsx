import Axios from "axios";
import { useEffect, useState } from "react";
import { DashboardNavBar } from "../../components/DashboardNavBar";
import { Footer } from "../../components/Footer";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export function UserProfile() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  useEffect(() => {
    setLoading(true);
    Axios.get(`${process.env.REACT_APP_API_URL}/auth`, {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }).then((response) => {
      setLoading(false);
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

  const handleUpdateUser = async () => {
    setLoading(true);
    Axios.put(
      `${process.env.REACT_APP_API_URL}/user/${user.id}`,
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
    )
      .then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setStatus({
            type: "success",
            message: "Usuário atualizado com sucesso!",
          });
        }
      })
      .catch(() => {
        setLoading(false);
        setStatus({
          type: "error",
          message: "Houve um erro ao atualizar o usuário",
        });
      });
  };

  const updateUser = async (e) => {
    e.preventDefault();

    if (!(await validate())) return;
    let saveDataForm;
    try {
      saveDataForm = await handleUpdateUser();
    } catch (err) {
      setLoading(false);
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
          message: "Houve um erro ao realizar a alteração!",
        });
      }
    }
    if (!saveDataForm) return;
    if (saveDataForm) {
      setStatus({
        type: "success",
        message: "Alteração realizada com sucesso!",
      });
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
      });
      setTimeout(() => {
        navigate("/dashboard");
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
        .when("password", {
          is: (password) => (password ? true : false),
          then: yup.string().required("Por favor confirme a senha!"),
        })
        .oneOf([yup.ref("password")], "As senhas não conferem."),
      password: yup
        .string("Por favor insira uma senha!")
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
    <>
      <div className="min-h-screen">
        <div className="flex flex-col overflow-hidden h-screen bg-gray-50">
          <DashboardNavBar />
          <div>
            <div className="mt-8 flex rounded-lg bg-gray-100 max-w-6xl mx-auto p-5 flex-wrap sm:flex-nowrap">
              {loading && (
                <div className="absolute left-1/2 top-1/3">
                  <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin fill-indigo-800" />
                </div>
              )}
              <div className="sm:px-0 p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Informações pessoais
                </h3>
                <p className="mt-1 text-sm text-gray-600 ">
                  Mantenha suas informações sempre atualizadas.
                </p>
              </div>
              <form onSubmit={updateUser}>
              <div
                className={`${
                  loading && "opacity-50"
                }  bg-white rounded-md m-2 sm:m-6 sm:ml-10 justify-between w-full p-5 `}
              >
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
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    disabled={true}
                    id="email-address"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    autoComplete="family  -name"
                    className="mt-1  w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={user.email}
                  />
                </div>
                <div className="mt-4 w-3/5">
                  <label className="text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
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
                        onChange={() =>
                          setUser({ ...user, gender: "masculino" })
                        }
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
                        onChange={() =>
                          setUser({ ...user, gender: "feminino" })
                        }
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
                    >
                      Salvar
                      {loading && (
                        <AiOutlineLoading3Quarters className="ml-2 w-6 h-6 animate-spin " />
                      )}
                    </button>
                  </div>
                  {status.type === "success" ? (
                    <p className="text-right mt-4 text-green-500">
                      {status.message}
                    </p>
                  ) : (
                    ""
                  )}
                  {status.type === "error" ? (
                    <p className="text-right mt-4 text-red-600">
                      {status.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 pb-5 left-0 bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}

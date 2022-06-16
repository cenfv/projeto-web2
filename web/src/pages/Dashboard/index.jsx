import { Footer } from "../../components/Footer";
import { DashboardNavBar } from "../../components/DashboardNavBar";
import { DataTable } from "../../components/DataTable";
import Axios from "axios";
import { useEffect, useState } from "react";
import { selectUser } from "../../redux/userSlice";
import { useSelector } from "react-redux";

export function Dashboard() {
  const [loading, setLoading] = useState(false);
  const { name, isLogged, id } = useSelector(selectUser);
  const [userSubmissionData, setUserSubmissionData] = useState({});
  const [page, setPage] = useState(1);

  const handleLoadUserSubmissionsByUserId = async () => {
    setLoading(true);
    Axios.get(
      `${process.env.REACT_APP_API_URL}/submission/user/${id}?page=${page}&limit=10`,
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
  }, [page]);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <DashboardNavBar />
        <div className="shadow-md bg-white max-w-6xl mx-auto mt-5 p-2 rounded-lg">
          <div className="m-7">
            <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-3xl">
              Dashboard
            </h1>
            <div className="grid grid-cols-2 mt-8 sm:grid-cols-4 bg-white">
              <div className=" m-3  rounded-md p-3  shadow-xl">
                <h2 className="mx-3 mb-3 text-2xl font-semibold text-black">
                  Progresso
                </h2>
                <hr className="border-cyan-300 border-t-2  " />
                <p className=" mx-3 mt-4 text-2xl font-semibold text-gray-600 font-['Poppins'] ">
                  23%
                </p>
                <p className="mx-3 mb-3 text-base font-light font-['Poppins'] text-gray-500">
                  das questões foram concluídas
                </p>
              </div>
              <div className="m-3  rounded-md p-3  shadow-xl">
                <h2 className="mx-3 mb-3 text-2xl font-semibold text-black">
                  Taxa de acertos
                </h2>
                <hr className="border-red-300 border-t-2  " />
                <p className=" mx-3 mt-4 text-2xl font-semibold text-gray-600 font-['Poppins'] ">
                  72,3%
                </p>
                <p className="mx-3 mb-3 text-base font-light font-['Poppins'] text-gray-500">
                  das questões são respondidas com êxito
                </p>
              </div>
              <div className="m-3  rounded-md p-3  shadow-xl">
                <h2 className="mx-3 mb-3 text-2xl font-semibold text-black">
                  Resolvidos
                </h2>
                <hr className="border-blue-300 border-t-2  " />
                <p className=" mx-3 mt-4 text-2xl font-semibold text-gray-600 font-['Poppins'] ">
                  123
                </p>
                <p className="mx-3 mb-3 text-base font-light font-['Poppins'] text-gray-500">
                  questões foram concluídas
                </p>
              </div>
              <div className="m-3  rounded-md p-3  shadow-xl">
                <h2 className="mx-3 mb-3 text-2xl font-semibold text-black">
                  Restantes
                </h2>
                <hr className="border-orange-300 border-t-2  " />
                <p className=" mx-3 mt-4 text-2xl font-semibold text-gray-600 font-['Poppins'] ">
                  421
                </p>
                <p className="mx-3 mb-3 text-base font-light font-['Poppins'] text-gray-500">
                  questões restantes
                </p>
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
      <div className="mt-3 left-0 bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}

import { Footer } from "../../components/Footer";
import { DashboardNavBar } from "../../components/DashboardNavBar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useEffect } from "react";

export function QuestionContent() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [questionAlternative, setQuestionAlternative] = useState({});
  const handleLoadQuestion = async () => {
    setLoading(true);
    Axios.get(
      `${process.env.REACT_APP_API_URL}/question-alternative/question/${id}`,
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      }
    ).then((response) => {
      setLoading(false);
      if (response.status === 200 && response.statusText === "OK") {
        setQuestionAlternative(response.data.questionAlternative[0]);
      }
    });
  };
  const handleSubmitQuestion = async (selectedAlternative) => {
    console.log(selectedAlternative);
  };
  useEffect(() => {
    handleLoadQuestion();
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <DashboardNavBar />
        <div className="max-w-6xl mx-auto">
          <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl"></h1>
          {questionAlternative.question?.title}
          <h5 className="mt-5 text-lg text-justify font-medium">
            Ano: {questionAlternative.question?.editionYear} | Nível:{" "}
            {questionAlternative.question?.difficulty}
          </h5>
          <p className="mt-5 text-lg text-justify">
            {questionAlternative.question?.description}
          </p>
          {questionAlternative.question?.imageUrl && (
            <img
              className="mx-auto mt-5 max-h-72"
              src={`${process.env.REACT_APP_API_URL}/files/${questionAlternative.question?.imageUrl}`}
              alt="Imagem questão"
            />
          )}

          <div className="grid grid-cols-2 mt-5 gap-4">
            {questionAlternative.alternative?.map((alternative, index) => {
              return (
                <button
                  className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 hover:bg-indigo-500 hover:text-white"
                  onClick={() => {
                    handleSubmitQuestion(alternative);
                  }}
                >
                  {String.fromCharCode(index + 1 + 64).toLowerCase()}
                  {")"} {alternative.description}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-2">
            <div className="flex justify-start mt-5 text-lg">
              <button>{"< "}Anterior</button>
            </div>
            <div className="flex justify-end mt-5 text-lg">
              <button>Próxima{" >"}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5 left-0 bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}

import { Footer } from "../../components/Footer";
import { DashboardNavBar } from "../../components/DashboardNavBar";
import { NotFound } from "../../components/NotFound";
import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useEffect } from "react";

export function QuestionContent() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [questionAlternative, setQuestionAlternative] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [test, setTest] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState({
    id: null,
    correct: false,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const handleLoadQuestion = async () => {
    setLoading(true);
    Axios.get(
      `${process.env.REACT_APP_API_URL}/question-alternative/question/${id}`,
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      }
    )
      .then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          if (!response.data.questionAlternative[0]) {
            setNotFound(true);
          }
          setQuestionAlternative(response.data.questionAlternative[0]);
          return true;
        }
      })
      .catch((err) => {
        setNotFound(true);
        setLoading(false);
        return false;
      });
  };
  const handleSubmitQuestion = async (selectedAlternative, index) => {
    setLoading(true);

    return Axios.post(
      `${process.env.REACT_APP_API_URL}/submission/${questionAlternative._id}`,
      {
        choice: selectedAlternative._id,
      },
      {
        headers: {
          authorization: localStorage.getItem("authorization"),
        },
      }
    ).then((response) => {
      setLoading(false);
      if (response.status === 201 && response.statusText === "Created") {
        if (response.data.submission.correctChoice === true) {
          setCorrectAnswer({ id: index, correct: true });
        } else {
          setCorrectAnswer({ id: index, correct: false });
        }
        return true;
      }
    });
  };
  const handleDisplayAnswer = () => {
    if (correctAnswer.correct === true && correctAnswer.id !== null) {
      return (
        <div className="flex flex-row font-semibold">
          <p className="text-indigo-500 font-bold">Parabéns</p>
          <span>, você acertou a questão!</span>
        </div>
      );
    } else if (correctAnswer.correct === false && correctAnswer.id !== null) {
      return (
        <div className="flex flex-row font-semibold">
          <p className="text-red-500 font-bold">Que pena!</p>
          <span>&nbsp; Você errou, tente novamente!</span>
        </div>
      );
    }
  };
  useEffect(() => {
    handleLoadQuestion();
    setCorrectAnswer({
      id: null,
      correct: false,
    });
  }, [test]);

  const handlePrevious = () => {
    let pos;
    location.state.questions.map((question, index) => {
      if (question._id === id) {
        pos = index;
      }
    });
    const next = pos - 1;
    const nextId = location.state.questions[next]._id;
    const questions = location.state.questions;

    handleChangeQuestion(questions, nextId);
  };

  const handleNext = () => {
    let pos;
    location.state.questions.map((question, index) => {
      if (question._id === id) {
        pos = index;
      }
    });
    const next = pos + 1;
    const nextId = location.state.questions[next]._id;
    const questions = location.state.questions;

    handleChangeQuestion(questions, nextId);
  };
  const handleChangeQuestion = (questions, nextId) => {
    navigate(`/question/${nextId}`, {
      state: { questions },
    });
    setTest(!test);
  };
  return (
    <>
      {notFound ? (
        <NotFound />
      ) : (
        <>
          <div className="min-h-screen">
            <DashboardNavBar />
            <div className="max-w-6xl mx-auto">
              <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
              {questionAlternative.question?.title}
              </h1>
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
                      className={`bg-white rounded-lg p-4 drop-shadow-lg mt-3 hover:bg-indigo-500 hover:text-white ${
                        correctAnswer.id === index &&
                        correctAnswer.correct === true &&
                        "bg-indigo-500 text-white"
                      } ${
                        correctAnswer.id === index &&
                        correctAnswer.correct === false &&
                        "bg-red-500 text-white"
                      }`}
                      onClick={() => {
                        handleSubmitQuestion(alternative, index);
                      }}
                    >
                      {String.fromCharCode(index + 1 + 64).toLowerCase()}
                      {")"} {alternative.description}
                    </button>
                  );
                })}
                
              </div>
              <div className="flex justify-center mt-5">{handleDisplayAnswer()}</div>
              <div className="grid grid-cols-2">
                <div className="flex justify-start mt-5 text-lg">
                  <button
                    onClick={() => {
                      handlePrevious();
                    }}
                  >
                    {"< "}Anterior
                  </button>
                </div>
                <div className="flex justify-end mt-5 text-lg">
                  <button
                    onClick={async () => {
                      handleNext();
                    }}
                  >
                    Próxima{" >"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-5 left-0 bottom-0 w-full">
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

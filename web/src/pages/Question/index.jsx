import { Footer } from "../../components/Footer";
import { DashboardNavBar } from "../../components/DashboardNavBar";
import { useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useEffect } from "react";
import { BsShuffle } from "react-icons/bs";

export function Question() {
  const difficulty = [
    {
      id: 4,
      description: "Todas",
    },
    {
      id: 0,
      description: "Fácil",
    },
    {
      id: 1,
      description: "Média",
    },
    {
      id: 2,
      description: "Difícil",
    },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [selectedDifficulty, setSelectedDifficulty] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([{}]);
  const [questions, setQuestions] = useState([{}]);
  const [queryQuiz, setQueryQuiz] = useState("");
  const [queryDifficulty, setQueryDifficulty] = useState("");
  const [queryQuestion, setQueryQuestion] = useState("");

  const navigate = useNavigate();

  const filteredQuiz =
    queryQuiz === ""
      ? quizzes
      : quizzes.filter((quiz) =>
          quiz.description
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryQuiz.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredDifficulty =
    queryDifficulty === ""
      ? difficulty
      : difficulty.filter((difficulty) =>
          difficulty.description
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryDifficulty.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredQuestion =
    queryQuestion === ""
      ? questions
      : questions.filter((question) =>
          question.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryQuestion.toLowerCase().replace(/\s+/g, ""))
        );
  const handleLoadQuiz = async () => {
    setLoading(true);
    Axios.get(`${process.env.REACT_APP_API_URL}/quiz`, {
      headers: {
        authorization: localStorage.getItem("authorization"),
      },
    }).then((response) => {
      setLoading(false);
      if (response.status === 200 && response.statusText === "OK") {
        setQuizzes(response.data.quizzes);
      }
    });
  };
  useEffect(() => {
    handleLoadQuestion();
  }, [selectedDifficulty]);
  useEffect(() => {
    handleLoadQuestion();
  }, [selectedQuiz]);
  const handleLoadQuestion = async () => {
    setLoading(true);
    if (selectedDifficulty.id === 4) {
      Axios.get(
        `${process.env.REACT_APP_API_URL}/question?quiz=${selectedQuiz._id}`,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      ).then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setQuestions(response.data.questions);
        }
      });
    } else {
      Axios.get(
        `${process.env.REACT_APP_API_URL}/question?quiz=${selectedQuiz._id}&difficulty=${selectedDifficulty.id}`,
        {
          headers: {
            authorization: localStorage.getItem("authorization"),
          },
        }
      ).then((response) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          setQuestions(response.data.questions);
        }
      });
    }
  };

  const handleSubmit = async () => {
    navigate(`/question/${selectedQuestion._id}`);
  };
  useEffect(() => {
    handleLoadQuiz();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <DashboardNavBar />
        <div className=" bg-white max-w-6xl mx-auto rounded-lg p-10 my-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Questões
              </h1>
              <p className="mt-2 text-lg font-normal text-gray-900 sm:text-lg">
                Escolha a questão que deseja realizar:
              </p>
            </div>
            <div className="flex mt-8  justify-end">
              <button
                onClick={() => {
                  Axios.get(
                    `${process.env.REACT_APP_API_URL}/question/random/question`,
                    {
                      headers: {
                        authorization: localStorage.getItem("authorization"),
                      },
                    }
                  ).then((response) => {
                    setLoading(false);
                    if (
                      response.status === 200 &&
                      response.statusText === "OK"
                    ) {
                      navigate(`/question/${response.data.question._id}`);
                    }
                  });
                }}
                className="flex flex-row self-end  text-center p-3 bg-indigo-500 text-white font-medium rounded-lg  drop-shadow-lg hover:bg-indigo-600 mb-5"
              >
                Iniciar de maneira aleatória
                <BsShuffle className="ml-3 w-5 h-5 self-center" />
              </button>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-5 ">
              <div className="z-50">
                <Combobox value={selectedQuiz} onChange={setSelectedQuiz}>
                  <div className="rounded-lg bg-white text-left drop-shadow-lg focus:outline-none z-10">
                    <Combobox.Input
                      placeholder="Selecione uma prova"
                      className="border-none p-4 text-gray-900 focus:outline-none"
                      displayValue={(quizzes) => quizzes.description}
                      onChange={(event) => setQueryQuiz(event.target.value)}
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
                      afterLeave={() => setQueryQuiz("")}
                    >
                      <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg">
                        {filteredQuiz.length === 0 && queryQuiz !== "" ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nothing found.
                          </div>
                        ) : (
                          filteredQuiz.map((quiz) => (
                            <Combobox.Option
                              key={quiz.id}
                              className={({ active }) =>
                                `relative cursor-default select-none p-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-indigo-500 text-white"
                                    : "text-gray-900"
                                }`
                              }
                              value={quiz}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {quiz.description}
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

            <div className="grid grid-cols-2 gap-5">
              <div className="z-40">
                <Combobox
                  value={selectedDifficulty}
                  onChange={setSelectedDifficulty}
                >
                  <div className="z-10 mt-3 rounded-lg bg-white text-left drop-shadow-lg focus:outline-none">
                    <Combobox.Input
                      placeholder="Selecione a questão"
                      className="border-none p-4 text-gray-900 focus:outline-none"
                      displayValue={(difficulty) => difficulty.description}
                      onChange={(event) =>
                        setQueryDifficulty(event.target.value)
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
                      afterLeave={() => setQueryDifficulty("")}
                    >
                      <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg">
                        {filteredDifficulty.length === 0 &&
                        queryDifficulty !== "" ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nothing found.
                          </div>
                        ) : (
                          filteredDifficulty.map((difficulty) => (
                            <Combobox.Option
                              key={difficulty.id}
                              className={({ active }) =>
                                `relative cursor-default select-none p-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-indigo-500 text-white"
                                    : "text-gray-900"
                                }`
                              }
                              value={difficulty}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {difficulty.description}
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

            <div className="grid grid-cols-2 gap-5">
              <div className="z-30">
                <Combobox
                  value={selectedQuestion}
                  onChange={setSelectedQuestion}
                >
                  <div className="z-10 mt-3 rounded-lg bg-white text-left drop-shadow-lg focus:outline-none">
                    <Combobox.Input
                      placeholder="Selecione a questão"
                      className="border-none p-4 text-gray-900 focus:outline-none"
                      displayValue={(question) => question.title}
                      onChange={(event) => setQueryQuestion(event.target.value)}
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
                      afterLeave={() => setQueryQuestion("")}
                    >
                      <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg">
                        {filteredQuestion.length === 0 &&
                        queryQuestion !== "" ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nothing found.
                          </div>
                        ) : (
                          filteredQuestion.map((question) => (
                            <Combobox.Option
                              key={question.id}
                              className={({ active }) =>
                                `relative cursor-default select-none p-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-indigo-500 text-white"
                                    : "text-gray-900"
                                }`
                              }
                              value={question}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {question.title}
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

            <div className="grid grid-cols-2 gap-5">
              <div className="flex justify-end">
                <button
                  onClick={() => handleSubmit()}
                  className="w-36 bg-indigo-500 text-white font-medium rounded-lg py-2 text-center drop-shadow-lg mt-10 hover:bg-indigo-600 mb-5"
                >
                  Iniciar
                </button>
              </div>
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

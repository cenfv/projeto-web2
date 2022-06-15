import { Footer } from "../../components/Footer";
import { DashboardNavBar } from "../../components/DashboardNavBar";
import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function AddContent() {
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([
    {
      id: 0,
      description: "",
    },
  ]);
  const [testDescription, setTestDescription] = useState("");
  const [showTest, setShowTest] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [quizzes, setQuizzes] = useState([{}]);
  const [selectedTest, setSelectedTest] = useState({});
  const [queryTest, setQueryTest] = useState("");

  const [selectedAlternative, setSelectedAlternative] = useState({});
  const [queryAlternative, setQueryAlternative] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [selectedImg, setSelectedImg] = useState();
  const [question, setQuestion] = useState({
    title: "",
    description: "",
    difficulty: "",
    editionYear: "",
  });

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

  const handleCreateTest = async () => {
    setLoading(true);

    return Axios.post(`${process.env.REACT_APP_API_URL}/quiz`, {
      description: testDescription,
    }).then((response) => {
      setLoading(false);
      if (response.status === 201 && response.statusText === "Created") {
        alert("cadastrado com sucesso");
        return true;
      }
    });
  };

  const handleCreateQuestion = async () => {
    setLoading(true);

    return Axios.post(`${process.env.REACT_APP_API_URL}/question`, {
      title: question.title,
      description: question.description,
      editionYear: question.editionYear,
      quiz: selectedTest._id,
      difficulty: difficulty,
    }).then((response) => {
      setLoading(false);
      if (response.status === 201 && response.statusText === "Created") {
        alert("cadastrado com sucesso");
        return response.data.question;
      }
      return null;
    });
  };

  const handleCreateAlternative = async () => {
    setLoading(true);
    return Axios.post(`${process.env.REACT_APP_API_URL}/alternative`, {
      alternatives: answers,
    }).then((response) => {
      setLoading(false);
      if (response.status === 201 && response.statusText === "Created") {
        alert("cadastrado com sucesso");
        return response.data;
      }
      return null;
    });
  };
  const handleCreateQuestionAlternative = async (question, alternative) => {
    setLoading(true);
    const aux = alternative.alternative.map((alt) => {
      return alt._id;
    });

    return Axios.post(`${process.env.REACT_APP_API_URL}/question-alternative`, {
      question: question._id,
      alternative: aux,
      correctAlternative: alternative.alternative.at(selectedAlternative.id)
        ._id,
    }).then((response) => {
      setLoading(false);
      if (response.status === 201 && response.statusText === "Created") {
        alert("question-alternative cadastrado com sucesso");
        console.log(response);
        return true;
      }
    });
  };

  const handleCreateImage = async (question) => {
    let data = new FormData();
    data.append("img", selectedImg, selectedImg.name);
    setLoading(true);
    Axios.patch(
      `${process.env.REACT_APP_API_URL}/question/${question._id}/image`,
      data,
      {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      }
    ).then((response) => {
      alert("cadastrado com sucesso");
      console.log(response);
      return true;
    });
  };

  const filteredTest =
    queryTest === ""
      ? quizzes
      : quizzes.filter((test) =>
          test.description
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryTest.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredAlternative =
    queryAlternative === ""
      ? answers
      : answers.filter((answer) =>
          answer.description
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryAlternative.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <DashboardNavBar />
        <div className=" bg-white max-w-6xl mx-auto rounded-lg p-10 my-5">
          <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
            Adicionar
          </h1>
          <p className="mt-5 font-medium text-lg">
            Selecione o que deseja adicionar:
          </p>
          <div>
            <div className="grid grid-cols-2 gap-4 mt-3 sm:gap-6 lg:gap-8">
              <button
                onClick={() => {
                  setShowQuestion(false);
                  setShowTest(!showTest);
                }}
                className={`bg-white rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-500 hover:text-white ${
                  showTest && "focus:bg-indigo-500 focus:text-white focus:ring"
                }`}
              >
                Criar nova prova
              </button>
              <button
                onClick={() => {
                  setShowTest(false);
                  setShowQuestion(!showQuestion);
                  handleLoadQuiz();
                }}
                className={`bg-white rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-500 hover:text-white ${
                  showQuestion &&
                  "focus:bg-indigo-500 focus:text-white focus:ring"
                }`}
              >
                Criar nova questão
              </button>
            </div>
          </div>
          <div className={!showTest && "hidden"}>
            <h3 className="mt-5 text-2xl font-bold text-gray-900">
              Criar nova prova:
            </h3>
            <div className="grid grid-cols-1">
              <input
                className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                placeholder="Nome da prova"
                onChange={(e) => setTestDescription(e.target.value)}
              ></input>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  handleCreateTest();
                }}
                className="flex mt-10 justify-center w-36 bg-indigo-500 text-white font-medium rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-600"
              >
                Salvar
                {loading && (
                  <AiOutlineLoading3Quarters className="ml-2 w-6 h-6 animate-spin " />
                )}
              </button>
            </div>
          </div>

          <div className={!showQuestion && "hidden"}>
            <h3 className="mt-5 text-2xl font-bold text-gray-900">
              Criar nova questão:
            </h3>
            <div className="grid grid-cols-1">
              <input
                className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                placeholder="Titulo da questão"
                onChange={(e) =>
                  setQuestion({ ...question, title: e.target.value })
                }
              ></input>
              <textarea
                placeholder="Enunciado da questão"
                onChange={(e) =>
                  setQuestion({ ...question, description: e.target.value })
                }
                className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Combobox value={selectedTest} onChange={setSelectedTest}>
                <div className="mt-3 rounded-lg bg-white text-left drop-shadow-lg focus:outline-none z-10">
                  <Combobox.Input
                    placeholder="Selecione uma prova"
                    className="border-none p-4 text-gray-900 focus:outline-none"
                    displayValue={(quizzes) => quizzes.description}
                    onChange={(event) => setQueryTest(event.target.value)}
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
                    afterLeave={() => setQueryAlternative("")}
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg">
                      {filteredTest.length === 0 && queryTest !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredTest.map((quiz) => (
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

              <input
                className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                placeholder="Ano"
                onChange={(e) =>
                  setQuestion({ ...question, editionYear: e.target.value })
                }
              ></input>
            </div>
            <div className="grid grid-cols-2">
              <p className="mt-5">Alternativas:</p>
              <p className="mt-5">Imagem:</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                {answers.map((answer) => {
                  return (
                    <input
                      className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                      placeholder={answer.description}
                      onChange={(event) => {
                        setAnswers(
                          answers.map((answerAux) => {
                            if (answerAux.id === answer.id) {
                              return {
                                ...answer,
                                description: event.target.value,
                              };
                            }
                            return answerAux;
                          })
                        );
                      }}
                    ></input>
                  );
                })}

                <div className="flex justify-end text-indigo-500 mt-2">
                  <button
                    onClick={() => {
                      setAnswers([
                        ...answers,
                        { id: answers.length, description: "" },
                      ]);
                    }}
                  >
                    Adicionar +
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring">
                <img
                  className="max-h-72"
                  src={selectedImg ? URL.createObjectURL(selectedImg) : null}
                  alt="img"
                />
                <input
                  className="mt-5"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setSelectedImg(e.target.files[0]);
                  }}
                ></input>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="mt-5">Selecione a alternativa correta:</p>
                <Combobox
                  value={selectedAlternative}
                  onChange={setSelectedAlternative}
                >
                  <div className="z-10 mt-3 rounded-lg bg-white text-left drop-shadow-lg focus:outline-none">
                    <Combobox.Input
                      placeholder="Selecione uma alternativa"
                      className="border-none p-4 text-gray-900 focus:outline-none"
                      displayValue={(answer) => answer.description}
                      onChange={(event) =>
                        setQueryAlternative(event.target.value)
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
                      afterLeave={() => setQueryAlternative("")}
                    >
                      <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg">
                        {filteredAlternative.length === 0 &&
                        queryAlternative !== "" ? (
                          <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nothing found.
                          </div>
                        ) : (
                          filteredAlternative.map((answer) => (
                            <Combobox.Option
                              key={answer.id}
                              className={({ active }) =>
                                `relative cursor-default select-none p-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-indigo-500 text-white"
                                    : "text-gray-900"
                                }`
                              }
                              value={answer}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {answer.description}
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
              <div>
                <p className="mt-5">Selecione a dificuldade:</p>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <button
                    onClick={() => {
                      setDifficulty(0);
                    }}
                    className="bg-white rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white focus:ring"
                  >
                    Fácil
                  </button>
                  <button
                    onClick={() => {
                      setDifficulty(1);
                    }}
                    className="bg-white rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white focus:ring"
                  >
                    Médio
                  </button>
                  <button
                    onClick={() => {
                      setDifficulty(2);
                    }}
                    className="bg-white rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white focus:ring"
                  >
                    Difícil
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={async () => {
                  const question = await handleCreateQuestion();
                  const alternative = await handleCreateAlternative(question);
                  await handleCreateQuestionAlternative(question, alternative);
                  await handleCreateImage(question);
                }}
                className="w-36 bg-indigo-500 text-white font-medium rounded-lg py-4 text-center drop-shadow-lg mt-10 hover:bg-indigo-600 mb-5"
              >
                Salvar
              </button>
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

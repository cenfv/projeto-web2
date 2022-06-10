import { Footer } from "../../components/Footer";
import { DashboardNavBar } from "../../components/DashboardNavBar";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const test = [
  { id: 1, name: "Enem 2015" },
  { id: 2, name: "Enem 2016" },
  { id: 3, name: "Enem 2022" },
];

const alternative = [
  { id: 1, option: "Alternativa 1" },
  { id: 2, option: "Alternativa 2" },
  { id: 3, option: "Alternativa 3" },
  { id: 4, option: "Alternativa 4" },
];

export function AddContent() {
  const [showTest, setShowTest] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  const [selectedTest, setSelectedTest] = useState(test[0]);
  const [queryTest, setQueryTest] = useState("");

  const [selectedAlternative, setSelectedAlternative] = useState(
    alternative[0]
  );
  const [queryAlternative, setQueryAlternative] = useState("");

  const filteredTest =
    queryTest === ""
      ? test
      : test.filter((test) =>
          test.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryTest.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredAlternative =
    queryAlternative === ""
      ? alternative
      : alternative.filter((alternative) =>
          alternative.option
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(queryAlternative.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div>
      <DashboardNavBar />
      <div className="max-w-6xl mx-auto">
        <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
          Adicionar
        </h1>
        <p className="mt-5 font-medium text-lg">
          Selecione o que deseja adicionar:
        </p>
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
            }}
            className={`bg-white rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-500 hover:text-white ${
              showQuestion && "focus:bg-indigo-500 focus:text-white focus:ring"
            }`}
          >
            Criar nova questão
          </button>
        </div>

        <div className={!showTest && "hidden"}>
          <h3 className="mt-5 text-2xl font-bold text-gray-900">
            Criar nova prova:
          </h3>
          <div className="grid grid-cols-1">
            <input
              className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
              placeholder="Nome da prova"
            ></input>
          </div>
          <div className="flex justify-end">
            <button className="w-36 bg-indigo-500 text-white font-medium rounded-lg py-4 text-center drop-shadow-lg mt-5 hover:bg-indigo-600">
              Salvar
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
              placeholder="Enunciado da questão"
            ></input>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Combobox value={selectedTest} onChange={setSelectedTest}>
              <div className="mt-3 rounded-lg bg-white text-left drop-shadow-lg focus:outline-none z-10">
                <Combobox.Input
                  className="border-none p-4 text-gray-900 focus:outline-none"
                  displayValue={(test) => test.name}
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
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQueryTest("")}
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg">
                    {filteredTest.length === 0 && queryTest !== "" ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      filteredTest.map((test) => (
                        <Combobox.Option
                          key={test.id}
                          className={({ active }) =>
                            `relative cursor-default select-none p-2 pl-10 pr-4 ${
                              active
                                ? "bg-indigo-500 text-white"
                                : "text-gray-900"
                            }`
                          }
                          value={test}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {test.name}
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
            ></input>
          </div>
          <div className="grid grid-cols-2">
            <p className="mt-5">Alternativas:</p>
            <p className="mt-5">Imagem:</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="grid grid-cols-1">
              <input
                className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                placeholder="Alternativa 1"
              ></input>
              <input
                className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                placeholder="Alternativa 2"
              ></input>
              <input
                className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                placeholder="Alternativa 3"
              ></input>
              <input
                className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
                placeholder="Alternativa 4"
              ></input>
              <div className="flex justify-end text-indigo-500 mt-2">
                <button>Adicionar +</button>
              </div>
            </div>
            <input
              className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 focus:outline-none focus:ring"
              type="file"
            ></input>
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
                    className="border-none p-4 text-gray-900 focus:outline-none"
                    displayValue={(alternative) => alternative.option}
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
                    leave="transition ease-in duration-100"
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
                        filteredAlternative.map((alternative) => (
                          <Combobox.Option
                            key={alternative.id}
                            className={({ active }) =>
                              `relative cursor-default select-none p-2 pl-10 pr-4 ${
                                active
                                  ? "bg-indigo-500 text-white"
                                  : "text-gray-900"
                              }`
                            }
                            value={alternative}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {alternative.option}
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
                <button className="bg-white rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white focus:ring">
                  Fácil
                </button>
                <button className="bg-white rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white focus:ring">
                  Médio
                </button>
                <button className="bg-white rounded-lg py-4 text-center drop-shadow-lg hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white focus:ring">
                  Difícil
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="w-36 bg-indigo-500 text-white font-medium rounded-lg py-4 text-center drop-shadow-lg mt-5 hover:bg-indigo-600">
              Salvar
            </button>
          </div>
        </div>
      </div>
      <div className="mb-5 fixed left-0 bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}

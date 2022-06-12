import { Footer } from "../../components/Footer";
import { DashboardNavBar } from "../../components/DashboardNavBar";
import { useState } from "react";

export function Question() {
  return (
    <>
    <div className="min-h-screen">
      <DashboardNavBar />
      <div className="max-w-6xl mx-auto">
        <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
          Nome do quiz
        </h1>
        <h5 className="mt-5 text-lg text-justify font-medium">
          Ano: 2020 | Nível: Difícil
        </h5>
        <p className="mt-5 text-lg text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <img
          className="mx-auto mt-5 max-h-72"
          src="https://www.infoescola.com/wp-content/uploads/2013/07/enem-matematica.jpg"
          alt="Imagem questão"
        ></img>
        <div className="grid grid-cols-2 mt-5 gap-4">
          <button className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 hover:bg-indigo-500 hover:text-white">
            {"a)"} Alternativa 1
          </button>
          <button className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 hover:bg-indigo-500 hover:text-white">
            {"b)"} Alternativa 2
          </button>
          <button className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 hover:bg-indigo-500 hover:text-white">
            {"c)"} Alternativa 3
          </button>
          <button className="bg-white rounded-lg p-4 drop-shadow-lg mt-3 hover:bg-indigo-500 hover:text-white">
            {"d)"} Alternativa 4
          </button>
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

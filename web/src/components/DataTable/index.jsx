import { useEffect } from "react";

export function DataTable() {
  const data = [
    {
      id: 1,
      questao: "QENEM-2022-1",
      resolvidoem: "10/05/2022",
      ano: "2022",
      dificuldade: "difícil",
    },
    {
      id: 2,
      questao: "QENEM-2017-10",
      resolvidoem: "10/05/2022",
      ano: "2017",
      dificuldade: "fácil",
    },
  ];
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div className=" my-6 items-center justify-center max-w-6xl mx-auto ">
      <div className="my-6 justify-center">
        <nav className="flex my-6 items-center w-full">
          <ul className="flex h-full w-auto">
            <li>
              <button className="h-full bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg  py-2 px-3 ">
                Anterior
              </button>
            </li>
            <li>
              <input
                id="page"
                name="page"
                className="h-full w-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="01"
              />
            </li>
            <li>
              <button className="h-full bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-r-lg  py-2 px-3 ">
                Próxima
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <table className="min-w-full table-auto divide-gray-200">
          <thead className="bg-indigo-500  ">
            <tr>
              <th className="py-2 px-6 text-sm font-medium tracking-wider center text-white uppercase ">
                #
              </th>
              <th className="py-2 px-6 text-sm font-medium tracking-wider center text-white uppercase">
                QUESTÃO
              </th>
              <th className="py-2 px-6 text-sm font-medium tracking-wider center text-white uppercase">
                RESOLVIDO EM
              </th>
              <th className="py-2 px-6 text-sm font-medium tracking-wider center text-white uppercase">
                ANO
              </th>
              <th className="py-2 px-6 text-sm font-medium tracking-wider center text-white uppercase">
                DIFICULDADE
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 ">
            <tr className="text-center hover:bg-gray-100" key={data.at(0).id}>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(0).id}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(0).questao}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(0).resolvidoem}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(0).ano}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(0).dificuldade}
              </td>
            </tr>
            <tr className="text-center hover:bg-gray-100" key={data.at(1).id}>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).id}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).questao}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).resolvidoem}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).ano}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).dificuldade}
              </td>
            </tr>
            <tr className="text-center hover:bg-gray-100" key={data.at(1).id}>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).id}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).questao}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).resolvidoem}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).ano}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).dificuldade}
              </td>
            </tr>
            <tr className="text-center hover:bg-gray-100" key={data.at(1).id}>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).id}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).questao}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).resolvidoem}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).ano}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).dificuldade}
              </td>
            </tr>
            <tr className="text-center hover:bg-gray-100" key={data.at(1).id}>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).id}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).questao}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).resolvidoem}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).ano}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).dificuldade}
              </td>
            </tr>
            <tr className="text-center hover:bg-gray-100" key={data.at(1).id}>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).id}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).questao}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).resolvidoem}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).ano}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).dificuldade}
              </td>
            </tr>
            <tr className="text-center hover:bg-gray-100" key={data.at(1).id}>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).id}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).questao}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).resolvidoem}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).ano}
              </td>
              <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                {data.at(1).dificuldade}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

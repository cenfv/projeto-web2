import { useEffect } from "react";

export function DataTable({ data }) {
  useEffect(() => {}, []);
  return (
    <div className=" shadow-md my-6 items-center justify-center max-w-6xl mx-auto ">
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
            {data.length > 0 &&
              data[0].data.map((submission, index) => (
                <tr
                  className="text-center hover:bg-gray-100"
                  key={submission._id}
                >
                  <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                    {submission.questionAlternative?.question[0]._id}
                  </td>
                  <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                    {submission.questionAlternative?.question[0].title}
                  </td>
                  <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                    {submission.submissionDate}
                  </td>
                  <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                    {submission.questionAlternative?.question[0].editionYear}
                  </td>
                  <td className="py-3 px-6 text-sm font-medium text-gray-900 whitespace-nowrap center">
                    {submission.questionAlternative?.question[0].difficulty}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

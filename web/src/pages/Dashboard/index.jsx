import { Footer } from "../../components/Footer";
import { DashboardNavBar } from "../../components/DashboardNavBar";
import { DataTable } from "../../components/DataTable";

export function Dashboard() {
  return (
    <div>
      <DashboardNavBar />
      <div className="max-w-6xl mx-auto">
        <h1 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
          Dashboard
        </h1>
        <div className="grid grid-cols-2 gap-4 mt-5 sm:gap-6 lg:gap-8 sm:grid-cols-4">
          <div className="bg-white rounded-lg py-4 text-center drop-shadow-lg">
            <p className="font-bold text-xl">Progresso</p>
            <hr className="mx-8 my-2 border-gray-300" />
            <p className="text-5xl">30%</p>
          </div>
          <div className="bg-white rounded-lg py-4 text-center drop-shadow-lg">
            <p className="font-bold text-xl">Taxa de acertos</p>
            <hr className="mx-8 my-2 border-gray-300" />
            <p className="text-5xl">72,5%</p>
          </div>
          <div className="bg-white rounded-lg py-4 text-center drop-shadow-lg">
            <p className="font-bold text-xl">Resolvidos</p>
            <hr className="mx-8 my-2 border-gray-300" />
            <p className="text-5xl">123</p>
          </div>
          <div className="bg-white rounded-lg py-4 text-center drop-shadow-lg">
            <p className="font-bold text-xl">Restantes</p>
            <hr className="mx-8 my-2 border-gray-300" />
            <p className="text-5xl">321</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-5 sm:gap-6 lg:gap-8 sm:grid-cols-2">
          <div>
            <h3 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
              Desempenho
            </h3>
          </div>
          <div>
            <h3 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
              Histórico
            </h3>
            <DataTable />
          </div>
        </div>
      </div>
      <div className="mb-5 fixed left-0 bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}

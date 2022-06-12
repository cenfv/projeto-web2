import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import {
  ClipboardCheckIcon,
  GlobeIcon,
  LightningBoltIcon,
  CashIcon,
} from "@heroicons/react/outline";

const features = [
  {
    name: "Maior rendimento",
    description:
      "Uma forma muito mais rápida e prática de testar seus conhecimentos e analisar os seus resultados.",
    icon: LightningBoltIcon,
  },
  {
    name: "Totalmente gratuito",
    description:
      "Todo o conteúdo da plataforma disponibilizado de maneira totalmente gratuita para que você possa testar seus conhecimentos.",
    icon: CashIcon,
  },
  {
    name: "Leaderboard",
    description:
      "Analise e compare o seu desempenho com os demais usuários que utilizam a plataforma.",
    icon: GlobeIcon,
  },
  {
    name: "Correção automática",
    description:
      "Tenha os seus resultados em mãos imediatamente e de maneira automatizada após finalizar as atividades.",
    icon: ClipboardCheckIcon,
  },
];

export function About() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />

        <div className="max-w-6xl mx-auto mt-10">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Sobre nós
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Uma nova maneira de se estudar
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Descubra uma maneira inovadora de organizar e realizar os seus
              estudos para os vestibulares. Conheça a nossa plataforma e dê o
              próximo passo para a sua aprovação!
            </p>
          </div>

          <div className="mt-16">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <div className="mb-5 left-0 bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
}

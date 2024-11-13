import Image from "next/image";
import logo from "@/assets/logo.png";
import hero from "@/assets/hero.png";

export default function HeroBanner() {
  return (
    <div className="mb-4 flex flex-col rounded-xl bg-base-100 px-4 py-8">
      <h2 className="mb-6 self-center text-center text-4xl font-bold">
        <div className="flex items-center text-2xl normal-case">
          <Image
            src={logo}
            height={80}
            width={80}
            alt="Doce Mania logo"
            priority
          />
          Doce Mania
        </div>
      </h2>
      <p className="mx-auto mb-8 max-w-3xl text-center text-lg">
        Na Doce Mania, nossa paixão é criar cupcakes únicos e saborosos que
        encantam a todos os sentidos. Trabalhamos com ingredientes frescos e de
        alta qualidade para oferecer uma experiência inesquecível em cada
        mordida.
      </p>
      <Image
        src={hero}
        alt="Hero image"
        className="mb-8 w-full max-w-3xl self-center rounded-xl object-cover object-bottom"
      />
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="feature-card">
          <h3 className="mb-2 text-xl font-semibold md:text-center">
            Ingredientes Frescos
          </h3>
          <p className="text-sm">
            Todos os nossos cupcakes são feitos com ingredientes frescos e
            naturais, selecionados cuidadosamente.
          </p>
        </div>
        <div className="feature-card">
          <h3 className="mb-2 text-xl font-semibold md:text-center">
            Variedade de Sabores
          </h3>
          <p className="text-sm">
            Oferecemos uma variedade de sabores para todos os gostos, com novas
            opções a cada estação.
          </p>
        </div>
        <div className="feature-card">
          <h3 className="mb-2 text-xl font-semibold md:text-center">
            Personalização
          </h3>
          <p className="text-sm">
            Personalize seus cupcakes para aniversários, casamentos e outros
            eventos especiais.
          </p>
        </div>
        <div className="feature-card">
          <h3 className="mb-2 text-xl font-semibold md:text-center">
            Entrega Rápida
          </h3>
          <p className="text-sm">
            Serviço de entrega rápida e confiável para que seus cupcakes cheguem
            fresquinhos até você.
          </p>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";

const Control = () => {

  return (
    <section className="flex flex-col">
        <div className="ControlContainer">
        <div className="ControlText">
          <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl">Anregungen,</h1>
          <h1 className="text-blue-300 text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl">Angebote<span className="text-fg">,</span></h1>
          <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl">Kontakt&shy;aufnahme</h1>
        </div>
        <Image src={'/images/Contact_head.jpg'} alt={'Control Head Image'} width={1200} height={1000} className='ControlImage -scale-x-100'></Image>
      </div>
      <h4 className='font-normal text-xl lg:text-2xl py-20 px-8 leading-normal lg:leading-normal'>Als erfahrener Blechbearbeiter legen wir großen Wert auf Qualität und Kundenzufriedenheit. Unser Ziel ist es, Ihre Anforderungen präzise und termingerecht umzusetzen.
        Haben Sie Fragen zu unseren Dienstleistungen oder möchten Sie ein individuelles Angebot einholen? Zögern Sie nicht, uns zu kontaktieren. Füllen Sie einfach das Formular aus oder kontaktieren Sie uns direkt über <b>vertrieb@atbs.de</b>, und wir melden uns schnellstmöglich bei Ihnen.
      </h4>
    </section>
  );
};

export default Control;

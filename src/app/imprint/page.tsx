import { FaStamp } from "react-icons/fa"

export default function Imprint() {
    return (
      <main className="flex flex-col items-center justify-between p-11 privacy-bg">
          <div className="flex flex-row justify-around items-center">
              <FaStamp className="text-7xl hidden sm:block mr-11 text-fg" /> <h2 className="text-2xl sm:text-3xl">Impressum</h2>
          </div> 
        <div className="flex flex-row w-full justify-center flex-wrap">
          <div className="leading-loose impress-div">
            <h3>Dienstanbeiter</h3>
            <p>
            <b className="text-sm">Angaben gemäß § 5 TMG:</b><br />
            <br/>
            <b>ATBS Braunschweig GmbH & Co.KG  </b><br />
            Geschäftsführer: Ali Nurdogan<br />
            Industriestraße 7<br />
            38110 Braunschweig<br />
            </p>
            <br />
            <p>
              <b>Kontakt:</b><br />
              Telefon: +49(0)5307 20412-0<br />
              Telefax: +49(0)5307 20412-19<br />
            </p>
              <p>Email: <a href="mailto:info@atbs.de"> info@atbs.de </a></p>
            
            <p>
              <br/>
              <b>Umsatzsteuer-ID(§27 UStG):</b> DE357559865
            </p>

            <p><b>AGB:</b> <a href="/documents/agbs-atbs.pdf" target="_blank" className="text-blue-500">PDF-Datei herunterladen</a></p>
          </div>
          <div className="impress-div">
            <h3>Haftungsbeschluss</h3>
            <p>
            <br/>
            Die Informationen auf den Webseiten der ATBS wurden sorgfältig und gewissenhaft zusammengestellt. Sie werden auch in Zukunft regelmäßig geprüft, aktualisiert und erweitert. Trotzdem können sich Angaben zwischenzeitlich verändert haben. Eine Haftung oder Garantie für die Aktualität, Richtigkeit und Vollständigkeit der zur Verfügung gestellten Informationen kann daher von der ATBS nicht übernommen werden. Gleiches gilt auch für alle Websites, auf die mittels eines Hyperlinks verwiesen wird. Für den Inhalt der Websites, die mit einer solchen Verbindung erreicht werden, ist allein der jeweilige Anbieter verantwortlich. Bei der Aufnahme der jeweiligen Verlinkung war diese rechtlich einwandfrei, eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden diese Links umgehend entfernt. <br/>
            <br/>
            Die durch die ATBS erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung der ATBS. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. <br/>
            <br/>
            Soweit auf den Seiten der ATBS personenbezogene Daten (beispielsweise Name, Anschrift oder Email-Adressen) erhoben werden, erfolgt dies stets auf freiwilliger Basis. Die Nutzung der Angebote und Dienste ist, soweit realisierbar, stets ohne Angabe personenbezogener Daten möglich. Der Nutzung der, im Rahmen der Impressumspflicht, veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die ATBS behält sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor. <br/>
            <br/>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr">ec.europa.eu/consumers/odr</a>. Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>
      </main>
    )
  }
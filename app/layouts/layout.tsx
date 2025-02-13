import { Outlet } from "react-router";
import { NavBar } from "~/components/ui/tubelight-navbar";
import masjid from "./mosque.svg";
import artikel from "./artikel.svg";
import infaq from "./infaq.svg";
import jadwalSholat from "./jadwal-sholat.svg";
import { Typewriter } from "~/components/ui/typewriter";
import type { Route } from "./+types/layout";
import { CloudSun, Cloudy, Moon, Sun, Sunset } from "lucide-react";

export async function loader({ request }: Route.LoaderArgs) {
  const date = new Date();
  const result = date.toISOString().split("T")[0];
  const month = result.split("-")[1];
  const year = result.split("-")[0];

  const url = `https://api.myquran.com/v2/sholat/jadwal/1219/${year}/${month}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    return { data };
  } catch (error) {
    throw new Error(`Response status: ${error}`);
  }
}

export default function MenuTabs({ loaderData }: Route.ComponentProps) {
  const navItems = [
    {
      name: "HOME",
      url: "/",
      icon: masjid,
    },
    {
      name: "ARTIKEL",
      url: "/posts",
      icon: artikel,
    },
    {
      name: "INFAQ",
      url: "infaq",
      icon: infaq,
    },
    {
      name: "JADWAL SHOLAT",
      url: "/jadwal-sholat",
      icon: jadwalSholat,
    },
  ];

  const { data } = loaderData;
  const jadwal = data.data.jadwal;

  const today = new Date().toLocaleDateString();

  const formatData = jadwal.map((item: any) => {
    const dateParts = item.tanggal.split(",")[1];
    const [day, month, year] = dateParts.split("/");
    const formattedDate = new Date(
      `${year}-${month}-${day}`
    ).toLocaleDateString();
    const tgl = day;
    return { ...item, formatTanggal: formattedDate, tgl: tgl };
  });

  const adzanToday = formatData.filter(
    (item: any) => item.formatTanggal === today
  );

  const classCard =
    "flex flex-col items-center text-lg font-semibold  p-2 rounded-lg text-center gap-2 w-full border border-zinc-200 rounded-lg  text-secondary-foreground/75 hover:bg-green-100";

  return (
    <>
      <div className="flex flex-col gap-4 bg-zinc-100">
        <header className="flex bg-white border-zinc-200 sticky top-0 border-b-2 justify-center items-center gap-4 p-4 max-w-full shadow-sm">
          <div className="flex mx-auto items-center gap-4">
            <img
              src="/images/logo-masjid-rsai.png"
              alt="logo"
              className="w-16 h-16 "
            />
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold ">
                Masjid Riyaadhush Shaalihaat
              </h1>
              <p className="text-base text-gray-500">
                Rumah Sakit Al Islam Bandung | Soekarno Hatta 644 Kota Bandung
              </p>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full h-full mt-3 mb-52 ">
          <Outlet />
        </main>
        <div className="h-16 fixed bottom-0 p-2 w-full">
          <NavBar items={navItems} />
        </div>
      </div>
      <div className="fixed w-[400px] h-[750px] bg-white top-32 right-14 z-50 rounded-lg shadow-sm">
        <AdsInfaq />
      </div>
      <div className="fixed w-[400px] h-[750px] bg-white top-32 left-14 z-50 rounded-lg shadow-sm">
        <div className="w-full text-2xl flex flex-col items-start justify-start bg-background font-normal overflow-hidden p-12 pt-16 rounded-lg ">
          <span className=" font-bold">{"Jadwal Sholat kota Bandung"}</span>
          <div className="flex flex-row items-center justify-between shadow-sm w-full ">
            {adzanToday.map((adzanT: any) => (
              <div
                key={adzanT.tanggal}
                className="flex items-center w-full rounded-lg justify-between"
              >
                <div className="flex  flex-col  w-full p-4 rounded-lg justify-center">
                  <div className="flex flex-col mb-2 items-center">
                    <div className="flex items-center gap-2 w-full p-3 justify-center">
                      <h2 className="text-xl font-medium ">
                        {new Date().toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 items-center justify-center">
                    <div className={classCard}>
                      <div className="flex justify-between items-center w-full p-2">
                        <Cloudy width={42} height={42} className="ml-6" />
                        <div className="mr-6 w-1/2 ml-6 border-l-2">
                          <div className="font-semibold text-xl mb-1">
                            Subuh
                          </div>
                          <div className="font-semibold text-2xl mb-1">
                            {adzanT.subuh}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classCard}>
                      <div className="flex justify-between items-center w-full p-2">
                        <Sun width={42} height={42} className="ml-6" />
                        <div className="mr-6 w-1/2 ml-6 border-l-2">
                          <div className="font-semibold text-xl mb-1">
                            Dzuhur
                          </div>
                          <div className="font-semibold text-2xl mb-1">
                            {adzanT.dzuhur}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classCard}>
                      <div className="flex justify-between items-center w-full p-2">
                        <CloudSun width={42} height={42} className="ml-6" />
                        <div className="mr-6 w-1/2 ml-6 border-l-2">
                          <div className="font-semibold text-xl mb-1">
                            Ashar
                          </div>
                          <div className="font-semibold text-2xl mb-1">
                            {adzanT.ashar}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classCard}>
                      <div className="flex justify-between items-center w-full p-2">
                        <Sunset width={42} height={42} className="ml-6" />
                        <div className="mr-6 w-1/2 ml-6 border-l-2">
                          <div className="font-semibold text-xl mb-1">
                            Maghrib
                          </div>
                          <div className="font-semibold text-2xl mb-1">
                            {adzanT.maghrib}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classCard}>
                      <div className="flex justify-between items-center w-full p-2">
                        <Moon width={42} height={42} className="ml-6" />
                        <div className="mr-6 w-1/2 ml-6 border-l-2">
                          <div className="font-semibold text-xl mb-1">Isya</div>
                          <div className="font-semibold text-2xl mb-1">
                            {adzanT.isya}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
function AdsInfaq() {
  return (
    <div className="w-full text-2xl flex flex-col items-start justify-start bg-background font-normal overflow-hidden p-12 pt-16 rounded-lg ">
      <span className=" font-bold">{"Nabi Muhammad ﷺ "}</span>
      <span>{"bersabda : "}</span>
      <div className="whitespace-pre-wrap h-[180px] mt-4">
        <Typewriter
          text={[
            "Sedekah tidak akan mengurangi harta.",
            "Sedekah itu dapat menghapus dosa sebagaimana air 💦 itu memadamkan api 🔥.",
            "Berinfaqlah, niscaya Aku akan menafkahimu.",
          ]}
          speed={70}
          className="text-green-700 font-semibold leading-normal"
          waitTime={1500}
          deleteSpeed={40}
          cursorChar={"_"}
        />
      </div>
      <div className="w-full mt-5 p-8">
        <h1 className="text-lg font-bold text-center mb-4">
          {"[ "}SCAN INFAQ SEKARANG{" ]"}
        </h1>
        <img src="/images/infaq-masjid.jpg" alt="ads" className="w-full" />
        <div className="flex flex-col gap-2 mt-4 items-center">
          <h2 className="text-center font-medium text-xl">7070644643</h2>
          <span className="text-center font-semibold text-xl">
            BSI Masjid Riyaadhus Shaalihaat
          </span>
        </div>
      </div>
    </div>
  );
}

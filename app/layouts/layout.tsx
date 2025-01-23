import { Outlet } from "react-router";
import { NavBar } from "~/components/ui/tubelight-navbar";
import masjid from "./mosque.svg";
import artikel from "./artikel.svg";
import infaq from "./infaq.svg";
import jadwalSholat from "./jadwal-sholat.svg";

export default function MenuTabs() {
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

  return (
    <div className="flex flex-col gap-4  bg-zinc-100">
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
      <main className="mx-auto w-full h-full mt-1 mb-52 ">
        <Outlet />
      </main>
      <div className="h-16 fixed bottom-0 p-2 w-full">
        <NavBar items={navItems} />
      </div>
    </div>
  );
}

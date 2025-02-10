import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Link } from "react-router";
import type { Route } from "./+types/jadwal-sholat";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { CloudSun, Cloudy, Moon, Sun, Sunset } from "lucide-react";
import InactivityTimer from "./useAutoReload";

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
export default function JadwalSholat({ loaderData }: Route.ComponentProps) {
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

  // console.log(adzanToday);

  let tanggalSekarang = new Date();
  let formatIndonesia = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    // day: "2-digit",
  }).format(tanggalSekarang);

  interface Jadwal {
    tanggal: string;
    subuh: string;
    dzuhur: string;
    ashar: string;
    maghrib: string;
    isya: string;
  }

  const classCard =
    "flex flex-col items-center text-lg font-semibold  p-2 rounded-lg text-center gap-2";

  return (
    <>
      <InactivityTimer timeout={60000} />
      <div className="flex flex-col mx-auto max-w-4xl bg-white p-6 rounded-lg">
        <div className="flex items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to={"/"}>Home</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Jadwal Shalat</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold mt-9">Jadwal Sholat</h2>
            <h2 className="text-3xl font-semibold mt-9">{formatIndonesia}</h2>
          </div>
          <div className="flex items-center justify-between  border border-zinc-200 rounded-lg shadow-sm  bg-green-100">
            {adzanToday.map((adzanT: any) => (
              <div
                key={adzanT.tanggal}
                className="flex items-cente w-full rounded-lg justify-between"
              >
                <div className="flex items-center justify-center ml-6">
                  <img src="/images/adzan.png" alt="" className="w-40 h-40" />
                </div>
                <div className="flex  flex-col  w-full p-4 rounded-lg justify-center">
                  <div className="flex flex-col mb-4 items-center">
                    <div className="flex items-center gap-2 border-b border-zinc-300 w-4/5 p-3 justify-center">
                      <h2 className="text-xl font-medium ">
                        {new Date().toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </h2>
                    </div>
                  </div>
                  <div className="flex gap-14 items-center justify-center">
                    <div className={classCard}>
                      <div className="font-medium">Subuh</div>
                      <div>
                        <Cloudy />
                      </div>
                      <div>{adzanT.subuh}</div>
                    </div>
                    <div className={classCard}>
                      <div className="font-medium">Dzuhur</div>
                      <div>
                        <Sun />
                      </div>
                      <div>{adzanT.dzuhur}</div>
                    </div>
                    <div className={classCard}>
                      <div className="font-medium">Ashar</div>
                      <div>
                        <CloudSun />
                      </div>
                      <div>{adzanT.ashar}</div>
                    </div>
                    <div className={classCard}>
                      <div className="font-medium">Maghrib</div>
                      <div>
                        <Sunset />
                      </div>
                      <div>{adzanT.maghrib}</div>
                    </div>
                    <div className={classCard}>
                      <div className="font-medium">Isya</div>
                      <div>
                        <Moon />
                      </div>
                      <div>{adzanT.isya}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <Table className="mt-5" key={800}>
              <TableCaption>Sumber data: MyQuran.com</TableCaption>
              <TableHeader>
                <TableRow className="mt-5" key={900}>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Subuh</TableHead>
                  <TableHead>Dzuhur</TableHead>
                  <TableHead>Ashar</TableHead>
                  <TableHead>Maghrib</TableHead>
                  <TableHead>Isya</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formatData.map((adzan: any, index: number) => (
                  <TableRow
                    key={index}
                    className={
                      adzan.formatTanggal === today
                        ? "bg-green-100 hover:bg-green-200"
                        : ""
                    }
                  >
                    <TableCell className="text-center">{adzan.tgl}</TableCell>
                    <TableCell className="text-center">{adzan.subuh}</TableCell>
                    <TableCell className="text-center">
                      {adzan.dzuhur}
                    </TableCell>
                    <TableCell className="text-center">{adzan.ashar}</TableCell>
                    <TableCell className="text-center">
                      {adzan.maghrib}
                    </TableCell>
                    <TableCell className="text-center">{adzan.isya}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

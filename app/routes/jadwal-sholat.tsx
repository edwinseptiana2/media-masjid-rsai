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
    return { ...item, formatTanggal: formattedDate };
  });

  const adzanToday = formatData.filter(
    (item: any) => item.formatTanggal === today
  );

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

  return (
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
        {/* <div className="flex items-center justify-between">
          {adzanToday.map((adzanT: any) => (
            <h2 className="text-3xl font-semibold mt-9" key={adzanT.id}>
              {adzanT.formatTanggal}
            </h2>
          ))}
        </div> */}
        <Table>
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
              <TableRow key={index}>
                <TableCell className="text-center">
                  {adzan.formatTanggal.split("/")[0]}
                </TableCell>
                <TableCell className="text-center">{adzan.subuh}</TableCell>
                <TableCell className="text-center">{adzan.dzuhur}</TableCell>
                <TableCell className="text-center">{adzan.ashar}</TableCell>
                <TableCell className="text-center">{adzan.maghrib}</TableCell>
                <TableCell className="text-center">{adzan.isya}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

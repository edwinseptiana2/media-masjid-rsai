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
  // console.log(jadwal);
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
        <h2 className="text-3xl font-semibold mt-9">Jadwal Sholat</h2>
        <Table>
          <TableCaption>Sumber data: MyQuran.com</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Tanggal</TableHead>
              <TableHead>Subuh</TableHead>
              <TableHead>Dzuhur</TableHead>
              <TableHead>Ashar</TableHead>
              <TableHead>Maghrib</TableHead>
              <TableHead>Isya</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jadwal.map((adzan: any) => (
              // todo cek tanggal hari ini trs berikan class active
              <TableRow key={adzan.tanggal} className={"bg-green-400"}>
                <TableCell className="font-medium">
                  {adzan.tanggal.split(",")[1]}
                </TableCell>
                <TableCell>{adzan.subuh}</TableCell>
                <TableCell>{adzan.dzuhur}</TableCell>
                <TableCell>{adzan.ashar}</TableCell>
                <TableCell>{adzan.maghrib}</TableCell>
                <TableCell>{adzan.isya}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </div>
    </div>
  );
}

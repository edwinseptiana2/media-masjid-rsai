import type { Route } from "./+types/test-coding";

export default function TestCoding({ loaderData }: Route.ComponentProps) {
  const today = new Date().toLocaleDateString();
  const data = [
    { subuh: "Event 1", tanggal: "Rabu, 05/02/2025" },
    { subuh: "Event 2", tanggal: "Kamis, 06/02/2025" },
    { subuh: "Event 3", tanggal: "Jumat, 07/02/2025" },
    { subuh: "Event 3", tanggal: "Sabtu, 08/02/2025" },
  ];

  const formatData = data.map((item) => {
    const dateParts = item.tanggal.split(",")[1];
    const [day, month, year] = dateParts.split("/");
    const sliceDate = new Date(`${year}-${month}-${day}`).toLocaleDateString();
    // const formattedDate = `${sliceDate.getUTC()}-${String(
    //   sliceDate.getUTCMonth() + 1
    // ).padStart(2, "0")}-${String(sliceDate.getUTCDate()).padStart(2, "0")}`;
    return { ...item, formatTanggal: sliceDate };
  });

  return (
    <div className="p-10">
      <h1>TEST CODING</h1>
      <table className="table bg-green-300 w-3/4">
        <thead>
          <tr>
            <th>Today</th>
            <th>Tanggal</th>
            <th>Subuh</th>
          </tr>
        </thead>
        <tbody>
          {formatData.map(
            (item, index) => (
              console.log("today : " + today),
              console.log("data : " + item.formatTanggal),
              console.log(today === item.formatTanggal),
              (
                <tr
                  key={index}
                  className={
                    today === item.formatTanggal ? "bg-red-400" : "bg-green-300"
                  }
                >
                  <td>{today}</td>
                  <td>{item.formatTanggal}</td>
                  {/* <td>{new Date(item.tanggal).toISOString().split("T")[0]}</td> */}
                  <td>{item.subuh}</td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

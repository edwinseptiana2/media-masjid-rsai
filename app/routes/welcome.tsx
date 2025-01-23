import masjid from "./mosque.svg";

export default function Welcome() {
  return (
    <div>
      <img
        src={masjid}
        alt=""
        className="hover:bg-green-500 stroke-orange-500 fill-red-600"
      />
    </div>
  );
}

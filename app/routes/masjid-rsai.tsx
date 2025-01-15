import { Hero } from "~/components/ui/hero-with-image-text-and-two-buttons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "~/lib/utils";
import { GridPattern } from "~/components/ui/grid-pattern";

const dataItems = [
  {
    badge: "Assalamu'alaykum! 🙏",
    title: "Selamat Datang di Masjid Riyaadhus Shaalihat 🕌",
    subtitel:
      "Berikut ini adalah media informasi terkait masjid. Diperuntukkan untuk jamaah dan masyarakat umum. Dalam rangka memberikan informasi mengenai kegiatan dan program yang ada di Masjid Riyaadhus Shaalihat",
    image: "/images/masjid-1.jpg",
    url: "/sejarah",
  },
  {
    badge: "Artikel Islami 📖",
    title: "Zakat Fitrah dan Keutamaannya",
    subtitel:
      "Zakat Fitrah adalah zakat yang wajib dikeluarkan oleh setiap muslim yang mampu pada bulan Ramadhan. Zakat Fitrah memiliki keutamaan yang sangat besar bagi setiap muslim yang melaksanakannya.",
    image: "/images/masjid-2.jpg",
    url: "/zakat-fitrah",
  },
  {
    badge: "Ramadhan Mubarak! 🌛",
    title: "Puasa Ramadhan dan Petunjuk Qur'an",
    subtitel:
      "Puasa Ramadhan adalah salah satu rukun Islam yang wajib dilaksanakan oleh setiap muslim yang mampu. Puasa Ramadhan memiliki petunjuk yang jelas dalam Al-Qur'an dan Hadits.",
    image: "/images/masjid-3.jpg",
    url: "puasa-ramadhan",
  },
];

export default function MasjidRsai() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-green-200 to-green-100">
        {/* <div className=""> */}
        <Carousel
          orientation="horizontal"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 9000,
            }),
          ]}
        >
          <CarouselContent>
            {dataItems.map((item, index) => (
              <CarouselItem>
                <Hero
                  key={index}
                  badge={item.badge}
                  title={item.title}
                  subtitle={item.subtitel}
                  image={item.image}
                  url={item.url}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>

        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
            [15, 10],
            [10, 15],
            [15, 10],
          ]}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 skew-y-12 h-[650px]"
          )}
        />
      </div>
    </>
  );
}

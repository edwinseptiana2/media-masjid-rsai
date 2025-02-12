import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { GridPattern } from "~/components/ui/grid-pattern";
import { Hero } from "~/components/ui/hero-text-image";
import { cn } from "~/lib/utils";
import { getPosts } from "~/models/post.server";
import type { Route } from "./+types/masjid-rsai";
import InactivityTimer from "./useAutoReload";

export async function loader({}: Route.LoaderArgs) {
  const data = await getPosts();
  return data;
}

export default function MasjidRsai({ loaderData }: Route.ComponentProps) {
  const data = loaderData;
  const countObj = Object.keys(data).length;

  return (
    <>
      <InactivityTimer timeout={10000 * countObj} />
      <div className="flex items-center justify-center h-full bg-gradient-to-b from-green-200 to-green-100">
        <Carousel
          orientation="horizontal"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 10000,
              active: true,
              stopOnFocusIn: false,
              stopOnInteraction: false,
              stopOnLastSnap: false,
              stopOnMouseEnter: false,
            }),
          ]}
        >
          <CarouselContent>
            {data.map((post) => (
              <CarouselItem key={post.id}>
                <Hero
                  key={post.id}
                  badge={post.badge ?? ""}
                  title={post.title}
                  subtitle={post.subtitle ?? ""}
                  image={post.image ?? ""}
                  url={post.slug}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </div>
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
          [10, 20],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 skew-y-12 h-[650px]"
        )}
      />
    </>
  );
}

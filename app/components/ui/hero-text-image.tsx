import { MoveRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router";

interface DataHeroItems {
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  url: string;
}

function Hero({ badge, title, subtitle, image, url }: DataHeroItems) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <div className="grid max-w-full h-lvh mx-32 ">
          <div className="grid gap-8 items-center justify-center grid-cols-2">
            <div className="flex gap-4 flex-col ">
              <div>
                <Badge variant="secondary" className="font-serif">
                  {badge}
                </Badge>
              </div>
              <div className="flex gap-4 flex-col">
                <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-extrabold">
                  {title}
                </h1>
                <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left  line-clamp-4">
                  {subtitle}
                </p>
              </div>
              <div className="flex flex-row gap-4 items-center mt-3">
                <Link to={`posts/${url}`}>
                  <Button size="lg" className="gap-4">
                    Baca selengkapnya! <MoveRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <Link to={`posts/${url}`}>
              <div className="rounded-md aspect-square items-center justify-center bg-zinc-900">
                <img
                  src={`/carousel/${image}`}
                  className="h-full w-full object-center object-cover z-50"
                  alt=""
                />
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export { Hero };

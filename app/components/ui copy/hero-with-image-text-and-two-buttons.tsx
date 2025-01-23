import { MoveRight, PhoneCall } from "lucide-react";
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
    <div className="w-full h-screen py-16">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <div className="container mx-auto">
          <div className="grid gap-8 items-center grid-cols-2">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="secondary" className="font-serif">
                  {badge}
                </Badge>
              </div>
              <div className="flex gap-4 flex-col">
                <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-extrabold">
                  {title}
                </h1>
                <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                  {subtitle}
                </p>
              </div>
              <div className="flex flex-row gap-4 items-center mt-3">
                <Link to={url}>
                  <Button size="lg" className="gap-4">
                    Baca selengkapnya! <MoveRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-muted rounded-md aspect-square">
              <img
                src={image}
                className="h-full object-center object-cover z-50"
                alt=""
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export { Hero };

import { useEffect, useState, type JSX } from "react";
import { motion } from "framer-motion";
// import type { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { NavLink } from "react-router";

interface NavItem {
  name: string;
  url: string;
  icon?: string;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          //const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <NavLink
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && item.name !== "HOME" && "bg-muted text-primary"
              )}
            >
              <span className="flex flex-row items-center justify-center mr-2 ">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="bg-zinc-100 hover:bg-zinc-200 p-2 rounded-full w-12 h-12 mr-2"
                />

                {item.name}
              </span>

              {isActive && item.name !== "HOME" && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    (<div
      className={cn("grid gap-8 lg:grid-cols-3 pl-16 pr-2 lg:px-0", className)}>
      {items.map((item, idx) => (
        <div
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-primary dark:bg-secondary  rounded-tr-[20px] rounded-bl-[20px]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }} />
            )}
          </AnimatePresence>
          <Card>
            <Image src={item.image}
              alt={item.title}
              className="mx-auto mb-4"
              width={150}
              height={150}
              quality={100}
            />
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>)
  );
};

export const Card = ({
  className,
  children
}) => {
  return (
    (<div
      className={cn(
        " h-full w-full p-4 overflow-hidden bg-zinc-100 border border-transparent  relative z-20 rounded-tr-[20px] rounded-bl-[20px]",
        className
      )}>
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>)
  );
};
export const CardTitle = ({
  className,
  children
}) => {
  return (
    (<h4 className={cn("text-secondary dark:text-primary font-bold tracking-wide mt-4 font-hind", className)}>
      {children}
    </h4>)
  );
};
export const CardDescription = ({
  className,
  children
}) => {
  return (
    (<p
      className={cn("mt-8 text-secondary dark:text-primary tracking-wide leading-relaxed text-sm font-nunito", className)}>
      {children}
    </p>)
  );
};

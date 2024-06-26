import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const CardWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl bg-[#0f0f0f] gap-2 flex w-full p-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export default CardWrapper;

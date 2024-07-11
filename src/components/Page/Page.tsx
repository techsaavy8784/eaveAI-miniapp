import type { FC, PropsWithChildren, ReactNode } from "react";

import styles from "./Page.module.css";
import { cn } from "@/lib/utils";

export interface PageProps extends PropsWithChildren {
  title?: string;
  disclaimer?: ReactNode;
  className?: string;
}

export const Page: FC<PageProps> = ({
  title,
  children,
  disclaimer,
  className,
}) => (
  <div
    className={cn(
      "bg-background flex w-full min-h-screen flex-col items-center justify-between p-3",
      className
    )}
  >
    <h1>{title}</h1>
    {disclaimer && <div className={styles.disclaimer}>{disclaimer}</div>}
    {children}
  </div>
);

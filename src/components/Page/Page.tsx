import type { FC, PropsWithChildren, ReactNode } from "react";

import styles from "./Page.module.css";

export interface PageProps extends PropsWithChildren {
  title?: string;
  disclaimer?: ReactNode;
}

export const Page: FC<PageProps> = ({ title, children, disclaimer }) => (
  <div className="bg-background flex w-full min-h-screen flex-col items-center justify-between p-3 animate-opacity-scale">
    <h1>{title}</h1>
    {disclaimer && <div className={styles.disclaimer}>{disclaimer}</div>}
    {children}
  </div>
);

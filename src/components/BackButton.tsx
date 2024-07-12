"use client";

import { useBackButton } from "@/hooks/useBackButton";

export default function BackButton(): JSX.Element | null {
  useBackButton();

  return null;
}

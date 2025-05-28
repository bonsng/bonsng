"use client";

import { ReactNode } from "react";
import { PageNumberProvider } from "@/ui/context/page-number.provider";
import { ColorsProvider } from "@/ui/context/colors.provider";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <>
      <PageNumberProvider>
        <ColorsProvider>{children}</ColorsProvider>
      </PageNumberProvider>
    </>
  );
}

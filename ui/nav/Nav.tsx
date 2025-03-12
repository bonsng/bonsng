"use client";

import { Dots } from "@/ui/components/Dot";
import { contents } from "@/ui/data/contents";

export default function Nav() {
  return (
    <nav className="">
      {/*Navigation Bar*/}
      <Dots contents={contents} />
    </nav>
  );
}

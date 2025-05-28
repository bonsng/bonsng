"use client";

import { Dots } from "@/ui/components/dot";
import { contents } from "@/lib/data/contents";

export default function Nav() {
  return (
    <nav className="">
      {/*Navigation Bar*/}
      <Dots contents={contents} />
    </nav>
  );
}

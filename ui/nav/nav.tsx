"use client";

import { Dots } from "@/ui/components/dot";
import { contents } from "@/lib/data/contents";
import { useModalContext } from "@/ui/modal/modal-context.provider";

export default function Nav() {
  const { state } = useModalContext();
  return (
    <nav className="">
      {/*Navigation Bar*/}
      {!state.isOpen && <Dots contents={contents} />}
    </nav>
  );
}

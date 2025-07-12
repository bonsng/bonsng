import Image, { StaticImageData } from "next/image";

import clsx from "clsx";
import { useModal } from "@/ui/hooks/modal.hook";
import { useEffect, useState } from "react";

type PImageButton = {
  title: string;
  period: string;
  description: string;
  src: StaticImageData;
  titleFont?: string;
  isOdd?: boolean;
};

const ImageButton = ({
  title,
  period,
  description,
  src,
  isOdd = true,
  titleFont = "lime",
}: PImageButton) => {
  const { openModal, isOpen } = useModal();
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    setOpened(true);
    openModal({ title });
  };

  useEffect(() => {
    if (!isOpen) setOpened(false);
  }, [isOpen]);

  return (
    <>
      <div
        className={clsx(
          "flex lg:flex-row flex-col lg:justify-center lg:gap-30 w-full text-white lg:text-6xl mb-10",
          { "lg:flex-row-reverse": !isOdd },
        )}
        id="image-button-container"
      >
        <div className="flex flex-col justify-center mb-3">
          <h1
            className={`font-${titleFont} text-2xl lg:text-7xl ${titleFont === "logo" && "font-thin"}`}
          >
            {title}
          </h1>
          <p className="lg:text-lg text-sm font-semibold lg:mt-2">
            {description}
          </p>
          <p className="lg:text-lg text-sm font-light">{period}</p>
        </div>
        <div
          className={clsx(
            "relative w-full max-w-xl aspect-video overflow-hidden transition-transform duration-800 group hover:scale-95 hover:cursor-pointer",
            { "translate-x-1/2 pointer-events-none z-50": opened },
          )}
          onClick={handleClick}
        >
          <Image
            src={src}
            alt="RoomOf project preview"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-130"
          />
        </div>
      </div>
    </>
  );
};

export default ImageButton;

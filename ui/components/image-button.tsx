import Image, { StaticImageData } from "next/image";

import clsx from "clsx";

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
        <div className="relative w-full max-w-xl aspect-video overflow-hidden transition-transform duration-800 group hover:scale-95 hover:cursor-pointer">
          <Image
            src={src}
            alt="RoomOf project preview"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-130 z-0"
          />
        </div>
      </div>
    </>
  );
};

export default ImageButton;

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

// import { useModal } from "@/ui/hooks/modal.hook";
import clsx from "clsx";
import Link from "next/link";

type PImageButton = {
  title: string;
  period: string;
  description: string;
  src: StaticImageData;
  titleFont?: string;
  isOdd?: boolean;
};

const links: Record<string, string> = {
  "3drive": "https://3-drive-mock.vercel.app/",
  roomof: "https://room-of-rebuild.vercel.app/",
  bonsng: "/",
};

const githubLnks: Record<string, string> = {
  "3drive": "https://github.com/bonsng/3Drive-mock",
  roomof: "https://github.com/bonsng/RoomOfRebuild",
  bonsng: "https://github.com/bonsng",
};

const ImageButton = ({
  title,
  period,
  description,
  src,
  isOdd = true,
  titleFont = "lime",
}: PImageButton) => {
  // const { openModal } = useModal();
  // const handleClick = () => {
  //   openModal({ title });
  // };

  const [isLoading, setIsLoading] = useState(true);

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
            className={clsx(
              "text-2xl lg:text-7xl",
              titleFont === "lime" && "font-lime",
              titleFont === "notable" && "font-notable",
              titleFont === "logo" && "font-logo font-thin",
            )}
          >
            {title}
          </h1>
          <p className="lg:text-lg text-sm font-semibold lg:mt-2">
            {description}
          </p>
          <p className="lg:text-lg text-sm font-light">{period}</p>
          <p className="lg:text-lg text-sm font-light">
            <Link
              href={githubLnks[title.toLowerCase()]}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Github
            </Link>
          </p>
          <p className="lg:text-lg text-sm font-light">
            <Link
              href={links[title.toLowerCase()]}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Live Demo
            </Link>
          </p>
        </div>
        <Link
          href={links[title.toLowerCase()]}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full max-w-xl aspect-video overflow-hidden transition-transform duration-800 group hover:scale-95 hover:cursor-pointer"
        >
          {isLoading && (
            <div className="absolute inset-0 bg-gray-300 animate-pulse" />
          )}
          <Image
            src={src}
            alt="RoomOf project preview"
            fill
            className={clsx(
              "object-cover transition-transform duration-700 group-hover:scale-130",
              { "opacity-0": isLoading },
            )}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </Link>
      </div>
    </>
  );
};

export default ImageButton;

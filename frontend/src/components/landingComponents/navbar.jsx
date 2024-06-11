"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { useScroll } from "@/hooks/useScroll";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { scrolled } = useScroll();

  const params = useParams();
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (typeof window != undefined) {
      setHash(window.location.hash);
    }
  }, [params]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed top-0 text-white left-0 mx-auto md:max-h-[108px] z-50 w-full py-6 flex place-items-center
      ${
        scrolled
          ? "backdrop-blur-[24px] texat-black bg-black/70 shadow-navbar text-primarycolortadi6"
          : "teaxt-white"
      }`}
    >
      <div className="w-full text-inherit px-[MIN(100px,8%)]  m-auto flex justify-between items-center ">
        <div className="flex gap-4 ">
          <Link
            href="/"
            className="flex gap-4 justify-between items-center z-50"
          >
            <Image
              src={"/images/AxiosLogo.svg"}
              alt="Axios Logo"
              width={50}
              height={50}
            />
          </Link>

          <ul
            className={twMerge(
              `transition-all text-inherit items-start font-body 2xl:text-xl px-4 md:py-0 -top-[100vh] md:top-0 left-0 duration-500 w-full min-h-screen md:min-h-full ease-in flex flex-col max-w-[194px] min-w-full md:min-w-fit md:max-w-full font-light absolute md:flex md:flex-row md:relative gap-2 gap-x-4 md:bg-transparent md:h-full md:justify-end md:items-center md:w-fit
              `,
              isOpen
                ? "top-0 z-0 text-black md:text-inherit bg-white md:bg-transparent justify-start px-[MIN(100px,8%)] md:px-4 gap-y-1 gap-4 items-start min-h-screen"
                : "smd:text-white"
            )}
          >
            {isOpen && (
              <div className=" relative top-[100px] flex flex-col justify-center items-center gap-4 my-6 md:hidden">
                <Button href="/start_selling?tab=start" name="Start Selling" />
              </div>
            )}
          </ul>
        </div>

        <div className="hidden md:block gap-4">
          <Button
            href="/welcome"
            name="Start Campaign"
            outline
            className="bg-primary px-10"
          />
        </div>

        <button
          onClick={toggleMenu}
          className="z-50 size-12 p-3 text-xl rounded-full cursor-pointer text-primary md:hidden active:bg-gray-800"
        >
          {isOpen ? (
            <AiOutlineClose />
          ) : (
            <span>
              <AiOutlineMenu className="text-[#fff]" />
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

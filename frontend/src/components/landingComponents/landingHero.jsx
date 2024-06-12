"use client";
import Button from "../Button";
import Image from "next/image";

const LandingPageHero = () => {
  return (
    <section className="relative flex flex-col w-full md:h-[803px] md:flex-row">
      <section className="relative bg-primary w-full h-full py-36">
        <span className="z-1 absolute top-5 left-[35%] md:top-16 md:left-[20%] animate-customrotate">
          <Image
            src={"/images/vShapedOne.svg"}
            height={50}
            width={50}
            alt="doddles"
          />
        </span>
        <span className="z-1 absolute top-[45%] md:top-[60%] left-[10%] animate-custombounce">
          <Image
            src={"/images/vShapedTwo.svg"}
            height={50}
            width={50}
            alt="doddles"
          />
        </span>

        <span className="z-1 absolute top-[90%] left-[50%] animate-customrotate">
          <Image
            src={"/images/vShapedFour.svg"}
            height={50}
            width={50}
            alt="doddles"
          />
        </span>

        <span className="z-1 absolute top-30 right-[0] md:right-[20%] animate-custombounce ">
          <Image
            src={"/images/vShapedFive.svg"}
            height={50}
            width={50}
            alt="doddles"
          />
        </span>
        <span className="z-1 absolute top-[65%] right-[10%] animate-customrotate">
          <Image
            src={"/images/vShapedThree.svg"}
            height={50}
            width={50}
            alt="doddles"
          />
        </span>

        <section className="relative w-full h-full bg-heroDoddle bg-no-repeat bg-cover bg-center">
          <div className="relative h-full flex flex-col items-center justify-center text-center mx-auto gap-8 md:gap-12 px-[MIN(100px,8%)]">
            <div className="flex flex-col font-medium text-3xl md:text-6xl text-textColor leading-10 md:leading-[80px]">
              <h2>
              Instant Tool <br className="hidden md:block" /> for anyone{" "}
              to sell their  <br className="hidden md:block" /> digital 
                <span className="text-[#00ADEF]"> products!</span>
              </h2>
            </div>

            <p className="font-normal text-lg text-[#DFDFF7]">
              leverage verxio's on-chain commerce protocol to create, manage, and {" "}
              <br className="hidden md:block" />distribute your digital product to your audience easily with.
            </p>

            <div className="flex gap-3 items-center relative z-20">
              <Button href="/welcome" name="Start Selling" className={"px-12"} />
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default LandingPageHero;

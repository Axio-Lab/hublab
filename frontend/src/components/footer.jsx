import Link from "next/link";
import Image from "next/image";
import { Copyright } from "iconsax-react";

const Footer = () => {
  return (
    <footer className="w-full h-full max-w-[1440px] mx-auto px-[MIN(100px,8%)] flex flex-col gap-12 md:gap-24 bg-tertiary min-h-[568px] py-24">
      <div className="w-full flex flex-col items-start md:items-center md:flex-row md:justify-between justify-start gap-8 text-textColor">
        {/* Logo Container */}
        <div className="flex-2">
          <Link href="/">
            <Image
              src={"/images/AxiosFooterLogo.svg"}
              alt="Axios Logo"
              width={80}
              height={80}
            />
          </Link>
        </div>
        {/* Footer Links */}
        <section className="flex-4 flex flex-col items-start justify-start md:flex-row gap-4 md:gap-24">
          <div className="flex flex-col items-start justify-start">
            <h2 className="font-bold font-base mb-6">Quick Links:</h2>
            <blockquote className="flex flex-col gap-2">
              <Link href={"/"}>Explore</Link>
              <Link href={"/"}>Campaign</Link>
              <Link href={"/"}>Suggestion Box</Link>
            </blockquote>
          </div>
          <div className="flex flex-col items-start justify-start">
            <h2 className="font-bold font-base mb-6">Legal</h2>
            <blockquote className="flex flex-col gap-2">
              <Link href={"/"}>Terms of Use</Link>
              <Link href={"/"}>Privacy Policy</Link>
            </blockquote>
          </div>
          <div className="flex flex-col items-start justify-start">
            <h2 className="font-bold font-base mb-6">Contact Us</h2>
            <blockquote className="flex flex-col gap-2">
              <Link href={"/"}>Email: Support@Verxio.com</Link>
              <Link href={"/"}>Phone: +2349035537</Link>
            </blockquote>
          </div>

          <div className="flex flex-col items-start justify-start">
            <h2 className="font-bold font-base mb-6">Connect With Us</h2>
            <blockquote className="flex justify-center items-center gap-2">
              <Link href={"/"}>X</Link>
              <Link href={"/"}>Y</Link>
              <Link href={"/"}>Z </Link>
            </blockquote>
          </div>
        </section>
      </div>

      {/* News letter */}
      <div className="w-full flex flex-col items-start md:items-center justify-center text-center max-w-2xl mx-auto">
        <div className="w-full flex flex-col gap-3 items-start">
          <h2 className="text-base font-bold text-textColor">
            Join Our Newsletter
          </h2>
          <div className="w-full flex flex-col md:flex-row justify-start items-start gap-3">
            <input
              type="text"
              className="w-full bg-transparent border border-[#DFDFF7] rounded-lg py-[0.7rem] md:px-36 outline-none"
            />
            <button className="bg-lightBlue w-full md:w-auto py-3 px-8 rounded-lg text-white font-normal text-base">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copy Right */}
      <div className="w-full flex flex-col items-center gap-6">
        <div className="w-full hidden md:block  md:border-[0.5px] md:border-[#B6B8EC]"></div>

        <p className="flex gap-3 items-center text-textColor font-normal font-base">
          <Copyright className="text-sm" />
          <span>
            {`${new Date().getFullYear()}`} Verxio. All rights reserved
          </span>
        </p>

        <div className="w-full hidden md:block md:border-[0.5px] md:border-[#B6B8EC]"></div>
      </div>
    </footer>
  );
};

export default Footer;

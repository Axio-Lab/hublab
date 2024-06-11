import SliderCards from "./sliderCards";

const sliderCardsData = [
  {
    headerText: "86,908 K+",
    description: "Product Launch",
  },
  {
    headerText: "201,986 M+",
    description: "Verxio Product Revenue",
  },
  {
    headerText: "106,072 K+",
    description: "Verxio Sellers",
  },
];

const SliderSection = () => {
  return (
    <section className="w-full h-full max-w-[1920px] mx-auto bg-earnBg ">
      <blockquote className="px-[MIN(100px,8%)] border-y-2 border-[#0D0E32] py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center md:flex-row gap-3">
        {[...sliderCardsData].map((data, index) => (
          <SliderCards {...data} key={index} />
        ))}
      </blockquote>
    </section>
  );
};

export default SliderSection;

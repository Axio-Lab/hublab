"use client";
import { toast } from "react-toastify";

const QuestionFormat = ({
  headerText,
  description,
  value
}) => {
  return (
    <div className="relative">
      <section className="z-4 bg-white relative w-full h-full border border-primary  p-3 rounded-lg flex items-center justify-between cursor-pointer">
        <div
          className=" w-[94%]"
          onClick={() => {
            console.log(value);
          }}
        >
          <div className="rounded-lg border border-primary z-[-1] h-full absolute w-full top-[6px] left-[6px]"></div>
          <div>
            <h2 className="semibold text-[18px]">{headerText}</h2>
            <p className="normal text-[14px]">{description}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuestionFormat;

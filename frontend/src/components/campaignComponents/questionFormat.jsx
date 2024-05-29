"use client";

const QuestionFormat = ({
  headerText,
  description,
  value,
  isSelected,
  onSelect,
}) => {
  
  const handleClick = () => {
    onSelect(value);
  };

  return (
    <div className="relative">
      <section
        className={`z-4 bg-white relative w-full h-full border p-3 rounded-lg flex items-center justify-between cursor-pointer ${
          isSelected ? "border-[#00ADEF]" : "border-primary"
        }`}
      >
        <div
          className=" w-[94%]"
          onClick={() => {
            handleClick();
            // console.log(value);
          }}
        >
          <div
            className={`rounded-lg border  z-[-1] h-full absolute w-full top-[6px] left-[6px] ${
              isSelected ? " border-[#00ADEF] bg-[#00ADEF]" : "border-primary"
            }`}
          ></div>
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

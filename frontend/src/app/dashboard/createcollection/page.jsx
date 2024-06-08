"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import UploadIcon from "../../../assets/uploadIcon.svg";
import { Button } from "@/components";
import ProjectCollectionModal from "@/components/modals/projectsCollectionModal";

const page = () => {
  const [createCollection, setCreateCollection] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedMode, setSelectedMode] = useState("");

  const handleClick = (mode) => {
    setSelectedMode(mode);
    console.log(selectedMode, "hgcvhjkl;lkjhgfdfghjkmmm");
  };

  const fileInputRef = useRef(null);

  const handleImageChange = (event, setSelectedImage) => {
    const file = event.target.files[0];
    console.log("file", file);

    if (file) {
      const reader = new FileReader();
      console.log("reader", reader);

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  console.log(selectedImage);

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <section className="w-full h-full p-2 md:p-10 ">
        <section className="w-full border rounded-lg p-2 md:p-6 flex flex-col items-start gap-3">
          <div className="mb-6">
            <h2 className="text-[32px] text-primary font-semibold">
              Create Project Collection
            </h2>
            <p className="text-[#484851] font-normal text-[18px] ">
              Build your unique collection in just a few clicks
            </p>
          </div>

          <section className="flex items-start flex-col gap-8 w-full">
            <div className="space-y-3 text-[#484851] w-full">
              <div className="flex items-center">
                <span className="mr-3 text-[#00ADEF] text-[24px]">*</span>
                <p className="font-semibold text-[18px] text-[#484851]">
                  {" "}
                  Choose a Collection Mode
                </p>
              </div>

              <div className="flex items-center border-collapse">
                <button
                  onClick={() => handleClick("transferable")}
                  className={`bg-[#fff] text-[#484851] border-[#00ADEF] text-[16px] font-normal w-[300px] py-2 border rounded-l-lg ${
                    selectedMode === "transferable"
                      ? "bg-[#00ADEF] text-[#FF0000]"
                      : ""
                  } `}
                >
                  Transferable
                </button>
                <button
                  onClick={() => handleClick("non-transferable")}
                  className={`bg-[#fff] text-[#484851] border-[#00ADEF] text-[16px] font-normal border rounded-r-lg w-[300px] py-2 ${
                    selectedMode === "non-transferable"
                      ? "bg-[#00ADEF] text-[#FF0000]"
                      : ""
                  }`}
                >
                  Non Transferable
                </button>
              </div>
            </div>

            <div className="space-y-3 text-[#484851] w-full">
              <div className="flex items-center">
                <span className="mr-3 text-[#00ADEF] text-[24px]">*</span>
                <p className="font-semibold text-[18px] text-[#484851]">
                  {" "}
                  Enter Collection Name
                </p>
              </div>

              <input
                type="text"
                value={collectionName}
                onChange={(event) => setCollectionName(event.target.value)}
                placeholder="e.g Cannos Berge"
                className="border rounded-lg py-2 pl-3 bg-transparent outline-none w-[70%]"
              />
            </div>

            <div className="w-full md:w-[70%]">
              <div className=" rounded-lg border-[#00ADEF] border border-dashed bg-[#E7E7F9]">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="cover Banner"
                    className="w-full h-full bg-cover"
                    width={500}
                    height={400}
                  />
                ) : (
                  <div className="mx-28 my-24 border rounded-lg px-2 py-1 border-[#0D0E32] ">
                    <div className="flex items-center gap-2 justify-center">
                      <Image alt="upload" src={UploadIcon} />
                      <button
                        className="md:text-[14px] text-[12px]"
                        onClick={handleUploadButtonClick}
                      >
                        Upload Image
                      </button>
                    </div>
                    <input
                      name="profileImageDoc"
                      type="file"
                      capture="environment"
                      className="hidden"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={(e) => {
                        handleImageChange(e, setSelectedImage);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center text-[13px] mt-2">
                <p>Jpeg, Png, Svg</p>
                <p>(Max 408mb)</p>
              </div>
            </div>
          </section>

          <div className="w-full md:w-[70%] my-8">
            <Button
              name="Create Collection"
              className="w-full"
              onClick={() => {
                setCreateCollection(true);
              }}
            />
          </div>
        </section>
      </section>

      {createCollection && (
        <ProjectCollectionModal setCreateCollection={setCreateCollection} />
      )}
    </>
  );
};

export default page;
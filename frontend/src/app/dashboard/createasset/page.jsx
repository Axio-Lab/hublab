"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components";
import UploadIcon from "../../../assets/uploadIcon.svg";
import ProjectAssetsModal from "@/components/modals/ProjectAssetModal";

const page = () => {
  const [createAsset, setCreateAsset] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");

  const handleInputChange = (event) => {
    setSelectedOption(event.target.value);
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
              Create Collection Asset
            </h2>
            <p className="text-[#484851] font-normal text-[18px] ">
              Build your unique collection in just a few clicks
            </p>
          </div>

          <section className="flex items-start flex-col gap-8 w-full">
            <div className="space-y-3 text-[#484851] w-full">
              <div className="flex items-center">
                <span className="mr-3 text-[#00ADEF] text-[24px]">*</span>
                <p className={`font-semibold text-[18px]`}>
                  Select Collection Assets
                </p>
              </div>

              <div
                className={`border rounded-lg p-2 flex items-center gap-3 w-full md:w-[70%]  ${
                  selectedOption === "NFT" ? "border-[#00ADEF]" : ""
                }`}
              >
                <input
                  type="radio"
                  name="collectionAsset"
                  value="NFT"
                  checked={selectedOption === "NFT"}
                  onChange={handleInputChange}
                />
                <p
                  className={`font-semibold text-[18px] ${
                    selectedOption === "NFT"
                      ? "text-[#00ADEF]"
                      : "text-[#484851]"
                  }`}
                >
                  NFT
                </p>
              </div>
              <div
                className={`border rounded-lg p-2 flex items-center gap-3 w-full md:w-[70%] ${
                  selectedOption === "Token" ? "border-[#00ADEF]" : ""
                }`}
              >
                <input
                  type="radio"
                  name="collectionAsset"
                  value="Token"
                  checked={selectedOption === "Token"}
                  onChange={handleInputChange}
                />{" "}
                <p
                  className={`font-semibold text-[18px] ${
                    selectedOption === "Token"
                      ? "text-[#00ADEF]"
                      : "text-[#484851]"
                  }`}
                >
                  Token
                </p>
              </div>
            </div>

            <div className="space-y-3 text-[#484851] w-full">
              <div className="flex items-center">
                <span className="mr-3 text-[#00ADEF] text-[24px]">*</span>
                <p className="font-semibold text-[18px] text-[#484851]">
                  Enter Collection Name
                </p>
              </div>

              <input
                type="text"
                value={collectionName}
                onChange={(event) => setCollectionName(event.target.value)}
                placeholder="e.g Cannos Berge"
                className="border rounded-lg py-2 pl-3 bg-transparent outline-none w-full md:w-[70%]"
              />
            </div>

            <div className="space-y-3 text-[#484851] w-full">
              <div className="flex items-center">
                <span className="mr-3 text-[#00ADEF] text-[24px]">*</span>
                <p className="font-semibold text-[18px] text-[#484851]">
                  Enter Collection Symbol
                </p>
              </div>

              <input
                type="text"
                value={collectionSymbol}
                onChange={(event) => setCollectionSymbol(event.target.value)}
                placeholder="e.g Cannos Berge"
                className="border rounded-lg py-2 pl-3 bg-transparent outline-none w-full md:w-[70%]"
              />
            </div>

            <div className="space-y-3 text-[#484851] w-full">
              <div className="flex items-center">
                <span className="mr-3 text-[#00ADEF] text-[24px]">*</span>
                <p className="font-semibold text-[18px] text-[#484851]">
                  Description
                </p>
              </div>
              <textarea
                id="message"
                name="message"
                value={collectionDescription}
                onChange={(event) =>
                  setCollectionDescription(event.target.value)
                }
                rows={4}
                cols={40}
                className="border rounded-lg py-2 pl-3 bg-transparent outline-none w-full md:w-[70%]"
                placeholder="e.g Cannos Berge"
              ></textarea>
            </div>

            <div className="space-y-3 text-[#484851] w-full">
              <div className="flex items-center">
                <span className="mr-3 text-[#00ADEF] text-[24px]">*</span>
                <p className="font-semibold text-[18px] text-[#484851]">
                  Upload Image for your NFT
                </p>
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
            </div>

            <div className="space-y-3 text-[#484851] w-full">
              <div className="flex items-center">
                <span className="mr-3 text-[#00ADEF] text-[24px]">*</span>
                <p className="font-semibold text-[18px] text-[#484851]">
                  External URL{" "}
                  <span className="text-[12px] ml-2">
                    (Link Pointing to an external site)
                  </span>
                </p>
              </div>
              <input
                type="text"
                placeholder="e.g https://cannosberge.com"
                className="border rounded-lg py-2 pl-3 bg-transparent outline-none w-full md:w-[70%]"
              />
            </div>

            <div className="space-y-3 text-[#484851] w-full">
              <div className="flex items-center">
                <span className="mr-3 text-[#00ADEF] text-[24px]">*</span>
                <p className="font-semibold text-[18px] text-[#484851]">
                  Animation URL
                  <span className="text-[12px] ml-2">
                    (Link Pointing to NGT's animation)
                  </span>
                </p>
              </div>
              <input
                type="text"
                placeholder="e.g https://cannosberge.com"
                className="border rounded-lg py-2 pl-3 bg-transparent outline-none w-full md:w-[70%]"
              />
            </div>

            <div className="space-y-3 text-[#484851] w-full">
              <div className="flex items-center justify-between w-full md:w-[70%]">
                <div className="flex items-center">
                  <span className="mr-3 text-[#00ADEF] text-[24px]">*</span>
                  <p className="font-semibold text-[18px] text-[#484851]">
                    Enter Address List{" "}
                    <span className="text-[12px] ml-2">(Wallet address)</span>
                  </p>
                </div>

                <span className="text-[16px] font-semibold text-[#00ADEF]">
                  Upload List
                </span>
              </div>
              <input
                type="text"
                placeholder="e.g 7oCGH76k119jjo"
                className="border rounded-lg py-2 pl-3 bg-transparent outline-none w-full md:w-[70%]"
              />
            </div>
          </section>

          <div className="w-full md:w-[70%] my-8">
            <Button
              name="Create"
              className="w-full"
              onClick={() => setCreateAsset(true)}
            />
          </div>
        </section>
      </section>

      {createAsset && <ProjectAssetsModal setCreateAsset={setCreateAsset} />}
    </>
  );
};

export default page;

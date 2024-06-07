"use client";
import { Button } from "@/components";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import UploadIcon from "../../../assets/uploadIcon.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ProjectCollectionModal from "@/components/modals/projectsCollectionModal";
import { useSelector } from "react-redux";
// import { createCollection } from "@/store/slices/productSlice";
import { toast } from "react-toastify";
import axios from "axios";

const page = () => {
  // const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [selectedMode, setSelectedMode] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const initialValues = {
    collectionName: "",
    collectionImage: "",
    // collectionMode: "",
  };

  const handleCollectionNameChange = (event, setFieldValue) => {
    const collectionName = event.target.value;
    setFieldValue("collectionName", collectionName);
  };

  const handleClick = (mode) => {
    setSelectedMode(mode);
    console.log(selectedMode, "selected mode!!!!!!");
  };

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

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  const type = useSelector(
    (state) => state.generalStates?.start?.selectedProduct
  );

  const userId = useSelector((state) => state.generalStates.userId);

  useEffect(() => {
    console.log(userId, "Logged in User");
  }, []);

  // const createNewCollection = async (values) => {
  //   try {
  //     const response = await dispatch(
  //       createCollection({
  //         data: {
  //           name: values.collectionName,
  //           image:
  //             "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcondusiv.com%2Fsequential-io-always-outperforms-random-io-on-hard-disk-drives-or-ssds%2F&psig=AOvVaw0gIZMjG4dtsc3otXxWQgHx&ust=1711935077938000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPi7q6KtnYUDFQAAAAAdAAAAABAE",
  //         },
  //       })
  //     );
  //     console.log(response);
  //     if (response?.payload?.success === true) {
  //       toast.success(response?.payload?.message);
  //       console.log(response.payload);
  //       setOpenModal(true);
  //     } else {
  //       toast.error(response?.payload?.message);
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.error("error:", error);
  //   }
  // };

  const createNewCollection = async (values) => {
    try {
      const url = `https://backend-verxio.vercel.app/api/v1/projects`;
      const requestData = {
        name: values.collectionName,
        image:
          "https://res.cloudinary.com/drzpirtgn/image/upload/v1716291673/WhatsApp_Image_2024-05-21_at_12.40.33_e3034f5c_apdcwl.jpg",
      };

      const response = await axios.post(url, requestData);

      console.log(response.data);

      if (response.data.success === true) {
        toast.success(response.data.message);
        setOpenModal(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <section className="w-full h-full p-2 md:p-10 ">
        <Formik onSubmit={() => {}} initialValues={initialValues}>
          {({ values, setFieldValue }) => (
            <Form className="w-full border rounded-lg p-2 md:p-6 flex flex-col items-start gap-3">
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
                          ? "bg-[#00ADEF] text-[#fff]"
                          : ""
                      } `}
                    >
                      Transferable
                    </button>
                    <button
                      onClick={() => handleClick("non-transferable")}
                      className={`bg-[#fff] text-[#484851] border-[#00ADEF] text-[16px] font-normal border rounded-r-lg w-[300px] py-2 ${
                        selectedMode === "non-transferable"
                          ? "bg-[#00ADEF] text-[#fff]"
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

                  <Field
                    type="text"
                    value={values.collectionName}
                    onChange={(event) =>
                      handleCollectionNameChange(event, setFieldValue)
                    }
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
                  type="button"
                  onClick={() => {
                    // isLoading = { loading };
                    createNewCollection(values);
                    // console.log(values.collectionName, "ajifxgouhgirgfihe");
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </section>

      {openCreateModal && (
        <ProjectCollectionModal setOpenCreateModal={setOpenCreateModal} />
      )}
    </>
  );
};

export default page;

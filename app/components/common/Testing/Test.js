"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Radio,
  RadioGroup,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { InnerImageZoom } from "react-inner-image-zoom";

const product = {
  name: "Basic Tee 6-Pack ",
  price: "$192",
  rating: 3.9,
  reviewCount: 117,
  href: "#",
  imageSrc:
    "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-quick-preview-02-detail.jpg",
  imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: true },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "XXL", inStock: true },
    { name: "XXXL", inStock: false },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ isOpen, data, onClose }) {
  const [open, setOpen] = useState(true);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  // Handle body styles when modal opens/closes
  useEffect(() => {
    if (open) {
      // Remove overflow: hidden and padding-right when modal is open
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    } else {
      // Restore default body styles when modal is closed
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";
    }
  }, [open]);

  const handleCreateAndOpen = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={handleCreateAndOpen}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Create & Open Product Dialog
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={onClose} className="relative z-10">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
          </Transition.Child>

          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                <DialogPanel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      onClick={onClose}
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                      <InnerImageZoom
                        className="w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                        src={data.image_url}
                        zoomSrc={data.image_url}
                        zoomType="hover"
                        zoomPreload={true}
                      />
                      {/* <img
                        alt={data.image_url}
                        src={data.image_url}
                        className="aspect-[2/3] w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                      /> */}
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                          {data.product_title}
                        </h2>

                        <section
                          aria-labelledby="information-heading"
                          className="mt-2"
                        >
                          <h3 id="information-heading" className="sr-only">
                            data information
                          </h3>

                          <span class="text-lg font-bold text-slate-900">
                            MRP ₹ {data.price}
                          </span>

                          {/* Reviews */}
                        </section>

                        <section
                          aria-labelledby="options-heading"
                          className="mt-10"
                        >
                          <h3 id="options-heading" className="sr-only">
                            Product options
                          </h3>

                          <div className="flex items-center mb-3">
                            <span className="text-lg font-medium text-slate-900 mr-2">
                              Color:
                            </span>
                            <div className="flex space-x-2">
                              {data.color?.map((color, idx) => (
                                <div
                                  key={idx}
                                  className="w-6 h-6 rounded-full"
                                  style={{
                                    backgroundColor: color,
                                    cursor: "pointer",
                                    border: "2px solid #fff",
                                  }}
                                ></div>
                              ))}
                            </div>
                          </div>

                          <form>
                            {/* Sizes */}
                            <fieldset
                              aria-label="Choose a size"
                              className="mt-10"
                            >
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-medium text-gray-900">
                                  Size
                                </div>
                              </div>

                              <RadioGroup
                                value={selectedSize}
                                onChange={setSelectedSize}
                                className="mt-4 grid grid-cols-4 gap-4"
                              >
                                {data.size.map((size, index) => (
                                  <Radio
                                    key={size.name}
                                    value={size}
                                    disabled={!size.inStock}
                                    className={classNames(
                                      size
                                        ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                        : "cursor-not-allowed bg-gray-50 text-gray-200",
                                      "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1",
                                    )}
                                  >
                                    <span>{size}</span>
                                  </Radio>
                                ))}
                              </RadioGroup>
                            </fieldset>

                            <button
                              type="submit"
                              className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Close
                            </button>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}

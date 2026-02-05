import React from "react";
import Image from "next/image";
import RichText from "@/components/RichText";
import { Media } from "@/payload-types";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

interface WhatIsMarketProps {
  reverse?: boolean;
  Heading?: string | null;
  Descritpion?: DefaultTypedEditorState | null;
  richText?: DefaultTypedEditorState | null;
  image?: Media | null;
}

export const What_is_market: React.FC<WhatIsMarketProps> = ({
  Heading,
  Descritpion,
  richText,
  image,
  reverse = false,
}) => {
  return (
    <>
      <section className="t-section market-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b-[1px] border-b-black-200 border-b-solid">
        <div className="container">
          <div className="inner md:space-y-[48px] space-y-6">

            {/* ================= HEADING + DESCRIPTION ================= */}
            <div className="top text-left space-y-8">
              {Heading && (
                <div className="title flex justify-start items-start">
                  <h2 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-[0] before:opacity-20 before:z-0 text-black">
                    {Heading}
                  </h2>
                </div>
              )}

              {Descritpion && (
                <div className="text text-body font-inter font-normal text-black-300">
                  <RichText
                    data={Descritpion}
                    enableGutter={false}
                    className="mb-0"
                  />
                </div>
              )}
            </div>

            {/* ================= CONTENT SECTION ================= */}
            <div
              className={`protection-text flex justify-start items-start lg:gap-[64px] gap-8 lg:flex-row flex-col-reverse ${
                reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {richText && (
                <div className="p-text-left font-inter space-y-4 !text-black-300 lg:w-[58%] w-full">
                  <RichText data={richText} enableGutter={false} />
                </div>
              )}

              {image?.url && (
                <div className="p-text-right lg:w-[42%] w-full">
                  <Image
                    src={image.url}
                    width={598}
                    height={294}
                    alt={image.alt || "market image"}
                    role="img"
                    className="w-full h-auto lg:aspect-[2/1] inset-0 aspect-auto object-cover"
                  />
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default What_is_market;

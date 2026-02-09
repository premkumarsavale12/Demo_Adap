import React from "react";
import Image from "next/image";
import RichText from "@/components/RichText";
import { Media } from "@/payload-types";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import {
  SerializedLexicalNode,
} from "lexical";

const extractTextFromLexical = (
  nodes?: SerializedLexicalNode[]
): string => {
  if (!nodes) return "";

  let text = "";

  for (const node of nodes) {
    // Paragraphs, headings, list items
    if ("children" in node && Array.isArray(node.children)) {
      text += extractTextFromLexical(node.children);
    }

    // Text nodes
    if ("text" in node && typeof node.text === "string") {
      text += node.text;
    }
  }

  return text;
};

interface WhatIsMarketProps {
  reverse?: boolean;
  title: string;
  description?: DefaultTypedEditorState;
  protectionDetails?: DefaultTypedEditorState;
  protectionDetailsArray?: {
    content?: DefaultTypedEditorState;
  }[];
  imageSrc: string | Media;
}

export const What_is_market: React.FC<WhatIsMarketProps> = ({ title, description, protectionDetails, protectionDetailsArray, imageSrc, reverse = false }) => {
  
  const imageUrl =
    typeof imageSrc === "string" ? imageSrc : imageSrc?.url;

  return (
    <section className="t-section market-section lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b-[1px] border-b-black-200 border-b-solid">
      <div className="container">
        <div className="inner md:space-y-[48px] space-y-6">

          <div className="top text-left space-y-8">
            <div className="title flex justify-start items-start">
              <h2
                className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-16px] before:left-[0] before:opacity-20 before:z-0 text-black"
              >
                {title}
              </h2>
            </div>

            <div className="text text-body font-inter font-normal text-black-300">
              {extractTextFromLexical(description?.root?.children)}
            </div>
          </div>

          <div
            className={`protection-text flex justify-start items-start lg:gap-[64px] gap-8 lg:flex-row flex-col-reverse ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
          >
            {protectionDetails && (
              <div className="p-text-left font-inter space-y-4 !text-black-300 lg:w-[58%] w-full">
                <RichText
                  className="mb-0"
                  data={protectionDetails}
                  enableGutter={false}
                />
              </div>
            )}

            {protectionDetailsArray && (
              <ul className="[&_li]:pl-8 [&_li]:relative [&_li]:before:content-[''] [&_li]:before:w-[10px] [&_li]:before:h-[10px] [&_li]:before:bg-black-200 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[6px] [&_li]:before:rounded-full space-y-2">
                {protectionDetailsArray.map((item, i) => (
                  <li key={i}>
                    {extractTextFromLexical(item.content?.root?.children)}
                  </li>
                ))}
              </ul>
            )}

            {imageUrl && (
              <div className="p-text-right lg:w-[42%] w-full">
                <Image
                  src={imageUrl}
                  width={598}
                  height={294}
                  alt="market image"
                  className="w-full h-auto lg:aspect-[2/1] inset-0 aspect-auto object-cover"
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

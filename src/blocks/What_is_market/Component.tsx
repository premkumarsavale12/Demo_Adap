import React from "react";
import Image from "next/image";
import { Media } from "@/payload-types";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { SerializedLexicalNode } from "lexical";

const renderLexical = (
  nodes?: SerializedLexicalNode[]
): React.ReactNode => {
  if (!nodes) return null;

  return nodes.map((node: any, index: number) => {

    if (node.type === "text") {
      let textElement: React.ReactNode = node.text;

      if (node.format & 1) {
        textElement = <strong>{textElement}</strong>;
      }

      if (node.format & 2) {
        textElement = <em>{textElement}</em>;
      }

      if (node.format & 8) {
        textElement = <u>{textElement}</u>;
      }

      return <React.Fragment key={index}>{textElement}</React.Fragment>;
    }

    if (node.type === "paragraph") {
      return (
        <p key={index} className="mb-4">
          {renderLexical(node.children)}
        </p>
      );
    }

    if (node.type === "heading") {
      const Tag = `h${node.tag || 2}` as keyof JSX.IntrinsicElements;

      return (
        <Tag key={index} className="font-semibold mb-4">
          {renderLexical(node.children)}
        </Tag>
      );
    }


    if (node.type === "list") {
      const ListTag = node.listType === "number" ? "ol" : "ul";

      return (
        <ListTag key={index} className="pl-6 mb-4 list-disc">
          {renderLexical(node.children)}
        </ListTag>
      );
    }


    if (node.type === "listitem") {
      return (
        <li key={index}>
          {renderLexical(node.children)}
        </li>
      );
    }

    return null;
  });
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

export const What_is_market: React.FC<WhatIsMarketProps> = ({
  title,
  description,
  protectionDetails,
  protectionDetailsArray,
  imageSrc,
  reverse = false,
}) => {
  const imageUrl =
    typeof imageSrc === "string" ? imageSrc : imageSrc?.url;

  return (
    <section className="t-section market-section lg:py-[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b border-black-200">
      <div className="container">
        <div className="inner md:space-y-[48px] space-y-6">

          {/* ============== TITLE + DESCRIPTION ============= */}
          <div className="top text-left space-y-8">
            <div className="title flex justify-start items-start">
              <h2 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] before:left-0 before:opacity-20 before:z-0 text-black">
                {title}
              </h2>
            </div>

            <div className="text text-body font-inter font-normal text-black-300">
              {renderLexical(description?.root?.children)}
            </div>
          </div>

          {/* ========= CONTENT SECTION ========== */}
          <div
            className={`flex items-start lg:gap-[64px] gap-8 lg:flex-row flex-col-reverse ${reverse ? "lg:flex-row-reverse" : ""
              }`}
          >

            {/* LEFT SIDE TEXT */}
            {protectionDetails && (
              <div className="font-inter space-y-4 text-black-300 lg:w-[58%] w-full">
                {renderLexical(protectionDetails?.root?.children)}
              </div>
            )}

            {/* LIST ARRAY */}
            {protectionDetailsArray && (
              <ul className="pl-6 space-y-2 list-disc">
                {protectionDetailsArray.map((item, i) => (
                  <li key={i}>
                    {renderLexical(item.content?.root?.children)}
                  </li>
                ))}
              </ul>
            )}

            {/* IMAGE */}
            {imageUrl && (
              <div className="lg:w-[42%] w-full">
                <Image
                  src={imageUrl}
                  width={598}
                  height={294}
                  alt="market image"
                  className="w-full h-auto lg:aspect-[2/1] object-cover"
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

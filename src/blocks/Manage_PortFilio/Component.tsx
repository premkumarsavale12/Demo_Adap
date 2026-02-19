import React from "react";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

interface ManagePortfolioProps {
    Heading?: string;
    richText?: DefaultTypedEditorState;
    dots_bg?: boolean;
}

export const Measure_Portfilio: React.FC<ManagePortfolioProps> = ({
    Heading,
    richText,
    dots_bg = false,
}) => {
    const renderText = (child: any, index: number) => {
        let textElement = <span key={index}>{child.text}</span>;

        // Bold
        if (child.format & 1) {
            textElement = <strong key={index}>{child.text}</strong>;
        }

        // Italic
        if (child.format & 2) {
            textElement = <em key={index}>{textElement}</em>;
        }

        // Underline
        if (child.format & 8) {
            textElement = <u key={index}>{textElement}</u>;
        }

        return textElement;
    };

    return (
        <section
            className={`t-section market-section ${dots_bg ? "bg-dots_bg" : "bg-white-100"
                } lg:py[150px] md:py-[80px] sm:py-[50px] py-6 w-full border-b-[1px] border-b-black-200 border-b-solid`}
        >
            <div className="container mx-auto">
                <div className="inner md:space-y-[48px] space-y-6">
                    <div className="top text-center space-y-6">

                        {Heading && (
                            <h2 className="text-h2 font-semibold text-black">
                                {Heading}
                            </h2>
                        )}

                        {richText && (
                            <div className="text-body text-black-300 leading-relaxed">
                                {richText.root.children.map((node: any, index: number) => {
                                    if (node.type === "paragraph") {
                                        return (
                                            <p key={index} className="mb-4">
                                                {node.children?.map(renderText)}
                                            </p>
                                        );
                                    }

                                    return null;
                                })}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

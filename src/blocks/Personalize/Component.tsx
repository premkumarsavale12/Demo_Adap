"use client";

import React from "react";
import Link from "next/link";
import RichText from "@/components/RichText";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

interface ButtonField {
    label?: string;
    url?: string;
}

interface PersonalizeItem {
    Heading?: string;
    SubHeading?: string;
    richText?: DefaultTypedEditorState;
    button?: ButtonField;
}

interface PersonalizeProps {
    Items?: PersonalizeItem[];
}

export const Personalize: React.FC<PersonalizeProps> = ({ Items = [] }) => {
    if (!Items.length) return null;

    return (
        <section className="t-section lg:py[150px] md:py-[80px] py-[50px] w-full border-b-[1px] border-b-black-200 border-b-solid">
            <div className="container">
                <div className="inner md:space-y-[48px] space-y-6">
                    <div className="top text-left md:space-y-8 space-y-6">
                        <div className="basket md:space-y-8 space-y-6">
                            <div className="basket-block grid md:grid-cols-2 grid-cols-1 lg:gap-16 md:gap-8 gap-4">
                                
                                {Items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="b-block flex flex-col md:space-y-8 space-y-4 md:p-8 sm:p-6 p-4 bg-white-100"
                                    >
                                        {item.Heading && (
                                            <span className="text-h5 font-[600]">
                                                {item.Heading}
                                            </span>
                                        )}

                                        {item.richText && (
                                            <div className="para space-y-4">
                                                <RichText data={item.richText} />
                                            </div>
                                        )}

                                        {item.SubHeading && (
                                            <p>
                                                <b>{item.SubHeading}</b>
                                            </p>
                                        )}

                                        {item.button?.label && item.button?.url && (
                                            <div className="btn-link">
                                                <Link href={item.button.url} role="link">
                                                    {item.button.label}
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Personalize;

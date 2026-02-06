import RichText from '@/components/RichText'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type Button = {
    title: string
    url: string
}

type AutomateItem = {
    condition_image: {
        url: string
    }
    condition_items: string
}

type Props = {
    box1_title: DefaultTypedEditorState
    box1_description: DefaultTypedEditorState
    box1_personalize_content: DefaultTypedEditorState
    box1_BTN?: Button
    box2_title: DefaultTypedEditorState
    box2_description: DefaultTypedEditorState
    box2_automate_list?: AutomateItem[]
    automate_sub_title: DefaultTypedEditorState
    box2_BTN?: Button
}

export const Personalize = ({
    box1_title,
    box1_description,
    box1_personalize_content,
    box1_BTN,
    box2_title,
    box2_description,
    box2_automate_list,
    automate_sub_title,
    box2_BTN,
}: Props) => {
    return (
          <section className="t-section lg:py[150px] md:py-[80px] py-[50px] w-full border-b-[1px] border-b-black-200 border-b-solid">
            <div className="container">
                <div className="inner md:space-y-[48px] space-y-6">
                        <div className="top text-left md:space-y-8 space-y-6"></div>
                        <div className="basket md:space-y-8 space-y-6">
                      <div className="basket-block grid md:grid-cols-2 grid-cols-1 lg:gap-16 md:gap-8 gap-4">
 
                            {/* BOX 1 */}
                     <div className="b-block flex flex-col md:space-y-8 space-y-4 md:p-8 sm:p-6 p-4 bg-white-100">

                                <div className="text-h5 font-[600]">
                                    <RichText data={box1_title} />
                                </div>

                                <div className="para space-y-4">
                                    <RichText data={box1_description} />
                                </div>

                                <div className="font-bold">
                                    <RichText data={box1_personalize_content} />
                                </div>

                                {box1_BTN?.url && (
                                    <div className="btn-link">
                                        <Link href={box1_BTN.url}>{box1_BTN.title}</Link>
                                    </div>
                                )}

                            </div>

                            {/* BOX 2 */}
                              <div className="b-block flex flex-col md:space-y-8 space-y-4 md:p-8 sm:p-6 p-4 bg-white-100">

                                <div className="text-h5 font-[600]">
                                    <RichText data={box2_title} />
                                </div>

                                <div className="para space-y-4">
                                    <RichText data={box2_description} />
                                </div>

                                <div className="space-y-2">
                                    {box2_automate_list?.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Image
                                                src={item.condition_image.url}
                                                width={24}
                                                height={25}
                                                alt=""
                                            />
                                            {item.condition_items}
                                        </div>
                                    ))}
                                </div>

                                <div className="font-bold">
                                    <RichText data={automate_sub_title} />
                                </div>

                                {box2_BTN?.url && (
                                    <div className="btn-link">
                                        <Link href={box2_BTN.url}>{box2_BTN.title}</Link>
                                    </div>
                                )}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

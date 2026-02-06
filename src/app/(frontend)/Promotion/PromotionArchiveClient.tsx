import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Promotion } from '@/payload-types'

export const PromotionArchiveClient = ({ data }: { data: Promotion | Promotion[] }) => {
  //  console.log("data", data);

  if (!data) {
    return null
  }

  // If data is an array, render the archive list view
  if (Array.isArray(data)) {
    return (
      <>
      </>
    )
  }

  const {
    title: topLevelTitle,
    toolsSection,
    intelligenceReport,
    mediaSection,
    ctaSection,
    layout,
  } = data

  const useAlternateLayout = toolsSection?.useAlternateLayout


  const title = toolsSection?.toolsHeading || topLevelTitle
  const description = toolsSection?.content
  const featured_image = toolsSection?.image

  const promotion_detail_description = intelligenceReport?.intelligences

  const upload_video = mediaSection?.video

  const cta_title = ctaSection?.ctaHeading
  const cta_title_copy = ctaSection?.descrip
  const cta_link = ctaSection?.button

  const show_cta_section = !!cta_title

  return (
    <>
      <section className="tools-section lg:py[150px] py-[80px] w-full bg-dots_bg bg-cover bg-center bg-no-repeat">
        <div className="container">
          <div className="md:space-y-8 space-y-4 max-w-[1024px] mx-auto">

            <div className="inner-content flex flex-col space-y-8">

              {/* HEADING */}
              <div className="heading">
                <h2 className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-24px] before:left-[-12px] before:opacity-20 before:z-0 text-left">
                  {title}
                </h2>
              </div>

              {/* DESCRIPTION + IMAGE */}
              {!useAlternateLayout && (
                /* ===== LAYOUT 1 (Checkbox OFF) ===== */
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="w-full lg:w-[60%]">
                    {description && (
                      <RichText
                        className="content font-inter flex flex-col gap-4 xmd:pt-8 pt-4 text-p text-black-300"
                        data={description}
                        enableGutter={false}
                      />
                    )}
                  </div>

                  {featured_image && (
                    <div className="w-full lg:w-[40%] flex justify-end">
                      <Image
                        src={
                          typeof featured_image === 'object' && featured_image?.url
                            ? featured_image.url
                            : ''
                        }
                        width={420}
                        height={300}
                        alt="Sample report"
                        className="w-full max-w-[420px] h-auto object-contain"
                      />
                    </div>
                  )}
                </div>
              )}

              {useAlternateLayout && (
                /* ===== LAYOUT 2 (Checkbox ON) ===== */
                <div className="flex flex-col gap-8">
                  {description && (
                    <RichText
                      className="content font-inter flex flex-col gap-4 text-p text-black-300"
                      data={description}
                      enableGutter={false}
                    />
                  )}

                  {featured_image && (
                    <div className="w-full">
                      <Image
                        src={
                          typeof featured_image === 'object' && featured_image?.url
                            ? featured_image.url
                            : ''
                        }
                        width={1024}
                        height={600}
                        alt="Promotion Image"
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}


              {/* VIDEO */}
              {upload_video && typeof upload_video === 'object' && upload_video.url && (
                <div className="w-full max-w-[1024px] mx-auto">
                  <video
                    src={upload_video.url}
                    controls
                    width="100%"
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* GRID SECTION */}
              <div className="right font-inter flex flex-col xmd:flex-row xmd:gap-8 gap-4">
                <div className="left-block grid grid-cols-1 sm:grid-cols-2 md:gap-8 gap-4 w-full">

                  {promotion_detail_description &&
                    promotion_detail_description.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-start items-start bg-white border border-solid border-black-200 md:p-6 p-4 gap-3"
                      >
                        <div className="icon w-[18px] h-[28px] flex-shrink-0">
                          <Image
                            src="/media/tick-svggreen.svg"
                            width={18}
                            height={28}
                            alt="tick icon"
                            className="w-[18px] h-[28px] flex-shrink-0"
                          />
                        </div>

                        <div className="content space-y-2">
                          <h3 className="text-body font-bold font-inter heading flex-1">
                            {item.intelligenceHeading}
                          </h3>

                          <RichText
                            data={item.description}
                            enableGutter={false}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* CTA SECTION + LAYOUT BLOCKS */}
              <div className="flex flex-col lg:flex-row gap-12 items-start">
                {show_cta_section && (
                  <div className={`w-full ${layout ? 'lg:w-[45%]' : 'w-full'} sub-box py-8 space-y-8 flex flex-col justify-center ${layout ? 'items-start text-left' : 'items-center text-center'}`}>
                    <h2 className="text-h2 font-ivy font-semibold relative">
                      {cta_title}
                    </h2>

                    {cta_title_copy && (
                      <RichText
                        data={cta_title_copy}
                        enableGutter={false}
                      />
                    )}

                    <div className="btn-green *:text-4">
                      {cta_link?.url && (
                        <Link
                          href={cta_link.url}
                          target={cta_link.target || '_self'}
                          className="inline-block"
                        >
                          {cta_link.label || 'Learn More'}
                        </Link>
                      )}
                    </div>
                  </div>
                )}


              </div>

            </div>
          </div>

        </div>
        {layout && (
          <div className="w-full">
            <RenderBlocks blocks={layout} />
          </div>
        )}
      </section>
    </>
  )
}





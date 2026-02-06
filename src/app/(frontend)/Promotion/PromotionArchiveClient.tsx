'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { Promotion } from '@/payload-types'

export const PromotionArchiveClient = ({ data }: { data: Promotion | Promotion[] }) => {
  console.log("data", data);

  if (!data) {
    return null
  }

  // If data is an array, render the archive list view
  if (Array.isArray(data)) {
    return (
      <section className="tools-section lg:py-[150px] py-[80px] w-full bg-dots_bg bg-cover bg-center bg-no-repeat">
        <div className="container mx-auto px-4">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="text-h1 font-ivy font-semibold mb-12 text-center">Our Promotions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((promotion) => (
                <Link
                  key={promotion.id}
                  href={`/Promotion/${promotion.slug}`}
                  className="group block bg-white border border-solid border-black-200 overflow-hidden hover:border-pink transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {promotion.toolsSection?.image && typeof promotion.toolsSection.image === 'object' && (
                      <Image
                        src={promotion.toolsSection.image.url || ''}
                        alt={promotion.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-h3 font-ivy font-semibold group-hover:text-blue transition-colors">
                      {promotion.toolsSection?.toolsHeading || promotion.title}
                    </h3>
                    {promotion.toolsSection?.content && (
                      <div className="line-clamp-3">
                        <RichText
                          data={promotion.toolsSection.content}
                          enableGutter={false}
                          className="prose-sm"
                        />
                      </div>
                    )}
                    <span className="inline-block text-blue font-semibold group-hover:underline">
                      View Promotion &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            {data.length === 0 && (
              <div className="text-center py-20">
                <p className="text-black-300 text-lg">No promotions found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }



  const {
    title: topLevelTitle,
    toolsSection,
    intelligenceReport,
    mediaSection,
    ctaSection,
  } = data

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
    <section className="tools-section lg:py-[150px] py-[80px] w-full bg-dots_bg bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto px-4">
        <div className="max-w-[1280px] mx-auto">
          {/* Header Section: Title/Text Left, Image Right */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start mb-12 lg:mb-16">
            <div className="flex-1 space-y-8">
              <div className="heading">
                <h2
                  className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-24px] before:left-[-12px] before:opacity-20 before:z-0 text-left"
                >
                  {title}
                </h2>

                {description && (
                  <RichText
                    className="content font-inter flex flex-col gap-4 xmd:pt-8 pt-4 text-p text-black-300"
                    data={description}
                    enableGutter={false}
                  />
                )}
              </div>
            </div>

            {featured_image && (
              <div className="w-full lg:w-1/2 flex-shrink-0">
                <Image
                  src={(typeof featured_image === 'object' && featured_image?.url) ? featured_image.url : ''}
                  width={1488}
                  height={489}
                  alt={title || 'Promotion Image'}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
          </div>

          {/* Grid Section for Promotion Details */}
          {promotion_detail_description && promotion_detail_description.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {promotion_detail_description.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-start items-start bg-white border border-solid border-black-200 md:p-6 p-4 gap-3 h-full"
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
                  <div className="content space-y-2 flex-1">
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
          )}

          {/* Video Section (Full Width Below Grid) */}
          {upload_video && typeof upload_video === 'object' && upload_video.url && (
            <div className="w-full max-w-[1024px] mx-auto mb-16">
              <video
                src={upload_video.url}
                controls
                width="100%"
                className="w-full h-auto"
              ></video>
            </div>
          )}

          {/* CTA Section */}
          {show_cta_section && (
            <div className="sub-box py-8 space-y-8 flex flex-col justify-center items-center text-center">
              <h2
                className="text-h2 font-ivy font-semibold relative"
              >
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
                  <Link href={cta_link.url} role="link" className="inline-block" target={cta_link.target || '_self'}>
                    {cta_link.label || 'Learn More'}
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}





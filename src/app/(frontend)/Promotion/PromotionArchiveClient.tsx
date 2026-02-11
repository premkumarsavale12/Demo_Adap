"use client"
'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Promotion, Media } from '@/payload-types'

import type {
  SerializedLexicalNode,
  SerializedTextNode,
} from 'lexical'
import RichText from '@/components/RichText'

export const PromotionArchiveClient = ({
  data,
  renderBlocks,
}: {
  data: Promotion | Promotion[]
  renderBlocks?: React.ReactNode
}) => {
  const isChecked =
    data && !Array.isArray(data)
      ? data.toolsSection?.useAlternateLayout
      : false

  if (!data) return null
  if (Array.isArray(data)) return <></>

  const {
    title: topLevelTitle,
    toolsSection,
    intelligenceReport,
    mediaSection,
    ctaSection,
  } = data

  /* ------ Lexical → HTML ------- */
  const extractHTML = (
    nodes?: SerializedLexicalNode[]
  ): string => {
    if (!Array.isArray(nodes)) return ''

    return nodes
      .map((node) => {
        if (!('children' in node)) return ''

        const text =
          node.children
            ?.map((child) =>
              child.type === 'text'
                ? (child as SerializedTextNode).text
                : ''
            )
            .join('') || ''

        return text ? `<p>${text}</p>` : ''
      })
      .join('')
  }

  const title = toolsSection?.toolsHeading || topLevelTitle

  const descriptionHTML = extractHTML(
    toolsSection?.content?.root?.children as
    | SerializedLexicalNode[]
    | undefined
  )

  const featuredImage = toolsSection?.image as Media | null
  const promotionDetails = intelligenceReport?.intelligences
  const video = mediaSection?.video as Media | null

  const ctaTitle = ctaSection?.ctaHeading
  const cta_title_copy = ctaSection?.descrip
  const ctaLink = ctaSection?.button
  const showCTA = Boolean(ctaTitle)

  return (
    <section className="tools-section lg:py[150px] py-[80px] w-full bg-dots_bg bg-cover bg-center bg-no-repeat">
      <div className="container">
        <div className="md:space-y-8 space-y-4 max-w-[1024px] mx-auto">

          {/* Logo */}
          <div className="top w-full flex justify-center items-center xmd:mb-16 mb-10">
            <div className="logo">
              <Link href="/" role="link">
                <Image
                  src="/media/Frame.webp"
                  width={310}
                  height={85}
                  alt="Adaptive logo"
                  className="w-[150px] md:w-[200px] lg:w-[310px] h-auto"
                />
              </Link>
            </div>
          </div>

          {/* == Alternate Layout === */}
          {isChecked ? (
            <div className="inner-content flex flex-col space-y-8">

              <div className="heading">
                <h2
                  className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-24px] before:left-[-12px] before:opacity-20 before:z-0 text-left"
                  dangerouslySetInnerHTML={{ __html: title ?? '' }}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start justify-between">

                {/* LEFT CONTENT */}
                {descriptionHTML && (
                  <div
                    className="content font-inter flex flex-col gap-4 xmd:pt-8 pt-4 text-p text-black-300 md:w-1/2 w-full"
                    dangerouslySetInnerHTML={{ __html: descriptionHTML }}
                  />
                )}

                {/* RIGHT IMAGE */}
                <div className="inner flex lg:gap-16 gap-8 flex-col md:w-1/2">
                  {featuredImage?.url && (
                    <div className="left w-full flex-shrink-0">
                      <Image
                        src={featuredImage.url}
                        width={1488}
                        height={489}
                        alt={featuredImage.alt || 'promotion image'}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </div>

              </div>
            </div>
          ) : (
            /* ===== Normal Layout ===== */
            <div className="inner-content flex flex-col space-y-8">

              <div className="heading">
                <h2
                  className="text-h2 font-ivy font-semibold relative before:content-[''] before:w-[67px] before:h-[67px] before:rounded-full before:bg-pink before:absolute before:top-[-12px] xsm:before:left-[-24px] before:left-[-12px] before:opacity-20 before:z-0 text-left"
                  dangerouslySetInnerHTML={{ __html: title ?? '' }}
                />

                {descriptionHTML && (
                  <div
                    className="content font-inter flex flex-col gap-4 xmd:pt-8 pt-4 text-p text-black-300"
                    dangerouslySetInnerHTML={{ __html: descriptionHTML }}
                  />
                )}
              </div>

              {featuredImage?.url && (
                <div className="left w-full flex-shrink-0">
                  <Image
                    src={featuredImage.url}
                    width={1488}
                    height={489}
                    alt={featuredImage.alt || 'promotion image'}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {video?.url && (
                <div className="left w-full max-w-[1024px] mx-auto">
                  <video src={video.url} controls width="100%" />
                </div>
              )}

              <div className="right font-inter flex flex-col xmd:flex-row xmd:gap-8 gap-4">
                <div className="left-block grid grid-cols-1 sm:grid-cols-2 md:gap-8 gap-4 w-full">
                  {promotionDetails?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-start items-start bg-white border border-solid border-black-200 md:p-6 p-4 gap-3"
                    >
                      <div className="icon w-[18px] h-[28px] flex-shrink-0">
                        <Image
                          src="/media/tick-svggreen.svg"
                          width={18}
                          height={28}
                          alt="tick"
                        />
                      </div>
                      <div className="content space-y-2">
                        <h3 className="text-body font-bold font-inter heading flex-1">
                          {item.intelligenceHeading}
                        </h3>

                        {item.description && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: extractHTML(
                                item.description.root?.children as SerializedLexicalNode[]
                              ),
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ===== CTA ===== */}
          {showCTA && (
            <div className="sub-box py-8 space-y-8 flex flex-col justify-center items-center">
              <h2
                className="text-h2 font-ivy font-semibold relative text-center"
                dangerouslySetInnerHTML={{ __html: ctaTitle ?? '' }}
              />

              {cta_title_copy && (
                <RichText
                  data={cta_title_copy}
                  enableGutter={false}
                />
              )}

              {ctaLink?.url && (
                <div className="btn-green *:text-4">
                  <Link
                    href={ctaLink.url}
                    target={ctaLink.target ?? '_self'}
                  >
                    {ctaLink.label}
                  </Link>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {renderBlocks && <div className="w-full">{renderBlocks}</div>}
    </section>
  )
}

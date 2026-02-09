import type { CollectionConfig } from 'payload'

import {
    BlocksFeature,
    FixedToolbarFeature,
    HeadingFeature,
    HorizontalRuleFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { For_Feature } from '../../blocks/For_Feature/config'
import { HorizontalContent as AdvisorsWealthManagers } from '../../blocks/Advisors-Wealth-Managers/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

import { populateAuthors } from './hook/populateAuthors'
import { revalidatePost, revalidateDelete } from './hook/revalidatePost'


import { slugField } from 'payload'

export const Promotion: CollectionConfig<'promotion'> = {
    slug: 'promotion',
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
    },
    defaultPopulate: {
        title: true,
        slug: true,
    },
    admin: {
        defaultColumns: ['title', 'slug', 'updatedAt'],
        livePreview: {
            url: ({ data, req }) =>
                generatePreviewPath({
                    slug: data?.slug,
                    collection: 'promotion',
                    req,
                }),
        },
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: data?.slug as string,
                collection: 'promotion',
                req,
            }),
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            type: 'tabs',
            tabs: [
                {
                    name: 'toolsSection',
                    label: 'Tools Section',
                    fields: [
                        {
                            name: 'toolsHeading',
                            type: 'text',
                            label: 'Heading',
                        },
                        {
                            name: 'useAlternateLayout',
                            type: 'checkbox',
                            label: 'Show Alternate Layout',
                            defaultValue: false,
                        },
                        {
                            name: 'content',
                            type: 'richText',
                            label: 'Add Content',
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => [
                                    ...rootFeatures,
                                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                                    FixedToolbarFeature(),
                                    InlineToolbarFeature(),
                                    HorizontalRuleFeature(),
                                ],
                            }),
                        },
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Upload Image',
                        },
                    ],
                },


                {
                    name: 'intelligenceReport',
                    label: 'Intelligence Report',
                    fields: [
                        {
                            name: 'intelligences',
                            type: 'array',
                            fields: [
                                {
                                    name: 'intelligenceHeading',
                                    type: 'text',
                                    label: 'Heading',
                                },
                                {
                                    name: 'description',
                                    type: 'richText',
                                    label: 'Add Description',

                                    editor: lexicalEditor({
                                        features: ({ rootFeatures }) => [
                                            ...rootFeatures,
                                            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                                            BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                                            FixedToolbarFeature(),
                                            InlineToolbarFeature(),
                                            HorizontalRuleFeature(),
                                        ],
                                    }),
                                },
                            ],
                        },
                    ],
                },

                {
                    name: 'mediaSection',
                    label: 'Video & Image',
                    fields: [
                        {
                            name: 'video',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Upload Video',
                        },
                    ],
                },

                {
                    name: 'ctaSection',
                    label: 'Promotion CTA',
                    fields: [
                        {
                            name: 'ctaHeading',
                            type: 'text',
                            label: 'Heading',
                        },
                        {
                            name: 'descrip',
                            type: 'richText',

                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => [
                                    ...rootFeatures,
                                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                                    FixedToolbarFeature(),
                                    InlineToolbarFeature(),
                                    HorizontalRuleFeature(),
                                ],
                            }),
                        },
                        {
                            name: 'button',
                            type: 'group',
                            label: 'Button',
                            fields: [
                                {
                                    name: 'label',
                                    type: 'text',
                                    label: 'Button Name',
                                },
                                {
                                    name: 'url',
                                    type: 'text',
                                    label: 'Url',
                                },
                                {
                                    name: 'target',
                                    type: 'select',
                                    label: 'Target',
                                    options: [
                                        { label: 'Same Tab', value: '_self' },
                                        { label: 'New Tab', value: '_blank' },
                                    ],
                                    defaultValue: '_self',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'layout',
            type: 'blocks',
            blocks: [For_Feature, AdvisorsWealthManagers],
        },

        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                date: { pickerAppearance: 'dayAndTime' },
                position: 'sidebar',
            },
            hooks: {
                beforeChange: [
                    ({ siblingData, value }) => {
                        if (siblingData._status === 'published' && !value) {
                            return new Date()
                        }
                        return value
                    },
                ],
            },
        },
        {
            name: 'authors',
            type: 'relationship',
            admin: { position: 'sidebar' },
            hasMany: true,
            relationTo: 'users',
        },
        {
            name: 'populatedAuthors',
            type: 'array',
            access: { update: () => false },
            admin: { disabled: true, readOnly: true },
            fields: [
                { name: 'id', type: 'text' },
                { name: 'name', type: 'text' },
            ],
        },
        slugField(),
    ],
    hooks: {
        afterChange: [revalidatePost],
        afterRead: [populateAuthors],
        afterDelete: [revalidateDelete],
    },
    versions: {
        drafts: {
            autosave: { interval: 100 },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}
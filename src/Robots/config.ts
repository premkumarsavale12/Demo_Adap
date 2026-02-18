import type { GlobalConfig } from 'payload'
import { revalidateRobots } from './hooks/revalidateRobots'

export const Robots: GlobalConfig = {
    slug: 'robots',
    label: 'Robots.txt',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'rules',
            type: 'array',
            label: 'Rules',
            fields: [
                {
                    name: 'userAgent',
                    type: 'text',
                    label: 'User Agent',
                    defaultValue: '*',
                    required: true,
                },
                {
                    name: 'allow',
                    type: 'array',
                    label: 'Allow',
                    fields: [
                        {
                            name: 'path',
                            type: 'text',
                            label: 'Path',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'disallow',
                    type: 'array',
                    label: 'Disallow',
                    fields: [
                        {
                            name: 'path',
                            type: 'text',
                            label: 'Path',
                            required: true,
                        },
                    ],
                },
            ],
        },
        {
            name: 'sitemaps',
            type: 'array',
            label: 'Sitemaps',
            fields: [
                {
                    name: 'url',
                    type: 'text',
                    label: 'Sitemap URL',
                    required: true,
                },
            ],
        },
    ],
    hooks: {
        afterChange: [revalidateRobots],
    },
}

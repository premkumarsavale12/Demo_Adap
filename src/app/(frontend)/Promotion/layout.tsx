import React from 'react'
import { HideHeaderFooter } from '@/components/HideHeaderFooter'

export default function PromotionLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        .header, .footer { display: none !important; }
      ` }} />
            <HideHeaderFooter />
            {children}
        </>
    )
}

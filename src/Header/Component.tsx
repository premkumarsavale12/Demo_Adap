import type { Header as HeaderType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderClient } from './Component.client'

export async function Header() {
  const headerData = (await getCachedGlobal('header', 1)()) as HeaderType

  return <HeaderClient data={headerData} />
}

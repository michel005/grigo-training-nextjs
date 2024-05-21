'use client'

import { LocalizationContext } from '@/store/localization.context'
import { useContext } from 'react'

const useText = (pageName: string) => {
    const { getText } = useContext(LocalizationContext)

    return getText(pageName)
}

export default useText

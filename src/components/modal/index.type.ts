import React from 'react'
import { BackgroundType } from '@/components/background/index.type'

export interface ModalType {
    children: React.ReactNode
    className?: string
    classNameBackground?: string
    backgroundVariant?: BackgroundType[`variant`]
    header?: React.ReactNode
    onClose?: () => void
    size?: 'small' | 'medium' | 'big'
    zIndex?: number
}

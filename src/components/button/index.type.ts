import { GoogleIconType } from '@/types/googleIcon.type'
import React, { ReactNode } from 'react'

export interface ButtonType
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    forceLoading?: boolean
    icon?: GoogleIconType
    bag?: ReactNode
    onAsyncClick?: () => Promise<void>
    variant?: 'primary' | 'secondary' | 'ghost'
}

import { GoogleIconType } from '@/types/googleIcon.type'
import React from 'react'

export interface ButtonType
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    forceLoading?: boolean
    leftIcon?: GoogleIconType
    rightIcon?: GoogleIconType
    onAsyncClick?: () => Promise<void>
    variant?: 'primary' | 'ghost'
}

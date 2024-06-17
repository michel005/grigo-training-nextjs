import React, { ReactNode } from 'react'
import { GoogleIconType } from '@/types/googleIcon.type'

export interface PageHeaderType
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    icon?: GoogleIconType
    header: ReactNode
}

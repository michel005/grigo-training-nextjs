import React, { JSX, ReactNode } from 'react'
import { PageHeaderType } from '@/components/pageHeader/index.type'

export interface PrivatePageType
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    header?: PageHeaderType
}

import React, { ReactNode } from 'react'

export interface PageHeaderType
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    pictures?: string[]
    header: ReactNode
    description?: ReactNode
}

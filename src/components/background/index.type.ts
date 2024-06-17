import React from 'react'

export interface BackgroundType
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    variant?: 'gradient' | 'blur' | 'transparent'
}

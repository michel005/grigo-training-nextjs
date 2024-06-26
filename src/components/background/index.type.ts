import React from 'react'

export interface BackgroundType
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    zIndex?: number
    variant?: 'gradient' | 'blur' | 'transparent'
}

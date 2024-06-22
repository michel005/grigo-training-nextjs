import React from 'react'

export interface AlertType
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    variant?: 'error' | 'info' | 'success'
}

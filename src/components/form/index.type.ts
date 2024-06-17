import React from 'react'
import { ErrorType } from '@/types/error.type'

export interface FormType
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    formName?: string
    errors?: ErrorType | null
}

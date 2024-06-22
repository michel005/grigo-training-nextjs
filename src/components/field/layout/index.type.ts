import React from 'react'

export interface FieldLayoutType {
    label?: React.ReactNode
    leftSide?: React.ReactNode
    input?: (
        setFocus: any,
        focus: boolean,
        disabled: boolean
    ) => React.ReactNode
    rightSide?: React.ReactNode
    info?: React.ReactNode
    error?: React.ReactNode
    haveValue?: boolean
    disabled?: boolean
    className?: string
}

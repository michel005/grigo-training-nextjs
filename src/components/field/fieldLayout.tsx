'use client'

import { useState } from 'react'
import Skeleton from '../skeleton'

interface FieldLayoutType {
    label?: string
    className?: string
    focus?: boolean
    input?: (
        focus: boolean,
        setFocus: (value: boolean) => void
    ) => React.ReactNode
    leftSpace?: React.ReactNode
    rightSpace?: React.ReactNode
    info?: React.ReactNode
    error?: React.ReactNode
    disabled?: boolean
    loading?: boolean
    hasValue?: boolean
}

const FieldLayout = ({
    label,
    className,
    focus,
    input,
    leftSpace,
    rightSpace,
    info,
    error,
    disabled,
    loading,
    hasValue,
}: FieldLayoutType) => {
    const [_focus, setFocus] = useState(false)

    const innerFocus = focus === undefined ? _focus : focus
    const mainClassName = `componentFieldLayout ${className} ${innerFocus && 'focus'} ${!!error && 'hasError'} ${disabled && 'disabled'} ${(innerFocus || hasValue) && 'hasValue'}`

    if (loading) {
        return (
            <div className={`componentFieldLayout disabled hasValue`}>
                <div className="componentFieldLayout__InputContainer">
                    {!!label && <label>{label}</label>}
                    <div className="componentFieldLayout__InputContainer__left" />
                    {!!input && (
                        <div className="componentFieldLayout__InputContainer__input">
                            <Skeleton
                                style={{ alignSelf: 'center', flexGrow: 1 }}
                                width={100}
                                height={40}
                            />
                        </div>
                    )}
                    <div className="componentFieldLayout__InputContainer__right" />
                </div>
            </div>
        )
    }

    return (
        <div className={mainClassName}>
            <div className="componentFieldLayout__InputContainer">
                {!!label && <label>{label}</label>}
                <div className="componentFieldLayout__InputContainer__left">
                    {leftSpace}
                </div>
                {!!input && (
                    <div className="componentFieldLayout__InputContainer__input">
                        {input(innerFocus, setFocus)}
                    </div>
                )}
                <div className="componentFieldLayout__InputContainer__right">
                    {rightSpace}
                </div>
            </div>
            {!!info && (
                <span className="componentFieldLayout__InputContainer__info">
                    {info}
                </span>
            )}
            {!!error && (
                <span className="componentFieldLayout__InputContainer__error">
                    {error}
                </span>
            )}
        </div>
    )
}

export default FieldLayout

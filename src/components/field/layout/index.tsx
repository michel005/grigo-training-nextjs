import { FieldLayoutType } from '@/components/field/layout/index.type'
import style from './index.module.scss'
import { useState } from 'react'
import { clsx } from 'clsx'

export const FieldLayout = ({
    label,
    input,
    leftSide,
    rightSide,
    info,
    error,
    haveValue = false,
}: FieldLayoutType) => {
    const [focus, setFocus] = useState<boolean>(false)
    return (
        <div
            className={clsx(
                style.fieldLayout,
                focus && style.focus,
                haveValue && style.haveValue
            )}
        >
            <div className={clsx(style.content)}>
                {leftSide && (
                    <div className={clsx(style.side, style.leftSide)}>
                        {leftSide}
                    </div>
                )}
                {input && (
                    <div className={style.input}>
                        {label && <label>{label}</label>}
                        {input?.(setFocus, focus)}
                    </div>
                )}
                {rightSide && (
                    <div className={clsx(style.side, style.rightSide)}>
                        {rightSide}
                    </div>
                )}
            </div>
            {info && <small>{info}</small>}
            {error && <small>{error}</small>}
        </div>
    )
}

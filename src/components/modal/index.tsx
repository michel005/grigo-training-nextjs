'use client'

import { ModalType } from '@/components/modal/index.type'
import Background from '@/components/background'
import style from './index.module.scss'
import { clsx } from 'clsx'
import Button from '@/components/button'

export const Modal = ({
    children,
    backgroundVariant = 'blur',
    className,
    classNameBackground,
    header,
    onClose,
    size = 'medium',
}: ModalType) => {
    return (
        <Background variant={backgroundVariant} className={classNameBackground}>
            <div className={clsx(style.modal, style[size], className)}>
                {header && (
                    <div className={style.header}>
                        {header && <h1>{header}</h1>}

                        {onClose && (
                            <Button
                                leftIcon="close"
                                onClick={() => onClose()}
                            />
                        )}
                    </div>
                )}
                {children}
            </div>
        </Background>
    )
}

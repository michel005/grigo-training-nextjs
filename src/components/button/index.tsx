import { ButtonType } from '@/components/button/index.type'
import style from './index.module.scss'
import { clsx } from 'clsx'
import Icon from '@/components/icon'
import { useState } from 'react'

const Button = ({
    className,
    children,
    leftIcon,
    rightIcon,
    disabled,
    onClick,
    onAsyncClick,
    ...props
}: ButtonType) => {
    const [loading, setLoading] = useState<boolean>(false)
    return (
        <button
            {...props}
            disabled={loading || disabled}
            className={clsx(
                className,
                style.button,
                (disabled || loading) && style.disabled,
                loading && style.loadingState
            )}
            onClick={
                !!onClick
                    ? onClick
                    : !!onAsyncClick
                      ? () => {
                            setLoading(true)
                            onAsyncClick?.().finally(() => {
                                setLoading(false)
                            })
                        }
                      : undefined
            }
        >
            {leftIcon && <Icon icon={leftIcon} />}
            {children && <div className={style.insideButton}>{children}</div>}
            {rightIcon && <Icon icon={rightIcon} />}
            {loading && (
                <div className={style.loading}>
                    <Icon icon="sync" />
                </div>
            )}
        </button>
    )
}

export default Button

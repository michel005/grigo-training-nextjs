import { ButtonType } from '@/components/button/index.type'
import style from './index.module.scss'
import { clsx } from 'clsx'
import Icon from '@/components/icon'
import { useState } from 'react'
import { useForm } from '@/hook/form'
import { GeneralType } from '@/types/general.type'

const Button = ({
    className,
    children,
    icon,
    bag,
    disabled,
    onClick,
    onAsyncClick,
    forceLoading,
    variant = 'primary',
    ...props
}: ButtonType) => {
    const generalForm = useForm<GeneralType>('general')
    const [loading, setLoading] = useState<boolean>(false)

    const disableState = loading || forceLoading || disabled

    return (
        <button
            {...props}
            title={children?.toString()}
            disabled={disableState}
            className={clsx(
                className,
                style.button,
                style[variant],
                disableState && style.disabled,
                (loading || forceLoading) && style.loadingState
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
            {icon && <Icon icon={icon} />}
            {children && <div className={style.insideButton}>{children}</div>}
            {bag && <span className={style.bag}>{bag}</span>}
            {(loading || forceLoading) && (
                <div className={style.loading}>
                    <Icon icon="sync" />
                </div>
            )}
        </button>
    )
}

export default Button

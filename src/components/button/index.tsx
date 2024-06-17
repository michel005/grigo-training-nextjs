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
    leftIcon,
    rightIcon,
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
            disabled={disableState}
            className={clsx(
                className,
                style.button,
                style[variant],
                disableState && style.disabled,
                (loading || forceLoading) && style.loadingState
            )}
            onClick={
                generalForm.form.apiStatus !== 'Online'
                    ? () => {
                          if (generalForm.form.apiStatus == 'Offline') {
                              alert('Nosso site esta offline no momento')
                          }
                          if (generalForm.form.apiStatus == 'Maintenance') {
                              alert(
                                  'Estamos realizando uma manutenção. Aguarde um momento e tente novamente.'
                              )
                          }
                      }
                    : !!onClick
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
            {(loading || forceLoading) && (
                <div className={style.loading}>
                    <Icon icon="sync" />
                </div>
            )}
        </button>
    )
}

export default Button

import { useState } from 'react'
import { Icon } from '@/components/icon'

interface ButtonType
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    leftSpace?: React.ReactNode
    rightSpace?: React.ReactNode
    onClickAsync?: () => Promise<any>
    variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'icon'
}

const Button = ({
    leftSpace,
    rightSpace,
    className,
    variant = 'primary',
    onClick,
    onClickAsync,
    disabled,
    ...props
}: ButtonType) => {
    const [loading, setLoading] = useState<boolean>()

    return (
        <button
            {...props}
            className={`componentButton ${variant} ${className}`}
            onClick={(e) => {
                if (onClickAsync) {
                    setLoading(true)
                    onClickAsync().finally(() => {
                        setLoading(false)
                    })
                } else {
                    onClick?.(e)
                }
            }}
            disabled={loading || disabled}
        >
            {leftSpace && (
                <div className="componentButton__leftSpace">{leftSpace}</div>
            )}
            <span>{props.children}</span>
            {rightSpace && (
                <div className="componentButton__rightSpace">{rightSpace}</div>
            )}
            {loading && (
                <div className="componentButton__loading">
                    <Icon>sync</Icon>
                </div>
            )}
        </button>
    )
}

export default Button

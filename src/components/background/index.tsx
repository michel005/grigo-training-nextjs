import { BackgroundType } from '@/components/background/index.type'
import style from './index.module.scss'
import { clsx } from 'clsx'
import { CSSProperties } from 'react'

const Background = ({
    className,
    variant = 'gradient',
    zIndex = 10,
    ...props
}: BackgroundType) => {
    return (
        <div
            {...props}
            className={clsx(style.background, style[variant], className)}
            style={
                {
                    '--z-index': zIndex,
                    ...props?.style,
                } as CSSProperties
            }
        />
    )
}

export default Background

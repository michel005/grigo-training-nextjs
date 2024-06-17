import { BackgroundType } from '@/components/background/index.type'
import style from './index.module.scss'
import { clsx } from 'clsx'

const Background = ({
    className,
    variant = 'gradient',
    ...props
}: BackgroundType) => {
    return (
        <div
            {...props}
            className={clsx(style.background, style[variant], className)}
        />
    )
}

export default Background

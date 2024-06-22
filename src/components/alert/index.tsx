import style from './index.module.scss'
import { clsx } from 'clsx'
import { AlertType } from '@/components/alert/index.type'

const Alert = ({ className, variant = 'info', ...props }: AlertType) => {
    return (
        <div
            {...props}
            className={clsx(style.alert, style[variant], className)}
        />
    )
}

export default Alert

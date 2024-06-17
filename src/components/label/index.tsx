import style from './index.module.scss'
import { clsx } from 'clsx'
import { LabelType } from '@/components/label/index.type'

const Label = ({ className, ...props }: LabelType) => {
    return <span {...props} className={clsx(style.label, className)} />
}

export default Label

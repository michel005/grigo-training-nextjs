import { ButtonGroupType } from '@/components/buttonGroup/index.type'
import style from './index.module.scss'
import { clsx } from 'clsx'

const ButtonGroup = ({ className, ...props }: ButtonGroupType) => {
    return <div {...props} className={clsx(className, style.buttonGroup)} />
}

export default ButtonGroup

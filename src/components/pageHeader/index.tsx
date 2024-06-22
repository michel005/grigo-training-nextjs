import style from './index.module.scss'
import { clsx } from 'clsx'
import { PageHeaderType } from '@/components/pageHeader/index.type'
import Icon from '@/components/icon'

const PageHeader = ({
    className,
    icon,
    header,
    children,
    ...props
}: PageHeaderType) => {
    return (
        <header {...props} className={clsx(style.pageHeader, className)}>
            <h1>
                {icon && <Icon icon={icon} />}
                {header}
            </h1>
            <div className={style.commands}>{children}</div>
        </header>
    )
}

export default PageHeader

import style from './index.module.scss'
import { clsx } from 'clsx'
import { PrivatePageType } from '@/components/page/index.type'
import PageHeader from '@/components/pageHeader'

const Page = ({ className, header, children, ...props }: PrivatePageType) => {
    return (
        <div {...props} className={clsx(style.page, className)}>
            {header && <PageHeader {...header} />}
            <div className={style.content}>{children}</div>
        </div>
    )
}

export default Page

import style from './index.module.scss'
import { clsx } from 'clsx'
import { PageHeaderType } from '@/components/pageHeader/index.type'
import { CSSProperties } from 'react'

const PageHeader = ({
    className,
    header,
    pictures,
    description,
    children,
    ...props
}: PageHeaderType) => {
    return (
        <header
            {...props}
            className={clsx(style.pageHeader, className)}
            style={
                {
                    '--size': pictures?.length || 0,
                } as CSSProperties
            }
        >
            <div className={style.pictures}>
                {pictures?.map((picture) => {
                    return <img key={picture} src={picture} />
                })}
            </div>
            <div className={style.commands}>{children}</div>
            <h1>{header}</h1>
            {description && (
                <div className={style.description}>{description}</div>
            )}
        </header>
    )
}

export default PageHeader

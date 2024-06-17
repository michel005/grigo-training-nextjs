import style from './index.module.scss'
import Icon from '@/components/icon'
import React from 'react'

const Loading = () => {
    return (
        <div className={style.loading}>
            <Icon icon="sync" />
        </div>
    )
}

export default Loading

'use client'

import style from './page.module.scss'
import PageHeader from '@/components/pageHeader'

const ExecutionPage = () => {
    return (
        <div className={style.private}>
            <PageHeader header="Execuções" icon="play_arrow" />
        </div>
    )
}

export default ExecutionPage

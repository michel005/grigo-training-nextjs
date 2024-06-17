import style from './page.module.scss'
import PageHeader from '@/components/pageHeader'

const PrivatePage = () => {
    return (
        <div className={style.private}>
            <PageHeader icon="dashboard" header="Dashboard" />
        </div>
    )
}

export default PrivatePage

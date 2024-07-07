import style from './page.module.scss'
import { Fragment } from 'react'
import { TrainingType } from '@/types/training.type'
import { TrainingCard } from '@/app/private/training/training.card'

export const TrainingCardCollection = ({
    header,
    list,
    hideEmpty = true,
    cardRender = (training) => <TrainingCard training={training} />,
}: {
    header: string
    hideEmpty?: boolean
    list: TrainingType[]
    cardRender?: (training: TrainingType) => any
}) => {
    if (list.length === 0) {
        if (hideEmpty) {
            return <></>
        } else {
            return (
                <div className={style.contentInside}>
                    <h1>{header}</h1>
                    <div className={style.statusSection}>
                        <h3 className={style.noTrainingFound}>
                            Nenhum Treino Disponível
                        </h3>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={style.contentInside}>
            <h1>{header}</h1>
            <div className={style.statusSection}>
                {list.map((training, index) => {
                    return (
                        <Fragment key={training.id}>
                            {cardRender(training)}
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}

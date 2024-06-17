'use client'

import style from './page.module.scss'
import { useContext } from 'react'
import { useAPI } from '@/hook/api'
import { TrainingType } from '@/types/training.type'
import Button from '@/components/button'
import PageHeader from '@/components/pageHeader'
import { PaginationType } from '@/types/pagination.type'
import { ModalContext } from '@/context/modal/modal.context'
import { DateUtils } from '@/utils/date.utils'
import { Business } from '@/business'
import { TrainingCard } from '@/app/private/training/training.card'
import { TrainingStatusDefinition } from '@/constants/training.status.definition'

const TrainingPage = () => {
    const { open } = useContext(ModalContext)

    const trainingApi = useAPI<TrainingType[]>({
        api: async () => {
            return await Business.training.findAll()
        },
    })

    return (
        <div className={style.private}>
            <PageHeader icon="list" header="Treinos">
                <Button
                    leftIcon="add"
                    onClick={() =>
                        open(
                            'training',
                            'form',
                            {
                                name: 'Novo Treino',
                                start_date: DateUtils.dateToString(new Date()),
                            },
                            () => {
                                trainingApi.reset()
                            }
                        )
                    }
                >
                    Novo Treino
                </Button>
                <Button
                    leftIcon="sync"
                    forceLoading={trainingApi.status === 'RUNNING'}
                    onClick={() => trainingApi.reset()}
                />
            </PageHeader>
            <section className={style.content}>
                {Object.keys(TrainingStatusDefinition).map((status) => {
                    const allTrainings = trainingApi.response?.filter(
                        (x) => x.status === status
                    )
                    return (
                        <div key={status} className={style.contentInside}>
                            <h1>{TrainingStatusDefinition[status]}</h1>
                            <div key={status} className={style.statusSection}>
                                {(allTrainings || []).map((training) => {
                                    return (
                                        <TrainingCard
                                            key={training.id}
                                            training={training}
                                            updateApi={trainingApi.reset}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}

export default TrainingPage

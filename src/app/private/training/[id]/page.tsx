'use client'

import style from './page.module.scss'
import { useAPI } from '@/hook/api'
import { API } from '@/settings/axios.settings'
import { SessionUtils } from '@/utils/session.utils'
import { TrainingType } from '@/types/training.type'
import PageHeader from '@/components/pageHeader'
import Button from '@/components/button'
import Loading from '@/components/loading'
import { useContext, useEffect } from 'react'
import { useForm } from '@/hook/form'
import { ModalContext } from '@/context/modal/modal.context'
import { ExerciseType } from '@/types/exercise.type'
import { ExerciseCard } from '@/app/private/training/[id]/exercise.card'
import Icon from '@/components/icon'
import Link from 'next/link'
import Label from '@/components/label'
import { TrainingMuscleGroupDefinition } from '@/constants/training.muscleGroup.definition'

const TrainingExercisePage = ({ params }: { params: { id: string } }) => {
    const { id } = params
    const { open } = useContext(ModalContext)
    const trainingForm = useForm<TrainingType | null>('trainingForm')

    const formApi = useAPI<TrainingType>({
        api: async () => {
            const response = await API.get(
                `/training/byId?id=${id}`,
                SessionUtils.tokenHeader()
            )

            return response.data
        },
    })
    const exerciseApi = useAPI<ExerciseType[]>({
        api: async () => {
            if (formApi.response?.id) {
                const response = await API.get(
                    `/exercise/all?trainingId=${trainingForm.form?.id}`,
                    SessionUtils.tokenHeader()
                )

                return response.data
            } else {
                return []
            }
        },
        dependencies: [formApi.response?.id],
    })

    useEffect(() => {
        if (formApi.response) {
            trainingForm.updatePrev(() => formApi.response)
        }
    }, [formApi.response])

    if (formApi.status === 'RUNNING') {
        return <Loading />
    }

    return (
        <div className={style.private}>
            <PageHeader
                header={
                    <>
                        {formApi.response?.name}
                        <Label>
                            {
                                TrainingMuscleGroupDefinition?.[
                                    formApi.response?.muscle_group as any
                                ]
                            }
                        </Label>
                    </>
                }
                icon="file_copy"
            >
                <Button
                    leftIcon="add"
                    onClick={() => {
                        open(
                            'exercise',
                            'form',
                            {
                                training_id: id,
                            },
                            () => {
                                exerciseApi.reset()
                            }
                        )
                    }}
                >
                    Novo Exercício
                </Button>
                <Button
                    leftIcon="sync"
                    forceLoading={exerciseApi.status === 'RUNNING'}
                    onClick={() => {
                        exerciseApi.reset()
                    }}
                />
            </PageHeader>
            <section className={style.cards}>
                {exerciseApi.response?.map((exercise) => {
                    return (
                        <ExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                            updateApi={() => exerciseApi.reset()}
                        />
                    )
                })}
            </section>
        </div>
    )
}

export default TrainingExercisePage

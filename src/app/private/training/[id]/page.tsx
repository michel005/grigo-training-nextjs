'use client'

import style from './page.module.scss'
import { useAPI } from '@/hook/api'
import { API } from '@/settings/axios.settings'
import { SessionUtils } from '@/utils/session.utils'
import { TrainingType } from '@/types/training.type'
import PageHeader from '@/components/pageHeader'
import Button from '@/components/button'
import Loading from '@/components/loading'
import { CSSProperties, useContext, useEffect } from 'react'
import { useForm } from '@/hook/form'
import { ModalContext } from '@/context/modal/modal.context'
import { ExerciseType } from '@/types/exercise.type'
import { ExerciseCard } from '@/app/private/training/[id]/exercise.card'
import Icon from '@/components/icon'
import Link from 'next/link'
import Label from '@/components/label'
import { TrainingMuscleGroupDefinition } from '@/constants/training.muscleGroup.definition'
import { TrainingMuscleGroupImageDefinition } from '@/constants/training.muscleGroup.image.definition'
import { clsx } from 'clsx'

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

    const pictures =
        formApi.response?.muscle_group
            ?.split(';')
            ?.map((x) => TrainingMuscleGroupImageDefinition[x]) || []

    const pictureStyles: any = {}
    for (let index = 0; index <= pictures.length; index++) {
        pictureStyles[`--picture-${index + 1}`] = `url(${pictures[index]})`
    }

    return (
        <div
            className={clsx(
                style.private,
                pictures?.length === 1 && style.pic1,
                pictures?.length === 2 && style.pic2,
                pictures?.length === 3 && style.pic3
            )}
            style={pictureStyles as CSSProperties}
        >
            <PageHeader header={<>{formApi.response?.name}</>} icon="file_copy">
                <Button
                    icon="add"
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
                    icon="sync"
                    forceLoading={exerciseApi.status === 'RUNNING'}
                    onClick={() => {
                        exerciseApi.reset()
                    }}
                />
            </PageHeader>
            <div className={style.labels}>
                {formApi.response?.muscle_group?.split(';').map((muscle) => {
                    return (
                        <Label key={muscle}>
                            {TrainingMuscleGroupDefinition?.[muscle as any]}
                        </Label>
                    )
                })}
            </div>
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

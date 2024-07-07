'use client'

import style from './page.module.scss'
import { API } from '@/settings/axios.settings'
import { SessionUtils } from '@/utils/session.utils'
import Button from '@/components/button'
import { Fragment, useContext, useMemo, useState } from 'react'
import { ModalContext } from '@/context/modal/modal.context'
import { ExerciseType } from '@/types/exercise.type'
import { ExerciseCard } from '@/app/private/training/[id]/exercise.card'
import Label from '@/components/label'
import { TrainingMuscleGroupDefinition } from '@/constants/training.muscleGroup.definition'
import { TrainingMuscleGroupImageDefinition } from '@/constants/training.muscleGroup.image.definition'
import { clsx } from 'clsx'
import { ArrayUtils } from '@/utils/array.utils'
import Page from '@/components/page'
import { PageContext } from '@/context/page/page.context'

const TrainingExercisePage = ({ params }: { params: { id: string } }) => {
    const { id } = params
    const { open } = useContext(ModalContext)
    const {
        pageData: { training },
        training: refreshTraining,
    } = useContext(PageContext)
    const [hoverExercise, setHoverExercise] = useState<string | null>(null)

    const allTrainings = useMemo(
        () => [
            ...(training?.completedTrainings || []),
            ...(training?.archivedTrainings || []),
            ...(training?.activeTrainings || []),
        ],
        [
            training?.activeTrainings,
            training?.archivedTrainings,
            training?.completedTrainings,
        ]
    )
    const currentTraining = useMemo(
        () => allTrainings.find((x) => x.id === id),
        [allTrainings, id]
    )

    const exercises = useMemo(
        () => currentTraining?.exercise || [],
        [currentTraining?.exercise]
    )

    const pictures = useMemo(
        () =>
            currentTraining?.muscle_group
                ?.split(';')
                ?.map((x) => TrainingMuscleGroupImageDefinition[x]) || [],
        [currentTraining?.muscle_group]
    )

    return (
        <Page
            header={{
                header: currentTraining?.name,
                pictures: pictures,
                description: (
                    <>
                        {currentTraining?.muscle_group
                            ?.split(';')
                            .map((muscle) => {
                                return (
                                    <Label key={muscle}>
                                        {
                                            TrainingMuscleGroupDefinition?.[
                                                muscle as any
                                            ]
                                        }
                                    </Label>
                                )
                            })}
                    </>
                ),
            }}
        >
            <div className={style.exerciseSelector}>
                {exercises.map((exercise, index) => {
                    return (
                        <Button
                            key={index}
                            variant="secondary"
                            onMouseEnter={() => {
                                setHoverExercise(exercise.id || null)
                            }}
                            onMouseLeave={() => {
                                setHoverExercise(null)
                            }}
                            onClick={() => {
                                document
                                    .getElementById(`exercise_${index}`)
                                    ?.scrollIntoView({
                                        behavior: 'smooth',
                                    })
                            }}
                        >
                            {index + 1}. {exercise.name}
                        </Button>
                    )
                })}
            </div>
            <div className={style.cards}>
                {exercises.length > 0 && (
                    <div
                        className={style.card}
                        onClick={() => {
                            open(
                                'exercise',
                                'form',
                                {
                                    execution_order: 5,
                                    training_id: id,
                                },
                                () => {
                                    refreshTraining()
                                }
                            )
                        }}
                    >
                        <Button icon="add" />
                    </div>
                )}
                {exercises.map((exercise, index) => {
                    return (
                        <Fragment key={exercise.id}>
                            <div
                                className={clsx(
                                    style.card,
                                    hoverExercise === exercise.id && style.hover
                                )}
                                id={`exercise_${index}`}
                            >
                                <ExerciseCard
                                    exercise={exercise}
                                    updateApi={() => refreshTraining()}
                                    index={index}
                                    onOrderChange={(origin, target) => {
                                        if (origin === target) {
                                            return
                                        }

                                        const ids: string[] = ArrayUtils.move(
                                            exercises,
                                            origin,
                                            target
                                        ).map((x: ExerciseType) => x.id)

                                        API.put(
                                            `/exercise/order`,
                                            {
                                                ids: ids,
                                            },
                                            SessionUtils.tokenHeader()
                                        ).then(() => {
                                            refreshTraining()
                                        })
                                    }}
                                />
                            </div>
                            {index + 1 !== exercises.length && (
                                <div
                                    className={style.card}
                                    onClick={() => {
                                        open(
                                            'exercise',
                                            'form',
                                            {
                                                execution_order:
                                                    index * 10 + 15,
                                                training_id: id,
                                            },
                                            () => {
                                                refreshTraining()
                                            }
                                        )
                                    }}
                                >
                                    <Button icon="add" />
                                </div>
                            )}
                        </Fragment>
                    )
                })}
                {exercises.length === 0 ? (
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
                                    refreshTraining()
                                }
                            )
                        }}
                    >
                        Adicionar Primeiro Exercício
                    </Button>
                ) : (
                    <div className={clsx(style.card, style.noBottomBar)}>
                        <Button
                            icon="add"
                            onClick={() => {
                                open(
                                    'exercise',
                                    'form',
                                    {
                                        execution_order:
                                            exercises.length * 10 + 10,
                                        training_id: id,
                                    },
                                    () => {
                                        refreshTraining()
                                    }
                                )
                            }}
                        />
                    </div>
                )}
            </div>
        </Page>
    )
}

export default TrainingExercisePage

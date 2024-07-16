'use client'

import Page from '@/components/page'
import { useContext, useEffect, useMemo } from 'react'
import { PageContext } from '@/context/page/page.context'
import { WeekdaysDefinition } from '@/constants/weekdays.definition'
import { TrainingType } from '@/types/training.type'
import { DescriptionExercise } from '@/components/exercise/description.exercise'
import style from './page.module.scss'
import Button from '@/components/button'
import { ModalContext } from '@/context/modal/modal.context'
import { TrainingMuscleGroupImageDefinition } from '@/constants/training.muscleGroup.image.definition'

const TrainingExecutionPage = () => {
    const { pageData } = useContext(PageContext)
    const { open } = useContext(ModalContext)

    const getDayOfWeek = () => {
        const date = new Date()
        let day = date.getDay()
        day = day === 0 ? 1 : day + 1
        return day
    }

    const currentTraining: TrainingType = useMemo(
        () =>
            (pageData.training?.weekPlan as any)?.[`weekday_${getDayOfWeek()}`],
        [pageData.training?.weekPlan]
    )
    const pageHeader = useMemo(
        () =>
            `${
                currentTraining?.name
            } (${WeekdaysDefinition[getDayOfWeek() - 1]})`,
        [currentTraining]
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
                header: pageHeader,
                pictures,
            }}
        >
            <div className={style.page}>
                {currentTraining?.exercise?.map((exercise, index) => {
                    return (
                        <div className={style.exercise} key={exercise.id}>
                            <h3>
                                {index + 1}. {exercise.name}
                            </h3>
                            <p>{exercise.observation}</p>
                            <DescriptionExercise exercise={exercise} />
                            <Button
                                icon="play_arrow"
                                variant="secondary"
                                onClick={() => {
                                    open('execution', 'form', {
                                        exercise: exercise,
                                    })
                                }}
                            >
                                Executar
                            </Button>
                        </div>
                    )
                })}
            </div>
        </Page>
    )
}

export default TrainingExecutionPage

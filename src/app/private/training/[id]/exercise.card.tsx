import { ExerciseType } from '@/types/exercise.type'
import { useContext } from 'react'
import { ModalContext } from '@/context/modal/modal.context'
import style from '@/app/private/training/[id]/exercise.card.module.scss'
import { ExerciseTypeDefinition } from '@/constants/exercise.type.definition'
import { TimeUtils } from '@/utils/time.utils'
import Button from '@/components/button'
import { DescriptionExercise } from '@/components/exercise/description.exercise'

export const ExerciseCard = ({
    exercise,
    updateApi,
}: {
    exercise: ExerciseType
    updateApi: () => void
}) => {
    const { open } = useContext(ModalContext)

    return (
        <div className={style.exerciseCard}>
            <header>
                <h3>
                    <a
                        onClick={() => {
                            open('exercise', 'form', exercise, () => {
                                updateApi()
                            })
                        }}
                    >
                        {exercise.name}
                    </a>
                </h3>
                {exercise.observation && <small>{exercise.observation}</small>}
            </header>
            <div className={style.labels}>
                <span className={style.label}>
                    {ExerciseTypeDefinition[exercise.type as any]}
                </span>
            </div>
            <DescriptionExercise exercise={exercise} />
            <div className={style.commands}>
                <Button leftIcon="play_arrow" />
            </div>
        </div>
    )
}

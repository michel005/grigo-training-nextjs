import { ExerciseType } from '@/types/exercise.type'
import { useContext } from 'react'
import { ModalContext } from '@/context/modal/modal.context'
import style from '@/app/private/training/[id]/exercise.card.module.scss'
import { ExerciseTypeDefinition } from '@/constants/exercise.type.definition'
import { DescriptionExercise } from '@/components/exercise/description.exercise'
import Label from '@/components/label'
import { DragDrop } from '@/components/dragDrop'
import Button from '@/components/button'

export const ExerciseCard = ({
    exercise,
    updateApi,
    index,
    onOrderChange,
}: {
    exercise: ExerciseType
    updateApi: () => void
    index: number
    onOrderChange: (origin: number, target: number) => void
}) => {
    const { open } = useContext(ModalContext)

    return (
        <DragDrop
            index={index}
            group="trainingExercise"
            className={style.exerciseCard}
            onEnd={(origin, target) => {
                onOrderChange?.(parseInt(origin), parseInt(target))
            }}
        >
            <header>
                <Button
                    onClick={() => {
                        open('exercise', 'form', exercise, () => {
                            updateApi()
                        })
                    }}
                >
                    {index + 1}. {exercise.name}
                </Button>
                {exercise.observation && <small>{exercise.observation}</small>}
            </header>
            <div className={style.labels}>
                <Label>{ExerciseTypeDefinition[exercise.type as any]}</Label>
            </div>
            <DescriptionExercise exercise={exercise} />
        </DragDrop>
    )
}

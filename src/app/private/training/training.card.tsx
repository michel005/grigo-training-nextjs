import { TrainingType } from '@/types/training.type'
import { useContext } from 'react'
import { ModalContext } from '@/context/modal/modal.context'
import { useRouter } from 'next/navigation'
import style from '@/app/private/training/training.card.module.scss'
import { DateUtils } from '@/utils/date.utils'
import { TrainingMuscleGroupDefinition } from '@/constants/training.muscleGroup.definition'
import { TrainingStatusDefinition } from '@/constants/training.status.definition'
import Button from '@/components/button'
import Label from '@/components/label'

const MuscleGroupPictures: any = {
    BACK: 'https://i.pinimg.com/564x/a9/ab/51/a9ab516c1ab8a2bd8bad396061e34515.jpg',
    LEGS: 'https://i.pinimg.com/564x/02/dd/eb/02ddeb49635d51ff31eedb37a3ae2f02.jpg',
    CHEST: 'https://i.pinimg.com/564x/e4/73/16/e473168167554b26c6b15faa25cc5fb4.jpg',
    BICEPS: 'https://i.pinimg.com/564x/76/f2/75/76f275e985f46e10bf64b50b3064fb6c.jpg',
    TRICEPS:
        'https://i.pinimg.com/564x/04/01/5e/04015e1c26640c01a81053be4cb071bb.jpg',
    SHOULDERS:
        'https://i.pinimg.com/564x/fb/ea/17/fbea177513f72649a185ef035c86a02b.jpg',
    ABS: 'https://i.pinimg.com/564x/f8/b7/3f/f8b73f7bc9e20d7b9622444b30e35cf4.jpg',
}

export const TrainingCard = ({
    training,
    updateApi,
}: {
    training: TrainingType
    updateApi: () => void
}) => {
    const { open } = useContext(ModalContext)
    const router = useRouter()

    return (
        <div className={style.trainingCard}>
            <img
                className={style.muscleGroupPicture}
                src={MuscleGroupPictures?.[training.muscle_group as any]}
            />
            <header>
                <h3
                    onClick={() => {
                        open('training', 'form', training, () => {
                            updateApi()
                        })
                    }}
                >
                    <a>{training.name}</a>
                </h3>
                <small>
                    {training.start_date} - {training.end_date}
                </small>
                <small>
                    {DateUtils.daysBetween(
                        training.start_date as string,
                        training.end_date as string
                    ) * -1}{' '}
                    dia(s)
                </small>
            </header>
            <div className={style.labels}>
                {training.muscle_group && (
                    <Label>
                        {
                            TrainingMuscleGroupDefinition?.[
                                training.muscle_group as any
                            ]
                        }
                    </Label>
                )}
                {training.status && (
                    <Label>
                        {TrainingStatusDefinition?.[training.status as any]}
                    </Label>
                )}
            </div>
            <Button
                leftIcon="file_copy"
                onClick={() => {
                    router.push(`/private/training/${training.id}`)
                }}
            >
                Exercícios
            </Button>
        </div>
    )
}

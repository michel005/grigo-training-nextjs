import { TrainingType } from '@/types/training.type'
import { useContext } from 'react'
import { ModalContext } from '@/context/modal/modal.context'
import { useRouter } from 'next/navigation'
import style from '@/app/private/training/training.card.module.scss'
import { TrainingMuscleGroupDefinition } from '@/constants/training.muscleGroup.definition'
import Button from '@/components/button'
import Label from '@/components/label'
import { API } from '@/settings/axios.settings'
import { SessionUtils } from '@/utils/session.utils'
import { clsx } from 'clsx'
import { TrainingMuscleGroupImageDefinition } from '@/constants/training.muscleGroup.image.definition'

export const TrainingCard = ({
    training,
    updateApi,
}: {
    training: TrainingType
    updateApi: () => void
}) => {
    const { open } = useContext(ModalContext)
    const router = useRouter()

    const archive = async () => {
        await API.put(
            `/training/archive?id=${training.id}`,
            null,
            SessionUtils.tokenHeader()
        )

        updateApi()
    }

    const complete = async () => {
        await API.put(
            `/training/complete?id=${training.id}`,
            null,
            SessionUtils.tokenHeader()
        )

        updateApi()
    }

    const reopen = async () => {
        await API.put(
            `/training/active?id=${training.id}`,
            null,
            SessionUtils.tokenHeader()
        )

        updateApi()
    }

    return (
        <div
            className={clsx(
                style.trainingCard,
                style[training.status as string]
            )}
        >
            <div className={style.muscleGroupPicture}>
                <img
                    src={
                        TrainingMuscleGroupImageDefinition?.[
                            training.muscle_group?.split(';')?.[0] as any
                        ]
                    }
                />
                <h3>{training.name}</h3>
                <div className={style.buttons}>
                    {training.status === 'ACTIVE' ? (
                        <>
                            <Button icon="archive" onAsyncClick={archive}>
                                Arquivar
                            </Button>
                            <Button icon="check" onAsyncClick={complete}>
                                Concluir
                            </Button>
                        </>
                    ) : (
                        <Button icon="undo" onAsyncClick={reopen}>
                            Reabrir
                        </Button>
                    )}
                    <Button
                        icon="edit"
                        onClick={() => {
                            open('training', 'form', training, () => {
                                updateApi()
                            })
                        }}
                    >
                        Alterar
                    </Button>
                </div>
            </div>
            <div className={style.content}>
                <ul>
                    {training.exercise
                        ?.filter((_, index) => index < 3)
                        ?.map((exercise) => {
                            return <li key={exercise.id}>{exercise.name}</li>
                        })}
                    {(training.exercise?.length || 0) > 3 && (
                        <li className={style.lastItem}>...</li>
                    )}
                </ul>
                <div className={style.labels}>
                    {training.muscle_group?.split(';').map((muscle) => {
                        return (
                            <Label key={muscle}>
                                {TrainingMuscleGroupDefinition?.[muscle as any]}
                            </Label>
                        )
                    })}
                </div>
                <Button
                    variant="secondary"
                    icon="file_copy"
                    onClick={() => {
                        router.push(`/private/training/${training.id}`)
                    }}
                    bag={<span>{training.exercise?.length || 0}</span>}
                >
                    Exercícios
                </Button>
            </div>
        </div>
    )
}

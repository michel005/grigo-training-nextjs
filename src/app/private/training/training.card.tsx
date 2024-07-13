import { TrainingType } from '@/types/training.type'
import { useContext } from 'react'
import { ModalContext } from '@/context/modal/modal.context'
import { useRouter } from 'next/navigation'
import style from '@/app/private/training/training.card.module.scss'
import { TrainingMuscleGroupDefinition } from '@/constants/training.muscleGroup.definition'
import Button from '@/components/button'
import Label from '@/components/label'
import { clsx } from 'clsx'
import { TrainingMuscleGroupImageDefinition } from '@/constants/training.muscleGroup.image.definition'
import { PageContext } from '@/context/page/page.context'
import { Business } from '@/business'
import { useMessage } from '@/hook/message'
import { useForm } from '@/hook/form'

export const TrainingCard = ({
    training,
    today = false,
}: {
    training: TrainingType
    today?: boolean
}) => {
    const executionPageForm = useForm<{
        weekday: string
        training: TrainingType
    }>('executionPage', {
        weekday: 'Segunda Feira',
        training: {},
    })
    const { training: refreshTraining, pageData } = useContext(PageContext)
    const { open } = useContext(ModalContext)
    const { question } = useMessage()
    const router = useRouter()

    const trainingWeekPlan = pageData?.training?.weekPlan

    const includedInWeekPlan =
        Object.keys(trainingWeekPlan)
            .filter((x) => x !== 'id')
            .filter((x) => (trainingWeekPlan as any)[x]?.id === training.id)
            .length > 0

    const archive = async () => {
        await Business.training.archive({ id: training.id })

        await refreshTraining()
    }

    const complete = async () => {
        await Business.training.complete({ id: training.id })

        await refreshTraining()
    }

    const reopen = async () => {
        await Business.training.reopen({ id: training.id })

        await refreshTraining()
    }

    return (
        <div
            className={clsx(
                style.trainingCard,
                style[training.status as string]
            )}
            style={{
                backgroundImage: `url(${
                    TrainingMuscleGroupImageDefinition?.[
                        training.muscle_group?.split(';')?.[0] as any
                    ]
                })`,
            }}
        >
            <div className={style.header}>
                <h3>{training.name}</h3>

                <div className={style.labels}>
                    {training.muscle_group?.split(';').map((muscle) => {
                        return (
                            <Label key={muscle}>
                                {TrainingMuscleGroupDefinition?.[muscle as any]}
                            </Label>
                        )
                    })}
                </div>
            </div>
            <div className={style.buttons}>
                {!includedInWeekPlan && (
                    <>
                        <Button
                            icon="file_copy"
                            onClick={() => {
                                question(
                                    `Deseja duplicar o treino "${training.name}"?`,
                                    'Isso ira duplicar o treino e seus exercícios.',
                                    () => {
                                        Business.training
                                            .duplicate({
                                                id: training.id,
                                            })
                                            .then(() => {
                                                refreshTraining()
                                            })
                                    }
                                )
                            }}
                        >
                            Duplicar
                        </Button>
                        <Button
                            icon="edit"
                            onClick={() => {
                                open('training', 'form', training)
                            }}
                        >
                            Alterar
                        </Button>
                        {training.status === 'ACTIVE' ? (
                            <>
                                {!includedInWeekPlan && (
                                    <Button
                                        icon="archive"
                                        onAsyncClick={archive}
                                    >
                                        Arquivar
                                    </Button>
                                )}
                                <Button icon="check" onAsyncClick={complete}>
                                    Concluir
                                </Button>
                            </>
                        ) : (
                            <Button icon="undo" onAsyncClick={reopen}>
                                Reabrir
                            </Button>
                        )}
                    </>
                )}
            </div>
            {today && (
                <Button
                    icon="play_arrow"
                    onClick={() => {
                        router.push(`/private/training/execute`)
                    }}
                >
                    Executar Treino
                </Button>
            )}
            <Button
                icon="file_copy"
                onClick={() => {
                    router.push(`/private/training/${training.id}`)
                }}
                bag={<span>{training.exercise?.length || 0}</span>}
            >
                Exercícios
            </Button>
        </div>
    )
}

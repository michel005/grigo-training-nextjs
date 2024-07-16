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

export const TrainingCard = ({
    training,
    today = false,
    forceWeekPlan = false,
    noHover = false,
}: {
    training: TrainingType
    today?: boolean
    forceWeekPlan?: boolean
    noHover?: boolean
}) => {
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
                style[training.status as string],
                (forceWeekPlan || includedInWeekPlan) &&
                    style.includedInWeekPlan,
                noHover && style.noHover
            )}
            style={{
                backgroundImage: `url(${
                    TrainingMuscleGroupImageDefinition?.[
                        training.muscle_group?.split(';')?.[0] as any
                    ]
                })`,
            }}
        >
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
            {!(forceWeekPlan || includedInWeekPlan) && (
                <div className={style.buttons}>
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
                                <Button icon="archive" onAsyncClick={archive}>
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
                </div>
            )}
            <Button
                className={style.moreOptions}
                icon="open_in_new"
                onClick={() => {
                    router.push(`/private/training/${training.id}`)
                }}
                variant="secondary"
            />
            {today && (
                <Button
                    className={style.run}
                    icon="play_arrow"
                    onClick={() => {
                        router.push(`/private/training/execute`)
                    }}
                >
                    Executar
                </Button>
            )}
        </div>
    )
}

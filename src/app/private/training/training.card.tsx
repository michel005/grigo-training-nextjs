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
import { TrainingBusiness } from '@/business/training.business'
import { PageContext } from '@/context/page/page.context'

export const TrainingCard = ({
    training,
    today = false,
}: {
    training: TrainingType
    today?: boolean
}) => {
    const { training: refreshTraining, pageData } = useContext(PageContext)
    const business = new TrainingBusiness()
    const { open } = useContext(ModalContext)
    const router = useRouter()

    const trainingWeekPlan = pageData?.training?.weekPlan

    const includedInWeekPlan =
        Object.keys(trainingWeekPlan)
            .filter((x) => x !== 'id')
            .filter((x) => (trainingWeekPlan as any)[x]?.id === training.id)
            .length > 0

    const archive = async () => {
        await business.archive({ id: training.id })

        await refreshTraining()
    }

    const complete = async () => {
        await business.complete({ id: training.id })

        await refreshTraining()
    }

    const reopen = async () => {
        await business.reopen({ id: training.id })

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
            <div className={style.muscleGroupPicture}>
                <h3>{training.name}</h3>
                <div className={style.buttons}>
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
                    {!includedInWeekPlan && (
                        <Button
                            icon="edit"
                            onClick={() => {
                                open('training', 'form', training)
                            }}
                        >
                            Alterar
                        </Button>
                    )}
                </div>
            </div>
            <div className={style.content}>
                <div className={style.labels}>
                    {training.muscle_group?.split(';').map((muscle) => {
                        return (
                            <Label key={muscle}>
                                {TrainingMuscleGroupDefinition?.[muscle as any]}
                            </Label>
                        )
                    })}
                </div>
                {includedInWeekPlan ? (
                    <>
                        {today && (
                            <Button icon="play_arrow">Executar Treino</Button>
                        )}
                    </>
                ) : (
                    <Button
                        icon="file_copy"
                        variant="primary"
                        onClick={() => {
                            router.push(`/private/training/${training.id}`)
                        }}
                        bag={<span>{training.exercise?.length || 0}</span>}
                    >
                        Exercícios
                    </Button>
                )}
            </div>
        </div>
    )
}

import Button from '@/components/button'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useMemo } from 'react'
import { ModalContext } from '@/context/modal/modal.context'
import { TrainingType } from '@/types/training.type'
import { PageContext } from '@/context/page/page.context'
import { SortUtils } from '@/utils/sort.utils'

export const ExerciseSidebar = () => {
    const { open } = useContext(ModalContext)
    const {
        pageData: { training },
    } = useContext(PageContext)
    const router = useRouter()
    const pathname = usePathname()

    const currentTrainingId = useMemo(
        () => pathname.split('/')[pathname.split('/').length - 1],
        [pathname]
    )

    const allTrainings: TrainingType[] = useMemo(
        () =>
            [
                ...(training?.activeTrainings || []),
                training?.weekPlan.weekday_1,
                training?.weekPlan.weekday_2,
                training?.weekPlan.weekday_3,
                training?.weekPlan.weekday_4,
                training?.weekPlan.weekday_5,
                training?.weekPlan.weekday_6,
                training?.weekPlan.weekday_7,
            ]
                .filter((x) => !!x)
                .sort((a, b) => SortUtils.sort(a, b, 'name')) as TrainingType[],
        [
            training?.activeTrainings,
            training?.archivedTrainings,
            training?.completedTrainings,
            training?.weekPlan.weekday_1,
            training?.weekPlan.weekday_2,
            training?.weekPlan.weekday_3,
            training?.weekPlan.weekday_4,
            training?.weekPlan.weekday_5,
            training?.weekPlan.weekday_6,
            training?.weekPlan.weekday_7,
        ]
    )

    return (
        <>
            <Button
                icon="add"
                onClick={() => {
                    open('exercise', 'form', {
                        training_id: currentTrainingId,
                    })
                }}
            >
                Adicionar Exercício
            </Button>
            <div style={{ flexGrow: 1 }} />
            <h5>Outros Treinos</h5>
            {allTrainings.map((training) => {
                return (
                    <Button
                        key={training.id}
                        bag={training.exercise?.length}
                        variant={
                            training.id === currentTrainingId
                                ? 'secondary'
                                : 'primary'
                        }
                        disabled={training.id === currentTrainingId}
                        onClick={() => {
                            router.push(`/private/training/${training.id}`)
                        }}
                    >
                        {training.name}
                    </Button>
                )
            })}
            <hr />
            <Button
                icon="keyboard_arrow_left"
                onClick={() => {
                    router.push('/private/training')
                }}
            >
                Voltar
            </Button>
        </>
    )
}

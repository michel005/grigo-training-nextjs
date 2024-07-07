import Button from '@/components/button'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useMemo } from 'react'
import { ModalContext } from '@/context/modal/modal.context'
import { useAPI } from '@/hook/api'
import { TrainingType } from '@/types/training.type'
import { Business } from '@/business'

export const ExerciseSidebar = () => {
    const { open } = useContext(ModalContext)
    const router = useRouter()
    const pathname = usePathname()

    const currentTrainingId = useMemo(
        () => pathname.split('/')[pathname.split('/').length - 1],
        [pathname]
    )

    const trainingApi = useAPI<TrainingType[]>({
        api: async () => {
            return await Business.training.findAll()
        },
    })

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
            <h5>Outros Treinos Ativos</h5>
            {trainingApi.response
                ?.filter((training) => training.status === 'ACTIVE')
                ?.map((training) => {
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

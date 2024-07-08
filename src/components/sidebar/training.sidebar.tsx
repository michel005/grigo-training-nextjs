import Button from '@/components/button'
import { useContext } from 'react'
import { ModalContext } from '@/context/modal/modal.context'
import { useForm } from '@/hook/form'
import { PageContext } from '@/context/page/page.context'
import { Business } from '@/business'

export const TrainingSidebar = () => {
    const { open } = useContext(ModalContext)
    const { pageData, training } = useContext(PageContext)
    const trainingPageForm = useForm<{
        archived: boolean
        completed: boolean
    }>('trainingPage', {
        archived: true,
        completed: true,
    })

    return (
        <>
            <Button
                icon="add"
                onClick={() =>
                    open('training', 'form', {
                        name: 'Novo Treino',
                    })
                }
            >
                Novo Treino
            </Button>
            <h5>Planejamento Semanal</h5>
            <Button
                icon="layers_clear"
                onAsyncClick={async () => {
                    await Business.trainingWeekPlan.save({
                        entity: {
                            weekday_1: null,
                            weekday_2: null,
                            weekday_3: null,
                            weekday_4: null,
                            weekday_5: null,
                            weekday_6: null,
                            weekday_7: null,
                        },
                    })
                    await training()
                }}
            >
                Replanejar
            </Button>
            <Button
                icon="checklist"
                onAsyncClick={async () => {
                    await Business.trainingWeekPlan.complete()
                    await training()
                }}
            >
                Concluir Treinos
            </Button>
            <div style={{ flexGrow: 1 }} />
            <h5>Mostrar</h5>
            <Button
                icon="archive"
                variant={trainingPageForm.form.archived ? 'primary' : 'ghost'}
                onClick={() => {
                    trainingPageForm.update(
                        'archived',
                        !trainingPageForm.form.archived
                    )
                }}
                bag={
                    trainingPageForm.form.archived
                        ? pageData.training.archivedTrainings.length
                        : undefined
                }
            >
                Arquivados
            </Button>
            <Button
                icon="check"
                variant={trainingPageForm.form.completed ? 'primary' : 'ghost'}
                onClick={() => {
                    trainingPageForm.update(
                        'completed',
                        !trainingPageForm.form.completed
                    )
                }}
                bag={
                    trainingPageForm.form.completed
                        ? pageData.training.completedTrainings.length
                        : undefined
                }
            >
                Concluídos
            </Button>
        </>
    )
}

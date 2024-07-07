import Button from '@/components/button'
import { DateUtils } from '@/utils/date.utils'
import { useContext } from 'react'
import { ModalContext } from '@/context/modal/modal.context'
import { useForm } from '@/hook/form'

export const TrainingSidebar = () => {
    const { open } = useContext(ModalContext)
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
                        start_date: DateUtils.dateToString(new Date()),
                    })
                }
            >
                Novo Treino
            </Button>
            <h5>Planejamento Semanal</h5>
            <Button icon="layers_clear">Replanejar</Button>
            <Button icon="checklist">Concluir Treinos</Button>
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
            >
                Concluídos
            </Button>
        </>
    )
}

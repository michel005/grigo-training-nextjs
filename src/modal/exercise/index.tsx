'use client'

import { Modal } from '@/components/modal'
import { Form, FormRow } from '@/components/form'
import { FieldText } from '@/components/field/text'
import { useContext, useEffect, useMemo, useState } from 'react'
import { ModalContext } from '@/context/modal/modal.context'
import { useForm } from '@/hook/form'
import { TrainingType } from '@/types/training.type'
import Button from '@/components/button'
import { API } from '@/settings/axios.settings'
import { ErrorType } from '@/types/error.type'
import style from './index.module.scss'
import { SessionUtils } from '@/utils/session.utils'
import { ExerciseType } from '@/types/exercise.type'
import ButtonGroup from '@/components/buttonGroup'
import { ExerciseTypeDefinition } from '@/constants/exercise.type.definition'
import { FieldLayout } from '@/components/field/layout'
import { useMessage } from '@/hook/message'
import { Business } from '@/business'
import { DescriptionExercise } from '@/components/exercise/description.exercise'
import { FieldChoices } from '@/components/field/choices'
import { FieldSelect } from '@/components/field/select'
import { ExerciseDefinition } from '@/constants/exercise.definition'
import { useAPI } from '@/hook/api'
import { TrainingBusiness } from '@/business/training.business'

export const ExerciseModal = () => {
    const { allModals, close } = useContext(ModalContext)
    const message = useMessage()
    const exerciseForm = useForm<ExerciseType | null>('exerciseForm')
    const [error, setError] = useState<ErrorType | null>()

    const trainingApi = useAPI<TrainingType>({
        api: async () => {
            if (!exerciseForm.form?.training_id) {
                return null
            }
            return await new TrainingBusiness().findById({
                id: exerciseForm.form?.training_id as any,
            })
        },
        dependencies: [exerciseForm.form?.training_id],
    })

    console.log('Execution Order', exerciseForm.form?.execution_order)

    const saveTrainingClickHandler = async () => {
        try {
            if (exerciseForm.form?.id) {
                await Business.exercise.update({
                    id: exerciseForm.form.id,
                    entity: exerciseForm.form,
                })
            } else {
                if (exerciseForm.form) {
                    await Business.exercise.create({
                        entity: exerciseForm.form,
                    })
                }
            }
            exerciseForm.updatePrev(() => null)
            close('exercise', 'form')
        } catch (error: any) {
            setError(error.response?.data)
        }
    }

    const removeTrainingClickHandler = async () => {
        message.question(
            'Exclusão de Exercício',
            'Deseja realmente excluir este exercício?',
            () => {
                Business.exercise
                    .remove({
                        id: exerciseForm.form?.id,
                    })
                    .then(() => {
                        close('exercise', 'form')
                    })
            }
        )
    }

    useEffect(() => {
        exerciseForm.updatePrev(() => allModals.get('exercise.form'))
    }, [allModals])

    const allExercisesAvailable = useMemo(() => {
        const allMuscles = trainingApi.response?.muscle_group?.split(';') || []
        const allExercises = []
        for (const muscle of allMuscles) {
            allExercises.push(...ExerciseDefinition?.[muscle])
        }
        return allExercises
    }, [trainingApi.response?.muscle_group])

    return (
        <Modal
            header="Formulário de Exercício"
            onClose={() => {
                exerciseForm.updatePrev(() => null)
                close('exercise', 'form')
            }}
            backgroundVariant="blur"
            size="big"
        >
            <Form formName="exerciseForm" errors={error}>
                <FieldSelect
                    label="Exercício"
                    formField="name"
                    options={new Map(allExercisesAvailable.map((x) => [x, x]))}
                />
                <FormRow>
                    <FieldText label="Nome do Exercício" formField="name" />
                    <FieldText label="Observação" formField="observation" />
                </FormRow>
                <FieldText
                    label="Tempo de Descanso"
                    formField="rest_time"
                    mask="time"
                />
                <FieldChoices
                    label="Tipo de Treino"
                    formField="type"
                    options={
                        new Map(
                            Object.keys(ExerciseTypeDefinition).map((type) => [
                                type,
                                ExerciseTypeDefinition[type],
                            ])
                        )
                    }
                    type="SINGLE"
                />
                {exerciseForm.form?.type === 'TIME' && (
                    <>
                        <FieldText
                            label="Tempo de Execução"
                            formField="exercise_time"
                            mask="time"
                        />
                    </>
                )}
                {exerciseForm.form?.type === 'SERIE' && (
                    <FormRow>
                        <FieldText
                            label="Número de Séries"
                            formField="series"
                            type="number"
                        />
                        <FieldText
                            label="Tempo de Execução"
                            formField="exercise_time"
                            mask="time"
                        />
                    </FormRow>
                )}
                {exerciseForm.form?.type === 'REPETITION' && (
                    <FormRow>
                        <FieldText
                            label="Número de Séries"
                            formField="series"
                            type="number"
                        />
                        <FieldText
                            label="Número de Repetições"
                            formField="repetitions"
                            type="number"
                        />
                    </FormRow>
                )}
                {exerciseForm.form?.type === 'DROP' && (
                    <>
                        <FormRow>
                            <FieldText
                                label="Número de Séries"
                                formField="series"
                                type="number"
                            />
                            <FieldText
                                label="Número de Repetições"
                                formField="repetitions"
                                type="number"
                            />
                        </FormRow>
                        <FieldText
                            label="Número de Drop Sets"
                            formField="drops"
                            type="number"
                        />
                    </>
                )}
            </Form>
            {exerciseForm.form?.type && (
                <div className={style.preview}>
                    <DescriptionExercise exercise={exerciseForm.form as any} />
                </div>
            )}
            <div className={style.buttons}>
                <Button icon="save" onAsyncClick={saveTrainingClickHandler}>
                    Salvar
                </Button>
                {exerciseForm.form?.id && (
                    <Button
                        icon="delete"
                        onAsyncClick={removeTrainingClickHandler}
                        variant="ghost"
                    >
                        Remover
                    </Button>
                )}
            </div>
        </Modal>
    )
}

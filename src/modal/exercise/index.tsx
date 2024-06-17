'use client'

import { Modal } from '@/components/modal'
import { Form, FormRow } from '@/components/form'
import { FieldText } from '@/components/field/text'
import { useContext, useEffect, useState } from 'react'
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

export const ExerciseModal = () => {
    const { allModals, close } = useContext(ModalContext)
    const message = useMessage()
    const exerciseForm = useForm<ExerciseType | null>('exerciseForm')
    const [error, setError] = useState<ErrorType | null>()

    const saveTrainingClickHandler = async () => {
        try {
            if (exerciseForm.form?.id) {
                await API.put<any, any, ExerciseType>(
                    `/exercise?id=${exerciseForm.form.id}`,
                    {
                        name: exerciseForm.form?.name,
                        type: exerciseForm.form?.type,
                        training_id: exerciseForm.form?.training_id,
                        exercise_time: exerciseForm.form?.exercise_time,
                        rest_time: exerciseForm.form?.rest_time,
                        series: exerciseForm.form?.series,
                        repetitions: exerciseForm.form?.repetitions,
                        drops: exerciseForm.form?.drops,
                        observation: exerciseForm.form?.observation,
                    },
                    SessionUtils.tokenHeader()
                )
            } else {
                await API.post<any, any, ExerciseType>(
                    '/exercise',
                    {
                        name: exerciseForm.form?.name,
                        type: exerciseForm.form?.type,
                        training_id: exerciseForm.form?.training_id,
                        exercise_time: exerciseForm.form?.exercise_time,
                        rest_time: exerciseForm.form?.rest_time,
                        series: exerciseForm.form?.series,
                        repetitions: exerciseForm.form?.repetitions,
                        drops: exerciseForm.form?.drops,
                        observation: exerciseForm.form?.observation,
                    },
                    SessionUtils.tokenHeader()
                )
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

    return (
        <Modal
            header="Formulário de Exercício"
            onClose={() => {
                exerciseForm.updatePrev(() => null)
                close('exercise', 'form')
            }}
            backgroundVariant="blur"
        >
            <Form formName="exerciseForm" errors={error}>
                <FieldText label="Nome do Exercício" formField="name" />
                <FieldText label="Observação" formField="observation" />
                <FieldText
                    label="Tempo de Descanso"
                    formField="rest_time"
                    mask="time"
                />
                <ButtonGroup>
                    {Object.keys(ExerciseTypeDefinition).map((type) => {
                        return (
                            <Button
                                key={type}
                                variant={
                                    exerciseForm.form?.type === type
                                        ? 'primary'
                                        : 'ghost'
                                }
                                onClick={() => {
                                    exerciseForm.update('type', type)
                                }}
                            >
                                {ExerciseTypeDefinition[type]}
                            </Button>
                        )
                    })}
                </ButtonGroup>
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
                    <>
                        <FieldText
                            label="Número de Séries"
                            formField="series"
                            type="number"
                        />
                    </>
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
            <div className={style.preview}>
                <DescriptionExercise exercise={exerciseForm.form as any} />
            </div>
            <div className={style.buttons}>
                <Button leftIcon="save" onAsyncClick={saveTrainingClickHandler}>
                    Salvar
                </Button>
                {exerciseForm.form?.id && (
                    <Button
                        leftIcon="delete"
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

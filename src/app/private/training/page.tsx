'use client'

import style from './page.module.scss'
import { Fragment, useContext, useMemo, useState } from 'react'
import { TrainingCard } from '@/app/private/training/training.card'
import { TrainingStatusDefinition } from '@/constants/training.status.definition'
import Page from '@/components/page'
import { DragDrop } from '@/components/dragDrop'
import { clsx } from 'clsx'
import { TrainingCardCollection } from '@/app/private/training/cardCollection'
import { WeekdaysDefinition } from '@/constants/weekdays.definition'
import { PageContext } from '@/context/page/page.context'
import { TrainingPageType } from '@/types/trainingPage.type'
import { Business } from '@/business'
import Button from '@/components/button'
import { useForm } from '@/hook/form'

const TrainingPage = () => {
    const trainingPageForm = useForm<{
        archived: boolean
        completed: boolean
    }>('trainingPage', {
        archived: true,
        completed: true,
    })
    const { training: refreshTraining, pageData } = useContext(PageContext)

    const trainingPageData = useMemo(
        () => pageData?.training as TrainingPageType,
        [pageData?.training]
    )

    const weekEntity = trainingPageData?.weekPlan || {}

    const [selected, setSelected] = useState<string | null>(null)

    const getDayOfWeek = () => {
        const date = new Date()
        let day = date.getDay()
        day = day === 0 ? 1 : day + 1
        return day
    }

    const changeWeekPlan = (origin: string, newWeekNumber?: number) => {
        const weekDayTemp: any = JSON.parse(
            JSON.stringify(trainingPageData?.weekPlan)
        )
        for (const wk of Object.keys(weekDayTemp).filter((x) => x !== 'id')) {
            if (weekDayTemp[wk]?.id === origin) {
                weekDayTemp[wk] = null
            } else {
                weekDayTemp[wk] = weekDayTemp[wk]?.id
            }
        }
        if (newWeekNumber !== undefined) {
            weekDayTemp[`weekday_${newWeekNumber}`] = origin
        }
        Business.trainingWeekPlan
            .save({
                entity: weekDayTemp,
            })
            .then(() => {
                refreshTraining()
            })
        setSelected(null)
    }

    return (
        <Page>
            <div className={style.week}>
                <h1>Planejamento Semanal</h1>
                <p>
                    Arraste seu treino para o dia da semana em que deseja
                    executa-lo.
                </p>
                <div className={style.weekdays}>
                    {WeekdaysDefinition.map((weekDay, index) => {
                        const today = getDayOfWeek() === index + 1
                        const weekVal =
                            (weekEntity as any)[`weekday_${index + 1}`] || null
                        if (weekVal !== null) {
                            const training = (
                                trainingPageData?.weekPlan as any
                            )[`weekday_${index + 1}`]
                            return (
                                <div
                                    key={weekDay}
                                    className={clsx(
                                        style.weekday,
                                        style.withTraining,
                                        today && style.currentWeekday
                                    )}
                                >
                                    <h3>
                                        {weekDay} {today && <span>(Hoje)</span>}
                                    </h3>
                                    {training && (
                                        <DragDrop
                                            index={training.id}
                                            group="weekday"
                                            acceptTargetGroup={[
                                                'training',
                                                'weekday',
                                            ]}
                                            onStart={(origin) => {
                                                setSelected(origin)
                                            }}
                                            onCancel={() => {
                                                setSelected(null)
                                            }}
                                            onEnd={() => {
                                                setSelected(null)
                                            }}
                                            className={
                                                style.trainingCardContainer
                                            }
                                        >
                                            <TrainingCard
                                                training={training}
                                                today={today}
                                            />
                                        </DragDrop>
                                    )}
                                </div>
                            )
                        }

                        return (
                            <div
                                key={weekDay}
                                className={clsx(
                                    style.weekday,
                                    today && style.currentWeekday
                                )}
                            >
                                <h3>{weekDay}</h3>
                                <DragDrop
                                    index={weekDay}
                                    group="weekday"
                                    onCancel={() => {
                                        setSelected(null)
                                    }}
                                    onEnd={(origin, target) => {
                                        changeWeekPlan(origin, index + 1)
                                    }}
                                    onlyTarget={true}
                                    className={clsx(
                                        style.fakeCard,
                                        today && style.fakeCardCurrentWeekday
                                    )}
                                >
                                    <Button>Sem Treino Atribuído</Button>
                                </DragDrop>
                            </div>
                        )
                    })}
                </div>
            </div>

            {selected ? (
                <DragDrop
                    onlyTarget={true}
                    group="training"
                    acceptTargetGroup={['weekday']}
                    index="training"
                    onEnd={(origin) => {
                        changeWeekPlan(origin)
                    }}
                    className={clsx(style.contentInside, style.selecting)}
                >
                    <h1>Treinos Disponíveis</h1>
                    <div className={style.statusSection}>
                        {(trainingPageData?.activeTrainings || []).map(
                            (training, index) => {
                                return (
                                    <Fragment key={training.id}>
                                        <DragDrop
                                            index={training.id}
                                            group="training"
                                            onEnd={() => {
                                                setSelected(null)
                                            }}
                                        >
                                            <TrainingCard training={training} />
                                        </DragDrop>
                                    </Fragment>
                                )
                            }
                        )}
                        {(trainingPageData?.activeTrainings || []).length ===
                            0 && (
                            <h3 className={style.noTrainingFound}>
                                Nenhum Treino Disponível
                            </h3>
                        )}
                    </div>
                </DragDrop>
            ) : (
                <TrainingCardCollection
                    hideEmpty={false}
                    header="Treinos Disponíveis"
                    list={trainingPageData?.activeTrainings || []}
                    cardRender={(training) => {
                        return (
                            <DragDrop
                                key={training.id}
                                index={training.id}
                                group="training"
                                acceptTargetGroup={['weekday']}
                                onEnd={() => {
                                    setSelected(null)
                                }}
                            >
                                <TrainingCard
                                    key={training.id}
                                    training={training}
                                />
                            </DragDrop>
                        )
                    }}
                />
            )}
            {trainingPageForm.form.archived && (
                <TrainingCardCollection
                    header={TrainingStatusDefinition.ARCHIVED}
                    list={trainingPageData?.archivedTrainings || []}
                />
            )}
            {trainingPageForm.form.completed && (
                <TrainingCardCollection
                    header={TrainingStatusDefinition.COMPLETED}
                    list={trainingPageData?.completedTrainings || []}
                />
            )}
        </Page>
    )
}

export default TrainingPage

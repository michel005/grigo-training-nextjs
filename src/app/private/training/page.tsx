'use client'

import style from './page.module.scss'
import { Fragment, useContext, useMemo, useState } from 'react'
import { TrainingCard } from '@/app/private/training/training.card'
import { TrainingStatusDefinition } from '@/constants/training.status.definition'
import Page from '@/components/page'
import { DragDrop } from '@/components/dragDrop'
import { clsx } from 'clsx'
import { API } from '@/settings/axios.settings'
import { SessionUtils } from '@/utils/session.utils'
import { TrainingCardCollection } from '@/app/private/training/cardCollection'
import { WeekdaysDefinition } from '@/constants/weekdays.definition'
import { PageContext } from '@/context/page/page.context'
import { TrainingPageType } from '@/types/trainingPage.type'

const TrainingPage = () => {
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
        if (trainingPageData?.weekPlan?.id) {
            API.put(
                `/training_week_plan?id=${trainingPageData?.weekPlan?.id}`,
                weekDayTemp,
                SessionUtils.tokenHeader()
            ).then(() => {
                refreshTraining()
            })
        } else {
            API.post(
                `/training_week_plan`,
                weekDayTemp,
                SessionUtils.tokenHeader()
            ).then(() => {
                refreshTraining()
            })
        }
        setSelected(null)
    }

    return (
        <Page
            header={{
                header: 'Treinos',
                pictures: [
                    'https://static.vecteezy.com/system/resources/previews/026/727/087/non_2x/gym-equipment-illustration-design-landscape-free-photo.jpg',
                ],
            }}
        >
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
                                    <h3>{weekDay}</h3>
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
                                            onEnd={(origin) => {
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
                            <DragDrop
                                key={weekDay}
                                className={clsx(
                                    style.weekday,
                                    today && style.currentWeekday
                                )}
                                index={weekDay}
                                group="weekday"
                                onCancel={() => {
                                    setSelected(null)
                                }}
                                onEnd={(origin, target) => {
                                    changeWeekPlan(origin, index + 1)
                                }}
                                onlyTarget={true}
                            >
                                <h3>{weekDay}</h3>
                            </DragDrop>
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
                                            <TrainingCard
                                                key={training.id}
                                                training={training}
                                            />
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
            <TrainingCardCollection
                header={TrainingStatusDefinition.ARCHIVED}
                list={trainingPageData?.archivedTrainings || []}
            />
            <TrainingCardCollection
                header={TrainingStatusDefinition.COMPLETED}
                list={trainingPageData?.completedTrainings || []}
            />
        </Page>
    )
}

export default TrainingPage

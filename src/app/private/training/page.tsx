'use client'

import style from './page.module.scss'
import { ReactNode, useContext, useMemo, useState } from 'react'
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
import { useForm } from '@/hook/form'
import { ConfigContext } from '@/context/config/config.context'

const getDayOfWeek = () => {
    const date = new Date()
    let day = date.getDay()
    day = day === 0 ? 1 : day + 1
    return day
}

const Weekday = ({
    weekday,
    children,
}: {
    weekday: string
    children: ReactNode
}) => {
    const index = WeekdaysDefinition.findIndex((x) => x === weekday)
    const today = getDayOfWeek() === index + 1

    return (
        <div className={clsx(style.weekday, today && style.currentWeekday)}>
            <h3>{weekday}</h3>
            {children}
        </div>
    )
}

const TrainingPage = () => {
    const trainingPageForm = useForm<{
        active: boolean
        archived: boolean
        completed: boolean
    }>('trainingPage', {
        active: true,
        archived: true,
        completed: true,
    })
    const { dragDropData } = useContext(ConfigContext)
    const { training: refreshTraining, pageData } = useContext(PageContext)

    const trainingPageData = useMemo(
        () => pageData?.training as TrainingPageType,
        [pageData?.training]
    )

    const weekEntity = trainingPageData?.weekPlan || {}

    const [selected, setSelected] = useState<string | null>(null)
    const [trainingSelected, setTrainingSelected] = useState<string | null>(
        null
    )

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
        setTrainingSelected(null)
    }

    return (
        <Page
            header={{
                header: 'Planejamento Semanal',
                description: (
                    <p>
                        Arraste seu treino para o dia da semana em que deseja
                        executa-lo.
                    </p>
                ),
                pictures: [
                    'https://i0.wp.com/post.healthline.com/wp-content/uploads/2023/02/female-dumbbells-1296x728-header-1296x729.jpg',
                ],
            }}
        >
            <div className={style.weekdays}>
                {WeekdaysDefinition.map((weekDay, index) => {
                    const today = getDayOfWeek() === index + 1
                    const weekVal =
                        (weekEntity as any)[`weekday_${index + 1}`] || null
                    if (weekVal !== null) {
                        const training = (trainingPageData?.weekPlan as any)[
                            `weekday_${index + 1}`
                        ]
                        return (
                            <Weekday weekday={weekDay} key={weekDay}>
                                <DragDrop
                                    index={training.id}
                                    extraData={training}
                                    group="weekday"
                                    acceptTargetGroup={['training', 'weekday']}
                                    onStart={(origin) => {
                                        setSelected(origin)
                                    }}
                                    onCancel={() => {
                                        setSelected(null)
                                    }}
                                    onEnd={() => {
                                        setSelected(null)
                                    }}
                                    className={clsx(
                                        style.trainingCardContainer,
                                        selected === training.id && style.fade
                                    )}
                                >
                                    <TrainingCard
                                        training={training}
                                        today={today}
                                        noHover={!!selected}
                                    />
                                </DragDrop>
                            </Weekday>
                        )
                    }

                    const showPreview =
                        dragDropData &&
                        (dragDropData.group === 'training' ||
                            dragDropData.group === 'weekday') &&
                        trainingSelected === weekDay

                    return (
                        <Weekday weekday={weekDay} key={weekDay}>
                            {showPreview ? (
                                <DragDrop
                                    index={weekDay}
                                    group="weekday"
                                    onCancel={() => {
                                        setSelected(null)
                                    }}
                                    onHover={(target) => {
                                        setTrainingSelected((x) => {
                                            if (!x || x !== target) {
                                                return target
                                            } else {
                                                return x
                                            }
                                        })
                                    }}
                                    onLeave={() => {
                                        setTrainingSelected(null)
                                    }}
                                    onEnd={(origin) => {
                                        changeWeekPlan(origin, index + 1)
                                    }}
                                    onlyTarget={true}
                                    className={style.trainingCardContainer}
                                >
                                    <TrainingCard
                                        training={dragDropData.extraData}
                                        forceWeekPlan={true}
                                    />
                                </DragDrop>
                            ) : (
                                <DragDrop
                                    index={weekDay}
                                    group="weekday"
                                    onCancel={() => {
                                        setSelected(null)
                                    }}
                                    onHover={(target) => {
                                        setTrainingSelected((x) => {
                                            if (!x || x !== target) {
                                                return target
                                            } else {
                                                return x
                                            }
                                        })
                                    }}
                                    onLeave={() => {
                                        console.log('Leave')
                                        setTrainingSelected(null)
                                    }}
                                    onEnd={(origin) => {
                                        changeWeekPlan(origin, index + 1)
                                        setTrainingSelected(null)
                                    }}
                                    onlyTarget={true}
                                    className={style.fakeCard}
                                >
                                    Sem Treino Atribuído
                                </DragDrop>
                            )}
                        </Weekday>
                    )
                })}
            </div>
            {selected && (
                <DragDrop
                    onlyTarget={true}
                    group="training"
                    acceptTargetGroup={['weekday']}
                    index="training"
                    onEnd={(origin) => {
                        changeWeekPlan(origin)
                    }}
                    className={clsx(style.card, style.selecting)}
                >
                    <div className={style.content}>
                        <div className={style.emptyDrop}>Devolver treino</div>
                    </div>
                </DragDrop>
            )}
            {trainingPageForm.form.active && (
                <TrainingCardCollection
                    hideEmpty={false}
                    header="Treinos Disponíveis"
                    list={trainingPageData?.activeTrainings || []}
                    cardRender={(training) => {
                        return (
                            <DragDrop
                                key={training.id}
                                index={training.id}
                                extraData={training}
                                group="training"
                                acceptTargetGroup={['weekday']}
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

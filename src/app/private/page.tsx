'use client'

import style from './page.module.scss'
import { useState } from 'react'
import { ArrayUtils } from '@/utils/array.utils'
import { DragDrop } from '@/components/dragDrop'
import { clsx } from 'clsx'
import Page from '@/components/page'

const PrivatePage = () => {
    const [items, setItems] = useState([
        'Michel',
        'Douglas',
        'Grigoli',
        'Jéssica',
        'Gomes',
    ])

    const [originPlace, setOriginPlace] = useState<number | null>(null)
    const [targetPlace, setTargetPlace] = useState<number | null>(null)

    return (
        <Page
            header={{
                header: 'Dashboard',
                pictures: [
                    'https://i0.wp.com/catagua.com.br/wp-content/uploads/2022/05/conheca-as-vantagens-de-morar-em-um-condominio-com-academia.jpg',
                ],
            }}
        >
            <div className={style.items}>
                {items.map((item, index) => {
                    return (
                        <DragDrop
                            group={index % 2 === 1 ? 'aaa' : 'bbb'}
                            index={index}
                            key={index}
                            className={clsx(
                                style.item,
                                originPlace === index && style.originPlace,
                                targetPlace === index && style.targetPlace
                            )}
                            onStart={(origin) => {
                                setOriginPlace(origin)
                            }}
                            onHover={(target) => {
                                setTargetPlace(target)
                            }}
                            onCancel={() => {
                                setOriginPlace(null)
                                setTargetPlace(null)
                            }}
                            onEnd={(origin, target) => {
                                setItems(
                                    ArrayUtils.move(
                                        items,
                                        parseInt(origin),
                                        parseInt(target)
                                    )
                                )
                                setOriginPlace(null)
                                setTargetPlace(null)
                            }}
                        >
                            Item: {item} <br />
                            Index: {index}
                        </DragDrop>
                    )
                })}
            </div>
        </Page>
    )
}

export default PrivatePage

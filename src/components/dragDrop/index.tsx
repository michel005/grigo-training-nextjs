import style from './index.module.scss'
import { DragDropType } from '@/components/dragDrop/index.type'
import { ReactNode, useContext, useState } from 'react'
import { clsx } from 'clsx'
import { ConfigContext } from '@/context/config/config.context'

export const DragDrop = ({
    group,
    acceptTargetGroup = [group],
    index,
    onStart,
    onHover,
    onLeave,
    onEnd,
    onCancel,
    className,
    onlyTarget,
    dropValidation = () => true,
    ...props
}: DragDropType) => {
    const { dragDropData, setDragDropData } = useContext(ConfigContext)
    const [hover, setHover] = useState<boolean>(false)

    return (
        <div
            {...props}
            draggable={!onlyTarget}
            data-index={index}
            data-group={group}
            className={clsx(
                style.dragDrop,
                className,
                hover && style.hover,
                onlyTarget && style.onlyTarget
            )}
            onDragStart={(e) => {
                setDragDropData({
                    index,
                    group,
                    acceptTargetGroup,
                })
                e.dataTransfer.effectAllowed = 'move'
                e.dataTransfer.dropEffect = 'move'
                e.dataTransfer.setDragImage(e.target as any, 14, 14)
                onStart?.(index)
            }}
            onDragOver={(e) => {
                setHover(true)
                e.preventDefault()
            }}
            onDragLeave={() => {
                setHover(false)
            }}
            onDragEnd={(e) => {
                const origin = e.dataTransfer.getData('index')
                setHover(false)
                onCancel?.(origin)
                setDragDropData(null)
            }}
            onDrop={(e) => {
                const origin = dragDropData?.index
                const acceptGroup = dragDropData?.acceptTargetGroup

                const targetGroup = (e.target as Element).getAttribute(
                    'data-group'
                )
                const targetIndex = (e.target as Element).getAttribute(
                    'data-index'
                )

                if (
                    acceptGroup?.includes(targetGroup || '') &&
                    dropValidation(dragDropData, origin, targetIndex)
                ) {
                    onEnd?.(origin, targetIndex)
                }
                setHover(false)
                setDragDropData(null)
            }}
        />
    )
}

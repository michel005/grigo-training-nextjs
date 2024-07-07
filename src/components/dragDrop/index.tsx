import style from './index.module.scss'
import { DragDropType } from '@/components/dragDrop/index.type'
import { useContext, useState } from 'react'
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
                onStart?.(index)
            }}
            onDragOver={(e) => {
                const origin = e.dataTransfer.getData('index')
                onHover?.(origin)
                e.preventDefault()
            }}
            onDragLeave={(e) => {
                setHover(false)
                onLeave?.()
            }}
            onDragEnd={(e) => {
                const origin = e.dataTransfer.getData('index')
                setHover(false)
                onCancel?.(origin)
            }}
            onDrop={(e) => {
                const origin = dragDropData.index
                const acceptGroup = dragDropData.acceptTargetGroup

                const targetGroup = (e.target as any).getAttribute('data-group')
                const targetIndex = (e.target as any).getAttribute('data-index')

                if (acceptGroup.includes(targetGroup)) {
                    onEnd?.(origin, targetIndex)
                    setHover(false)
                }
                setDragDropData(null)
            }}
        />
    )
}

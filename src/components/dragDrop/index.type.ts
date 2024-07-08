import React from 'react'

type DragDropEventHandlers = {
    onDrag?: (event: DragEvent) => void
    onDragCapture?: (event: DragEvent) => void
    onDragEnd?: (event: DragEvent) => void
    onDragEndCapture?: (event: DragEvent) => void
    onDragEnter?: (event: DragEvent) => void
    onDragEnterCapture?: (event: DragEvent) => void
    onDragExit?: (event: DragEvent) => void
    onDragExitCapture?: (event: DragEvent) => void
    onDragLeave?: (event: DragEvent) => void
    onDragLeaveCapture?: (event: DragEvent) => void
    onDragOver?: (event: DragEvent) => void
    onDragOverCapture?: (event: DragEvent) => void
    onDragStart?: (event: DragEvent) => void
    onDragStartCapture?: (event: DragEvent) => void
    onDrop?: (event: DragEvent) => void
    onDropCapture?: (event: DragEvent) => void
}

type OmitDragDrop<T> = Omit<T, keyof DragDropEventHandlers>

export interface DragDropType
    extends OmitDragDrop<
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >
    > {
    onlyTarget?: boolean
    group: string
    acceptTargetGroup?: string[]
    index: any
    onStart?: (origin: any) => void
    onHover?: (target: any) => void
    onCancel?: (origin: any) => void
    onLeave?: () => void
    onEnd?: (origin: any, target: any) => void
    dropValidation?: (dragDropData: any, origin: any, target: any) => boolean
}

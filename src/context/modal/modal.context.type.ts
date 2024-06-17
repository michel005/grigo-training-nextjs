export interface ModalContextType {
    allModals: Map<string, any>
    onCloseEvents: Map<string, () => void>
    open: (
        screen: string,
        type: string,
        value: any,
        onClose?: () => void
    ) => void
    close: (screen: string, type: string) => void
}

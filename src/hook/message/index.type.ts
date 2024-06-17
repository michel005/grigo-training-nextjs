export interface UseMessageType {
    message: (header: string, content: React.ReactNode) => void
    question: (
        header: string,
        content: React.ReactNode,
        onConfirm: () => void
    ) => void
}

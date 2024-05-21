import Button from '../button'
import Modal from '../modal'

export interface ConfirmationModalType {
    header: string
    content: React.ReactNode
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

const ConfirmationModal = ({
    header,
    content,
    open,
    onClose,
    onConfirm,
}: ConfirmationModalType) => {
    if (!open) {
        return <></>
    }

    return (
        <Modal
            variant="dialog"
            onClose={onClose}
            title={header}
            footer={
                <>
                    <Button variant="ghost" onClick={onClose}>
                        Não
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            onConfirm()
                            onClose()
                        }}
                    >
                        Sim
                    </Button>
                </>
            }
        >
            {content}
        </Modal>
    )
}

export default ConfirmationModal

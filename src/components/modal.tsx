import Background from './layout/background'
import Button from './button'
import { Icon } from './icon'

interface ModalType {
    title?: React.ReactNode
    onClose?: () => void
    children: React.ReactNode
    footer?: React.ReactNode
    variant?: 'form' | 'dialog'
    size?: 'small' | 'medium' | 'big'
    zIndex?: number
}

const Modal = ({
    title,
    onClose,
    children,
    footer,
    variant,
    size = 'medium',
    zIndex,
}: ModalType) => {
    return (
        <Background
            variant="blur"
            data-context="modal"
            data-context-variant={variant || 'form'}
            className="componentModal"
            center={true}
            style={{ zIndex }}
        >
            <div className={`componentModal__modalContent ${size}`}>
                <header>
                    <div className="componentModal__title">{title}</div>
                    {onClose && (
                        <Button
                            leftSpace={<Icon>close</Icon>}
                            variant="link"
                            onClick={onClose}
                        />
                    )}
                </header>
                <main>{children}</main>
                {!!footer && <footer>{footer}</footer>}
            </div>
        </Background>
    )
}

export default Modal

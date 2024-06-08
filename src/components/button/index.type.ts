import { GoogleIconType } from '@/types/GoogleIcon.type'

export interface ButtonType
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    leftIcon?: GoogleIconType
    rightIcon?: GoogleIconType
    onAsyncClick?: () => Promise<void>
}

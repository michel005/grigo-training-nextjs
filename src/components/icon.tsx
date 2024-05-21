import { GoogleIcons } from '@/types/GoogleIcons'

interface IconType
    extends Omit<
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLSpanElement>,
            HTMLSpanElement
        >,
        'children'
    > {
    children: string | GoogleIcons
}

export const Icon = ({ ...props }: IconType) => {
    return <span {...props} className={`componentIcon ${props.className}`} />
}

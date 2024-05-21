import { CSSProperties } from 'styled-components'

interface GridType
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    rowTemplate?: string
    columnTemplate?: string
}

const Grid = ({
    className,
    rowTemplate,
    columnTemplate,
    ...props
}: GridType) => {
    return (
        <div
            {...props}
            className={`componentGrid ${className}`}
            style={
                {
                    '--row-template': rowTemplate,
                    '--column-template': columnTemplate,
                    ...props.style,
                } as CSSProperties
            }
        />
    )
}

export default Grid

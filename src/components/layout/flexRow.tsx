interface FlexRowType
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    responsive?: boolean
}

const FlexRow = ({ className, responsive = false, ...props }: FlexRowType) => {
    return (
        <div
            {...props}
            className={`componentFlex flexRow ${responsive && 'responsive'} ${className}`}
        />
    )
}

export default FlexRow

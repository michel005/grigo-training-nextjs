interface FlexColumnType
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {}

const FlexColumn = ({ className, ...props }: FlexColumnType) => {
    return (
        <div {...props} className={`componentFlex flexColumn ${className}`} />
    )
}

export default FlexColumn

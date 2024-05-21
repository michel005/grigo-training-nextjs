interface ButtonGroupType
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {}

const ButtonGroup = ({ ...props }: ButtonGroupType) => {
    return (
        <div {...props} className={`componentButtonGroup ${props.className}`} />
    )
}

export default ButtonGroup

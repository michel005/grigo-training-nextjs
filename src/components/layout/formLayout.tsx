interface FormLayout
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    flexDirection?: 'column' | 'row'
}

const FormLayout = ({ flexDirection, ...props }: FormLayout) => {
    return (
        <div
            {...props}
            data-flex-direction={flexDirection || 'column'}
            className={`componentFormLayout ${props.className}`}
        />
    )
}

export default FormLayout

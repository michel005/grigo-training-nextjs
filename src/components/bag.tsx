interface BagType
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'error'
}

const Bag = ({ className, variant, ...props }: BagType) => {
    return (
        <div
            {...props}
            className={`componentBag ${variant || 'primary'} ${className}`}
        />
    )
}

export default Bag

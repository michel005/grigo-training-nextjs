interface BackgroundType
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    variant?: 'transparent' | 'blur'
    center?: boolean
}

const Background = ({
    className,
    variant,
    center,
    ...props
}: BackgroundType) => {
    return (
        <div
            {...props}
            className={`componentBackground ${variant || 'transparent'} ${className} ${center && 'center'}`}
        />
    )
}

export default Background

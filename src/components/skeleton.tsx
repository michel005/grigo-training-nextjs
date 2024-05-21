import { CSSProperties } from 'styled-components'

interface SkeletonType
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    height?: string | number
    width?: string | number
}

const Skeleton = ({ height, width, ...props }: SkeletonType) => {
    return (
        <div
            {...props}
            data-skeleton-component
            className={`componentSkeleton ${props.className}`}
            style={
                {
                    height: height ? `${height}px` : '100%',
                    minHeight: height ? `${height}px` : '100%',
                    minWidth: width ? `${width}px` : '100%',
                    width: width ? `${width}px` : '100%',
                    ...props.style,
                } as CSSProperties
            }
        />
    )
}

export default Skeleton

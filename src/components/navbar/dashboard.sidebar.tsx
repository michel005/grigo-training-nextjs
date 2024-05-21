import Button from '@/components/button'
import PageDefinition from '@/constants/pageDefinition'
import { useRouter } from 'next/navigation'

const DashboardSidebar = () => {
    const router = useRouter()

    return (
        <>
            {PageDefinition.filter((x) => !x.hide).map((page) => {
                return (
                    <Button
                        key={page.name}
                        onClick={() => router.push(page.path)}
                    >
                        {page.name}
                    </Button>
                )
            })}
        </>
    )
}

export default DashboardSidebar

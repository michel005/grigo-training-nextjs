'use client'

import Button from '@/components/button'
import { Icon } from '@/components/icon'
import FlexColumn from '@/components/layout/flexColumn'
import Grid from '@/components/layout/grid'
import Path from '@/components/path'
import PageDefinition, { AllPages } from '@/constants/pageDefinition'
import { useRouter } from 'next/navigation'
import './page.scss'

const HomePage = () => {
    const router = useRouter()

    return (
        <>
            <Path values={[AllPages.dashboard]} />
            <Grid columnTemplate="1fr 1fr 1fr 1fr" className="homePageCards">
                {PageDefinition.filter((x) => !x.hide)
                    .filter((x) => x.path !== '/')
                    .map((page) => {
                        return (
                            <FlexColumn
                                className="homePageCard"
                                key={page.name}
                            >
                                <img alt={page.name} src={page.picture || ''} />
                                <Button
                                    leftSpace={
                                        page.icon && <Icon>{page.icon}</Icon>
                                    }
                                    className="homePageCardOption"
                                    onClick={() => router.push(page.path)}
                                >
                                    {page.name}
                                </Button>
                            </FlexColumn>
                        )
                    })}
            </Grid>
        </>
    )
}

export default HomePage

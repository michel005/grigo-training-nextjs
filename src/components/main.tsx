'use client'

import PageDefinition from '@/constants/pageDefinition'
import { SessionContext } from '@/store/session.context'
import { StringUtils } from '@/utils/stringUtils'
import { usePathname } from 'next/navigation'
import { useContext, useEffect, useMemo, useRef } from 'react'
import Navbar from './navbar'
import Skeleton from './skeleton'
import Grid from '@/components/layout/grid'

const Main = ({ children }: { children: React.ReactNode }) => {
    const { currentUser, loading } = useContext(SessionContext)
    const ref = useRef<any>()
    const pathName = usePathname()

    const definition = useMemo(
        () =>
            PageDefinition.find((page) => {
                return StringUtils.comparePaths(pathName, page.path)
            }),
        [pathName]
    )

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = 0
        }
    }, [pathName])

    if (loading) {
        if (pathName === '/') {
            return (
                <div className="componentMain">
                    <Navbar />
                    <div className="componentMain__main" ref={ref}>
                        <main className="componentMain__centerMain">
                            <Skeleton height={42} />
                            <Grid
                                columnTemplate="1fr 1fr 1fr 1fr"
                                className="homePageCards"
                            >
                                {PageDefinition.filter((x) => !x.hide)
                                    .filter((x) => x.path !== '/')
                                    .map((_, key) => {
                                        return (
                                            <Skeleton
                                                key={key}
                                                className="homePageCard"
                                                style={{ outline: 'none' }}
                                                height={300}
                                            />
                                        )
                                    })}
                            </Grid>
                            <Grid
                                columnTemplate="1fr 1fr 1fr"
                                className="homePageCards"
                            >
                                {new Array(3).fill(null).map((_, key) => {
                                    return (
                                        <Skeleton
                                            key={key}
                                            className="homePageCard"
                                            style={{ outline: 'none' }}
                                            height={200}
                                        />
                                    )
                                })}
                            </Grid>
                        </main>
                    </div>
                </div>
            )
        }

        if (pathName === '/products') {
            return (
                <div className="componentMain">
                    <Navbar />
                    <Skeleton height={64} style={{ borderRadius: 0 }} />
                    <div className="componentMain__main" ref={ref}>
                        <main className="componentMain__centerMain">
                            <Skeleton height={42} />
                            <Skeleton height={24} width={200} />
                            <Grid
                                columnTemplate="repeat(5, 1fr)"
                                style={{ gap: '14px' }}
                            >
                                {new Array(5).fill(null).map((_, key) => (
                                    <Skeleton key={key} height={300} />
                                ))}
                            </Grid>
                            <Skeleton height={500} />
                        </main>
                    </div>
                </div>
            )
        }

        if (pathName === '/sell') {
            return (
                <div className="componentMain">
                    <Navbar />
                    <div className="componentMain__main" ref={ref}>
                        <main className="componentMain__centerMain">
                            <Skeleton height={42} />
                            <Skeleton height={500} />
                        </main>
                    </div>
                </div>
            )
        }

        return (
            <div className="componentMain">
                <Navbar />
                <Skeleton height={64} style={{ borderRadius: 0 }} />
                <div className="componentMain__main" ref={ref}>
                    <main className="componentMain__centerMain">
                        <Skeleton height={42} />
                        <Skeleton height={500} />
                    </main>
                </div>
            </div>
        )
    }

    if (!currentUser) {
        return (
            <div className="componentMain">
                <Navbar />
                <div className="componentMain__main" ref={ref}>
                    <main className="componentMain__centerMain">
                        {children}
                    </main>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="componentMain">
                <Navbar />
                {definition?.sidebar && (
                    <div
                        className="componentMain__sidebar"
                        data-context="sidebar"
                    >
                        <div className="componentMain__centerSidebar">
                            {definition?.sidebar}
                        </div>
                    </div>
                )}
                <main className="componentMain__main">
                    <div className="componentMain__centerMain">{children}</div>
                </main>
            </div>
        </div>
    )
}

export default Main

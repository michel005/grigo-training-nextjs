import { CacheProvider } from '@/store/cache.context'
import { ConfigProvider } from '@/store/config.context'
import { SessionProvider } from '@/store/session.context'
import { MockProvider } from '@/store/mock.context'

const Provider = ({ children }: { children: React.ReactElement }) => {
    return (
        <CacheProvider>
            <ConfigProvider>
                <SessionProvider>
                    <MockProvider>{children}</MockProvider>
                </SessionProvider>
            </ConfigProvider>
        </CacheProvider>
    )
}

export default Provider

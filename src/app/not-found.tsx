import Link from 'next/link'
import style from './not-found.module.scss'

export default function NotFound() {
    return (
        <div className={style.notFound}>
            <h1>404</h1>
            <section>
                <h2>Página não encontrada</h2>
                <p>
                    A página que você esta tentando acessar não existe ou foi
                    digitada incorretamente na barra de endereços.
                </p>
                <Link href="/">Voltar para o início</Link>
            </section>
        </div>
    )
}

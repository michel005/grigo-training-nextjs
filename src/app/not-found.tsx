import Link from 'next/link'

export default function NotFound() {
    return (
        <>
            <h1>404</h1>
            <p>Página não encontrada</p>
            <small>
                A página que você esta tentando acessar não existe ou foi
                digitada incorretamente na barra de endereços.
            </small>
            <Link href="/">Voltar para o início</Link>
        </>
    )
}

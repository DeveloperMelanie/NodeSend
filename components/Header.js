import { useEffect } from 'react'
import useAuth from 'hooks/useAuth'
import useApp from 'hooks/useApp'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
    const { token, getUser, user, logOut } = useAuth()
    const { clearAppState } = useApp()
    const router = useRouter()

    useEffect(() => {
        if (token) {
            getUser()
        }
    }, [token])

    const handleRedirect = () => {
        router.push('/')
        clearAppState()
    }

    return (
        <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
            <img
                src='/logo.svg'
                alt='NodeSend'
                onClick={handleRedirect}
                className='w-64 mb-8 md:mb-0 cursor-pointer'
            />

            <div className='flex items-center gap-2'>
                {user ? (
                    <>
                        <p>
                            Hola: <strong>{user.name}</strong>
                        </p>
                        <button
                            type='button'
                            onClick={logOut}
                            className='bg-black px-5 py-2 rounded-lg text-white font-bold uppercase'
                        >
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link href='/iniciar-sesion'>
                            <a className='bg-red-500 hover:bg-red-600 transition-colors px-5 py-2 rounded-lg text-white font-bold uppercase'>
                                Iniciar Sesión
                            </a>
                        </Link>
                        <Link href='/registrarse'>
                            <a className='bg-black px-5 py-2 rounded-lg text-white font-bold uppercase'>
                                Registrarse
                            </a>
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}

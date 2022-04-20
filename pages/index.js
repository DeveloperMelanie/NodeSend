import Link from 'next/link'
import useApp from 'hooks/useApp'

import Dropzone from 'components/Dropzone'
import Alert from 'components/Alert'

export default function Home() {
    const { fileMessage, url } = useApp()

    return (
        <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
            {url ? (
                <>
                    <p className='text-center text-2xl mt-10'>
                        <span className='font-bold text-red-700 text-3xl uppercase'>
                            Tu URL es:
                        </span>{' '}
                        {`${process.env.NEXT_PUBLIC_FRONTEND_URL}/enlaces/${url}`}
                    </p>
                    <button
                        type='button'
                        onClick={() =>
                            navigator.clipboard.writeText(
                                `${process.env.NEXT_PUBLIC_FRONTEND_URL}/enlaces/${url}`
                            )
                        }
                        className='bg-red-500 hover:bg-gray-900 transition-colors w-full p-2 text-white uppercase font-bold cursor-pointer mt-10'
                    >
                        Copiar Enlace
                    </button>
                </>
            ) : (
                <>
                    {fileMessage && <Alert />}
                    <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10'>
                        <Dropzone />
                        <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
                            <h2 className='text-4xl font-sans font-bold text-gray-800 my-4'>
                                Compartir archivos de forma sencilla y privada
                            </h2>
                            <p className='text-lg leading-loose'>
                                <span className='text-red-500 font-bold'>
                                    NodeSend
                                </span>{' '}
                                te permite compartir archivos con cifrado de
                                extremo a extremo y un archivo que es eliminado
                                después de ser descargado. Por lo que puedes
                                mantener lo que compartas en privado y
                                asegurarte de que tus cosas no permanezcan en
                                línea para siempre.
                            </p>
                            <Link href='/registrarse'>
                                <a className='flex text-red-500 hover:text-red-700 font-bold text-lg mt-4'>
                                    Crea tu cuenta y disfruta de privilegios
                                    extra
                                </a>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

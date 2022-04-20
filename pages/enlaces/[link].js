import { useState } from 'react'
import axiosClient from 'config/axios'
import useApp from 'hooks/useApp'

import Alert from 'components/Alert'

export default function Link({ link }) {
    const { showMessage, fileMessage } = useApp()

    const [hasPassword, setHasPassword] = useState(link.password)
    const [password, setPassword] = useState('')
    const [url, setUrl] = useState(link.url)

    const handleVerifyPassword = async e => {
        e.preventDefault()
        if (!password.trim()) {
            return showMessage(
                'Si no me das la contraseña no verás el archivo 👌'
            )
        }

        try {
            const { data } = await axiosClient.post(`/links/${link.link}`, {
                password,
            })

            setUrl(data.url)
            setHasPassword(false)
        } catch (error) {
            showMessage(error.response.data.msg)
        }
    }

    return hasPassword ? (
        <>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <p className='text-center mb-4'>
                        Este enlace se encuentra protegido por una contraseña, a
                        ver si te la sabes 🤨
                    </p>
                    {fileMessage && <Alert />}
                    <form
                        onSubmit={handleVerifyPassword}
                        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                    >
                        <div className='mb-4'>
                            <label
                                htmlFor='password'
                                className='block text-black text-sm font-bold mb-2'
                            >
                                Contraseña
                            </label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                placeholder='Contraseña del enlace'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
                            />
                        </div>

                        <input
                            type='submit'
                            className='bg-red-500 hover:bg-gray-900 transition-colors w-full p-2 text-white uppercase font-bold cursor-pointer'
                            value='Verificar'
                        />
                    </form>
                </div>
            </div>
        </>
    ) : (
        <>
            <h1 className='text-4xl text-center text-gray-700'>
                Descarga tu archivo:
            </h1>
            <div className='flex items-center justify-center mt-10'>
                <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}/files/${url}`}
                    className='bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer'
                >
                    Aquí
                </a>
            </div>
        </>
    )
}

export const getServerSideProps = async ({ params }) => {
    const { link } = params

    try {
        const { data } = await axiosClient.get(`/links/${link}`)
        return {
            props: {
                link: data,
            },
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/',
            },
        }
    }
}

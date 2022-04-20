import { useEffect } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import useAuth from 'hooks/useAuth'

import Alert from 'components/Alert'

export default function Login() {
    const { logIn, message, authenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (authenticated) {
            router.push('/')
        }
    }, [authenticated])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Eso no es un email 🤨')
                .required('Necesito tu email'),
            password: Yup.string().required('Necesito tu contraseña'),
        }),
        onSubmit: values => {
            logIn(values)
        },
    })

    return (
        <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
            <h2 className='text-4xl font-sans font-bold text-gray-800 text-center my-10'>
                Iniciar Sesión
            </h2>

            {message && <Alert />}
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form
                        onSubmit={formik.handleSubmit}
                        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                    >
                        <div className='mb-4'>
                            <label
                                htmlFor='email'
                                className='block text-black text-sm font-bold mb-2'
                            >
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Email de Usuario'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Hay un problema</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null}
                        </div>
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
                                placeholder='Contraseña de Usuario'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none'
                            />
                            {formik.touched.password &&
                            formik.errors.password ? (
                                <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Hay un problema</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null}
                        </div>

                        <input
                            type='submit'
                            className='bg-red-500 hover:bg-gray-900 transition-colors w-full p-2 text-white uppercase font-bold cursor-pointer'
                            value='Iniciar Sesión'
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

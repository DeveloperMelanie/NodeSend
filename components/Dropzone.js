import { useDropzone } from 'react-dropzone'
import useApp from 'hooks/useApp'
import useAuth from 'hooks/useAuth'

import Form from './Form'

export default function Dropzone() {
    const { authenticated } = useAuth()
    const { loading, showMessage, createLink } = useApp()

    const onDropRejected = () => {
        showMessage(
            authenticated
                ? 'Tu archivo supera nuestro límite de tamaño (10MB), intenta comprimir el archivo y subirlo de nuevo'
                : 'Tu archivo supera nuestro límite de tamaño (1MB), regístrate para subir archivos más grandes 👌'
        )
    }

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
        useDropzone({
            onDropRejected,
            maxSize: authenticated ? 10 * 1024 * 1024 : 1024 * 1024,
        })

    const file = acceptedFiles.map(file => (
        <li
            key={file.lastModified}
            className='bg-white flex-1 p-3 mb-4 shadow-lg rounded text-center'
        >
            <p className='font-bold text-xl'>{file.path}</p>
            <p className='text-sm text-gray-500'>
                {(file.size / Math.pow(1024, 2)).toFixed(1)} MB
            </p>
        </li>
    ))

    const uploadFileAndCreateLink = () => {
        const formData = new FormData()
        formData.append('file', acceptedFiles[0])

        createLink(formData, acceptedFiles[0].path)
    }

    return (
        <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100'>
            {acceptedFiles.length > 0 ? (
                <div className='w-full px-4 py-5'>
                    <h4 className='text-2xl font-bold text-center mb-4'>
                        Archivo
                    </h4>
                    <ul>{file}</ul>

                    {authenticated && <Form />}

                    {loading ? (
                        <p className='my-10 text-center text-gray-600'>
                            Estoy subiendo tu archivo, dame un momento...
                        </p>
                    ) : (
                        <button
                            type='button'
                            onClick={uploadFileAndCreateLink}
                            className='bg-blue-500 hover:bg-blue-600 transition-colors w-full py-3 rounded-lg text-white my-10 mb-0'
                        >
                            Crear Enlace
                        </button>
                    )}
                </div>
            ) : (
                <div
                    {...getRootProps({
                        className:
                            'dropzone flex flex-1 items-center justify-center w-full py-32 px-4',
                    })}
                >
                    <input className='h-100' {...getInputProps()} />

                    {isDragActive ? (
                        <p className='text-2xl text-center text-gray-600'>
                            Suelta el archivo
                        </p>
                    ) : (
                        <div className='text-center'>
                            <p className='text-2xl text-gray-600'>
                                Selecciona un archivo o arrástralo aquí
                            </p>
                            <button
                                type='button'
                                className='bg-blue-500 hover:bg-blue-600 transition-colors w-full py-3 rounded-lg text-white my-10 mb-0'
                            >
                                Seleccionar archivo
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

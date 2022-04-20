import { useState } from 'react'
import useApp from 'hooks/useApp'

export default function Form() {
    const { addPassword, addDownloads } = useApp()

    const [hasPassword, setHasPassword] = useState(false)

    return (
        <div className='w-full mt-20'>
            <div>
                <label htmlFor='downloads' className='text-lg text-gray-800'>
                    Eliminar tras:
                </label>
                <select
                    id='downloads'
                    onChange={e => addDownloads(+e.target.value)}
                    className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none'
                >
                    <option value='' selected disabled className='hidden'>
                        -- Elige --
                    </option>
                    <option value='1'>1 descarga</option>
                    <option value='5'>5 descargas</option>
                    <option value='10'>10 descargas</option>
                    <option value='20'>20 descargas</option>
                </select>
            </div>

            <div className='mt-4'>
                <div className='flex justify-between items-center'>
                    <label
                        htmlFor='password'
                        className='text-lg text-gray-800 mr-2'
                    >
                        Proteger con contraseña:
                    </label>
                    <input
                        type='checkbox'
                        id='password'
                        onChange={() => setHasPassword(!hasPassword)}
                    />
                </div>
                {hasPassword && (
                    <input
                        type='password'
                        placeholder='Contraseña'
                        onChange={e => addPassword(e.target.value)}
                        className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 mr-8 rounded leading-none focus:outline-none'
                    />
                )}
            </div>
        </div>
    )
}

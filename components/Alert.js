import useAuth from 'hooks/useAuth'
import useApp from 'hooks/useApp'

export default function Alert() {
    const { message } = useAuth()
    const { fileMessage } = useApp()

    return (
        <div className='bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto'>
            {message || fileMessage}
        </div>
    )
}

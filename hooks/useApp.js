import { useContext } from 'react'
import AppContext from 'context/app/appContext'

export default function useApp() {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useApp must be used within a AuthProvider')
    }
    return context
}

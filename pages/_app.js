import Head from 'next/head'

import AuthState from 'context/auth/authState'
import AppState from 'context/app/appState'
import Header from 'components/Header'

import 'styles/globals.css'

export default function NodeSend({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>NodeSend</title>
                <link rel='icon' href='/logo.svg' />
            </Head>

            <AuthState>
                <AppState>
                    <div className='bg-gray-100 min-h-screen'>
                        <div className='container mx-auto'>
                            <Header />
                            <main className='mt-20'>
                                <Component {...pageProps} />
                            </main>
                        </div>
                    </div>
                </AppState>
            </AuthState>
        </>
    )
}

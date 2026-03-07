import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Search() {
    const [searchParam] = useSearchParams()
    console.log(searchParam.get('title'))
    return (
        <main className="w-full flex py-20 min-h-screen gap-15">
            <section className='flex justify-center w-275 py-8'>

            </section>
            <aside className='aside w-110 border-l-2 border-stone-300 fixed right-0 px-10 py-8 h-screen overflow-y-auto'>
                            
            </aside>
        </main>
    )
}

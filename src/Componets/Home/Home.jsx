import React from 'react'

import { DataProvider } from './Context/DataContext'
import HomeIndex from './HomeIndex'

export default function Home() {
  
 

    return (
        <DataProvider>
            <HomeIndex />
        </DataProvider>

    )
}

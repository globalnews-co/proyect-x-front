import React from 'react'
import ListClientes from './ReadClient/ListClientes'
import { DataProvider } from './Context/DataContext'

export default function Page() {
  return (
    <DataProvider>
        <ListClientes/>
    </DataProvider>
  )
}

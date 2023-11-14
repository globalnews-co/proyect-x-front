import React from 'react'
import { DataProvider } from './Context/DataContext'
import AgendaIndex from './AgendaIndex'

export default function Agenda() {
  return (
    <DataProvider>
        <AgendaIndex/>
    </DataProvider>
  )
}


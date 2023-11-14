import React, { createContext, useState } from 'react'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <DataContext.Provider
            value={{
                showModal, setShowModal
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

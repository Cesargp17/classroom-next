import React, { useState } from 'react'
import { UIContext } from './UIContext'

export const UIProvider = ({ children }) => {

    const [OpenJoinClass, setOpenJoinClass] = useState(false);
    const [OpenCreateClass, setOpenCreateClass] = useState(false);

  return (
    <UIContext.Provider value={{ OpenJoinClass, setOpenJoinClass, OpenCreateClass, setOpenCreateClass }}>
        { children }
    </UIContext.Provider>
  )
}

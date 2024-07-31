import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createContext } from 'react'

export const HistoryContext=createContext();

const HistoryProvider = ({children}) => {

    const [history,setHistory] = useState([])
    const [savedIds,setSavedIds]=useState([])

  return (
    <HistoryContext.Provider value={{history,setHistory}}>
        {children}
    </HistoryContext.Provider>
  )
}

export default HistoryProvider

const styles = StyleSheet.create({})
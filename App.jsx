import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon, { Icons } from './assets/Icons/Icons'
import HomeScreen from './src/Screens/Home'
import HistoryProvider from './context/HistoryContext'
import { NavigationContainer } from '@react-navigation/native'
import { MyTabs } from './src/Navigators/bottomNavigation'
const App = () => {
  return (
    <NavigationContainer>
    <HistoryProvider>
      <MyTabs/>
      </HistoryProvider>
      </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})
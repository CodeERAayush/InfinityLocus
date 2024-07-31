import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Txt = ({data,style}) => {
  return (
      <Text 
      allowFontScaling={false}
      style={style}>{data}</Text>
  )
}

export default Txt

const styles = StyleSheet.create({})
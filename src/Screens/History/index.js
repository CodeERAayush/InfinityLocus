import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { HistoryContext } from '../../../context/HistoryContext'
import { Colors } from '../../constants/Colors'
import HistoryCard from '../../Components/HistoryCard'

const History = () => {

    const { history, setHistory } = useContext(HistoryContext)

    const renderItem = ({ item }) => <HistoryCard
        weatherdata={item}
    />

    return (
        <View style={styles?.container}>
            <FlatList
                data={history}
                keyExtractor={(item, index) => index}
                renderItem={renderItem}
            />
        </View>
    )
}

export default History

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors?.White,
    }
})
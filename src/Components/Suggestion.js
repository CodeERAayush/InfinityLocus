import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import Txt from '../Reusables/Txt'
import { widthPxToDP } from '../constants/screen'
import { Colors } from '../constants/Colors'

const Suggestion = ({item,onPress}) => {

    const {name,state,country}=item??{};
    console.log(item)

  return (
    <View style={styles.suggestionHolder}>
                <Pressable 
                onPress={onPress}
                style={{padding:10,borderBottomWidth:1,width:'90%',alignSelf:'center'}}>
                    <Txt
                    data={`${name}, ${state}, ${country}`}
                    style={styles.suggestionTxt}
                    />
                    </Pressable>
            </View>
  )
}

export default Suggestion

const styles = StyleSheet.create({
    suggestionHolder:{
        width: '90%',
        borderRadius:10,
        backgroundColor:Colors?.White,
        elevation:5,
        padding:10,
        marginVertical:5
    },
    suggestionTxt:{
        color:Colors?.Black,
        fontSize:widthPxToDP(15),
    }
})
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors';
import { heightPxToDP } from '../constants/screen';
import Icon,{Icons} from '../../assets/Icons/Icons';
import Txt from '../Reusables/Txt';


const HistoryCard = ({weatherdata}) => {
  return (
    <View style={styles?.weatherData}>
                    <Txt
                        data={weatherdata?.weather[0]?.description}
                        style={styles?.txt}
                    />
                    <Txt
                        data={`${weatherdata?.name}, ${weatherdata?.sys?.country}`}
                        style={styles?.txt}
                    />
                    <Txt
                        data={`Visibility: ${weatherdata?.visibility}`}
                        style={styles?.txt}
                    />

                    <View style={{ flexDirection: 'row', marginVertical: heightPxToDP(15), width: '80%', alignSelf: 'center', borderWidth: 1, padding: 10, justifyContent: 'space-evenly' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Icon
                                type={Icons?.Entypo}
                                name='water'
                                color={Colors?.Black}
                            />
                            <Txt data={'Humidity'} style={{ color: 'gray' }} />
                            <Txt
                                data={weatherdata?.main.humidity}
                                style={{ marginTop: 10, color: Colors?.Black }}
                            />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Icon
                                type={Icons?.MaterialIcons}
                                name='touch-app'
                                color={Colors?.Black}
                            />
                            <Txt data={'Feels Like'} style={{ color: 'gray' }} />
                            <Txt
                                data={`${weatherdata?.main.feels_like} F`}
                                style={{ marginTop: 10, color: Colors?.Black }}
                            />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Icon
                                type={Icons?.FontAwesome5}
                                name='temperature-high'
                                color={Colors?.Black}
                            />
                            <Txt data={'Temperature'} style={{ color: 'gray' }} />
                            <Txt
                                data={`${weatherdata?.main.temp} F`}
                                style={{ marginTop: 10, color: Colors?.Black }}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: heightPxToDP(15), width: '80%', alignSelf: 'center', borderWidth: 1, padding: 10, justifyContent: 'space-evenly' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Icon
                                type={Icons?.Feather}
                                name='sunrise'
                                color={Colors?.Black}
                            />
                            <Txt data={'sunset'} style={{ color: 'gray' }} />
                            <Txt
                                data={new Date(weatherdata?.sys.sunrise).toLocaleTimeString()}
                                style={{ marginTop: 10, color: Colors?.Black }}
                            />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Icon
                                type={Icons?.Feather}
                                name='sunset'
                                color={Colors?.Black}
                            />
                            <Txt data={'sunset'} style={{ color: 'gray' }} />
                            <Txt
                                data={new Date(weatherdata?.sys.sunset).toLocaleTimeString()}
                                style={{ marginTop: 10, color: Colors?.Black }}
                            />
                        </View>
                    </View>

                </View>
  )
}

export default HistoryCard

const styles = StyleSheet.create({
    weatherData: {
        marginTop: heightPxToDP(10),
        width: '98%',
        alignSelf:'center',
        borderWidth:1,
        borderRadius:5,
        marginVertical:5

    },
    main_image: {
        height: heightPxToDP(80),
        width: heightPxToDP(80),
        alignSelf: 'center',

    },
    txt: {
        fontSize: 15,
        color: Colors?.Black,
        marginVertical: 10,
        textAlign: 'center',

    }, 
})
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import { useCallback, useContext, useEffect, useState } from 'react';
import React from 'react'
import { Colors } from '../../constants/Colors';
import { heightPxToDP, widthPxToDP } from '../../constants/screen';
import Icon, { Icons } from '../../../assets/Icons/Icons';
import { API } from '../../constants/api';
import { debounce } from 'lodash'
import Txt from '../../Reusables/Txt';
import Suggestion from '../../Components/Suggestion';
import axios from 'axios';
import { HistoryContext } from '../../../context/HistoryContext';
import { Images } from '../../../assets/Images';
const HomeScreen = () => {

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [locationData, setLocationData] = useState([])
    const [weatherdata, setWheatherData] = useState(null)
    const [imageUri, setImageUri] = useState('')
    const [error, setError] = useState(false)

    const { history, setHistory, savedIds, setSavedIds } = useContext(HistoryContext);


    const saveHistory = () => {


        setHistory([...history, weatherdata])

        ToastAndroid.show("History Saved!", 1000)
    }


    const callSearchData = async (value) => {
        setLoading(true)
        if (!value) {
            setLocationData([])
            return;
        }
        let url = `${API.GET_GEOCODE_DATA}?q=${value}&limit=5&appid=${API.API_KEY}`
        axios.get(url)
            .then((response) => {
                console.log(response?.data)
                setLocationData(response?.data);
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false))
    }

    const handleTextDebounce = useCallback(
        debounce(callSearchData, 500)
        , [])

    const getWeatherData = async (data) => {

        setLocationData([])
        setQuery("")
        setLoading(true)
        const { lat, lon } = data
        let url = `${API.WEATHER_DATA}?lat=${lat}&lon=${lon}&appid=${API.API_KEY}`
        console.log(url);
        let response = await axios(url);
        setLoading(false)
        setWheatherData(response?.data)
        setImageUri(`${API.ICON_URI}${response?.data?.weather[0]?.icon}@4x.png`)

    }

    return (
        <View style={styles.main_screen}>
            <View style={styles.searchHolder}>
                <TextInput
                    placeholder='Enter City Name'
                    style={styles.textInput}
                    onChangeText={handleTextDebounce}
                    placeholderTextColor={Colors?.Black}
                    color={Colors.Black}
                />
                <Pressable
                    onPress={() => callSearchData()}
                    style={{ backgroundColor: Colors?.White, padding: widthPxToDP(10), borderRadius: heightPxToDP(100), elevation: 5 }}
                >
                    <Icon
                        type={Icons?.Feather}
                        name="search"
                        color={Colors?.Black}
                        size={widthPxToDP(30)}
                    />
                </Pressable>
            </View>
            {
                locationData.length > 0 ?
                    locationData.map((item, index) => {
                        return <Suggestion
                            item={item}
                            key={index}
                            onPress={() => getWeatherData(item)}
                        />
                    })
                    : null
            }
            {loading ? <ActivityIndicator
                size={'large'}
            /> : weatherdata ?
                <View style={styles?.weatherData}>
                    {
                        error ? <Image
                            source={Images.defaultImg}
                            style={styles?.main_image}
                        /> :
                            imageUri ? <Image
                                source={{ uri: imageUri }}
                                style={styles?.main_image}
                                onError={(e) => setError(true)}
                            /> : null}
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

                    <View style={styles?.util}>
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
                    <View style={styles?.util}>
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

                    <View>
                        <Pressable
                            onPress={saveHistory}
                            style={styles?.save_his_btn}>
                            <Icon
                                type={Icons?.MaterialIcons}
                                name="save"
                                color={Colors?.Black}
                            />
                            <Txt
                                data={'Save History'}
                                style={{ color: Colors?.Black }}
                            />
                        </Pressable>
                    </View>

                </View> : <Text>No Data</Text>}

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    main_screen: {
        flex: 1,
        backgroundColor: Colors?.White,
        alignItems: 'center',
    },
    textInput: {
        width: '80%',
        alignSelf: 'center',
        height: heightPxToDP(50),
        elevation: 5,
        borderRadius: widthPxToDP(20),
        backgroundColor: Colors?.White,
        marginVertical: heightPxToDP(5)
    },
    txt: {
        fontSize: 15,
        color: Colors?.Black,
        marginVertical: 10,
        textAlign: 'center',

    },
    searchHolder: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    },
    weatherData: {
        marginTop: heightPxToDP(10),
        flex: 1,
        width: '100%'

    },
    main_image: {
        height: heightPxToDP(80),
        width: heightPxToDP(80),
        alignSelf: 'center',

    },
    suggestion_holder: {
        position: 'absolute',
        top: heightPxToDP(50),
        flex: 1,
    },
    util:{ flexDirection: 'row', marginVertical: heightPxToDP(15), width: '80%', alignSelf: 'center', borderWidth: 1, padding: 10, justifyContent: 'space-evenly' },
    save_his_btn:{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }
})
import { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, useWindowDimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CustomMarker from './components/marker';
import FlatlistItem from "./components/FlatlistItem";
import DATA from './assets/data/DummyData';
import { icons } from './constants';
// import Constants from 'expo-constants';
// import * as Location from 'expo-location';

// let apiKey = 'YOUR_API_KEY';

export default function App() {

  const places = DATA.chargers
  const flatlist = useRef();
  const map = useRef();
  const onViewChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const selectedPlace = viewableItems[0].item;
      setSelectedPlaceId(selectedPlace.id)
    }
  })
  const width = useWindowDimensions().width;
  const viewConfig = useRef({ itemVisiblePercentThreshold: 70 })
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  useEffect(() => {
    if (!selectedPlaceId || !flatlist) {
      return;
    }
    const index = DATA.chargers.findIndex(place => place.id === selectedPlaceId)
    flatlist.current.scrollToIndex({ index })

    const selectedPlace = DATA.chargers[index];
    const region = {
      latitude: selectedPlace.latitude,
      longitude: selectedPlace.longitude,
      latitudeDelta: 0.8,
      longitudeDelta: 0.8,
    }
    map.current.animateToRegion(region);
  }, [selectedPlaceId])


  // GET LIVE LOCATION 

  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);
  // const [address, setAddress] = useState(null);
  // const [getLocation, setGetLocation] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //     }

  //     Location.setGoogleApiKey(apiKey);

  //     console.log(status);

  //     let { coords } = await Location.getCurrentPositionAsync();

  //     setLocation(coords);

  //     console.log(coords);

  //     if (coords) {
  //       let { longitude, latitude } = coords;

  //       let regionName = await Location.reverseGeocodeAsync({
  //         longitude,
  //         latitude,
  //       });
  //       setAddress(regionName[0]);
  //       console.log(regionName, 'nothing');
  //     }

  //     // console.log();
  //   })();
  // }, [getLocation]);

  const initialRegion = {
    latitude: 28.476335498070025,
    longitude: 77.0179819682911,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  }

  const myLocation = {
    latitude: 28.476335498070025,
    longitude: 77.0179819682911,
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        ref={map}
        initialRegion={initialRegion}
        style={styles.map}
        showsUserLocation={true}
      >
        <Marker coordinate={myLocation}>
          <View style={styles.myLocationIconContainer}>
            <Image source={icons.myLocation} style={styles.myLocationIcon} />
          </View>
        </Marker>
        {places.map((place) => (
          <CustomMarker
            coordinate={{
              latitude: Number(place.latitude),
              longitude: Number(place.longitude),
            }}
            isSelected={place.id === selectedPlaceId}
            onPress={() => setSelectedPlaceId(place.id)}
            id={place.id}
          />)
        )}
      </MapView>
      <View style={styles.topContainer}>
        <TouchableOpacity>
          <Image source={icons.menu} style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <View style={styles.searchContainerLeft}>
            <Image source={icons.circle} style={styles.dot} />
            <TextInput
              placeholder="Search for the compatible chargers"
              placeholderTextColor={"#ffffff"}
              style={styles.textInput}
            />
          </View>
          <Image source={icons.filter} style={styles.filterIcon} />
        </View>
      </View>

      <View style={styles.flatlistContainer}>

        {/* BUTTON TO ASK CURRENT LOCATION  */}

        {/* <Text style={styles.button}>
          {!location
            ? 'Waiting'
            : `Lat: ${location.latitude} \nLong: ${location.longitude
            } \n${JSON.stringify(address?.["subregion"])}`}
        </Text>
        <TouchableOpacity onPress={() => setGetLocation(!getLocation)}>
          <View
            style={{
              height: 24,
              backgroundColor: '#1D1E27',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginTop: 20,
              width: '40%',
              alignSelf: 'center'
            }}>
            <Text style={styles.btnText}> GET LOCATION </Text>
          </View>
        </TouchableOpacity> */}

        <FlatList
          ref={flatlist}
          data={DATA.chargers}
          renderItem={({ item }) => <FlatlistItem post={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width - 120}
          snapToAlignment={"center"}
          decelerationRate={"fast"}
          viewabilityConfig={viewConfig.current}
          onViewableItemsChanged={onViewChanged.current}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  },
  myLocationIconContainer: {
    width: 40,
    height: 40,
  },
  myLocationIcon: {
    width: 25,
    height: 25,
    tintColor: '#df3168',
    resizeMode: 'contain'
  },
  button: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  topContainer: {
    position: 'absolute',
    top: 60,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#1B1B1B',
    resizeMode: 'contain'
  },
  searchContainer: {
    width: '85%',
    backgroundColor: '#1D1E27',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  searchContainerLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    width: 12,
    height: 12,
    tintColor: '#44D7B6',
    resizeMode: 'contain'
  },
  textInput: {
    paddingLeft: 10,
    fontSize: 12,
    color: '#ffffff'
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: '#44D7B6',
    resizeMode: 'contain'
  },
  flatlistContainer: {
    position: 'absolute',
    bottom: 10
  },
});

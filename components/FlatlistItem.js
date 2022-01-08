import React from 'react';
import { View, Text, Image, useWindowDimensions, Pressable, StyleSheet } from "react-native";
import { icons } from '../constants';

const Post = (props) => {
    const post = props.post;
    const width = useWindowDimensions().width;

    return (
        <Pressable style={[styles.container, { width: width - 120 }]}>
            <View style={styles.innerContainer}>
                <View style={styles.mainBody}>

                    <View style={styles.topContainer}>
                        <View style={styles.leftConatiner}>
                            <Text numberOfLines={1} style={styles.titleText}>
                                {post.name}
                            </Text>
                            <View style={styles.addressContainer}>
                                <View style={styles.addressContainerLeft}>
                                    <Text numberOfLines={1}
                                        style={styles.addressText}>
                                        {post.address}
                                    </Text>
                                </View>
                                <View style={styles.addressContainerRight}>
                                    <Text style={[styles.addressText, { color: '#DB3E6F', paddingLeft: 10 }]}>
                                        {(post.distance / 1000).toFixed(1)} Km
                                    </Text>
                                </View>

                            </View>
                        </View>
                        <Image source={icons.direct} style={styles.directionIcon} />
                    </View>


                    <Text style={styles.supportText}>
                        SUPPORTED CONNECTORS
                    </Text>

                    {(post.connector_types).map((connectorTypes) => (
                        <View style={styles.levelContainer}>
                            <View style={styles.levelContainerLeft}>
                                <Image source={icons.charging} style={styles.chargingIcon} />
                                <View style={{ paddingLeft: 10 }}>
                                    <Text style={{ color: '#ffffff', }}>
                                        {
                                            ((connectorTypes)
                                                .replace(/-/g, "")
                                                .replace(/lvl1dc/g, "Level 1 DC")
                                                .replace(/lvl2dc/g, "Level 2 DC")
                                                .replace(/normalac/g, "Normal AC"))
                                                .slice(0, -1)
                                        }
                                    </Text>
                                    <Text style={{ color: '#3AAA93', fontSize: 12 }}>
                                        15kW Fast Charging
                                    </Text>
                                </View>
                            </View>

                            <Text style={{ color: '#ffffff', fontSize: 16 }}>
                                x{
                                    ((connectorTypes)
                                        .replace(/-/g, "")
                                        .replace(/lvl1dc/g, "Level 1 DC")
                                        .replace(/lvl2dc/g, "Level 2 DC")
                                        .replace(/normalac/g, "Normal AC"))
                                        .slice(-1)
                                }
                            </Text>

                        </View>
                    ))}
                </View>
                <Image source={icons.down} style={styles.downIcon} />
            </View>
        </Pressable>
    );
};

export default Post;

const styles = StyleSheet.create({
    container: {
        padding: 5,
        elevation: 10,
    },
    innerContainer: {
        backgroundColor: '#1D1E27',
        borderRadius: 10,
    },
    mainBody: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: '#1D1E27',
        borderRadius: 10,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftConatiner: {
        width: '80%'
    },
    addressContainer: {
        flexDirection: 'row',
        color: '#888B8D',
        fontSize: 12,
        alignItems: 'center'
    },
    addressContainerLeft: {
        width: '60%'
    },
    addressContainerRight: {
        width: '40%'
    },
    details: {
        color: '#ffffff',
        fontSize: 12
    },
    titleText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    addressText: {
        color: '#ffffff',
        fontSize: 12,
        color: '#888B8D',
        fontSize: 12.5
    },
    directionIcon: {
        width: 30,
        height: 30,
        tintColor: '#DB3E6F',
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    supportText: { 
        color: '#3AAA93', 
        paddingVertical: 8, 
        fontSize: 12
     },
    levelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4
    },
    levelContainerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chargingIcon: {
        width: 30,
        height: 30,
        tintColor: '#ffffff',
        alignSelf: 'center',
        marginBottom: 0,
        resizeMode: 'contain'
    },
    downIcon: {
        width: 18,
        height: 18,
        tintColor: '#ffffff',
        alignSelf: 'center',
        marginBottom: 10,
        resizeMode: 'contain'
    }
});

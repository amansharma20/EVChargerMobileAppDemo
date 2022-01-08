import React from "react";
import { View, Text } from "react-native";
import { Marker } from "react-native-maps";

const CustomMarker = (props) => {
    const { coordinate, isSelected, id } = props;
    return (
        <Marker coordinate={coordinate} >
            <View style={{
                backgroundColor: isSelected ? "#44D7B6" : "#6C7177",
                padding: 5,
                borderRadius: 20,
            }}>
                <Text style={{
                    color: isSelected ? "black" : "white",
                    fontWeight: "bold"
                }}>{id}</Text>
            </View>
        </Marker>
    );
};

export default CustomMarker;
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-community/picker'

function UnitsPicker({ units, setUnits }) {
    const title = units === "metric" ? "C°" : "F°"
    return (
        <View style={styles.container}>
            {/* <Text style={styles.pickerTitle}>
               {title}
            </Text> */}
            <Picker style={{ width: 100, height: 100 }} mode="dropdown" selectedValue
                selectedValue={units} onValueChange={(u) => setUnits(u)}>
                <Picker.Item label="C°" value="metric" />
                <Picker.Item label="F°" value="imperial" />

            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: "center" },
    pickerTitle: { alignItems: 'center' }
})

export default UnitsPicker;
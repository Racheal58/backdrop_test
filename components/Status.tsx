import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { fullHeight } from '../misc/functions';

const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight

export const Status = ({ children }: { children: React.ReactNode }) => {
    return (
        <View style={styles.centralize}>
            {children}
        </View>
    )
}

export const styles = StyleSheet.create({
    centralize: {
        flex: 1,
        height: fullHeight - 150,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
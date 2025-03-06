import {StyleSheet, Text} from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { color, getFontFamily, scaling } from '../../themes/themes'
import LinearGradient from 'react-native-linear-gradient'

const {horizontalScale, verticalScale, fontScale} = scaling


const MeasureType = ({type=''}) => {
    const {theme} = useTheme()
  return (
    <LinearGradient
        useAngle={true}
        angle={274}
        locations={[-0.84, 1.42]}
        colors={[theme.linearType2Clr1, theme.linearType2Clr2]}
        style={[styles.measureContainer ]}>
        <Text style={styles.measureText}>{type}</Text>
    </LinearGradient>
  )
}

export default MeasureType

const styles = StyleSheet.create({
    measureContainer: {
        borderRadius: horizontalScale(15),
        width: horizontalScale(45),
        height: horizontalScale(45),
        alignItems: 'center',
        justifyContent: 'center'
    },
    measureText: {
        fontFamily: getFontFamily('Poppins', '500'),
        fontSize: fontScale(13),
        color: color.white,
        textTransform: 'uppercase',
        lineHeight: fontScale(18)
    }
})
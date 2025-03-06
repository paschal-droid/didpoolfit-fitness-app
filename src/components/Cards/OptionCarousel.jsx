import { Dimensions, Image, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'

import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '../../context/ThemeContext'
import { scaling, getFontFamily, color } from '../../themes/themes'

const {horizontalScale, verticalScale, fontScale} = scaling

const {width, height} = Dimensions.get('window')

const OptionCarousel = ({item}) => {
    const {theme} = useTheme()
    const appTheme = useColorScheme() === 'dark'
  return (
    <LinearGradient
        useAngle={true}
        angle={274}
        style={[styles.carousel]}
        locations={[0, 1.25]}
        colors={[theme.linearType1Clr1, theme.linearType1Clr2]}
    >
        <Image style={[styles.carouselImage]} source={appTheme ? item.images.dark : item.images.light} />
        <View style={styles.carouselInfoContainer}>
            <View style={[styles.carouselOption]}>
                <Text style={[styles.title]}>{item.title}</Text>
                <View style={[styles.line, {backgroundColor: theme.input}]} />
            </View>
            <Text style={[styles.optionDetail]}>{item.details}</Text>
        </View>

    </LinearGradient>
        
  )
}

export default OptionCarousel

const styles = StyleSheet.create({
    carousel: {
        alignItems: 'center',
        borderRadius: horizontalScale(22),
        overflow: 'hidden',
        width: width * 0.79,
        flex: 1,
        paddingTop: verticalScale(30),
        gap: 20
    },
    carouselImage: {},
    carouselInfoContainer: {
        gap: 20,
        alignItems: 'center',
        paddingHorizontal: horizontalScale(25)
    },
    carouselOption: {
        gap: 1
    },
    title: {
        fontSize: fontScale(14),
        fontFamily: getFontFamily('Poppins', '600'),
        color: color.white
    },
    line: {
        width: horizontalScale(50),
        height: horizontalScale(2),
        alignSelf: 'center'
    },
    optionDetail: {
        fontSize: fontScale(12),
        fontFamily: getFontFamily('Poppins', '400'),
        lineHeight: fontScale(18),
        textAlign: 'center',
        color: color.white
    },

})
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '../../context/ThemeContext'
import { color, scaling } from '../../themes/themes'

const {width, height} = Dimensions.get('window')

const {horizontalScale, verticalScale, fontScale} = scaling


const Foreview = ({first, last}) => {
    const {theme} = useTheme()
  return (
    <LinearGradient 
        useAngle={true}
        angle={274}
        locations={[0, 1.25]}
        colors={[theme.linearType1Clr1, theme.linearType1Clr2]}
        style={[styles.foreView, first && styles.first, last && styles.last]}>
            <View style={styles.shadow} />
        </LinearGradient>
  )
}

export default Foreview

const styles = StyleSheet.create({
  foreView: {
    backgroundColor: color.white,
    height: '80%',
    alignSelf: 'center',
    width: width * 0.06,
    overflow: 'hidden'
  },
  shadow: {
    backgroundColor: 'rgba(197, 139, 242, 0.60)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  first: {
    borderTopRightRadius: horizontalScale(20),
    borderBottomRightRadius: horizontalScale(20),
  },
  last: {
    borderTopLeftRadius: horizontalScale(20),
    borderBottomLeftRadius: horizontalScale(20),
  },
});
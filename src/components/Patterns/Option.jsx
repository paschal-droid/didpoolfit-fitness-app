import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { getFontFamily, scaling } from '../../themes/themes'

const {horizontalScale, verticalScale, fontScale} = scaling

const {width} = Dimensions.get('window')


const Option = () => {
    const {theme} = useTheme()
  return (
    <View style={styles.optionContainer}>
        <View style={[styles.line, {backgroundColor: theme.line}]} />
        <Text style={[styles.optionText, {color: theme.header}]}>Or</Text>
        <View style={[styles.line, {backgroundColor: theme.line}]} />
    </View>
  )
}

export default Option

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  line: {
    width: width / 2.5,
    height: 1,
  },
  optionText: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(15),
    lineHeight: fontScale(20),
  },
});
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../../context/ThemeContext'
import { scaling, getFontFamily, color } from '../../themes/themes'

const {horizontalScale, verticalScale, fontScale} = scaling


const Title = ({name, colorTheme}) => {
    const {theme} = useTheme()
  return (
    <Text style={[styles.headerText, {color: colorTheme ? colorTheme :  theme.header}]}>{name}</Text>
  )
}

Title.propTypes = {
  name: PropTypes.string.isRequired,
  colorTheme: PropTypes.string,

}

export default Title

const styles = StyleSheet.create({
    headerText: {
        fontFamily: getFontFamily('Poppins', '600'),
        fontSize: fontScale(17),
        lineHeight: fontScale(24),
    }
})
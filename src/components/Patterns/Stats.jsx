import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { scaling, getFontFamily, color } from '../../themes/themes';
import { useTheme } from '../../context/ThemeContext';



const { fontScale, horizontalScale, verticalScale } = scaling;

const Stats = ({stat, title}) => {
    const {theme} = useTheme()
  return (
    <View style={styles.statistics}>
      <Text style={[styles.statText, {color: theme.linearType2Clr1}]}>{stat}</Text>
      <Text style={[styles.statSubtext]}>{title}</Text>
    </View>
  )
}

Stats.propTypes = {
    stat: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default Stats

const styles = StyleSheet.create({
  statistics: {
    borderRadius: horizontalScale(15),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(25),
    alignItems: 'center',
  },
  statText: {
    fontFamily: getFontFamily('Poppins', '600'),
    fontSize: fontScale(15),
    lineHeight: fontScale(21)
  },
  statSubtext: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(13),
    lineHeight: fontScale(18),
    color: color.gray
  },
});
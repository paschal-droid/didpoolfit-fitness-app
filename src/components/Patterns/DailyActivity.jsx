import { StyleSheet, Text, View } from 'react-native'
import React, { act } from 'react'
import { scaling, getFontFamily } from '../../themes/themes'
import { dailyTargets } from '../../data/constants'
import FastImage from 'react-native-fast-image'
import { useTheme } from '../../context/ThemeContext'

const {horizontalScale, verticalScale, fontScale} = scaling

const DailyActivity = ({target}) => {
    const activity = dailyTargets.find(item => item.target === target)
    const {theme} = useTheme()
  return (
    <View style={[styles.targetContainer, {backgroundColor: theme.background}]}>
      <FastImage resizeMode='contain' source={activity.image} priority={FastImage.priority.normal} style={[styles.targetImage]} />
      <View style={styles.target}>
        <Text style={[styles.targetHeaderText, {color: theme.linearType1Clr1}]}>{activity.action}</Text>
        <Text style={[styles.targetText, {color: theme.paragraph}]}>{activity.title}</Text>
      </View>
    </View>
  )
}

export default DailyActivity

const styles = StyleSheet.create({
    targetContainer: {
        flexDirection: 'row',
        gap: 8,
        padding: horizontalScale(10),
        borderRadius: horizontalScale(12)
    },
    targetImage: {
        width: horizontalScale(25),
    },
    target: {},
    targetHeaderText: {
        fontFamily: getFontFamily('Poppins', '500'),
        fontSize: fontScale(14),
    },
    targetText: {
        fontFamily: getFontFamily('Poppins', '400'),
        fontSize: fontScale(13),
    }
})
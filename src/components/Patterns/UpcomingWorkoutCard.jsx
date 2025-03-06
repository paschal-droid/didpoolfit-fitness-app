import { StyleSheet, Switch, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../../context/ThemeContext'
import { getFontFamily, scaling } from '../../themes/themes'
import Icon from '../Icon/Icon'
import FastImage from 'react-native-fast-image'
import { notificationActions } from '../../data/constants'

const {horizontalScale, verticalScale, fontScale} = scaling

import fullWorkoutImageDark from '../../assets/images/Illustrations/Home/upcoming-fullwork-dark.png'
import fullWorkoutImageLight from '../../assets/images/Illustrations/Home/upcoming-fullwork.png'
import upperWorkoutImageDark from '../../assets/images/Illustrations/Home/upcoming-upperwork-dark.png'
import upperWorkoutImage from '../../assets/images/Illustrations/Home/upcoming-upperwork.png'

const UpcomingWorkoutCard = ({message, date, type, enabled}) => {
   
    const [imageLink, setImageLink] = useState('')
    const appTheme = useColorScheme() === 'dark'
    const {theme} = useTheme()

    useEffect(() => {
        switch (type) {
          case 'full':
            if(appTheme) { setImageLink(fullWorkoutImageDark)} 
            else {
              setImageLink(fullWorkoutImageLight)
            }
            break;
          case 'upper':
            if(appTheme) { setImageLink(upperWorkoutImageDark)} 
            else {
              setImageLink(upperWorkoutImage)
            }
            break
          default:
            break;
        }
      }, [type, appTheme])

    const [isEnabled, setIsEnabled] = useState(enabled);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={[styles.notification]}>
      <View style={[styles.notificationInner]}>
        <View style={[styles.notificationContent]}>
            <View>
                <FastImage resizeMode='contain' source={imageLink} style={styles.notificationImage}  />
            </View>
            <View style={styles.notificationText}>
                <Text style={[styles.message, {color: theme.header}]}>{message.length > 35 ? message.substring(0, 35) + '...' : message}</Text>
                <Text style={[styles.date, {color: theme.paragraph}]}>{date}</Text>
            </View>
        </View>
        <Switch
            trackColor={{false: '#767577', true: theme.progressTrackerB2}}
            thumbColor={isEnabled ? theme.background : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
      </View>

    </View>
  )
}

UpcomingWorkoutCard.propTypes = {
    date: PropTypes.any.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired
}

export default UpcomingWorkoutCard

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 1,
  },
  notification: {
    gap: 15
  },
  notificationInner: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  notificationContent: {
    gap: 10,
    flexDirection: 'row'
  },
  notificationImage: {
    width: horizontalScale(40),
    height: horizontalScale(40),
    borderRadius: horizontalScale(40),
  },
  notificationText: {
    gap: 5
  },
  message: {
    fontFamily: getFontFamily("Poppins", "500"),
    fontSize: fontScale(14),
    lineHeight: fontScale(20)
  },
  date: {
    fontFamily: getFontFamily("Poppins", "400"),
    fontSize: fontScale(12),
    lineHeight: fontScale(16)
  },

});
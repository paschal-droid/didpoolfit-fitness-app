import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../../context/ThemeContext'
import { getFontFamily, scaling } from '../../themes/themes'
import Icon from '../Icon/Icon'
import FastImage from 'react-native-fast-image'
import { notificationActions } from '../../data/constants'

const {horizontalScale, verticalScale, fontScale} = scaling


const NotificationCard = ({imageAction, message, notificationDate, showLine=true}) => {
   
    const action = notificationActions.find(item => item.action === imageAction)

    const {theme} = useTheme()

  return (
    <View style={[styles.notification]}>
      <View style={[styles.notificationInner]}>
        <View style={[styles.notificationContent]}>
            <View>
                <FastImage resizeMode='contain' source={action.image} style={styles.notificationImage}  />
            </View>
            <View style={styles.notificationText}>
                <Text style={[styles.message, {color: theme.header}]}>{message.length > 25 ? message.substring(0, 25) + '...' : message}</Text>
                <Text style={[styles.date, {color: theme.paragraph}]}>{notificationDate}</Text>
            </View>
        </View>
        <Icon name='ellipsis' size={fontScale(25)} color={theme.iconType2} />
      </View>
      {showLine && (
        <View style={[styles.line, {backgroundColor: theme.line}]} />
      )}
    </View>
  )
}

NotificationCard.propTypes = {
    imageAction: PropTypes.string.isRequired,
    notificationDate: PropTypes.any.isRequired,
    message: PropTypes.string.isRequired
}

export default NotificationCard

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
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import Icon from '../Icon/Icon'
import { scaling, getFontFamily, color } from '../../themes/themes'
import { monthNames } from '../../data/constants'

const {verticalScale, horizontalScale, fontScale} = scaling


const DatePickerButton = ({onPress= () => {}, date}) => {
    const {theme} = useTheme()
    const [selectedDate, setselectedDate] = useState(date)
    const [showBirthDate, setBirthDate] = useState(false)
    const currentDate = new Date()

    const year = selectedDate.getFullYear().toString();
    const monthIndex = selectedDate.getMonth(); // Month index (0-11)
    const month = monthNames[monthIndex]; // Get month name from array
    const day = selectedDate.getDate().toString().padStart(2, '0');


    useEffect(() => {
        setselectedDate(date)
        if (date < currentDate) {
            setBirthDate(true)
        } else {
            setBirthDate(false)
        }

    }, [date])


  return (
    <Pressable onPress={onPress} style={[styles.dateContainer, {backgroundColor: theme.input}]}>
      <Icon
        style={[styles.dateAction]}
        name={'calendar'}
        size={fontScale(20)}
        color={theme.icon}
      />
      <Text style={[styles.date, {color: theme.icon2}]}>{ showBirthDate && date.getFullYear() != currentDate.getFullYear() ? `${day} ${month} ${year}` : 'Date Of Birth'}</Text>
    </Pressable>
  )
}

export default DatePickerButton

const styles = StyleSheet.create({
  dateContainer: {
    justifyContent: 'center',
    height: verticalScale(45),
    flexDirection: 'row',
    flex: 1,
    borderRadius: verticalScale(14),
    alignItems: 'center',
  },
  date: {
    flex: 1,
    marginLeft: horizontalScale(45),
    marginRight: horizontalScale(20),
    fontFamily: getFontFamily('Poppins', '500'),
    fontSize: fontScale(14),
  },
  dateAction: {
    position: 'absolute',
    left: horizontalScale(16),
    height: '100%',
    width: horizontalScale(20),
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scaling, getFontFamily, color } from '../../themes/themes'
import { useTheme } from '../../context/ThemeContext'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

const {horizontalScale, verticalScale, fontScale} = scaling

const DateCard = ({data, changeIndex, focused}) => {   
    const { theme } = useTheme()
    return (
        <Pressable onPress={changeIndex}>
            <LinearGradient
                useAngle={true}
                angle={274}
                locations={[0, 1.25]}
                colors={focused ? [theme.linearType1Clr1, theme.linearType1Clr2] : [theme.input, theme.input]}
                style={[styles.datePicker]}>

                <Text style={[styles.dayText, { color: focused ? color.white : theme.subText }]}>{data.day}</Text>
                <Text style={[styles.dateText, { color: focused ? color.white : theme.subText }]}>{data.date}</Text>
            </LinearGradient>
        </Pressable>
    )
}

DateCard.propTypes = {
    focused: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    changeIndex: PropTypes.func.isRequired
}



export default DateCard

const styles = StyleSheet.create({
    datePicker: {
        width: horizontalScale(60),
        height: verticalScale(80),
        borderRadius: horizontalScale(10),
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    datePickerList: {
        gap: 15,
        marginTop: verticalScale(30),
        marginBottom: verticalScale(10)
    },
    dateText: {
        fontFamily: getFontFamily("Poppins", "600"),
        fontSize: fontScale(14),
    },
    dayText: {
        fontFamily: getFontFamily("Poppins", "600"),
        fontSize: fontScale(12)
    },
})
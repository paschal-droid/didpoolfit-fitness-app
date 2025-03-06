import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scaling, getFontFamily, color } from '../../themes/themes'
import { useTheme } from '../../context/ThemeContext'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

const {horizontalScale, verticalScale, fontScale} = scaling



const ScheduleBanner = ({schedule, openScheduleInfo}) => {
    const {theme} = useTheme()
    
    return (
        <TouchableOpacity onPress={openScheduleInfo}>
            <LinearGradient
            useAngle={true}
            angle={274}
            locations={[0, 1.25]}
            colors={schedule.checked ? [theme.input, theme.input] : [theme.linearType1Clr1, theme.linearType1Clr2]}
            style={[styles.scheduleBanner, styles]}>

            <Text style={[styles.dayText, { color: schedule.checked ? theme.paragraph : color.white }]}>{schedule.workout}</Text>
        </LinearGradient>
        </TouchableOpacity>
    )
}


ScheduleBanner.propTypes = {
    schedule: PropTypes.object.isRequired,
    openScheduleInfo: PropTypes.func.isRequired
}


export default ScheduleBanner

const styles = StyleSheet.create({
    scheduleBanner: {
        height: verticalScale(20),
        width: horizontalScale(160),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: horizontalScale(50),
        alignSelf: 'center'
    },
    dayText: {
        fontFamily: getFontFamily("Poppins", "400"),
        fontSize: fontScale(12),
        letterSpacing: 0.4
    },
})
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import PropTypes from 'prop-types'
import { useTheme } from '../../context/ThemeContext'
import { scaling, color, getFontFamily } from '../../themes/themes'
import Icon from '../Icon/Icon'


const {horizontalScale, verticalScale, fontScale} = scaling

const ActionButton = ({isDisabled=false, onPress= () => {}, actionText='', isIcon=false, icon='', changeGradient=false}) => {
    const {theme} = useTheme()

  return (
    <TouchableOpacity disabled={isDisabled} onPress={onPress} style={[styles.actionButton]}>
        <LinearGradient
            useAngle={true}
            angle={274}
            locations={[-0.84, 1.42]}
            colors={ changeGradient ? [theme.progressTrackerB2, theme.progressTrackerB1] : [theme.linearType2Clr1, theme.linearType2Clr2]}
            style={[styles.actionContainer, isDisabled && {opacity: 0.25} ]}
        >
            {isIcon && <Icon name={icon} size={fontScale(25)} color={color.white} />}
            <Text style={styles.actionText}>{actionText}</Text>
        </LinearGradient>
    </TouchableOpacity>
  )
}

ActionButton.propTypes = {
    actionText: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
    changeGradient: PropTypes.bool
}

export default ActionButton

const styles = StyleSheet.create({
    actionButton: {
        width: '100%',
    },
    actionContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 10,
        height: verticalScale(52),
        borderRadius: verticalScale(100),
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionText: {
        fontFamily: getFontFamily('Poppins', '700'),
        fontSize: fontScale(18),
        color: color.white,
        letterSpacing: 0.4
    },
})
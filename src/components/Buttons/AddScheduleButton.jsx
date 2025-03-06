import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../../context/ThemeContext'
import LinearGradient from 'react-native-linear-gradient'
import { scaling, color, getFontFamily } from '../../themes/themes'
import Icon from '../Icon/Icon'


const {horizontalScale, verticalScale, fontScale} = scaling

const AddScheduleButton = ({onPress}) => {
    const {theme} = useTheme()

    return (
      <TouchableOpacity onPress={onPress} style={[styles.actionButton]}>
          <LinearGradient
              useAngle={true}
              angle={274}
              locations={[-0.84, 1.42]}
              colors={[theme.linearType2Clr1, theme.linearType2Clr2]}
              style={[styles.actionContainer]}
          >
            <Icon name='add' size={fontScale(16)} color={color.white} />
          </LinearGradient>
      </TouchableOpacity>
    )
}

AddScheduleButton.propTypes = {
    onPress: PropTypes.func.isRequired
}


export default AddScheduleButton

const styles = StyleSheet.create({
    actionButton: {
        width: horizontalScale(60),
        height: horizontalScale(60),
        borderRadius: horizontalScale(1000),
        marginBottom: verticalScale(20),
        marginRight: horizontalScale(10)
    },
    actionContainer: {
        width: '100%',
        height: '100%',
        borderRadius: verticalScale(1000),
        alignItems: 'center',
        justifyContent: 'center'
    },
    progressBar: {
        position: 'absolute',
    }
})
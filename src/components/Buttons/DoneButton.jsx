import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../../context/ThemeContext'
import LinearGradient from 'react-native-linear-gradient'
import { scaling, color, getFontFamily } from '../../themes/themes'
import Icon from '../Icon/Icon'
import { AnimatedCircularProgress } from 'react-native-circular-progress'


const {horizontalScale, verticalScale, fontScale} = scaling

const DoneButton = (props) => {
    const {theme} = useTheme()

    return (
      <TouchableOpacity style={[styles.actionButton]} {...props}>
          <LinearGradient
              useAngle={true}
              angle={274}
              locations={[-0.84, 1.42]}
              colors={[theme.linearType2Clr1, theme.linearType2Clr2]}
              style={[styles.actionContainer]}
          >
            <AnimatedCircularProgress
                size={horizontalScale(60)}
                width={1}
                fill={100}
                tintColor={theme.linearType2Clr1}
                backgroundColor={color.white}
                style={styles.progressBar}
            />
            <Icon name='arrow-right' size={fontScale(18)} color={color.white} />
            </LinearGradient>
      </TouchableOpacity>
    )
}

export default DoneButton

const styles = StyleSheet.create({
    actionButton: {
        width: horizontalScale(50),
        height: horizontalScale(50),
        borderRadius: horizontalScale(1000),
        marginBottom: verticalScale(20),
        marginRight: horizontalScale(25)
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
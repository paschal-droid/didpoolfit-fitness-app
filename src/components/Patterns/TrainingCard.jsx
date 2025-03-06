import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import PropTypes from 'prop-types'
import {color, getFontFamily, scaling} from '../../themes/themes';

const {horizontalScale, verticalScale, fontScale} = scaling;


import fullWorkoutImageDark from '../../assets/images/Illustrations/Home/fullbody-workout-dark.png'
import fullWorkoutImageLight from '../../assets/images/Illustrations/Home/fullbody-workout.png'
import lowWorkoutImageDark from '../../assets/images/Illustrations/Home/lowebody-workout-dark.png'
import lowWorkoutImageLight from '../../assets/images/Illustrations/Home/lowebody-workout.png'
import absWorkoutImageDark from '../../assets/images/Illustrations/Home/abs-workout-dark.png'
import absWorkoutImageLight from '../../assets/images/Illustrations/Home/abs-workout.png'
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../navigation/Routes';

const TrainingCard = ({exerciseReps, exerciseTitle, exerciseType, onPress}) => {
    const [imageLink, setImageLink] = useState('')
    const appTheme = useColorScheme() === 'dark'
    const {theme} = useTheme()
    const navigation = useNavigation()

    useEffect(() => {
        switch (exerciseType) {
          case 'full':
            if(appTheme) { setImageLink(fullWorkoutImageDark)} 
            else {
              setImageLink(fullWorkoutImageLight)
            }
            break;
          case 'low':
            if(appTheme) { setImageLink(lowWorkoutImageDark)} 
            else {
              setImageLink(lowWorkoutImageLight)
            }
            break
          case 'upper':
            if(appTheme) { setImageLink(absWorkoutImageDark)} 
            else {
              setImageLink(absWorkoutImageLight)
            }
            break
          default:
            break;
        }
      }, [exerciseType, appTheme])


  return (
    <TouchableOpacity onPress={onPress}>
        <LinearGradient
          useAngle={true}
          angle={274}
          locations={[0, 1.25]}
          colors={[theme.linearType1Clr1, theme.linearType1Clr2]}
          style={[styles.trainingContainer]}>
          <View style={[styles.shadowContainer,{backgroundColor: appTheme ? color.shadowDark : color.shadowLight},]} />

          <View style={styles.trainingInnerContainer}>
            <View style={styles.trainingContentContainer}>
                <View style={styles.trainingHeaderContainer}>
                    <Text style={[styles.trainingTitleText, {color: theme.header}]}>{exerciseTitle}</Text>
                    <Text style={[styles.trainingText, {color: theme.paragraph}]}>{exerciseReps}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.push(Routes.WorkoutDetailA, {type: exerciseType})} style={[styles.button, {backgroundColor: theme.background}]}>
                        <Text style={[styles.buttonText, {color: theme.linearType2Clr1}]}>View More</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.trainingImageContainer}>
                <View style={[styles.overlay, {backgroundColor: theme.background}]} />
                <FastImage source={imageLink} style={styles.trainingImage} resizeMode='contain' priority={FastImage.priority.high} />
            </View>
          </View>
        
      </LinearGradient>
    </TouchableOpacity>
  )
}

TrainingCard.propTypes = {
    exerciseReps: PropTypes.any.isRequired,
    exerciseTitle: PropTypes.string.isRequired,
    exerciseType: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
}

export default TrainingCard

const styles = StyleSheet.create({
    trainingContainer: {
        padding: horizontalScale(18),
        borderRadius: horizontalScale(20),
    },
    trainingInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    trainingContentContainer: {
        alignSelf: 'center',
        gap: 15
    },
    trainingHeaderContainer: {

    },
    trainingTitleText: {
        fontFamily: getFontFamily('Poppins', '500'),
        fontSize: fontScale(15),
        lineHeight: fontScale(21)
    },
    trainingText: {
        fontFamily: getFontFamily('Poppins', '400'),
        fontSize: fontScale(13),
        lineHeight: fontScale(18)
    },
    button: {
        borderRadius: horizontalScale(50),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: verticalScale(10),
        paddingHorizontal: horizontalScale(20)
    },
    buttonText: {
        fontFamily: getFontFamily('Poppins', '500'),
        fontSize: fontScale(12),
        lineHeight: fontScale(15),
        letterSpacing: 0.4
    },
    trainingImageContainer: {
        width: horizontalScale(75),
        height: horizontalScale(105),
        alignItems: 'center',
        justifyContent: 'center'
    },
    trainingImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        width: horizontalScale(95),
        height: horizontalScale(95),
        borderRadius: horizontalScale(95),
        opacity: 0.5,
        position: 'absolute'
    },
    shadowContainer: {
        position: 'absolute',
        borderRadius: horizontalScale(20),
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})
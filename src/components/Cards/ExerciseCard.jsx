import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'
import { MotiView } from 'moti'
import { scaling, getFontFamily, color } from '../../themes/themes'
import { useTheme } from '../../context/ThemeContext'
import { Skeleton } from 'moti/skeleton'
import Icon from '../Icon/Icon'
import { useNavigation } from '@react-navigation/native'


const {horizontalScale, verticalScale, fontScale} = scaling

const Spacer = ({ height = 5 }) => <MotiView style={{ height }} />


const ExerciseCard = ({data, loading, onPress}) => {
    const {theme} = useTheme()
    const appTheme = useColorScheme() === 'dark'
    const navigation = useNavigation()

    const SkeletonCommonProps = {
        colorMode: appTheme ? 'dark' : 'light',
        transition: {
          type: 'timing',
          duration: 2000
        },
        backgroundColor: theme.background
      }

  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.exerciseCardContainer}>
        <Skeleton.Group show={loading}>
            <View style={styles.exerciseContentContainer}>
                <Skeleton width={horizontalScale(60)} height={horizontalScale(60)} {...SkeletonCommonProps} radius={12} >
                    {!loading && data && 
                        <FastImage resizeMode='cover' source={{uri: data.exerciseUrl}} style={styles.exerciseImage} priority={FastImage.priority.high} />
                    }
                </Skeleton>

                <View style={styles.exerciseContentTextContainer}>
                    <Skeleton width={horizontalScale(130)} height={horizontalScale(15)} {...SkeletonCommonProps}>
                        {!loading && data && 
                            <Text style={[styles.exerciseName, {color: theme.header}]}>{data.name}</Text>
                        }
                    </Skeleton>
                    {loading && <Spacer />}
                    <Skeleton width={horizontalScale(70)} height={horizontalScale(15)} {...SkeletonCommonProps}>
                        {!loading && data && 
                            <Text style={[styles.exerciseDuration, {color: theme.paragraph}]}>{data.reps ? data.reps : data.time}</Text>
                        }
                    </Skeleton>
                </View>
            </View>
            <View style={styles.exerciseOptionContainer}>
                <Icon name='arrow-right' color={theme.iconType2} size={fontScale(18)} style={[styles.iconButton, {borderColor: theme.iconType2}]} />
            </View>
        </Skeleton.Group>
    </View>
    </TouchableOpacity>
  )
}

ExerciseCard.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired
}

export default ExerciseCard

const styles = StyleSheet.create({
    exerciseCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    exerciseContentContainer: { 
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    exerciseContentTextContainer: {},
    exerciseImage: {
        width: horizontalScale(60),
        height: horizontalScale(60),
        borderRadius: horizontalScale(12),
    },
    exerciseName: {
        fontFamily: getFontFamily('Poppins', '500'),
        fontSize: fontScale(15),
        textTransform: 'capitalize',
    },
    exerciseDuration: {
        fontFamily: getFontFamily('Poppins', '500'),
        fontSize: fontScale(13),
    },
    exerciseOptionContainer: {},
    iconButton: {
        borderWidth: 1.2,
        borderRadius: 1000,
        padding: horizontalScale(2.75),
        textAlignVertical: 'center',
        textAlign: 'center'
    }
})
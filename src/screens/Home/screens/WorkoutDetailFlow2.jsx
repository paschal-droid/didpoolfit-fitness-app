import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme, View, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { Instructions,PageHeader, Title, Welcome2 } from '../../../components'
import { globalStyles } from '../../../themes'
import { useTheme } from '../../../context/ThemeContext'
import { getFontFamily, scaling } from '../../../themes/themes'
import Animated, { Easing, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated'
import { Skeleton } from 'moti/skeleton'

const {horizontalScale, verticalScale, fontScale} = scaling


const {width} = Dimensions.get('window')

const WorkoutDetailsFlow2 = ({navigation, route}) => {

  const exercise = route.params.info
  const calories = route.params.calories
  
  const {theme} = useTheme()
  const appTheme = useColorScheme() === 'dark'
  const [imageLoad, setImageLoad] = useState(true)
  const [viewMore, setViewMore] = useState(false)

  const SkeletonCommonProps = {
    colorMode: appTheme ? 'light' : 'dark',
    transition: {
      type: 'timing',
      duration: 1000,
      loop: true, // Makes the shimmer loop continuously
      repeatReverse: true, // Keeps the shimmer going in one direction
    },
    backgroundColor: appTheme ? '#3A3A3A' : '#E0E0E0',
  }

  return (
    <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background}, globalStyles.spacePadding]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1,  rowGap: 30}}>
        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100).springify().easing(Easing.ease)} style={[styles.header]}>
          <PageHeader headerText={''} />
        </Animated.View>

        {/* Exercise Gif Instruction */}
        <Animated.View entering={FadeInLeft.delay(200).springify().easing(Easing.ease)} style={[styles.exerciseImageContainer, {borderColor: theme.linearType2Clr1}]}>
          <Skeleton {...SkeletonCommonProps} width={width} radius={22} height={verticalScale(150)} show={imageLoad}>
            <Image resizeMode='cover' onLoad={() => setImageLoad(false)} source={{uri: exercise.gifUrl}} style={[styles.exerciseImage]} />
          </Skeleton>
        </Animated.View>

        {/* Exercise Content & Instructions */}

        <View style={[styles.exerciseContentContainer]}>
          <Animated.View entering={FadeInLeft.delay(300).springify().easing(Easing.ease)} style={{alignItems: 'flex-start', alignSelf: 'flex-start'}}>
            <Welcome2 headerText={exercise.name} subText={`Regular | ${calories} Calories Burn`} />
          </Animated.View>

          <Animated.View entering={FadeInLeft.delay(300).springify().easing(Easing.ease)} style={styles.exerciseDescription}>
            <Title name='Description' />
            {viewMore ? (
              <TouchableWithoutFeedback onPress={() => setViewMore(prev => !prev)}>
              <View>
                <Text style={[styles.descriptionText, {color: theme.subText}]}>{exercise.description} 
                <Text style={[styles.descriptionHighlight, {color: theme.progressTrackerB2}]}> show less</Text>
                </Text>
                
                </View>
            </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={() => setViewMore(prev => !prev)}>
                <View >
                <Text numberOfLines={1} style={[styles.descriptionText, {color: theme.subText}]}>{exercise.description}</Text>
                <Text style={[styles.descriptionHighlight, {color: theme.progressTrackerB2}]}>Read more</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </Animated.View>

          {/* Exercise Instructions */}
          <View style={[styles.exerciseInstructionContainer]}>
            <Animated.View entering={FadeInRight.delay(300).springify().easing(Easing.ease)} style={styles.latestActivityHeader}>
              <Text style={[styles.latestActivityTitle, { color: theme.header }]}>How To Do It</Text>
              <Text style={[styles.latestActivityOptionText, {color: theme.iconType2}]}>{exercise.instructions.length} steps</Text>
            </Animated.View>

            {/* Instructions */}
            <View style={styles.exerciseInstructionMainContainer}>
              {exercise.instructions.map((item, i) => (
                <Animated.View key={i} entering={FadeInLeft.delay((i + exercise.instructions.length) * 100).springify()}>
                  <Instructions index={i}  instruction={item} />
                </Animated.View>
              ))}
            </View>
          </View>
        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default WorkoutDetailsFlow2

const styles = StyleSheet.create({
  header: {},
  exerciseImageContainer: {
    borderRadius: verticalScale(22),
    height: verticalScale(150),
    overflow: 'hidden',
    borderWidth: 2
    
  },
  exerciseImage: {
    position: 'absolute',
    borderRadius: verticalScale(22),
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  exerciseContentContainer: {
    gap: 30,
    paddingBottom: verticalScale(20)
  },
  exerciseDescription: {
    gap: 15
  },
  descriptionText: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(13),
    lineHeight: fontScale(18),
    letterSpacing: 0.4
  },
  descriptionHighlight: {
    fontFamily: getFontFamily('Poppins', '600'),
    fontSize: fontScale(13),
    lineHeight: fontScale(18),
    letterSpacing: 0.4,
    marginLeft: 4
  },
  latestActivityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  latestActivityTitle: {
    fontFamily: getFontFamily('Poppins', '600'),
    fontSize: fontScale(17),
    lineHeight: fontScale(24),
    textTransform: 'capitalize'
  },
  latestActivityOptionText: {
    fontFamily: getFontFamily('Poppins', '500'),
    fontSize: fontScale(13),
    lineHeight: fontScale(18),
  },
  exerciseInstructionContainer: {
    gap: 15
  },
  exerciseInstructionMainContainer: {
    gap: 30
  },

})
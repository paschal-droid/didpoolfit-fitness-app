import { Dimensions, Image, SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '../../../context/ThemeContext'
import { ActionBtn, AuthInput, ExerciseCard, GradientCard, Icon, PageHeader} from '../../../components'
import { globalStyles } from '../../../themes'
import { color, getFontFamily, scaling } from '../../../themes/themes'
import { Routes } from '../../../navigation/Routes'
import Animated, { FadeInDown} from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import darkImage from  '../../../assets/images/Illustrations/signin/avatar-male-4.png'
import lightImage from  '../../../assets/images/Illustrations/signin/avatar-male-4-light.png'
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import {Skeleton} from 'moti/skeleton'


import exercises from '../../../data/exercises.json'

const {horizontalScale, verticalScale, fontScale} = scaling



const WorkoutDetailsFlow1 = ({navigation, route}) => {  
  const {theme} = useTheme()
  const appTheme = useColorScheme() === 'dark'
  const snapPoints = useMemo(() => ['50%', '70%'], []);
  const {width, height} = Dimensions.get('window')
  const [loading, setLoading] = useState(false)

  const [workout, setWorkout] = useState(null)

  const workoutPlaceHolderList = useMemo(() => {
    return Array.from({length: 10}).map(_ => null)
  }, [])

  const [workoutExercises, setWorkoutExercises] = useState(workoutPlaceHolderList)


  const SkeletonCommonProps = {
    colorMode: appTheme ? 'dark' : 'light',
    transition: {
      translate: {
        type: 'spring'
      }
    },
    backgroundColor: theme.background
  }
  
  useEffect(() => {
    let isMounted = true;
    
    const compileWorkout = async () => {
      setLoading(true);
      const sortedWorkout = exercises.find((item) => item.workoutId === route.params.type);
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (isMounted) {
        setWorkout(sortedWorkout);
        setWorkoutExercises(sortedWorkout.exercises)
        setLoading(false);
      }
    };
  
    compileWorkout();
  
    return () => {
      isMounted = false;
    };
  }, [route.params.type]);

  const bottomSheetRef = useRef(null);

  // console.log(workout);
  
  return (
    <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background}]}>
      <View style={[styles.chartView, { height: height * 0.6 }]}>
        <LinearGradient
          useAngle={true}
          angle={274}
          locations={[-0.84, 1.42]}
          colors={[theme.linearType1Clr1, theme.linearType1Clr2]}
          style={[styles.gradientContainer]}
        >
          <PageHeader custom={true} headerText={''} />

          {/* Workout Image Goes here*/}
          <View style={styles.imageContainer}>
            <View style={[styles.overlay, {backgroundColor: theme.background, width: width/1.8, height: width/1.8}]} />
            <Image source={appTheme ? darkImage : lightImage } style={styles.workoutImage} />
          </View>

        </LinearGradient>
        </View>

        {/* workout Content Container */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backgroundStyle={[styles.handlerStyle, {backgroundColor: theme.background}]}
          handleIndicatorStyle={{backgroundColor: theme.header, width: 50}}
        >
          <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.contentContainer, {backgroundColor: theme.background}]}>
              <BottomSheetView style={[styles.detailsView]}>
                <Skeleton.Group show={loading}>
                  <View style={styles.titleContainer}>
                    <Skeleton height={horizontalScale(20)} width={'55%'} {...SkeletonCommonProps} >
                      {workout !== null && 
                        <Text style={[styles.headerText, {color: theme.header}]}>{workout.name}</Text>
                      }
                    </Skeleton>
                    <Skeleton height={horizontalScale(15)} width={'90%'} {...SkeletonCommonProps}>
                      {workout !== null && 
                        <Text style={[styles.subText, {color: theme.paragraph}]}>{workout.exercises?.length} Exercises | {workout?.estimatedTime?.split(' ')[0]}mins | {workout?.estimatedCalories} Calories Burn</Text>
                      }
                    </Skeleton>
                    <Icon style={styles.favorite} name='heart-filled' size={fontScale(20)} color={'red'} />
                  </View>
                </Skeleton.Group>

                  {/* Gradient Buttons */}
                  <View style={styles.gradientCardContainer}>
                    <GradientCard title='Schedule' subTitle='9/25, 09:00 AM' icon='calendar' gradientType={false} />
                    <GradientCard title='Difficulty' subTitle='Beginner' icon='swap' gradientType={true} />
                  </View>

                  {/* Exercise List */}
                  <View style={styles.exerciseListContainer}>
                    <View style={styles.workoutActivityHeader}>
                      <Text style={[styles.workoutActivityTitle, { color: theme.header }]}>Exercises</Text>
                        <Text style={[styles.workoutActivityOptionText, {color: theme.iconType2}]}>3 Sets</Text>
                    </View>

                    {/* Exercise Card */}
                    <View style={styles.exerciseList}>
                      {workoutExercises[0] === null ? (
                        workoutExercises.slice(0,2).map((exercise, i)  => (
                          <ExerciseCard onPress={() => {}} data={exercise} key={i} loading={loading} />
                        ))
                      ) : (
                        workoutExercises.map((exercise, i)  => (
                          <ExerciseCard onPress={() => navigation.navigate(Routes.WorkoutDetailB, {info: exercise, calories: workout.estimatedCalories})} data={exercise} key={i} loading={loading}  />
                        ))
                      )}
                      
                    </View>
                  </View>
              </BottomSheetView>
          </BottomSheetScrollView>
        </BottomSheet>


      <Animated.View entering={FadeInDown.delay(3000).springify()} style={styles.floatButton}>
        <ActionBtn onPress={() => {}} actionText='Start Workout' />
      </Animated.View>

    </SafeAreaView>
  )
}

export default WorkoutDetailsFlow1

const styles = StyleSheet.create({
  gradientContainer: {
    paddingHorizontal: horizontalScale(22),
    paddingVertical: verticalScale(30),
    gap: 30,
    flex: 1
  },
  floatButton: {
    paddingBottom: verticalScale(20),
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0
    
  },
  imageContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center'
  },
  overlay: {
    borderRadius: 1000,
    opacity: 0.5,
    position: 'absolute'
  },
  contentContainer: {
    paddingBottom: verticalScale(30),
  },
  handlerStyle: {
    borderTopRightRadius: horizontalScale(25),
    borderTopLeftRadius: horizontalScale(25),
  },
  detailsView: {
    paddingHorizontal: horizontalScale(22),
    paddingVertical: verticalScale(20),
    gap: 30,
  },
  titleContainer: {
    gap: 5
  },
  headerText: {
    fontFamily: getFontFamily('Poppins', '700'),
    fontSize: fontScale(18),
    lineHeight: fontScale(24),
  },
  subText: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(13),
    lineHeight: fontScale(18),
  },
  favorite: {
    position: 'absolute',
    right: 0
  },
  gradientCardContainer: {
    gap: 10
  },
  workoutActivityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10)
  },
  workoutActivityTitle: {
    fontFamily: getFontFamily('Poppins', '600'),
    fontSize: fontScale(17),
    lineHeight: fontScale(24),
  },
  workoutActivityOptionText: {
    fontFamily: getFontFamily('Poppins', '500'),
    fontSize: fontScale(13),
    lineHeight: fontScale(18),
  },
  exerciseListContainer: {
    gap: 20,
    paddingBottom: verticalScale(50)
  },
  exerciseList: {
    gap: 20
  },
})
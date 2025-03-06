import { Dimensions, SafeAreaView,  StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useRef, } from 'react'
import { LineChartCard,  PageHeader, TargetCard, Title, TrainingCard, UpcomingWorkoutCard} from '../../../components'
import { globalStyles } from '../../../themes'
import { useTheme } from '../../../context/ThemeContext'
import { getFontFamily, scaling } from '../../../themes/themes'
import { Routes } from '../../../navigation/Routes'
import LinearGradient from 'react-native-linear-gradient'
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'


const {horizontalScale, verticalScale, fontScale} = scaling



const WorkoutTracker = ({navigation}) => {
  const {theme} = useTheme()
  const tabBarHeight = useBottomTabBarHeight()
  const snapPoints = useMemo(() => ["50%", '70%'], []);
  const {width, height} = Dimensions.get('window')

  const trainingTypes = [
    {exerciseReps: '11 Exercises | 32mins', exerciseTitle: 'Fullbody Workout', exerciseType: 'full'},
    {exerciseReps: '12 Exercises | 40mins', exerciseTitle: 'Lowebody Workout', exerciseType: 'low'},
    {exerciseReps: '14 Exercises | 20mins', exerciseTitle: 'Upperbody Workout', exerciseType: 'upper'},
  ]


  // ref
  const bottomSheetRef = useRef(null);

  // callbacks
  

  return (
    <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background}]}>
        <View style={[styles.chartView, {height: height*0.6}]}>
            <LinearGradient
                useAngle={true}
                angle={274}
                locations={[-0.84, 1.42]}
                colors={[theme.linearType1Clr1, theme.linearType1Clr2]}
                style={[styles.gradientContainer]}
            >
                <PageHeader custom={true} headerText={'Workout Tracker'} />

                {/* Chart Goes here*/}
                <LineChartCard />

            </LinearGradient>

            {/* Daily Schedule Container */}
            
        </View>


        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backgroundStyle={[styles.handlerStyle, {backgroundColor: theme.background}]}
          handleIndicatorStyle={{backgroundColor: theme.header, width: 50}}
        >
          <BottomSheetScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.contentContainer, {backgroundColor: theme.background}]}>
              <BottomSheetView style={[styles.detailsView]}>
                <TargetCard name={'Daily Workout Schedule'} tabName={'Check'} /> 

                {/* Upcoming workout */}
                <View style={styles.upcomingWorkoutContainer}>
                  <View style={styles.workoutActivityHeader}>
                    <Text style={[styles.workoutActivityTitle, { color: theme.header }]}>Upcoming Workout</Text>
                      <Text style={[styles.workoutActivityOptionText, {color: theme.iconType2}]}>See More</Text>
                  </View>
                  <UpcomingWorkoutCard message='Fullbody Workout' date={'Today, 03:00pm'} enabled={true} type='full' />
                  <UpcomingWorkoutCard message='Upperbody Workout' date={'June 05, 02:00pm'} enabled={false} type='upper' />
                </View>

                {/* Workout Choice */}
                <View style={[styles.trainingChoiceContainer, {marginBottom: tabBarHeight}]}>
                  <Title name='What Do You Want to train' />
                  {trainingTypes.map((item, i) => {
                    return (
                      <TrainingCard onPress={() => navigation.push(Routes.WorkoutDetailA, {type: item.exerciseType})} key={i} exerciseTitle={item.exerciseTitle} exerciseType={item.exerciseType} exerciseReps={item.exerciseReps} />
                    )}
                  )}
                </View>
              </BottomSheetView>
          </BottomSheetScrollView>
        </BottomSheet>

      {/* </ScrollView> */}

    </SafeAreaView>
  )
}

export default WorkoutTracker

const styles = StyleSheet.create({
    chartView: {},
    gradientContainer: {
        paddingHorizontal: horizontalScale(22),
        paddingVertical: verticalScale(30),
        gap: 30,
        flex: 1
    },
    chartView: {
     
    },
    detailsView: {
      paddingHorizontal: horizontalScale(22),
      paddingVertical: verticalScale(20),
      gap: 30,
    },
    contentContainer: {
      paddingBottom: verticalScale(30),
    },
    handlerStyle: {
      borderTopRightRadius: horizontalScale(25),
      borderTopLeftRadius: horizontalScale(25),
    },
    upcomingWorkoutContainer: {
      gap: 35
    },
    workoutActivityHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
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
    trainingChoiceContainer: {
      gap: 15
    },

})
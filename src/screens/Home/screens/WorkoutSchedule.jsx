import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AddScheduleButton, DateCard, Icon, PageHeader, TimeCard, Title } from '../../../components'
import { globalStyles } from '../../../themes'
import { useTheme } from '../../../context/ThemeContext'
import { getFontFamily, scaling } from '../../../themes/themes'
import { Routes } from '../../../navigation/Routes'
import Animated, { Easing, FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { matchDaysWithHours } from '../../../data/constants'
import ScheduleInfoModal from '../../../components/Modals/ScheduleInfoModal'

const {horizontalScale, verticalScale, fontScale} = scaling



const WorkoutSchedule = ({navigation}) => {
  const {theme} = useTheme()
  const tabBarHeight = useBottomTabBarHeight()
  const [dateArray, setDateArray] = useState(matchDaysWithHours())
  const [timeArray, setTimeArray] = useState([])
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)

  const [openModal, setOpenModal] = useState(false)

  const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const currentMonth = months[new Date().getMonth()]
  const currentYear = new Date().getFullYear()

  
  const renderDateItem = ({item, index}) => {
    const focused = index === selectedDateIndex
    return (
      <DateCard  data={item} focused={focused} changeIndex={() => setSelectedDateIndex(index)} />
    )
  }

  useEffect(() => {
    const changeTime = () => {
      setTimeArray(dateArray[selectedDateIndex].hours)
    }
    changeTime()

  }, [selectedDateIndex])

  

    
  return (
    <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background, paddingVertical: verticalScale(30)}]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1,  gap: 35}}>
        <Animated.View entering={FadeInUp.delay(700).springify().easing(Easing.ease)} style={styles.header}>
          <PageHeader headerText={'Workout Schedule'} />
        </Animated.View>

        <View style={styles.dateContainer}>
          {/* Current Month & Year */}
          <Animated.View entering={FadeInUp.delay(150).springify().easing(Easing.ease)} style={[styles.dateHeader]}>
            <Icon name='caret-left' size={fontScale(22)} color={theme.subText} />
            <Title name={`${currentMonth} ${currentYear}`} />
            <Icon name='caret-right' size={fontScale(22)} color={theme.subText} />
          </Animated.View>

          {/* Weekly Schedule Dates */}
          <Animated.View entering={SlideInRight.delay(300).springify().easing(Easing.ease)} style={styles.datePickerContainer}>
            <FlatList
              data={dateArray}
              keyExtractor={item => item.date}
              horizontal
              contentContainerStyle={styles.datePickerList}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              renderItem={renderDateItem}
            />


          </Animated.View>
          {/* Hour Schedule For Selected Day */}
          <Animated.View entering={FadeInDown.delay(100).springify().easing(Easing.ease)} style={[styles.timePickerContainer, {marginBottom: tabBarHeight}]}>
            {timeArray.map((hour, i) => (
                <TimeCard key={i} setOpenModal={setOpenModal} index={selectedDateIndex} day={dateArray[selectedDateIndex].date} time={hour} />
            ))}
          </Animated.View>
        </View>

        {openModal && <ScheduleInfoModal openModal={openModal} setOpenModal={setOpenModal} />}

      </ScrollView>
        {/* Add New Schedule Button */}
        <Animated.View entering={FadeInDown.duration(500).springify()} style={[styles.floatButton, {marginBottom: tabBarHeight}]}>
          <AddScheduleButton onPress={() => navigation.push(Routes.AddSchedule, {date: dateArray[selectedDateIndex]})} />
        </Animated.View>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  dateContainer: {
    gap: 30
  },
  dateHeader: {
    alignItems: 'center',
    paddingHorizontal: horizontalScale(22),
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'center'
  },
  datePickerContainer: {
    borderTopRightRadius: fontScale(25),
    borderTopLeftRadius: fontScale(25),
    paddingHorizontal: horizontalScale(20),
  },
  datePickerList: {
    gap: 15,

  },
  timePickerContainer: {
    gap: 10,
    marginTop: verticalScale(10)
  },
  header: {
    paddingHorizontal: horizontalScale(22)
  },
  floatButton: {
    position: 'absolute',
    bottom: 0,
    right: horizontalScale(10)
  },
})

export default WorkoutSchedule

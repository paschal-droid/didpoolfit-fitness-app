import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ActionBtn, Icon, PageHeader, SelectInput, Title } from '../../../components'
import { globalStyles } from '../../../themes'
import { useTheme } from '../../../context/ThemeContext'
import { getFontFamily, scaling } from '../../../themes/themes'
import DatePicker from 'react-native-date-picker'
import { difficultyData, repsData, weightData, workoutData } from '../../../data/constants'
import { addNewSchedule } from '../../../redux/reducers/WorkoutSchedule'
import { useDispatch } from 'react-redux'

const {horizontalScale, verticalScale, fontScale} = scaling


const AddSchedule = ({navigation, route}) => {
  const {theme} = useTheme()
  const dispatch = useDispatch()
  const date = route.params.date
  const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const currentMonth = months[new Date().getMonth()]
  const currentYear = new Date().getFullYear()

  const currentDate = new Date()
  const inputDate = new Date(currentYear, currentDate.getMonth(), date.date)
  const isToday = currentDate.getDate() === inputDate.getDate() && currentDate.getDay() === inputDate.getDay()

  const calcDate = () => {
    if (isToday) {
        return currentDate
    } 
    inputDate.setHours(6,0,0,0)
    return inputDate
  }
  
  const [selectedDate, setSelectedDate] = useState(calcDate)
  const [workout, setWorkout] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [reps, setReps] = useState(2)
  const [weight, setWeight] = useState('10 KG')

  const handleScheduleInfo = () => {
    dispatch(addNewSchedule({time: selectedDate.toLocaleTimeString(), weight, difficulty, workout, reps, date: `${date.date} ${date.day}`, checked: false, id: `${Math.random().toString(36).substring(2, 8)}`}))
    navigation.goBack()
  }    
  

  return (
    <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background}, globalStyles.spacePadding]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1,  rowGap: 40}}>
        <View style={styles.header}>
          <PageHeader customIcon='close' adjustedSize={12} headerText={'Add Schedule'} />
        </View>

        {/* Time Setup Container */}
        <View style={styles.timeSelectContainer}>
            <View style={styles.timeDate}>
                <Icon name='calendar' size={fontScale(22)} color={theme.subText} />
                <Text style={[styles.timeDateText, {color: theme.subText}]}>{date.date}, {date.day} {currentMonth} {currentYear}</Text>
            </View>

            {/* Time Picker */}
            <View style={styles.timePickerContainer}>
                <View style={{alignSelf: 'flex-start'}}><Title name='Time' /></View>
                <DatePicker minuteInterval={60} mode='time' dividerColor={theme.linearType1Clr1} minimumDate={isToday ? currentDate : inputDate} onDateChange={(time) => setSelectedDate(time)}  date={selectedDate}  />
            </View>

            {/* Details Workout Container */}
            <View style={styles.detailsContainer}>
                <Title name='Details Workout' />
                <SelectInput placeholder='Choose Workout' data={workoutData} handleSelection={(val) => setWorkout(val)} icon='barbell' />
                <SelectInput placeholder='Difficulty' data={difficultyData} handleSelection={(val) => setDifficulty(val)} icon='swap' />
                <SelectInput placeholder='Custom Repetitions' data={repsData} handleSelection={(val) => setReps(val)} icon='chart' />
                <SelectInput placeholder='Custom Weights' data={weightData} handleSelection={(val) => setWeight(val)} icon='barbell1' />
            </View>

            {/* Float Button  */}
            <View style={styles.saveScheduleContainer}>
                <ActionBtn isDisabled={workout.length == '' || difficulty.length == ''} actionText='Save' onPress={handleScheduleInfo} />
            </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default AddSchedule

const styles = StyleSheet.create({
    timeSelectContainer: {
        gap: 30
    },
    timeDate: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    timeDateText: {
        fontFamily: getFontFamily('Poppins', '600'),
        fontSize: fontScale(16),
        lineHeight: fontScale(21)
    },
    timePickerContainer: {
        alignItems: "center",
        paddingRight: horizontalScale(22),
        justifyContent: 'center'
    },
    detailsContainer: {
        gap: 15
    },
    saveScheduleContainer: {
        marginTop: verticalScale(10)
    },
})
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scaling, getFontFamily, color } from '../../themes/themes'
import { useTheme } from '../../context/ThemeContext'
import { normalizeTime } from '../../data/constants'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import ScheduleBanner from '../Patterns/ScheduleBanner'
import { setSelectedSchedule } from '../../redux/reducers/WorkoutSchedule'

const {horizontalScale, verticalScale, fontScale} = scaling

const TimeCard = ({time, day, index, setOpenModal}) => {   
    const { theme } = useTheme();
    const {schedules} = useSelector(state => state.workoutSchedule);
    const currentDate = new Date();
    const currentYear = new Date().getFullYear();
    const dispatch = useDispatch()

    const [savedSchedule, setSavedSchedule] = useState({});
   
    

    // Function to create a Date object from the current day and time
    const availableDate = () => {
        const inputDate = new Date(currentYear, currentDate.getMonth(), day);
        if (schedules.length === 0) return 1; // Return a default value if no schedules

        const selectedTime = normalizeTime(time); // Normalize input time
        const selectedHour = parseInt(time.split(':')[0]); // Get hour from the input time

        return inputDate.setHours(selectedHour, 0, 0, 0); // Return the date object with the hour set
    };

    // Function to find and return the scheduled date for comparison
    const scheduledDate = () => {
        if (schedules.length === 0) return 0;
        
        // Find the schedules for the current day
        const matchedDates = schedules.filter((item) => item.date.split(' ')[0] == day);
        if (matchedDates.length === 0) return 0;

        // Normalize the input time and the schedule time
        const selectedAvailableTime = normalizeTime(time);
        const finalMatch = matchedDates.find((item) => normalizeTime(item.time) === selectedAvailableTime);

        if (!finalMatch) return 0; // Return 0 if no matching time found

        const selectedHour = parseInt(finalMatch.time.split(':')[0]);
        const filteredDate = new Date(currentYear, currentDate.getMonth(), finalMatch.date.split(' ')[0]);

        return filteredDate.setHours(selectedHour, 0, 0, 0);
    };

    // Effect to compare available and scheduled dates and set the saved schedule
    useEffect(() => {
        let isMounted = true;

        const preFilterDate = () => {
            if (scheduledDate() === availableDate()) {
                const matchedSchedule = schedules.find((item) => normalizeTime(item.time) === normalizeTime(time));
                if (isMounted) {
                    setSavedSchedule(matchedSchedule);
                }
            } else {
                setSavedSchedule({});
            }
        };

        preFilterDate();

        return () => {
            isMounted = false;
        };
    }, [index, schedules, day]); 

    
    const handleOpenSchedule = () => {
        dispatch(setSelectedSchedule(savedSchedule))
        setOpenModal((prev) => !prev);
    }
    
    
    return (
       <View style={styles.timePicker}>
        <View style={styles.content}>
            <Text style={[styles.timeText, {color: theme.paragraph}, styles.header]}>{time}</Text>
            {savedSchedule.date !== undefined && (
            <ScheduleBanner openScheduleInfo={handleOpenSchedule} schedule={savedSchedule} />
            )}
        </View>
        <View style={[styles.line, {backgroundColor: theme.input}]} />
       </View>
    )
}

TimeCard.propTypes = {
//    onPress: PropTypes.func.isRequired,
   time: PropTypes.string.isRequired,
   setOpenModal: PropTypes.func.isRequired,
}



export default TimeCard

const styles = StyleSheet.create({
    timePicker: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 10
    },
    timePickerList: {
        gap: 15,
        marginTop: verticalScale(30),
        marginBottom: verticalScale(10)
    },
    timeText: {
        fontFamily: getFontFamily("Poppins", "500"),
        fontSize: fontScale(14),
    },
    dayText: {
        fontFamily: getFontFamily("Poppins", "600"),
        fontSize: fontScale(12)
    },
    line: {
        width: '100%',
        height: verticalScale(0.5)
    },
    header: {
        paddingHorizontal: horizontalScale(22)
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})
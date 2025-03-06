import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarChart } from 'react-native-gifted-charts'


import { useTheme } from '../../context/ThemeContext'
import { scaling, color, getFontFamily, } from '../../themes/themes'
import ProgressBar from '../Patterns/ProgressBar'

import progressTracker from '../../data/Progress TrackerV2.json'
import { getDayOfWeek, getMonthAndYear, processMonthlyData, processWeeklyData } from '../../data/constants'
import { SelectList } from 'react-native-dropdown-select-list'
import Icon from '../Icon/Icon'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch } from 'react-redux'
import { updateChartInfo } from '../../redux/reducers/ChartData'
import { Loader } from '..'


const Period = {
  week: 'week',
  month: 'month',
}

const data = [
  { key: 'week', value: 'weekly', },
  { key: 'month', value: 'monthly' },
]

const { horizontalScale, verticalScale, fontScale } = scaling

const ActivityProgress = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch()

  const [chartData, setChartData] = useState([]);
  const [chartPeriod, setChartPeriod] = useState(Period.week);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentEndDate, setCurrentEndDate] = useState(new Date());
  const [chartKey, setChartKey] = useState(0)
  const [loading, setLoading] = useState(false)

  const renderCustomBar = (barData, index) => {
    return (
      <ProgressBar barData={barData} index={index} />
    );
  };

  const renderCustomToolTip = (item, index) => {
    return (
      <View style={[styles.tooltipContainer, {backgroundColor: theme.header}]}>
        <Text style={[styles.tooltipText, {color: theme.input}]}>{Math.floor(item.barVal/item.value * 100)}%</Text>
      </View>
    )
  }


  // ! This would fetch the data to be displayed as bars
  useEffect(() => {
    const fetchData = () => {
      if (chartPeriod === Period.week) {
        // start date and end date of the week
        const { endDate, startDate } = getWeekRange(currentDate);
        setCurrentEndDate(new Date(startDate));

        // get the data from the database activity tracker
        const data = fetchWeeklyData(startDate, endDate, 'activity');
        setChartData(processWeeklyData(data, 'activity'));

        // update the data
        setChartKey(prev => prev + 1)

        // save the newly processed chart data to our redux store
        const contextChart = processWeeklyData(data, 'activity')
        const updatedChartData = contextChart.map((item) => {
          return {label : item.label, value: item.barVal}
        })
        dispatch(updateChartInfo(updatedChartData))        
        
      }
      if (chartPeriod === Period.month) {
        const data = fetchMonthlyData()
        
        
        setChartData(processMonthlyData(data, 'activity'))

        // update the data
        setChartKey(prev => prev + 1)
      }
    };
    setLoading(true)
    fetchData();
    setLoading(false)
  }, [currentDate, chartPeriod]);

  

  // todo THIS IS A HELPER FUNCTION TO GET ONLY THE RANGE OF DAYS IN ONE(1) WEEK
  const getWeekRange = (date) => {
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()))
    const endOfWeek = new Date(date.setDate(startOfWeek.getDate() + 6))

    return {
      startDate: Math.floor(startOfWeek.getTime()),
      endDate: Math.floor(endOfWeek.getTime()),
    }
  }

  // TODO THIS IS A HELPER FUNCTION THAT IS RESPONSIBLE FOR FETCHING THE DATA FOR THE WEEK SPECIFIED FROM OUR DATABASE, SORT IT IN ASC ORDER(SUN - SAT)
  const fetchWeeklyData = (startDate, endDate, type) => {
    let result = {};

    progressTracker.forEach(progress => {
      const progressDate = progress.date; // Assuming `date` is in milliseconds
      const progressType = progress.type;
      const progressValue = progress.progress;

      // Check if the progress meets the conditions
      if (
        progressDate >= startDate &&
        progressDate <= endDate &&
        progressType === type
      ) {
        const dayOfWeek = getDayOfWeek(progressDate);

        // Store the amount grouped by the day of the week
        if (!result.hasOwnProperty(dayOfWeek)) {
          result[dayOfWeek] = progressValue;
        }
      }
    });

    
    // Convert the result object to an array of {day_of_week, total} objects and sort by day_of_week
    const sortedResult = Object.keys(result)
      .map(dayOfWeek => ({
        day_of_week: dayOfWeek,
        progress: result[dayOfWeek],
      }))
      .sort((a, b) => a.day_of_week - b.day_of_week);

    return sortedResult;
  };

  //todo Function to sum up progress for each day and aggregate by month
  function fetchMonthlyData() {
    const result = {};

    progressTracker.forEach((progress) => {
        const { month, year } = getMonthAndYear(progress.date); // Assuming `date` is in milliseconds
        
        const progressValue = progress.progress;        

        // Only consider the first 6 months
        if (month >= 1 && month <= 12) {
            const key = `${year}-${month}`; // Create a key like '2023-1' for January 2023
            
            // Sum the progress values for each month
            if (!result.hasOwnProperty(key)) {
                result[key] = 0;
            }
            result[key] += progressValue;
        }
    });

    // Convert the result object to an array of { month, totalProgress } objects and sort by month
    const sortedResult = Object.keys(result)
        .map(key => {
            const [year, month] = key.split('-').map(Number);
            return { month, year, totalProgress: result[key] };
        })
        .sort((a, b) => a.month - b.month);

    return sortedResult;
  }

  const handlePrevWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)))
  }
  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)))
  }
  
  
  return (
    <View style={[styles.activityChartContainer]}>
      <View style={styles.activityChartHeaderContainer}>
        <Text style={[styles.activityChartTitle, { color: theme.header }]}>
          Activity Progress
        </Text>
        <LinearGradient
          useAngle={true}
          angle={274}
          locations={[0, 1.25]}
          colors={[theme.progressTrackerB1, theme.progressTrackerB2]}
          style={[styles.filterContainer]}
        >
          <SelectList
            setSelected={(val) => setChartPeriod(val)}
            data={data}
            save="key"
            search={false}
            boxStyles={[styles.inputContainer]}
            inputStyles={[styles.inputStyles]}
            dropdownTextStyles={[styles.dropdownText]}
            dropdownStyles={[styles.dropdownContainer]}
            arrowicon={<Icon name='caret' size={fontScale(20)} color={theme.background} />}
            placeholder={chartPeriod+'ly'}
          />
        </LinearGradient>
      </View>
      {loading ? (
        <Loader height={150} />
      ) :(
        <BarChart
          barWidth={horizontalScale(21)}
          key={chartKey}
          noOfSections={5}
          barBorderRadius={20}
          data={chartData}
          barInnerComponent={renderCustomBar}
          hideRules
          hideYAxisText
          yAxisThickness={0}
          xAxisThickness={0}
          barMarginBottom={horizontalScale(7)}
          spacing={20}
          xAxisLabelTextStyle={styles.labelStyles}
          showGradient
          renderTooltip={renderCustomToolTip}
        />

      )}
      {/* Trigger Button to select week */}
      {chartPeriod === Period.week ? (
        <View style={[styles.periodCheckContainer]}>
          <TouchableOpacity onPress={handlePrevWeek} >
            <Icon name='caret-left' color={theme.header} size={fontScale(25)} />
          </TouchableOpacity>
          <Text style={[styles.weekIndicator, {color: theme.header}]}>{currentEndDate.toLocaleDateString('en-us', {month: 'short'})} {currentEndDate.getDate()}  -  {currentDate.toLocaleDateString('en-US', {month: 'short'})} {currentDate.getDate()}</Text>
          <TouchableOpacity onPress={handleNextWeek}>
            <Icon name='caret-right' color={theme.header} size={fontScale(25)} />
          </TouchableOpacity>
      </View>
      ) : (
        <Text style={[styles.weekIndicator, {color: theme.header}]}>{chartData[0].label} - {chartData[chartData.length - 1].label} {currentDate.getFullYear()+1}</Text>
      )}
    </View>
  );
}

export default ActivityProgress

const styles = StyleSheet.create({
  activityChartContainer: { 
    gap: 20
  },
  activityChartHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10)
  },
  activityChartTitle: {
    fontFamily: getFontFamily('Poppins', '600'),
    fontSize: fontScale(17),
    lineHeight: fontScale(24),
  },
  labelStyles: {
    color: color.gray,
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(13),
  },
  filterContainer : {
    borderRadius: verticalScale(20),
    width: horizontalScale(100),
    overflow: 'hidden'
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(20),
    borderWidth: 2
  },
  inputStyles: {
    flex: 1,
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(11),
    textTransform: 'capitalize',
    letterSpacing: 0.4,
    color: color.white
  },
  dropdownText: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(11),
    textTransform: 'capitalize',
    letterSpacing: 0.4,
    color: color.white
  },
  dropdownContainer: {
    borderWidth: 0,
  },
 periodCheckContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: verticalScale(20),
  paddingHorizontal: horizontalScale(20)
 },
 periodCheckText: {
  fontFamily: getFontFamily('Poppins', '400'),
  fontSize: fontScale(11),
  textTransform: 'capitalize',
  letterSpacing: 0.4,
 },
 weekIndicator: {
  fontFamily: getFontFamily('Poppins', '600'),
  fontSize: fontScale(15),
  letterSpacing: 0.4,
  textAlign: 'center'
 },
 tooltipContainer: {
  paddingHorizontal: horizontalScale(6),
  paddingVertical: verticalScale(4),
  borderRadius: horizontalScale(4),
  justifyContent: 'center',
  position: 'absolute'
},
 tooltipText: {
  fontFamily: getFontFamily('Poppins', '600'),
  fontSize: fontScale(14),
 },
 
});
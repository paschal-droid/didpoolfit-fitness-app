import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-gifted-charts';
import { CurveType } from 'gifted-charts-core';
import { color, getFontFamily, scaling } from '../../themes/themes';
import { useTheme } from '../../context/ThemeContext';
import { useSelector } from 'react-redux';

const { horizontalScale, verticalScale, fontScale } = scaling
const {width, height} = Dimensions.get('window')


  
  const LineChartCard = () => {
    const {theme} = useTheme()
    const {chartData} = useSelector(state => state.chartData)

   const verticalLabel = ['0%', '20%', '40%', '60%', '80%', '100%']
    
   
  const config = {
    color: theme.background,
    thickness: 5,
    curved: true,
    curveType: CurveType.QUADRATIC,
    curvature: 0.4,
    shiftY: 12,
    dataPointsWidth:5,
    dataPointsHeight:5,
    dataPointsRadius: 5,
    dataPointsColor: theme.header,
  }
  return (
    <View style={styles.lineChartContainer}>
      <BarChart
        barWidth={horizontalScale(21)}
        noOfSections={5}
        barBorderRadius={20}
        data={chartData}
        dashGap={0}
        rulesColor={theme.background}
        frontColor={'transparent'}
        gradientColor={theme.background}
        maxValue={100}
        stepValue={20}
        rulesThickness={1.2}
        yAxisThickness={0}
        xAxisThickness={0}
        barMarginBottom={horizontalScale(7)}
        spacing={20}
        showLine
        width={width*0.9}
        showGradient
        lineBehindBars
        xAxisLabelTextStyle={styles.labelStyles}
        yAxisTextStyle={styles.labelStyles}
        yAxisLabelContainerStyle={{marginRight: 10}}
        yAxisLabelTexts={verticalLabel}
        lineConfig={config}
      />
    </View>
  );
};

export default LineChartCard

const styles = StyleSheet.create({
  lineChartContainer: {
    gap: 25
  },
  labelStyles: {
    color: color.white,
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(13),
  },
})
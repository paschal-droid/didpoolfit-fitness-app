import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { color, scaling } from '../../themes/themes';

const {horizontalScale, verticalScale, fontScale} = scaling


const ProgressBar = ({barData, index}) => {
    const {theme} = useTheme();
  return (
    <View
      key={index}
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        backgroundColor: theme.input, // Black background for the full bar
        borderRadius: horizontalScale(20),
      }}>
      <LinearGradient
        useAngle={true}
        angle={274}
        locations={[0, 1.25]}
        colors={[barData.frontColor, barData.gradientColor]}
        style={{
          height: `${barData.barVal/barData.value * 100}%`, // Value percentage for colored bar
          backgroundColor: barData.frontColor, // Color for the filled portion
          borderRadius: horizontalScale(20),
        }}
      />
    </View>
  );
}

export default ProgressBar

const styles = StyleSheet.create({})
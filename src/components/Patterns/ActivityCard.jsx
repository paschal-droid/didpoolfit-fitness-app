import { ImageBackground, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'

import HRate from '../../assets/images/Illustrations/Home/heart-rate-graph.png'
import HRateDark from '../../assets/images/Illustrations/Home/heart-rate-graph-dark.png'
import LinearGradient from 'react-native-linear-gradient'
import Tab from './Tabs'
import { color, getFontFamily, scaling } from '../../themes/themes'

const {horizontalScale, verticalScale, fontScale} = scaling


const ActivityCard = () => {
  const {theme} = useTheme()
  const appTheme = useColorScheme() === 'dark'

  return (
    <View style={{gap: 20}}>
        <Text style={[styles.activityHeader, {color: theme.header}]}>Activity Status</Text>
          <LinearGradient 
            useAngle={true}
            angle={274}
            locations={[0, 1.25]}
            colors={[theme.linearType1Clr1, theme.linearType1Clr2]}
            style={[styles.BMIContainer]}
          >
            <View style={[
                styles.shadowContainer,
                {backgroundColor: appTheme ? color.shadowDark : color.shadowLight},
                ]}
            />
            <ImageBackground resizeMode="contain" source={appTheme ? HRateDark : HRate} style={[styles.BMIBackground, {height: horizontalScale(145)}]}>
              <View style={[styles.BMIContent]}>
                <View style={[styles.BMITextContent]}>
                  <Text style={[styles.text, { color: theme.header }]}>Heart Rate</Text>
                <LinearGradient 
                    useAngle={true}
                    angle={274}
                    locations={[0, 1.25]}
                    colors={[theme.linearType1Clr1, theme.linearType1Clr2]}
                    style={[styles.BMIContainer]}
                >
                    <Text style={[styles.subtext, { color: color.black }]}>78 BPM</Text>
                </LinearGradient>
                </View>
                <View style={styles.floatInfo}>
                    <Tab name="3 min ago" padding={14} />
                </View>
              </View>
            </ImageBackground>
          </LinearGradient>

    </View>
  )
}

export default ActivityCard

const styles = StyleSheet.create({
    BMIContainer: {
        borderRadius: horizontalScale(22),
      },
      BMIBackground: {
        flexDirection: 'row',
        borderRadius: horizontalScale(22),
        alignItems: 'flex-start',
        padding: horizontalScale(20),
      },
      BMIContent: {
        gap: 15
      },
      BMITextContent:{
        gap: 5
       },
      text: {
        fontFamily: getFontFamily('Poppins', '600'),
        fontSize: fontScale(12),
        lineHeight: fontScale(15),
      },
      subtext: {
        fontFamily: getFontFamily('Poppins', '600'),
        fontSize: fontScale(14),
        lineHeight: fontScale(21),
        textAlign: 'center'
      },
      shadowContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: horizontalScale(22),
      },
      activityHeader: {
        fontFamily: getFontFamily('Poppins', '600'),
        fontSize: fontScale(16),
        lineHeight: fontScale(24),
      },
      floatInfo: {
        position: 'absolute',
        top: verticalScale(0),
        left: horizontalScale(145)
      }
})
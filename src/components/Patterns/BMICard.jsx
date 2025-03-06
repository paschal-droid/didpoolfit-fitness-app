import { Dimensions, Image, ImageBackground, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '../../context/ThemeContext'

import BMI from '../../assets/images/Illustrations/Home/BMI-banner-design.png'
import pie from '../../assets/images/Illustrations/Home/pie-ecllipse.png'
import pieDark from '../../assets/images/Illustrations/Home/pie-ecllipse-dark.png'
import LinearGradient from 'react-native-linear-gradient'
import Tab from './Tabs'
import { Loader } from '..'
import { color, getFontFamily, scaling } from '../../themes/themes'
import { calculateBMI, getFirstDecimalPlace } from '../../data/constants'
import { useNavigation } from '@react-navigation/native'
import { Routes } from '../../navigation/Routes'

const {horizontalScale, verticalScale, fontScale} = scaling


const BMICard = () => {
  const {theme} = useTheme()
  const appTheme = useColorScheme() === 'dark'
  const {activeUser} = useSelector(state => state.user)
  const navigation = useNavigation()

  const [BMIIndex, setBMIIndex] = useState({bmi: '', status: ''})

//   console.log(activeUser);

  useEffect(() => {
    if(activeUser) {
      const BMI = calculateBMI(activeUser.weight, activeUser.height)
      const extra = getFirstDecimalPlace(parseFloat(BMI.bmi))
      const finale = `${Math.floor(BMI.bmi)},${extra}`
      setBMIIndex({status: BMI.healthRange, bmi: finale})
    }
  }, [activeUser])


  const [imageDimensions, setImageDimensions] = useState({width: 0, height: 0})
  useEffect(() => {
    const {width, height} = Image.resolveAssetSource(BMI)
      const screenWidth = Dimensions.get('window').width
      const scaleFactor = width / screenWidth;
      const imageHeight = height/ scaleFactor
      setImageDimensions({width: screenWidth, height: imageHeight})
  
  }, [BMI])

  return (
    <>
        {imageDimensions.height > 0 && imageDimensions.width ? (
          <LinearGradient 
            useAngle={true}
            angle={274}
            locations={[0, 1.25]}
            colors={[theme.linearType1Clr1, theme.linearType1Clr2]}
            style={[styles.BMIContainer]}
          >
            <ImageBackground resizeMode="contain" source={BMI} style={[styles.BMIBackground, {height: imageDimensions.height}]}>
              <View style={[styles.BMIContent]}>
                <View style={[styles.BMITextContent]}>
                  <Text style={[styles.text, { color: color.white }]}>BMI (Body Mass Index)</Text>
                  <Text style={[styles.subtext, { color: color.white }]}>You have a {BMIIndex.status.length != 0 ? BMIIndex.status : 'normal'} weight</Text>
                </View>
                <Tab name='View more' isDisabled={false} onPress={()=> navigation.navigate(Routes.Activity)} />
              </View>
              <View style={[styles.BMIDiagram]}>
                <Image source={appTheme ? pieDark: pie} style={[styles.pieImage]} />
                <Text style={[styles.pieText, {color: theme.header}]}>{BMIIndex.bmi.length != 0 ? BMIIndex.bmi : '20,1'}</Text>
              </View>
            </ImageBackground>
          </LinearGradient>

        ) : (<Loader height={200} />)}
    </>
  )
}

export default BMICard

const styles = StyleSheet.create({
    BMIContainer: {
        borderRadius: horizontalScale(22),
      },
      BMIBackground: {
        flexDirection: 'row',
        borderRadius: horizontalScale(22),
        justifyContent: 'space-between',
        alignItems: "center",
        padding: horizontalScale(20)
      },
      BMIContent: {
        gap: 15
      },
      BMITextContent:{ },
      text: {
        fontFamily: getFontFamily('Poppins', '600'),
        fontSize: fontScale(14),
        lineHeight: fontScale(21),
      },
      subtext: {
        fontFamily: getFontFamily('Poppins', '400'),
        fontSize: fontScale(13),
        lineHeight: fontScale(18),
      },
      BMIDiagram: {
        flex: 1,
        alignItems: 'center'
      },
      pieImage: {},
      pieText: {
        fontFamily: getFontFamily('Poppins', '600'),
        fontSize: fontScale(13),
        lineHeight: fontScale(18),
        color: color.white,
        position: 'absolute',
        right: horizontalScale(20),
        top: verticalScale(35),
      },
})
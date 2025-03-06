import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../../themes'
import { useTheme } from '../../../context/ThemeContext'
import Animated, { FadeInDown, FadeInRight, Easing } from 'react-native-reanimated'
import { scaling, color} from '../../../themes/themes';
import { ActionBtn, Foreview, OptionCarousel, Welcome2 } from '../../../components'
import { data } from '../../../data/constants'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserInfo } from '../../../redux/reducers/AccountCreationInfo'
import { Routes } from '../../../navigation/Routes'
import { saveProfileInfoData } from '../../../api/saveToCloud'

const {horizontalScale, verticalScale} = scaling

const {width} = Dimensions.get('window')

const Flow3 = ({navigation}) => {
  const {theme} = useTheme()
  const dispatch = useDispatch()

  const info = useSelector(state => state.userInfo)
  
  const [goals, setGoals] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  useEffect(() => {
    setGoals(data[focusedIndex])
  }, [])
  
  
  const completeAccountCreation = async () => {
    setLoading(true)
    setError('')
    const profileCompleted = await saveProfileInfoData(info)
    if(profileCompleted.success) {
      setLoading(false)
      navigation.navigate(Routes.SignupFlow4)
    }
    setLoading(false)
    setError(profileCompleted.error)
  }
  
  //todo  For the carousels

  const [focusedIndex, setFocusedIndex] = useState(0)
  const flatlistRef = useRef(null)
  
  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  }

  const onViewableItemsChanged = ({viewableItems}) => {
    if(viewableItems.length > 0) {
      setFocusedIndex(viewableItems[0].index)
      setGoals(data[viewableItems[0].index])
      dispatch(updateUserInfo({goals: data[viewableItems[0].index].title}))
    }
  }

  const renderItem = ({item, index}) => {
    const isFocused = index === focusedIndex
    return (
      <View style={[{gap: 15, flexDirection: 'row'}]}>
      <Foreview first={true} />
      <OptionCarousel item={item} focused={isFocused} />
      <Foreview last={true} />
      </View>
    )
  }

  return (
    <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background, gap: 50, paddingVertical: verticalScale(30)}]}>
      <StatusBar backgroundColor={theme.background} barStyle={theme.statusBarTextColor}  />

      <Animated.View style={[styles.message, {paddingHorizontal: horizontalScale(25), width: width*0.75}]} entering={FadeInRight.delay(200).springify().easing(Easing.ease)}>
        <Welcome2 centerAlign={true} headerText='What is your goal ?' subText='It will help us to choose a best program for you' />
      </Animated.View>
      <View style={[styles.carouselContainer]}>
        <Animated.FlatList
          entering={FadeInDown.delay(300).springify().easing(Easing.bounce)}
          ref={flatlistRef}
          data={data}
          horizontal
          decelerationRate={0}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
          snapToInterval={width}
        />
      </View>

      <Animated.View entering={FadeInDown.delay(400).springify().easing(Easing.bounce)} style={styles.bottom}>
        <ActionBtn actionText='Confirm' onPress={completeAccountCreation} />
      </Animated.View>

    </SafeAreaView>
  )
}

export default Flow3

const styles = StyleSheet.create({
  message: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottom: {
    paddingHorizontal: horizontalScale(25)
  },
  foreView: {
    backgroundColor: color.white,
    height: '80%',
    alignSelf: 'center',
    width: width*0.06, 
  },
  first: {
    borderTopRightRadius: horizontalScale(20),
    borderBottomRightRadius: horizontalScale(20)
  },
  last: {
    borderTopLeftRadius: horizontalScale(20),
    borderBottomLeftRadius: horizontalScale(20)
  },
})
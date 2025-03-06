import { SafeAreaView, ScrollView, StyleSheet, Text,  View } from 'react-native'
import React from 'react'
import { Icon, Instructions,  PageHeader, Title} from '../../../components'
import { globalStyles } from '../../../themes'
import { useTheme } from '../../../context/ThemeContext'
import { getFontFamily, scaling } from '../../../themes/themes'
import Animated, { Easing, FadeInLeft, FadeInRight, FadeInUp, SlideInRight, } from 'react-native-reanimated'
import FastImage from 'react-native-fast-image'
import { Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const {horizontalScale, verticalScale, fontScale} = scaling
const {width} = Dimensions.get('window')



const Articles = ({route}) => {
  const {theme} = useTheme()
  const {articleItem}= route.params

  return (
    <SafeAreaView style={[globalStyles.appScreen, {backgroundColor: theme.background, paddingVertical: verticalScale(30)}]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1,  rowGap: 35}}>
        <Animated.View collapsable={false} entering={FadeInUp.delay(100).springify()} style={styles.header}>
          <PageHeader headerText={articleItem.category} />
        </Animated.View>

        {/* Article Title & Publish Date */}
        <View style={[styles.articleContentContainer, styles.header]}>
          <Animated.Text entering={SlideInRight.delay(200).springify()} style={[styles.articleTitleText, {color: theme.header}]}>{articleItem.title}</Animated.Text>
          <View style={styles.publishContainer}>
            <Animated.View entering={SlideInRight.delay(300).springify()} style={styles.publishDate}>
              <Icon name='verified' color={theme.progressTrackerB2} size={fontScale(16)} />
              <Text style={[styles.articlePublishText, {color: theme.subText}]}>Published on {articleItem.publishDate} ({articleItem.readingTime})</Text>
            </Animated.View>
            <Text style={[styles.articlePublishText, {color: theme.subText}]}>{articleItem.author}</Text>
          </View>
        </View>

        {/* Article Main Image */}
        <LinearGradient
              useAngle={true}
              angle={274}
              locations={[-0.84, 1.42]}
              colors={[theme.linearType1Clr1, theme.linearType1Clr2]}
              style={[styles.articleImageContainer]}
          >
            <FastImage priority={FastImage.priority.high} resizeMode='cover' source={articleItem.imageSecondarylink} style={styles.articleImage} />
          </LinearGradient>

          {/* Articles first Description */}
          <Animated.View entering={FadeInRight.delay(500).easing(Easing.ease)} style={[styles.articleMainDescription, styles.header]}>
            <Text numberOfLines={5} style={[styles.articleDescriptionText, {color: theme.header}]}>{articleItem.description}</Text>
          </Animated.View>

          {/* Tips */}
          <View style={[styles.articleTipContainer, styles.header]}>
            <Title colorTheme={theme.linearType2Clr1} name={`${articleItem.category} Tips`} />
            <View style={styles.articleTipMainContainer}>
              {articleItem.tips.map((item, i) => (
                <Animated.View key={i} entering={FadeInLeft.delay((i + articleItem.tips.length) * 100+500).easing(Easing.ease)}>
                  <Instructions index={i}  instruction={item} />
                </Animated.View>
              ))}
            </View>
          </View>

          {/* last Remarks/Description */}
          <Animated.View entering={SlideInRight.delay(600)} style={[styles.articleTipContainer, styles.header]}>
            <Title colorTheme={theme.linearType2Clr1} name='Summary' />
            <Text style={[styles.articleDescriptionText, {color: theme.header}]}>{articleItem.extraDescription}</Text>
          </Animated.View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Articles

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: horizontalScale(22)
  },
  articleContentContainer: {
    gap: 8
  },
  articleTitleText: {
    fontFamily: getFontFamily('Poppins', '800'),
    fontSize: fontScale(18),
    lineHeight: fontScale(30),
  },
  publishContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  publishDate: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  articlePublishText: {
    fontFamily: getFontFamily('Poppins', '300'),
    fontSize: fontScale(12),
    lineHeight: fontScale(18),
  },
 articleImageContainer: {
  backgroundColor: 'red',
  width: '100%',
  height: width*0.6,
  alignItems: 'center',
  justifyContent: 'center'
 },
 articleImage: {
  width: width*0.85,
  height: width*0.5,
  borderRadius: horizontalScale(20)
 },
 articleMainDescription: {},
 articleDescriptionText: {
  fontFamily: getFontFamily('Poppins', '400'),
  fontSize: fontScale(13),
  lineHeight: fontScale(18),
  letterSpacing: 0.4
 },
 articleTipContainer: {
  gap: 15
},
 articleTipMainContainer: {
  gap: 15
},
})
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '../../../context/ThemeContext'
import { ActionBtn } from '../../../components'
import { scaling, color, getFontFamily } from '../../../themes/themes'
import { globalStyles } from '../../../themes'
import { Routes } from '../../../navigation/Routes'
import Animated,{ FadeInDown, FadeInUp} from 'react-native-reanimated'

const {horizontalScale, verticalScale, fontScale} = scaling



const Welcome = ({navigation}) => {
  const {theme} = useTheme()
  return (
    <View style={[globalStyles.appScreen]}>
      <StatusBar barStyle={'light-content'} backgroundColor={theme.linearType1Clr1} />
      <LinearGradient
        useAngle={true}
        angle={274}
        locations={[0, 1.24]}
        colors={[theme.linearType1Clr1, theme.linearType1Clr2]}
        style={[globalStyles.appScreen, styles.header, globalStyles.spacePadding]}
      >
        {/* Content Here, not confuse yourself */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.headerContainer]}>
          <Text style={[styles.headerText]}>didpool <Text style={[styles.headerTextExtra]}>fit</Text></Text>
          <Text style={[styles.headerSubText]}>everybody can Train</Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).springify()} style={[styles.headerFooter]}>
          <ActionBtn actionText='Get started' onPress={() => navigation.push(Routes.Prompt)} />
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

export default Welcome

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: verticalScale(30),
    flex: 0.8
  },
  headerText: {
    textTransform: 'uppercase',
    fontFamily: getFontFamily('Poppins', '700'),
    fontSize: fontScale(36),
    color: color.white
  },
  headerTextExtra: {
    color: color.black,
    textTransform: 'capitalize'
  },
  headerSubText: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(18),
    textTransform: 'capitalize',
    color: color.white
  },
  headerFooter: {
    marginBottom: verticalScale(30),
    alignItems: 'center',
  }
})
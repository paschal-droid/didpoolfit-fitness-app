import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {color, getFontFamily, scaling} from '../../themes/themes';
import LinearGradient from 'react-native-linear-gradient';
import Tab from './Tabs';
import {useTheme} from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../navigation/Routes';

const {horizontalScale, verticalScale, fontScale} = scaling;

const TargetCard = ({name, tabName}) => {
  const appTheme = useColorScheme() === 'dark';
  const {theme} = useTheme();
  const navigation = useNavigation()
  
  return (
    <LinearGradient
      useAngle={true}
      angle={274}
      locations={[0, 1.25]}
      colors={[theme.linearType1Clr1, theme.linearType1Clr2]}
      style={[styles.targetContainer]}>
      <View
        style={[
          styles.shadowContainer,
          {backgroundColor: appTheme ? color.shadowDark : color.shadowLight},
        ]}
      />
      <Text style={[styles.targetText, {color: theme.header}]}>
        {name}
      </Text>
      <Tab onPress={() => navigation.navigate(Routes.WorkoutSchedule)} name={tabName} padding={12} />
    </LinearGradient>
  );
};

export default TargetCard;

const styles = StyleSheet.create({
  targetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: horizontalScale(18),
    borderRadius: horizontalScale(16),
  },
  targetText: {
    fontFamily: getFontFamily('Poppins', '500'),
    fontSize: fontScale(14),
    textTransform: 'capitalize',
    lineHeight: fontScale(21),
  },
  shadowContainer: {
    position: 'absolute',
    borderRadius: horizontalScale(16),
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

import {StyleSheet, Text, TouchableOpacity, useColorScheme, View} from 'react-native';
import React from 'react';
import {color, getFontFamily, scaling} from '../../themes/themes';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';
import Icon from '../Icon/Icon';
import PropTypes from 'prop-types';

const {horizontalScale, verticalScale, fontScale} = scaling;

const GradientCard = ({title, icon, subTitle, gradientType}) => {
  const appTheme = useColorScheme() === 'dark';
  const {theme} = useTheme();

  return (
    <TouchableOpacity>
        <LinearGradient
            useAngle={true}
            angle={274}
            locations={[0, 1.25]}
            colors={ gradientType ? [theme.linearType1Clr1, theme.linearType1Clr2] : [theme.progressTrackerB2, theme.progressTrackerB1]}
            style={[styles.gradientContainer]}>
            <View
                style={[
                styles.shadowContainer,
                {backgroundColor: appTheme ? color.shadowDark : color.shadowLight},
                ]}
            />
            <View style={styles.gradientLeftContainer}>
                <Icon color={theme.paragraph} name={icon} size={fontScale(22)}  />
                <Text style={[styles.gradientLeftText, {color: theme.paragraph}]}>{title}</Text>
            </View>
            <View style={styles.gradientLeftContainer}>
                <Text style={[styles.gradientRightText, {color: theme.paragraph}]}>{subTitle}</Text>
                <Icon color={theme.paragraph} name='arrow-right' size={fontScale(22)}  />
            </View>
        </LinearGradient>
    </TouchableOpacity>
  );
};

GradientCard.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    gradientType: PropTypes.bool.isRequired
}

export default GradientCard;

const styles = StyleSheet.create({
  gradientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: horizontalScale(18),
    borderRadius: horizontalScale(16),
  },
  gradientLeftContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradientLeftText: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(13),
    textTransform: 'capitalize',
    lineHeight: fontScale(18),
  },
  gradientRightText: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(11),
    lineHeight: fontScale(15),
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

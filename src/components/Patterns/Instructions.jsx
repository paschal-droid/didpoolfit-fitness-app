import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {color, getFontFamily, scaling} from '../../themes/themes';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const {horizontalScale, verticalScale, fontScale} = scaling;

const Instructions = ({index, instruction}) => {
  const {theme} = useTheme();

  return (
    <View style={styles.instructionsContainer}>
        <Text style={[styles.indexText, {color: theme.linearType2Clr1}]}>0{index+1}</Text>
        <View>
        <LinearGradient
              useAngle={true}
              angle={274}
              locations={[-0.84, 1.42]}
              colors={[theme.linearType1Clr1, theme.linearType1Clr2]}
              style={[styles.actionContainer]}
          >
            <AnimatedCircularProgress
                size={horizontalScale(20)}
                width={1}
                fill={100}
                tintColor={theme.linearType1Clr1}
                backgroundColor={color.white}
                style={styles.progressBar}
            />
          </LinearGradient>
        </View>
        <Text style={[styles.instructionText, {color: theme.header}]}>{instruction}</Text>
    </View>
  );
};

export default Instructions;

const styles = StyleSheet.create({
  instructionsContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  indexText: {
    fontFamily: getFontFamily('Poppins', '600'),
    fontSize: fontScale(14),
    lineHeight: fontScale(21),
    letterSpacing: 0.4
  },
  instructionText: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(13),
    lineHeight: fontScale(21),
    letterSpacing: 0.4,
    flex: 1,
    textAlignVertical: 'center'
  },
  actionButton: {
    width: horizontalScale(50),
    height: horizontalScale(50),
    borderRadius: horizontalScale(1000),
    marginBottom: verticalScale(20),
    marginRight: horizontalScale(25)
},
actionContainer: {
    width: horizontalScale(12),
    height: horizontalScale(12),
    borderRadius: verticalScale(1000),
    alignItems: 'center',
    justifyContent: 'center'
},
progressBar: {
    position: 'absolute',
}
});

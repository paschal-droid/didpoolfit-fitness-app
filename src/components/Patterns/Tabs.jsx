import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { color, getFontFamily, scaling } from '../../themes/themes';
import { useTheme } from '../../context/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';

const { fontScale, horizontalScale, verticalScale } = scaling;

const Tab = props => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const textRef = useRef(null);
  const paddingY = 20;
  const { theme } = useTheme();
  const tabWidth = { width: props.padding ? horizontalScale(props.padding + props.padding/2 + width) : horizontalScale(paddingY + 15 + width) };
  const tabheight = { height: props.padding ? horizontalScale(props.padding + props.padding/2 + height) : horizontalScale(paddingY + height) };
  const buttonWidth = e => {
    setWidth(e.nativeEvent.lines[0].width);
    setHeight(e.nativeEvent.lines[0].height);
  };

  return (
    <TouchableOpacity onPress={props.onPress}>
    <LinearGradient
      useAngle={true}
      angle={274}
      locations={[-0.84, 1.42]}
      colors={[theme.linearType2Clr1, theme.linearType2Clr2]}
      style={[styles.actionContainer, tabWidth, tabheight]}
    >
        <Text
          ref={textRef}
          onTextLayout={e => buttonWidth(e)}
          style={[styles.actionText, { color: color.white }]}>
          {props.name}
        </Text>
    </LinearGradient>
      </TouchableOpacity>
  );
};

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func,
};

Tab.props = {
  isDisabled: false,
  onPress: () => { },
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    borderRadius: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionText: {
    fontFamily: getFontFamily('Poppins', '600'),
    fontSize: fontScale(11),
    lineHeight: fontScale(15),
    color: color.white,
  },
});

export default Tab;

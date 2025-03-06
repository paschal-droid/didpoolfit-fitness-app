import { StyleSheet, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { scaling, getFontFamily, color} from '../../themes/themes'
import { useTheme } from '../../context/ThemeContext'
import Icon from '../Icon/Icon'


const {horizontalScale, verticalScale, fontScale} = scaling

const AuthInput = ({icon = 'user', handleTextChange = () => {}, search = '', placeholderText= '', extraIcon = false, auth=false, extraIconName='', keyboardType}) => {
    const {theme} = useTheme()
    const [visibility, setVisibility] = useState(false)

  return (
    <View style={[styles.inputContainer, {backgroundColor: theme.input}]}>
      <Icon
        style={[styles.inputAction]}
        name={icon}
        size={fontScale(20)}
        color={theme.icon}
      />
      <TextInput
        secureTextEntry={extraIcon && !visibility}
        value={search}
        onChangeText={value => handleTextChange(value)}
        keyboardType={keyboardType ? keyboardType : 'default'}
        placeholder={placeholderText}
        placeholderTextColor={theme.icon2}
        style={[styles.input, {color: theme.icon2}]}
      />
      {extraIcon &&
        (auth ? (
          <Icon
            onPress={() => setVisibility(!visibility)}
            style={styles.inputAction2}
            name={visibility ? 'eye' : 'hide-password1'}
            size={fontScale(20)}
            color={theme.icon}
          />
        ) : (
          <></>
        ))}
    </View>
  );
}


AuthInput.propTypes = {
  handleTextChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  extraIcon: PropTypes.bool,
  auth: PropTypes.bool,
  extraIconName: PropTypes.string,
  keyboardType: PropTypes.string,
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    height: verticalScale(45),
    flexDirection: 'row',
    flex: 1,
    borderRadius: verticalScale(14),
    alignItems: 'center',

  },
  input: {
    flex: 1,
    marginLeft: horizontalScale(42),
    marginRight: horizontalScale(20),
    fontFamily: getFontFamily('Poppins', '500'),
    fontSize: fontScale(14),
  },
  inputAction: {
    position: 'absolute',
    left: horizontalScale(16),
    height: '100%',
    width: horizontalScale(20),
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  inputAction2: {
    position: 'absolute',
    right: horizontalScale(16),
    height: '100%',
    width: horizontalScale(20),
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});


export default AuthInput

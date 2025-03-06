import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { scaling, getFontFamily, color} from '../../themes/themes'
import { useTheme } from '../../context/ThemeContext'
import Icon from '../Icon/Icon'
import { SelectList } from 'react-native-dropdown-select-list'


const {horizontalScale, verticalScale, fontScale} = scaling

const SelectInput = ({data, handleSelection, placeholder, icon}) => {
    const {theme} = useTheme()

  return (
      <View style={[styles.dropdown]}>
          <Icon name={icon} color={theme.icon} style={styles.dropdownIcon} size={fontScale(20)} />
          <SelectList
            setSelected={(val) => handleSelection(val)}
            data={data}
            save="value"
            search={false}
            boxStyles={[styles.inputContainer, { backgroundColor: theme.input, borderColor: theme.input }]}
            inputStyles={[styles.inputStyles, { color: theme.icon2 }]}
            dropdownTextStyles={[styles.dropdownText, { color: theme.icon2 }]}
            dropdownStyles={[styles.dropdownContainer, { backgroundColor: theme.input, borderColor: theme.input }]}
            arrowicon={<Icon name='caret' size={fontScale(20)} color={theme.icon} />}
            placeholder={placeholder}
          />
      </View>
  );
}


SelectInput.propTypes = {
  handleSelection: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
    dropdownText: {
        fontFamily: getFontFamily('Poppins', '500'),
        fontSize: fontScale(14),
    },
    dropdownContainer: {},
    dropdown: {},
    dropdownIcon: {
        position: 'absolute',
        left: horizontalScale(16),
        top: horizontalScale(14),
        height: horizontalScale(20),
        zIndex: 10,
        width: horizontalScale(20),
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    inputContainer: {
        justifyContent: 'center',
        height: verticalScale(45),
        flexDirection: 'row',
        flex: 1,
        borderRadius: horizontalScale(16),
        alignItems: 'center',
    },
    inputStyles: {
        marginLeft: horizontalScale(30),
        flex: 1,
        fontFamily: getFontFamily('Poppins', '500'),
        fontSize: fontScale(14),
    },
});


export default SelectInput

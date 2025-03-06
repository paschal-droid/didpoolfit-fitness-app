import { StyleSheet, Switch, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PropTypes from 'prop-types'


import { color, scaling, getFontFamily } from '../../themes/themes';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../Icon/Icon';

const {horizontalScale, verticalScale, fontScale} = scaling


const Setting = ({icon, title, extraIcon='', onPress}) => {
    const {theme} = useTheme();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  return (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.settingContainer}>
            <View style={[styles.settingGroupA]}>
                <Icon name={icon} color={theme.progressTrackerB2} size={fontScale(20)}  />
                <Text style={[styles.settingTitle]}>{title}</Text>
            </View>
            <View style={[styles.settingGroupB]}>
                {extraIcon != '' ? (
                    <Icon name={extraIcon} size={fontScale(18)} />
                ) : (
                    <Switch
                        trackColor={{false: '#767577', true: theme.progressTrackerB2}}
                        thumbColor={isEnabled ? theme.background : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                )}
            </View>
        </View>
    </TouchableOpacity>
  )
}

Setting.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    extraIcon: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired

}

export default Setting

const styles = StyleSheet.create({
    settingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    settingGroupA: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-end'
    },
    settingTitle: {
        fontFamily: getFontFamily('Poppins', '400'),
        fontSize: fontScale(13),
        lineHeight: fontScale(18),
        letterSpacing: 0.4,
        textTransform: 'capitalize',
        color: color.gray
    },
    settingGroupB: {},
})
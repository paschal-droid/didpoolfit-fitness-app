import { StyleSheet, Text, View } from 'react-native'
import React, { act } from 'react'
import FastImage from 'react-native-fast-image'
import { useTheme } from '../../context/ThemeContext'
import Stats from '../Patterns/Stats'
import { useSelector } from 'react-redux'
import Tab from '../Patterns/Tabs'


import profileM from '../../assets/images/profile_m.png' 
import profileF from '../../assets/images/profile_f.png' 
import { scaling, getFontFamily, color } from '../../themes/themes'

const {horizontalScale, verticalScale, fontScale} = scaling


const ProfileInfoCard = () => {
    const {theme} = useTheme()
    const {activeUser} = useSelector(state => state.user)    

    const age = new Date().getFullYear() - new Date(activeUser.dateOfBirth.seconds*1000).getFullYear()

  return (
    <View style={styles.userInfoContainer}>
        <View style={styles.profileInfo}>
            <View style={{gap: 15, flexDirection: 'row', alignItems: 'center'}}>
            {activeUser.profileUrl === null  ? (
                <FastImage resizeMode='contain' style={styles.profileImage} source={activeUser.gender === 'Male' ? profileM : profileF} />
            ) : (
                <FastImage priority={FastImage.priority.high}  style={styles.profileImage} source={{uri: activeUser.profileUrl}} />
            )}
            <View style={styles.profileInfoExtra}>
                <Text style={[styles.profileInfoText, {color: theme.header}]}>{activeUser.firstName} {activeUser.lastName}</Text>
                <Text style={[styles.profileInfoSubtext]}>{`${activeUser.goal} Program`}</Text>
            </View>
            </View>
            <Tab name="Edit"  />
        </View>

        <View style={styles.profileStatsContainer}>
            <Stats stat={`${activeUser.height}cm`} title='Height' />
            <Stats stat={`${activeUser.weight}kg`} title='Weight' />
            <Stats stat={`${age}yo`} title='Age' />
        </View>
    </View>
  )
}

export default ProfileInfoCard

const styles = StyleSheet.create({
  userInfoContainer: {
    gap: 25,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: horizontalScale(55),
    height: horizontalScale(55),
    borderRadius: horizontalScale(55),
  },
  profileInfoExtra: {
    gap: 2,
  },
  profileInfoText: {
    fontFamily: getFontFamily('Poppins', '500'),
    fontSize: fontScale(14),
    lineHeight: fontScale(21),
  },
  profileInfoSubtext: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(12),
    lineHeight: fontScale(18),
    color: color.gray,
  },
  profileStatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../../context/ThemeContext'
import { color, getFontFamily, scaling } from '../../themes/themes'
import Icon from '../Icon/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { normalizeTime, scheduleFormat } from '../../data/constants'
import { confirmCheckedSchedule } from '../../redux/reducers/WorkoutSchedule'
import LinearGradient from 'react-native-linear-gradient'


const { verticalScale, horizontalScale, fontScale } = scaling
const { height, width } = Dimensions.get('window')

const ScheduleInfoModal = ({openModal, setOpenModal}) => {
    const {theme} = useTheme()
    const dispatch = useDispatch()
    
    const {selectedSchedule} = useSelector(state => state.workoutSchedule)
    const [isDisabled, setIsDisabled] = useState(selectedSchedule.checked)
        
    const handleCheckedScheule = () => {
      dispatch(confirmCheckedSchedule({checked: true, id: selectedSchedule.id}))
      setIsDisabled(true)
    }
    

  return (
    <Modal visible={openModal} animationType="slide" transparent>
        <View style={[styles.modal]}>
            <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
                <View style={[styles.background]} />
            </TouchableWithoutFeedback>
            <View style={[styles.modalContainer, {backgroundColor: theme.background }]}>
                <View style={[styles.modalHeader]}>
                  <TouchableOpacity style={{ padding: horizontalScale(10)}} onPress={() => setOpenModal(false)}>
                    <Icon name='close' size={fontScale(16)} color={theme.header} />
                  </TouchableOpacity>
                    <Text style={[styles.headerText, {color: theme.header}]}>Workout Schedule</Text>
                    <Icon name='ellipsis' size={fontScale(20)} color={theme.header} />
                </View>

                <View style={styles.modalContent}>
                    <Text style={[styles.workoutText, {color: theme.header}]}>{selectedSchedule?.workout}</Text>
                    <View style={styles.workoutTime}>
                        <Icon name='clock' size={fontScale(20)} color={theme.paragraph} />
                        <Text style={[styles.workoutTimeText, {color: theme.paragraph}]}>{scheduleFormat(selectedSchedule.date.split(' ')[0])} | {normalizeTime(selectedSchedule.time)}</Text>
                    </View>
                </View>

                <View style={styles.markSchedule}>
                    <TouchableOpacity disabled={isDisabled} onPress={handleCheckedScheule} style={[styles.actionButton]}>
                        <LinearGradient
                            useAngle={true}
                            angle={274}
                            locations={[-0.84, 1.42]}
                            colors={[theme.progressTrackerB2, theme.progressTrackerB1]}
                            style={[styles.actionContainer, isDisabled && {opacity: 0.6}]}
                        >
                            <Text style={[styles.actionText]}>Mark as Done</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    </Modal>
  )
}

ScheduleInfoModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
}

export default ScheduleInfoModal

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  modalContainer: {
    height: width*0.7,
    width: width*0.85,
    padding: horizontalScale(30),
    gap: 24,
    borderRadius: horizontalScale(15),
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0, 0.45)'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontFamily: getFontFamily('Poppins', '700'),
    fontSize: fontScale(17),
    lineHeight: fontScale(24)
  },
  modalContent: {
    gap: 10,
    alignItems: 'flex-start'
  },
  workoutText: {
    fontFamily: getFontFamily('Poppins', '500'),
    fontSize: fontScale(15),
    lineHeight: fontScale(21)
  },
  workoutTime: {
    flexDirection: 'row',
    gap: 10
  },
  workoutTimeText: {
    fontFamily: getFontFamily('Poppins', '400'),
    fontSize: fontScale(13),
    lineHeight: fontScale(18)
  },
  markSchedule: {
  },
  
actionContainer: {
    width: '95%',
    flexDirection: 'row',
    gap: 10,
    height: verticalScale(42),
    borderRadius: verticalScale(100),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
},
actionText: {
    fontFamily: getFontFamily('Poppins', '700'),
    fontSize: fontScale(13),
    color: color.white,
    letterSpacing: 0.4
},
  
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'

const OnboardSubtitle = () => {
  return (
    <View style={{width: 100, height: 100}}>
      <Text>OnboardSubtitle</Text>
    </View>
  )
}

OnboardSubtitle.propTypes = {
    subtitle: PropTypes.string.isRequired
}

export default OnboardSubtitle

const styles = StyleSheet.create({})
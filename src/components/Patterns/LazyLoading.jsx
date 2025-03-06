import { StyleSheet, View, ActivityIndicator, useColorScheme } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '../../context/ThemeContext'
import { color } from '../../themes/themes'

const LazyLoading = ({width, height}) => {

  const {theme} = useTheme()
  
  return (
    <View
      style={[
        styles.loadingContainer,
        {backgroundColor: theme.background, height: height ? height : '100%'},
        !height && {
          flex: 1,
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }
      ]}>
      <ActivityIndicator
        style={styles.loader}
        size={'large'}
        color={theme.linearType1Clr2}
      />
    </View>
  );
}

LazyLoading.propTypes = {
  defaultBg: PropTypes.bool,
  height: PropTypes.number,

}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    zIndex: 1001,
  },
});


export default LazyLoading
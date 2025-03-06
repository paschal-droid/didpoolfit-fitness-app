import auth from '@react-native-firebase/auth'
import { ThemeProvider } from './src/context/ThemeContext'
import { NavigationContainer } from '@react-navigation/native';
import BootSplash from "react-native-bootsplash";
import {Provider} from  'react-redux'
import store, { persistor } from './src/redux/store';
import MainNavigation from './src/navigation/MainNavigation';
import { useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigation from './src/navigation/AuthNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';




const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '922065492010-548keh7ld4290qs0fchmijebo23uoder.apps.googleusercontent.com',
  })
  }, [])

  LogBox.ignoreLogs(['Warning: Page: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.'])

  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [registrationCompleted, setRegistrationCompleted] = useState(false)


  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false)
    }
    
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber //unsubscribe after app has been loaded, we no longer need to check for the state of the user
  }, [])

  useEffect(() => {
    const loadRegistrationStatus = async () => {
      const value = await AsyncStorage.getItem('registrationCompleted');
      const registrationCompleted = value === 'true';
      setRegistrationCompleted(registrationCompleted);
      setLoading(false);
    };
    loadRegistrationStatus();
  }, []);

  

  if (initializing || loading) return null;


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer onReady={() => {BootSplash.hide()}}>
          <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            {user && registrationCompleted ? <MainNavigation /> : <AuthNavigation />}
          </GestureHandlerRootView>
          </ThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
    
  )
}

export default App


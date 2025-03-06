import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
import { updateUserInfo } from '../redux/reducers/AccountCreationInfo';

// Function to handle user data in Firestore
const handleUserDataInFirestore = async (user, dispatch) => {
  const userRef = await firestore().collection('users').where('email', '==', user.email).get();

  if (!userRef.empty) {
    const existingUserDoc = userRef.docs[0];
    await firestore().collection('users').doc(existingUserDoc.id).update({
      uid: user.uid,
      profileUrl: user.photoURL,
      firstName: user.displayName.split(' ')[0],
      lastName: user.displayName.split(' ')[1],
    });
    dispatch(updateUserInfo({existingUser: true}))
    console.log('Existing user updated in Firestore');
  } else {
    await firestore().collection('users').doc(user.uid).set({
      createdAt: firestore.Timestamp.fromDate(new Date()),
      profileUrl: user.photoURL,
      firstName: user.displayName.split(' ')[0],
      email: user.email,
      uid: user.uid,
      lastName: user.displayName.split(' ')[1],
    });
    dispatch(updateUserInfo({existingUser: false, email: user.email}))
    console.log('New user created in Firestore');
  }
};

// Facebook login function
export async function facebookLogin(dispatch) {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    try {
      const authResult = await auth().signInWithCredential(facebookCredential);
      const user = authResult.user;
      await handleUserDataInFirestore(user, dispatch);
      return { status: true };
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        Alert.alert(
          'Account Exists',
          'An account already exists with the same email address but different sign-in credentials. Please sign in using a provider associated with this email address.',
          [
            { text: 'OK' },
            // Optionally, you can add more buttons here if needed
          ]
        );
      }
      throw error;
    }
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return { error: 'The email you entered is already in use.', status: false };
    } else if (error.code === 'auth/invalid-email') {
      return { error: 'Please enter a valid email address', status: false };
    } else if(error.code === 'auth/network-request-failed'){
      return {error: 'No Internet Connection', status: false}
    }
    return { error: `Something went wrong: ${error}`, status: false };
  }
}

// Google login function
export const googleLogin = async (dispatch) => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    try {
      const authResult = await auth().signInWithCredential(googleCredential);
      const user = authResult.user;
      await handleUserDataInFirestore(user, dispatch);
      return { status: true };
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        Alert.alert(
          'Account Exists',
          'An account already exists with the same email address but different sign-in method. Sign in using another provider linked to this email.',
          [
            { text: 'OK' },
            // Optionally, you can add more buttons here if needed
          ]
        );
      }
      throw error;
    }
  } catch (error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      Alert.alert(
        'Account Exists',
        'An account already exists with the same email address but different sign-in method. Sign in using another provider linked to this email.',
        [
          { text: 'OK' },
          // Optionally, you can add more buttons here if needed
        ]
      );
    } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return {error: 'Sign in cancelled', status: false}
    } else if (error.code === statusCodes.IN_PROGRESS) {
     return {error: 'Sign in in progress', status: false};
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      return {error: 'Play services not available', status: false}
    } else if(error.code === 'auth/network-request-failed'){
      return {error: 'No Internet Connection', status: false}
    } 
    else {
      console.log('Google login error:', error);
      return {error: `Something went wrong: ${error}`, status: false}
    }
  }
};


export const createUser = async(fullname, email, password ) => {
  try {
    const authResult = await auth().createUserWithEmailAndPassword(email, password)
    const user = authResult?.user
    if (user) {
    user.updateProfile({displayName: fullname})
    return { status: true };
  }
      
  } catch (error) {
      if(error.code === 'auth/email-already-in-use!'){
         return {error: 'The email you entered is already in use.'}
      }
      else if (error.code === 'auth/account-exists-with-different-credential' || error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Account Exists',
          'An account already exists with the same email address but different sign-in method. Sign in using another provider linked to this email.',
          [
            { text: 'OK' },
            // Optionally, you can add more buttons here if needed
          ]
        );
      }
      if (error.code === 'auth/wrong-password') {
        Alert.alert(
          'Signup Failed',
          'The email you entered is already in use.',
          [{ text: 'OK' }]
        );
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert(
          'Signup Failed',
          'This email does not exist. Please create a new account.',
          [{ text: 'OK' }]
        );
      } else if (error.code === 'auth/invalid-credential') {
        Alert.alert(
          'Signup Failed',
          'You have entered an incorrect password or email. Check and try again.',
          [{ text: 'OK' }]
        );
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert(
          'Invalid Email',
          'Please enter a valid email address.',
          [{ text: 'OK' }]
        );
      } else if (error.code === 'auth/network-request-failed') {
        Alert.alert(
          'Network Error',
          'No Internet Connection.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Signup Failed',
          `Something went wrong: ${error.message}`,
          [{ text: 'OK' }]
        );
      }
    return { status: false, error: error.message };
  }
}

export const loginUser = async (email, password) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    const token = await response.user.getIdToken();
    return { status: true, token };


  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      Alert.alert(
        'Login Failed',
        'The email you entered is already in use.',
        [{ text: 'OK' }]
      );
    } else if (error.code === 'auth/user-not-found') {
      Alert.alert(
        'Login Failed',
        'This email does not exist. Please create a new account.',
        [{ text: 'OK' }]
      );
    } else if (error.code === 'auth/invalid-credential') {
      Alert.alert(
        'Login Failed',
        'You have entered an incorrect password or email. Check and try again.',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Login Failed',
        error.message,
        [{ text: 'OK' }]
      );
    }
    return { status: false, error: error.message };
  }
};

export const signOut = async () => {
  await auth().signOut()
}

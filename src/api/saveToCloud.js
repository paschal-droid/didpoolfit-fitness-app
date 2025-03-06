import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const saveProfileInfoData = async (userData) => {
    const userRef = await firestore().collection('users').where('email', '==', userData?.email).get();

    try {
        if (!userRef.empty) {
            await firestore().collection('users').doc(auth().currentUser.uid).collection('data').add({
                weight: parseInt(userData.weight),
                height: parseInt(userData.height),
                dateOfBirth: firestore.Timestamp.fromDate(userData.dateOfBirth),
                gender: userData.gender,
                goal: userData.goals
            })
        } else {
            await firestore().collection('users').doc(auth().currentUser.uid).set({
                createdAt: firestore.Timestamp.fromDate(new Date()),
                profileUrl: userData.photoURL,
                firstName: userData.firstName,
                email: userData.email,
                uid: auth().currentUser.uid,
                lastName: userData.lastName,
            });
            console.log('New user created in Firestore');
    
            await firestore().collection('users').doc(auth().currentUser.uid).collection('data').add({
                weight: parseInt(userData.weight),
                height: parseInt(userData.height),
                dateOfBirth: firestore.Timestamp.fromDate(userData.dateOfBirth),
                gender: userData.gender,
                goal: userData.goals 
            })
            }
        return {success: 'successfully updated user data'}
        
    } catch (error) {
        if(error.code === 'auth/network-request-failed'){
            return {error: 'No Internet Connection'}
        }
        if(error.code === 'auth/unknown'){
            return {error: 'An unknown error occurred. Please try again later.'}
        }
        console.error('Error saving data to database:', error);
        return {error: 'Something went wrong with the process'}
    }
}
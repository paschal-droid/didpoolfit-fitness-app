import { createSlice } from "@reduxjs/toolkit"
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


const prevState = {
    activeUser: null
}

const User = createSlice({
    name: 'user',
    initialState: prevState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, activeUser: action.payload };
        },
        reset: (state, action) => {
            return prevState;
        },
    }
})

export const {setUser, reset} = User.actions

export const fetchUser = () => async (dispatch) => {
    try {
        const snapshot = await firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .get();

        if (snapshot.exists) {
            const userData = snapshot.data();
            const dataSnapshot = await firestore().collection('users').doc(auth().currentUser.uid).collection('data').get()
            const extraInfo = dataSnapshot.docs[0]?.data()
            dispatch(setUser({...userData, id: snapshot.id, ...extraInfo}));
        } else {
            console.log('User does not exist');
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};


export default User.reducer
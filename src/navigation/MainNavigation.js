import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Routes } from "./Routes";
import { Home } from "../screens";
import { Activity, AddSchedule, Articles, Notifications, WorkoutDetailFlow1, WorkoutDetailFlow2 } from "../screens/Home";

const Stack = createNativeStackNavigator()

const MainNavigation = () => {
    return (
        <Stack.Navigator screenOptions={options} initialRouteName={Routes.Onboard} >
            <Stack.Screen options={{ animation: 'slide_from_right' }} component={Home} name={Routes.Home} />
            <Stack.Screen options={{ animation: 'slide_from_right' }} component={Activity} name={Routes.Activity} />
            <Stack.Screen options={{ animation: 'slide_from_bottom' }} component={Articles} name={Routes.Articles} />
            <Stack.Screen options={{ animation: 'slide_from_bottom' }} component={Notifications} name={Routes.Notify} />
            <Stack.Screen options={{ animation: 'slide_from_bottom' }} component={WorkoutDetailFlow1} name={Routes.WorkoutDetailA} />
            <Stack.Screen options={{ animation: 'slide_from_right' }} component={WorkoutDetailFlow2} name={Routes.WorkoutDetailB} />
            <Stack.Screen options={{ animation: 'slide_from_bottom' }} component={AddSchedule} name={Routes.AddSchedule} />
        </Stack.Navigator>
    )
}

const options = {
    header: ()=> null,
    headerShown: false,
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    animation: 'slide_from_bottom',
}

const screenOptions = {
    animation: 'slide_from_bottom'
}


export default MainNavigation
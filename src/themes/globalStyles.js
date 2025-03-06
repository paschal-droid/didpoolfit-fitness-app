import { StyleSheet} from "react-native"
import { scaling, color, getFontFamily} from "./themes"

const {horizontalScale, verticalScale, fontScale} = scaling
const styles = StyleSheet.create({
    appScreen: {
        flex: 1,
    },
    space: {
        marginTop: verticalScale(22),
        marginHorizontal: horizontalScale(22)
    },
    spacePadding: {
        paddingVertical: verticalScale(30),
        paddingHorizontal: horizontalScale(22)
    },
    noView: {
        flex: 1,
        justifyContent: 'center'
    },
    noConnectionContainer: {
        flex: .7
    },
})


export default styles
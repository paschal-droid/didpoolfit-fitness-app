import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import FastImage from 'react-native-fast-image'
import { scaling, getFontFamily, color } from '../../themes/themes'
import { useTheme } from '../../context/ThemeContext'
import { useNavigation } from '@react-navigation/native'
import { Routes } from '../../navigation/Routes'
import Icon from '../Icon/Icon'

const {width} = Dimensions.get('window')
const {horizontalScale, verticalScale, fontScale} = scaling


const ArticleCard = ({ viewableItems, item }) => {
    const {theme} = useTheme()
    const navigation = useNavigation()

    const animationStyle = useAnimatedStyle(() => {
        const isVisible = Boolean(viewableItems.value.filter(item => item.isViewable).find((viewableItem) => viewableItem.item.id === item.id))
        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [{
                scaleX: withTiming(isVisible ? 1 : 0.6)
            }]
        };
    });
    return (
        <Animated.View style={[animationStyle]}>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.Articles, {articleItem: item})} style={[styles.listItem]}>
                <FastImage priority={FastImage.priority.high} resizeMode='cover' source={item.imagelink} style={styles.articlesImage} />
                <Text style={[styles.articleTitle, {color: theme.header}]}>{item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}</Text>

                <Icon style={styles.favorite} name='star' color={item.favorite ? color.yellow : color.white} size={fontScale(18)} />
            </TouchableOpacity>
        </Animated.View>
    )
}

export default ArticleCard

const styles = StyleSheet.create({
    listItem: {
        width: width/2.4,
        alignSelf: 'center',
        overflow: 'hidden',
        gap: 7
    },
    articlesImage: {
        height: width/3,
        width: '100%',
        borderRadius: horizontalScale(18),
    },
    articleTitle: {
        fontSize: fontScale(12),
        fontFamily: getFontFamily('Poppins', '500')
    },
    favorite: {
        position: 'absolute',
        right: horizontalScale(8),
        top: horizontalScale(8),
    },
})
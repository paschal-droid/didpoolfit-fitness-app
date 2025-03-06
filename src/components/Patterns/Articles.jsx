import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSharedValue } from 'react-native-reanimated'
import ArticleCard from '../Cards/ArticleCard'
import { getFontFamily, scaling } from '../../themes/themes'
import { useTheme } from '../../context/ThemeContext'
import {articles} from '../../data/articles'

const {horizontalScale, verticalScale, fontScale} = scaling


const Articles = () => {
    // ? Creating an animated Flatlist
    const {theme} = useTheme()

    const viewableItems = useSharedValue([])


    const renderItem = ({ item, index }) => {

        return (
            <ArticleCard viewableItems={viewableItems} item={item} />
        )
    }

    const onViewableItemsChanged = ({ viewableItems: vItems }) => {
        viewableItems.value = vItems
    }
    return (
        <View style={[styles.articleContainer]}>
            <Text style={[styles.articleHeader, { color: theme.header }]}>Articles & Tips</Text>
            <FlatList
                data={articles}
                horizontal
                contentContainerStyle={[{gap: 15}]}
                onViewableItemsChanged={onViewableItemsChanged}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.title}
            />
        </View>
    )
}

export default Articles

const styles = StyleSheet.create({
    articleHeader: {
        fontFamily: getFontFamily('Poppins', '600'),
        fontSize: fontScale(16),
        lineHeight: fontScale(24),
    },
    articleContainer: {
        flex: 1,
        gap: 20
    },
})
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const News = () => {
    return (
        <View style={styles.container}>
            <Text>News</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default News;
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

import AuthContext from '../context/authContext';

const ErrorInputBox = ({children}) => {
    
    const [errorViewShow] = useState(new Animated.ValueXY({x: 80, y: 0}));
    const [errorViewOpacity] = useState(new Animated.Value(0));

    const { errorBoxOpacity } = useContext(AuthContext);

    const hideErrorView = () => {
        Animated.parallel([
            Animated.timing(errorViewOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.spring(errorViewShow.x, {
                toValue: -400,
                speed: 4,
                useNativeDriver: true
            }),
        ]).start();

    }
    
    useEffect(() => {
        Animated.parallel([
            Animated.timing(errorViewOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }),
            Animated.spring(errorViewShow.x, {
                toValue: 0,
                speed: 2,
                useNativeDriver: true
            })
        ]).start();
    }, []);
    
    return (
        <Animated.View style={[styles.errorView, { opacity: errorViewOpacity, transform: [ { translateX: errorViewShow.x } ] }]}>
            <TouchableOpacity style={styles.closeButton} onPress={hideErrorView}>
                <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
            {children}
        </Animated.View>

    );
}

const styles = StyleSheet.create({
    errorView: {
        width: 250,
		height: 100,
		backgroundColor: '#DC143C',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		position: 'absolute',
		borderRadius: 10,
		marginTop: 100
    },
    closeButton: {
        right: 0,
        top: 0,
        position: 'absolute',
        marginRight: 5,
        marginTop: 5,
        width: 20,
        height: 40
    },
    closeText: {
        fontSize: 15,
        fontFamily: 'Roboto-Medium',
        color: 'white'
    }    
});

export default ErrorInputBox;
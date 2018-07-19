/**
 * @providesModule globalStyles
 */

import { StyleSheet } from 'react-native';

export const colorRed = '#fc363b';

export const theme = {
    bg: {
        light: {
            backgroundColor: '#fff'
        },
        dark: {
            backgroundColor: '#222'
        }
    },
    text: {
        light: {
            color: '#222'
        },
        dark: {
            color: '#eee'
        }
    }
}

export const gs = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    navBarStyle: {
      paddingTop: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    topButtons: {
        color: '#fc363b',
        fontSize: 16,
        marginTop: 5
    }
});
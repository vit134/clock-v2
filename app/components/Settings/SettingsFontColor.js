import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import { Container, Content, Icon, Button } from 'native-base';

import {
    SlidersColorPicker,
    HueGradient,
    SaturationGradient,
    LightnessGradient,
    HueSlider,
    SaturationSlider,
    LightnessSlider
  } from 'react-native-color';
import tinycolor from 'tinycolor2';

import { gs, colorRed } from 'globalStyles';
import NavBar from '../NavBar';

import store from '../../store';
import { changeSettings } from '../../actions';

export default class SettingsFontColor extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...store.getState().settingsReducer,
            fontColorrecents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
            color: tinycolor('#70c1b3').toHsl()
        }

        this.switchColor = this.switchColor.bind(this);
    }

    submit() {
        //store.dispatch(changeSettings({userName: this.state.userName}, store.getState().settingsReducer));
    }

    updateHue(h) {
        this.setState({ color: { ...this.state.color, h } });
    }
    updateSaturation(s) {
        this.setState({ color: { ...this.state.color, s } });
    }

    updateLightness(l) {
        this.setState({ color: { ...this.state.color, l } });
    }

    switchColor(color) {
        this.setState({color: tinycolor(color).toHsl()})
    }

    render() {
        return(
            <Container>
                <View style={[gs.container]}>
                    <View style={styles.container}>
                        <View style={styles.clock}>
                            <Text style={[styles.clockText, {color: this.state.color ? tinycolor(this.state.color).toHexString() : '#222'}]}>{`${new Date().getHours()} : ${new Date().getMinutes()}`}</Text>
                        </View>
                        {/* <View style={styles.currentColor}>
                            <TextInput  style={styles.currentColorInput} value={this.state.color ? tinycolor(this.state.color).toHexString() : '#222'} />
                        </View> */}
                        <View style={styles.gradient}>
                            <View style={styles.gradientInner}>
                                <HueSlider
                                    style={styles.sliderRow}
                                    gradientSteps={40}
                                    value={this.state.color.h}
                                    onValueChange={this.updateHue.bind(this)}
                                />
                            </View>
                            <View style={styles.gradientInner}>
                                <SaturationSlider
                                    style={styles.sliderRow}
                                    gradientSteps={20}
                                    value={this.state.color.s}
                                    color={this.state.color}
                                    onValueChange={this.updateSaturation.bind(this)}
                                />
                            </View>
                            <View style={styles.gradientInner}>
                                <LightnessSlider
                                    style={styles.sliderRow}
                                    gradientSteps={20}
                                    value={this.state.color.l}
                                    color={this.state.color}
                                    onValueChange={this.updateLightness.bind(this)}
                                />
                            </View>
                        </View>
                        { this.state.fontColorrecents 
                        ?
                            <View>
                                <Text style={styles.recentsTitle}>Recents</Text>
                                <View style={styles.recents}>
                                    {this.state.fontColorrecents.map((el, i) => {
                                        if (i <= 8) {
                                            return (
                                                <View key={i} style={styles.recentsItem}>
                                                    <TouchableHighlight style={{display: 'flex', flexDirection: 'row'}} onPress={() => this.switchColor(el)}>
                                                        <View style={{width: 60, height: 60, borderRadius: 50,backgroundColor: el}}></View>
                                                    </TouchableHighlight>
                                                </View>
                                            )
                                        }
                                    })}
                                </View>
                            </View>
                        : 
                            ''
                        }
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        
    },
    clock: {
        display: 'flex',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    clockText: {
        fontSize: 82,
        fontWeight: '700'
    },
    currentColor: {
        height: '10%',
        display: 'flex',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderColor: '#eee',
        marginHorizontal: 20
    },
    currentColorInput: {
        fontSize: 24,
        textAlign: 'left'
    },
    gradient: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 12,
        marginBottom: 16,
        paddingHorizontal: 20
    },
    sliderRow: {
        alignSelf: 'stretch'
    },
    gradientInner: {
        height: 40
    },
    recentsTitle: {
        fontSize: 24,
        marginBottom: 20,
        paddingLeft: 20
    },
    recents: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 20
    },
    recentsItem: {
        width: '25%',
        paddingRight: 20,
        marginBottom: 20
    }
});
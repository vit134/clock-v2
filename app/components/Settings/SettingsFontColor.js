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

import { Actions } from 'react-native-router-flux';
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
        const state = store.getState().settingsReducer;
        this.state = {
            fontColorRecents: state.fontColorRecents ? state.fontColorRecents : [],
            fontColor: state.fontColor ? tinycolor(state.fontColor).toHsl() : tinycolor('#70c1b3').toHsl()
        }

        this.switchColor = this.switchColor.bind(this);
    }

    submit() {
        let recents = this.state.fontColorRecents;
        let fontColor = tinycolor(this.state.fontColor).toHex();
        recents.indexOf(fontColor) >= 0 ? recents : recents.push(fontColor);

        store.dispatch(changeSettings({
            fontColor: tinycolor(this.state.fontColor).toHex(),
            fontColorRecents: recents
        }, store.getState().settingsReducer));
        
        Actions.pop();
    }

    updateHue(h) {
        this.setState({ fontColor: { ...this.state.fontColor, h } });
    }
    updateSaturation(s) {
        this.setState({ fontColor: { ...this.state.fontColor, s } });
    }

    updateLightness(l) {
        this.setState({ fontColor: { ...this.state.fontColor, l } });
    }

    switchColor(fontColor) {
        this.setState({fontColor: tinycolor(fontColor).toHsl()})
    }

    onSave() {
        
    }

    render() {
        return(
            <Container>
                <NavBar
                    leftTitle={'Back'}
                    leftAction={() => Actions.pop()}
                    title={'Font color'}
                    rightTitle={'Save'}
                    rightAction={this.submit.bind(this)}
                />
                <View style={[gs.container]}>
                    <View style={styles.container}>
                        <View style={styles.clock}>
                            <Text style={[styles.clockText, {color: this.state.fontColor ? tinycolor(this.state.fontColor).toHexString() : '#222'}]}>12:24</Text>
                        </View>
                        <View style={styles.gradient}>
                            <View style={styles.gradientInner}>
                                <HueSlider
                                    style={styles.sliderRow}
                                    gradientSteps={40}
                                    value={this.state.fontColor.h}
                                    onValueChange={this.updateHue.bind(this)}
                                />
                            </View>
                            <View style={styles.gradientInner}>
                                <SaturationSlider
                                    style={styles.sliderRow}
                                    gradientSteps={20}
                                    value={this.state.fontColor.s}
                                    color={this.state.fontColor}
                                    onValueChange={this.updateSaturation.bind(this)}
                                />
                            </View>
                            <View style={styles.gradientInner}>
                                <LightnessSlider
                                    style={styles.sliderRow}
                                    gradientSteps={20}
                                    value={this.state.fontColor.l}
                                    color={this.state.fontColor}
                                    onValueChange={this.updateLightness.bind(this)}
                                />
                            </View>
                        </View>
                        { this.state.fontColorRecents.length > 0
                        ?
                            <View>
                                <Text style={styles.recentsTitle}>Recents</Text>
                                <View style={styles.recents}>
                                    {this.state.fontColorRecents.map((el, i) => {
                                        if (i <= 8) {
                                            return (
                                                <View key={i} style={styles.recentsItem}>
                                                    <TouchableHighlight style={{display: 'flex', flexDirection: 'row'}} onPress={() => this.switchColor(el)}>
                                                        <View style={{width: 60, height: 60, borderRadius: 50, backgroundColor: `#${el}`}}></View>
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
        fontSize: 120,
        fontWeight: '700',
        fontFamily: 'digital',
        textAlign: 'left'
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
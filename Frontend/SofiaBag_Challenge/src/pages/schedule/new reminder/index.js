import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import images from '../../../../constants/images';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import ComeBackButton from '../../../components/ComeBackButton';
import { TextInputMask } from 'react-native-masked-text';
import { Background, CancelButton, Filtro, Form, Placeholder, SelectedDay, Subtitle, TextInput } from './styles';
import Button from '../../../components/Button';
import { useFocusEffect } from '@react-navigation/native';

const MODAL_OPTIONS = [
    {
        option: 'Nunca',
        id: 0
    },

    {
        option: 'Todo dia',
        id: 1
    },

    {
        option: 'Toda semana',
        id: 2
    },

    {
        option: 'Todo mês',
        id: 3
    },

    {
        option: 'Todo ano',
        id: 4
    },
]

export default function NewReminder({ navigation, route }) {
    const onBlurStyle = {
        borderColor: COLORS.grey,
        transform: [{translateX: 0}, {translateY: 0}],
        fontSize: 14,
        color: COLORS.grey,
    }

    const [getOperationType, setOperationType] = useState();
    const [getItemToUpdate, setItemToUpdate] = useState();
    const [getSelectedDate, setSelectedDate] = useState();
    const [getReminder, setReminder] = useState();
    const [getRepet, setRepet] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [getObjectNameInputStyle, setObjectNameInputStyle] = useState(onBlurStyle);
    const [getReminderInputStyle, setReminderInputStyle] = useState(onBlurStyle);
    const [getRepetInputStyle, setRepetInputStyle] = useState(onBlurStyle);

    const { operationType, itemToUpdate, selectedDate, item } = route.params;
    const disableInput = getItemToUpdate == null ? false : true;

    const title = getOperationType == "Adicionar" ? "Novo" : getOperationType;
    const buttonTitleFormatted = getOperationType + " lembrete";

    const selected = moment(getSelectedDate).locale("pt-br");
    const todayDate = moment(selected).format("D");
    const dayOfWeek = moment(getSelectedDate).format("dddd");
    const month = moment(selected).format("MMMM");
    const year = moment(selected).format("YYYY");

    let dayOfWeekFormatted = "";
    for (let i = 0; i < 3; i++) {
        dayOfWeekFormatted += dayOfWeek[i].toUpperCase();
    }

    let objectToSave = {
        cdRfid: '',
        name: '',
        category: '',
        reminder: '',
        user: {
            id: 'DJOI208'
        },
    }

    useFocusEffect(
        useCallback(() => {
            if (item) onFocus('Nome');
        }, [route])
    );

    useEffect(() => {
        setOperationType(operationType);
        setItemToUpdate(itemToUpdate);
        setSelectedDate(selectedDate);

        if (itemToUpdate) onFocus('Nome');

    }, [])

    function validateReminder(value) {
        setReminder(value);
        const [hours, minutes] = value.split(':');

        if (hours < 0 || hours > 23) {
            Alert.alert("Por favor, insira uma hora válida")
            setReminder(null);
        } else if (minutes < 0 || minutes > 59) {
            Alert.alert("Por favor, insira uma hora válida")
            setReminder(hours + ":");
        }
    }

    function onFocus(input) {
        const style = {
            borderColor: COLORS.black,
            transform: [{translateX: -12}, {translateY: -35}],
            fontSize: 12,
            fontWeight: '700',
            color: COLORS.black,
        };

        if (input == 'Nome') {
            setObjectNameInputStyle(style);

        } else if (input == 'Horario') {
            setReminderInputStyle(style);

        } else {
            setRepetInputStyle(style);
        }
    }

    function onBlur(input, value) {
        value = value == "" ? null : value;

        if (value != null) {
            return;
        }
        else if (input == 'Nome') {
            setObjectNameInputStyle(onBlurStyle)

        } else if (input == 'Horario') {
            setReminderInputStyle(onBlurStyle);

        } else {
            setRepetInputStyle(onBlurStyle);
        }
    }

    const renderClickableInput = () => {
        return (
            <TouchableOpacity
                onPress={ () => { navigation.navigate("listOfObjects") } }
            >
                <View pointerEvents={true}>
                    <TextInput
                        value={ item ? item.name : ""}
                        onFocus={() => onFocus('Nome')}
                        onBlur={() => onBlur('Nome', item.name)}
                        selectionColor={COLORS.black}
                        style={{
                            borderColor: getObjectNameInputStyle.borderColor
                        }}
                    />
                    <Placeholder>
                        <Text style={{
                            color: getObjectNameInputStyle.color,
                            transform: getObjectNameInputStyle.transform,
                            fontSize: getObjectNameInputStyle.fontSize,
                            fontWeight: getObjectNameInputStyle.fontWeight,
                        }}>
                            Selecione um objeto
                        </Text>
                    </Placeholder>
                </View>
            </TouchableOpacity>
        );
    }

    const renderForm = () => {
        return(
            <View style={{ flex: 1 }}>
                {
                    disableInput ?
                    <View  style={{ marginTop: 25 }}>
                        <TextInput
                            value={itemToUpdate.name}
                            onFocus={() => onFocus('Nome')}
                            onBlur={() => onBlur('Nome', item.name)}
                            selectionColor={COLORS.black}
                            style={{
                                borderColor: getObjectNameInputStyle.borderColor
                            }}
                        />
                        <Placeholder>
                            <Text style={{
                                color: getObjectNameInputStyle.color,
                                transform: getObjectNameInputStyle.transform,
                                fontSize: getObjectNameInputStyle.fontSize,
                                fontWeight: getObjectNameInputStyle.fontWeight,
                            }}>
                                Selecione um objeto
                            </Text>
                        </Placeholder>
                    </View>
                    :
                    <View style={{ marginTop: 25 }}>
                        {renderClickableInput()}
                    </View>
                }

                <View style={{ flexDirection: 'row', marginTop: 25, height: 160 }}>
                    <View>
                        <SelectedDay>
                            <Text style={{ ...FONTS.largeTitle, }}>{todayDate}</Text>
                            <Text style={{ color: `${COLORS.grey}` }}>{dayOfWeekFormatted}</Text>
                        </SelectedDay>
                    </View>

                    <View style={{ flex: 1, marginTop: 22 }}>
                        <View>
                            <TextInputMask
                                type={'datetime'}
                                options={{
                                    format: 'HH:mm'
                                }}
                                value={getReminder}
                                onChangeText={text => validateReminder(text)}
                                onFocus={() => onFocus('Horario')}
                                onBlur={() => onBlur('Horario', getReminder)}
                                selectionColor={COLORS.black}
                                style={{
                                    borderWidth: 1,
                                    borderRadius: SIZES.radiusBottomButtonsAndInputs,
                                    padding: 14,
                                    borderColor: getReminderInputStyle.borderColor,
                                }}
                            />
                            <Placeholder>
                                <Text style={{
                                    color: getReminderInputStyle.color,
                                    transform: getReminderInputStyle.transform,
                                    fontSize: getReminderInputStyle.fontSize,
                                    fontWeight: getReminderInputStyle.fontWeight,
                                }}>
                                    Horário
                                </Text>
                            </Placeholder>
                        </View>

                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={{ marginTop: 40 }}
                        >
                            <View pointerEvents={true}>
                                <TextInput
                                    value={getRepet}
                                    selectionColor={COLORS.black}
                                    style={{
                                        borderColor: getRepetInputStyle.borderColor
                                    }}
                                />
                                <Placeholder>
                                    <Text style={{
                                        color: getRepetInputStyle.color,
                                        transform: getRepetInputStyle.transform,
                                        fontSize: getRepetInputStyle.fontSize,
                                        fontWeight: getRepetInputStyle.fontWeight,
                                    }}>
                                        Repete
                                    </Text>
                                </Placeholder>
                            </View>
                        </TouchableOpacity>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>

                                <FlatList
                                    data={MODAL_OPTIONS}
                                    renderItem={({ item }) => {
                                        return(
                                            <TouchableOpacity
                                                style={styles.modalOption}
                                                onPress={() => {
                                                    setModalVisible(!modalVisible);
                                                    setRepet(item.option);
                                                    onFocus('Repete');
                                                }}
                                            >
                                                <Text>{item.option}</Text>
                                            </TouchableOpacity>
                                        );
                                    }}
                                />

                                </View>
                            </View>
                        </Modal>
                    </View>

                </View>

                <View style={{
                    height: 110,
                    marginTop: 30,
                    justifyContent: 'space-between',
                }}>
                    <Button
                        text={buttonTitleFormatted}
                        navigation={navigation}
                        route="Home"
                        // functionality={ () => itemToUpdate ? handleUpdateItem() : handleAddReminder() }
                    />

                    <CancelButton
                        onPress={ () => { navigation.goBack() }}
                    >
                        <Text style={{ ...FONTS.buttons, fontWeight: 'bold', textAlign: 'center', color: `${COLORS.black}` }}>
                            Cancelar
                        </Text>
                    </CancelButton>
                </View>
            </View>
        );
    }

    return(
        <SafeAreaView style={styles.safearea}>
            <Background source={images.addObjectPageWallpaper} />
            <Filtro opacity={0.2} />

            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <View>
                        <ComeBackButton
                            navigation={navigation}
                        />
                    </View>

                    <View style={styles.titleView}>
                        <Text style={styles.title}>
                            {title} Lembrete
                        </Text>

                        <Subtitle>
                            <Text style={{ ...FONTS.h3, textAlign: 'center', lineHeight: 25 }}>
                                para a Sofia te lembrar de colocar na mochila
                            </Text>
                        </Subtitle>
                    </View>
                </View>

                <Form>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                    <Text style={styles.text}>
                        Lembrete para o dia {todayDate} de {month} de {year}
                    </Text>

                    {renderForm()}
                    </ScrollView>
                </Form>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safearea: {
        backgroundColor: `${COLORS.white}`,
        flex: 1,
    },

    header: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 35,
    },

    titleView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        ...FONTS.h1,
        fontWeight: 'bold',
    },

    subtitle: {
        ...FONTS.h3,
        textAlign: 'center',
        lineHeight: 25,
    },

    text: {
        ...FONTS.h2,
        color: `${COLORS.black}`,
        fontWeight: '500',
        marginBottom: 18,
        marginLeft: 5,
    },

    input: {
        borderWidth: 1,
        borderRadius: SIZES.radiusBottomButtonsAndInputs,
        padding: 14,
        borderColor: COLORS.grey,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
        marginVertical: 20,
    },

    modalView: {
        marginVertical: 50,
        backgroundColor: "white",
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        justifyContent: 'center',
        borderRadius: SIZES.radiusPageAndBlocks
    },

    modalOption: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.grey
    }
})
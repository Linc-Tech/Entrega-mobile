import { useFocusEffect } from '@react-navigation/core';
import moment from 'moment';
import React, { Fragment, useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { FONTS } from '../../../../constants/theme';
import ScreenHeader from '../../../components/ScreenHeader';
import { v4 as uuid } from 'uuid';
import icons from '../../../../constants/icons';
import {
    AddItem,
    BinButton,
    BinIcon,
    Buttons,
    ButtonsPopup,
    CancelButton,
    Item,
    ItemContent,
    ItemHeader,
    ObjectSection,
    PenIcon,
    Popup,
    RemoveButton,
    SectionOne,
    SectionTwo,
    UpdateButton
} from './styles';

let OBJECTS_DATA = [
    {
        id: uuid(),
        name: "Notebook da empresa",
        reminderHour: "8h",
        codRfid: "JDIOJ201",
        reminderDate: "20/09/2021"
    },
    {
        id: uuid(),
        name: "Notebook da empresa",
        reminderHour: "8h",
        codRfid: "JDIOJ201",
        reminderDate: "20/09/2021"
    },
    {
        id: uuid(),
        name: "Notebook da empresa",
        reminderHour: "8h",
        codRfid: "JDIOJ201",
        reminderDate: "20/09/2021"
    },
]

let SELECTED_DATE;

export default function Schedule({ navigation }) {
    // OBJECTS_DATA = [];

    const INITIAL_DATE = moment().format("YYYY-MM-DD");
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [selected, setSelected] = useState(INITIAL_DATE);
    const [pointerEvents, setPointerEvents] = useState("pointer");
    const [getObjects, setObjects] = useState([]);
    const [getObjectToDelete, setObjectToDelete] = useState();

    useFocusEffect(useCallback(() => {
        // handleGetUserObjectsList(selected || SELECTED_DATE);
    }, [navigation]));

    const onDayPress = day => {
        OBJECTS_DATA = [];
        SELECTED_DATE = day.dateString;
        // handleGetUserObjectsList(SELECTED_DATE);
        setSelected(SELECTED_DATE);
    };

    const renderCalendar = () => {
        LocaleConfig.locales['br'] = {
            monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Ago.','Set.','Out.','Nov.','Dez.'],
            dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
            dayNamesShort: ['D','S','T','Q','Q','S','S'],
            today: 'Aujourd\'hui'
        };
        LocaleConfig.defaultLocale = 'br';

        return (
            <View>
                <Text style={styles.textTitle}>
                    Eai, que tal adicionar um lembrete para um novo objeto para a Sofia te lembrar?
                </Text>
                <Fragment>
                    <Calendar
                        current={INITIAL_DATE}
                        onDayPress={onDayPress}
                        style={{
                            marginTop: 15,
                            marginBottom: 30,
                        }}
                        markedDates={{
                            [selected]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: '#FF5959', //'#C8C6C6', //'#F3F1F5',
                            selectedTextColor: 'black'
                            }
                        }}
                        theme={{
                            calendarBackground: '#FFF',
                            textSectionTitleColor: '#FF5959',
                            textSectionTitleDisabledColor: '#d9e1e8',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#FF5959',
                            todayTextColor: '#343A40',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            dotColor: '#00adf5',
                            selectedDotColor: '#ffffff',
                            arrowColor: '#FF5959',
                            disabledArrowColor: '#d9e1e8',
                            monthTextColor: '#343A40',
                            indicatorColor: 'blue',
                            textDayFontWeight: '500',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: 'bold',
                            textDayFontSize: 16,
                            textMonthFontSize: 22,
                            textDayHeaderFontSize: 14,
                        }}
                        monthFormat={"MMMM yy"}
                    />
                </Fragment>
                <Text style={styles.textTitle}>
                    Veja o que você tem que lembrar de colocar na sua mochila nesse dia:
                </Text>
            </View>
        );
    }

    const renderItems = ({ item }) => {
        const reminderDate = moment(item.reminder).format('DD/MM/YYYY');
        const reminderHour = moment(item.reminder).format('H:mm');

        return (
            <ObjectSection>
                <Item>
                    <ItemHeader>
                        <Text style={{
                        ...FONTS.pReminderTitle,
                        color: 'black',
                        fontWeight: 'bold'
                        }}>
                        {item.name}
                        </Text>
                    </ItemHeader>

                    <ItemContent>
                        <SectionOne>
                            <Text style={styles.text}>
                                Lembrete {reminderHour}
                            </Text>
                            <Text style={[ styles.text, { marginTop: 5 } ]}>
                                RFID {item.cdRfid}
                            </Text>
                        </SectionOne>

                        <SectionTwo>
                            <Text style={styles.text}>
                                Data do lembrete
                            </Text>
                            <Text style={[ styles.text, { marginTop: 5, textAlign: 'center' } ]}>
                                {reminderDate}
                            </Text>
                        </SectionTwo>
                    </ItemContent>
                </Item>

                <Buttons>
                    <UpdateButton
                        onPress={ () => {
                                navigation.navigate("NewReminder", {
                                operationType: "Atualizar",
                                itemToUpdate: item,
                                selectedDate: selected
                            });
                        }}>
                        <PenIcon
                            source={icons.pen}
                        />
                    </UpdateButton>

                    <BinButton
                        onPress={ () => { setDeleteModal(true), setObjectToDelete(item) }}
                    >
                        <BinIcon
                            source={icons.bin}
                        />
                    </BinButton>
                </Buttons>
            </ObjectSection>
        );
    };

    const renderDeleteModel = () => {
        return (
            <Popup>
                <Text style={{ ...FONTS.h2, lineHeight: 24, flex: 2, }}>
                    Lari, você tem certeza que deseja remover esse item dos seus lembretes?
                </Text>

                <ButtonsPopup>
                    <CancelButton
                        onPress={ () => { setDeleteModal(false) }}
                    >
                        <Text style={{ ...FONTS.h2, }}>Cancelar</Text>
                    </CancelButton>
                    <RemoveButton
                        onPress={ () => { handleRemoveObject(getObjectToDelete) }}
                    >
                        <Text style={{ ...FONTS.h2, }}>Remover</Text>
                    </RemoveButton>
                </ButtonsPopup>
            </Popup>
        );
    };

    return(
        <SafeAreaView style={styles.safearea}>
            <View style={styles.container}>
                <ScreenHeader navigation={navigation} >
                    Calendário
                </ScreenHeader>

                <View style={{ flex: 1 }}>
                    {showDeleteModal ? renderDeleteModel() : null}
                    <FlatList
                        pointerEvents={pointerEvents}
                        ListHeaderComponent={renderCalendar}
                        data={OBJECTS_DATA} //{getObjects}
                        renderItem={renderItems}
                        keyExtractor={ item => item.cdRfid }
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                <AddItem onPress={() =>
                    navigation.navigate("NewReminder", {
                        operationType: "Adicionar",
                        selectedDate: selected
                    })}>
                    <Text style={{ ...FONTS.buttons, fontWeight: 'bold', textAlign: 'center' }}>
                        Adicionar novo objeto
                    </Text>
                </AddItem>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safearea: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },

    container: {
        marginBottom: 10,
        marginHorizontal: 20,
        flex: 1,
    },

    text: {
        ...FONTS.p,
        color: 'black',
    },

    textTitle: {
        ...FONTS.p,
        color: 'black',
        marginVertical: 10,
        lineHeight: 24,
        marginHorizontal: 18,
    },
})

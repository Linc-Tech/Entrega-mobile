import { useFocusEffect } from '@react-navigation/core';
import moment from 'moment';
import React, { Fragment, useCallback, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { FONTS } from '../../../../constants/theme';
import ScreenHeader from '../../../components/ScreenHeader';
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
import { deleteUserReminder, getUserObjectsFromADate } from '../../../services/ScheduleService';
import httpStatus from '../../../../data/httpStatus';
import LoadingSimbol from '../../../components/LoadingSimbol';
import data from '../../../../data/data';

let SELECTED_DATE;

export default function Schedule({ navigation, route }) {
    const { user } = route.params;
    const INITIAL_DATE = moment().format("YYYY-MM-DD");

    const [showDeleteModal, setDeleteModal] = useState(false);
    const [selected, setSelected] = useState(INITIAL_DATE);
    const [pointerEvents, setPointerEvents] = useState("pointer");
    const [isLoading, setLoading] = useState(false);
    const [getObjects, setObjects] = useState([]);
    const [getObjectToDelete, setObjectToDelete] = useState();

    const fetchData = async () => {
        setLoading(true);

        const res = await getUserObjectsFromADate(user, SELECTED_DATE || selected);
        setObjects(res);

        setLoading(false);
    };

    useFocusEffect(useCallback(() => {
        fetchData();
    }, [navigation]));

    const onDayPress = day => {
        SELECTED_DATE = day.dateString;
        setSelected(SELECTED_DATE);
        fetchData();
    };

    async function handleRemoveObject(object) {
        object.repeatType = 0;
        const res = await deleteUserReminder(user, object.id);

        if (res == httpStatus.SERVER_ERROR) {
            navigation.navigate('Exception', {
                navigateTo: 'Calendar',
                user
            });
        }
        setDeleteModal(false);
        fetchData();
    }


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
            <View style={{ flex: 1 }}>
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
                <View style={{ flex: 1 }}>
                    <Text style={styles.textTitle}>
                        Veja o que você tem que lembrar de colocar na sua mochila nesse dia:
                    </Text>

                    <View>
                        {
                            isLoading ? renderLoading()
                            :
                            getObjects == '' ?
                            <Text style={{ ...FONTS.p, color: 'black', textAlign: 'center', marginTop: 30, fontWeight: 'bold' }}>
                                Sem lembretes para essa data, {user.nickname}
                            </Text>
                            :
                            <View></View>
                        }
                    </View>
                </View>
            </View>
        );
    }

    const renderItems = ({ item }) => {
        const [reminderDate] = item.reminderDate.split(' ');

        return (
            <ObjectSection>
                <Item>
                    <ItemHeader>
                        <Text style={{
                            ...FONTS.pReminderTitle,
                            color: 'black',
                            fontWeight: 'bold'
                        }}>
                        {item.object.name}
                        </Text>
                    </ItemHeader>

                    <ItemContent>
                        <SectionOne>
                            <Text style={styles.text}>
                                Lembrete {item.reminderHour}
                            </Text>

                            <Text style={[ styles.text, { marginTop: 5 } ]}>
                                {item.object.category}
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
                                selectedDate: selected,
                                user
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
                    {user.nickname}, você tem certeza que deseja remover esse item dos seus lembretes?
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


    const renderLoading = () => {
        return(
        <View style={{ flex: 1 }}>
            <LoadingSimbol size="small" color="primary" />
        </View>
        );
    };

    return(
        <SafeAreaView style={styles.safearea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <ScreenHeader navigation={navigation} >
                    Calendário
                </ScreenHeader>

                <View style={{ flex: 1 }}>
                    {showDeleteModal ? renderDeleteModel() : null}
                    <FlatList
                        pointerEvents={pointerEvents}
                        ListHeaderComponent={renderCalendar}
                        data={getObjects}
                        renderItem={renderItems}
                        keyExtractor={ item => item.id }
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                <AddItem onPress={() =>
                    navigation.navigate("NewReminder", {
                        operationType: "Adicionar",
                        selectedDate: selected,
                        user
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

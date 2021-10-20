import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Modal, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import images from '../../../../constants/images';
import { COLORS, FONTS } from '../../../../constants/theme';
import httpStatus from '../../../../data/httpStatus';
import ComeBackButton from '../../../components/ComeBackButton';
import LoadingSimbol from '../../../components/LoadingSimbol';
import { createUserObject, deleteUser, updateUserObject } from '../../../services/ObjectService';
import { Container, Form, Header, ImageSection, Title, Image, ButtonSection, DeleteButton, TextInput, Placeholder, Button, ButtonsModal, ModalButton } from './styles';


export default function NewObject({ navigation, route }) {
    const onBlurStyle = {
        borderColor: COLORS.grey,
        transform: [{translateX: 0}, {translateY: 0}],
        fontSize: 14,
        color: COLORS.grey,
    }

    const [getObjectName, setObjectName] = useState(null);
    const [getCategory, setCategory] = useState(null);
    const [getRfid, setRfid] = useState(null);

    const [getObjectNameInputStyle, setObjectNameInputStyle] = useState(onBlurStyle);
    const [getCategoryInputStyle, setCategoryInputStyle] = useState(onBlurStyle);
    const [getRfidInputStyle, setRfidInputStyle] = useState(onBlurStyle);

    const [isLoadingDelete, setLoadingDelete] = useState(false);
    const [isLoadingCreate, setLoadingCreate] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const { item } = route.params ? route.params : {};
    const { user } = route.params;
    const title = item ? "Atualizar" : "Novo";
    const disableInput = item == null ? false : true;
    const subtitle = item ? "Enjoou? Bora mudar as algumas coisinhas por aqui" : "Falta pouco para você cadastrar seu novo objeto";

    useEffect(() => {
        if (item) {
            if (item.name) {
                setObjectName(item.name);
                onFocus('Nome');
            }

            if (item.cdRfid) {
                setRfid(item.cdRfid);
                onFocus('RFID');
            }

            if (item.category) {
                setCategory(item.category);
                onFocus('Categoria');
            }
        }
    }, []);

    async function handleObjectCreation() {
        try {
            const inputs = [getObjectName, getCategory, getRfid];

            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i] == null || inputs[i] == "") throw new Error();
            }

            const formValues = {
                cdRfid: getRfid,
                name: getObjectName,
                category: getCategory,
                user
            }

            setLoadingCreate(true);
            const res = await createUserObject(formValues, navigation);

            if (res.status == httpStatus.SERVER_ERROR) {
                const nav = navigation.navigate('Exception', { navigateTo: 'Backpack', user })
                return nav;

            } else if (res.status == httpStatus.BAD_REQUEST) {
                return Alert.alert('Objeto já cadastrado');
            }

            setLoadingCreate(false);
            navigation.goBack();
        } catch (e) {
            Alert.alert(`Os valores inseridos estão inválidos, ${user.nickname}`);//👁👄👁
        }
    }

    async function handleDeleteObject(item) {
        try {
            setLoadingDelete(true);
            const res = await deleteUser(user, item.cdRfid);

            if (res.status == httpStatus.OK) {
                return navigation.goBack();
            }

            setModalVisible(false);
            setLoadingDelete(false);
            return navigation.navigate('Exception', { navigateTo: 'Backpack', user })
        } catch (e) {
            navigation.navigate('Exception', { navigateTo: 'Backpack', user: user  });
        }
    }

    async function handleObjectToUpdate(item) {
        try {
            const inputs = [getObjectName, getCategory];
            const originalInput = [item.name, item.category]

            let updateSomething = false;
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i] == null || inputs[i] == "") {
                    return Alert.alert(`Os valores inseridos estão inválidos \n👁👄👁`);

                } else if (originalInput[i] !== inputs[i]) {
                    updateSomething = true;
                }
            }

            if (!updateSomething) {
                return Alert.alert(`Você não alterou nenhum valor ainda, ${user.nickname}`);
            }

            const formValues = {
                cdRfid: item.cdRfid,
                name: getObjectName,
                category: getCategory,
                user
            }

            setLoadingCreate(true)
            const res = await updateUserObject(formValues);

            setLoadingCreate(false);
            if (res.status == 200) return navigation.goBack();
        } catch (e) {
            navigation.navigate('Exception', { navigateTo: 'Backpack', user: user });
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
            setObjectNameInputStyle(style)

        } else if (input == 'Categoria') {
            setCategoryInputStyle(style);

        } else {
            setRfidInputStyle(style);
        }
    }

    function onBlur(input, value) {
        value = value == "" ? null : value;

        if (value != null) {
            return;
        }
        else if (input == 'Nome') {
            setObjectNameInputStyle(onBlurStyle)

        } else if (input == 'Categoria') {
            setCategoryInputStyle(onBlurStyle);

        } else {
            setRfidInputStyle(onBlurStyle);
        }
    }

    const __renderLoading = () => {
        return(
            <View style={{ flex: 1 }}>
                <LoadingSimbol size="small" color="white" />
            </View>
        );
    };

    const __renderModal = () => {
        return(
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                    }}>
                        <View style={styles.modalView}>
                            <Text style={{ lineHeight: 24 }}>{user.nickname}, você tem certeza que deseja deletar esse objeto?</Text>

                            <ButtonsModal>
                                <ModalButton
                                    style={{ backgroundColor: COLORS.black }}
                                    onPress={ () => setModalVisible(false) }
                                >
                                    <Text style={{ color: 'white' }}>Cancelar</Text>
                                </ModalButton>

                                <ModalButton
                                    style={{ backgroundColor: COLORS.red }}
                                    onPress={ () => handleDeleteObject(item) }
                                >
                                    <Text style={{ color: 'white' }}>Remover</Text>
                                </ModalButton>
                            </ButtonsModal>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };

    return(
        <View style={styles.safearea}>
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1 }}
            >
                <Header>
                    <ComeBackButton navigation={navigation} />
                </Header>

                <View style={{ flex: 6 }}>
                    <Container>
                        {__renderModal()}
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            <Title>
                                <Text style={{ ...FONTS.h1, fontWeight: 'bold', color: COLORS.black, marginBottom: 5 }}>
                                    {title} Objeto
                                </Text>

                                <Text style={{ ...FONTS.p, color: 'black', textAlign: 'center', lineHeight: 24 }}>
                                    {subtitle}
                                </Text>
                            </Title>

                            <Form>
                                <View>
                                    <TextInput
                                        onChangeText={setObjectName}
                                        value={getObjectName}
                                        onFocus={() => onFocus('Nome')}
                                        onBlur={() => onBlur('Nome', getObjectName)}
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
                                            Nome do objeto
                                        </Text>
                                    </Placeholder>
                                </View>

                                <View>
                                    <TextInput
                                        onChangeText={setCategory}
                                        value={getCategory}
                                        onFocus={() => onFocus('Categoria')}
                                        onBlur={() => onBlur('Categoria', getCategory)}
                                        selectionColor={COLORS.black}
                                        style={{
                                            borderColor: getCategoryInputStyle.borderColor
                                        }}
                                    />
                                    <Placeholder>
                                        <Text style={{
                                            color: getCategoryInputStyle.color,
                                            transform: getCategoryInputStyle.transform,
                                            fontSize: getCategoryInputStyle.fontSize,
                                            fontWeight: getCategoryInputStyle.fontWeight,
                                        }}>
                                            Categoria
                                        </Text>
                                    </Placeholder>
                                </View>

                                <View pointerEvents={disableInput}>
                                    <TextInput
                                        onChangeText={setRfid}
                                        value={getRfid}
                                        onFocus={() => onFocus('Rfid')}
                                        onBlur={() => onBlur('Rfid', getRfid)}
                                        selectionColor={COLORS.black}
                                        autoCapitalize='characters'
                                        style={{
                                            borderColor: getRfidInputStyle.borderColor
                                        }}
                                    />
                                    <Placeholder>
                                        <Text style={{
                                            color: getRfidInputStyle.color,
                                            transform: getRfidInputStyle.transform,
                                            fontSize: getRfidInputStyle.fontSize,
                                            fontWeight: getRfidInputStyle.fontWeight,
                                        }}>
                                            Código RFID
                                        </Text>
                                    </Placeholder>
                                </View>
                            </Form>

                            <View style={{ flex: 1  }}>
                            {
                                item ?
                                <ImageSection>
                                    <Image source={images.wrappingImage} />
                                </ImageSection>
                                :
                                <ImageSection>
                                    <Image source={images.workImage} />
                                </ImageSection>
                            }
                            </View>

                            <ButtonSection>
                                <Button
                                    onPress={ () =>  !item ? handleObjectCreation() : handleObjectToUpdate(item) }
                                >
                                    {
                                        isLoadingCreate ? __renderLoading()
                                        :
                                        <Text style={{ ...FONTS.buttons, fontWeight: 'bold', textAlign: 'center' }}>
                                        {item ? `${title} objeto` : 'Adicionar objeto'}
                                        </Text>
                                    }
                                </Button>

                                {
                                    item ?
                                    <DeleteButton
                                        onPress={ () => setModalVisible(true) }
                                    >
                                        {
                                            isLoadingDelete ? __renderLoading()
                                            :
                                            <Text style={{ ...FONTS.buttons, fontWeight: 'bold', textAlign: 'center' }}>
                                                Deletar objeto
                                            </Text>
                                        }
                                    </DeleteButton>
                                    :
                                    null
                                }

                            </ButtonSection>
                        </ScrollView>
                    </Container>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: COLORS.black,
    },

    modalView: {
        margin: 40,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
})
import React, { useState } from "react";
import { Modal, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import images from "../../../../constants/images";
import { COLORS, FONTS } from "../../../../constants/theme";
import httpStatus from "../../../../data/httpStatus";
import LoadingSimbol from "../../../components/LoadingSimbol";
import ScreenHeader from '../../../components/ScreenHeader';
import { updateUserPassword } from "../../../services/UserService";
import { Button, ButtonsModal, Container, Form, Image, ImageSection, ModalButton, Placeholder, TextInput } from "./styles";

export default function Password({ navigation, route }) {
  const { user } = route.params;
  const onBlurStyle = {
    borderColor: COLORS.grey,
    transform: [{translateX: 0}, {translateY: 0}],
    fontSize: 14,
    color: COLORS.grey,
  }

  const [getPassword, setPassword] = useState();
  const [getConfirmPassword, setConfirmPassword] = useState();
  const [getPasswordInputStyle, setPasswordInputStyle] = useState(onBlurStyle);
  const [getConfirmPasswordStyle, setConfirmPasswordStyle] = useState(onBlurStyle);

  const [isLoading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const listOfSets = [
    { set: setPasswordInputStyle, id: 'Senha' },
    { set: setConfirmPasswordStyle, id: 'Confirmar' },
  ];

  function onFocus(input) {
    for (let i = 0; i < listOfSets.length; i++) {
      const id = listOfSets[i].id;
      const set = listOfSets[i].set;

      if (input == id) {
        set({
          borderColor: COLORS.black,
          transform: [{translateX: -12}, {translateY: -35}],
          fontSize: 12,
          fontWeight: '700',
          color: COLORS.black,
        });
      }
    }
  }

  function onBlur(input, value) {
    value = value == "" ? null : value;

    for (let i = 0; i < listOfSets.length; i++) {
      const id = listOfSets[i].id;
      if (input == id && value != null) {
        return;
      } else if (input == id) {
        listOfSets[i].set({
          borderColor: COLORS.grey,
          transform: [{translateX: 0}, {translateY: 0}],
          fontSize: 14,
          color: COLORS.grey,
        })
      }
    }
  }

  async function handlePasswordToUpdate() {
    const newUserPassword = {
      ...user,
      password: getPassword,
      email: user.email,
    }

    setLoading(true);
    const res = await updateUserPassword(newUserPassword);

    if (res == httpStatus.SERVER_ERROR) return navigation.navigate('Exception', { user });

    navigation.goBack();
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
                      <Text style={{ lineHeight: 24 }}>{user.nickname}, você tem certeza que deseja atualizar a sua senha?</Text>

                      <ButtonsModal>
                          <ModalButton
                              style={{ backgroundColor: COLORS.black }}
                              onPress={ () => setModalVisible(false) }
                          >
                              <Text style={{ color: 'white' }}>Cancelar</Text>
                          </ModalButton>

                          <ModalButton
                              style={{ backgroundColor: COLORS.red }}
                              onPress={ () => handlePasswordToUpdate() }
                          >
                              <Text style={{ color: 'white' }}>Atualizar</Text>
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
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <ScreenHeader navigation={navigation} theme="white">
          Senha
        </ScreenHeader>
      </View>

      <Container>
        <Form>
          {__renderModal()}
          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <TextInput
              onChangeText={setPassword}
              value={getPassword}
              autoCapitalize='none'
              secureTextEntry={true}
              onFocus={() => onFocus('Senha')}
              onBlur={() => onBlur('Senha', getPassword)}
              selectionColor={COLORS.black}
              style={{
                borderColor: getPasswordInputStyle.borderColor,
                color: COLORS.black,
              }}
            />
            <Placeholder>
              <Text style={{
                color: getPasswordInputStyle.color,
                transform: getPasswordInputStyle.transform,
                fontSize: getPasswordInputStyle.fontSize,
                fontWeight: getPasswordInputStyle.fontWeight,
              }}>
                Senha
              </Text>
            </Placeholder>
          </View>

          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <TextInput
              onChangeText={setConfirmPassword}
              value={getConfirmPassword}
              autoCapitalize='none'
              secureTextEntry={true}
              onFocus={() => onFocus('Confirmar')}
              onBlur={() => onBlur('Confirmar', getConfirmPassword)}
              selectionColor={COLORS.black}
              style={{
                borderColor: getConfirmPasswordStyle.borderColor,
                color: COLORS.black,
              }}
            />
            <Placeholder>
              <Text style={{
                color: getConfirmPasswordStyle.color,
                transform: getConfirmPasswordStyle.transform,
                fontSize: getConfirmPasswordStyle.fontSize,
                fontWeight: getConfirmPasswordStyle.fontWeight,
              }}>
                Confirmar Senha
              </Text>
            </Placeholder>
          </View>
        </Form>

        <ImageSection>
            <Image source={images.workImage} />
        </ImageSection>

        <Button onPress={ () => setModalVisible(true) } >
            {
                isLoading ? __renderLoading()
                :
                <Text style={{ ...FONTS.buttons, fontWeight: 'bold', textAlign: 'center' }}>
                  Atualizar senha
                </Text>
            }
        </Button>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  safearea: {
      flex: 1,
      backgroundColor: COLORS.black,
      paddingTop: 40,
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
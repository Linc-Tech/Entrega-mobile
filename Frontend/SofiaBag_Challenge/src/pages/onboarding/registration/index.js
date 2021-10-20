import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Alert, StatusBar } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import ComeBackButton from '../../../components/ComeBackButton';
import { TextInputMask } from 'react-native-masked-text';
import { ButtonSection, Button, Container, Form, Header, TextInput, Title, Placeholder, InputBox } from './styles';
import { createUser } from '../../../services/UserService';
import httpStatus from '../../../../data/httpStatus';

import { v4 as uuid } from 'uuid';
import LoadingSimbol from '../../../components/LoadingSimbol';
import data from '../../../../data/data';

export default function Registration({ navigation }) {
  const onBlurStyle = {
    borderColor: COLORS.grey,
    transform: [{translateX: 0}, {translateY: 0}],
    fontSize: 14,
    color: COLORS.grey,
  }

  const [getNameInputStyle, setNameInputStyle] = useState(onBlurStyle);
  const [getNicknameInputStyle, setNicknameInputStyle] = useState(onBlurStyle);
  const [getIdInputStyle, setIdInputStyle] = useState(onBlurStyle);
  const [getEmailInputStyle, setEmailInputStyle] = useState(onBlurStyle);
  const [getPasswordInputStyle, setPasswordInputStyle] = useState(onBlurStyle);
  const [getConfirmPasswordStyle, setConfirmPasswordStyle] = useState(onBlurStyle);
  const [getTelephoneInputStyle, setTelephoneInputStyle] = useState(onBlurStyle);

  const [getNameInput, setNameInput] = useState(null);
  const [getNicknameInput, setNicknameInput] = useState(null);
  const [getIdInput, setIdInput] = useState(null);
  const [getEmailInput, setEmailInput] = useState(null);
  const [getPasswordInput, setPasswordInput] = useState(null);
  const [getConfirmPassword, setConfirmPassword] = useState(null);
  const [getTelephoneInput, setTelephoneInput] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const listOfSets = [
    { set: setNameInputStyle, id: 'Nome' },
    { set: setNicknameInputStyle, id: 'Apelido' },
    { set: setIdInputStyle, id: 'ID' },
    { set: setEmailInputStyle, id: 'Email' },
    { set: setPasswordInputStyle, id: 'Senha' },
    { set: setConfirmPasswordStyle, id: 'Confirmar' },
    { set: setTelephoneInputStyle, id: 'Telefone' },
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

  function isFormInvalid(user) {
    for (let i in user) {
      const value = user[i];
      if (!value) {
        Alert.alert("Por favor, insira os valores corretamente");
        return true;
      }
    }

    const password = user.password;
    const confirmPassword = getConfirmPassword;

    if (password != confirmPassword) {
      Alert.alert("Você digitou dois valores diferentes para a senha");
      return true;
    }

    return false;
  }

  async function handleCreateUser() {
    const user = {
      id: uuid(),
      name: getNameInput,
      nickname: getNicknameInput,
      email: getEmailInput,
      password: getPasswordInput,
    };

    if (isFormInvalid(user)) return;

    setLoading(true);
    const res = await createUser(user);

    if (res == httpStatus.SERVER_ERROR) {
      const nav = navigation.navigate("Exception", {
        navigationTo: 'Registration'
      });

      return nav;
    };

    setLoading(false);
    data.user = { ...user };
    navigation.navigate('Login');
  }

  const renderLoading = () => {
    return(
        <View style={{ flex: 1 }}>
            <LoadingSimbol size="small"/>
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

        <View style={{ flex: 5 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Container>
              <Title>
                <Text style={{ ...FONTS.h1, fontWeight: 'bold', color: COLORS.black, marginBottom: 10 }}>
                    Cadastrar
                </Text>

                <Text style={{ ...FONTS.p, color: 'black', lineHeight: 24, textAlign: 'center', width: 300 }}>
                    Estamos felizes por escolher a Sofia como a sua nova Mochila Inteligente
                </Text>
              </Title>

              <Form>
                <View style={{ marginTop: 10, marginBottom: 20 }}>
                  <TextInput
                      onChangeText={setNameInput}
                      value={getNameInput}
                      autoCapitalize='words'
                      onFocus={() => onFocus('Nome')}
                      onBlur={() => onBlur('Nome', getNameInput)}
                      selectionColor={COLORS.black}
                      style={{
                        borderColor: getNameInputStyle.borderColor
                      }}
                  />
                  <Placeholder>
                      <Text style={{
                        color: getNameInputStyle.color,
                        transform: getNameInputStyle.transform,
                        fontSize: getNameInputStyle.fontSize,
                        fontWeight: getNameInputStyle.fontWeight,
                      }}>
                        Nome completo
                      </Text>
                    </Placeholder>
                </View>

                <View style={{ marginTop: 10, marginBottom: 20 }}>
                  <TextInput
                    onChangeText={setNicknameInput}
                    value={getNicknameInput}
                    onFocus={() => onFocus('Apelido')}
                    onBlur={() => onBlur('Apelido', getNicknameInput)}
                    selectionColor={COLORS.black}
                    style={{
                      borderColor: getNicknameInputStyle.borderColor
                    }}
                  />
                  <Placeholder>
                      <Text style={{
                        color: getNicknameInputStyle.color,
                        transform: getNicknameInputStyle.transform,
                        fontSize: getNicknameInputStyle.fontSize,
                        fontWeight: getNicknameInputStyle.fontWeight,
                      }}>
                        Apelido
                      </Text>
                    </Placeholder>
                </View>

                <View style={{ marginTop: 10, marginBottom: 20 }}>
                  <TextInput
                    onChangeText={setEmailInput}
                    value={getEmailInput}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => onFocus('Email')}
                    onBlur={() => onBlur('Email', getEmailInput)}
                    selectionColor={COLORS.black}
                    style={{
                      borderColor: getEmailInputStyle.borderColor
                    }}
                  />
                  <Placeholder>
                      <Text style={{
                        color: getEmailInputStyle.color,
                        transform: getEmailInputStyle.transform,
                        fontSize: getEmailInputStyle.fontSize,
                        fontWeight: getEmailInputStyle.fontWeight,
                      }}>
                        Email
                      </Text>
                    </Placeholder>
                </View>

                <View style={{ marginTop: 10, marginBottom: 20 }}>
                  <TextInput
                    onChangeText={setPasswordInput}
                    value={getPasswordInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onFocus={() => onFocus('Senha')}
                    onBlur={() => onBlur('Senha', getPasswordInput)}
                    selectionColor={COLORS.black}
                    style={{
                      borderColor: getPasswordInputStyle.borderColor
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

                <View style={{ marginTop: 10, marginBottom: 20 }}>
                  <InputBox>
                    <TextInput
                      onChangeText={setConfirmPassword}
                      value={getConfirmPassword}
                      autoCapitalize="none"
                      secureTextEntry={true}
                      onFocus={() => onFocus('Confirmar')}
                      onBlur={() => onBlur('Confirmar', getConfirmPassword)}
                      selectionColor={COLORS.black}
                      style={{
                        borderColor: getConfirmPasswordStyle.borderColor
                      }}
                    />
                    <Placeholder>
                      <Text style={{
                        color: getConfirmPasswordStyle.color,
                        transform: getConfirmPasswordStyle.transform,
                        fontSize: getConfirmPasswordStyle.fontSize,
                        fontWeight: getConfirmPasswordStyle.fontWeight,
                      }}>
                        Confirme sua senha
                      </Text>
                    </Placeholder>
                  </InputBox>
                </View>

                <View style={{ marginTop: 10 }}>
                  <InputBox>
                    <TextInputMask
                      type={'cel-phone'}
                      options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99)'
                      }}
                      onChangeText={setTelephoneInput}
                      value={getTelephoneInput}
                      onFocus={() => onFocus('Telefone')}
                      onBlur={() => onBlur('Telefone', getTelephoneInput)}
                      selectionColor={COLORS.black}
                      style={{
                        borderColor: getTelephoneInputStyle.borderColor,
                        borderWidth: 1,
                        borderRadius: SIZES.radiusBottomButtonsAndInputs,
                        padding: 14,
                        flex: 1,
                      }}
                    />
                    <Placeholder>
                      <Text style={{
                        color: getTelephoneInputStyle.color,
                        transform: getTelephoneInputStyle.transform,
                        fontSize: getTelephoneInputStyle.fontSize,
                        fontWeight: getTelephoneInputStyle.fontWeight,
                      }}>
                        Telefone
                      </Text>
                    </Placeholder>
                  </InputBox>
                </View>
              </Form>

              <ButtonSection>
                <Button
                  onPress={ () =>  handleCreateUser() }
                >
                  {
                    isLoading ? renderLoading()
                    :
                    <Text style={{ ...FONTS.buttons, fontWeight: 'bold', textAlign: 'center' }}>
                      Cadastrar Sofia
                    </Text>
                  }
                </Button>
              </ButtonSection>
            </Container>
          </ScrollView>
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

})
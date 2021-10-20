import React, { useState } from 'react';

import { Alert, KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import images from '../../../../constants/images';
import { COLORS, FONTS } from '../../../../constants/theme';
import httpStatus from '../../../../data/httpStatus';
import ComeBackButton from '../../../components/ComeBackButton';
import LoadingSimbol from '../../../components/LoadingSimbol';
import { signIn, validateLogin } from '../../../services/LoginService';

import {
  Container,
  Background,
  LoginSection,
  Footer,
  InputSection,
  Header,
  Content,
  Title,
  ButtonSection,
  Button,
  TextInput,
  Placeholder,
  Input,
  Form
  } from './styles';

export default function Login({ navigation }) {
  const onBlurStyle = {
    borderColor: COLORS.grey,
    transform: [{translateX: 0}, {translateY: 0}],
    fontSize: 14,
    color: COLORS.grey,
  }

  const [isLoading, setLoading] = useState(false);
  const [getEmailInputStyle, setEmailInputStyle] = useState(onBlurStyle);
  const [getPasswordInputStyle, setPasswordInputStyle] = useState(onBlurStyle);


  const [getEmail, setEmail] = useState(null);
  const [getPassword, setPassword] = useState(null);

  const listOfSets = [
    {
      set: setEmailInputStyle,
      id: 'Email'
    },

    {
      set: setPasswordInputStyle,
      id: 'Senha'
    },
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

  function isFormInvalid(login) {
    for (let i in login) {
      const value = login[i];
      if (!value) {
        Alert.alert("Por favor, insira os valores corretamente");
        return true;
      }
    }

    return false;
  }

  async function handleSignIn() {
    const login = {
      email: getEmail,
      password: getPassword
    };

    if (isFormInvalid(login)) return;

    setLoading(true);
    const res = await signIn(login);
    console.log(res);

    if (res == httpStatus.SERVER_ERROR) {
      const nav = navigation.navigate("Exception", {
        navigateTo: 'Initial'
      });

      return nav;
    } else if (res == '' || res.status == httpStatus.NOT_FOUND || res.status == httpStatus.FORBIDDEN) {
      Alert.alert("Login inválido");
      setLoading(false);
      return;
    }

    setLoading(false);
    navigation.navigate('Home', {
      user: res
    });
  }

  const renderLoading = () => {
    return(
        <View style={{ flex: 1 }}>
          <LoadingSimbol size="small"/>
        </View>
    );
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="light-content" />
      <Background
          source={images.loginPageWallpaper}
      />

      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
      >
        <Header>
          <ComeBackButton
            navigation={navigation}
          />

          <Title>
            <Text style={{ ...FONTS.h1, fontWeight: 'bold' }}>
              Sua mochila já está quase aberta
            </Text>
          </Title>
        </Header>

        <Content>
          <LoginSection>
            <Text style={{
              ...FONTS.h2,
              color: `${COLORS.black}`,
              fontWeight: '500',
              marginBottom: 18,
            }}>
              Acessar conta
            </Text>

            <Form>
              <Input>
                <View style={{ marginBottom: 20 }}>
                  <TextInput
                    onChangeText={setEmail}
                    value={getEmail}
                    autoCapitalize="none"
                    onFocus={() => onFocus('Email')}
                    onBlur={() => onBlur('Email', getEmail)}
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
                    onChangeText={setPassword}
                    value={getPassword}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onFocus={() => onFocus('Senha')}
                    onBlur={() => onBlur('Senha', getPassword)}
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
              </Input>

              <ButtonSection>
                <Button
                  onPress={ () =>  handleSignIn() }
                >
                  {
                    isLoading ? renderLoading()
                    :
                    <Text style={{ ...FONTS.buttons, fontWeight: 'bold', textAlign: 'center' }}>
                      Entrar
                    </Text>
                  }
                </Button>
              </ButtonSection>
            </Form>

            <Footer>
              <Text style={{ ...FONTS.p, fontWeight: '400', color: COLORS.black }}>A sua mochila Sofia é nova?</Text>
              <TouchableOpacity
                onPress={ () => { navigation.navigate('Registration') }}
              >
                <Text style={{ marginLeft: 5, color: COLORS.links }}>Cadastrar</Text>
              </TouchableOpacity>
            </Footer>
          </LoginSection>
        </Content>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
      flex: 1,
      backgroundColor: COLORS.white,
  },
})
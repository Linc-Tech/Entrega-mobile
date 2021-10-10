import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Animated, KeyboardAvoidingView } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import Button from '../../../components/Button';
import ComeBackButton from '../../../components/ComeBackButton';
import { TextInputMask } from 'react-native-masked-text';
import { ButtonSection, Container, Form, Header, TextInput, Title, Placeholder, InputBox } from './styles';

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
  const [getNicknameInput, setNicknameInput] = useState();
  const [getIdInput, setIdInput] = useState();
  const [getEmailInput, setEmailInput] = useState();
  const [getPasswordInput, setPasswordInput] = useState();
  const [getConfirmPassword, setConfirmPassword] = useState();
  const [getTelephoneInput, setTelephoneInput] = useState();

  const listOfSets = [
    {
      set: setNameInputStyle,
      id: 'Nome'
    },

    {
      set: setNicknameInputStyle,
      id: 'Apelido'
    },

    {
      set: setIdInputStyle,
      id: 'ID'
    },

    {
      set: setEmailInputStyle,
      id: 'Email'
    },

    {
      set: setPasswordInputStyle,
      id: 'Senha'
    },

    {
      set: setConfirmPasswordStyle,
      id: 'Confirmar'
    },

    {
      set: setTelephoneInputStyle,
      id: 'Telefone'
    },

  ]

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

  return(
    <View style={styles.safearea}>
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
                    onChangeText={setIdInput}
                    value={getIdInput}
                    autoCapitalize='characters'
                    onFocus={() => onFocus('ID')}
                    onBlur={() => onBlur('ID', getIdInput)}
                    selectionColor={COLORS.black}
                    style={{
                      borderColor: getIdInputStyle.borderColor
                    }}
                  />
                  <Placeholder>
                      <Text style={{
                        color: getIdInputStyle.color,
                        transform: getIdInputStyle.transform,
                        fontSize: getIdInputStyle.fontSize,
                        fontWeight: getIdInputStyle.fontWeight,
                      }}>
                        ID da mochila
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
                    navigation={navigation}
                    route="Home"
                    text='Cadastrar Sofia'
                />
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
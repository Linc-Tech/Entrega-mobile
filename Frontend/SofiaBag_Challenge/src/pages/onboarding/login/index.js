import React from 'react';

import { Text, TouchableOpacity } from 'react-native';
import images from '../../../../constants/images';
import { COLORS, FONTS } from '../../../../constants/theme';
import Button from '../../../components/Button';
import ComeBackButton from '../../../components/ComeBackButton';
import Input from '../../../components/Input';
import { validateLogin } from '../../../services/LoginService';

import {
  Container,
  Background,
  LoginSection,
  Footer,
  InputSection,
  Header,
  Content,
  Title
  } from './styles';

const Login = ({ navigation }) => {
  const [text, onChangeText] = React.useState('Email');

  return (
    <Container>
      <Background
          source={images.loginPageWallpaper}
      />

      <Content>
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

        <LoginSection>
          <Text style={{
            ...FONTS.h2,
            color: `${COLORS.black}`,
            fontWeight: '500',
            marginBottom: 18,
          }}>
            Acessar conta
          </Text>

          <InputSection>
            <Input
              placeholder="Email"
              type="email-adress"
            />
            <Input
              placeholder="Senha"
              type="password"
            />
            <Button
              text="Entrar"
              navigation={navigation}
              route="Home"
            />
          </InputSection>

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
    </Container>
  );
};

export default Login;

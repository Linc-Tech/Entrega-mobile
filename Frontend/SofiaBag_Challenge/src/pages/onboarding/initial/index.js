import React from 'react';
import { Text } from 'react-native';
import images from '../../../../constants/images';
import { COLORS, FONTS } from '../../../../constants/theme';

import { Container, Background, Title, Button, Content, Filtro } from './styles';

const Initial = ({ navigation }) => {
  return (
    <Container>
      <Background
        source={images.initialPageWallpaper}
      />
      <Filtro
        opacity={0.2}
      />
      <Content>
        <Title>
          <Text style={{ ...FONTS.h1, marginBottom: 12, fontWeight: 'bold' }}>Bem-vindo à Sofia</Text>
          <Text style={{ ...FONTS.h3, textAlign: 'center', lineHeight: 25 }}>
            a sua nova mochila inteligente que não te deixa
            mais esquecer da coisas
          </Text>
        </Title>
        <Button
          onPress={() => { navigation.navigate('Login') }}
        >
          <Text style={{ ...FONTS.buttons, color: COLORS.black, fontWeight: 'bold' }}>Abrir mochila</Text>
        </Button>
      </Content>

    </Container>
  );
};

export default Initial;

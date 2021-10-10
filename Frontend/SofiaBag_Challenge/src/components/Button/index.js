import React from 'react';
import { Text } from 'react-native';
import { FONTS } from '../../../constants/theme';

import { Container, ButtonSection } from './styles';

const Button = ({ text, navigation, route }) => {
  return (
    <Container>
      <ButtonSection
        onPress={ () =>  { navigation.navigate(`${route}`) } }
      >
        <Text style={{ ...FONTS.buttons, fontWeight: 'bold', textAlign: 'center' }}>
          {text}
        </Text>
      </ButtonSection>
    </Container>
  );
};

export default Button;

import React from 'react';

import { Container, TextInput } from './styles';

const Input = (item) => {
  const [value, onChangevalue] = React.useState(null);

  return (
    <Container>
      <TextInput
        onChangeText={onChangevalue}
        value={value}
        placeholder={item.placeholder}
        keyboardType={item.type == "password" ? null : item.type}
        secureTextEntry={item.type == "password" ? true : false}
      />
    </Container>
  );
};

export default Input;

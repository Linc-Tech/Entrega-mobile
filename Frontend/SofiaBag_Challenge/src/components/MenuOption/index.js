import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';

import {
  Option,
  Icon,
} from './styles';

const MenuOption = ({ item, navigation }) => {
  return (
    <SafeAreaView>
      <Option style={{ marginLeft: 0, }}
        onPress={() => { navigation.navigate(`${item.nav}`) }}
      >
        <Icon
          source={item.icon}
        />
        <Text style={{
          ...FONTS.menu,
          fontWeight: 'bold',
          color: COLORS.black
        }}>{item.title}</Text>
      </Option>
    </SafeAreaView>

  )
}

export default MenuOption;

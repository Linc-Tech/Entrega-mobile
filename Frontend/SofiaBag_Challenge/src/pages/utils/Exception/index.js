
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import avatar from '../../../../constants/avatar';
import { COLORS, FONTS } from '../../../../constants/theme';
import { ButtonSection, Image } from './styles';

export default function({ navigation, route }) {
  const { navigateTo } = route.params ? route.params : {};

  function navigate() {
    if (navigateTo) {
      navigation.navigate(navigateTo);
    } else {
      navigation.navigate('Home')
    }
  }

  return(
    <SafeAreaView style={styles.safearea}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Image
            source={avatar.execeptionAvatar}
          />

          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            flex: 1,
          }}>
            <Text style={styles.title}>
              Ops!
            </Text>

            <Text style={styles.title}>
              Parece que tivemos um erro...
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.message}>
              Desculpe o inconveninte, isso não costuma acontecer sempre.
              Prometo que estamos trabalhando para concertar isso o
              mais rápido o possível, tá bom? :)
            </Text>
          </View>
        </ScrollView>
      </View>
      <ButtonSection
        onPress={() => navigate() }
      >
        <Text style={{ ...FONTS.buttons, fontWeight: 'bold', textAlign: 'center' }}>
          Entendido
        </Text>
      </ButtonSection>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  container: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
    width: 250,
  },

  message: {
    marginVertical: 32,
    textAlign: 'center',
    lineHeight: 20,
    marginHorizontal: 25
  }
})
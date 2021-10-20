import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import images from '../../../../constants/images';
import { COLORS, FONTS } from '../../../../constants/theme';
import { Announcement, Background, Button, ButtonBox, Comment, Config, ConfigSection, Filtro } from './styles';
import ScreenHeader from '../../../components/ScreenHeader';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function Settings({ navigation, route }) {
  const { user } = route.params;

  return(
    <SafeAreaView style={styles.safearea}>
      <StatusBar barStyle="light-content" />
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <ScreenHeader navigation={navigation} theme="white">
          Configurações
        </ScreenHeader>
      </View>
      <View style={styles.container}>
        <Announcement>
          <Background source={images.womanWithABag} />
          <Comment>
            <Text style={{ ...FONTS.h2, fontWeight: 'bold', lineHeight: 24 }}>
              Promoção {`\n`}Sofia Bag Premium {`\n`}R$ 799,90
            </Text>
          </Comment>
          <ButtonBox>
            <Button>
              <Text style={{ ...FONTS.h2, fontWeight: 'bold', color: COLORS.white }}>
                Adquirir
              </Text>
            </Button>
          </ButtonBox>
        </Announcement>

        <Config>
          <View>
            <Text style={{ ...FONTS.h5, fontWeight: '700', color: COLORS.white }}>
              Conta
            </Text>

            <View style={{ marginTop: 15 }}>
              <ConfigSection
                onPress={ () => navigation.navigate('Profile', { user })}
              >
                <Ionicons name="ios-person-outline" size={24} color="white" />

                <Text style={{ ...FONTS.p, color: COLORS.white, marginLeft: 15 }}>
                  Meu Perfil
                </Text>
              </ConfigSection>

              <ConfigSection
                onPress={ () => navigation.navigate('Password', { user })}
              >
                <Ionicons name="ios-keypad" size={24} color="white" />
                <Text style={{ ...FONTS.p, color: COLORS.white, marginLeft: 15 }}>
                  Senha
                </Text>
              </ConfigSection>
            </View>
          </View>

          <View style={{ marginTop: 50 }}>
            <Text style={{ ...FONTS.h5, fontWeight: '700', color: COLORS.white }}>
              Outros
            </Text>

            <View style={{ marginTop: 15 }}>
              <ConfigSection
                onPress={ () => navigation.navigate('Initial') }
              >
                <AntDesign name="logout" size={24} color="white" />

                <Text style={{ ...FONTS.p, color: COLORS.white, marginLeft: 15 }}>
                  Sair
                </Text>
              </ConfigSection>
            </View>
          </View>
        </Config>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
      flex: 1,
      backgroundColor: COLORS.black,
  },

  container: {
    flex: 1,
    marginHorizontal: 30,
    marginBottom: 10,
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
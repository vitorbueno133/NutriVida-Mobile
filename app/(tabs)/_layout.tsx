import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { NotepadText, CalendarRange, UtensilsCrossed, MoreHorizontal, User, Info, Mail } from 'lucide-react-native';
import { useRouter } from 'expo-router'; 

const { height } = Dimensions.get('window');

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [menuVisivel, setMenuVisivel] = useState(false);
  const [animacaoMenu] = useState(new Animated.Value(300));
  const router = useRouter(); 

  const toggleMenu = () => {
    if (menuVisivel) {
      Animated.timing(animacaoMenu, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setMenuVisivel(false));
    } else {
      setMenuVisivel(true);
      Animated.spring(animacaoMenu, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 10,
      }).start();
    }
  };

  const opcoesMenu = [
    { id: 1, titulo: "Perfil", icone: User, cor: "#4A90E2", rota: "perfil" }, 
    { id: 2, titulo: "Sobre nós", icone: Info, cor: "#50C878", rota: "sobre" },
    { id: 3, titulo: "Fale Conosco", icone: Mail, cor: "#FF6B6B", rota: "contato" },
  ];

  return (
    <>
    <StatusBar
    barStyle="light-content"
    backgroundColor="transparent"
    translucent={true}
    />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 25 : 20,
            left: 20,
            right: 20,
            backgroundColor: 'rgba(0, 0, 0, 1)',
            borderRadius: 25,
            height: 55,
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: '#000',
            marginLeft: 7,
            marginRight: 7,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 8,
            zIndex: 2,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
          listeners={{
            tabPress: () => {
              if (menuVisivel) toggleMenu();
            },
          }}
        />

        <Tabs.Screen
          name="Agendamento"
          options={{
            title: 'Agendamento',
            tabBarIcon: ({ color }) => (
              <NotepadText size={28} color={color} />
            ),
          }}
          listeners={{
            tabPress: () => {
              if (menuVisivel) toggleMenu();
            },
          }}
        />

        <Tabs.Screen
          name="opcoescardapio"
          options={{
            title: 'Cardápio',
            tabBarIcon: ({ color }) => (
              <UtensilsCrossed size={28} color={color} />
            ),
          }}
          listeners={{
            tabPress: () => {
              if (menuVisivel) toggleMenu();
            },
          }}
        />

        <Tabs.Screen
          name="servicos"
          options={{
            title: 'Mais',
            tabBarIcon: ({ color }) => (
              <MoreHorizontal size={28} color={color} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              toggleMenu();
            },
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="cardapio"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="dicas"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="planos"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="imc"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="cardapioGerado"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="duvidas"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="contato"
          options={{
            href: null,
          }}
        />

         <Tabs.Screen
          name="configuracoes"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="editarPerfil"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="privacidade"
          options={{
            href: null,
          }}
        />

      </Tabs>

      {menuVisivel && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={toggleMenu}
          />

          <Animated.View
            style={[
              styles.menuFlutuante,
              { transform: [{ translateY: animacaoMenu }] },
            ]}
          >
            <LinearGradient
              colors={['#0a1f1a', '#0f172a', "#03001de8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.menuContainer}
            >
              <View style={styles.menuOpcoes}>
                {opcoesMenu.map((opcao, index) => {
                  const IconeComponente = opcao.icone;
                  return (
                    <TouchableOpacity
                      key={opcao.id}
                      style={[
                        styles.menuOpcao,
                        index === opcoesMenu.length - 1 && styles.ultimaOpcao,
                      ]}
                      onPress={() => {
                        toggleMenu();
                        router.push(`/${opcao.rota}`);
                      }}
                    >
                      <View
                        style={[
                          styles.iconeContainer,
                          { backgroundColor: opcao.cor },
                        ]}
                      >
                        <IconeComponente size={24} color="#fff" />
                      </View>
                      <Text style={styles.opcaoTexto}>{opcao.titulo}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </LinearGradient>
          </Animated.View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  menuFlutuante: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 90 : 70,
    left: 0,
    right: 0,
    zIndex: 1,
    shadowColor: '#695e5e',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    elevation: 10,
  },
  menuContainer: {
    backgroundColor: '#005300',
    overflow: 'hidden',
  },
  menuOpcoes: {
    paddingVertical: 3,
  },
  menuOpcao: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ultimaOpcao: {
    borderBottomWidth: 0,
  },
  iconeContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  opcaoTexto: {
    fontSize: 17,
    color: '#ffffff',
    fontWeight: '600',
  },
});

import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
  Switch,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Bell,
  Moon,
  Globe,
  Volume2,
  Shield,
  Database,
  Smartphone,
  Download,
  Trash2,
  RefreshCw,
  ChevronRight,
  Check,
} from "lucide-react-native";

const { width } = Dimensions.get("window");
const perfilIcon = require("@/assets/images/perfilicon.png");
const logoApp = require("@/assets/images/logo.png");

export default function Configuracoes() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Estados dos switches
  const [notificacoes, setNotificacoes] = useState(true);
  const [notificacaoLembrete, setNotificacaoLembrete] = useState(true);
  const [notificacaoRefeicao, setNotificacaoRefeicao] = useState(true);
  const [notificacaoProgresso, setNotificacaoProgresso] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(true);
  const [sons, setSons] = useState(true);
  const [vibracao, setVibracao] = useState(true);
  const [downloadAutomatico, setDownloadAutomatico] = useState(false);

  const [idiomaSelecionado, setIdiomaSelecionado] = useState("pt-BR");

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const idiomas = [
    { codigo: "pt-BR", nome: "Português (Brasil)", flag: "🇧🇷" },
    { codigo: "en-US", nome: "English (US)", flag: "🇺🇸" },
    { codigo: "es-ES", nome: "Español", flag: "🇪🇸" },
  ];

  const handleLimparCache = () => {
    Alert.alert(
      "Limpar Cache",
      "Isso removerá arquivos temporários. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          onPress: () => Alert.alert("Sucesso", "Cache limpo com sucesso!"),
        },
      ]
    );
  };

  const handleLimparDados = () => {
    Alert.alert(
      "Limpar Dados",
      "ATENÇÃO: Isso removerá todos os seus dados locais. Esta ação não pode ser desfeita!",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: () => Alert.alert("Dados Removidos", "Todos os dados foram limpos."),
        },
      ]
    );
  };

  const handleRestaurarPadrao = () => {
    Alert.alert(
      "Restaurar Padrões",
      "Deseja restaurar todas as configurações para os valores padrão?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Restaurar",
          onPress: () => {
            setNotificacoes(true);
            setNotificacaoLembrete(true);
            setNotificacaoRefeicao(true);
            setNotificacaoProgresso(true);
            setModoEscuro(true);
            setSons(true);
            setVibracao(true);
            setDownloadAutomatico(false);
            setIdiomaSelecionado("pt-BR");
            Alert.alert("Sucesso", "Configurações restauradas!");
          },
        },
      ]
    );
  };

  return (
    <LinearGradient colors={["#0a1f1a", "#0f172a"]} style={styles.gradient}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image source={logoApp} style={styles.logo} resizeMode="contain" />
          <Text style={styles.headerTitle}>Configurações</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/perfil")}>
          <Image source={perfilIcon} style={styles.perfilImg} resizeMode="cover" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Notificações */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <View style={styles.sectionHeader}>
            <Bell color="#00E676" size={24} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Notificações</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Ativar Notificações</Text>
                <Text style={styles.settingDesc}>
                  Receber todas as notificações do app
                </Text>
              </View>
              <Switch
                value={notificacoes}
                onValueChange={setNotificacoes}
                trackColor={{ false: "#666", true: "#00E676" }}
                thumbColor="#fff"
              />
            </View>

            {notificacoes && (
              <>
                <View style={styles.divider} />
                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Text style={styles.settingTitle}>Lembretes de Água</Text>
                    <Text style={styles.settingDesc}>
                      Avisos para beber água
                    </Text>
                  </View>
                  <Switch
                    value={notificacaoLembrete}
                    onValueChange={setNotificacaoLembrete}
                    trackColor={{ false: "#666", true: "#00E676" }}
                    thumbColor="#fff"
                  />
                </View>

                <View style={styles.divider} />
                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Text style={styles.settingTitle}>Horário de Refeições</Text>
                    <Text style={styles.settingDesc}>
                      Lembretes para cada refeição
                    </Text>
                  </View>
                  <Switch
                    value={notificacaoRefeicao}
                    onValueChange={setNotificacaoRefeicao}
                    trackColor={{ false: "#666", true: "#00E676" }}
                    thumbColor="#fff"
                  />
                </View>

                <View style={styles.divider} />
                <View style={styles.settingItem}>
                  <View style={styles.settingLeft}>
                    <Text style={styles.settingTitle}>Progresso Semanal</Text>
                    <Text style={styles.settingDesc}>
                      Resumo das suas conquistas
                    </Text>
                  </View>
                  <Switch
                    value={notificacaoProgresso}
                    onValueChange={setNotificacaoProgresso}
                    trackColor={{ false: "#666", true: "#00E676" }}
                    thumbColor="#fff"
                  />
                </View>
              </>
            )}
          </View>
        </Animated.View>

        {/* Aparência */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <View style={styles.sectionHeader}>
            <Moon color="#8B5CF6" size={24} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Aparência</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Modo Escuro</Text>
                <Text style={styles.settingDesc}>
                  Tema escuro para economizar bateria
                </Text>
              </View>
              <Switch
                value={modoEscuro}
                onValueChange={setModoEscuro}
                trackColor={{ false: "#666", true: "#8B5CF6" }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </Animated.View>

        {/* Idioma */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Globe color="#3B82F6" size={24} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Idioma</Text>
          </View>

          <View style={styles.card}>
            {idiomas.map((idioma, index) => (
              <View key={idioma.codigo}>
                {index > 0 && <View style={styles.divider} />}
                <TouchableOpacity
                  style={styles.languageItem}
                  onPress={() => setIdiomaSelecionado(idioma.codigo)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.languageFlag}>{idioma.flag}</Text>
                  <Text style={styles.languageText}>{idioma.nome}</Text>
                  {idiomaSelecionado === idioma.codigo && (
                    <Check color="#00E676" size={22} strokeWidth={2.5} />
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Som e Vibração */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Volume2 color="#FFB800" size={24} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Som e Vibração</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Sons</Text>
                <Text style={styles.settingDesc}>
                  Efeitos sonoros do app
                </Text>
              </View>
              <Switch
                value={sons}
                onValueChange={setSons}
                trackColor={{ false: "#666", true: "#FFB800" }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Vibração</Text>
                <Text style={styles.settingDesc}>
                  Feedback tátil nas interações
                </Text>
              </View>
              <Switch
                value={vibracao}
                onValueChange={setVibracao}
                trackColor={{ false: "#666", true: "#FFB800" }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </View>

        {/* Armazenamento */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Database color="#EF4444" size={24} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Armazenamento</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Download Automático</Text>
                <Text style={styles.settingDesc}>
                  Baixar conteúdo automaticamente
                </Text>
              </View>
              <Switch
                value={downloadAutomatico}
                onValueChange={setDownloadAutomatico}
                trackColor={{ false: "#666", true: "#00E676" }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleLimparCache}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconBg, { backgroundColor: "#3B82F620" }]}>
                <Trash2 color="#3B82F6" size={20} strokeWidth={2} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Limpar Cache</Text>
                <Text style={styles.actionDesc}>125 MB de arquivos temporários</Text>
              </View>
              <ChevronRight color="#666" size={20} strokeWidth={2} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleLimparDados}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconBg, { backgroundColor: "#EF444420" }]}>
                <Database color="#EF4444" size={20} strokeWidth={2} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Limpar Dados</Text>
                <Text style={styles.actionDesc}>Remove todos os dados locais</Text>
              </View>
              <ChevronRight color="#666" size={20} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sobre */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Smartphone color="#10b981" size={24} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Sobre o App</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Versão</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Build</Text>
              <Text style={styles.infoValue}>2025.01.11</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Desenvolvedor</Text>
              <Text style={styles.infoValue}>NutriVida Team</Text>
            </View>
          </View>
        </View>

        {/* Restaurar Padrões */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleRestaurarPadrao}
          activeOpacity={0.8}
        >
          <RefreshCw color="#FFB800" size={22} strokeWidth={2} />
          <Text style={styles.resetText}>Restaurar Configurações Padrão</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 NutriVida - Todos os direitos reservados
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "rgba(10, 31, 26, 0.95)",
  },

  backButton: {
    color: "#00E676",
    fontSize: 32,
    fontWeight: "300",
  },

  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 30,
    height: 30,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  perfilImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#00E676",
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  // Section
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  // Card
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },

  settingLeft: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },

  settingDesc: {
    fontSize: 13,
    color: "#bafdbc",
    lineHeight: 18,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 16,
  },

  // Language
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 4,
  },

  languageFlag: {
    fontSize: 28,
  },

  languageText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },

  // Action Items
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  actionIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  actionContent: {
    flex: 1,
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },

  actionDesc: {
    fontSize: 13,
    color: "#bafdbc",
  },

  // Info Items
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  infoLabel: {
    fontSize: 15,
    color: "#bafdbc",
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },

  // Reset Button
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginHorizontal: 20,
    marginTop: 28,
    backgroundColor: "rgba(255, 184, 0, 0.1)",
    borderRadius: 16,
    paddingVertical: 18,
    borderWidth: 2,
    borderColor: "rgba(255, 184, 0, 0.3)",
  },

  resetText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFB800",
  },

  // Footer
  footer: {
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 10,
  },

  footerText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
  },
});
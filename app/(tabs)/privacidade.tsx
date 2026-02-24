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
  Lock,
  Eye,
  EyeOff,
  Shield,
  Fingerprint,
  Key,
  Users,
  MapPin,
  Cookie,
  Share2,
  FileText,
  AlertCircle,
  ChevronRight,
  Trash2,
} from "lucide-react-native";

const { width } = Dimensions.get("window");
const perfilIcon = require("@/assets/images/perfilicon.png");
const logoApp = require("@/assets/images/logo.png");

export default function Privacidade() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Estados dos switches
  const [perfilPublico, setPerfilPublico] = useState(false);
  const [compartilharProgresso, setCompartilharProgresso] = useState(true);
  const [localizacao, setLocalizacao] = useState(true);
  const [cookies, setCookies] = useState(true);
  const [analiseDados, setAnaliseDados] = useState(true);
  const [biometria, setBiometria] = useState(false);
  const [autenticacaoDoisFatores, setAutenticacaoDoisFatores] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAlterarSenha = () => {
    Alert.alert(
      "Alterar Senha",
      "Você será redirecionado para alterar sua senha.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Continuar", onPress: () => console.log("Alterar senha") },
      ]
    );
  };

  const handleExportarDados = () => {
    Alert.alert(
      "Exportar Dados",
      "Seus dados serão exportados em formato JSON. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Exportar",
          onPress: () => Alert.alert("Sucesso", "Dados exportados com sucesso!"),
        },
      ]
    );
  };

  const handleExcluirConta = () => {
    Alert.alert(
      "Excluir Conta",
      "ATENÇÃO: Esta ação é PERMANENTE e não pode ser desfeita. Todos os seus dados serão perdidos. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir Conta",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Confirmação Final",
              "Digite 'EXCLUIR' para confirmar a exclusão da conta.",
              [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Confirmar",
                  style: "destructive",
                  onPress: () => Alert.alert("Conta Excluída", "Sua conta foi excluída."),
                },
              ]
            );
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
          <Text style={styles.headerTitle}>Privacidade</Text>
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
        {/* Segurança da Conta */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <View style={styles.sectionHeader}>
            <Shield color="#00E676" size={24} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Segurança da Conta</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Autenticação Biométrica</Text>
                <Text style={styles.settingDesc}>
                  Use digital ou Face ID para entrar
                </Text>
              </View>
              <Switch
                value={biometria}
                onValueChange={setBiometria}
                trackColor={{ false: "#666", true: "#00E676" }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Autenticação em 2 Fatores</Text>
                <Text style={styles.settingDesc}>
                  Camada extra de segurança via SMS
                </Text>
              </View>
              <Switch
                value={autenticacaoDoisFatores}
                onValueChange={setAutenticacaoDoisFatores}
                trackColor={{ false: "#666", true: "#00E676" }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleAlterarSenha}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconBg, { backgroundColor: "#00E67620" }]}>
                <Key color="#00E676" size={20} strokeWidth={2} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Alterar Senha</Text>
                <Text style={styles.actionDesc}>Última alteração: há 30 dias</Text>
              </View>
              <ChevronRight color="#666" size={20} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Privacidade do Perfil */}
       

        {/* Dados e Localização */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <View style={styles.sectionHeader}>
            <MapPin color="#FFB800" size={24} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Dados e Localização</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Acesso à Localização</Text>
                <Text style={styles.settingDesc}>
                  Para encontrar nutricionistas próximos
                </Text>
              </View>
              <Switch
                value={localizacao}
                onValueChange={setLocalizacao}
                trackColor={{ false: "#666", true: "#FFB800" }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Cookies e Rastreamento</Text>
                <Text style={styles.settingDesc}>
                  Melhorar experiência e anúncios
                </Text>
              </View>
              <Switch
                value={cookies}
                onValueChange={setCookies}
                trackColor={{ false: "#666", true: "#FFB800" }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingTitle}>Análise de Dados</Text>
                <Text style={styles.settingDesc}>
                  Ajudar a melhorar o app
                </Text>
              </View>
              <Switch
                value={analiseDados}
                onValueChange={setAnaliseDados}
                trackColor={{ false: "#666", true: "#FFB800" }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </Animated.View>

        {/* Seus Dados */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <View style={styles.sectionHeader}>
            <FileText color="#8B5CF6" size={24} strokeWidth={2} />
            <Text style={styles.sectionTitle}>Seus Dados</Text>
          </View>

          <View style={styles.card}>
            <TouchableOpacity
              style={styles.actionItem}
              onPress={handleExportarDados}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconBg, { backgroundColor: "#8B5CF620" }]}>
                <Share2 color="#8B5CF6" size={20} strokeWidth={2} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Exportar Meus Dados</Text>
                <Text style={styles.actionDesc}>Baixar cópia de todos os dados</Text>
              </View>
              <ChevronRight color="#666" size={20} strokeWidth={2} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => router.push("/duvidas")}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconBg, { backgroundColor: "#8B5CF620" }]}>
                <FileText color="#8B5CF6" size={20} strokeWidth={2} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Política de Privacidade</Text>
                <Text style={styles.actionDesc}>Leia nossa política completa</Text>
              </View>
              <ChevronRight color="#666" size={20} strokeWidth={2} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => router.push("/duvidas")}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIconBg, { backgroundColor: "#8B5CF620" }]}>
                <FileText color="#8B5CF6" size={20} strokeWidth={2} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Termos de Uso</Text>
                <Text style={styles.actionDesc}>Veja os termos do serviço</Text>
              </View>
              <ChevronRight color="#666" size={20} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Aviso de Privacidade */}
        <View style={styles.warningCard}>
          <AlertCircle color="#3B82F6" size={24} strokeWidth={2} />
          <Text style={styles.warningTitle}>Sua privacidade é importante</Text>
          <Text style={styles.warningText}>
            Nunca compartilhamos seus dados pessoais com terceiros sem sua permissão. 
            Todos os dados são criptografados e armazenados com segurança.
          </Text>
        </View>

        {/* Zona de Perigo */}
        <View style={styles.dangerZone}>
          <View style={styles.dangerHeader}>
            <AlertCircle color="#EF4444" size={24} strokeWidth={2} />
            <Text style={styles.dangerTitle}>Zona de Perigo</Text>
          </View>

          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleExcluirConta}
            activeOpacity={0.8}
          >
            <Trash2 color="#EF4444" size={22} strokeWidth={2} />
            <Text style={styles.dangerButtonText}>Excluir Minha Conta</Text>
          </TouchableOpacity>
          
          <Text style={styles.dangerWarning}>
            ⚠️ Esta ação é permanente e não pode ser desfeita. Todos os seus dados 
            serão perdidos para sempre.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🔒 Seus dados estão protegidos com criptografia de ponta a ponta
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

  // Warning Card
  warningCard: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: "rgba(59, 130, 246, 0.3)",
    alignItems: "center",
  },

  warningTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 12,
    marginBottom: 8,
  },

  warningText: {
    fontSize: 14,
    color: "#bafdbc",
    textAlign: "center",
    lineHeight: 22,
  },

  // Danger Zone
  dangerZone: {
    marginHorizontal: 20,
    marginTop: 28,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: "rgba(239, 68, 68, 0.3)",
  },

  dangerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },

  dangerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#EF4444",
  },

  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: "rgba(239, 68, 68, 0.4)",
    marginBottom: 16,
  },

  dangerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EF4444",
  },

  dangerWarning: {
    fontSize: 13,
    color: "#bafdbc",
    textAlign: "center",
    lineHeight: 20,
  },

  // Footer
  footer: {
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },

  footerText: {
    color: "#00E676",
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
  },
});
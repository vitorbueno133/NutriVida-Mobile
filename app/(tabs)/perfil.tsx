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
  Alert,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Settings,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  Edit,
  Crown,
  Award,
  TrendingUp,
  ChevronRight,
  Camera,
} from "lucide-react-native";

const { width } = Dimensions.get("window");
const perfilIcon = require("@/assets/images/perfilicon.png");
const logoApp = require("@/assets/images/logo.png");

export default function Perfil() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const userData = {
    nome: "Lucas Galvão",
    email: "Lucas_Galvão@gmail.com",
    telefone: "(16) 99999-9999",
    dataNascimento: "25/05/2006",
    plano: "Premium",
    dataInicio: "01/01/2025",
  };

  const stats = [
    {
      icon: TrendingUp,
      label: "Peso Perdido",
      value: "-4kg",
      cor: "#00E676",
    },
    {
      icon: Award,
      label: "Dias Ativos",
      value: "15",
      cor: "#FFB800",
    },
    {
      icon: Calendar,
      label: "Sequência",
      value: "7 dias",
      cor: "#3B82F6",
    },
  ];

  const menuItems = [
    {
      id: 1,
      title: "Editar Perfil",
      icon: Edit,
      color: "#00E676",
      action: () => router.push("/editarPerfil"),
    },
    {
      id: 2,
      title: "Meu Plano",
      icon: Crown,
      color: "#FFB800",
      badge: "Premium",
      action: () => router.push("/planos"),
    },
    {
      id: 3,
      title: "Configurações",
      icon: Settings,
      color: "#3B82F6",
      action: () => router.push("/configuracoes"),
    },
    {
      id: 4,
      title: "Notificações",
      icon: Bell,
      color: "#8B5CF6",
      hasSwitch: true,
    },
    {
      id: 5,
      title: "Privacidade",
      icon: Lock,
      color: "#EF4444",
      action: () => router.push("/privacidade"),
    },
    {
      id: 6,
      title: "Ajuda e Suporte",
      icon: HelpCircle,
      color: "#F97316",
      action: () => router.push("/duvidas"),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => router.push("/login"),
        },
      ]
    );
  };

  const handleChangePhoto = () => {
    Alert.alert(
      "Alterar Foto",
      "Escolha uma opção:",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Câmera", onPress: () => console.log("Abrir câmera") },
        { text: "Galeria", onPress: () => console.log("Abrir galeria") },
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
          <Text style={styles.headerTitle}>Meu Perfil</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Card de Perfil */}
        <Animated.View
          style={[
            styles.profileCard,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <LinearGradient
            colors={["#00E676", "#00C853"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileGradient}
          >
            {/* Foto de Perfil */}
            <View style={styles.photoContainer}>
              <Image source={perfilIcon} style={styles.profilePhoto} resizeMode="cover" />
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={handleChangePhoto}
                activeOpacity={0.8}
              >
                <Camera color="#0D332D" size={18} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            {/* Informações do Usuário */}
            <Text style={styles.userName}>{userData.nome}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>

            {/* Badge do Plano */}
            <View style={styles.planBadge}>
              <Crown color="#FFB800" size={16} strokeWidth={2.5} />
              <Text style={styles.planBadgeText}>Plano {userData.plano}</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Estatísticas */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Animated.View
                key={index}
                style={[
                  styles.statCard,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={[styles.statIconBg, { backgroundColor: stat.cor + "20" }]}>
                  <IconComponent color={stat.cor} size={24} strokeWidth={2} />
                </View>
                <Text style={[styles.statValue, { color: stat.cor }]}>
                  {stat.value}
                </Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </Animated.View>
            );
          })}
        </View>

        {/* Informações Pessoais */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <View style={styles.infoIconBg}>
                <User color="#00E676" size={20} strokeWidth={2} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Nome Completo</Text>
                <Text style={styles.infoValue}>{userData.nome}</Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <View style={styles.infoIconBg}>
                <Mail color="#00E676" size={20} strokeWidth={2} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>E-mail</Text>
                <Text style={styles.infoValue}>{userData.email}</Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <View style={styles.infoIconBg}>
                <Phone color="#00E676" size={20} strokeWidth={2} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Telefone</Text>
                <Text style={styles.infoValue}>{userData.telefone}</Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <View style={styles.infoIconBg}>
                <Calendar color="#00E676" size={20} strokeWidth={2} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Data de Nascimento</Text>
                <Text style={styles.infoValue}>{userData.dataNascimento}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Menu de Opções */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>

          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={item.action}
                activeOpacity={0.7}
                disabled={item.hasSwitch}
              >
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIconBg, { backgroundColor: item.color + "20" }]}>
                    <IconComponent color={item.color} size={22} strokeWidth={2} />
                  </View>
                  <Text style={styles.menuText}>{item.title}</Text>
                </View>

                <View style={styles.menuRight}>
                  {item.badge && (
                    <View style={styles.menuBadge}>
                      <Text style={styles.menuBadgeText}>{item.badge}</Text>
                    </View>
                  )}
                  {item.hasSwitch ? (
                    <Switch
                      value={notificationsEnabled}
                      onValueChange={setNotificationsEnabled}
                      trackColor={{ false: "#666", true: "#00E676" }}
                      thumbColor="#fff"
                    />
                  ) : (
                    <ChevronRight color="#666" size={20} strokeWidth={2} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Informações da Assinatura */}
        <View style={styles.subscriptionCard}>
          <View style={styles.subscriptionHeader}>
            <Crown color="#FFB800" size={28} strokeWidth={2} />
            <Text style={styles.subscriptionTitle}>Assinatura {userData.plano}</Text>
          </View>
          <Text style={styles.subscriptionText}>
            Membro desde: {userData.dataInicio}
          </Text>
          <Text style={styles.subscriptionText}>
            Próxima renovação: 01/02/2025
          </Text>
          <TouchableOpacity
            style={styles.manageButton}
            onPress={() => router.push("/planos")}
            activeOpacity={0.8}
          >
            <Text style={styles.manageButtonText}>Gerenciar Plano</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Sair */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <LogOut color="#EF4444" size={22} strokeWidth={2} />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>NutriVida v1.0.0</Text>
          <Text style={styles.footerSubtext}>© 2025 Todos os direitos reservados</Text>
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

  headerSpacer: {
    width: 40,
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  // Profile Card
  profileCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#00E676",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },

  profileGradient: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  photoContainer: {
    position: "relative",
    marginBottom: 16,
  },

  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
  },

  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#00E676",
  },

  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0D332D",
    marginBottom: 4,
  },

  userEmail: {
    fontSize: 14,
    color: "rgba(13, 51, 45, 0.8)",
    marginBottom: 16,
  },

  planBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(13, 51, 45, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  planBadgeText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#0D332D",
  },

  // Stats
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  statIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 11,
    color: "#bafdbc",
    textAlign: "center",
  },

  // Section
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },

  // Info Card
  infoCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.2)",
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  infoIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: "#bafdbc",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },

  infoDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 16,
  },

  // Menu Items
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },

  menuIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  menuText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },

  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  menuBadge: {
    backgroundColor: "rgba(255, 184, 0, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  menuBadgeText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#FFB800",
  },

  // Subscription
  subscriptionCard: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: "rgba(255, 184, 0, 0.1)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: "rgba(255, 184, 0, 0.3)",
  },

  subscriptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },

  subscriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  subscriptionText: {
    fontSize: 14,
    color: "#bafdbc",
    marginBottom: 8,
  },

  manageButton: {
    backgroundColor: "#FFB800",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
  },

  manageButtonText: {
    color: "#0D332D",
    fontSize: 15,
    fontWeight: "bold",
  },

  // Logout
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: "rgba(239, 68, 68, 0.3)",
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EF4444",
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
    marginBottom: 4,
  },

  footerSubtext: {
    color: "#444",
    fontSize: 11,
  },
});
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
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Camera,
  Save,
  X,
} from "lucide-react-native";

const { width } = Dimensions.get("window");
const perfilIcon = require("@/assets/images/perfilicon.png");
const logoApp = require("@/assets/images/logo.png");

export default function EditarPerfil() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const [nome, setNome] = useState("Vitor Silva");
  const [email, setEmail] = useState("vitor.silva@email.com");
  const [telefone, setTelefone] = useState("(16) 99999-9999");
  const [dataNascimento, setDataNascimento] = useState("15/03/1995");

  const [isModified, setIsModified] = useState(false);

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

  const formatPhone = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = cleaned;

    if (cleaned.length >= 11) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    } else if (cleaned.length >= 7) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length >= 2) {
      formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }

    return formatted;
  };

  const formatDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    let formatted = cleaned;

    if (cleaned.length >= 8) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    } else if (cleaned.length >= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    } else if (cleaned.length >= 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }

    return formatted;
  };

  const handleSave = () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "O nome não pode estar vazio.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Erro", "Digite um email válido.");
      return;
    }

    if (telefone.replace(/\D/g, "").length < 10) {
      Alert.alert("Erro", "Digite um telefone válido.");
      return;
    }

    if (dataNascimento.replace(/\D/g, "").length !== 8) {
      Alert.alert("Erro", "Digite uma data válida (DD/MM/AAAA).");
      return;
    }

    Alert.alert(
      "Sucesso",
      "Perfil atualizado com sucesso!",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleCancel = () => {
    if (isModified) {
      Alert.alert(
        "Descartar Alterações",
        "Você tem alterações não salvas. Deseja descartar?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Descartar", style: "destructive", onPress: () => router.back() },
        ]
      );
    } else {
      router.back();
    }
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
        <TouchableOpacity onPress={handleCancel}>
          <X color="#EF4444" size={28} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image source={logoApp} style={styles.logo} resizeMode="contain" />
          <Text style={styles.headerTitle}>Editar Perfil</Text>
        </View>
        <TouchableOpacity onPress={handleSave}>
          <Save color="#00E676" size={28} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Foto de Perfil */}
          <Animated.View
            style={[
              styles.photoSection,
              { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
            ]}
          >
            <View style={styles.photoContainer}>
              <View style={styles.photoGlow} />
              <Image source={perfilIcon} style={styles.profilePhoto} resizeMode="cover" />
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={handleChangePhoto}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#00E676", "#00C853"]}
                  style={styles.cameraGradient}
                >
                  <Camera color="#0D332D" size={24} strokeWidth={2.5} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <Text style={styles.photoText}>Toque para alterar a foto</Text>
          </Animated.View>

          {/* Formulário */}
          <Animated.View style={[styles.formSection, { opacity: fadeAnim }]}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>

            {/* Nome */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome Completo *</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconBg}>
                  <User color="#00E676" size={20} strokeWidth={2} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu nome completo"
                  placeholderTextColor="#666"
                  value={nome}
                  onChangeText={(text) => {
                    setNome(text);
                    setIsModified(true);
                  }}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>E-mail *</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconBg}>
                  <Mail color="#00E676" size={20} strokeWidth={2} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="seu@email.com"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setIsModified(true);
                  }}
                />
              </View>
            </View>

            {/* Telefone */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Telefone *</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconBg}>
                  <Phone color="#00E676" size={20} strokeWidth={2} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="(00) 00000-0000"
                  placeholderTextColor="#666"
                  keyboardType="phone-pad"
                  maxLength={15}
                  value={telefone}
                  onChangeText={(text) => {
                    setTelefone(formatPhone(text));
                    setIsModified(true);
                  }}
                />
              </View>
            </View>

            {/* Data de Nascimento */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Data de Nascimento *</Text>
              <View style={styles.inputWrapper}>
                <View style={styles.inputIconBg}>
                  <Calendar color="#00E676" size={20} strokeWidth={2} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor="#666"
                  keyboardType="number-pad"
                  maxLength={10}
                  value={dataNascimento}
                  onChangeText={(text) => {
                    setDataNascimento(formatDate(text));
                    setIsModified(true);
                  }}
                />
              </View>
            </View>

            {/* Info de Campos Obrigatórios */}
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>
                * Campos obrigatórios
              </Text>
            </View>
          </Animated.View>

          {/* Botões de Ação */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#00E676", "#00C853"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.saveGradient}
              >
                <Save color="#0D332D" size={22} strokeWidth={2.5} />
                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>

          {/* Dicas */}
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>💡 Dicas</Text>
            <Text style={styles.tipsText}>
              • Mantenha suas informações sempre atualizadas{"\n"}
              • Use um email válido para recuperação de senha{"\n"}
              • Adicione uma foto para personalizar seu perfil{"\n"}
              • Verifique seus dados antes de salvar
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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

  keyboardView: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  // Photo Section
  photoSection: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
  },

  photoContainer: {
    position: "relative",
    marginBottom: 12,
  },

  photoGlow: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(0, 230, 118, 0.2)",
    top: -10,
    left: -10,
  },

  profilePhoto: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#00E676",
  },

  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 25,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#00E676",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },

  cameraGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#0f172a",
  },

  photoText: {
    fontSize: 14,
    color: "#bafdbc",
    marginTop: 8,
  },

  // Form Section
  formSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },

  inputGroup: {
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#bafdbc",
    marginBottom: 10,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(0, 230, 118, 0.2)",
    paddingHorizontal: 16,
  },

  inputIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },

  infoCard: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },

  infoText: {
    fontSize: 13,
    color: "#bafdbc",
  },

  // Action Buttons
  actionButtons: {
    paddingHorizontal: 20,
    marginTop: 30,
    gap: 12,
  },

  saveButton: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#00E676",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },

  saveGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 18,
  },

  saveButtonText: {
    color: "#0D332D",
    fontSize: 17,
    fontWeight: "bold",
  },

  cancelButton: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
  },

  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Tips
  tipsCard: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: "rgba(0, 230, 118, 0.08)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.2)",
  },

  tipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00E676",
    marginBottom: 12,
  },

  tipsText: {
    fontSize: 13,
    color: "#bafdbc",
    lineHeight: 22,
  },
});
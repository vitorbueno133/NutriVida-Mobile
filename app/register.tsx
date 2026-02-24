import React, { useState, useEffect, useRef } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react-native";

const logoApp = require("@/assets/images/Logonutri.png");

export default function Register() {
  const router = useRouter();
  const [nome, setNome] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [celular, setCelular] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function formatPhone(text: string) {
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
  }

  function onClickRegistrar() {
    if (!nome || !login || !password || !password2 || !celular) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }
    if (password !== password2) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    Alert.alert(
      "Sucesso",
      "Cadastro realizado com sucesso!",
      [
        {
          text: "OK",
          onPress: () => router.push("/login"),
        },
      ]
    );
  }

  const isFormValid =
    nome.trim() !== "" &&
    login.trim() !== "" &&
    password.trim() !== "" &&
    password2.trim() !== "" &&
    celular.trim() !== "" &&
    password === password2;

  return (
    <LinearGradient colors={["#0a1f1a", "#0f172a"]} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.container}>
            {/* Header */}
            <Animated.View
              style={[
                styles.header,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: logoScale }],
                },
              ]}
            >
              <Image source={logoApp} style={styles.logo} resizeMode="contain" />
              <Text style={styles.saudacao}>Crie sua conta e comece hoje!</Text>
              <Text style={styles.subtitle}>
                Junte-se a milhares de pessoas
              </Text>
            </Animated.View>

            {/* Form */}
            <Animated.View
              style={[
                styles.main,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Nome Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome Completo</Text>
                <View style={styles.inputWrapper}>
                  <User
                    color="#00E676"
                    size={20}
                    strokeWidth={2}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Seu nome completo"
                    placeholderTextColor="#666"
                    value={nome}
                    onChangeText={setNome}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <Mail
                    color="#00E676"
                    size={20}
                    strokeWidth={2}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="seu@email.com"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={login}
                    onChangeText={setLogin}
                  />
                </View>
              </View>

              {/* Celular Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Celular</Text>
                <View style={styles.inputWrapper}>
                  <Phone
                    color="#00E676"
                    size={20}
                    strokeWidth={2}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="(00) 00000-0000"
                    placeholderTextColor="#666"
                    keyboardType="phone-pad"
                    maxLength={15}
                    value={celular}
                    onChangeText={(text) => setCelular(formatPhone(text))}
                  />
                </View>
              </View>

              {/* Senha Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Senha</Text>
                <View style={styles.inputWrapper}>
                  <Lock
                    color="#00E676"
                    size={20}
                    strokeWidth={2}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Mínimo 6 caracteres"
                    placeholderTextColor="#666"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                    activeOpacity={0.7}
                  >
                    {showPassword ? (
                      <EyeOff color="#666" size={20} strokeWidth={2} />
                    ) : (
                      <Eye color="#666" size={20} strokeWidth={2} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirmar Senha Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmar Senha</Text>
                <View style={styles.inputWrapper}>
                  <Lock
                    color="#00E676"
                    size={20}
                    strokeWidth={2}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Repita sua senha"
                    placeholderTextColor="#666"
                    secureTextEntry={!showPassword2}
                    value={password2}
                    onChangeText={setPassword2}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword2(!showPassword2)}
                    style={styles.eyeIcon}
                    activeOpacity={0.7}
                  >
                    {showPassword2 ? (
                      <EyeOff color="#666" size={20} strokeWidth={2} />
                    ) : (
                      <Eye color="#666" size={20} strokeWidth={2} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Indicador de Senha */}
              {password.length > 0 && (
                <View style={styles.passwordStrength}>
                  <View
                    style={[
                      styles.strengthBar,
                      {
                        width:
                          password.length < 6
                            ? "33%"
                            : password.length < 8
                            ? "66%"
                            : "100%",
                        backgroundColor:
                          password.length < 6
                            ? "#EF4444"
                            : password.length < 8
                            ? "#FFB800"
                            : "#00E676",
                      },
                    ]}
                  />
                  <Text style={styles.strengthText}>
                    {password.length < 6
                      ? "Senha fraca"
                      : password.length < 8
                      ? "Senha média"
                      : "Senha forte"}
                  </Text>
                </View>
              )}

              {/* Validação de senhas iguais */}
              {password2.length > 0 && password !== password2 && (
                <Text style={styles.errorText}>⚠️ As senhas não coincidem</Text>
              )}

              {password2.length > 0 && password === password2 && (
                <Text style={styles.successText}>✓ As senhas coincidem</Text>
              )}

              {/* Botão Criar Conta */}
              {isFormValid ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={onClickRegistrar}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#00E676", "#00C853"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Criar Conta</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.buttonDisabled}
                  onPress={() =>
                    Alert.alert("Atenção", "Preencha todos os campos corretamente.")
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonTextDisabled}>Criar Conta</Text>
                </TouchableOpacity>
              )}

              {/* Termos */}
              <Text style={styles.termsText}>
                Ao criar uma conta, você concorda com nossos{" "}
                <Text style={styles.termsLink}>Termos de Uso</Text> e{" "}
                <Text style={styles.termsLink}>Política de Privacidade</Text>
              </Text>
            </Animated.View>

            {/* Footer */}
            <Animated.View
              style={[
                styles.footer,
                {
                  opacity: fadeAnim,
                },
              ]}
            >
              <Text style={styles.footerText}>Já tem uma conta?</Text>
              <Link href="/login" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.linkCriar}> Fazer login</Text>
                </TouchableOpacity>
              </Link>
            </Animated.View>
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

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 180,
    height: 70,
    marginBottom: 12,
  },

  saudacao: {
    color: "#00E676",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 5,
  },

  subtitle: {
    color: "#bafdbc",
    fontSize: 14,
    fontWeight: "400",
  },

  main: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.2)",
  },

  inputContainer: {
    marginBottom: 16,
  },

  label: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 8,
    color: "#bafdbc",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },

  inputIcon: {
    marginLeft: 14,
  },

  input: {
    flex: 1,
    padding: 14,
    paddingLeft: 10,
    fontSize: 15,
    color: "#000",
  },

  eyeIcon: {
    padding: 14,
  },

  passwordStrength: {
    marginTop: 8,
    marginBottom: 8,
  },

  strengthBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 6,
  },

  strengthText: {
    fontSize: 12,
    color: "#bafdbc",
  },

  errorText: {
    color: "#EF4444",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
  },

  successText: {
    color: "#00E676",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
  },

  button: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 20,
    elevation: 4,
    shadowColor: "#00E676",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  buttonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#0D332D",
    fontSize: 17,
    fontWeight: "bold",
  },

  buttonDisabled: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  buttonTextDisabled: {
    color: "#666",
    fontSize: 17,
    fontWeight: "bold",
  },

  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 16,
    lineHeight: 18,
  },

  termsLink: {
    color: "#00E676",
    fontWeight: "600",
  },

  footer: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center",
  },

  footerText: {
    color: "#bafdbc",
    fontSize: 14,
  },

  linkCriar: {
    color: "#00E676",
    fontWeight: "bold",
    fontSize: 14,
  },
});
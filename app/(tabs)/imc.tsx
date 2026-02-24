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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Scale, TrendingDown, TrendingUp, Activity, AlertCircle } from "lucide-react-native";

const { width } = Dimensions.get("window");
const perfilIcon = require("@/assets/images/perfilicon.png");
const logoApp = require("@/assets/images/logo.png");

export default function IMC() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const resultAnim = useRef(new Animated.Value(0)).current;

  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState<number | null>(null);
  const [classificacao, setClassificacao] = useState<any>(null);

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

  const classificacoes = [
    {
      min: 0,
      max: 18.5,
      nome: "Abaixo do Peso",
      cor: "#3B82F6",
      icon: TrendingDown,
      risco: "Baixo",
      recomendacao: "Consulte um nutricionista para ganhar peso de forma saudável.",
    },
    {
      min: 18.5,
      max: 24.9,
      nome: "Peso Normal",
      cor: "#00E676",
      icon: Activity,
      risco: "Ideal",
      recomendacao: "Parabéns! Continue mantendo hábitos saudáveis.",
    },
    {
      min: 25,
      max: 29.9,
      nome: "Sobrepeso",
      cor: "#FFB800",
      icon: AlertCircle,
      risco: "Moderado",
      recomendacao: "Considere ajustar sua dieta e aumentar atividades físicas.",
    },
    {
      min: 30,
      max: 34.9,
      nome: "Obesidade Grau I",
      cor: "#FB923C",
      icon: TrendingUp,
      risco: "Alto",
      recomendacao: "Procure orientação profissional para emagrecer com segurança.",
    },
    {
      min: 35,
      max: 39.9,
      nome: "Obesidade Grau II",
      cor: "#F97316",
      icon: TrendingUp,
      risco: "Muito Alto",
      recomendacao: "Consulte um médico e nutricionista urgentemente.",
    },
    {
      min: 40,
      max: 999,
      nome: "Obesidade Grau III",
      cor: "#EF4444",
      icon: TrendingUp,
      risco: "Extremo",
      recomendacao: "Necessário acompanhamento médico imediato.",
    },
  ];

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso.replace(",", "."));
    const alturaNum = parseFloat(altura.replace(",", "."));

    if (!pesoNum || !alturaNum) {
      Alert.alert("Erro", "Por favor, preencha peso e altura corretamente.");
      return;
    }

    if (pesoNum <= 0 || pesoNum > 500) {
      Alert.alert("Erro", "Peso inválido. Digite um valor entre 1 e 500 kg.");
      return;
    }

    if (alturaNum <= 0 || alturaNum > 3) {
      Alert.alert("Erro", "Altura inválida. Digite um valor entre 0.5 e 3 metros.");
      return;
    }

    const imcCalculado = pesoNum / (alturaNum * alturaNum);
    setImc(imcCalculado);

    const classif = classificacoes.find(
      (c) => imcCalculado >= c.min && imcCalculado < c.max
    );
    setClassificacao(classif);

    // Animar resultado
    Animated.spring(resultAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const limparCalculo = () => {
    setPeso("");
    setAltura("");
    setImc(null);
    setClassificacao(null);
    resultAnim.setValue(0);
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
          <Text style={styles.headerTitle}>Calculadora IMC</Text>
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
        {/* Hero Section */}
        <Animated.View
          style={[
            styles.heroSection,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={styles.heroIconBg}>
            <Scale color="#00E676" size={40} strokeWidth={2} />
          </View>
          <Text style={styles.heroTitle}>Calcule seu IMC</Text>
          <Text style={styles.heroSubtitle}>
            Descubra se seu peso está dentro do ideal para sua altura
          </Text>
        </Animated.View>

        {/* Formulário */}
        <Animated.View
          style={[styles.formCard, { opacity: fadeAnim }]}
        >
          {/* Peso */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Peso (kg)</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ex: 70"
                placeholderTextColor="#666"
                keyboardType="decimal-pad"
                value={peso}
                onChangeText={setPeso}
                maxLength={6}
              />
              <Text style={styles.inputUnit}>kg</Text>
            </View>
          </View>

          {/* Altura */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Altura (m)</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Ex: 1.75"
                placeholderTextColor="#666"
                keyboardType="decimal-pad"
                value={altura}
                onChangeText={setAltura}
                maxLength={4}
              />
              <Text style={styles.inputUnit}>m</Text>
            </View>
          </View>

          {/* Botões */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.calcButton}
              onPress={calcularIMC}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#00E676", "#00C853"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.calcButtonGradient}
              >
                <Scale color="#0D332D" size={20} strokeWidth={2.5} />
                <Text style={styles.calcButtonText}>Calcular IMC</Text>
              </LinearGradient>
            </TouchableOpacity>

            {imc !== null && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={limparCalculo}
                activeOpacity={0.7}
              >
                <Text style={styles.clearButtonText}>Limpar</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        {/* Resultado */}
        {imc !== null && classificacao && (
          <Animated.View
            style={[
              styles.resultCard,
              {
                opacity: resultAnim,
                transform: [
                  {
                    scale: resultAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={[classificacao.cor + "20", "transparent"]}
              style={styles.resultGradient}
            >
              <View style={styles.resultHeader}>
                <View
                  style={[
                    styles.resultIconBg,
                    { backgroundColor: classificacao.cor + "20" },
                  ]}
                >
                  {React.createElement(classificacao.icon, {
                    color: classificacao.cor,
                    size: 32,
                    strokeWidth: 2.5,
                  })}
                </View>
                <Text style={styles.resultTitle}>Seu Resultado</Text>
              </View>

              <View style={styles.imcValueContainer}>
                <Text style={styles.imcLabel}>Seu IMC</Text>
                <Text style={[styles.imcValue, { color: classificacao.cor }]}>
                  {imc.toFixed(1)}
                </Text>
              </View>

              <View
                style={[
                  styles.classificacaoCard,
                  { borderLeftColor: classificacao.cor },
                ]}
              >
                <Text style={styles.classificacaoNome}>
                  {classificacao.nome}
                </Text>
                <View style={styles.riscoContainer}>
                  <Text style={styles.riscoLabel}>Risco:</Text>
                  <Text
                    style={[styles.riscoValue, { color: classificacao.cor }]}
                  >
                    {classificacao.risco}
                  </Text>
                </View>
              </View>

              <View style={styles.recomendacaoCard}>
                <Text style={styles.recomendacaoTitle}>Recomendação</Text>
                <Text style={styles.recomendacaoText}>
                  {classificacao.recomendacao}
                </Text>
              </View>

              {/* Botão CTA */}
              <TouchableOpacity
                style={styles.ctaButton}
                onPress={() => router.push("/planos")}
                activeOpacity={0.8}
              >
                <Text style={styles.ctaButtonText}>
                  Ver Planos Personalizados
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        )}

        {/* Tabela de Referência */}
        <View style={styles.tabelaSection}>
          <Text style={styles.tabelaTitle}>Tabela de Referência</Text>

          {classificacoes.map((item, index) => (
            <View
              key={index}
              style={[
                styles.tabelaItem,
                imc &&
                  imc >= item.min &&
                  imc < item.max &&
                  styles.tabelaItemActive,
              ]}
            >
              <View
                style={[styles.tabelaDot, { backgroundColor: item.cor }]}
              />
              <View style={styles.tabelaInfo}>
                <Text style={styles.tabelaNome}>{item.nome}</Text>
                <Text style={styles.tabelaRange}>
                  IMC: {item.min.toFixed(1)} - {item.max === 999 ? "+" : item.max.toFixed(1)}
                </Text>
              </View>
              <View
                style={[styles.tabelaBadge, { backgroundColor: item.cor + "20" }]}
              >
                <Text style={[styles.tabelaRisco, { color: item.cor }]}>
                  {item.risco}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Sobre o IMC</Text>
          <Text style={styles.infoText}>
            O Índice de Massa Corporal (IMC) é uma medida internacional usada
            para calcular se uma pessoa está no peso ideal. Ele é calculado
            dividindo o peso pela altura ao quadrado.
          </Text>
          <Text style={styles.infoFormula}>
            IMC = Peso (kg) ÷ Altura² (m)
          </Text>
          <Text style={styles.infoWarning}>
            ⚠️ O IMC não considera massa muscular. Consulte um profissional para
            avaliação completa.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💚 Cuide da sua saúde com a NutriVida
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

  // Hero
  heroSection: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },

  heroIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "rgba(0, 230, 118, 0.3)",
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },

  heroSubtitle: {
    fontSize: 15,
    color: "#bafdbc",
    textAlign: "center",
    lineHeight: 22,
  },

  // Formulário
  formCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: "rgba(0, 230, 118, 0.2)",
  },

  inputGroup: {
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#bafdbc",
    marginBottom: 10,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },

  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 18,
    color: "#000",
    fontWeight: "600",
  },

  inputUnit: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
    marginLeft: 8,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },

  calcButton: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#00E676",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },

  calcButtonGradient: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  calcButtonText: {
    color: "#0D332D",
    fontSize: 16,
    fontWeight: "bold",
  },

  clearButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
  },

  clearButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  // Resultado
  resultCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(0, 230, 118, 0.3)",
  },

  resultGradient: {
    padding: 24,
  },

  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },

  resultIconBg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  resultTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  imcValueContainer: {
    alignItems: "center",
    marginBottom: 24,
  },

  imcLabel: {
    fontSize: 14,
    color: "#bafdbc",
    marginBottom: 8,
  },

  imcValue: {
    fontSize: 64,
    fontWeight: "bold",
    letterSpacing: -2,
  },

  classificacaoCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
  },

  classificacaoNome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },

  riscoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  riscoLabel: {
    fontSize: 14,
    color: "#bafdbc",
  },

  riscoValue: {
    fontSize: 16,
    fontWeight: "bold",
  },

  recomendacaoCard: {
    backgroundColor: "rgba(0, 230, 118, 0.08)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  recomendacaoTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#00E676",
    marginBottom: 8,
  },

  recomendacaoText: {
    fontSize: 14,
    color: "#bafdbc",
    lineHeight: 20,
  },

  ctaButton: {
    backgroundColor: "#00E676",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },

  ctaButtonText: {
    color: "#0D332D",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Tabela
  tabelaSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },

  tabelaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },

  tabelaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  tabelaItemActive: {
    backgroundColor: "rgba(0, 230, 118, 0.1)",
    borderColor: "#00E676",
  },

  tabelaDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },

  tabelaInfo: {
    flex: 1,
  },

  tabelaNome: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },

  tabelaRange: {
    fontSize: 12,
    color: "#bafdbc",
  },

  tabelaBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  tabelaRisco: {
    fontSize: 12,
    fontWeight: "bold",
  },

  // Info
  infoCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: "rgba(59, 130, 246, 0.08)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },

  infoText: {
    fontSize: 14,
    color: "#bafdbc",
    lineHeight: 22,
    marginBottom: 12,
  },

  infoFormula: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3B82F6",
    textAlign: "center",
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },

  infoWarning: {
    fontSize: 12,
    color: "#FFB800",
    lineHeight: 18,
  },

  footer: {
    alignItems: "center",
    paddingBottom: 10,
  },

  footerText: {
    color: "#00E676",
    fontSize: 13,
    fontWeight: "600",
  },
});
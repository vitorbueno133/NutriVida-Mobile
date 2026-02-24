import React, { useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function CardapioPersonalizado() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    altura: "",
    peso: "",
    sexo: "",
    temAlergia: null,
    alergias: "",
    objetivo: "",
    praticaEsporte: null,
    alimentosEvitar: "",
    nivelAtividade: "",
    tempoRefeicoes: "",
  });

  const handlePress = async () => {
  router.push("/cardapioGerado");
};

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const animateStep = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const nextStep = () => {
    if (step < 4) {
      animateStep();
      setTimeout(() => setStep(step + 1), 200);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      animateStep();
      setTimeout(() => setStep(step - 1), 200);
    }
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const renderStepContent = () => {
    const animatedStyle = {
      opacity: fadeAnim,
      transform: [{ translateX: slideAnim }],
    };

    switch(step) {
      case 1:
        return (
          <Animated.View style={[styles.stepContent, animatedStyle]}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepNumber}>Passo 1 de 4</Text>
              <Text style={styles.stepTitle}>Sobre Você</Text>
              <Text style={styles.stepDesc}>Vamos começar com o básico!</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Como você se chama?</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome"
                placeholderTextColor="rgba(186, 253, 188, 0.4)"
                value={formData.nome}
                onChangeText={(text) => setFormData({...formData, nome: text})}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Idade</Text>
                <TextInput
                  style={styles.input}
                  placeholder="25"
                  placeholderTextColor="rgba(186, 253, 188, 0.4)"
                  keyboardType="numeric"
                  value={formData.idade}
                  onChangeText={(text) => setFormData({...formData, idade: text})}
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Peso (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="70"
                  placeholderTextColor="rgba(186, 253, 188, 0.4)"
                  keyboardType="numeric"
                  value={formData.peso}
                  onChangeText={(text) => setFormData({...formData, peso: text})}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Altura (m)</Text>
              <TextInput
                style={styles.input}
                placeholder="1.75"
                placeholderTextColor="rgba(186, 253, 188, 0.4)"
                keyboardType="numeric"
                value={formData.altura}
                onChangeText={(text) => setFormData({...formData, altura: text})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sexo</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    formData.sexo === "Masculino" && styles.radioSelected
                  ]}
                  onPress={() => setFormData({...formData, sexo: "Masculino"})}
                >
                  <Text style={styles.radioEmoji}></Text>
                  <Text style={styles.radioLabel}>Masculino</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    formData.sexo === "Feminino" && styles.radioSelected
                  ]}
                  onPress={() => setFormData({...formData, sexo: "Feminino"})}
                >
                  <Text style={styles.radioEmoji}></Text>
                  <Text style={styles.radioLabel}>Feminino</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        );

      case 2:
        return (
          <Animated.View style={[styles.stepContent, animatedStyle]}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepNumber}>Passo 2 de 4</Text>
              <Text style={styles.stepTitle}>Seus Objetivos</Text>
              <Text style={styles.stepDesc}>O que você busca alcançar?</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Objetivo Principal</Text>
              <View style={styles.chipGroup}>
                {[
                  { label: "Ganhar peso", emoji: "💪" },
                  { label: "Perder peso", emoji: "🔥" },
                  { label: "Manter peso", emoji: "⚖️" },
                  { label: "Ganhar massa", emoji: "🏋️" }
                ].map((obj) => (
                  <TouchableOpacity
                    key={obj.label}
                    style={[
                      styles.chip,
                      formData.objetivo === obj.label && styles.chipSelected
                    ]}
                    onPress={() => setFormData({...formData, objetivo: obj.label})}
                  >
                    <Text style={styles.chipEmoji}>{obj.emoji}</Text>
                    <Text style={[
                      styles.chipText,
                      formData.objetivo === obj.label && styles.chipTextSelected
                    ]}>
                      {obj.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>🏃 Pratica exercícios?</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    formData.praticaEsporte === true && styles.radioSelected
                  ]}
                  onPress={() => setFormData({...formData, praticaEsporte: true})}
                >
                  <Text style={styles.radioEmoji}>✅</Text>
                  <Text style={styles.radioLabel}>Sim</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    formData.praticaEsporte === false && styles.radioSelected
                  ]}
                  onPress={() => setFormData({...formData, praticaEsporte: false})}
                >
                  <Text style={styles.radioEmoji}>❌</Text>
                  <Text style={styles.radioLabel}>Não</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>⚡ Nível de Atividade</Text>
              <View style={styles.chipGroup}>
                {[
                  { label: "Sedentário", emoji: "🛋️" },
                  { label: "Leve", emoji: "🚶" },
                  { label: "Moderado", emoji: "🏃" },
                  { label: "Intenso", emoji: "🔥" }
                ].map((nivel) => (
                  <TouchableOpacity
                    key={nivel.label}
                    style={[
                      styles.chip,
                      formData.nivelAtividade === nivel.label && styles.chipSelected
                    ]}
                    onPress={() => setFormData({...formData, nivelAtividade: nivel.label})}
                  >
                    <Text style={styles.chipEmoji}>{nivel.emoji}</Text>
                    <Text style={[
                      styles.chipText,
                      formData.nivelAtividade === nivel.label && styles.chipTextSelected
                    ]}>
                      {nivel.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Animated.View>
        );

      case 3:
        return (
          <Animated.View style={[styles.stepContent, animatedStyle]}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepNumber}>Passo 3 de 4</Text>
              <Text style={styles.stepTitle}>🍽️ Restrições</Text>
              <Text style={styles.stepDesc}>Algo que devemos saber?</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>🚫 Tem alergias alimentares?</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    formData.temAlergia === true && styles.radioSelected
                  ]}
                  onPress={() => setFormData({...formData, temAlergia: true})}
                >
                  <Text style={styles.radioEmoji}>⚠️</Text>
                  <Text style={styles.radioLabel}>Sim</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    formData.temAlergia === false && styles.radioSelected
                  ]}
                  onPress={() => setFormData({...formData, temAlergia: false, alergias: ""})}
                >
                  <Text style={styles.radioEmoji}>✅</Text>
                  <Text style={styles.radioLabel}>Não</Text>
                </TouchableOpacity>
              </View>
            </View>

            {formData.temAlergia && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>📝 Quais alergias?</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Ex: lactose, glúten, amendoim..."
                  placeholderTextColor="rgba(186, 253, 188, 0.4)"
                  multiline
                  numberOfLines={3}
                  value={formData.alergias}
                  onChangeText={(text) => setFormData({...formData, alergias: text})}
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>😋 Não vive sem? (até 3)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: chocolate, pizza, café"
                placeholderTextColor="rgba(186, 253, 188, 0.4)"
                value={formData.alimentosEvitar}
                onChangeText={(text) => setFormData({...formData, alimentosEvitar: text})}
              />
              <Text style={styles.hint}>Vamos tentar encaixar no seu plano!</Text>
            </View>
          </Animated.View>
        );

      case 4:
        return (
          <Animated.View style={[styles.stepContent, animatedStyle]}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepNumber}>Passo 4 de 4</Text>
              <Text style={styles.stepTitle}>Rotina</Text>
              <Text style={styles.stepDesc}>Última etapa!</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tempo para cozinhar?</Text>
              <View style={styles.chipGroup}>
                {[
                  { label: "Pouco", emoji: "⚡", subtitle: "15 min" },
                  { label: "Médio", emoji: "⏱️", subtitle: "30 min" },
                  { label: "Bastante", emoji: "👨‍🍳", subtitle: "1h+" }
                ].map((tempo) => (
                  <TouchableOpacity
                    key={tempo.label}
                    style={[
                      styles.chipLarge,
                      formData.tempoRefeicoes === tempo.label && styles.chipSelected
                    ]}
                    onPress={() => setFormData({...formData, tempoRefeicoes: tempo.label})}
                  >
                    <Text style={styles.chipEmoji}>{tempo.emoji}</Text>
                    <Text style={[
                      styles.chipText,
                      formData.tempoRefeicoes === tempo.label && styles.chipTextSelected
                    ]}>
                      {tempo.label}
                    </Text>
                    <Text style={styles.chipSubtitle}>{tempo.subtitle}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Resumo do seu perfil</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Nome:</Text>
                <Text style={styles.summaryValue}>{formData.nome || "---"}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Objetivo:</Text>
                <Text style={styles.summaryValue}>{formData.objetivo || "---"}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Atividade:</Text>
                <Text style={styles.summaryValue}>{formData.nivelAtividade || "---"}</Text>
              </View>
            </View>
          </Animated.View>
        );
    }
  };

  return (
    <LinearGradient
      colors={["#0a1f1a", "#0f172a"]}
      style={styles.gradient}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => step === 1 ? router.back() : prevStep()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cardápio Personalizado</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{Math.round(progress)}% completo</Text>

      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {renderStepContent()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {step < 4 ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={nextStep}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>Próximo →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.finishButton}
            activeOpacity={0.8}
             onPress={handlePress}
          >
            <Text style={styles.finishButtonText}>Gerar Cardápio</Text>
          </TouchableOpacity>
        )}
      </View>
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
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  backIcon: {
    fontSize: 24,
    color: "#00E676",
    fontWeight: "bold",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  placeholder: {
    width: 40,
  },

  progressContainer: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 2,
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#00E676",
    borderRadius: 2,
  },

  progressText: {
    textAlign: "center",
    color: "#00E676",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 10,
  },

  container: {
    flex: 1,
  },

  stepContent: {
    padding: 20,
    minHeight: 500,
  },

  stepHeader: {
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 230, 118, 0.2)",
  },

  stepNumber: {
    fontSize: 12,
    color: "#00E676",
    fontWeight: "600",
    marginBottom: 8,
  },

  stepTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },

  stepDesc: {
    fontSize: 14,
    color: "#bafdbc",
  },

  inputGroup: {
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.2)",
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    color: "#fff",
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  hint: {
    fontSize: 12,
    color: "rgba(186, 253, 188, 0.6)",
    marginTop: 6,
    fontStyle: "italic",
  },

  row: {
    flexDirection: "row",
    gap: 15,
  },

  halfWidth: {
    flex: 1,
  },

  radioGroup: {
    flexDirection: "row",
    gap: 12,
  },

  radioButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
    gap: 8,
  },

  radioSelected: {
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    borderColor: "#00E676",
  },

  radioEmoji: {
    fontSize: 20,
  },

  radioLabel: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },

  chipGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
    gap: 6,
  },

  chipLarge: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
    gap: 6,
  },

  chipSelected: {
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    borderColor: "#00E676",
  },

  chipEmoji: {
    fontSize: 18,
  },

  chipText: {
    fontSize: 14,
    color: "#bafdbc",
    fontWeight: "500",
  },

  chipTextSelected: {
    color: "#00E676",
    fontWeight: "600",
  },

  chipSubtitle: {
    fontSize: 11,
    color: "rgba(186, 253, 188, 0.5)",
  },

  summaryCard: {
    backgroundColor: "rgba(0, 230, 118, 0.1)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "rgba(0, 230, 118, 0.3)",
    marginTop: 10,
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00E676",
    marginBottom: 15,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  summaryLabel: {
    fontSize: 14,
    color: "#bafdbc",
  },

  summaryValue: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },

  navigationContainer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: "rgba(10, 31, 26, 0.95)",
  },

  nextButton: {
    backgroundColor: "#00E676",
    borderRadius: 25,
    paddingVertical: 13,
    alignItems: "center",
    marginBottom: 60,
  },

  nextButtonText: {
    color: "#0D332D",
    fontSize: 18,
    fontWeight: "bold",
  },

  finishButton: {
    backgroundColor: "#00E676",
    borderRadius: 25,
    paddingVertical: 13,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#00E676",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    marginBottom: 55,
  },

  finishButtonText: {
    color: "#0D332D",
    fontSize: 17,
    fontWeight: "bold",
  },
});
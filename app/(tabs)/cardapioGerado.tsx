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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Share2, 
  Printer,
  Clock,
  Flame,
  ChefHat
} from "lucide-react-native";

const { width } = Dimensions.get("window");
const perfilIcon = require("@/assets/images/perfilicon.png");
const logoApp = require("@/assets/images/logo.png");

export default function Cardapio() {
  const router = useRouter();
  const [currentDay, setCurrentDay] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const cardapio = [
    {
      dia: "Segunda-feira",
      cor: "#00E676",
      gradient: ["#064e3b", "#10b981"],
      refeicoes: [
        {
          tipo: "Pré-treino",
          horario: "04:30h",
          icon: Clock,
          itens: ["1 unidade de banana", "1 copo (200ml) de água"],
        },
        {
          tipo: "Café da manhã",
          horario: "06:15h",
          icon: ChefHat,
          itens: [
            "2 unidades de ovos mexidos",
            "2 fatias de pão integral",
            "1/2 unidade de abacate",
          ],
          tempero: "oregano e pimenta do reino",
        },
        {
          tipo: "Lanche da manhã",
          horario: "09:30h",
          icon: Clock,
          itens: [
            "1 pote (170g) de iogurte natural desnatado",
            "15g de castanhas de caju",
          ],
          tempero: "canela em pó",
        },
        {
          tipo: "Almoço",
          horario: "12:30h",
          icon: Flame,
          itens: [
            "150g de frango grelhado (carne)",
            "100g de arroz integral",
            "100g de brócolis cozidos",
            "50g de cenoura ralada",
            "50g de alface",
            "1 colher de sopa (10ml) de azeite extra virgem",
          ],
          tempero: "alho, cebola, limao e salsinha",
        },
        {
          tipo: "Lanche da tarde",
          horario: "16:30h",
          icon: Clock,
          itens: ["1 unidade de maça", "1 unidade de ovo cozido"],
        },
        {
          tipo: "Jantar",
          horario: "19:30h",
          icon: ChefHat,
          itens: [
            "120g de peixe branco assado",
            "180ml de sopa de abóbora com gengibre",
            "50g de espinafre refogado",
          ],
          tempero: "gengibre ralado, alho, cebola, coentro",
        },
        {
          tipo: "Ceia",
          horario: "21:30h",
          icon: Clock,
          itens: ["1 xícara de chá de camomila", "2 unidades de clara de ovo cozida"],
        },
      ],
    },
    {
      dia: "Terça-feira",
      cor: "#3B82F6",
      gradient: ["#1e3a8a", "#3b82f6"],
      refeicoes: [
        {
          tipo: "Pré-treino",
          horario: "04:30h",
          icon: Clock,
          itens: ["20g de aveia em flocos", "1 copo (200ml) de água"],
        },
        {
          tipo: "Café da manhã",
          horario: "06:15h",
          icon: ChefHat,
          itens: [
            "1 copo (250ml) de vitamina de leite desnatado com 100g de queijo cottage",
            "100g de morangos picados",
          ],
          tempero: "sem tempero",
        },
        {
          tipo: "Lanche da manhã",
          horario: "09:30h",
          icon: Clock,
          itens: ["1 unidade de pera", "10g de nozes"],
        },
        {
          tipo: "Almoço",
          horario: "12:30h",
          icon: Flame,
          itens: [
            "120g de carne magra moída refogada",
            "80g de batata doce cozida",
            "80g de couve flor cozida",
            "50g de vagem salteada",
            "50g de tomate picado",
            "1 colher de sopa (10ml) de azeite extra virgem",
          ],
          tempero: "alho, cebola, cheiro verde e cominho",
        },
        {
          tipo: "Lanche da tarde",
          horario: "16:30h",
          icon: Clock,
          itens: ["2 fatias de pão integral", "2 fatias de queijo branco (minas frescal)"],
          tempero: "oregano",
        },
        {
          tipo: "Jantar",
          horario: "19:30h",
          icon: ChefHat,
          itens: [
            "150g de filé de frango assado com ervas",
            "80g de purê de mandioquinha",
            "50g de beterraba cozida",
            "50g de rúcula",
          ],
          tempero: "alecrim, tomilho e pimenta do reino",
        },
        {
          tipo: "Ceia",
          horario: "21:30h",
          icon: Clock,
          itens: ["1 copo (200ml) de leite desnatado morno"],
          tempero: "canela em pó",
        },
      ],
    },
    {
      dia: "Quarta-feira",
      cor: "#FFB800",
      gradient: ["#78350f", "#f59e0b"],
      refeicoes: [
        {
          tipo: "Pré-treino",
          horario: "04:30h",
          icon: Clock,
          itens: ["2 unidades de biscoitos de arroz", "1 copo (200ml) de água"],
        },
        {
          tipo: "Café da manhã",
          horario: "06:15h",
          icon: ChefHat,
          itens: [
            "200g de mingau de aveia",
            "1 unidade de kiwi",
          ],
          tempero: "canela em pó",
        },
        {
          tipo: "Lanche da manhã",
          horario: "09:30h",
          icon: Clock,
          itens: ["1 copo (250ml) de suco verde (couve, maça, gengibre)"],
          tempero: "sem tempero",
        },
        {
          tipo: "Almoço",
          horario: "12:30h",
          icon: Flame,
          itens: [
            "100g de feijão cozido",
            "80g de arroz integral",
            "120g de bife grelhado (carne)",
            "50g de abobrinha refogada",
            "50g de berinjela grelhada",
            "50g de alface americana",
            "1 colher de sopa (10ml) de azeite extra virgem",
          ],
          tempero: "alho, cebola, louro e pimenta do reino",
        },
        {
          tipo: "Lanche da tarde",
          horario: "16:30h",
          icon: Clock,
          itens: [
            "1 unidade de iogurte natural desnatado",
            "10g de sementes de chia",
          ],
        },
        {
          tipo: "Jantar",
          horario: "19:30h",
          icon: ChefHat,
          itens: [
            "180g de salmão assado",
            "80g de aspargos grelhados",
            "50g de tomate cereja",
            "50g de agrião",
          ],
          tempero: "limao, dill e pimenta branca",
        },
        {
          tipo: "Ceia",
          horario: "21:30h",
          icon: Clock,
          itens: ["1 xícara de chá de erva-cidreira", "100g de queijo cottage"],
        },
      ],
    },
  ];

  const animatePageTransition = (direction: "next" | "prev") => {
    slideAnim.setValue(direction === "next" ? 50 : -50);
    fadeAnim.setValue(0);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const nextDay = () => {
    if (currentDay < cardapio.length - 1) {
      setCurrentDay(currentDay + 1);
      animatePageTransition("next");
    }
  };

  const prevDay = () => {
    if (currentDay > 0) {
      setCurrentDay(currentDay - 1);
      animatePageTransition("prev");
    }
  };

  const handleDownload = () => {
    Alert.alert(
      "Baixar Cardápio",
      "Seu cardápio personalizado será baixado em PDF.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Baixar", onPress: () => console.log("Download iniciado") },
      ]
    );
  };

  const handleShare = () => {
    Alert.alert("Compartilhar", "Compartilhe seu cardápio com amigos!");
  };

  const handlePrint = () => {
    Alert.alert("Imprimir", "Preparando cardápio para impressão...");
  };

  const diaAtual = cardapio[currentDay];

  return (
    <LinearGradient colors={["#0a1f1a", "#0f172a"]} style={styles.gradient}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image source={logoApp} style={styles.logo} resizeMode="contain" />
          <Text style={styles.headerTitle}>Meu Cardápio</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/perfil")}>
          <Image source={perfilIcon} style={styles.perfilImg} resizeMode="cover" />
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDownload} activeOpacity={0.7}>
          <Download color="#00E676" size={20} strokeWidth={2} />
          <Text style={styles.actionButtonText}>Baixar PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleShare} activeOpacity={0.7}>
          <Share2 color="#00E676" size={20} strokeWidth={2} />
          <Text style={styles.actionButtonText}>Compartilhar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handlePrint} activeOpacity={0.7}>
          <Printer color="#00E676" size={20} strokeWidth={2} />
          <Text style={styles.actionButtonText}>Imprimir</Text>
        </TouchableOpacity>
      </View>

      {/* Navegação de Dias */}
      <View style={styles.dayNavigator}>
        <TouchableOpacity
          style={[styles.navButton, currentDay === 0 && styles.navButtonDisabled]}
          onPress={prevDay}
          disabled={currentDay === 0}
          activeOpacity={0.7}
        >
          <ChevronLeft color={currentDay === 0 ? "#666" : "#00E676"} size={24} strokeWidth={2.5} />
        </TouchableOpacity>

        <View style={styles.dayIndicator}>
          <Text style={styles.dayText}>{diaAtual.dia}</Text>
          <Text style={styles.dayCount}>
            Dia {currentDay + 1} de {cardapio.length}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.navButton,
            currentDay === cardapio.length - 1 && styles.navButtonDisabled,
          ]}
          onPress={nextDay}
          disabled={currentDay === cardapio.length - 1}
          activeOpacity={0.7}
        >
          <ChevronRight
            color={currentDay === cardapio.length - 1 ? "#666" : "#00E676"}
            size={24}
            strokeWidth={2.5}
          />
        </TouchableOpacity>
      </View>

      {/* Cardápio em formato de livro */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={[
            styles.bookPage,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={[...diaAtual.gradient, "rgba(0,0,0,0)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.3 }}
            style={styles.pageHeader}
          >
            <Text style={styles.pageTitle}>{diaAtual.dia}</Text>
            <View style={styles.pageDivider} />
          </LinearGradient>

          {/* Refeições */}
          {diaAtual.refeicoes.map((refeicao, index) => {
            const IconComponent = refeicao.icon;
            return (
              <View key={index} style={styles.refeicaoCard}>
                <View style={styles.refeicaoHeader}>
                  <View style={[styles.iconBg, { backgroundColor: diaAtual.cor + "20" }]}>
                    <IconComponent color={diaAtual.cor} size={20} strokeWidth={2.5} />
                  </View>
                  <View style={styles.refeicaoInfo}>
                    <Text style={styles.refeicaoTipo}>{refeicao.tipo}</Text>
                    <Text style={styles.refeicaoHorario}>⏰ {refeicao.horario}</Text>
                  </View>
                </View>

                <View style={styles.itensList}>
                  {refeicao.itens.map((item, idx) => (
                    <View key={idx} style={styles.itemRow}>
                      <View style={[styles.bullet, { backgroundColor: diaAtual.cor }]} />
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  ))}
                </View>

                {refeicao.tempero && (
                  <View style={[styles.temperoCard, { borderLeftColor: diaAtual.cor }]}>
                    <Text style={styles.temperoLabel}>🌿 Tempero:</Text>
                    <Text style={styles.temperoText}>{refeicao.tempero}</Text>
                  </View>
                )}
              </View>
            );
          })}

          {/* Decoração de página */}
          <View style={styles.pageDecoration}>
            <View style={[styles.decorLine, { backgroundColor: diaAtual.cor + "30" }]} />
            <Text style={styles.pageNumber}>Página {currentDay + 1}</Text>
            <View style={[styles.decorLine, { backgroundColor: diaAtual.cor + "30" }]} />
          </View>
        </Animated.View>

        {/* Dicas do Dia */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Dicas do Dia</Text>
          <Text style={styles.tipsText}>
            • Beba pelo menos 2 litros de água ao longo do dia{"\n"}
            • Evite pular refeições para manter o metabolismo ativo{"\n"}
            • Prepare as refeições com antecedência quando possível{"\n"}
            • Faça as refeições sem pressa, mastigando bem os alimentos
          </Text>
        </View>

        {/* CTA Download */}
        <TouchableOpacity style={styles.downloadCTA} onPress={handleDownload} activeOpacity={0.9}>
          <LinearGradient
            colors={["#00E676", "#00C853"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.downloadGradient}
          >
            <Download color="#0D332D" size={24} strokeWidth={2.5} />
            <Text style={styles.downloadText}>Baixar Cardápio Completo (PDF)</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            📅 Cardápio gerado especialmente para você
          </Text>
          <Text style={styles.footerSubtext}>NutriVida - Sua saúde em primeiro lugar</Text>
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

  // Action Bar
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 230, 118, 0.2)",
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "rgba(0, 230, 118, 0.1)",
  },

  actionButtonText: {
    color: "#00E676",
    fontSize: 12,
    fontWeight: "600",
  },

  // Day Navigator
  dayNavigator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
  },

  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(0, 230, 118, 0.3)",
  },

  navButtonDisabled: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: "rgba(255,255,255,0.1)",
  },

  dayIndicator: {
    alignItems: "center",
  },

  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },

  dayCount: {
    fontSize: 12,
    color: "#bafdbc",
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  // Book Page
  bookPage: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(0, 230, 118, 0.2)",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  pageHeader: {
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },

  pageDivider: {
    height: 3,
    backgroundColor: "#00E676",
    borderRadius: 2,
    width: 60,
    alignSelf: "center",
  },

  // Refeições
  refeicaoCard: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  refeicaoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },

  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  refeicaoInfo: {
    flex: 1,
  },

  refeicaoTipo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
  },

  refeicaoHorario: {
    fontSize: 13,
    color: "#bafdbc",
  },

  itensList: {
    gap: 10,
    marginBottom: 12,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
  },

  itemText: {
    flex: 1,
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
  },

  temperoCard: {
    backgroundColor: "rgba(255, 184, 0, 0.1)",
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    marginTop: 8,
  },

  temperoLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFB800",
    marginBottom: 4,
  },

  temperoText: {
    fontSize: 13,
    color: "#bafdbc",
    fontStyle: "italic",
  },

  pageDecoration: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 20,
  },

  decorLine: {
    width: 40,
    height: 2,
    borderRadius: 1,
  },

  pageNumber: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },

  // Tips
  tipsCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "rgba(59, 130, 246, 0.08)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },

  tipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },

  tipsText: {
    fontSize: 13,
    color: "#bafdbc",
    lineHeight: 22,
  },

  // Download CTA
  downloadCTA: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#00E676",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },

  downloadGradient: {
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  downloadText: {
    color: "#0D332D",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Footer
  footer: {
    alignItems: "center",
    marginTop: 24,
    paddingBottom: 10,
  },

  footerText: {
    color: "#00E676",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },

  footerSubtext: {
    color: "#666",
    fontSize: 11,
  },
});
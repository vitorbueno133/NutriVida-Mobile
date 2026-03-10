import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Plus, History, ArrowRight, Sparkles, Utensils } from "lucide-react-native";

const perfilIcon = require("@/assets/images/perfilicon.png");
const logoApp = require("@/assets/images/logo.png");

export default function CardapioHome() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideCard1 = useRef(new Animated.Value(50)).current;
  const slideCard2 = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.07, duration: 1800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
      ])
    ).start();

    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.parallel([
        Animated.spring(slideCard1, { toValue: 0, friction: 7, tension: 55, useNativeDriver: true }),
        Animated.spring(slideCard2, { toValue: 0, friction: 7, tension: 55, delay: 130, useNativeDriver: true } as any),
      ]),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={["#0a1f1a", "#0f172a"]} style={styles.gradient}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image source={logoApp} style={styles.logo} resizeMode="contain" />
          <Text style={styles.headerTitle}>Cardápio</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/perfil")}>
          <Image source={perfilIcon} style={styles.perfilImg} resizeMode="cover" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>

        <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <LinearGradient colors={["#00E676", "#00C853"]} style={styles.heroIconGradient}>
              <Utensils color="#0D332D" size={36} strokeWidth={2.2} />
            </LinearGradient>
          </Animated.View>
          <Text style={styles.heroTitle}>Meu Cardápio</Text>
          <Text style={styles.heroSubtitle}>Nutrição personalizada para seus objetivos</Text>
        </Animated.View>

        <Animated.View style={[styles.dividerRow, { opacity: fadeAnim }]}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerLabel}>O que deseja fazer?</Text>
          <View style={styles.dividerLine} />
        </Animated.View>

        <Animated.View style={{ transform: [{ translateY: slideCard1 }], opacity: fadeAnim }}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/cardapio")}
            activeOpacity={0.85}
          >
            <LinearGradient colors={["#00E67614", "#00E67605"]} style={styles.cardGradient}>
              <View style={styles.cardLeft}>
                <View style={[styles.cardIconBg, { backgroundColor: "rgba(0,230,118,0.15)" }]}>
                  <Plus color="#00E676" size={26} strokeWidth={2.5} />
                </View>
                <View style={styles.cardTexts}>
                  <Text style={styles.cardTitle}>Criar Novo Cardápio</Text>
                  <Text style={styles.cardDesc}>Gere um plano alimentar personalizado</Text>
                </View>
              </View>
              <View style={[styles.cardArrow, { backgroundColor: "rgba(0,230,118,0.12)" }]}>
                <ArrowRight color="#00E676" size={20} strokeWidth={2.5} />
              </View>
            </LinearGradient>

            <View style={styles.badge}>
              <Sparkles color="#0D332D" size={10} strokeWidth={2.5} />
              <Text style={styles.badgeText}>Novo</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ translateY: slideCard2 }], opacity: fadeAnim }}>
          <TouchableOpacity
            style={[styles.card, styles.cardBlue]}
            onPress={() => router.push("/historico-cardapio")}
            activeOpacity={0.85}
          >
            <LinearGradient colors={["#3B82F614", "#3B82F605"]} style={styles.cardGradient}>
              <View style={styles.cardLeft}>
                <View style={[styles.cardIconBg, { backgroundColor: "rgba(59,130,246,0.15)" }]}>
                  <History color="#3B82F6" size={26} strokeWidth={2.5} />
                </View>
                <View style={styles.cardTexts}>
                  <Text style={styles.cardTitle}>Histórico de Cardápios</Text>
                  <Text style={styles.cardDesc}>Veja seus planos alimentares anteriores</Text>
                </View>
              </View>
              <View style={[styles.cardArrow, { backgroundColor: "rgba(59,130,246,0.12)" }]}>
                <ArrowRight color="#3B82F6" size={20} strokeWidth={2.5} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

      </View>

      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Text style={styles.footerText}>NutriVida · Sua saúde em primeiro lugar</Text>
      </Animated.View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "rgba(10, 31, 26, 0.95)",
  },
  backButton: { color: "#00E676", fontSize: 32, fontWeight: "300" },
  headerCenter: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: { width: 30, height: 30 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
  perfilImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#00E676",
  },

  // Body
  body: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    gap: 0,
  },

  // Hero
  heroSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  heroIconGradient: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#00E676",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#bafdbc",
    opacity: 0.75,
    textAlign: "center",
  },

  // Divider
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.08)" },
  dividerLabel: {
    color: "#4b5563",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  // Cards
  card: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "rgba(0,230,118,0.25)",
    overflow: "hidden",
    marginBottom: 14,
    position: "relative",
  },
  cardBlue: {
    borderColor: "rgba(59,130,246,0.25)",
  },
  cardGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 22,
    paddingHorizontal: 20,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  cardIconBg: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTexts: { flex: 1 },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  cardDesc: {
    color: "#9ca3af",
    fontSize: 13,
    lineHeight: 18,
  },
  cardArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  // Badge
  badge: {
    position: "absolute",
    top: 12,
    right: 62,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#00E676",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    color: "#0D332D",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  // Footer
  footer: {
    alignItems: "center",
    paddingBottom: 36,
  },
  footerText: { color: "#374151", fontSize: 12 },
});
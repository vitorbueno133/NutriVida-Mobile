import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { 
  Check, 
  Sparkles, 
  ChevronLeft, 
  Crown, 
  Zap,
  Shield,
  Award,
  Star,
  X,
  CreditCard,
  Calendar
} from "lucide-react-native";

const { width } = Dimensions.get("window");
const perfilIcon = require("@/assets/images/perfilicon.png");
const logoApp = require("@/assets/images/logo.png");

export default function Planos() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [selectedPlan, setSelectedPlan] = useState(2);
  const [periodo, setPeriodo] = useState("mensal"); // "mensal" ou "anual"
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);

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
    ]).start();
  }, []);

  const planos = [
    {
      id: 1,
      nome: "Básico",
      precoMensal: "70,00",
      precoAnual: "58,00",
      economiaAnual: "17%",
      cor: "#3B82F6",
      icone: Zap,
      destaque: false,
      descricao: "Perfeito para começar sua jornada",
      beneficios: [
        "Acesso a artigos e receitas básicas",
        "Fórum de discussão com a comunidade",
        "Boletim informativo mensal",
        "Descontos em produtos parceiros",
        "Calculadora de IMC e calorias",
      ],
      limitacoes: [
        "1 cardápio personalizado por mês",
        "Suporte por email (48h)",
      ]
    },
    {
      id: 2,
      nome: "Premium",
      precoMensal: "140,00",
      precoAnual: "98,00",
      economiaAnual: "30%",
      cor: "#00E676",
      icone: Crown,
      destaque: true,
      badge: "MAIS POPULAR",
      descricao: "Para quem busca resultados consistentes",
      beneficios: [
        "Tudo do plano Básico +",
        "Cardápios semanais personalizados ilimitados",
        "Biblioteca com +100 receitas exclusivas",
        "Vídeos tutoriais de culinária saudável",
        "Webinars mensais ao vivo",
        "Programa de exercícios complementar",
        "Acompanhamento de progresso detalhado",
      ],
      limitacoes: []
    },
    {
      id: 3,
      nome: "Elite",
      precoMensal: "210,00",
      precoAnual: "147,00",
      economiaAnual: "30%",
      cor: "#FFB800",
      icone: Award,
      destaque: false,
      badge: "VIP",
      descricao: "Transformação completa com acompanhamento total",
      beneficios: [
        "Tudo do plano Premium +",
        "Consulta mensal individual com nutricionista",
        "Plano de treino 100% personalizado",
        "Suporte VIP 24/7 por WhatsApp",
        "Análise corporal completa mensal",
        "Prioridade em novos recursos",
      ],
      limitacoes: []
    },
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };

  const openPlanDetails = (plano) => {
    setSelectedPlanDetails(plano);
    setModalVisible(true);
  };

  const getPreco = (plano) => {
    return periodo === "mensal" ? plano.precoMensal : plano.precoAnual;
  };

  return (
    <LinearGradient colors={["#0a1f1a", "#0f172a"]} style={styles.gradient}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft color="#00E676" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image source={logoApp} style={styles.logo} resizeMode="contain" />
          <Text style={styles.headerTitle}>Planos</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/perfil")}>
          <Image
            source={perfilIcon}
            style={styles.perfilImg}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={[
            styles.heroSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.heroIconBg}>
            <Sparkles color="#00E676" size={32} strokeWidth={2} />
          </View>
          <Text style={styles.heroTitle}>Escolha Seu Plano</Text>
          <Text style={styles.heroSubtitle}>
            Invista na sua saúde com o plano ideal para você
          </Text>
        </Animated.View>

        <View style={styles.periodoContainer}>
          <TouchableOpacity
            style={[
              styles.periodoButton,
              periodo === "mensal" && styles.periodoButtonActive
            ]}
            onPress={() => setPeriodo("mensal")}
            activeOpacity={0.7}
          >
            <Calendar 
              color={periodo === "mensal" ? "#0D332D" : "#00E676"} 
              size={18} 
              strokeWidth={2.5} 
            />
            <Text style={[
              styles.periodoText,
              periodo === "mensal" && styles.periodoTextActive
            ]}>
              Mensal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.periodoButton,
              periodo === "anual" && styles.periodoButtonActive
            ]}
            onPress={() => setPeriodo("anual")}
            activeOpacity={0.7}
          >
            <Calendar 
              color={periodo === "anual" ? "#0D332D" : "#00E676"} 
              size={18} 
              strokeWidth={2.5} 
            />
            <Text style={[
              styles.periodoText,
              periodo === "anual" && styles.periodoTextActive
            ]}>
              Anual
            </Text>
            <View style={styles.saveBadge}>
              <Text style={styles.saveText}>-30%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {planos.map((plano, index) => {
          const isSelected = selectedPlan === plano.id;
          const IconComponent = plano.icone;
          const preco = getPreco(plano);

          return (
            <Animated.View
              key={plano.id}
              style={[
                styles.planCardWrapper,
                { opacity: fadeAnim },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.planCard,
                  isSelected && styles.planCardSelected,
                  plano.destaque && styles.planCardPopular,
                  { borderColor: isSelected ? plano.cor : "rgba(255,255,255,0.1)" }
                ]}
                onPress={() => handleSelectPlan(plano.id)}
                activeOpacity={0.9}
              >

                {plano.badge && (
                  <View style={[styles.badge, { backgroundColor: plano.cor }]}>
                    <Star color="#0D332D" size={12} strokeWidth={3} fill="#0D332D" />
                    <Text style={styles.badgeText}>{plano.badge}</Text>
                  </View>
                )}

                <View style={styles.planHeader}>
                  <View style={[styles.planIconBg, { backgroundColor: `${plano.cor}20` }]}>
                    <IconComponent color={plano.cor} size={28} strokeWidth={2} />
                  </View>
                  
                  <View style={styles.planHeaderText}>
                    <Text style={styles.planName}>{plano.nome}</Text>
                    <Text style={styles.planDescricao}>{plano.descricao}</Text>
                  </View>
                </View>

                <View style={styles.priceSection}>
                  <View style={styles.priceContainer}>
                    <Text style={[styles.currency, { color: plano.cor }]}>R$</Text>
                    <Text style={[styles.price, { color: plano.cor }]}>{preco}</Text>
                    <Text style={styles.period}>/{periodo === "mensal" ? "mês" : "mês*"}</Text>
                  </View>
                  {periodo === "anual" && (
                    <View style={[styles.economyBadge, { backgroundColor: `${plano.cor}20` }]}>
                      <Text style={[styles.economyText, { color: plano.cor }]}>
                        Economize {plano.economiaAnual}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={[styles.divider, { backgroundColor: `${plano.cor}30` }]} />

                <View style={styles.benefitsPreview}>
                  {plano.beneficios.slice(0, 3).map((beneficio, idx) => (
                    <View key={idx} style={styles.benefitItem}>
                      <View style={[styles.checkIcon, { backgroundColor: `${plano.cor}20` }]}>
                        <Check color={plano.cor} size={14} strokeWidth={3} />
                      </View>
                      <Text style={styles.benefitText}>{beneficio}</Text>
                    </View>
                  ))}
                  
                  {plano.beneficios.length > 3 && (
                    <TouchableOpacity 
                      style={styles.verMaisButton}
                      onPress={() => openPlanDetails(plano)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.verMaisText, { color: plano.cor }]}>
                        +{plano.beneficios.length - 3} benefícios adicionais
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                <TouchableOpacity
                  style={[
                    styles.planButton,
                    { backgroundColor: isSelected ? plano.cor : "transparent" },
                    !isSelected && { borderWidth: 2, borderColor: `${plano.cor}60` }
                  ]}
                  onPress={() => handleSelectPlan(plano.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.planButtonText,
                    { color: isSelected ? "#0D332D" : plano.cor }
                  ]}>
                    {isSelected ? "✓ Selecionado" : `Escolher ${plano.nome}`}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        <View style={styles.beneficiosGeraisCard}>
          <Shield color="#00E676" size={32} strokeWidth={2} />
          <Text style={styles.beneficiosTitle}>Todos os planos incluem:</Text>
          <View style={styles.beneficiosLista}>
            <Text style={styles.beneficioGeral}>✓ Cancelamento gratuito a qualquer momento</Text>
            <Text style={styles.beneficioGeral}>✓ Garantia de 7 dias ou seu dinheiro de volta</Text>
            <Text style={styles.beneficioGeral}>✓ Pagamento 100% seguro e criptografado</Text>
            <Text style={styles.beneficioGeral}>✓ Atualizações e novos recursos gratuitos</Text>
          </View>
        </View>

       
        <View style={styles.testimonialCard}>
          <Text style={styles.quote}>"</Text>
          <Text style={styles.testimonialText}>
            O plano Premium mudou minha vida! Perdi 15kg em 4 meses e nunca me senti tão bem.
          </Text>
          <View style={styles.testimonialAuthor}>
            <View style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} color="#FFB800" size={14} fill="#FFB800" strokeWidth={0} />
              ))}
            </View>
            <Text style={styles.authorName}>Ana Paula - São Paulo, SP</Text>
          </View>
        </View>


        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Pronto para Transformar sua Vida?</Text>
          <Text style={styles.ctaText}>
            Junte-se a milhares de pessoas que já alcançaram seus objetivos!
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => {
              const plano = planos.find(p => p.id === selectedPlan);
              console.log("Continuar com:", plano?.nome, "- Período:", periodo);
            }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#00E676", "#00C853"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaButtonGradient}
            >
              <CreditCard color="#0D332D" size={20} strokeWidth={2.5} />
              <Text style={styles.ctaButtonText}>Continuar com Pagamento</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.ctaNote}>
            Sem compromisso • Cancele quando quiser
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Pagamento 100% Seguro |  +10.000 clientes satisfeitos
          </Text>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPlanDetails && (
              <>
                <View style={styles.modalHeader}>
                  <View style={[
                    styles.modalIconBg, 
                    { backgroundColor: `${selectedPlanDetails.cor}20` }
                  ]}>
                    {React.createElement(selectedPlanDetails.icone, {
                      color: selectedPlanDetails.cor,
                      size: 32,
                      strokeWidth: 2
                    })}
                  </View>
                  <View style={styles.modalHeaderText}>
                    <Text style={styles.modalTitle}>Plano {selectedPlanDetails.nome}</Text>
                    <Text style={styles.modalSubtitle}>{selectedPlanDetails.descricao}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                    activeOpacity={0.7}
                  >
                    <X color="#fff" size={24} strokeWidth={2} />
                  </TouchableOpacity>
                </View>

                <ScrollView 
                  style={styles.modalScroll}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={styles.modalSectionTitle}>Benefícios Completos:</Text>
                  <View style={styles.modalBenefitsList}>
                    {selectedPlanDetails.beneficios.map((beneficio, idx) => (
                      <View key={idx} style={styles.modalBenefitItem}>
                        <View style={[
                          styles.modalCheckIcon, 
                          { backgroundColor: `${selectedPlanDetails.cor}20` }
                        ]}>
                          <Check 
                            color={selectedPlanDetails.cor} 
                            size={16} 
                            strokeWidth={3} 
                          />
                        </View>
                        <Text style={styles.modalBenefitText}>{beneficio}</Text>
                      </View>
                    ))}
                  </View>

                  {selectedPlanDetails.limitacoes.length > 0 && (
                    <>
                      <Text style={styles.modalSectionTitle}>Limitações:</Text>
                      <View style={styles.modalLimitacoesList}>
                        {selectedPlanDetails.limitacoes.map((limitacao, idx) => (
                          <Text key={idx} style={styles.modalLimitacaoText}>
                            • {limitacao}
                          </Text>
                        ))}
                      </View>
                    </>
                  )}
                </ScrollView>

                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    { backgroundColor: selectedPlanDetails.cor }
                  ]}
                  onPress={() => {
                    setModalVisible(false);
                    handleSelectPlan(selectedPlanDetails.id);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalButtonText}>
                    Escolher {selectedPlanDetails.nome}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    borderRadius: 20,
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    justifyContent: "center",
    alignItems: "center",
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

  heroSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },

  heroIconBg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "rgba(0, 230, 118, 0.3)",
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },

  heroSubtitle: {
    fontSize: 15,
    color: "#bafdbc",
    textAlign: "center",
    lineHeight: 22,
  },

  periodoContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 25,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },

  periodoButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
    position: "relative",
  },

  periodoButtonActive: {
    backgroundColor: "#00E676",
  },

  periodoText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#00E676",
  },

  periodoTextActive: {
    color: "#0D332D",
  },

  saveBadge: {
    position: "absolute",
    top: -8,
    right: 8,
    backgroundColor: "#EF4444",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },

  saveText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#fff",
  },

  planCardWrapper: {
    marginHorizontal: 20,
    marginBottom: 20,
  },

  planCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    position: "relative",
  },

  planCardSelected: {
    backgroundColor: "rgba(0, 230, 118, 0.08)",
  },

  planCardPopular: {
    borderWidth: 3,
  },

  badge: {
    position: "absolute",
    top: -12,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  badgeText: {
    color: "#0D332D",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 16,
  },

  planIconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  planHeaderText: {
    flex: 1,
  },

  planName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },

  planDescricao: {
    fontSize: 13,
    color: "#bafdbc",
    lineHeight: 18,
  },

  priceSection: {
    marginBottom: 20,
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  currency: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 6,
    marginRight: 4,
  },

  price: {
    fontSize: 42,
    fontWeight: "bold",
    lineHeight: 42,
  },

  period: {
    fontSize: 14,
    color: "#bafdbc",
    marginTop: 8,
    marginLeft: 4,
  },

  economyBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  economyText: {
    fontSize: 12,
    fontWeight: "600",
  },

  divider: {
    height: 2,
    marginBottom: 16,
    borderRadius: 1,
  },

  benefitsPreview: {
    gap: 10,
    marginBottom: 20,
  },

  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },

  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },

  benefitText: {
    flex: 1,
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
  },

  verMaisButton: {
    marginTop: 6,
    paddingLeft: 32,
  },

  verMaisText: {
    fontSize: 13,
    fontWeight: "600",
  },

  planButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  planButtonText: {
    fontSize: 15,
    fontWeight: "bold",
  },

  beneficiosGeraisCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "rgba(0, 230, 118, 0.08)",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.2)",
  },

  beneficiosTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 12,
    marginBottom: 12,
  },

  beneficiosLista: {
    width: "100%",
    gap: 8,
  },

  beneficioGeral: {
    fontSize: 14,
    color: "#bafdbc",
    lineHeight: 20,
  },

  comparativoCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  comparativoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },

  comparativoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  comparativoCol: {
    flex: 1,
    alignItems: "center",
  },

  comparativoLabel: {
    fontSize: 13,
    color: "#bafdbc",
    marginBottom: 4,
  },

  comparativoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  comparativoArrow: {
    paddingHorizontal: 20,
  },

  arrowText: {
    fontSize: 24,
    color: "#00E676",
    fontWeight: "bold",
  },

  testimonialCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "rgba(255, 184, 0, 0.1)",
    borderRadius: 20,
    padding: 25,
    borderWidth: 2,
    borderColor: "rgba(255, 184, 0, 0.3)",
    position: "relative",
  },

  quote: {
    fontSize: 60,
    color: "rgba(255, 184, 0, 0.3)",
    position: "absolute",
    top: 5,
    left: 15,
    lineHeight: 60,
  },

  testimonialText: {
    fontSize: 15,
    color: "#fff",
    fontStyle: "italic",
    marginTop: 25,
    marginBottom: 16,
    lineHeight: 22,
  },

  testimonialAuthor: {
    gap: 8,
  },

  stars: {
    flexDirection: "row",
    gap: 4,
  },

  authorName: {
    fontSize: 13,
    color: "#FFB800",
    fontWeight: "600",
  },

  faqCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "rgba(59, 130, 246, 0.08)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },

  faqTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },

  faqItem: {
    marginBottom: 16,
  },

  faqQuestion: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },

  faqAnswer: {
    fontSize: 13,
    color: "#bafdbc",
    lineHeight: 20,
  },

  faqButton: {
    marginTop: 8,
  },

  faqButtonText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
  },

  ctaCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },

  ctaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },

  ctaText: {
    fontSize: 14,
    color: "#bafdbc",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },

  ctaButton: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#00E676",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },

  ctaButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 18,
  },

  ctaButtonText: {
    color: "#0D332D",
    fontSize: 16,
    fontWeight: "bold",
  },

  ctaNote: {
    fontSize: 12,
    color: "#666",
    marginTop: 12,
    textAlign: "center",
  },

 
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#0f172a",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 25,
    maxHeight: "85%",
    borderTopWidth: 3,
    borderColor: "#00E676",
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },

  modalIconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  modalHeaderText: {
    flex: 1,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },

  modalSubtitle: {
    fontSize: 13,
    color: "#bafdbc",
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalScroll: {
    maxHeight: 400,
  },

  modalSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },

  modalBenefitsList: {
    gap: 12,
    marginBottom: 20,
  },

  modalBenefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  modalCheckIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },

  modalBenefitText: {
    flex: 1,
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
  },

  modalLimitacoesList: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    gap: 8,
    marginBottom: 20,
  },

  modalLimitacaoText: {
    fontSize: 13,
    color: "#bafdbc",
    lineHeight: 20,
  },

  modalButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D332D",
  },

   footer: {
    alignItems: "center",
    paddingBottom: 10,
  },

  footerText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
  },

});
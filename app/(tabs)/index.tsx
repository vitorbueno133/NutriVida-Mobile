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
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { 
  Scale, 
  Sparkles, 
  Lightbulb, 
  HelpCircle, 
  Droplets, 
  Moon, 
  Apple, 
  X,
  TrendingDown,
  Flame,
  Activity,
  Edit3,
  Save
} from "lucide-react-native";

const { width } = Dimensions.get("window");
const perfilIcon = require("@/assets/images/perfilicon.png");
const logoApp = require("@/assets/images/logo.png");

export default function Home() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingMetric, setEditingMetric] = useState(null);
  const [recipeModalVisible, setRecipeModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [progressoSemanal, setProgressoSemanal] = useState({
    peso: { atual: 74, inicial: 75, meta: 70 },
    agua: { atual: 14, meta: 14 },
    treinos: { atual: 4, meta: 5 },
  });

  const [tempValues, setTempValues] = useState({
    atual: "",
    meta: "",
    inicial: "",
  });

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

  const destaques = [
    {
      id: 1,
      titulo: "Mini Kibe de Quinoa",
      tempo: "30 min",
      calorias: "82 kcal",
      imagem: require("@/assets/images/kibe.jpg"),
      porcoes: "12 unidades",
      ingredientes: [
        "1 xícara de quinoa cozida",
        "1/2 xícara de aveia em flocos",
        "1 cebola pequena picada",
        "2 dentes de alho",
        "1 colher de sopa de azeite",
        "Sal e pimenta a gosto",
        "Hortelã fresca",
        "Cominho em pó"
      ],
      preparo: [
        "Cozinhe a quinoa conforme instruções da embalagem e deixe esfriar",
        "Em uma frigideira, refogue a cebola e o alho no azeite até dourar",
        "Em um processador, coloque a quinoa cozida, aveia, refogado de cebola, sal, pimenta e cominho",
        "Processe até obter uma massa homogênea",
        "Modele em formato de kibe e leve ao forno pré-aquecido a 180°C por 20 minutos",
        "Vire na metade do tempo para dourar dos dois lados"
      ],
      dicas: "Sirva com iogurte natural temperado com hortelã. Pode congelar por até 30 dias."
    },
    {
      id: 2,
      titulo: "Salada Proteica",
      tempo: "20 min",
      calorias: "150 kcal",
      imagem: require("@/assets/images/salada.jpg"),
      porcoes: "2 porções",
      ingredientes: [
        "2 xícaras de folhas verdes variadas",
        "1 peito de frango grelhado desfiado",
        "2 ovos cozidos",
        "1/2 xícara de grão de bico",
        "Tomate cereja",
        "Pepino fatiado",
        "2 colheres de sopa de azeite",
        "Suco de 1 limão",
        "Sal e pimenta"
      ],
      preparo: [
        "Lave bem todas as folhas e reserve",
        "Cozinhe os ovos por 10 minutos, esfrie e descasque",
        "Grelhe o frango temperado com sal e pimenta, depois desfie",
        "Em uma tigela grande, misture as folhas, grão de bico e legumes",
        "Adicione o frango desfiado por cima",
        "Corte os ovos ao meio e disponha sobre a salada",
        "Tempere com azeite, limão, sal e pimenta"
      ],
      dicas: "Adicione sementes de girassol ou gergelim para mais textura e nutrientes."
    },
    {
      id: 3,
      titulo: "Smoothie Detox",
      tempo: "10 min",
      calorias: "95 kcal",
      imagem: require("@/assets/images/smoothie.jpg"),
      porcoes: "1 porção",
      ingredientes: [
        "1 folha de couve",
        "1/2 pepino",
        "1/2 maçã verde",
        "Suco de 1/2 limão",
        "1 pedaço pequeno de gengibre",
        "200ml de água de coco",
        "Gelo a gosto",
        "1 colher de chá de chia (opcional)"
      ],
      preparo: [
        "Lave bem todos os ingredientes",
        "Descasque o gengibre e o pepino",
        "Corte a maçã em pedaços, removendo as sementes",
        "Coloque todos os ingredientes no liquidificador",
        "Bata até ficar homogêneo e cremoso",
        "Adicione gelo se desejar mais refrescância",
        "Sirva imediatamente"
      ],
      dicas: "Beba logo após o preparo para aproveitar todos os nutrientes. Ideal para consumir em jejum."
    },
  ];

  const lembretes = [
    {
      id: 1,
      icon: Droplets,
      texto: "Beba água",
      cor: "#3B82F6",
      titulo: "Hidratação é Vida",
      descricao: "Seu corpo é 60% água! Beber água regularmente:",
      beneficios: [
        "Melhora o metabolismo",
        "Aumenta energia e concentração",
        "Elimina toxinas do organismo",
        "Mantém a pele saudável"
      ],
      dica: "Meta: 2 litros por dia"
    },
    {
      id: 2,
      icon: Moon,
      texto: "Durma 8h",
      cor: "#8B5CF6",
      titulo: "Sono de Qualidade",
      descricao: "Durante o sono seu corpo se recupera:",
      beneficios: [
        "Regula hormônios da fome",
        "Fortalece o sistema imunológico",
        "Melhora memória e aprendizado",
        "Reduz estresse e ansiedade"
      ],
      dica: " Meta: 7-9 horas por noite"
    },
    {
      id: 3,
      icon: Apple,
      texto: "Coma frutas",
      cor: "#EF4444",
      titulo: "Poder das Frutas",
      descricao: "Frutas são ricas em vitaminas e fibras:",
      beneficios: [
        "Fortalecem a imunidade",
        "Melhoram o funcionamento intestinal",
        "Fornecem energia natural",
        "Previnem doenças"
      ],
      dica: "Meta: 3-5 porções por dia"
    },
  ];

  const calcularPercentual = (atual, meta) => {
    if (meta === 0) return 0;
    return Math.min(Math.round((atual / meta) * 100), 100);
  };

  const openEditModal = (metricType) => {
    const metric = progressoSemanal[metricType];
    setEditingMetric(metricType);
    setTempValues({
      atual: metric.atual.toString(),
      meta: metric.meta.toString(),
      inicial: metric.inicial ? metric.inicial.toString() : "",
    });
    setEditModalVisible(true);
  };

  const saveProgress = () => {
    if (!editingMetric) return;

    const newData = { ...progressoSemanal };
    newData[editingMetric] = {
      atual: parseFloat(tempValues.atual) || 0,
      meta: parseFloat(tempValues.meta) || 0,
      ...(tempValues.inicial && { inicial: parseFloat(tempValues.inicial) || 0 })
    };

    setProgressoSemanal(newData);
    setEditModalVisible(false);
    setEditingMetric(null);
  };

  const getMetricConfig = (type) => {
    const configs = {
      peso: {
        title: "Peso",
        icon: TrendingDown,
        color: "#00E676",
        unit: "kg",
        hasInitial: true,
      },
      agua: {
        title: "Hidratação",
        icon: Droplets,
        color: "#3B82F6",
        unit: "L",
        hasInitial: false,
      },
      treinos: {
        title: "Atividades",
        icon: Activity,
        color: "#EF4444",
        unit: "dias",
        hasInitial: false,
      },
    };
    return configs[type];
  };

  const peso = progressoSemanal.peso;
  const agua = progressoSemanal.agua;
  const treinos = progressoSemanal.treinos;

  return (
    <LinearGradient
      colors={["#0a1f1a", "#0f172a"]}
      style={styles.gradient}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={logoApp} style={styles.logo} resizeMode="contain" />
          <Text style={styles.greeting}>Olá, Vitor</Text>
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
        {/* Hero Section Compacto */}
        <Animated.View 
          style={[
            styles.heroCard,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
          ]}
        >
          <View style={styles.heroGlow} />
          <Text style={styles.heroTitle}>Transforme Sua Vida</Text>
          <Text style={styles.heroSubtitle}>Crie seu primeiro cardápio personalizado grátis</Text>
          
          <TouchableOpacity
            style={styles.heroCTA}
            onPress={() => router.push("/planos")}
            activeOpacity={0.8}
          >
            <Text style={styles.heroCTAText}>Começar Agora</Text>
            <Text style={styles.heroCTAArrow}>→</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Lembretes Diários */}
        <View style={styles.remindersContainer}>
          {lembretes.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity 
                key={item.id} 
                style={styles.reminderCard}
                onPress={() => {
                  setSelectedReminder(item);
                  setModalVisible(true);
                }}
                activeOpacity={0.7}
              >
                <View style={[styles.reminderIconBg, { backgroundColor: `${item.cor}20` }]}>
                  <IconComponent color={item.cor} size={22} strokeWidth={2.5} />
                </View>
                <Text style={styles.reminderText}>{item.texto}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Receitas - Versão Compacta */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Receitas Gratuitas</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todas →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recipeScroll}
          >
            {destaques.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.recipeCard}
                activeOpacity={0.9}
                onPress={() => {
                  setSelectedRecipe(item);
                  setRecipeModalVisible(true);
                }}
              >
                <Image 
                  source={item.imagem} 
                  style={styles.recipeImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.9)"]}
                  style={styles.recipeGradient}
                >
                  <Text style={styles.recipeTitle} numberOfLines={2}>
                    {item.titulo}
                  </Text>
                  <View style={styles.recipeInfo}>
                    <Text style={styles.recipeDetail}>⏱ {item.tempo}</Text>
                    <Text style={styles.recipeDetail}>🔥 {item.calorias}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* PROGRESSO SEMANAL */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Progresso Semanal</Text>
          </View>
          
          <View style={styles.progressCard}>
            {/* Peso */}
            <TouchableOpacity 
              style={styles.progressItem}
              onPress={() => openEditModal('peso')}
              activeOpacity={0.7}
            >
              <View style={styles.progressHeader}>
                <View style={styles.progressIconContainer}>
                  <TrendingDown color="#00E676" size={20} strokeWidth={2.5} />
                </View>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressLabel}>Peso</Text>
                  <Text style={styles.progressValue}>
                    {peso.atual}kg → {peso.meta}kg
                  </Text>
                </View>
                <View style={styles.editButtonSmall}>
                  <Edit3 color="#00E676" size={16} strokeWidth={2} />
                </View>
              </View>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { 
                      width: `${calcularPercentual(peso.inicial - peso.atual, peso.inicial - peso.meta)}%`,
                      backgroundColor: "#00E676" 
                    }
                  ]} 
                />
              </View>
              <Text style={styles.progressPercentText}>
                {calcularPercentual(peso.inicial - peso.atual, peso.inicial - peso.meta)}% da meta • 
                {peso.inicial && ` -${(peso.inicial - peso.atual).toFixed(1)}kg`}
              </Text>
            </TouchableOpacity>

            <View style={styles.progressDivider} />

            {/* Água */}
            <TouchableOpacity 
              style={styles.progressItem}
              onPress={() => openEditModal('agua')}
              activeOpacity={0.7}
            >
              <View style={styles.progressHeader}>
                <View style={[styles.progressIconContainer, { backgroundColor: "rgba(59, 130, 246, 0.15)" }]}>
                  <Droplets color="#3B82F6" size={20} strokeWidth={2.5} />
                </View>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressLabel}>Hidratação</Text>
                  <Text style={styles.progressValue}>
                    {agua.atual}L / {agua.meta}L
                  </Text>
                </View>
                <View style={styles.editButtonSmall}>
                  <Edit3 color="#3B82F6" size={16} strokeWidth={2} />
                </View>
              </View>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { 
                      width: `${calcularPercentual(agua.atual, agua.meta)}%`,
                      backgroundColor: "#3B82F6" 
                    }
                  ]} 
                />
              </View>
              <Text style={styles.progressPercentText}>
                {calcularPercentual(agua.atual, agua.meta)}% da meta semanal
              </Text>
            </TouchableOpacity>

            <View style={styles.progressDivider} />

            {/* Treinos */}
            <TouchableOpacity 
              style={styles.progressItem}
              onPress={() => openEditModal('treinos')}
              activeOpacity={0.7}
            >
              <View style={styles.progressHeader}>
                <View style={[styles.progressIconContainer, { backgroundColor: "rgba(239, 68, 68, 0.15)" }]}>
                  <Activity color="#EF4444" size={20} strokeWidth={2.5} />
                </View>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressLabel}>Atividades</Text>
                  <Text style={styles.progressValue}>
                    {treinos.atual}/{treinos.meta} dias
                  </Text>
                </View>
                <View style={styles.editButtonSmall}>
                  <Edit3 color="#EF4444" size={16} strokeWidth={2} />
                </View>
              </View>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { 
                      width: `${calcularPercentual(treinos.atual, treinos.meta)}%`,
                      backgroundColor: "#EF4444" 
                    }
                  ]} 
                />
              </View>
              <Text style={styles.progressPercentText}>
                {calcularPercentual(treinos.atual, treinos.meta)}% da meta semanal
              </Text>
            </TouchableOpacity>
          </View>

          {/* Mini Cards de Resumo */}
          <View style={styles.statsContainer}>

            <View style={styles.statCard}>
              <View style={styles.statIconBg}>
                <TrendingDown color="#00E676" size={24} strokeWidth={2} />
              </View>
              <Text style={styles.statValue}>-{peso.inicial ? (peso.inicial - peso.atual).toFixed(1) : 0}kg</Text>
              <Text style={styles.statLabel}>esta semana</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIconBg}>
                <Activity color="#3B82F6" size={24} strokeWidth={2} />
              </View>
              <Text style={styles.statValue}>{treinos.atual}</Text>
              <Text style={styles.statLabel}>dias ativos</Text>
            </View>
          </View>
        </View>

        {/* Atalhos Rápidos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle2}>Acesso Rápido</Text>
          
          <View style={styles.shortcutsContainer}>
            <TouchableOpacity 
              style={styles.shortcutButton}
              onPress={() => router.push("/imc")}
              activeOpacity={0.7}
            >
              <View style={styles.shortcutIcon}>
                <Scale color="#00E676" size={32} strokeWidth={2} />
              </View>
              <Text style={styles.shortcutLabel}>IMC</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.shortcutButton}
              onPress={() => router.push("/planos")}
              activeOpacity={0.7}
            >
              <View style={styles.shortcutIcon}>
                <Sparkles color="#00E676" size={32} strokeWidth={2} />
              </View>
              <Text style={styles.shortcutLabel}>Planos</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.shortcutButton}
              onPress={() => router.push("/dicas")}
              activeOpacity={0.7}
            >
              <View style={styles.shortcutIcon}>
                <Lightbulb color="#00E676" size={32} strokeWidth={2} />
              </View>
              <Text style={styles.shortcutLabel}>Dicas</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.shortcutButton}
              onPress={() => router.push("/duvidas")}
              activeOpacity={0.7}
            >
              <View style={styles.shortcutIcon}>
                <HelpCircle color="#00E676" size={32} strokeWidth={2} />
              </View>
              <Text style={styles.shortcutLabel}>Dúvidas</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Depoimento Destaque */}
        <View style={styles.testimonialCard}>
          <Text style={styles.quote}>"</Text>
          <Text style={styles.testimonialText}>
            Perdi 12kg e nunca me senti tão bem!
          </Text>
          <Text style={styles.testimonialAuthor}>
            Maria S. - Taquaritinga, SP
          </Text>
        </View>

        {/* CTA Final Minimalista */}
        <TouchableOpacity
          style={styles.finalCTA}
          onPress={() => router.push("/planos")}
          activeOpacity={0.9}
        >
          <Text style={styles.finalCTAText}>Escolher Meu Plano</Text>
        </TouchableOpacity>

        {/* Espaço Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 NutriVida</Text>
        </View>
      </ScrollView>

      {/* Modal de Lembretes */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <Animated.View 
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            {selectedReminder && (
              <>
                <View style={styles.modalHeader}>
                  <View style={[styles.modalIconBg, { backgroundColor: `${selectedReminder.cor}20` }]}>
                    {React.createElement(selectedReminder.icon, {
                      color: selectedReminder.cor,
                      size: 32,
                      strokeWidth: 2.5
                    })}
                  </View>
                  
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                    activeOpacity={0.7}
                  >
                    <X color="#fff" size={24} strokeWidth={2} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalTitle}>{selectedReminder.titulo}</Text>
                <Text style={styles.modalDescription}>{selectedReminder.descricao}</Text>

                <View style={styles.benefitsList}>
                  {selectedReminder.beneficios.map((beneficio, index) => (
                    <View key={index} style={styles.benefitItem}>
                      <View style={[styles.benefitDot, { backgroundColor: selectedReminder.cor }]} />
                      <Text style={styles.benefitText}>{beneficio}</Text>
                    </View>
                  ))}
                </View>

                <View style={[styles.tipCard, { borderLeftColor: selectedReminder.cor }]}>
                  <Text style={styles.tipText}>{selectedReminder.dica}</Text>
                </View>
              </>
            )}
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      {/* Modal de Edição de Progresso */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModalContent}>
            {editingMetric && (() => {
              const config = getMetricConfig(editingMetric);
              const IconComponent = config.icon;
              return (
                <>
                  <View style={styles.editModalHeader}>
                    <View style={[styles.editIconBg, { backgroundColor: `${config.color}20` }]}>
                      <IconComponent color={config.color} size={28} strokeWidth={2.5} />
                    </View>
                    <Text style={styles.editModalTitle}>Editar {config.title}</Text>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setEditModalVisible(false)}
                      activeOpacity={0.7}
                    >
                      <X color="#fff" size={24} strokeWidth={2} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputsContainer}>
                    {config.hasInitial && (
                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Peso Inicial ({config.unit})</Text>
                        <TextInput
                          style={styles.input}
                          value={tempValues.inicial}
                          onChangeText={(text) => setTempValues({...tempValues, inicial: text})}
                          keyboardType="decimal-pad"
                          placeholder="75"
                          placeholderTextColor="#666"
                        />
                      </View>
                    )}

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Valor Atual ({config.unit})</Text>
                      <TextInput
                        style={styles.input}
                        value={tempValues.atual}
                        onChangeText={(text) => setTempValues({...tempValues, atual: text})}
                        keyboardType="decimal-pad"
                        placeholder="0"
                        placeholderTextColor="#666"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Meta ({config.unit})</Text>
                      <TextInput
                        style={styles.input}
                        value={tempValues.meta}
                        onChangeText={(text) => setTempValues({...tempValues, meta: text})}
                        keyboardType="decimal-pad"
                        placeholder="0"
                        placeholderTextColor="#666"
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={[styles.saveButton, { backgroundColor: config.color }]}
                    onPress={saveProgress}
                    activeOpacity={0.8}
                  >
                    <Save color="#0D332D" size={20} strokeWidth={2.5} />
                    <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                  </TouchableOpacity>
                </>
              );
            })()}
          </View>
        </View>
      </Modal>

      {/* Modal de Receita Detalhada */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={recipeModalVisible}
        onRequestClose={() => setRecipeModalVisible(false)}
      >
        <View style={styles.recipeModalOverlay}>
          <View style={styles.recipeModalContent}>
            {selectedRecipe && (
              <>
                {/* Header com Imagem */}
                <View style={styles.recipeModalHeader}>
                  <Image 
                    source={selectedRecipe.imagem} 
                    style={styles.recipeModalImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={["transparent", "rgba(10, 31, 26, 0.9)", "#0a1f1a"]}
                    style={styles.recipeModalGradient}
                  >
                    <TouchableOpacity
                      style={styles.recipeCloseButton}
                      onPress={() => setRecipeModalVisible(false)}
                      activeOpacity={0.7}
                    >
                      <X color="#fff" size={24} strokeWidth={2} />
                    </TouchableOpacity>
                    
                    <View style={styles.recipeModalTitleContainer}>
                      <Text style={styles.recipeModalTitle}>{selectedRecipe.titulo}</Text>
                      <View style={styles.recipeModalStats}>
                        <View style={styles.recipeStatItem}>
                          <Text style={styles.recipeStatLabel}>⏱ Tempo</Text>
                          <Text style={styles.recipeStatValue}>{selectedRecipe.tempo}</Text>
                        </View>
                        <View style={styles.recipeStatDivider} />
                        <View style={styles.recipeStatItem}>
                          <Text style={styles.recipeStatLabel}>🔥 Calorias</Text>
                          <Text style={styles.recipeStatValue}>{selectedRecipe.calorias}</Text>
                        </View>
                        <View style={styles.recipeStatDivider} />
                        <View style={styles.recipeStatItem}>
                          <Text style={styles.recipeStatLabel}>🍽 Porções</Text>
                          <Text style={styles.recipeStatValue}>{selectedRecipe.porcoes}</Text>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </View>

                {/* Conteúdo Scrollável */}
                <ScrollView 
                  style={styles.recipeModalScroll}
                  showsVerticalScrollIndicator={false}
                >
                  {/* Ingredientes */}
                  <View style={styles.recipeSection}>
                    <Text style={styles.recipeSectionTitle}>Ingredientes</Text>
                    <View style={styles.ingredientsList}>
                      {selectedRecipe.ingredientes.map((ingrediente, index) => (
                        <View key={index} style={styles.ingredientItem}>
                          <View style={styles.ingredientDot} />
                          <Text style={styles.ingredientText}>{ingrediente}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Modo de Preparo */}
                  <View style={styles.recipeSection}>
                    <Text style={styles.recipeSectionTitle}>Modo de Preparo</Text>
                    <View style={styles.preparoList}>
                      {selectedRecipe.preparo.map((passo, index) => (
                        <View key={index} style={styles.preparoItem}>
                          <View style={styles.preparoNumber}>
                            <Text style={styles.preparoNumberText}>{index + 1}</Text>
                          </View>
                          <Text style={styles.preparoText}>{passo}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Dicas */}
                  <View style={styles.recipeTipCard}>
                    <Text style={styles.recipeTipTitle}>Dica do Chef</Text>
                    <Text style={styles.recipeTipText}>{selectedRecipe.dicas}</Text>
                  </View>

                  {/* Botão de Ação */}
                  <TouchableOpacity
                    style={styles.recipeActionButton}
                    onPress={() => {
                      setRecipeModalVisible(false);
                      router.push("/planos");
                    }}
                    activeOpacity={0.8}
                  >
                    <Sparkles color="#0D332D" size={20} strokeWidth={2.5} />
                    <Text style={styles.recipeActionText}>Criar Cardápio Personalizado</Text>
                  </TouchableOpacity>

                  <View style={{ height: 30 }} />
                </ScrollView>
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

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  logo: {
    width: 35,
    height: 35,
  },

  greeting: {
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

  heroCard: {
    margin: 20,
    marginTop: 25,
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    borderRadius: 24,
    paddingHorizontal: 23,
    paddingVertical: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.3)",
    position: "relative",
    overflow: "hidden",
  },

  heroGlow: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(0, 230, 118, 0.2)",
    blur: 40,
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },

  heroSubtitle: {
    fontSize: 15,
    color: "#bafdbc",
    textAlign: "center",
    marginBottom: 25,
  },

  heroCTA: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00E676",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    gap: 8,
  },

  heroCTAText: {
    color: "#0D332D",
    fontSize: 16,
    fontWeight: "bold",
  },

  heroCTAArrow: {
    color: "#0D332D",
    fontSize: 18,
    fontWeight: "bold",
  },

  remindersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 12,
  },

  reminderCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    gap: 10,
  },

  reminderIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  reminderText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },

  section: {
    marginTop: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  sectionTitle2:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 22,
    marginBottom: 10,
  },

  seeAll: {
    fontSize: 14,
    color: "#00E676",
    fontWeight: "600",
  },

  recipeScroll: {
    paddingHorizontal: 20,
    gap: 15,
  },

  recipeCard: {
    width: 180,
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  recipeImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  recipeGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    justifyContent: "flex-end",
    height: "60%",
  },

  recipeTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },

  recipeInfo: {
    flexDirection: "row",
    gap: 12,
  },

  recipeDetail: {
    fontSize: 12,
    color: "#bafdbc",
  },

  // PROGRESSO SEMANAL
  progressCard: {
    marginHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.2)",
  },

  progressItem: {
    marginBottom: 4,
  },

  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  progressIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  progressInfo: {
    flex: 1,
  },

  progressLabel: {
    fontSize: 13,
    color: "#bafdbc",
    marginBottom: 2,
  },

  progressValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },

  editButtonSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  progressBarContainer: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
  },

  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },

  progressPercentText: {
    fontSize: 12,
    color: "#666",
  },

  progressDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 16,
  },

  // Mini Cards de Estatísticas
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 15,
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
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 11,
    color: "#bafdbc",
    textAlign: "center",
  },

  shortcutsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  shortcutButton: {
    alignItems: "center",
    gap: 10,
  },

  shortcutIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    borderWidth: 2,
    borderColor: "rgba(0, 230, 118, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  shortcutLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#bafdbc",
  },

  // Modal de Lembretes
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(15, 23, 42, 1)",
    borderRadius: 24,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.2)",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  modalIconBg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },

  modalDescription: {
    fontSize: 15,
    color: "#bafdbc",
    marginBottom: 20,
    lineHeight: 22,
  },

  benefitsList: {
    gap: 12,
    marginBottom: 20,
  },

  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  benefitDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  benefitText: {
    fontSize: 14,
    color: "#fff",
    flex: 1,
    lineHeight: 20,
  },

  tipCard: {
    backgroundColor: "rgba(0, 230, 118, 0.1)",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
  },

  tipText: {
    fontSize: 15,
    color: "#00E676",
    fontWeight: "600",
  },

  // Modal de Edição
  editModalContent: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#0f172a",
    borderRadius: 24,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.3)",
  },

  editModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    gap: 15,
  },

  editIconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  editModalTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  inputsContainer: {
    gap: 20,
    marginBottom: 25,
  },

  inputGroup: {
    gap: 8,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#bafdbc",
  },

  input: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D332D",
  },

  testimonialCard: {
    marginHorizontal: 20,
    marginTop: 20,
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
    fontSize: 16,
    color: "#fff",
    fontStyle: "italic",
    marginTop: 25,
    marginBottom: 12,
    lineHeight: 24,
  },

  testimonialAuthor: {
    fontSize: 13,
    color: "#FFB800",
    fontWeight: "600",
  },

  finalCTA: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: "#00E676",
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#00E676",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },

  finalCTAText: {
    color: "#0D332D",
    fontSize: 17,
    fontWeight: "bold",
  },

  footer: {
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 10,
  },

  footerText: {
    color: "rgba(186, 253, 188, 0.5)",
    fontSize: 12,
  },

  // Modal de Receita
  recipeModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
  },

  recipeModalContent: {
    flex: 1,
    backgroundColor: "#0a1f1a",
  },

  recipeModalHeader: {
    height: 280,
    position: "relative",
  },

  recipeModalImage: {
    width: "100%",
    height: "100%",
  },

  recipeModalGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  recipeCloseButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  recipeModalTitleContainer: {
    gap: 15,
  },

  recipeModalTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    lineHeight: 32,
  },

  recipeModalStats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.3)",
  },

  recipeStatItem: {
    flex: 1,
    alignItems: "center",
  },

  recipeStatLabel: {
    fontSize: 11,
    color: "#bafdbc",
    marginBottom: 4,
  },

  recipeStatValue: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
  },

  recipeStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },

  recipeModalScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },

  recipeSection: {
    marginTop: 25,
  },

  recipeSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },

  ingredientsList: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  ingredientDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00E676",
  },

  ingredientText: {
    fontSize: 15,
    color: "#fff",
    flex: 1,
    lineHeight: 22,
  },

  preparoList: {
    gap: 16,
  },

  preparoItem: {
    flexDirection: "row",
    gap: 15,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  preparoNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#00E676",
    justifyContent: "center",
    alignItems: "center",
  },

  preparoNumberText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D332D",
  },

  preparoText: {
    flex: 1,
    fontSize: 15,
    color: "#fff",
    lineHeight: 22,
  },

  recipeTipCard: {
    marginTop: 25,
    backgroundColor: "rgba(0, 230, 118, 0.1)",
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#00E676",
  },

  recipeTipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00E676",
    marginBottom: 8,
  },

  recipeTipText: {
    fontSize: 14,
    color: "#bafdbc",
    lineHeight: 20,
  },

  recipeActionButton: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#00E676",
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#00E676",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  recipeActionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D332D",
  },
});
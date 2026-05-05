import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { 
  Sparkles,
  ChevronLeft,
  X,
  Coffee, // Para bebidas
  Carrot, // Para saladas
  UtensilsCrossed, // Para comida (refeições quentes)
  LayoutGrid // Para Todas
} from "lucide-react-native";

const logoApp = require("@/assets/images/logo.png");
const perfilIcon = require("@/assets/images/perfilicon.png");

export default function Receitas() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const [recipeModalVisible, setRecipeModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // NOVO ESTADO: Filtro de categorias
  const [categoriaAtiva, setCategoriaAtiva] = useState("todas");

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

  // NOVAS CATEGORIAS
  const categorias = [
    { id: "todas", nome: "Todas", icon: LayoutGrid },
    { id: "comida", nome: "Comida", icon: UtensilsCrossed },
    { id: "saladas", nome: "Saladas", icon: Carrot },
    { id: "bebidas", nome: "Bebidas", icon: Coffee },
  ];

  const receitas = [
    {
      id: 1,
      categoria: "comida", // <-- Tag de filtro
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
      categoria: "saladas", // <-- Tag de filtro
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
      categoria: "bebidas", // <-- Tag de filtro
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

  // Lógica de Filtro
  const receitasFiltradas = categoriaAtiva === "todas" 
    ? receitas 
    : receitas.filter(r => r.categoria === categoriaAtiva);

  return (
    <LinearGradient
      colors={["#0a1f1a", "#0f172a"]}
      style={styles.gradient}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color="#00E676" size={32} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image source={logoApp} style={styles.logo} resizeMode="contain" />
          <Text style={styles.headerTitle}>Receitas</Text>
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
        <Animated.View style={[{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          
          {/* MENU HORIZONTAL DE CATEGORIAS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categorias.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = categoriaAtiva === cat.id;
              
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryChip,
                    isActive && styles.categoryChipActive
                  ]}
                  onPress={() => setCategoriaAtiva(cat.id)}
                  activeOpacity={0.7}
                >
                  <IconComponent 
                    color={isActive ? "#0D332D" : "#00E676"} 
                    size={18} 
                    strokeWidth={2.5} 
                  />
                  <Text style={[
                    styles.categoryText,
                    isActive && styles.categoryTextActive
                  ]}>
                    {cat.nome}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* LISTA DE RECEITAS FILTRADAS */}
          <View style={styles.recipesGrid}>
            {receitasFiltradas.length > 0 ? (
              receitasFiltradas.map((item) => (
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
              ))
            ) : (
              // Mensagem caso não tenha receitas naquela categoria
              <View style={styles.emptyState}>
                <UtensilsCrossed color="#00E676" size={48} opacity={0.5} />
                <Text style={styles.emptyText}>Ainda não temos receitas nesta categoria.</Text>
              </View>
            )}
          </View>
        </Animated.View>
      </ScrollView>

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
  logo: { width: 35, height: 35 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
  perfilImg: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "#00E676" },
  container: { flex: 1 },
  scrollContent: { paddingBottom: 30, paddingTop: 10 },
  
  // ESTILOS DO MENU DE CATEGORIAS
  categoriesScroll: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0, 230, 118, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.3)",
  },
  categoryChipActive: {
    backgroundColor: "#00E676",
    borderColor: "#00E676",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00E676",
  },
  categoryTextActive: {
    color: "#0D332D",
  },

  // Grade de receitas
  recipesGrid: {
    paddingHorizontal: 20,
    gap: 20,
  },
  recipeCard: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  recipeImage: { width: "100%", height: "100%", position: "absolute" },
  recipeGradient: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    padding: 20, justifyContent: "flex-end", height: "60%",
  },
  recipeTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  recipeInfo: { flexDirection: "row", gap: 12 },
  recipeDetail: { fontSize: 14, color: "#bafdbc", fontWeight: "600" },

  emptyState: {
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#bafdbc",
    marginTop: 15,
    fontSize: 16,
    textAlign: "center"
  },

  // Estilos do Modal
  recipeModalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.95)" },
  recipeModalContent: { flex: 1, backgroundColor: "#0a1f1a" },
  recipeModalHeader: { height: 280, position: "relative" },
  recipeModalImage: { width: "100%", height: "100%" },
  recipeModalGradient: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20,
  },
  recipeCloseButton: {
    position: "absolute", top: 50, right: 20, width: 40, height: 40,
    borderRadius: 20, backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center", alignItems: "center", zIndex: 10,
  },
  recipeModalTitleContainer: { gap: 15 },
  recipeModalTitle: { fontSize: 26, fontWeight: "bold", color: "#fff", lineHeight: 32 },
  recipeModalStats: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "rgba(0, 230, 118, 0.15)", borderRadius: 12,
    padding: 12, borderWidth: 1, borderColor: "rgba(0, 230, 118, 0.3)",
  },
  recipeStatItem: { flex: 1, alignItems: "center" },
  recipeStatLabel: { fontSize: 11, color: "#bafdbc", marginBottom: 4 },
  recipeStatValue: { fontSize: 13, fontWeight: "bold", color: "#fff" },
  recipeStatDivider: { width: 1, height: 30, backgroundColor: "rgba(255, 255, 255, 0.2)" },
  recipeModalScroll: { flex: 1, paddingHorizontal: 20 },
  recipeSection: { marginTop: 25 },
  recipeSectionTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 15 },
  ingredientsList: {
    backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: 16,
    padding: 16, gap: 12, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.1)",
  },
  ingredientItem: { flexDirection: "row", alignItems: "center", gap: 12 },
  ingredientDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#00E676" },
  ingredientText: { fontSize: 15, color: "#fff", flex: 1, lineHeight: 22 },
  preparoList: { gap: 16 },
  preparoItem: {
    flexDirection: "row", gap: 15, backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.1)",
  },
  preparoNumber: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: "#00E676",
    justifyContent: "center", alignItems: "center",
  },
  preparoNumberText: { fontSize: 16, fontWeight: "bold", color: "#0D332D" },
  preparoText: { flex: 1, fontSize: 15, color: "#fff", lineHeight: 22 },
  recipeTipCard: {
    marginTop: 25, backgroundColor: "rgba(0, 230, 118, 0.1)",
    borderRadius: 16, padding: 20, borderLeftWidth: 4, borderLeftColor: "#00E676",
  },
  recipeTipTitle: { fontSize: 16, fontWeight: "bold", color: "#00E676", marginBottom: 8 },
  recipeTipText: { fontSize: 14, color: "#bafdbc", lineHeight: 20 },
  recipeActionButton: {
    marginTop: 25, flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 10, backgroundColor: "#00E676", paddingVertical: 16, borderRadius: 16,
    elevation: 4, shadowColor: "#00E676", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8,
  },
  recipeActionText: { fontSize: 16, fontWeight: "bold", color: "#0D332D" },
});
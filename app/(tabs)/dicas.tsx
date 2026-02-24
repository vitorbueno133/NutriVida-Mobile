import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { 
  Apple, 
  Dumbbell, 
  Moon, 
  Droplets, 
  Heart, 
  Clock,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Bookmark,
  BookmarkCheck,
  Utensils,
  Flame,
  Brain,
  Sun
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function Dicas() {
  const router = useRouter();
  const [categoriaAtiva, setCategoriaAtiva] = useState("todas");
  const [dicasSalvas, setDicasSalvas] = useState([]);

  const toggleSalvar = (dicaId) => {
    if (dicasSalvas.includes(dicaId)) {
      setDicasSalvas(dicasSalvas.filter(id => id !== dicaId));
    } else {
      setDicasSalvas([...dicasSalvas, dicaId]);
    }
  };

  const categorias = [
    { id: "todas", nome: "Todas", icon: Lightbulb },
    { id: "salvas", nome: "Salvas", icon: BookmarkCheck },
    { id: "alimentacao", nome: "Alimentação", icon: Apple },
    { id: "exercicios", nome: "Exercícios", icon: Dumbbell },
    { id: "hidratacao", nome: "Hidratação", icon: Droplets },
    { id: "sono", nome: "Sono", icon: Moon },
    { id: "bemestar", nome: "Bem-estar", icon: Heart },
  ];

  const dicas = [
    {
      id: 1,
      categoria: "alimentacao",
      titulo: "Café da Manhã Balanceado",
      descricao: "Comece o dia com proteínas, carboidratos complexos e frutas para energia sustentada.",
      detalhes: [
        "Inclua ovos ou iogurte grego",
        "Adicione aveia ou pão integral",
        "Não esqueça das frutas frescas",
        "Evite açúcares refinados"
      ],
      cor: "#EF4444",
      icon: Apple,
    },
    {
      id: 2,
      categoria: "hidratacao",
      titulo: "Água em Primeiro Lugar",
      descricao: "Beba água ao acordar para ativar o metabolismo e hidratar o corpo após o jejum noturno.",
      detalhes: [
        "2 copos de água ao acordar",
        "Água antes das refeições",
        "Evite bebidas açucaradas",
        "Meta: 2 litros por dia"
      ],
      cor: "#3B82F6",
      icon: Droplets,
    },
    {
      id: 3,
      categoria: "exercicios",
      titulo: "Movimento Diário",
      descricao: "Pratique pelo menos 30 minutos de atividade física moderada todos os dias.",
      detalhes: [
        "Caminhada rápida ou corrida",
        "Treino de força 2-3x na semana",
        "Alongamentos diários",
        "Encontre uma atividade prazerosa"
      ],
      cor: "#F59E0B",
      icon: Dumbbell,
    },
    {
      id: 4,
      categoria: "sono",
      titulo: "Rotina de Sono",
      descricao: "Estabeleça horários regulares para dormir e acordar, mesmo nos fins de semana.",
      detalhes: [
        "Durma 7-9 horas por noite",
        "Evite telas 1h antes de dormir",
        "Ambiente escuro e fresco",
        "Mesmos horários todos os dias"
      ],
      cor: "#8B5CF6",
      icon: Moon,
    },
    {
      id: 5,
      categoria: "alimentacao",
      titulo: "Planejamento de Refeições",
      descricao: "Planeje suas refeições semanalmente para fazer escolhas mais saudáveis.",
      detalhes: [
        "Lista de compras semanal",
        "Prepare refeições antecipadas",
        "Porções controladas",
        "Variedade de alimentos"
      ],
      cor: "#10B981",
      icon: Clock,
    },
    {
      id: 6,
      categoria: "bemestar",
      titulo: "Mindful Eating",
      descricao: "Pratique a alimentação consciente, mastigando devagar e saboreando cada mordida.",
      detalhes: [
        "Coma sem distrações",
        "Mastigue pelo menos 20 vezes",
        "Perceba sinais de saciedade",
        "Aprecie os sabores"
      ],
      cor: "#EC4899",
      icon: Heart,
    },
    {
      id: 7,
      categoria: "alimentacao",
      titulo: "Proteína em Cada Refeição",
      descricao: "Inclua uma fonte de proteína em todas as refeições para saciedade e massa muscular.",
      detalhes: [
        "Carnes magras, peixes ou ovos",
        "Leguminosas (feijão, lentilha)",
        "Laticínios com baixo teor de gordura",
        "Proteína vegetal (tofu, tempeh)"
      ],
      cor: "#EF4444",
      icon: Apple,
    },
    {
      id: 8,
      categoria: "exercicios",
      titulo: "Aquecimento é Essencial",
      descricao: "Nunca pule o aquecimento antes dos exercícios para prevenir lesões.",
      detalhes: [
        "5-10 minutos de aquecimento",
        "Movimentos dinâmicos",
        "Aumente gradualmente a intensidade",
        "Alongue após o treino"
      ],
      cor: "#F59E0B",
      icon: Dumbbell,
    },
    {
      id: 9,
      categoria: "hidratacao",
      titulo: "Sinais de Desidratação",
      descricao: "Aprenda a identificar os sinais de desidratação e aja rapidamente.",
      detalhes: [
        "Urina escura indica pouca água",
        "Sede não é o primeiro sinal",
        "Dor de cabeça pode ser desidratação",
        "Beba antes de sentir sede"
      ],
      cor: "#3B82F6",
      icon: Droplets,
    },
    {
      id: 10,
      categoria: "bemestar",
      titulo: "Gerenciamento de Estresse",
      descricao: "O estresse crônico afeta diretamente seus hábitos alimentares e saúde.",
      detalhes: [
        "Pratique meditação diária",
        "Respire profundamente",
        "Faça pausas regulares",
        "Busque apoio quando necessário"
      ],
      cor: "#EC4899",
      icon: Heart,
    },
    {
      id: 11,
      categoria: "sono",
      titulo: "Ambiente Ideal para Dormir",
      descricao: "Transforme seu quarto em um santuário do sono para melhor qualidade de descanso.",
      detalhes: [
        "Temperatura entre 18-22°C",
        "Escuridão total ou máscara",
        "Silêncio ou ruído branco",
        "Colchão e travesseiro adequados"
      ],
      cor: "#8B5CF6",
      icon: Moon,
    },
    {
      id: 12,
      categoria: "alimentacao",
      titulo: "Lanches Inteligentes",
      descricao: "Escolha lanches nutritivos que forneçam energia sem comprometer sua dieta.",
      detalhes: [
        "Frutas com oleaginosas",
        "Iogurte natural com granola",
        "Vegetais com hummus",
        "Evite processados e açúcares"
      ],
      cor: "#10B981",
      icon: Apple,
    },
    {
      id: 13,
      categoria: "alimentacao",
      titulo: "Cores no Prato",
      descricao: "Quanto mais colorido seu prato, maior variedade de nutrientes você está consumindo.",
      detalhes: [
        "Vermelho: tomate, pimentão (licopeno)",
        "Verde: folhas, brócolis (vitamina K)",
        "Laranja: cenoura, abóbora (betacaroteno)",
        "Roxo: berinjela, repolho (antocianinas)"
      ],
      cor: "#EF4444",
      icon: Utensils,
    },
    {
      id: 14,
      categoria: "exercicios",
      titulo: "HIIT: Treino Intervalado",
      descricao: "Treinos de alta intensidade queimam mais calorias em menos tempo.",
      detalhes: [
        "30 segundos de esforço máximo",
        "30 segundos de descanso ativo",
        "Repita por 15-20 minutos",
        "Acelera metabolismo por horas"
      ],
      cor: "#F59E0B",
      icon: Flame,
    },
    {
      id: 15,
      categoria: "hidratacao",
      titulo: "Chás Naturais",
      descricao: "Chás sem açúcar são ótimas alternativas para variar a hidratação.",
      detalhes: [
        "Chá verde: antioxidantes",
        "Chá de camomila: relaxante",
        "Chá de hibisco: diurético",
        "Chá de gengibre: digestivo"
      ],
      cor: "#3B82F6",
      icon: Droplets,
    },
    {
      id: 16,
      categoria: "bemestar",
      titulo: "Gratidão Diária",
      descricao: "Praticar gratidão melhora saúde mental e bem-estar geral.",
      detalhes: [
        "Liste 3 coisas boas do dia",
        "Agradeça antes das refeições",
        "Mantenha um diário de gratidão",
        "Compartilhe sentimentos positivos"
      ],
      cor: "#EC4899",
      icon: Heart,
    },
    {
      id: 17,
      categoria: "sono",
      titulo: "Ritual Noturno",
      descricao: "Crie uma rotina relaxante antes de dormir para melhorar a qualidade do sono.",
      detalhes: [
        "Desligue eletrônicos 1h antes",
        "Tome um banho morno",
        "Leia um livro físico",
        "Pratique respiração profunda"
      ],
      cor: "#8B5CF6",
      icon: Moon,
    },
    {
      id: 18,
      categoria: "exercicios",
      titulo: "Caminhada ao Sol",
      descricao: "Caminhar pela manhã expõe você ao sol e sincroniza seu relógio biológico.",
      detalhes: [
        "20 minutos de exposição solar",
        "Melhor horário: 7h às 10h",
        "Produz vitamina D",
        "Regula ciclo circadiano"
      ],
      cor: "#F59E0B",
      icon: Sun,
    },
    {
      id: 19,
      categoria: "alimentacao",
      titulo: "Gorduras Boas",
      descricao: "Nem toda gordura é vilã! Gorduras saudáveis são essenciais para o organismo.",
      detalhes: [
        "Abacate: ômega-9",
        "Castanhas e nozes: ômega-3",
        "Azeite extra virgem",
        "Peixes gordos (salmão, sardinha)"
      ],
      cor: "#10B981",
      icon: Apple,
    },
    {
      id: 20,
      categoria: "bemestar",
      titulo: "Respiração 4-7-8",
      descricao: "Técnica de respiração que reduz ansiedade e promove relaxamento.",
      detalhes: [
        "Inspire pelo nariz contando até 4",
        "Segure a respiração por 7",
        "Expire pela boca contando até 8",
        "Repita 4 vezes"
      ],
      cor: "#EC4899",
      icon: Brain,
    },
    {
      id: 21,
      categoria: "exercicios",
      titulo: "Treino de Força",
      descricao: "Musculatura fortalecida acelera metabolismo mesmo em repouso.",
      detalhes: [
        "2-3 sessões por semana",
        "Trabalhe grandes grupos musculares",
        "Descanso de 48h entre treinos",
        "Progrida gradualmente nas cargas"
      ],
      cor: "#F59E0B",
      icon: Dumbbell,
    },
    {
      id: 22,
      categoria: "alimentacao",
      titulo: "Fibras Alimentares",
      descricao: "Fibras promovem saciedade e saúde intestinal.",
      detalhes: [
        "Mínimo 25-30g de fibras/dia",
        "Frutas com casca",
        "Grãos integrais",
        "Legumes e verduras"
      ],
      cor: "#EF4444",
      icon: Utensils,
    },
    {
      id: 23,
      categoria: "hidratacao",
      titulo: "Água Saborizada Natural",
      descricao: "Adicione sabor à água sem calorias extras.",
      detalhes: [
        "Rodelas de limão ou laranja",
        "Folhas de hortelã",
        "Pepino fatiado",
        "Frutas vermelhas congeladas"
      ],
      cor: "#3B82F6",
      icon: Droplets,
    },
    {
      id: 24,
      categoria: "sono",
      titulo: "Cochilo Estratégico",
      descricao: "Sonecas curtas podem melhorar produtividade e humor.",
      detalhes: [
        "Máximo 20-30 minutos",
        "Melhor horário: 14h-16h",
        "Não prejudica sono noturno",
        "Aumenta alerta e memória"
      ],
      cor: "#8B5CF6",
      icon: Moon,
    },
  ];

  const dicasFiltradas = categoriaAtiva === "salvas"
    ? dicas.filter(d => dicasSalvas.includes(d.id))
    : categoriaAtiva === "todas" 
    ? dicas 
    : dicas.filter(d => d.categoria === categoriaAtiva);

  return (
    <LinearGradient colors={["#0a1f1a", "#0f172a"]} style={styles.gradient}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft color="#00E676" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Dicas de Saúde</Text>
          {dicasSalvas.length > 0 && (
            <Text style={styles.headerSubtitle}>
              {dicasSalvas.length} {dicasSalvas.length === 1 ? 'dica salva' : 'dicas salvas'}
            </Text>
          )}
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categorias.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = categoriaAtiva === cat.id;
            const isSalvas = cat.id === "salvas";
            const savedCount = isSalvas ? dicasSalvas.length : 0;
            
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
                {isSalvas && savedCount > 0 && (
                  <View style={[styles.badge, isActive && styles.badgeActive]}>
                    <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>
                      {savedCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {categoriaAtiva === "salvas" && dicasSalvas.length === 0 && (
          <View style={styles.emptyState}>
            <BookmarkCheck color="#00E676" size={64} strokeWidth={1.5} />
            <Text style={styles.emptyTitle}>Nenhuma dica salva</Text>
            <Text style={styles.emptyText}>
              Comece salvando dicas úteis para acessá-las rapidamente
            </Text>
          </View>
        )}

        {/* Lista de Dicas */}
        <View style={styles.tipsContainer}>
          {dicasFiltradas.map((dica) => {
            const IconComponent = dica.icon;
            const isSalva = dicasSalvas.includes(dica.id);
            
            return (
              <View key={dica.id} style={styles.tipCard}>
            
                <View style={styles.tipHeader}>
                  <View style={[styles.tipIconBg, { backgroundColor: `${dica.cor}20` }]}>
                    <IconComponent color={dica.cor} size={24} strokeWidth={2.5} />
                  </View>
                  <View style={styles.tipHeaderText}>
                    <Text style={styles.tipTitle}>{dica.titulo}</Text>
                    <View style={[styles.categoryBadge, { backgroundColor: `${dica.cor}30` }]}>
                      <Text style={[styles.categoryBadgeText, { color: dica.cor }]}>
                        {categorias.find(c => c.id === dica.categoria)?.nome}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.tipDescription}>{dica.descricao}</Text>

                <View style={styles.detailsList}>
                  {dica.detalhes.map((detalhe, index) => (
                    <View key={index} style={styles.detailItem}>
                      <View style={[styles.detailDot, { backgroundColor: dica.cor }]} />
                      <Text style={styles.detailText}>{detalhe}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity 
                  style={[
                    styles.actionButton, 
                    { borderColor: isSalva ? dica.cor : `${dica.cor}40` },
                    isSalva && { backgroundColor: `${dica.cor}15` }
                  ]}
                  onPress={() => toggleSalvar(dica.id)}
                  activeOpacity={0.7}
                >
                  {isSalva ? (
                    <BookmarkCheck color={dica.cor} size={18} strokeWidth={2.5} />
                  ) : (
                    <Bookmark color={dica.cor} size={18} strokeWidth={2.5} />
                  )}
                  <Text style={[styles.actionButtonText, { color: dica.cor }]}>
                    {isSalva ? 'Salva' : 'Salvar dica'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={styles.footerSpace} />
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
    paddingBottom: 20,
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

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  headerSubtitle: {
    fontSize: 12,
    color: "#00E676",
    marginTop: 2,
    textAlign: "center",
  },

  placeholder: {
    width: 40,
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  categoriesScroll: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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

  badge: {
    backgroundColor: "rgba(0, 230, 118, 0.3)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: "center",
  },

  badgeActive: {
    backgroundColor: "rgba(13, 51, 45, 0.5)",
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#00E676",
  },

  badgeTextActive: {
    color: "#0D332D",
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 15,
    color: "#bafdbc",
    textAlign: "center",
    lineHeight: 22,
  },

  // Cards de Dicas
  tipsContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },

  tipCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  tipHeader: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 15,
  },

  tipIconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  tipHeaderText: {
    flex: 1,
    gap: 8,
  },

  tipTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    lineHeight: 24,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  categoryBadgeText: {
    fontSize: 11,
    fontWeight: "600",
  },

  tipDescription: {
    fontSize: 15,
    color: "#bafdbc",
    lineHeight: 22,
    marginBottom: 16,
  },

  detailsList: {
    gap: 10,
    marginBottom: 16,
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  detailDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
  },

  detailText: {
    flex: 1,
    fontSize: 14,
    color: "#fff",
    lineHeight: 20,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    marginTop: 8,
  },

  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },

  footerSpace: {
    height: 20,
    marginBottom: 30,
  },
});
import React, { useState } from "react";
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
import { 
  ChevronLeft,
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CreditCard,
  Users,
  Settings,
  ShieldCheck,
  FileText,
  MessageCircle
} from "lucide-react-native";

export default function Duvidas() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [categoriaAtiva, setCategoriaAtiva] = useState("todas");

  const categorias = [
    { id: "todas", nome: "Todas", icon: HelpCircle },
    { id: "planos", nome: "Planos", icon: CreditCard },
    { id: "conta", nome: "Conta", icon: Users },
    { id: "uso", nome: "Uso do App", icon: Settings },
    { id: "privacidade", nome: "Privacidade", icon: ShieldCheck },
  ];

  const duvidas = [
    {
      id: 1,
      categoria: "planos",
      pergunta: "Como funciona o período de teste gratuito?",
      resposta: "Você tem acesso a um cardápio personalizado gratuito assim que se cadastrar. Após isso, pode escolher entre nossos planos Premium para ter acesso ilimitado a cardápios, receitas exclusivas e acompanhamento nutricional completo.",
      tags: ["gratuito", "teste", "período"]
    },
    {
      id: 2,
      categoria: "planos",
      pergunta: "Posso cancelar minha assinatura a qualquer momento?",
      resposta: "Sim! Você pode cancelar sua assinatura a qualquer momento através das configurações da sua conta. Não há multas ou taxas de cancelamento. Você continuará tendo acesso até o fim do período já pago.",
      tags: ["cancelar", "assinatura", "período"]
    },
    {
      id: 3,
      categoria: "planos",
      pergunta: "Quais são as formas de pagamento aceitas?",
      resposta: "Aceitamos cartões de crédito (Visa, Mastercard, Elo, American Express), cartões de débito, PIX e boleto bancário. Para assinaturas recorrentes, recomendamos cartão de crédito para facilitar a renovação automática.",
      tags: ["pagamento", "cartão", "pix"]
    },
    {
      id: 4,
      categoria: "conta",
      pergunta: "Como criar minha conta no NutriVida?",
      resposta: "É muito simples! Clique em 'Começar' na tela inicial, preencha seu email e senha, e responda algumas perguntas sobre seus objetivos e preferências alimentares. Em menos de 3 minutos você terá seu primeiro cardápio personalizado.",
      tags: ["criar", "cadastro", "conta"]
    },
    {
      id: 5,
      categoria: "conta",
      pergunta: "Como alterar meus dados pessoais?",
      resposta: "Acesse o menu 'Perfil' no canto superior direito da tela inicial. Lá você pode editar suas informações pessoais, objetivos, restrições alimentares e preferências. As mudanças são salvas automaticamente.",
      tags: ["alterar", "dados", "perfil"]
    },
    {
      id: 6,
      categoria: "conta",
      pergunta: "Esqueci minha senha, como recuperar?",
      resposta: "Na tela de login, clique em 'Esqueci minha senha'. Digite seu email cadastrado e você receberá um link para criar uma nova senha. O link é válido por 24 horas.",
      tags: ["senha", "recuperar", "esqueci"]
    },
    {
      id: 7,
      categoria: "uso",
      pergunta: "Como funciona o cardápio personalizado?",
      resposta: "Nosso algoritmo cria um cardápio sob medida com base em suas informações: peso, altura, idade, objetivo (emagrecer, ganhar massa, manter peso), restrições alimentares e preferências. O cardápio é balanceado nutricionalmente e atualizado semanalmente.",
      tags: ["cardápio", "personalizado", "algoritmo"]
    },
    {
      id: 8,
      categoria: "uso",
      pergunta: "Posso substituir refeições que não gosto?",
      resposta: "Sim! Cada refeição tem a opção 'Substituir'. Clique nela e você receberá alternativas com valores nutricionais similares. Usuários Premium têm substituições ilimitadas.",
      tags: ["substituir", "refeições", "trocar"]
    },
    {
      id: 9,
      categoria: "uso",
      pergunta: "Como registrar meu progresso?",
      resposta: "Na tela inicial, você encontra a seção 'Progresso Semanal'. Clique no ícone de edição em cada métrica (peso, água, atividades) para atualizar seus dados. O app calculará automaticamente seu progresso e percentual de meta alcançada.",
      tags: ["progresso", "registrar", "peso"]
    },
    {
      id: 10,
      categoria: "uso",
      pergunta: "O app funciona offline?",
      resposta: "Algumas funcionalidades básicas funcionam offline, como visualizar cardápios já baixados e receitas salvas. Para gerar novos cardápios, acessar dicas atualizadas e sincronizar progresso, é necessário conexão com internet.",
      tags: ["offline", "internet", "conexão"]
    },
    {
      id: 11,
      categoria: "privacidade",
      pergunta: "Meus dados estão seguros?",
      resposta: "Sim! Utilizamos criptografia de ponta a ponta para proteger seus dados. Seguimos rigorosamente a LGPD (Lei Geral de Proteção de Dados) e nunca compartilhamos suas informações pessoais com terceiros sem seu consentimento.",
      tags: ["segurança", "dados", "privacidade"]
    },
    {
      id: 12,
      categoria: "privacidade",
      pergunta: "Como excluir minha conta permanentemente?",
      resposta: "Acesse Perfil > Configurações > Privacidade > Excluir Conta. Todos os seus dados serão permanentemente removidos em até 30 dias. Esta ação é irreversível. Se tiver assinatura ativa, ela será automaticamente cancelada.",
      tags: ["excluir", "deletar", "conta"]
    },
    {
      id: 13,
      categoria: "uso",
      pergunta: "Posso usar o app para condições médicas específicas?",
      resposta: "O NutriVida é uma ferramenta de apoio nutricional para pessoas saudáveis. Se você tem condições médicas como diabetes, hipertensão, alergias graves ou está gestante, consulte um médico ou nutricionista antes de seguir nossos cardápios.",
      tags: ["médico", "doença", "saúde"]
    },
    {
      id: 14,
      categoria: "planos",
      pergunta: "Qual a diferença entre Plano Mensal e Anual?",
      resposta: "Ambos oferecem os mesmos recursos: cardápios ilimitados, receitas exclusivas, acompanhamento nutricional e suporte prioritário. O Plano Anual oferece 30% de desconto comparado ao mensal, sendo mais econômico para quem quer resultados a longo prazo.",
      tags: ["plano", "mensal", "anual"]
    },
    {
      id: 15,
      categoria: "uso",
      pergunta: "Como funcionam as receitas do app?",
      resposta: "Temos mais de 500 receitas saudáveis com informações nutricionais completas, tempo de preparo, nível de dificuldade e lista de ingredientes. Você pode favoritar receitas, ajustar porções e até criar sua própria lista de compras automaticamente.",
      tags: ["receitas", "cozinhar", "preparo"]
    },
    {
      id: 16,
      categoria: "conta",
      pergunta: "Posso ter mais de um perfil na mesma conta?",
      resposta: "Atualmente cada conta suporta apenas um perfil. Se você quiser acompanhar o progresso de outra pessoa (como filho ou cônjuge), será necessário criar uma conta separada com outro email.",
      tags: ["perfil", "família", "múltiplos"]
    },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filtrarDuvidas = () => {
    let filtered = duvidas;

    // Filtrar por categoria
    if (categoriaAtiva !== "todas") {
      filtered = filtered.filter(d => d.categoria === categoriaAtiva);
    }

    // Filtrar por busca
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.pergunta.toLowerCase().includes(query) ||
        d.resposta.toLowerCase().includes(query) ||
        d.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  const duvidasFiltradas = filtrarDuvidas();

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
        <Text style={styles.headerTitle}>Central de Ajuda</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Busca */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Search color="#00E676" size={20} strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar dúvidas..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Categorias */}
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

        {/* Resultados */}
        {duvidasFiltradas.length === 0 ? (
          <View style={styles.emptyState}>
            <HelpCircle color="#00E676" size={64} strokeWidth={1.5} />
            <Text style={styles.emptyTitle}>Nenhuma dúvida encontrada</Text>
            <Text style={styles.emptyText}>
              Tente buscar com outras palavras ou explore as categorias
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.resultsCount}>
              {duvidasFiltradas.length} {duvidasFiltradas.length === 1 ? 'dúvida encontrada' : 'dúvidas encontradas'}
            </Text>

            <View style={styles.faqContainer}>
              {duvidasFiltradas.map((duvida) => {
                const isExpanded = expandedId === duvida.id;
                return (
                  <TouchableOpacity
                    key={duvida.id}
                    style={[styles.faqCard, isExpanded && styles.faqCardExpanded]}
                    onPress={() => toggleExpand(duvida.id)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.faqHeader}>
                      <View style={styles.questionIconBg}>
                        <HelpCircle color="#00E676" size={20} strokeWidth={2.5} />
                      </View>
                      <Text style={styles.faqQuestion}>{duvida.pergunta}</Text>
                      <View style={styles.expandIcon}>
                        {isExpanded ? (
                          <ChevronUp color="#00E676" size={20} strokeWidth={2.5} />
                        ) : (
                          <ChevronDown color="#00E676" size={20} strokeWidth={2.5} />
                        )}
                      </View>
                    </View>

                    {isExpanded && (
                      <View style={styles.faqAnswer}>
                        <View style={styles.answerDivider} />
                        <Text style={styles.answerText}>{duvida.resposta}</Text>
                        <View style={styles.tagsContainer}>
                          {duvida.tags.map((tag, index) => (
                            <View key={index} style={styles.tag}>
                              <Text style={styles.tagText}>{tag}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {/* Card de Contato */}
        <View style={styles.contactCard}>
          <View style={styles.contactIconBg}>
            <MessageCircle color="#00E676" size={32} strokeWidth={2} />
          </View>
          <Text style={styles.contactTitle}>Ainda tem dúvidas?</Text>
          <Text style={styles.contactText}>
            Nossa equipe está pronta para te ajudar!
          </Text>
          <TouchableOpacity style={styles.contactButton} activeOpacity={0.8} onPress={() => router.push("/contato")}>
            <Text style={styles.contactButtonText}>Falar com Suporte</Text>
          </TouchableOpacity>
        </View>

        {/* Recursos Úteis */}
        <View style={styles.resourcesSection}>
          <Text style={styles.resourcesTitle}>Recursos Úteis</Text>
          
          <TouchableOpacity style={styles.resourceCard} activeOpacity={0.7}>
            <FileText color="#3B82F6" size={24} strokeWidth={2} />
            <View style={styles.resourceContent}>
              <Text style={styles.resourceName}>Termos de Uso</Text>
              <Text style={styles.resourceDesc}>Leia nossos termos e condições</Text>
            </View>
            <ChevronLeft 
              color="#666" 
              size={20} 
              strokeWidth={2} 
              style={{ transform: [{ rotate: '180deg' }] }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceCard} activeOpacity={0.7}>
            <ShieldCheck color="#10B981" size={24} strokeWidth={2} />
            <View style={styles.resourceContent}>
              <Text style={styles.resourceName}>Política de Privacidade</Text>
              <Text style={styles.resourceDesc}>Como protegemos seus dados</Text>
            </View>
            <ChevronLeft 
              color="#666" 
              size={20} 
              strokeWidth={2} 
              style={{ transform: [{ rotate: '180deg' }] }}
            />
          </TouchableOpacity>
        </View>

        {/* Footer spacing */}
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

  placeholder: {
    width: 40,
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  // Busca
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.2)",
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#fff",
  },

  // Categorias
  categoriesScroll: {
    paddingHorizontal: 20,
    paddingVertical: 15,
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

  // Empty State
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

  // Resultados
  resultsCount: {
    fontSize: 13,
    color: "#666",
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  // FAQ Cards
  faqContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },

  faqCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  faqCardExpanded: {
    borderColor: "rgba(0, 230, 118, 0.3)",
    backgroundColor: "rgba(0, 230, 118, 0.05)",
  },

  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  questionIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    lineHeight: 21,
  },

  expandIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },

  faqAnswer: {
    marginTop: 16,
  },

  answerDivider: {
    height: 1,
    backgroundColor: "rgba(0, 230, 118, 0.2)",
    marginBottom: 16,
  },

  answerText: {
    fontSize: 14,
    color: "#bafdbc",
    lineHeight: 22,
    marginBottom: 16,
  },

  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.2)",
  },

  tagText: {
    fontSize: 11,
    color: "#00E676",
    fontWeight: "600",
  },

  // Card de Contato
  contactCard: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: "rgba(0, 230, 118, 0.1)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.3)",
  },

  contactIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(0, 230, 118, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  contactTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },

  contactText: {
    fontSize: 14,
    color: "#bafdbc",
    textAlign: "center",
    marginBottom: 20,
  },

  contactButton: {
    backgroundColor: "#00E676",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
  },

  contactButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0D332D",
  },

  // Recursos Úteis
  resourcesSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },

  resourcesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },

  resourceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  resourceContent: {
    flex: 1,
  },

  resourceName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },

  resourceDesc: {
    fontSize: 12,
    color: "#bafdbc",
  },

  footerSpace: {
    height: 20,
  },
});
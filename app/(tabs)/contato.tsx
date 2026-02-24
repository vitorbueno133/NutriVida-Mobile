import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { 
  ChevronLeft,
  MessageCircle,
  Mail,
  Phone,
  Instagram,
  Send,
  CheckCircle2,
  MapPin,
  Clock,
  Facebook,
  Twitter
} from "lucide-react-native";

export default function Contato() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);

  const assuntos = [
    { id: 1, titulo: "Suporte Técnico", icone: "🔧" },
    { id: 2, titulo: "Dúvidas sobre Planos", icone: "💳" },
    { id: 3, titulo: "Sugestões", icone: "💡" },
    { id: 4, titulo: "Problemas com Pagamento", icone: "💰" },
    { id: 5, titulo: "Reclamações", icone: "⚠️" },
    { id: 6, titulo: "Outros", icone: "💬" },
  ];

  const canaisContato = [
    {
      id: 1,
      titulo: "Email",
      info: "contato@nutrivida.com.br",
      descricao: "Resposta em até 24h",
      icon: Mail,
      cor: "#3B82F6",
      acao: "mailto:contato@nutrivida.com.br"
    },
    {
      id: 2,
      titulo: "Telefone",
      info: "(16) 3252-1234",
      descricao: "Seg-Sex: 8h às 18h",
      icon: Phone,
      cor: "#10B981",
      acao: "tel:+551632521234"
    },
    {
      id: 3,
      titulo: "WhatsApp",
      info: "(16) 99999-9999",
      descricao: "Atendimento rápido",
      icon: MessageCircle,
      cor: "#25D366",
      acao: "https://wa.me/5516999999999"
    },
  ];

  const redesSociais = [
    {
      id: 1,
      nome: "Instagram",
      usuario: "@nutrivida",
      icon: Instagram,
      cor: "#E4405F",
    },
    {
      id: 2,
      nome: "Facebook",
      usuario: "/nutrivida",
      icon: Facebook,
      cor: "#1877F2",
    },
    {
      id: 3,
      nome: "Twitter",
      usuario: "@nutrivida",
      icon: Twitter,
      cor: "#1DA1F2",
    },
  ];

  const validarFormulario = () => {
    if (!nome.trim()) {
      Alert.alert("Atenção", "Por favor, informe seu nome.");
      return false;
    }
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Atenção", "Por favor, informe um email válido.");
      return false;
    }
    if (!assunto) {
      Alert.alert("Atenção", "Por favor, selecione um assunto.");
      return false;
    }
    if (!mensagem.trim() || mensagem.trim().length < 10) {
      Alert.alert("Atenção", "Por favor, escreva uma mensagem com pelo menos 10 caracteres.");
      return false;
    }
    return true;
  };

  const enviarMensagem = () => {
    if (!validarFormulario()) return;

    setEnviando(true);
    
    // Simular envio
    setTimeout(() => {
      setEnviando(false);
      Alert.alert(
        "Mensagem Enviada!",
        "Recebemos sua mensagem e retornaremos em breve. Obrigado por entrar em contato!",
        [
          {
            text: "OK",
            onPress: () => {
              setNome("");
              setEmail("");
              setAssunto("");
              setMensagem("");
            }
          }
        ]
      );
    }, 2000);
  };

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
        <Text style={styles.headerTitle}>Fale Conosco</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro Card */}
        <View style={styles.introCard}>
          <View style={styles.introIconBg}>
            <MessageCircle color="#00E676" size={32} strokeWidth={2} />
          </View>
          <Text style={styles.introTitle}>Como podemos ajudar?</Text>
          <Text style={styles.introText}>
            Estamos aqui para tirar suas dúvidas e ouvir suas sugestões!
          </Text>
        </View>

        {/* Canais de Contato Rápido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contato Direto</Text>
          
          {canaisContato.map((canal) => {
            const IconComponent = canal.icon;
            return (
              <TouchableOpacity 
                key={canal.id}
                style={styles.canalCard}
                activeOpacity={0.7}
              >
                <View style={[styles.canalIconBg, { backgroundColor: `${canal.cor}20` }]}>
                  <IconComponent color={canal.cor} size={24} strokeWidth={2.5} />
                </View>
                <View style={styles.canalInfo}>
                  <Text style={styles.canalTitulo}>{canal.titulo}</Text>
                  <Text style={styles.canalContato}>{canal.info}</Text>
                  <Text style={styles.canalDescricao}>{canal.descricao}</Text>
                </View>
                <View style={styles.canalArrow}>
                  <ChevronLeft 
                    color="#666" 
                    size={20} 
                    strokeWidth={2} 
                    style={{ transform: [{ rotate: '180deg' }] }}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Formulário de Contato */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enviar Mensagem</Text>
          
          <View style={styles.formCard}>
            {/* Nome */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome Completo *</Text>
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome"
                placeholderTextColor="#666"
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email *</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="seu@email.com"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Assunto */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Assunto *</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.assuntosScroll}
              >
                {assuntos.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.assuntoChip,
                      assunto === item.titulo && styles.assuntoChipActive
                    ]}
                    onPress={() => setAssunto(item.titulo)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.assuntoIcone}>{item.icone}</Text>
                    <Text style={[
                      styles.assuntoText,
                      assunto === item.titulo && styles.assuntoTextActive
                    ]}>
                      {item.titulo}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Mensagem */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mensagem *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={mensagem}
                onChangeText={setMensagem}
                placeholder="Descreva sua dúvida ou sugestão..."
                placeholderTextColor="#666"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
              <Text style={styles.charCount}>{mensagem.length} / 500</Text>
            </View>

            {/* Botão Enviar */}
            <TouchableOpacity
              style={[styles.submitButton, enviando && styles.submitButtonDisabled]}
              onPress={enviarMensagem}
              activeOpacity={0.8}
              disabled={enviando}
            >
              {enviando ? (
                <Text style={styles.submitButtonText}>Enviando...</Text>
              ) : (
                <>
                  <Send color="#0D332D" size={20} strokeWidth={2.5} />
                  <Text style={styles.submitButtonText}>Enviar Mensagem</Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.formNote}>
              * Campos obrigatórios. Responderemos em até 24 horas úteis.
            </Text>
          </View>
        </View>

        {/* Redes Sociais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Redes Sociais</Text>
          
          <View style={styles.socialContainer}>
            {redesSociais.map((rede) => {
              const IconComponent = rede.icon;
              return (
                <TouchableOpacity
                  key={rede.id}
                  style={styles.socialCard}
                  activeOpacity={0.7}
                >
                  <View style={[styles.socialIconBg, { backgroundColor: `${rede.cor}20` }]}>
                    <IconComponent color={rede.cor} size={28} strokeWidth={2} />
                  </View>
                  <Text style={styles.socialNome}>{rede.nome}</Text>
                  <Text style={styles.socialUsuario}>{rede.usuario}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Informações Adicionais */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <MapPin color="#00E676" size={20} strokeWidth={2} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Endereço</Text>
              <Text style={styles.infoText}>
                Rua das Flores, 123{"\n"}
                Centro - Taquaritinga/SP{"\n"}
                CEP: 15900-000
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Clock color="#00E676" size={20} strokeWidth={2} />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Horário de Atendimento</Text>
              <Text style={styles.infoText}>
                Segunda a Sexta: 8h às 18h{"\n"}
                Sábado: 8h às 12h{"\n"}
                Domingo: Fechado
              </Text>
            </View>
          </View>
        </View>

        {/* FAQ Quick Access */}
        <TouchableOpacity 
          style={styles.faqBanner}
          onPress={() => router.push("/duvidas")}
          activeOpacity={0.8}
        >
          <View style={styles.faqIconBg}>
            <CheckCircle2 color="#FFB800" size={28} strokeWidth={2} />
          </View>
          <View style={styles.faqContent}>
            <Text style={styles.faqTitle}>Dúvidas Frequentes</Text>
            <Text style={styles.faqText}>
              Talvez sua dúvida já esteja respondida
            </Text>
          </View>
          <ChevronLeft 
            color="#FFB800" 
            size={24} 
            strokeWidth={2.5} 
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        </TouchableOpacity>

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

  // Intro Card
  introCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "rgba(0, 230, 118, 0.1)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.3)",
  },

  introIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(0, 230, 118, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  introTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },

  introText: {
    fontSize: 14,
    color: "#bafdbc",
    textAlign: "center",
    lineHeight: 20,
  },

  // Sections
  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },

  // Canais de Contato
  canalCard: {
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

  canalIconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  canalInfo: {
    flex: 1,
  },

  canalTitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },

  canalContato: {
    fontSize: 14,
    color: "#00E676",
    marginBottom: 2,
  },

  canalDescricao: {
    fontSize: 12,
    color: "#bafdbc",
  },

  canalArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },

  // Formulário
  formCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  inputGroup: {
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#bafdbc",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
  },

  charCount: {
    fontSize: 11,
    color: "#666",
    marginTop: 6,
    textAlign: "right",
  },

  // Assuntos
  assuntosScroll: {
    flexDirection: "row",
  },

  assuntoChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginRight: 10,
  },

  assuntoChipActive: {
    backgroundColor: "#00E676",
    borderColor: "#00E676",
  },

  assuntoIcone: {
    fontSize: 16,
  },

  assuntoText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },

  assuntoTextActive: {
    color: "#0D332D",
  },

  // Botão Enviar
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#00E676",
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 10,
  },

  submitButtonDisabled: {
    opacity: 0.6,
  },

  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D332D",
  },

  formNote: {
    fontSize: 11,
    color: "#666",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 16,
  },

  // Redes Sociais
  socialContainer: {
    flexDirection: "row",
    gap: 12,
  },

  socialCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  socialIconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  socialNome: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },

  socialUsuario: {
    fontSize: 11,
    color: "#bafdbc",
  },

  // Informações Adicionais
  infoSection: {
    paddingHorizontal: 20,
    marginTop: 30,
    gap: 12,
  },

  infoCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 18,
    gap: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },

  infoText: {
    fontSize: 13,
    color: "#bafdbc",
    lineHeight: 20,
  },

  // FAQ Banner
  faqBanner: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: "rgba(255, 184, 0, 0.1)",
    borderRadius: 20,
    padding: 20,
    gap: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 184, 0, 0.3)",
  },

  faqIconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 184, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  faqContent: {
    flex: 1,
  },

  faqTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },

  faqText: {
    fontSize: 13,
    color: "#FFB800",
  },

  footerSpace: {
    height: 20,
  },
});
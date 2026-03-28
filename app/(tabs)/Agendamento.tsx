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
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  X,
  Building2,
  AlertCircle
} from "lucide-react-native";

const { width } = Dimensions.get("window");
const perfilIcon = require("@/assets/images/perfilicon.png");
const logoApp = require("@/assets/images/logo.png");
const imgConsultorio = require("@/assets/images/consultorio.jpg");

// IMPORTANTE: Coloque o IP da sua máquina na rede local
const API_URL = 'http://192.168.3.243:3000'; 

export default function HomeAgendamentos() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Estados para gerenciar os dados dinâmicos
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [usuario, setUsuario] = useState({ nome: "Carregando..." });
  const [agendamentoAtual, setAgendamentoAtual] = useState(null);
  const [consultoriosRecomendados, setConsultoriosRecomendados] = useState([]);
  const [consultoriosVisitados, setConsultoriosVisitados] = useState([]);
  const [dataHoje, setDataHoje] = useState("");

  useEffect(() => {
    // Animação de entrada
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Configurar a data de hoje dinamicamente (igual no Web)
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const hoje = new Date();
    setDataHoje(`${diasSemana[hoje.getDay()]} ${hoje.getDate()} de ${meses[hoje.getMonth()]}`);

    carregarDadosIniciais();
  }, []);

  const carregarDadosIniciais = async () => {
    try {
      // 1. Verifica Login
      const usuarioRaw = await AsyncStorage.getItem("dadosUsuario");
      if (!usuarioRaw) {
        Alert.alert("Acesso Negado", "Você precisa estar logado para acessar esta página.");
        router.replace("/entrar");
        return;
      }
      
      const user = JSON.parse(usuarioRaw);
      setUsuario({ nome: user.nome_usuario, id: user.id });

      // 2. Busca Agendamentos do Usuário
      const resAgendamentos = await fetch(`${API_URL}/agendamentos`);
      const agendamentos = await resAgendamentos.json();
      
      const meuAgendamento = agendamentos.find(a => a.usuario_id === user.id);
      
      if (meuAgendamento) {
        const dataObj = new Date(meuAgendamento.data);
        setAgendamentoAtual({
          id: meuAgendamento.id,
          status: "Confirmado",
          servico: meuAgendamento.nome_servico || "Serviço",
          consultorio: meuAgendamento.consultorio_nome || "Consultório",
          dataCompleta: `${String(dataObj.getDate()).padStart(2, '0')} de ${meses[dataObj.getMonth()]}`,
          mes: meses[dataObj.getMonth()].toUpperCase(),
          dia: dataObj.getDate(),
          hora: meuAgendamento.hora,
          valor: meuAgendamento.preco ? `R$ ${Number(meuAgendamento.preco).toFixed(2)}` : "Não informado"
        });
      }

      // 3. Busca e Distribui Consultórios
      const resConsultorios = await fetch(`${API_URL}/consultorios`);
      const consultorios = await resConsultorios.json();
      consultorios.sort((a, b) => a.id - b.id);

      const recomendados = [];
      const visitados = [];

      consultorios.forEach((c, index) => {
        if (index % 3 === 0) recomendados.push(c);
        else if (index % 3 === 1) visitados.push(c);
      });

      setConsultoriosRecomendados(recomendados);
      setConsultoriosVisitados(visitados);

    } catch (error) {
      console.error("Erro ao carregar dados da API:", error);
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor. Verifique se a API está rodando e se o IP está correto.");
    }
  };

  const cancelarReserva = async () => {
    if (!agendamentoAtual) return;

    try {
      const response = await fetch(`${API_URL}/agendamentos/${agendamentoAtual.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error("Falha ao cancelar na API");

      Alert.alert("Sucesso", "Reserva cancelada com sucesso!");
      setAgendamentoAtual(null); // Limpa o card da tela
      setModalVisible(false);    // Fecha o modal

    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível cancelar a reserva no momento.");
    }
  };

  const irParaReserva = async (consultorio) => {
    try {
      // Como na Web você usava localStorage para passar os dados para a próxima tela:
      await AsyncStorage.setItem('consultorioSelecionado', JSON.stringify(consultorio));
      
      // Opcional: Se sua API exigir buscar os serviços antes de mudar de tela, 
      // faça o fetch(`${API_URL}/consultorios/${consultorio.id}`) aqui.
      
      router.push({ pathname: '/reserva', params: { id: consultorio.id } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LinearGradient colors={["#0a1f1a", "#0f172a"]} style={styles.gradient}>
      {/* Header Fixo */}
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Image source={logoApp} style={styles.logo} resizeMode="contain" />
          <Text style={styles.headerTitle}>Nutrivida</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/perfil")}>
          <Image source={perfilIcon} style={styles.perfilImg} resizeMode="cover" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, paddingBottom: 40 }}>
          
          {/* Saudação e Pesquisa */}
          <View style={styles.greetingSection}>
            <Text style={styles.greetingTitle}>Olá, {usuario.nome}</Text>
            <Text style={styles.dateText}>{dataHoje}</Text>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar consultórios..."
                placeholderTextColor="#94a3b8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.searchButton}>
                <Search color="#fff" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Card: Próximo Agendamento */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Seu Próximo Agendamento</Text>
            
            {agendamentoAtual ? (
              <TouchableOpacity 
                style={styles.appointmentCard}
                activeOpacity={0.8}
                onPress={() => setModalVisible(true)}
              >
                <View style={styles.appointmentLeft}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>● {agendamentoAtual.status}</Text>
                  </View>
                  <Text style={styles.appointmentService}>{agendamentoAtual.servico}</Text>
                  <Text style={styles.appointmentClinic}>{agendamentoAtual.consultorio}</Text>
                </View>
                <View style={styles.appointmentRight}>
                  <Text style={styles.appointmentMonth}>{agendamentoAtual.mes}</Text>
                  <Text style={styles.appointmentDay}>{agendamentoAtual.dia}</Text>
                  <Text style={styles.appointmentTime}>{agendamentoAtual.hora}</Text>
                </View>
              </TouchableOpacity>
            ) : (
               <View style={[styles.appointmentCard, { justifyContent: 'center', paddingVertical: 40 }]}>
                 <Text style={{ color: '#94a3b8', fontSize: 16 }}>Você não possui reservas no momento.</Text>
               </View>
            )}
          </View>

          {/* Recomendados */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Consultórios Disponíveis</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer}>
              {consultoriosRecomendados.map((item) => (
                <View key={item.id} style={styles.clinicCard}>
                  <Image source={item.imagem ? { uri: item.imagem } : imgConsultorio} style={styles.clinicImage} />
                  <View style={styles.clinicCardContent}>
                    <Text style={styles.clinicCardTitle}>{item.nome}</Text>
                    <Text style={styles.clinicCardAddress} numberOfLines={2}>{item.endereco}</Text>
                    <TouchableOpacity 
                      style={styles.bookButton}
                      onPress={() => irParaReserva(item)} 
                    >
                      <Text style={styles.bookButtonText}>Reservar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Mais Visitados */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mais Visitados</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer}>
              {consultoriosVisitados.map((item) => (
                <View key={`visited-${item.id}`} style={styles.clinicCard}>
                  <Image source={item.imagem ? { uri: item.imagem } : imgConsultorio} style={styles.clinicImage} />
                  <View style={styles.clinicCardContent}>
                    <Text style={styles.clinicCardTitle}>{item.nome}</Text>
                    <Text style={styles.clinicCardAddress} numberOfLines={2}>{item.endereco}</Text>
                    <TouchableOpacity 
                      style={styles.bookButton}
                      onPress={() => irParaReserva(item)}
                    >
                      <Text style={styles.bookButtonText}>Reservar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

        </Animated.View>
      </ScrollView>

      {/* Modal Verificar Reserva */}
      {agendamentoAtual && (
        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Verificar Reserva</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <X color="#ef4444" size={24} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={imgConsultorio} style={styles.modalMapImage} />
                
                <View style={styles.modalStatusBadge}>
                  <Text style={styles.modalStatusText}>● {agendamentoAtual.status}</Text>
                </View>

                <View style={styles.modalDetailsContainer}>
                  <Text style={styles.modalDetailsTitle}>{agendamentoAtual.servico}</Text>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Data</Text>
                    <Text style={styles.detailValue}>{agendamentoAtual.dataCompleta}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Horário</Text>
                    <Text style={styles.detailValue}>{agendamentoAtual.hora}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Consultório</Text>
                    <Text style={styles.detailValue}>{agendamentoAtual.consultorio}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Valor</Text>
                    <Text style={styles.detailValue}>{agendamentoAtual.valor}</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.cancelButton} 
                  activeOpacity={0.8}
                  onPress={cancelarReserva}
                >
                  <Text style={styles.cancelButtonText}>Cancelar Reserva</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}

    </LinearGradient>
  );
}

// ... Manter todo o bloco const styles = StyleSheet.create({...}) exatamente como você enviou

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
  headerCenter: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: { width: 30, height: 30 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
  perfilImg: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "#00E676" },
  container: { flex: 1 },
  
  
  greetingSection: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 20 },
  greetingTitle: { fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 5 },
  dateText: { fontSize: 16, color: "#94a3b8", marginBottom: 25 },
  searchContainer: { flexDirection: "row", gap: 10 },
  searchInput: {
    flex: 1,
    backgroundColor: "rgba(30, 41, 59, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.15)",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#00E676",
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginHorizontal: 20, marginBottom: 15 },

  
  appointmentCard: {
    marginHorizontal: 20,
    backgroundColor: "rgba(0, 230, 118, 0.1)",
    borderWidth: 2,
    borderColor: "#00E676",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appointmentLeft: { flex: 1, gap: 5 },
  statusBadge: {
    backgroundColor: "rgba(0, 230, 118, 0.2)",
    borderWidth: 1,
    borderColor: "#00E676",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  statusText: { color: "#00E676", fontSize: 12, fontWeight: "bold" },
  appointmentService: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  appointmentClinic: { fontSize: 14, color: "#94a3b8" },
  appointmentRight: {
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.15)",
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    minWidth: 100,
  },
  appointmentMonth: { fontSize: 12, color: "#00E676", fontWeight: "bold", letterSpacing: 1 },
  appointmentDay: { fontSize: 36, fontWeight: "bold", color: "#fff", marginVertical: 2 },
  appointmentTime: { fontSize: 14, color: "#94a3b8", fontWeight: "600" },

  // Carousel
  carouselContainer: { paddingHorizontal: 20, gap: 15 },
  clinicCard: {
    width: 260,
    backgroundColor: "rgba(30, 41, 59, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.15)",
    borderRadius: 16,
    overflow: "hidden",
  },
  clinicImage: { width: "100%", height: 140, backgroundColor: "#1e293b" },
  clinicCardContent: { padding: 15 },
  clinicCardTitle: { fontSize: 16, fontWeight: "bold", color: "#fff", marginBottom: 5 },
  clinicCardAddress: { fontSize: 13, color: "#94a3b8", marginBottom: 15, minHeight: 35 },
  bookButton: {
    backgroundColor: "#00E676",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  bookButtonText: { color: "#0D332D", fontWeight: "bold", fontSize: 15 },

  // Modal (Sidebar replacement)
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.6)" },
  modalContent: {
    backgroundColor: "#0f172a",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.2)",
    padding: 25,
    height: "85%",
  },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  modalTitle: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  closeButton: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1, borderColor: "rgba(239, 68, 68, 0.3)",
    justifyContent: "center", alignItems: "center"
  },
  modalMapImage: { width: "100%", height: 180, borderRadius: 12, marginBottom: 15 },
  modalStatusBadge: {
    backgroundColor: "rgba(0, 230, 118, 0.2)",
    borderWidth: 1, borderColor: "#00E676",
    borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12,
    alignSelf: "flex-start", marginBottom: 20,
  },
  modalStatusText: { color: "#00E676", fontSize: 12, fontWeight: "bold" },
  modalDetailsContainer: { marginBottom: 30 },
  modalDetailsTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 15 },
  detailRow: {
    flexDirection: "row", justifyContent: "space-between",
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.05)"
  },
  detailLabel: { color: "#94a3b8", fontSize: 15 },
  detailValue: { color: "#fff", fontSize: 15, fontWeight: "600" },
  cancelButton: {
    backgroundColor: "#ef4444", borderRadius: 12,
    paddingVertical: 16, alignItems: "center", marginTop: 10,
  },
  cancelButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});
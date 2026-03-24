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
  Alert,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  MapPin,
  Clock,
  Phone,
  CalendarDays,
  ChevronRight,
  X,
  Copy,
  Info,
  CheckCircle2
} from "lucide-react-native";
import * as Clipboard from 'expo-clipboard';

const { width } = Dimensions.get("window");

// Imagens (Ajuste os caminhos conforme seu projeto)
const imgConsultorio = require("@/assets/images/imgReserva.png"); // Imagem principal
const imgMap = require("@/assets/images/Lugar que fica consultorio.jpg");

export default function DetalhesReserva() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Pega o ID do consultório passado na rota
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Estados
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Dados Simulados (Aqui você faria o fetch('http://localhost:3000/consultorios/${id}'))
  const consultorio = {
    nome: "NutriVida Centro",
    endereco: "Avenida São Sebastião, 357, São Paulo",
    telefone: "(16) 99999-9090",
    descricao: "Consultório especializado em nutrição esportiva e reeducação alimentar com equipamentos de última geração.",
    horarios: [
      { dia: "Segunda-feira", hora: "09:00 - 21:00" },
      { dia: "Terça-feira", hora: "09:00 - 21:00" },
      { dia: "Quarta-feira", hora: "09:00 - 21:00" },
      { dia: "Sábado", hora: "08:00 - 17:00" },
      { dia: "Domingo", hora: "Fechado" },
    ]
  };

  const servicos = [
    { id: 1, nome: "Consulta Completa", descricao: "Bioimpedância, dieta personalizada e retorno em 30 dias.", preco: 150.00 },
    { id: 2, nome: "Retorno Mensal", descricao: "Ajuste de dieta e nova medição corporal.", preco: 80.00 },
    { id: 3, nome: "Plano Esportivo", descricao: "Focado em hipertrofia e performance.", preco: 200.00 },
  ];

  const diasMock = [10, 11, 12, 13, 14, 15, 16]; // Simulando dias do mês
  const horariosMock = ["09:00", "09:45", "10:30", "11:15", "14:00", "15:30", "16:45"];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const copiarTelefone = async () => {
    await Clipboard.setStringAsync(consultorio.telefone);
    Alert.alert("Copiado!", "Número de telefone copiado para a área de transferência.");
  };

  const abrirModalReserva = (servico) => {
    setSelectedService(servico);
    setSelectedDate(null);
    setSelectedTime(null);
    setModalVisible(true);
  };

  const confirmarReserva = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert("Atenção", "Por favor, selecione uma data e um horário.");
      return;
    }
    
    // Aqui iria o seu fetch POST para http://localhost:3000/agendamentos
    Alert.alert(
      "Sucesso!", 
      "Sua reserva foi confirmada.",
      [{ text: "OK", onPress: () => {
        setModalVisible(false);
        router.push("/"); // Volta para o dashboard
      }}]
    );
  };

  return (
    <LinearGradient colors={["#0a1f1a", "#0f172a"]} style={styles.gradient}>
      
      {/* Cabeçalho Voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fazer Reserva</Text>
        <View style={{ width: 40 }} /> {/* Espaçador */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <Animated.View style={{ opacity: fadeAnim }}>
          
          {/* Imagem e Info do Consultório */}
          <View style={styles.clinicHero}>
            <Image source={imgConsultorio} style={styles.heroImage} />
            <View style={styles.clinicHeaderInfo}>
              <Text style={styles.clinicName}>{consultorio.nome}</Text>
              <View style={styles.locationRow}>
                <MapPin color="#00E676" size={16} />
                <Text style={styles.clinicAddress}>{consultorio.endereco}</Text>
              </View>
            </View>
          </View>

          {/* Seção Sobre e Horários (O que ficava na direita do HTML) */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações</Text>
            
            <View style={styles.infoCard}>
              <View style={styles.contactRow}>
                <View>
                  <Text style={styles.infoLabel}>Telefone</Text>
                  <Text style={styles.infoValue}>{consultorio.telefone}</Text>
                </View>
                <TouchableOpacity style={styles.copyButton} onPress={copiarTelefone}>
                  <Copy color="#00E676" size={18} />
                  <Text style={styles.copyText}>Copiar</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.aboutRow}>
                <Info color="#00E676" size={20} style={{ marginTop: 2 }} />
                <Text style={styles.aboutText}>{consultorio.descricao}</Text>
              </View>

              <View style={styles.divider} />

              <Text style={styles.infoLabel}>Horários de Funcionamento</Text>
              {consultorio.horarios.map((item, index) => (
                <View key={index} style={styles.scheduleRow}>
                  <Text style={styles.scheduleDay}>{item.dia}</Text>
                  <Text style={styles.scheduleTime}>{item.hora}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Lista de Serviços */}
          <View style={styles.servicesSection}>
            <Text style={styles.sectionTitle}>Serviços Disponíveis</Text>
            
            {servicos.map((servico) => (
              <View key={servico.id} style={styles.serviceCard}>
                <View style={styles.serviceContent}>
                  <Text style={styles.serviceName}>{servico.nome}</Text>
                  <Text style={styles.serviceDesc} numberOfLines={2}>
                    {servico.descricao}
                  </Text>
                  <Text style={styles.servicePrice}>
                    R$ {servico.preco.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.bookButton}
                  onPress={() => abrirModalReserva(servico)}
                >
                  <Text style={styles.bookButtonText}>Reservar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

        </Animated.View>
      </ScrollView>

      {/* Modal de Data e Hora (Substitui a div .DataReserva lateral) */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Escolher Data e Hora</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <X color="#ef4444" size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              
              {/* Calendário Simplificado (Dias) */}
              <Text style={styles.modalSectionTitle}>Março 2026</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysScroll}>
                {diasMock.map((dia) => {
                  const isSelected = selectedDate === dia;
                  return (
                    <TouchableOpacity
                      key={dia}
                      style={[styles.dayCard, isSelected && styles.dayCardSelected]}
                      onPress={() => setSelectedDate(dia)}
                    >
                      <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                        {dia}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Horários */}
              <Text style={styles.modalSectionTitle}>Horários Disponíveis</Text>
              <View style={styles.timesGrid}>
                {horariosMock.map((hora) => {
                  const isSelected = selectedTime === hora;
                  return (
                    <TouchableOpacity
                      key={hora}
                      style={[styles.timeCard, isSelected && styles.timeCardSelected]}
                      onPress={() => setSelectedTime(hora)}
                    >
                      <Text style={[styles.timeText, isSelected && styles.timeTextSelected]}>
                        {hora}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Resumo da Consulta */}
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>{selectedService?.nome}</Text>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Data</Text>
                  <Text style={styles.summaryValue}>
                    {selectedDate ? `${selectedDate} de Março` : "Selecione"}
                  </Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Horário</Text>
                  <Text style={styles.summaryValue}>
                    {selectedTime || "Selecione"}
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Consultório</Text>
                  <Text style={styles.summaryValue}>{consultorio.nome}</Text>
                </View>

                <View style={[styles.summaryRow, { borderBottomWidth: 0, marginTop: 10 }]}>
                  <Text style={styles.summaryLabel}>Total</Text>
                  <Text style={styles.summaryPrice}>
                    R$ {selectedService?.preco.toFixed(2)}
                  </Text>
                </View>
              </View>

              {/* Botão Confirmar */}
              <TouchableOpacity 
                style={[
                  styles.confirmBtn, 
                  (!selectedDate || !selectedTime) && { opacity: 0.5 }
                ]}
                onPress={confirmarReserva}
                activeOpacity={0.8}
              >
                <CheckCircle2 color="#0D332D" size={24} />
                <Text style={styles.confirmBtnText}>Confirmar Agendamento</Text>
              </TouchableOpacity>

            </ScrollView>
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
  backButton: { padding: 5 },
  backArrow: { color: "#00E676", fontSize: 28, fontWeight: "300" },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },

  // Hero Section (Imagem e Info do Consultório)
  clinicHero: { marginBottom: 20 },
  heroImage: { width: "100%", height: 220, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  clinicHeaderInfo: { padding: 20, marginTop: -30, marginHorizontal: 20, backgroundColor: "#0f172a", borderRadius: 20, borderWidth: 1, borderColor: "rgba(0, 230, 118, 0.2)", elevation: 10 },
  clinicName: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  clinicAddress: { color: "#94a3b8", fontSize: 14, flex: 1 },

  // Sections Base
  infoSection: { paddingHorizontal: 20, marginBottom: 25 },
  servicesSection: { paddingHorizontal: 20, paddingBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 15 },

  // Info Card (Direita do HTML)
  infoCard: { backgroundColor: "rgba(30, 41, 59, 0.4)", borderRadius: 20, padding: 20, borderWidth: 1, borderColor: "rgba(0, 230, 118, 0.15)" },
  contactRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  infoLabel: { fontSize: 13, color: "#94a3b8", marginBottom: 4 },
  infoValue: { fontSize: 16, color: "#fff", fontWeight: "600" },
  copyButton: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(0, 230, 118, 0.1)", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: "#00E676" },
  copyText: { color: "#00E676", fontWeight: "600", fontSize: 13 },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.05)", marginVertical: 15 },
  aboutRow: { flexDirection: "row", gap: 10 },
  aboutText: { color: "#94a3b8", fontSize: 14, lineHeight: 22, flex: 1 },
  scheduleRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
  scheduleDay: { color: "#94a3b8", fontSize: 14 },
  scheduleTime: { color: "#fff", fontSize: 14, fontWeight: "600" },

  // Service Cards
  serviceCard: { backgroundColor: "rgba(30, 41, 59, 0.4)", borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "rgba(0, 230, 118, 0.15)" },
  serviceContent: { marginBottom: 15 },
  serviceName: { fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 6 },
  serviceDesc: { fontSize: 14, color: "#94a3b8", marginBottom: 10 },
  servicePrice: { fontSize: 20, fontWeight: "bold", color: "#00E676" },
  bookButton: { backgroundColor: "rgba(0, 230, 118, 0.1)", borderWidth: 1, borderColor: "#00E676", borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  bookButtonText: { color: "#00E676", fontWeight: "bold", fontSize: 16 },

  // Modal Styles
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.7)" },
  modalContent: { backgroundColor: "#0f172a", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 25, height: "90%", borderWidth: 1, borderColor: "rgba(0, 230, 118, 0.3)" },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 },
  modalTitle: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  closeButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(239, 68, 68, 0.1)", justifyContent: "center", alignItems: "center" },
  
  modalSectionTitle: { fontSize: 16, fontWeight: "bold", color: "#fff", marginBottom: 12, marginTop: 10 },
  
  // Calendar Days
  daysScroll: { marginBottom: 20 },
  dayCard: { width: 60, height: 70, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12, marginRight: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  dayCardSelected: { backgroundColor: "#00E676", borderColor: "#00E676" },
  dayText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  dayTextSelected: { color: "#0D332D" },

  // Times Grid
  timesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 25 },
  timeCard: { width: (width - 70) / 3, paddingVertical: 12, alignItems: "center", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  timeCardSelected: { backgroundColor: "#00E676", borderColor: "#00E676" },
  timeText: { fontSize: 15, fontWeight: "600", color: "#fff" },
  timeTextSelected: { color: "#0D332D" },

  // Summary
  summaryCard: { backgroundColor: "rgba(0, 230, 118, 0.1)", borderRadius: 16, padding: 20, borderWidth: 1, borderColor: "rgba(0, 230, 118, 0.3)", marginBottom: 25 },
  summaryTitle: { fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 15 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.05)" },
  summaryLabel: { color: "#94a3b8", fontSize: 14 },
  summaryValue: { color: "#fff", fontSize: 14, fontWeight: "600" },
  summaryPrice: { color: "#00E676", fontSize: 22, fontWeight: "bold" },

  // Confirm Button
  confirmBtn: { backgroundColor: "#00E676", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 10, borderRadius: 16, paddingVertical: 18, marginBottom: 20 },
  confirmBtnText: { color: "#0D332D", fontSize: 16, fontWeight: "bold" },
});
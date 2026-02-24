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
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MessageSquare, 
  Check,
  ChevronRight,
  X,
  MapPin,
  Building2
} from "lucide-react-native";

const { width } = Dimensions.get("window");
const perfilIcon = require("@/assets/images/perfilicon.png");
const logoApp = require("@/assets/images/logo.png");

export default function Agendamento() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const consultorios = [
    {
      id: 1,
      nome: "NutriVida Centro",
      endereco: "Av. Principal, 1234 - Centro",
      cidade: "Taquaritinga, SP",
      distancia: "2.5 km",
      avaliacao: "4.9",
      icon: Building2,
    },
    {
      id: 2,
      nome: "NutriVida Shopping",
      endereco: "Shopping Center - 2º piso",
      cidade: "Taquaritinga, SP",
      distancia: "4.1 km",
      avaliacao: "4.8",
      icon: Building2,
    },
    {
      id: 3,
      nome: "NutriVida Premium",
      endereco: "Rua das Flores, 567 - Jardim",
      cidade: "Taquaritinga, SP",
      distancia: "6.3 km",
      avaliacao: "5.0",
      icon: Building2,
    },
  ];

  const servicos = [
    {
      id: 1,
      titulo: "Consulta Nutricional",
      duracao: "50 min",
      preco: "R$ 150",
      descricao: "Avaliação completa e plano personalizado",
      icon: User,
    },
    {
      id: 2,
      titulo: "Retorno",
      duracao: "30 min",
      preco: "R$ 80",
      descricao: "Acompanhamento e ajustes no plano",
      icon: MessageSquare,
    },
    {
      id: 3,
      titulo: "Avaliação Corporal",
      duracao: "40 min",
      preco: "R$ 100",
      descricao: "Bioimpedância e medidas detalhadas",
      icon: Phone,
    },
  ];

  const diasDisponiveis = [
    { dia: "SEG", data: "11", disponivel: true },
    { dia: "TER", data: "12", disponivel: true },
    { dia: "QUA", data: "13", disponivel: false },
    { dia: "QUI", data: "14", disponivel: true },
    { dia: "SEX", data: "15", disponivel: true },
    { dia: "SÁB", data: "16", disponivel: true },
  ];

  const horariosDisponiveis = [
    { id: 1, hora: "08:00", disponivel: true },
    { id: 2, hora: "09:00", disponivel: true },
    { id: 3, hora: "10:00", disponivel: false },
    { id: 4, hora: "11:00", disponivel: true },
    { id: 5, hora: "14:00", disponivel: true },
    { id: 6, hora: "15:00", disponivel: true },
    { id: 7, hora: "16:00", disponivel: true },
    { id: 8, hora: "17:00", disponivel: false },
  ];

  const handleConfirmar = () => {
    if (selectedClinic && selectedService && selectedDate && selectedTime) {
      setModalVisible(true);
    }
  };

  const getProgressPercentage = () => {
    let steps = 0;
    if (selectedClinic) steps++;
    if (selectedService) steps++;
    if (selectedDate) steps++;
    if (selectedTime) steps++;
    return (steps / 4) * 100;
  };

  return (
    <LinearGradient colors={["#0a1f1a", "#0f172a"]} style={styles.gradient}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Image source={logoApp} style={styles.logo} resizeMode="contain" />
          <Text style={styles.headerTitle}>Agendamento</Text>
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
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${getProgressPercentage()}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {selectedClinic && selectedService && selectedDate && selectedTime
              ? "Pronto para confirmar!"
              : "Complete as informações"}
          </Text>
        </View>

        {/* ETAPA 1: Escolher Consultório */}
        <Animated.View
          style={[
            styles.section,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepNumber}>1</Text>
            </View>
            <Text style={styles.sectionTitle}>Escolha o Consultório</Text>
          </View>

          {consultorios.map((consultorio) => {
            const IconComponent = consultorio.icon;
            const isSelected = selectedClinic?.id === consultorio.id;
            return (
              <TouchableOpacity
                key={consultorio.id}
                style={[
                  styles.clinicCard,
                  isSelected && styles.clinicCardSelected,
                ]}
                onPress={() => {
                  setSelectedClinic(consultorio);
                  // Reset etapas seguintes
                  setSelectedService(null);
                  setSelectedDate(null);
                  setSelectedTime(null);
                }}
                activeOpacity={0.8}
              >
                <View style={styles.clinicLeft}>
                  <View
                    style={[
                      styles.clinicIcon,
                      isSelected && styles.clinicIconSelected,
                    ]}
                  >
                    <IconComponent
                      color={isSelected ? "#0D332D" : "#00E676"}
                      size={28}
                      strokeWidth={2}
                    />
                  </View>
                  <View style={styles.clinicInfo}>
                    <Text style={styles.clinicName}>{consultorio.nome}</Text>
                    <View style={styles.clinicLocation}>
                      <MapPin color="#bafdbc" size={14} strokeWidth={2} />
                      <Text style={styles.clinicAddress}>{consultorio.endereco}</Text>
                    </View>
                    <View style={styles.clinicDetails}>
                      <Text style={styles.clinicDistance}>📍 {consultorio.distancia}</Text>
                      <Text style={styles.clinicRating}>⭐ {consultorio.avaliacao}</Text>
                    </View>
                  </View>
                </View>
                {isSelected && (
                  <View style={styles.checkmark}>
                    <Check color="#0D332D" size={20} strokeWidth={3} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        {/* ETAPA 2: Escolher Serviço */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View
              style={[
                styles.stepBadge,
                !selectedClinic && styles.stepBadgeInactive,
              ]}
            >
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <Text style={styles.sectionTitle}>Escolha o Serviço</Text>
          </View>

          {servicos.map((servico) => {
            const IconComponent = servico.icon;
            const isSelected = selectedService?.id === servico.id;
            const isDisabled = !selectedClinic;
            return (
              <TouchableOpacity
                key={servico.id}
                style={[
                  styles.serviceCard,
                  isSelected && styles.serviceCardSelected,
                  isDisabled && styles.serviceCardDisabled,
                ]}
                onPress={() => {
                  if (!isDisabled) {
                    setSelectedService(servico);
                    // Reset etapas seguintes
                    setSelectedDate(null);
                    setSelectedTime(null);
                  }
                }}
                activeOpacity={0.8}
                disabled={isDisabled}
              >
                <View style={styles.serviceLeft}>
                  <View
                    style={[
                      styles.serviceIcon,
                      isSelected && styles.serviceIconSelected,
                    ]}
                  >
                    <IconComponent
                      color={isSelected ? "#0D332D" : isDisabled ? "#666" : "#00E676"}
                      size={24}
                      strokeWidth={2}
                    />
                  </View>
                  <View style={styles.serviceInfo}>
                    <Text style={[styles.serviceTitle, isDisabled && styles.disabledText]}>
                      {servico.titulo}
                    </Text>
                    <Text style={[styles.serviceDesc, isDisabled && styles.disabledText]}>
                      {servico.descricao}
                    </Text>
                    <View style={styles.serviceDetails}>
                      <Text style={[styles.serviceDuration, isDisabled && styles.disabledText]}>
                        ⏱ {servico.duracao}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.serviceRight}>
                  <Text style={[styles.servicePrice, isDisabled && styles.disabledText]}>
                    {servico.preco}
                  </Text>
                  {isSelected && (
                    <View style={styles.checkmark}>
                      <Check color="#0D332D" size={16} strokeWidth={3} />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ETAPA 3: Escolher Data */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View
              style={[
                styles.stepBadge,
                (!selectedClinic || !selectedService) && styles.stepBadgeInactive,
              ]}
            >
              <Text style={styles.stepNumber}>3</Text>
            </View>
            <Text style={styles.sectionTitle}>Escolha o Dia</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesScroll}
          >
            {diasDisponiveis.map((item, index) => {
              const isSelected = selectedDate === item.data;
              const isDisabled = !selectedClinic || !selectedService || !item.disponivel;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateCard,
                    isSelected && styles.dateCardSelected,
                    isDisabled && styles.dateCardDisabled,
                  ]}
                  onPress={() => {
                    if (!isDisabled) {
                      setSelectedDate(item.data);
                      setSelectedTime(null);
                    }
                  }}
                  activeOpacity={0.7}
                  disabled={isDisabled}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isSelected && styles.dayTextSelected,
                      isDisabled && styles.dayTextDisabled,
                    ]}
                  >
                    {item.dia}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      isSelected && styles.dateTextSelected,
                      isDisabled && styles.dateTextDisabled,
                    ]}
                  >
                    {item.data}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* ETAPA 4: Escolher Horário */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View
              style={[
                styles.stepBadge,
                (!selectedClinic || !selectedService || !selectedDate) &&
                  styles.stepBadgeInactive,
              ]}
            >
              <Text style={styles.stepNumber}>4</Text>
            </View>
            <Text style={styles.sectionTitle}>Escolha o Horário</Text>
          </View>

          <View style={styles.timesGrid}>
            {horariosDisponiveis.map((horario) => {
              const isSelected = selectedTime === horario.hora;
              const isDisabled = !selectedClinic || !selectedService || !selectedDate || !horario.disponivel;
              return (
                <TouchableOpacity
                  key={horario.id}
                  style={[
                    styles.timeCard,
                    isSelected && styles.timeCardSelected,
                    isDisabled && styles.timeCardDisabled,
                  ]}
                  onPress={() => !isDisabled && setSelectedTime(horario.hora)}
                  activeOpacity={0.7}
                  disabled={isDisabled}
                >
                  <Clock
                    color={
                      isSelected
                        ? "#0D332D"
                        : isDisabled
                        ? "#444"
                        : "#00E676"
                    }
                    size={20}
                    strokeWidth={2}
                  />
                  <Text
                    style={[
                      styles.timeText,
                      isSelected && styles.timeTextSelected,
                      isDisabled && styles.timeTextDisabled,
                    ]}
                  >
                    {horario.hora}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Resumo */}
        {selectedClinic && selectedService && selectedDate && selectedTime && (
          <Animated.View style={[styles.summaryCard, { opacity: fadeAnim }]}>
            <Text style={styles.summaryTitle}>Resumo do Agendamento</Text>
            
            <View style={styles.summaryItem}>
              <Building2 color="#00E676" size={20} strokeWidth={2} />
              <View style={styles.summaryInfo}>
                <Text style={styles.summaryLabel}>Consultório</Text>
                <Text style={styles.summaryValue}>{selectedClinic.nome}</Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <User color="#00E676" size={20} strokeWidth={2} />
              <View style={styles.summaryInfo}>
                <Text style={styles.summaryLabel}>Serviço</Text>
                <Text style={styles.summaryValue}>{selectedService.titulo}</Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <Calendar color="#00E676" size={20} strokeWidth={2} />
              <View style={styles.summaryInfo}>
                <Text style={styles.summaryLabel}>Data</Text>
                <Text style={styles.summaryValue}>
                  {selectedDate}/11/2025
                </Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <Clock color="#00E676" size={20} strokeWidth={2} />
              <View style={styles.summaryInfo}>
                <Text style={styles.summaryLabel}>Horário</Text>
                <Text style={styles.summaryValue}>{selectedTime}</Text>
              </View>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryTotal}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>
                {selectedService.preco}
              </Text>
            </View>
          </Animated.View>
        )}

        {/* Botão Confirmar */}
        <TouchableOpacity
          style={[
            styles.confirmButton,
            (!selectedClinic || !selectedService || !selectedDate || !selectedTime) &&
              styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirmar}
          activeOpacity={0.8}
          disabled={!selectedClinic || !selectedService || !selectedDate || !selectedTime}
        >
          <Text style={styles.confirmButtonText}>Confirmar Agendamento</Text>
          <ChevronRight color="#0D332D" size={24} strokeWidth={2.5} />
        </TouchableOpacity>

        {/* Informações Adicionais */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📋 Informações Importantes</Text>
          <Text style={styles.infoText}>
            • Chegue com 10 minutos de antecedência{"\n"}
            • Traga exames recentes (se tiver){"\n"}
            • Cancele com 24h de antecedência{"\n"}
            • Confirmação será enviada por SMS
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Dúvidas? Entre em contato: (16) 99999-9999
          </Text>
        </View>
      </ScrollView>

      {/* Modal de Confirmação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.7}
            >
              <X color="#fff" size={24} strokeWidth={2} />
            </TouchableOpacity>

            <View style={styles.successIcon}>
              <Check color="#00E676" size={48} strokeWidth={3} />
            </View>

            <Text style={styles.modalTitle}>Agendamento Confirmado!</Text>
            <Text style={styles.modalDescription}>
              Seu atendimento foi agendado com sucesso. Você receberá uma
              confirmação por SMS em breve.
            </Text>

            <View style={styles.modalDetails}>
              <Text style={styles.modalDetailText}>
                🏢 {selectedClinic?.nome}
              </Text>
              <Text style={styles.modalDetailText}>
                📅 {selectedDate}/11/2025 às {selectedTime}
              </Text>
              <Text style={styles.modalDetailText}>
                {selectedService?.titulo}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                router.push("/");
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Voltar ao Início</Text>
            </TouchableOpacity>
          </Animated.View>
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

  container: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  // Progress
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  progressBar: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#00E676",
    borderRadius: 3,
  },

  progressText: {
    color: "#bafdbc",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
  },

  // Sections
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 15,
  },

  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#00E676",
    justifyContent: "center",
    alignItems: "center",
  },

  stepBadgeInactive: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  stepNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0D332D",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  // Clinic Cards
  clinicCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
  },

  clinicCardSelected: {
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    borderColor: "#00E676",
  },

  clinicLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },

  clinicIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  clinicIconSelected: {
    backgroundColor: "#00E676",
  },

  clinicInfo: {
    flex: 1,
  },

  clinicName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },

  clinicLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },

  clinicAddress: {
    fontSize: 12,
    color: "#bafdbc",
    flex: 1,
  },

  clinicDetails: {
    flexDirection: "row",
    gap: 12,
  },

  clinicDistance: {
    fontSize: 12,
    color: "#00E676",
  },

  clinicRating: {
    fontSize: 12,
    color: "#FFB800",
  },

  // Service Cards
  serviceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
  },

  serviceCardSelected: {
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    borderColor: "#00E676",
  },

  serviceCardDisabled: {
    opacity: 0.4,
  },

  serviceLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },

  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  serviceIconSelected: {
    backgroundColor: "#00E676",
  },

  serviceInfo: {
    flex: 1,
  },

  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },

  serviceDesc: {
    fontSize: 12,
    color: "#bafdbc",
    marginBottom: 6,
  },

  serviceDetails: {
    flexDirection: "row",
  },

  serviceDuration: {
    fontSize: 12,
    color: "#00E676",
  },

  serviceRight: {
    alignItems: "flex-end",
    gap: 8,
  },

  servicePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00E676",
  },

  disabledText: {
    color: "#666",
  },

  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#00E676",
    justifyContent: "center",
    alignItems: "center",
  },

  // Dates
  datesScroll: {
    gap: 12,
  },

  dateCard: {
    width: 70,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
  },

  dateCardSelected: {
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    borderColor: "#00E676",
  },

  dateCardDisabled: {
    opacity: 0.3,
  },

  dayText: {
    fontSize: 12,
    color: "#bafdbc",
    fontWeight: "600",
    marginBottom: 8,
  },

  dayTextSelected: {
    color: "#00E676",
  },

  dayTextDisabled: {
    color: "#666",
  },

  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  dateTextSelected: {
    color: "#00E676",
  },

  dateTextDisabled: {
    color: "#666",
  },

  // Times
  timesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  timeCard: {
    width: (width - 64) / 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 14,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
  },

  timeCardSelected: {
    backgroundColor: "#00E676",
    borderColor: "#00E676",
  },

  timeCardDisabled: {
    opacity: 0.3,
  },

  timeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },

  timeTextSelected: {
    color: "#0D332D",
  },

  timeTextDisabled: {
    color: "#666",
  },

  // Summary
  summaryCard: {
    marginHorizontal: 20,
    marginTop: 25,
    backgroundColor: "rgba(0, 230, 118, 0.1)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: "rgba(0, 230, 118, 0.3)",
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },

  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },

  summaryInfo: {
    flex: 1,
  },

  summaryLabel: {
    fontSize: 12,
    color: "#bafdbc",
    marginBottom: 2,
  },

  summaryValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },

  summaryDivider: {
    height: 1,
    backgroundColor: "rgba(0, 230, 118, 0.3)",
    marginVertical: 12,
  },

  summaryTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#bafdbc",
  },

  summaryTotalValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00E676",
  },

  // Confirm Button
  confirmButton: {
    marginHorizontal: 20,
    marginTop: 25,
    backgroundColor: "#00E676",
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    elevation: 8,
    shadowColor: "#00E676",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },

  confirmButtonDisabled: {
    backgroundColor: "rgba(255,255,255,0.1)",
    shadowOpacity: 0,
  },

  confirmButtonText: {
    color: "#0D332D",
    fontSize: 17,
    fontWeight: "bold",
  },

  // Info Card
  infoCard: {
    marginHorizontal: 20,
    marginTop: 25,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 16,
    padding: 18,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  infoText: {
    fontSize: 13,
    color: "#bafdbc",
    lineHeight: 20,
  },

  // Modal
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
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.3)",
  },

  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(0, 230, 118, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },

  modalDescription: {
    fontSize: 15,
    color: "#bafdbc",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },

  modalDetails: {
    width: "100%",
    backgroundColor: "rgba(0, 230, 118, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  modalDetailText: {
    fontSize: 14,
    color: "#00E676",
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 4,
  },

  modalButton: {
    width: "100%",
    backgroundColor: "#00E676",
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
  },

  modalButtonText: {
    color: "#0D332D",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Footer
  footer: {
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 10,
  },

  footerText: {
    color: "rgba(186, 253, 188, 0.5)",
    fontSize: 12,
    textAlign: "center",
  },
});
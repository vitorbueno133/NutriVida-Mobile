import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown, ChevronUp, ChevronLeft, UtensilsCrossed, Calendar, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardapioAberto, setCardapioAberto] = useState(null);
  const [diaAberto, setDiaAberto] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function buscarDados() {
      try {
        const resposta = await fetch('http://192.168.3.243:3000/dados');
        const json = await resposta.json();
        setDados(json);
      } catch (erro) {
        console.log("Erro:", erro);
      } finally {
        setLoading(false);
      }
    }
    buscarDados();
  }, []);

  if (loading) {
    return (
      <LinearGradient colors={["#0a1f1a", "#0f172a"]} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00E676" />
        <Text style={styles.loadingText}>Carregando cardápios...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#0a1f1a", "#0f172a"]} style={styles.gradient}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <ChevronLeft color="#00E676" size={26} strokeWidth={2.5} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.headerTitleRow}>
            <UtensilsCrossed color="#00E676" size={22} strokeWidth={2} />
            <Text style={styles.headerTitle}>Meus Cardápios</Text>
          </View>
          <Text style={styles.headerSub}>
            {dados.length} plano{dados.length !== 1 ? 's' : ''} disponível{dados.length !== 1 ? 'is' : ''}
          </Text>
        </View>
        
        <View style={styles.backButtonPlaceholder} />
      </View>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={dados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          let cardapio;
          try {
            cardapio = JSON.parse(item.cardapio_texto);
          } catch {
            return null;
          }

          const aberto = cardapioAberto === item.id;

          return (
            <View style={styles.card}>
              {/* Card Header — clicável */}
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => setCardapioAberto(aberto ? null : item.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={aberto ? ["#064e3b", "#0f2d1e"] : ["#0f2d1e", "#0a1f1a"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.cardHeaderGradient}
                >
                  <View style={styles.cardHeaderLeft}>
                    <View style={styles.cardIconBg}>
                      <Calendar color="#00E676" size={20} strokeWidth={2} />
                    </View>
                    <View>
                      <Text style={styles.cardNome}>{cardapio.name}</Text>
                      <Text style={styles.cardSubtitle}>
                        {cardapio.refeicoes?.length || 0} dias no plano
                      </Text>
                    </View>
                  </View>
                  {aberto
                    ? <ChevronUp color="#00E676" size={20} strokeWidth={2.5} />
                    : <ChevronDown color="#00E676" size={20} strokeWidth={2.5} />
                  }
                </LinearGradient>
              </TouchableOpacity>

              {/* DIAS */}
              {aberto && cardapio.refeicoes?.map((dia, indexDia) => {
                const diaKey = `${item.id}-${indexDia}`;
                const diaExpandido = diaAberto === diaKey;

                return (
                  <View key={indexDia} style={styles.diaContainer}>
                    {/* Dia clicável */}
                    <TouchableOpacity
                      style={styles.diaTouchable}
                      onPress={() => setDiaAberto(diaExpandido ? null : diaKey)}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.diaBullet, diaExpandido && styles.diaBulletActive]} />
                      <Text style={[styles.diaTitulo, diaExpandido && styles.diaTituloActive]}>
                        {dia.nome}
                      </Text>
                      {diaExpandido
                        ? <ChevronUp color="#00E676" size={16} strokeWidth={2.5} />
                        : <ChevronDown color="#bafdbc" size={16} strokeWidth={2} />
                      }
                    </TouchableOpacity>

                    {/* Refeições do Dia */}
                    {diaExpandido && dia.refeicoes?.map((refeicao, i) => (
                      <View key={i} style={styles.refeicaoCard}>
                        <View style={styles.refeicaoHeader}>
                          <View style={styles.refeicaoIconBg}>
                            <Clock color="#00E676" size={14} strokeWidth={2.5} />
                          </View>
                          <Text style={styles.refeicaoTitulo}>{refeicao.nome}</Text>
                          <View style={styles.horarioBadge}>
                            <Text style={styles.horarioText}>⏰ {refeicao.horario}</Text>
                          </View>
                        </View>

                        <View style={styles.alimentosList}>
                          {refeicao.alimentos?.map((alimento, j) => (
                            <View key={j} style={styles.alimentoRow}>
                              <View style={styles.alimentoBullet} />
                              <Text style={styles.alimentoText}>{alimento}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    ))}
                  </View>
                );
              })}

              {/* Bottom accent line */}
              {aberto && (
                <View style={styles.cardFooter}>
                  <View style={styles.cardFooterLine} />
                </View>
              )}
            </View>
          );
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },

  loadingText: {
    color: '#bafdbc',
    fontSize: 15,
    fontWeight: '500',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 18,
    backgroundColor: 'rgba(10, 31, 26, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 230, 118, 0.2)',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 230, 118, 0.3)',
  },

  backButtonPlaceholder: {
    width: 40,
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  headerSub: {
    color: '#bafdbc',
    fontSize: 12,
  },

  // List
  list: {
    flex: 1,
  },

  listContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 14,
  },

  // Card
  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 230, 118, 0.2)',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  cardHeader: {
    borderRadius: 18,
    overflow: 'hidden',
  },

  cardHeaderGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },

  cardIconBg: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0, 230, 118, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 230, 118, 0.3)',
  },

  cardNome: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 2,
  },

  cardSubtitle: {
    color: '#bafdbc',
    fontSize: 12,
  },

  // Dias
  diaContainer: {
    marginHorizontal: 14,
    marginTop: 10,
    backgroundColor: 'rgba(0, 230, 118, 0.05)',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.12)',
    marginBottom: 2,
  },

  diaTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },

  diaBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 230, 118, 0.35)',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 230, 118, 0.5)',
  },

  diaBulletActive: {
    backgroundColor: '#00E676',
    borderColor: '#00E676',
  },

  diaTitulo: {
    color: '#bafdbc',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },

  diaTituloActive: {
    color: '#fff',
  },

  // Refeições
  refeicaoCard: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#00E676',
  },

  refeicaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    flexWrap: 'wrap',
  },

  refeicaoIconBg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 230, 118, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  refeicaoTitulo: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },

  horarioBadge: {
    backgroundColor: 'rgba(0, 230, 118, 0.12)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.2)',
  },

  horarioText: {
    color: '#bafdbc',
    fontSize: 11,
    fontWeight: '600',
  },

  alimentosList: {
    gap: 6,
  },

  alimentoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  alimentoBullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#00E676',
    marginTop: 7,
  },

  alimentoText: {
    flex: 1,
    color: '#d1fae5',
    fontSize: 13,
    lineHeight: 19,
  },

  // Card Footer
  cardFooter: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },

  cardFooterLine: {
    width: 50,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(0, 230, 118, 0.3)',
  },
});
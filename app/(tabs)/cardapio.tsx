import React, { useState, useRef } from "react";
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
import CryptoJS from "crypto-js";
import {
  ChevronLeft,
  User,
  Target,
  Utensils,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react-native";

// ── helpers ───────────────────────────────────────────────────────────────────
function mostrarLoading(setLoading: (v: boolean) => void) { setLoading(true); }
function esconderLoading(setLoading: (v: boolean) => void) { setLoading(false); }

// Faz fetch e retorna JSON com segurança — evita crash se a API retornar HTML
async function safeFetch(url: string, options: RequestInit) {
  const resp = await fetch(url, options);
  const text = await resp.text();
  try {
    return { ok: resp.ok, status: resp.status, data: JSON.parse(text) };
  } catch {
    console.error(`❌ Resposta não-JSON de ${url} (status ${resp.status}):`, text.slice(0, 300));
    return { ok: false, status: resp.status, data: null };
  }
}

// ── component ─────────────────────────────────────────────────────────────────
export default function CardapioForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ texto: string; tipo: "sucesso" | "erro" } | null>(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
// 🔥 ADICIONE ESTE STATE JUNTO COM OS OUTROS
const [cardapioGerado, setCardapioGerado] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    imc: "",
    altura: "",
    peso: "70",
    sexo: "" as "masculino" | "feminino" | "",
    nivelAtividade: "sedentario",
    tempoPreparo: "pouco",
    trabalho: "",
    rotina: "",
    temAlergia: null as boolean | null,
    alergias: "",
    segueDieta: null as boolean | null,
    dieta: "",
    objetivo: "" as "ganhar_peso" | "perder_peso" | "outros" | "",
    objetivoOutros: "",
    praticaEsporte: null as boolean | null,
    esporte: "",
    alimentosFavoritos: "",
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const showToast = (texto: string, tipo: "sucesso" | "erro") => {
    setToast({ texto, tipo });
    setTimeout(() => setToast(null), 3000);
  };

  const animateStep = (cb: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 40, duration: 0, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 280, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 280, useNativeDriver: true }),
      ]),
    ]).start();
    setTimeout(cb, 180);
  };

  const nextStep = () => { if (step < totalSteps) animateStep(() => setStep(s => s + 1)); };
  const prevStep = () => {
    if (step > 1) animateStep(() => setStep(s => s - 1));
    else router.back();
  };

  // ── submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    // ✅ Sem AsyncStorage — usuario_id é null para usuários não logados
    // O backend foi atualizado para aceitar usuario_id nulo

    if (!formData.nome.trim())            return showToast("Preencha o Nome completo.", "erro");
    const idade = parseInt(formData.idade, 10);
    if (isNaN(idade) || idade <= 0)       return showToast("Insira uma idade válida.", "erro");
    const imc = parseFloat(formData.imc.replace(",", "."));
    if (isNaN(imc) || imc <= 0)           return showToast("Insira um IMC válido.", "erro");
    const altura = parseFloat(formData.altura.replace(",", "."));
    if (isNaN(altura) || altura < 0.5)   return showToast("Insira uma altura válida (ex: 1.75).", "erro");
    const peso = parseFloat(formData.peso);
    if (isNaN(peso) || peso <= 0)         return showToast("Insira um peso válido.", "erro");
    if (!formData.sexo)                   return showToast("Selecione o Sexo.", "erro");
    if (!formData.objetivo)               return showToast("Selecione um objetivo alimentar.", "erro");
    if (formData.objetivo === "outros" && !formData.objetivoOutros.trim())
                                          return showToast("Descreva seu objetivo em 'Outros'.", "erro");
    if (!formData.nivelAtividade)         return showToast("Selecione o nível de atividade física.", "erro");
    if (!formData.tempoPreparo)           return showToast("Selecione o tempo de preparo.", "erro");
    if (!formData.trabalho.trim())        return showToast("Informe o tipo de trabalho.", "erro");
    if (!formData.rotina.trim())          return showToast("Descreva sua rotina.", "erro");
    if (formData.temAlergia === null)     return showToast("Informe se possui alergia alimentar.", "erro");
    if (formData.temAlergia && !formData.alergias.trim())
                                          return showToast("Preencha o campo de alergias.", "erro");
    if (formData.segueDieta === null)     return showToast("Informe se segue alguma dieta.", "erro");
    if (formData.segueDieta && !formData.dieta.trim())
                                          return showToast("Preencha o campo sobre a dieta.", "erro");
    if (formData.praticaEsporte === null) return showToast("Informe se pratica algum esporte.", "erro");
    if (formData.praticaEsporte && !formData.esporte.trim())
                                          return showToast("Preencha o campo de esporte.", "erro");

    const alimentosList = formData.alimentosFavoritos
      .split(",").map(a => a.trim()).filter(a => a.length > 0);
    if (alimentosList.length > 3) return showToast("Máximo 3 alimentos favoritos.", "erro");

    let objetivoFinal = "";
    if (formData.objetivo === "ganhar_peso") objetivoFinal = "Ganhar peso";
    else if (formData.objetivo === "perder_peso") objetivoFinal = "Perder peso";
    else objetivoFinal = formData.objetivoOutros;

    const dados = {
      usuario_id: null, // sem login obrigatório
      name: formData.nome,
      age: idade,
      imc,
      height: altura,
      weight: peso,
      gender: formData.sexo,
      objective: objetivoFinal,
      level: formData.nivelAtividade,
      alergia: formData.temAlergia ? formData.alergias : "Nenhuma",
      trabalho: formData.trabalho,
      alimentosFavoritos: alimentosList,
      esporte: formData.praticaEsporte ? formData.esporte : "Nenhum",
      dietaAtual: formData.segueDieta ? formData.dieta : "Nenhuma",
      rotina: formData.rotina,
      tempoPreparo: formData.tempoPreparo,
    };

    mostrarLoading(setLoading);

    try {
      // 1. Salvar respostas
      const { ok: ok1, data: respostaBackend } = await safeFetch(
        "http://192.168.3.243:3000/respostas",
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) }
      );

      if (!ok1 || !respostaBackend?.sucesso) {
        esconderLoading(setLoading);
        return showToast("Erro ao salvar respostas. Verifique o servidor.", "erro");
      }
      const respostas_id = respostaBackend.respostas_id;

      // 2. Gerar cardápio
      const { ok: ok2, data: result } = await safeFetch(
        `http://192.168.3.243:3000/cardapio/CardapioCriado?timestamp=${Date.now()}`,
        { method: "POST", headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" }, body: JSON.stringify(dados) }
      );

      if (!ok2 || !result) {
        esconderLoading(setLoading);
        return showToast("Erro ao gerar o cardápio. Verifique o servidor.", "erro");
      }

      const hash_respostas = CryptoJS.SHA256(JSON.stringify(dados)).toString();
      const cardapioParaSalvar =
  typeof result.data === "string"
    ? result.data
    : JSON.stringify(result.data, null, 2);

      // 3. Salvar cardápio (silencioso se falhar)
      await safeFetch("http://192.168.3.243:3000/salvarCardapio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: null,
          respostas_id,
          hash_respostas,
          cardapio_texto: cardapioParaSalvar,
          respostas_formulario: dados,
        }),
      });

      esconderLoading(setLoading);
      showToast("Cardápio gerado com sucesso!", "sucesso");
      setCardapioGerado(cardapioParaSalvar);

    } catch (error) {
      esconderLoading(setLoading);
      showToast("Erro de conexão com o servidor.", "erro");
      console.error("Erro geral:", error);
    }
  };

  // ── UI helpers ────────────────────────────────────────────────────────────
  const Chip = ({ label, emoji, selected, onPress, subtitle }: {
    label: string; emoji?: string; selected: boolean; onPress: () => void; subtitle?: string
  }) => (
    <TouchableOpacity style={[styles.chip, selected && styles.chipSelected]} onPress={onPress} activeOpacity={0.75}>
      {emoji ? <Text style={styles.chipEmoji}>{emoji}</Text> : null}
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
      {subtitle ? <Text style={styles.chipSub}>{subtitle}</Text> : null}
    </TouchableOpacity>
  );

  const RadioPair = ({ label, valueTrue, valueFalse, current, onChange }: {
    label: string; valueTrue: string; valueFalse: string; current: boolean | null; onChange: (v: boolean) => void
  }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity style={[styles.radioButton, current === true && styles.radioSelected]} onPress={() => onChange(true)} activeOpacity={0.75}>
          <Text style={styles.radioEmoji}>✅</Text><Text style={styles.radioLabel}>{valueTrue}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.radioButton, current === false && styles.radioSelected]} onPress={() => onChange(false)} activeOpacity={0.75}>
          <Text style={styles.radioEmoji}>❌</Text><Text style={styles.radioLabel}>{valueFalse}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const stepMeta = [
    { title: "Dados Pessoais", desc: "Vamos começar com o básico!",  Icon: User },
    { title: "Estilo de Vida", desc: "Como é o seu dia a dia?",      Icon: Clock },
    { title: "Objetivos",      desc: "O que você busca alcançar?",   Icon: Target },
    { title: "Restrições",     desc: "Algo que devemos considerar?", Icon: Utensils },
  ];
  const { title, desc } = stepMeta[step - 1];
  const animatedStyle = { opacity: fadeAnim, transform: [{ translateX: slideAnim }] };

  const renderStep = () => {
    switch (step) {
      case 1: return (
        <Animated.View style={[styles.stepContent, animatedStyle]}>
          <SectionTitle title="Dados Pessoais" />
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput style={styles.input} placeholder="Seu nome completo" placeholderTextColor="rgba(186,253,188,0.4)" value={formData.nome} onChangeText={v => setFormData(f => ({ ...f, nome: v }))} />
          </View>
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Idade</Text>
              <TextInput style={styles.input} placeholder="25" placeholderTextColor="rgba(186,253,188,0.4)" keyboardType="numeric" value={formData.idade} onChangeText={v => setFormData(f => ({ ...f, idade: v }))} />
            </View>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>IMC</Text>
              <TextInput style={styles.input} placeholder="Ex: 22.5" placeholderTextColor="rgba(186,253,188,0.4)" keyboardType="decimal-pad" value={formData.imc} onChangeText={v => setFormData(f => ({ ...f, imc: v }))} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Altura (m)</Text>
              <TextInput style={styles.input} placeholder="1.75" placeholderTextColor="rgba(186,253,188,0.4)" keyboardType="decimal-pad" value={formData.altura} onChangeText={v => setFormData(f => ({ ...f, altura: v }))} />
            </View>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Peso (kg)</Text>
              <TextInput style={styles.input} placeholder="70" placeholderTextColor="rgba(186,253,188,0.4)" keyboardType="numeric" value={formData.peso} onChangeText={v => setFormData(f => ({ ...f, peso: v }))} />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sexo</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity style={[styles.radioButton, formData.sexo === "masculino" && styles.radioSelected]} onPress={() => setFormData(f => ({ ...f, sexo: "masculino" }))} activeOpacity={0.75}>
                <Text style={styles.radioEmoji}>👨</Text><Text style={styles.radioLabel}>Masculino</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.radioButton, formData.sexo === "feminino" && styles.radioSelected]} onPress={() => setFormData(f => ({ ...f, sexo: "feminino" }))} activeOpacity={0.75}>
                <Text style={styles.radioEmoji}>👩</Text><Text style={styles.radioLabel}>Feminino</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      );
      case 2: return (
        <Animated.View style={[styles.stepContent, animatedStyle]}>
          <SectionTitle title="Estilo de Vida" />
          <View style={styles.inputGroup}>
            <Text style={styles.label}>⚡ Nível de Atividade Física</Text>
            <View style={styles.chipGroup}>
              {[{ label: "Sedentário", emoji: "🛋️", value: "sedentario" }, { label: "Leve", emoji: "🚶", value: "leve" }, { label: "Moderado", emoji: "🏃", value: "moderado" }, { label: "Intenso", emoji: "🔥", value: "intenso" }].map(o => (
                <Chip key={o.value} label={o.label} emoji={o.emoji} selected={formData.nivelAtividade === o.value} onPress={() => setFormData(f => ({ ...f, nivelAtividade: o.value }))} />
              ))}
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>⏱️ Tempo disponível para preparar refeições</Text>
            <View style={styles.chipGroup}>
              {[{ label: "Pouco tempo", emoji: "⚡", value: "pouco", sub: "refeições rápidas" }, { label: "Tempo médio", emoji: "⏱️", value: "medio", sub: "preparo simples" }, { label: "Muito tempo", emoji: "👨‍🍳", value: "muito", sub: "pratos elaborados" }, { label: "Uso marmita", emoji: "🥡", value: "usa_marmita", sub: "pronta" }].map(o => (
                <Chip key={o.value} label={o.label} emoji={o.emoji} subtitle={o.sub} selected={formData.tempoPreparo === o.value} onPress={() => setFormData(f => ({ ...f, tempoPreparo: o.value }))} />
              ))}
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>💼 Com o que você trabalha?</Text>
            <TextInput style={styles.input} placeholder="Ex: vendedor, professor" placeholderTextColor="rgba(186,253,188,0.4)" value={formData.trabalho} onChangeText={v => setFormData(f => ({ ...f, trabalho: v }))} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>📅 Descreva sua rotina diária</Text>
            <TextInput style={[styles.input, styles.textArea]} placeholder="Horários de trabalho, treino, sono..." placeholderTextColor="rgba(186,253,188,0.4)" multiline numberOfLines={4} value={formData.rotina} onChangeText={v => setFormData(f => ({ ...f, rotina: v }))} />
          </View>
        </Animated.View>
      );
      case 3: return (
        <Animated.View style={[styles.stepContent, animatedStyle]}>
          <SectionTitle title="Objetivos" />
          <View style={styles.inputGroup}>
            <Text style={styles.label}>🎯 Qual seu objetivo principal?</Text>
            <View style={styles.chipGroup}>
              {[{ label: "Ganhar peso", emoji: "💪", value: "ganhar_peso" }, { label: "Perder peso", emoji: "🔥", value: "perder_peso" }, { label: "Outros", emoji: "✏️", value: "outros" }].map(o => (
                <Chip key={o.value} label={o.label} emoji={o.emoji} selected={formData.objetivo === o.value} onPress={() => setFormData(f => ({ ...f, objetivo: o.value as any }))} />
              ))}
            </View>
          </View>
          {formData.objetivo === "outros" && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>✏️ Descreva seu objetivo</Text>
              <TextInput style={styles.input} placeholder="Descreva seu objetivo..." placeholderTextColor="rgba(186,253,188,0.4)" value={formData.objetivoOutros} onChangeText={v => setFormData(f => ({ ...f, objetivoOutros: v }))} />
            </View>
          )}
          <RadioPair label="🏃 Você pratica algum esporte?" valueTrue="Sim" valueFalse="Não" current={formData.praticaEsporte} onChange={v => setFormData(f => ({ ...f, praticaEsporte: v, esporte: v ? f.esporte : "" }))} />
          {formData.praticaEsporte && (
            <View style={styles.conditionalCard}>
              <TextInput style={styles.input} placeholder="Qual esporte?" placeholderTextColor="rgba(186,253,188,0.4)" value={formData.esporte} onChangeText={v => setFormData(f => ({ ...f, esporte: v }))} />
            </View>
          )}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>😋 Alimentos que você não tiraria da dieta (máx. 3)</Text>
            <TextInput style={styles.input} placeholder="Ex: chocolate, pizza, sorvete" placeholderTextColor="rgba(186,253,188,0.4)" value={formData.alimentosFavoritos} onChangeText={v => setFormData(f => ({ ...f, alimentosFavoritos: v }))} />
            <Text style={styles.hint}>Separe por vírgula. Vamos tentar encaixar no plano!</Text>
          </View>
        </Animated.View>
      );
      case 4: return (
        <Animated.View style={[styles.stepContent, animatedStyle]}>
          <SectionTitle title="Restrições" />
          <RadioPair label="🚫 Possui alguma alergia alimentar?" valueTrue="Sim" valueFalse="Não" current={formData.temAlergia} onChange={v => setFormData(f => ({ ...f, temAlergia: v, alergias: v ? f.alergias : "" }))} />
          {formData.temAlergia && (
            <View style={styles.conditionalCard}>
              <TextInput style={[styles.input, styles.textArea]} placeholder="Descreva suas alergias..." placeholderTextColor="rgba(186,253,188,0.4)" multiline numberOfLines={3} value={formData.alergias} onChangeText={v => setFormData(f => ({ ...f, alergias: v }))} />
            </View>
          )}
          <RadioPair label="🥗 Está seguindo alguma dieta específica?" valueTrue="Sim" valueFalse="Não" current={formData.segueDieta} onChange={v => setFormData(f => ({ ...f, segueDieta: v, dieta: v ? f.dieta : "" }))} />
          {formData.segueDieta && (
            <View style={styles.conditionalCard}>
              <TextInput style={styles.input} placeholder="Qual dieta você segue?" placeholderTextColor="rgba(186,253,188,0.4)" value={formData.dieta} onChangeText={v => setFormData(f => ({ ...f, dieta: v }))} />
            </View>
          )}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>📋 Resumo do seu perfil</Text>
            {[
              ["Nome",      formData.nome],
              ["Idade",     formData.idade   ? `${formData.idade} anos` : ""],
              ["Peso",      formData.peso    ? `${formData.peso} kg`    : ""],
              ["Altura",    formData.altura  ? `${formData.altura} m`   : ""],
              ["Sexo",      formData.sexo],
              ["Objetivo",  formData.objetivo === "ganhar_peso" ? "Ganhar peso" : formData.objetivo === "perder_peso" ? "Perder peso" : formData.objetivoOutros],
              ["Atividade", formData.nivelAtividade],
              ["Trabalho",  formData.trabalho],
            ].map(([k, v]) => v ? (
              <View key={k} style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>{k}:</Text>
                <Text style={styles.summaryValue}>{v}</Text>
              </View>
            ) : null)}
          </View>
        </Animated.View>
      );
    }
  };

  if (cardapioGerado) {
  return (
    <LinearGradient colors={["#0a1f1a", "#0f172a"]} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text style={{
          color: "#00E676",
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 20
        }}>
          🥗 Seu Cardápio Personalizado
        </Text>

        <Text style={{
          color: "#fff",
          fontSize: 15,
          lineHeight: 24
        }}>
          {cardapioGerado}
        </Text>

        <TouchableOpacity
          style={{
            marginTop: 30,
            backgroundColor: "#00E676",
            padding: 15,
            borderRadius: 12
          }}
          onPress={() => setCardapioGerado(null)}
        >
          <Text style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#0a1f1a"
          }}>
            Gerar outro cardápio
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

  return (
    <LinearGradient colors={["#0a1f1a", "#0f172a"]} style={styles.gradient}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={prevStep} activeOpacity={0.75}>
          <ChevronLeft color="#00E676" size={26} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cardápio Personalizado</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.progressOuter}>
        <View style={[styles.progressInner, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{Math.round(progress)}% completo</Text>

      <View style={styles.stepTabs}>
        {stepMeta.map((m, i) => {
          const active = i + 1 === step;
          const done = i + 1 < step;
          return (
            <View key={i} style={styles.stepTab}>
              <View style={[styles.stepCircle, active && styles.stepCircleActive, done && styles.stepCircleDone]}>
                {done ? <CheckCircle2 color="#00E676" size={16} strokeWidth={2.5} /> : <m.Icon color={active ? "#00E676" : "#4a5568"} size={16} strokeWidth={2} />}
              </View>
              {i < stepMeta.length - 1 && <View style={[styles.stepLine, done && styles.stepLineDone]} />}
            </View>
          );
        })}
      </View>

      <View style={styles.stepHeaderBlock}>
        <Text style={styles.stepNum}>Passo {step} de {totalSteps}</Text>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDesc}>{desc}</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {renderStep()}
      </ScrollView>

      <View style={styles.navContainer}>
        {step < totalSteps ? (
          <TouchableOpacity style={styles.nextBtn} onPress={nextStep} activeOpacity={0.85}>
            <LinearGradient colors={["#00E676", "#00C853"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btnGradient}>
              <Text style={styles.nextBtnText}>Próximo →</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.nextBtn, loading && { opacity: 0.6 }]} onPress={handleSubmit} activeOpacity={0.85} disabled={loading}>
            <LinearGradient colors={["#00E676", "#00C853"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btnGradient}>
              <Text style={styles.nextBtnText}>{loading ? "Gerando..." : "✨ Gerar Meu Cardápio"}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>

      {toast && (
        <View style={[styles.toast, toast.tipo === "sucesso" ? styles.toastSucesso : styles.toastErro]}>
          {toast.tipo === "sucesso" ? <CheckCircle2 color="#fff" size={18} strokeWidth={2} /> : <AlertCircle color="#fff" size={18} strokeWidth={2} />}
          <Text style={styles.toastText}>{toast.texto}</Text>
        </View>
      )}

      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <Text style={styles.loadingEmoji}>🥗</Text>
            <Text style={styles.loadingTitle}>Gerando seu cardápio...</Text>
            <Text style={styles.loadingSubtitle}>Isso pode levar alguns segundos</Text>
            <View style={styles.loadingDots}>
              {[0, 1, 2].map(i => <View key={i} style={styles.dot} />)}
            </View>
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <View style={styles.sectionTitle}>
      <View style={styles.sectionDivider} />
      <Text style={styles.sectionTitleText}>{title}</Text>
      <View style={styles.sectionDivider} />
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 52, paddingBottom: 14, backgroundColor: "rgba(10, 31, 26, 0.95)", borderBottomWidth: 1, borderBottomColor: "rgba(0,230,118,0.15)" },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(0,230,118,0.1)", justifyContent: "center", alignItems: "center", borderWidth: 1.5, borderColor: "rgba(0,230,118,0.3)" },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  placeholder: { width: 40 },
  progressOuter: { height: 4, backgroundColor: "rgba(255,255,255,0.08)", marginHorizontal: 20, marginTop: 12, borderRadius: 2, overflow: "hidden" },
  progressInner: { height: "100%", backgroundColor: "#00E676", borderRadius: 2 },
  progressText: { textAlign: "center", color: "#00E676", fontSize: 11, fontWeight: "600", marginTop: 6 },
  stepTabs: { flexDirection: "row", alignItems: "center", paddingHorizontal: 30, marginTop: 16, marginBottom: 4 },
  stepTab: { flex: 1, flexDirection: "row", alignItems: "center" },
  stepCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 2, borderColor: "rgba(255,255,255,0.1)", justifyContent: "center", alignItems: "center" },
  stepCircleActive: { backgroundColor: "rgba(0,230,118,0.15)", borderColor: "#00E676" },
  stepCircleDone: { backgroundColor: "rgba(0,230,118,0.1)", borderColor: "rgba(0,230,118,0.4)" },
  stepLine: { flex: 1, height: 2, backgroundColor: "rgba(255,255,255,0.08)", marginHorizontal: 4 },
  stepLineDone: { backgroundColor: "rgba(0,230,118,0.4)" },
  stepHeaderBlock: { alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "rgba(0,230,118,0.12)" },
  stepNum: { color: "#00E676", fontSize: 11, fontWeight: "600", marginBottom: 4 },
  stepTitle: { color: "#fff", fontSize: 22, fontWeight: "800", marginBottom: 4 },
  stepDesc: { color: "#bafdbc", fontSize: 13 },
  scroll: { flex: 1 },
  stepContent: { padding: 20, paddingBottom: 10 },
  sectionTitle: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 22 },
  sectionDivider: { flex: 1, height: 1, backgroundColor: "rgba(0,230,118,0.2)" },
  sectionTitleText: { color: "#00E676", fontSize: 13, fontWeight: "700", letterSpacing: 1 },
  inputGroup: { marginBottom: 20 },
  label: { color: "#fff", fontSize: 14, fontWeight: "600", marginBottom: 10 },
  input: { backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1.5, borderColor: "rgba(0,230,118,0.2)", borderRadius: 12, padding: 14, fontSize: 15, color: "#fff" },
  textArea: { height: 100, textAlignVertical: "top" },
  hint: { fontSize: 11, color: "rgba(186,253,188,0.55)", marginTop: 5, fontStyle: "italic" },
  row: { flexDirection: "row", gap: 14 },
  halfWidth: { flex: 1 },
  radioGroup: { flexDirection: "row", gap: 12 },
  radioButton: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.05)", paddingVertical: 15, paddingHorizontal: 14, borderRadius: 12, borderWidth: 2, borderColor: "rgba(255,255,255,0.1)", gap: 8 },
  radioSelected: { backgroundColor: "rgba(0,230,118,0.13)", borderColor: "#00E676" },
  radioEmoji: { fontSize: 18 },
  radioLabel: { color: "#fff", fontSize: 14, fontWeight: "600" },
  chipGroup: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.05)", paddingVertical: 11, paddingHorizontal: 16, borderRadius: 20, borderWidth: 2, borderColor: "rgba(255,255,255,0.1)", gap: 6 },
  chipSelected: { backgroundColor: "rgba(0,230,118,0.15)", borderColor: "#00E676" },
  chipEmoji: { fontSize: 16 },
  chipText: { color: "#bafdbc", fontSize: 13, fontWeight: "500" },
  chipTextSelected: { color: "#00E676", fontWeight: "700" },
  chipSub: { fontSize: 10, color: "rgba(186,253,188,0.45)", marginTop: 1 },
  conditionalCard: { backgroundColor: "rgba(0,230,118,0.05)", borderLeftWidth: 3, borderLeftColor: "#00E676", borderRadius: 10, padding: 12, marginTop: -8, marginBottom: 20 },
  summaryCard: { backgroundColor: "rgba(0,230,118,0.08)", borderRadius: 16, padding: 20, borderWidth: 1.5, borderColor: "rgba(0,230,118,0.25)", marginTop: 8 },
  summaryTitle: { color: "#00E676", fontSize: 15, fontWeight: "800", marginBottom: 14 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.04)" },
  summaryLabel: { color: "#bafdbc", fontSize: 13 },
  summaryValue: { color: "#fff", fontSize: 13, fontWeight: "600", maxWidth: "60%", textAlign: "right" },
  navContainer: { paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 32, backgroundColor: "rgba(10,31,26,0.97)", borderTopWidth: 1, borderTopColor: "rgba(0,230,118,0.12)" },
  nextBtn: { borderRadius: 25, overflow: "hidden", elevation: 10, shadowColor: "#00E676", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, margin: 31 },
  btnGradient: { paddingVertical: 16, alignItems: "center" },
  nextBtnText: { color: "#0D332D", fontSize: 17, fontWeight: "800" },
  toast: { position: "absolute", top: 60, left: 20, right: 20, flexDirection: "row", alignItems: "center", gap: 10, borderRadius: 14, paddingHorizontal: 18, paddingVertical: 14, elevation: 20 },
  toastSucesso: { backgroundColor: "#059669" },
  toastErro: { backgroundColor: "#dc2626" },
  toastText: { color: "#fff", fontSize: 14, fontWeight: "600", flex: 1 },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.75)", justifyContent: "center", alignItems: "center" },
  loadingCard: { backgroundColor: "#0f2d1e", borderRadius: 24, padding: 36, alignItems: "center", borderWidth: 1.5, borderColor: "rgba(0,230,118,0.3)", width: 260 },
  loadingEmoji: { fontSize: 40, marginBottom: 16 },
  loadingTitle: { color: "#fff", fontSize: 17, fontWeight: "700", marginBottom: 8 },
  loadingSubtitle: { color: "#bafdbc", fontSize: 13, textAlign: "center", marginBottom: 20 },
  loadingDots: { flexDirection: "row", gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#00E676", opacity: 0.7 },
});
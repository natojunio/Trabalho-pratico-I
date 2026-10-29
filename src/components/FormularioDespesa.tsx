import { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NovaDespesa } from '../types/Despesa';

type Props = {
  onCadastrar: (despesa: NovaDespesa) => void;
};

export default function FormularioDespesa({ onCadastrar }: Props) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [erro, setErro] = useState('');

  function cadastrar() {
    if (!descricao.trim() || !valor.trim() || !categoria.trim()) {
      setErro('Preencha a descrição, o valor e a categoria.');
      return;
    }

    const textoValor = valor.trim();
    const valorNumerico = Number(textoValor.replace(',', '.'));
    if (!/^\d+([.,]\d{1,2})?$/.test(textoValor) || !Number.isFinite(valorNumerico) || valorNumerico <= 0 || valorNumerico > 999999999.99) {
      setErro('Informe um valor entre R$ 0,01 e R$ 999999999,99, sem separador de milhar.');
      return;
    }

    onCadastrar({
      descricao: descricao.trim(),
      valor: Math.round(valorNumerico * 100) / 100,
      categoria: categoria.trim(),
    });
    setDescricao('');
    setValor('');
    setCategoria('');
    setErro('');
    Keyboard.dismiss();
  }

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>Nova despesa</Text>
      <Text style={styles.ajuda}>Preencha os três campos para cadastrar.</Text>

      <Text style={styles.label}>Descrição *</Text>
      <TextInput accessibilityLabel="Descrição da despesa" style={styles.input} placeholder="Ex: Compra na oficina" placeholderTextColor="#7B8791" value={descricao} onChangeText={setDescricao} maxLength={80} />

      <Text style={styles.label}>Valor (R$) *</Text>
      <TextInput accessibilityLabel="Valor da despesa em reais" style={styles.input} placeholder="Ex: 67,67" placeholderTextColor="#7B8791" value={valor} onChangeText={setValor} keyboardType="decimal-pad" maxLength={12} />

      <Text style={styles.label}>Categoria *</Text>
      <TextInput accessibilityLabel="Categoria da despesa" style={styles.input} placeholder="Ex: Automóvel" placeholderTextColor="#7B8791" value={categoria} onChangeText={setCategoria} maxLength={40} returnKeyType="done" onSubmitEditing={cadastrar} />

      {erro ? <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.erro}>{erro}</Text> : null}
      <Pressable accessibilityRole="button" onPress={cadastrar} style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}>
        <Text style={styles.textoBotao}>+ Cadastrar despesa</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#E2E8E6' },
  titulo: { color: '#183C34', fontSize: 20, fontWeight: '700' },
  ajuda: { color: '#5B6C66', fontSize: 13, marginTop: 5, marginBottom: 8 },
  label: { color: '#344D45', fontSize: 13, fontWeight: '600', marginTop: 12, marginBottom: 7 },
  input: { backgroundColor: '#F7F9F8', borderWidth: 1, borderColor: '#D7E0DC', borderRadius: 10, paddingHorizontal: 13, paddingVertical: 12, fontSize: 16, color: '#183C34', minHeight: 48 },
  botao: { backgroundColor: '#16715A', borderRadius: 12, minHeight: 50, padding: 14, alignItems: 'center', justifyContent: 'center', marginTop: 18 },
  pressionado: { opacity: 0.75 },
  textoBotao: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  erro: { color: '#AD2828', marginTop: 12, fontSize: 13 },
});

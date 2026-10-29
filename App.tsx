import { useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import FormularioDespesa from './src/components/FormularioDespesa';
import ItemDespesa from './src/components/ItemDespesa';
import { Despesa, NovaDespesa } from './src/types/Despesa';
import { formatarMoeda } from './src/utils/moeda';

export default function App() {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const proximoId = useRef(1);

  function cadastrarDespesa(novaDespesa: NovaDespesa) {
    const despesa: Despesa = {
      ...novaDespesa,
      id: String(proximoId.current++),
      paga: false,
    };
    setDespesas((listaAtual) => [despesa, ...listaAtual]);
  }

  function alternarStatus(id: string) {
    setDespesas((listaAtual) => listaAtual.map((despesa) =>
      despesa.id === id ? { ...despesa, paga: !despesa.paga } : despesa,
    ));
  }

  function excluirDespesa(id: string) {
    setDespesas((listaAtual) => listaAtual.filter((despesa) => despesa.id !== id));
  }

  // Soma
  const total = despesas.reduce((soma, despesa) => soma + Math.round(despesa.valor * 100), 0) / 100;
  const pendente = despesas.reduce((soma, despesa) => soma + (despesa.paga ? 0 : Math.round(despesa.valor * 100)), 0) / 100;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.tela}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView style={styles.conteudo} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <FlatList
            data={despesas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ItemDespesa despesa={item} onAlternarStatus={alternarStatus} onExcluir={excluirDespesa} />}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.lista}
            ListHeaderComponent={
              <View>
                <Text accessibilityRole="header" style={styles.titulo}>Minhas Despesas</Text>
                <Text style={styles.subtitulo}>Um jeito bem simples de cuidar do seu dinheirinho.</Text>
                <View style={styles.resumo}>
                  <Text style={styles.resumoLabel}>TOTAL CADASTRADO</Text>
                  <Text style={styles.total}>{formatarMoeda(total)}</Text>
                  <View style={styles.divisor} />
                  <Text style={styles.pendente}>A pagar: {formatarMoeda(pendente)}</Text>
                </View>
                <FormularioDespesa onCadastrar={cadastrarDespesa} />
                <View style={styles.cabecalhoLista}>
                  <Text accessibilityRole="header" style={styles.tituloLista}>Suas despesas</Text>
                  <Text style={styles.contador}>{despesas.length} registro(s)</Text>
                </View>
              </View>
            }
            ListEmptyComponent={
              <View style={styles.vazio}>
                <Text style={styles.vazioTitulo}>Tudo pronto para começar</Text>
                <Text style={styles.vazioTexto}>Cadastre sua primeira despesa no formulário acima.</Text>
              </View>
            }
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#F2F6F3' },
  conteudo: { flex: 1, width: '100%', maxWidth: 600, alignSelf: 'center' },
  lista: { padding: 20, paddingBottom: 32 },
  identificacao: { color: '#16715A', fontSize: 11, fontWeight: '700', letterSpacing: 1.2, marginTop: 8 },
  titulo: { color: '#183C34', fontSize: 30, fontWeight: '800', marginTop: 9 },
  subtitulo: { color: '#5B6C66', fontSize: 14, lineHeight: 21, marginTop: 7 },
  resumo: { backgroundColor: '#183C34', padding: 22, borderRadius: 20, marginVertical: 24 },
  resumoLabel: { color: '#C6DFD3', fontSize: 11, fontWeight: '600', letterSpacing: 1 },
  total: { color: '#FFFFFF', fontSize: 34, fontWeight: '700', marginTop: 8 },
  divisor: { backgroundColor: '#386052', height: 1, marginVertical: 15 },
  pendente: { color: '#D8EDE2', fontSize: 15 },
  cabecalhoLista: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 28, marginBottom: 14 },
  tituloLista: { color: '#183C34', fontSize: 20, fontWeight: '700' },
  contador: { color: '#5B6C66', fontSize: 12 },
  vazio: { borderWidth: 1, borderStyle: 'dashed', borderColor: '#B7CBC0', padding: 24, borderRadius: 16, alignItems: 'center' },
  vazioTitulo: { color: '#344D45', fontSize: 15, fontWeight: '600' },
  vazioTexto: { color: '#5B6C66', fontSize: 13, textAlign: 'center', lineHeight: 20, marginTop: 7 },
  rodape: { color: '#5B6C66', textAlign: 'center', fontSize: 12, marginTop: 18 },
});

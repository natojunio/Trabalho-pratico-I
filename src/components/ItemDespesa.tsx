import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Despesa } from '../types/Despesa';
import { formatarMoeda } from '../utils/moeda';

type Props = {
  despesa: Despesa;
  onAlternarStatus: (id: string) => void;
  onExcluir: (id: string) => void;
};

export default function ItemDespesa({ despesa, onAlternarStatus, onExcluir }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.categoria}>{despesa.categoria}</Text>
      <Text style={styles.descricao}>{despesa.descricao}</Text>
      <Text style={styles.valor}>{formatarMoeda(despesa.valor)}</Text>
      <Text style={[styles.status, despesa.paga && styles.statusPago]}>
        {despesa.paga ? '● Paga' : '● Pendente'}
      </Text>
      <View style={styles.acoes}>
        <Pressable accessibilityRole="button" accessibilityLabel={`${despesa.paga ? 'Marcar como pendente' : 'Marcar como paga'}: ${despesa.descricao}`} onPress={() => onAlternarStatus(despesa.id)} style={({ pressed }) => [styles.botaoStatus, pressed && styles.pressionado]}>
          <Text style={styles.textoStatus}>{despesa.paga ? 'Marcar pendente' : 'Marcar como paga'}</Text>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={`Excluir despesa: ${despesa.descricao}`} onPress={() => onExcluir(despesa.id)} style={({ pressed }) => [styles.botaoExcluir, pressed && styles.pressionado]}>
          <Text style={styles.textoExcluir}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', padding: 18, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8E6', marginBottom: 12 },
  categoria: { color: '#5B6C66', fontSize: 12, fontWeight: '600', marginBottom: 5 },
  descricao: { color: '#183C34', fontSize: 17, fontWeight: '600' },
  valor: { color: '#183C34', fontSize: 23, fontWeight: '700', marginTop: 8 },
  status: { color: '#86550A', fontSize: 13, marginTop: 8 },
  statusPago: { color: '#16715A' },
  acoes: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 },
  botaoStatus: { backgroundColor: '#E7F3ED', borderRadius: 10, minHeight: 46, paddingHorizontal: 12, paddingVertical: 13, justifyContent: 'center' },
  textoStatus: { color: '#135A47', fontWeight: '600', fontSize: 13 },
  botaoExcluir: { borderRadius: 10, minHeight: 46, paddingHorizontal: 14, paddingVertical: 13, backgroundColor: '#FFF0EE', justifyContent: 'center' },
  textoExcluir: { color: '#AD2828', fontWeight: '600', fontSize: 13 },
  pressionado: { opacity: 0.65 },
});

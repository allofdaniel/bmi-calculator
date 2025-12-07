import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

// BMI 카테고리 정의
const BMI_CATEGORIES = [
  { min: 0, max: 18.5, label: '저체중', color: '#3498db', emoji: '🔵' },
  { min: 18.5, max: 23, label: '정상', color: '#2ecc71', emoji: '🟢' },
  { min: 23, max: 25, label: '과체중', color: '#f39c12', emoji: '🟡' },
  { min: 25, max: 30, label: '비만', color: '#e74c3c', emoji: '🟠' },
  { min: 30, max: 100, label: '고도비만', color: '#c0392b', emoji: '🔴' },
];

// BMI 계산 함수
const calculateBMI = (height, weight) => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

// BMI 카테고리 가져오기
const getBMICategory = (bmi) => {
  return BMI_CATEGORIES.find(cat => bmi >= cat.min && bmi < cat.max) || BMI_CATEGORIES[4];
};

// 적정 체중 범위 계산
const getIdealWeightRange = (height) => {
  const heightInMeters = height / 100;
  const minWeight = 18.5 * heightInMeters * heightInMeters;
  const maxWeight = 23 * heightInMeters * heightInMeters;
  return { min: minWeight.toFixed(1), max: maxWeight.toFixed(1) };
};

export default function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleCalculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      alert('올바른 키와 몸무게를 입력해주세요.');
      return;
    }

    if (h < 50 || h > 250) {
      alert('키는 50cm ~ 250cm 사이로 입력해주세요.');
      return;
    }

    if (w < 10 || w > 300) {
      alert('몸무게는 10kg ~ 300kg 사이로 입력해주세요.');
      return;
    }

    const bmi = calculateBMI(h, w);
    const category = getBMICategory(bmi);
    const idealWeight = getIdealWeightRange(h);

    setResult({
      bmi: bmi.toFixed(1),
      category,
      idealWeight,
      height: h,
      weight: w,
    });
  };

  const handleReset = () => {
    setHeight('');
    setWeight('');
    setResult(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 헤더 */}
          <View style={styles.header}>
            <Text style={styles.headerEmoji}>⚖️</Text>
            <Text style={styles.headerTitle}>BMI 계산기</Text>
            <Text style={styles.headerSubtitle}>체질량지수 계산</Text>
          </View>

          {/* 입력 카드 */}
          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>키 (cm)</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="170"
                  placeholderTextColor="#999"
                  keyboardType="decimal-pad"
                  value={height}
                  onChangeText={setHeight}
                  maxLength={5}
                />
                <Text style={styles.inputUnit}>cm</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>몸무게 (kg)</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="65"
                  placeholderTextColor="#999"
                  keyboardType="decimal-pad"
                  value={weight}
                  onChangeText={setWeight}
                  maxLength={5}
                />
                <Text style={styles.inputUnit}>kg</Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.calculateButton}
                onPress={handleCalculate}
                activeOpacity={0.8}
              >
                <Text style={styles.calculateButtonText}>계산하기</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}
                activeOpacity={0.8}
              >
                <Text style={styles.resetButtonText}>초기화</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 결과 카드 */}
          {result && (
            <View style={[styles.card, styles.resultCard]}>
              <Text style={styles.resultTitle}>측정 결과</Text>

              <View style={styles.bmiDisplay}>
                <Text style={styles.bmiValue}>{result.bmi}</Text>
                <Text style={styles.bmiLabel}>BMI</Text>
              </View>

              <View style={[styles.categoryBadge, { backgroundColor: result.category.color }]}>
                <Text style={styles.categoryEmoji}>{result.category.emoji}</Text>
                <Text style={styles.categoryText}>{result.category.label}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>입력 정보</Text>
                <Text style={styles.infoValue}>키 {result.height}cm / 몸무게 {result.weight}kg</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>정상 체중 범위</Text>
                <Text style={styles.infoValue}>{result.idealWeight.min} ~ {result.idealWeight.max} kg</Text>
              </View>

              {result.category.label !== '정상' && (
                <View style={styles.tipBox}>
                  <Text style={styles.tipTitle}>💡 건강 팁</Text>
                  {result.category.label === '저체중' && (
                    <Text style={styles.tipText}>
                      균형 잡힌 식단과 적절한 영양 섭취가 필요합니다.
                      단백질과 건강한 지방 섭취를 늘려보세요.
                    </Text>
                  )}
                  {(result.category.label === '과체중' || result.category.label === '비만' || result.category.label === '고도비만') && (
                    <Text style={styles.tipText}>
                      규칙적인 운동과 균형 잡힌 식단이 도움됩니다.
                      주 3회 이상 30분 이상의 유산소 운동을 권장합니다.
                    </Text>
                  )}
                </View>
              )}
            </View>
          )}

          {/* BMI 기준표 토글 */}
          <TouchableOpacity
            style={styles.infoToggle}
            onPress={() => setShowInfo(!showInfo)}
            activeOpacity={0.7}
          >
            <Text style={styles.infoToggleText}>
              {showInfo ? '▲ BMI 기준표 숨기기' : '▼ BMI 기준표 보기'}
            </Text>
          </TouchableOpacity>

          {/* BMI 기준표 */}
          {showInfo && (
            <View style={styles.card}>
              <Text style={styles.tableTitle}>대한비만학회 BMI 기준</Text>
              {BMI_CATEGORIES.map((cat, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={[styles.tableColor, { backgroundColor: cat.color }]} />
                  <Text style={styles.tableLabel}>{cat.label}</Text>
                  <Text style={styles.tableRange}>
                    {cat.min === 0 ? '18.5 미만' :
                     cat.max === 100 ? '30 이상' :
                     `${cat.min} ~ ${cat.max}`}
                  </Text>
                </View>
              ))}
              <Text style={styles.tableNote}>
                * BMI = 체중(kg) ÷ 키(m)²
              </Text>
            </View>
          )}

          {/* 푸터 */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              BMI는 참고 지표일 뿐이며, 정확한 건강 상태는{'\n'}
              전문의와 상담하시기 바랍니다.
            </Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90D9',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 14,
    color: '#333',
  },
  inputUnit: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  calculateButton: {
    flex: 2,
    backgroundColor: '#4A90D9',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  resultCard: {
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  bmiDisplay: {
    alignItems: 'center',
    marginBottom: 16,
  },
  bmiValue: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#333',
  },
  bmiLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: -4,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    marginBottom: 20,
  },
  categoryEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  tipBox: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  infoToggle: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoToggleText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tableColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  tableLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  tableRange: {
    fontSize: 14,
    color: '#666',
  },
  tableNote: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 18,
  },
});

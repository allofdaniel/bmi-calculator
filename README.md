# BMI 계산기

체질량지수(BMI)를 계산하는 간단한 앱

## 기능

- 키와 몸무게 입력으로 BMI 계산
- 대한비만학회 기준 BMI 판정 (저체중/정상/과체중/비만/고도비만)
- 정상 체중 범위 안내
- 건강 팁 제공
- BMI 기준표 보기

## 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npx expo start

# Android 에뮬레이터에서 실행
npx expo start --android

# 웹에서 실행
npx expo start --web
```

## 빌드

```bash
# EAS CLI 설치
npm install -g eas-cli

# EAS 로그인
eas login

# 프로덕션 빌드 (AAB)
eas build --platform android --profile production
```

## 앱 아이콘 생성

1. https://icon.kitchen 접속
2. 아이콘 디자인 (저울 이모지 또는 BMI 텍스트)
3. 배경색: #4A90D9
4. 다운로드 후 assets 폴더에 복사:
   - `icon.png` (1024x1024)
   - `adaptive-icon.png` (1024x1024)
   - `splash-icon.png` (적절한 크기)

## Play Store 등록

1. https://play.google.com/console 접속
2. 앱 만들기
3. 스토어 등록정보 입력
4. AAB 파일 업로드
5. 검토 제출

## 앱 정보

- **패키지 이름**: com.allofdaniel.bmicalculator
- **앱 이름**: BMI 계산기
- **버전**: 1.0.0
- **개인정보처리방침**: https://allofdaniel.github.io/app-privacy/

## 기술 스택

- React Native (Expo)
- Expo SDK 52

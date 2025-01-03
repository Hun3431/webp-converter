# 이미지 WebP 변환기

디렉토리 구조를 유지하면서 JPG, JPEG, PNG 이미지를 WebP 형식으로 일괄 변환하는 Node.js 유틸리티입니다.

## 주요 기능

- 중첩된 디렉토리의 이미지를 재귀적으로 처리
- 원본 디렉토리 구조 유지
- 이미지 품질 설정 가능
- JPG, JPEG, PNG 형식 지원
- 변환 진행 상황 로깅

## 설치 방법

```bash
npm install imagemin imagemin-webp
```

## 사용 방법

```javascript
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import path from "path";
import fs from "fs/promises";

// source 디렉토리를 지정하여 변환 시작
await convertToWebp("source");
```

## 작동 방식

변환기는 다음과 같은 순서로 작동합니다:

1. "source" 디렉토리에서 이미지와 하위 데릭토리 탐색
2. 탐색된 이미지는 "source"디렉토리와 대응되는 "images"디렉토리에 이미지를 WebP 형식으로 변환을 하고 저장
3. 하위 디렉토리의 경우 "images" 디렉토리 내부에 새로운 디렉토리를 생성하여 동일한 폴더구조 유지
4. 생성된 디렉토리 경로로 변환 프로세스를 새롭게 호출
5. 모든 변환 프로세스 종료 후 최종 파일 변환 개수 출력

## 설정

변환 설정을 다음과 같이 커스터마이징할 수 있습니다:

```javascript
imageminWebp({
  quality: 100,  // 출력 품질 (0-100)
  method: 4      // 압축 방식 (0~6)
})
```

## 디렉토리 구조

```
프로젝트 루트
├── source/         # 원본 이미지가 있는 소스 디렉토리
│   ├── img1.jpg
│   └── subfolder/
│       └── img2.png
└── images/         # 변환된 WebP 이미지가 저장되는 디렉토리
    ├── img1.webp
    └── subfolder/
        └── img2.webp
```

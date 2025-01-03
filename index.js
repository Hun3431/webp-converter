import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import path from "path";
import fs from "fs/promises";

let count = 0;

const convertToWebp = async (sourcePath = "source") => {
  try {
    // 현재 디렉토리의 모든 파일과 폴더 읽기
    const entries = await fs.readdir(sourcePath, { withFileTypes: true });

    // 이미지 변환 작업
    const files = await imagemin([`${sourcePath}/*.{jpg,jpeg,png}`], {
      destination: sourcePath.replace("source", "images"),
      plugins: [
        imageminWebp({
          quality: 100, // 0 ~ 100 으로 이미지 퀄리티 지정(100 : 원본)
          method: 4,
        }),
      ],
    });

    count += files.length;
    console.log(
      `${sourcePath} 폴더의 ${files.length}개 이미지가 변환되었습니다.`
    );

    // 하위 폴더 처리
    for (const entry of entries) {
      // 폴더인지 확인
      if (entry.isDirectory()) {
        const subPath = path.join(sourcePath, entry.name);
        // 대상 폴더 생성
        const targetPath = subPath.replace("source", "images");
        await fs.mkdir(targetPath, { recursive: true }).catch(() => {});
        // 재귀 호출로 하위 디렉토리 파일 변환 진행
        await convertToWebp(subPath);
      }
    }
  } catch (error) {
    console.error(`${sourcePath} 처리 중 오류 발생:`, error);
  }
};

await convertToWebp();
console.log(`총 ${count}개 이미지가 변환되었습니다.`);

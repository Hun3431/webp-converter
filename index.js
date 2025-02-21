import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

let count = 0;

const convertToWebp = async (sourcePath = "source") => {
  try {
    // 현재 디렉토리의 모든 파일과 폴더 읽기
    const entries = await fs.readdir(sourcePath, { withFileTypes: true });

    // 대상 폴더 생성
    const targetPath = sourcePath.replace("source", "images");
    await fs.mkdir(targetPath, { recursive: true }).catch(() => {});

    // 이미지 변환 작업
    let filesConverted = 0;
    for (const entry of entries) {
      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if ([".jpg", ".jpeg", ".png"].includes(ext)) {
          const sourcefile = path.join(sourcePath, entry.name);
          const targetFile = path.join(
            targetPath,
            `${path.parse(entry.name).name}.webp`
          );

          await sharp(sourcefile)
            .webp({ quality: 100 }) // 퀄리티 설정 (0-100)
            .toFile(targetFile);

          filesConverted++;
        }
      }
    }

    count += filesConverted;
    console.log(
      `${sourcePath} 폴더의 ${filesConverted}개 이미지가 변환되었습니다.`
    );

    // 하위 폴더 처리
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subPath = path.join(sourcePath, entry.name);
        await convertToWebp(subPath);
      }
    }
  } catch (error) {
    console.error(`${sourcePath} 처리 중 오류 발생:`, error);
  }
};

await convertToWebp();
console.log(`총 ${count}개 이미지가 변환되었습니다.`);

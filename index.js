import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

const convertToWebp = async () => {
  try {
    const files = await imagemin(["source/*.{jpg,jpeg,png}"], {
      destination: "images",
      plugins: [
        imageminWebp({
          quality: 100, // 품질 설정 (0-100)
          method: 4, // 압축 방식 (0-6)
        }),
      ],
    });

    console.log(`${files.length}개의 이미지가 변환되었습니다.`);
  } catch (error) {
    console.error("변환 중 오류 발생:", error);
  }
};

convertToWebp();

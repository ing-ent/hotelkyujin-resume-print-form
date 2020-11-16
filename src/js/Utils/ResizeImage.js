import { THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT } from '../Constants/Constants';
/**
 * ファイルをリサイズしてFileオブジェクトに変換
 * @param file File
 * return promise
 */
export default function resizeImage(file, canvas) {
  return new Promise((resolve, reject) => {
    console.log('original file.size KB', Math.ceil(file.size / 1024));
    const image = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      image.onload = () => {
        let width;
        let height;
        const ctx = canvas.getContext('2d');
        if (image.width > image.height) {
          // 横長の画像は横のサイズを指定値にあわせる
          const ratio = image.height / image.width;
          width = THUMBNAIL_WIDTH;
          height = THUMBNAIL_WIDTH * ratio;
        } else {
          // 縦長の画像は縦のサイズを指定値にあわせる
          const ratio = image.width / image.height;
          width = THUMBNAIL_HEIGHT * ratio;
          height = THUMBNAIL_HEIGHT;
        }
        canvas.width = width; // eslint-disable-line no-param-reassign
        canvas.height = height; // eslint-disable-line no-param-reassign
        // canvasに既に描画されている画像をクリア
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(image, 0, 0, width, height);
        resolve(image);
      };
      image.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

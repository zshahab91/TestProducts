import { message } from 'antd';
import { RcFile } from 'antd/lib/upload/interface';

/**
 * Validate photo ratio before upload
 * @param file
 */
export function ratioCheck(file: RcFile): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;
      image.onload = function () {
        if (image.width === image.height) {
          resolve();
        } else {
          message.error('Invalid photo ratio. The valid ratio is 1:1');
          reject();
        }
      };
    };
  });
}

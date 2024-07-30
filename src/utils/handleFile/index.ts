import { getDownloadURL, ref, uploadBytesResumable, UploadTask } from 'firebase/storage';
import {storage} from '@/firebase/index';
import { convertTimeNumberToHHMMddmmYYYY } from '../handleTime';

export function downloadFile(url: any, nameFile: string) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // const fileName = url.split('/').pop(); // Lấy tên file từ URL
        const file = new File([blob], nameFile);
        const objectUrl = URL.createObjectURL(file);

        const downloadLink = document.createElement('a');
        downloadLink.href = objectUrl;
        downloadLink.download = nameFile;
        downloadLink.click();

        URL.revokeObjectURL(objectUrl);
      })
      .catch((error) => {
        console.error('Lỗi tải xuống:', error);
      });
}

export async function uploadFileToStorage(file: any, path: string, nameFile: string) {
    if (!file) {
        alert("Please choose a file first!");
    }
    return new Promise((resolve: any, reject: any) => {
        const storageRef = ref(storage, `${path}/${convertTimeNumberToHHMMddmmYYYY(new Date().getTime())}/${nameFile}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    resolve(url);
                });
            }
        );
    })
}

export function formatShowSizeFile(sizeFile: number) {
    let gb = sizeFile / 1024 / 1024 / 1024;
    if (gb > 1) {
        return gb.toFixed(2) + " gb"
    }
    let mb = sizeFile / 1024 / 1024;
    if (mb > 1) {
        return mb.toFixed(2) + " mb"
    }
    let kb = sizeFile / 1024;
    if (kb > 1) {
        return kb.toFixed(2) + " kB"
    }

    return sizeFile + " b"
}
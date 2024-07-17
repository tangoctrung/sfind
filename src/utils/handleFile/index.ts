import { getDownloadURL, ref, uploadBytesResumable, UploadTask } from 'firebase/storage';
import {storage} from '@/firebase/index';

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

export async function uploadFileToStorage(file: any, nameFloder: string) {
    let urlTool = ""
    if (!file) {
        alert("Please choose a file first!");
    }
    const storageRef = ref(storage, `/${nameFloder}/${file?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (err) => console.log(err),
        () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url);
                urlTool = url;
                return urlTool;
            });
        }
    );
    
    
}
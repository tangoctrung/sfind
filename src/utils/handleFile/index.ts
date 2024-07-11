export function downloadFile(url: any, nameFile: string) {

    console.log({url: url}, {nameFile});
    
    // fetch(e.target.href, {
    //     method: "GET",
    //     headers: {}
    // })
    //     .then(response => {
    //         response.arrayBuffer().then(function (buffer) {
    //             const url = window.URL.createObjectURL(new Blob([buffer]));
    //             const link = document.createElement("a");
    //             link.href = url;
    //             link.setAttribute("download", nameFile); //or any other extension
    //             document.body.appendChild(link);
    //             link.click();
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

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
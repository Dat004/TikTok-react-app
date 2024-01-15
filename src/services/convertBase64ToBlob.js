const Base64Convert = async (base64, type) => {
    return new Promise((resolve, reject) => {
        try {
            const byteCharacters = atob(base64.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: type });

            const blobUrl = URL.createObjectURL(blob);

            resolve(blobUrl);
        } catch (error) {
            reject(error);
        }
    });
};

export default Base64Convert;

export const compareImages = (image1, image2) => {
    const img1 = new Image();
    const img2 = new Image();

    return new Promise((resolve) => {
        img1.onload = () => {
            console.log('Image 1 loaded');
            img2.onload = () => {
                console.log('Image 2 loaded');
                const canvas = document.createElement('canvas');
                canvas.width = img1.width;
                canvas.height = img1.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img1, 0, 0);
                const data1 = ctx.getImageData(0, 0, img1.width, img1.height).data;

                ctx.drawImage(img2, 0, 0);
                const data2 = ctx.getImageData(0, 0, img2.width, img2.height).data;

                let diffCount = 0;
                for (let i = 0; i < data1.length; i += 4) {
                    const r1 = data1[i];
                    const g1 = data1[i + 1];
                    const b1 = data1[i + 2];

                    const r2 = data2[i];
                    const g2 = data2[i + 1];
                    const b2 = data2[i + 2];

                    // Compare RGB values
                    if (Math.abs(r1 - r2) > 10 || Math.abs(g1 - g2) > 10 || Math.abs(b1 - b2) > 10) {
                        diffCount++;
                    }
                }

                console.log('Difference count:', diffCount);
                const totalPixels = img1.width * img1.height;
                const differenceThreshold = totalPixels * 0.02;

                const imagesMatch = diffCount <= differenceThreshold;
                console.log('Images match:', imagesMatch);
                resolve(imagesMatch);
            };
            img2.src = image2;
        };
        img1.src = image1;
    });
};

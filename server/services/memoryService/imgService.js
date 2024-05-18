import { Buffer} from 'buffer';
import { get } from 'https'

export const imgService = {
    downloadImages: async (products) => {
        const images = {}
        for (let product of products) {
            try {
                const buffer = await imgService.downloadImage(product.images[0])  
                images[product.id] = buffer
                product.images[0] = '/image/' + product.id
            }
            catch (err) {
                console.log('Image download failed ' + id + ' ' + err.message)
            }
        }
        console.log('Images downloaded')
        return images
    },

    downloadImage: async (url) => {
        const buffer = await new Promise((resolve, reject) => {
            get(url, (res) => {
                const dataChunks = [];
                res.on('data', (chunk) => {
                    dataChunks.push(chunk);
                });
                res.on('end', () => {
                    resolve(Buffer.concat(dataChunks));
                });
                res.on('error', reject);
            }).on('error', reject);
        });
        return buffer
    }
}
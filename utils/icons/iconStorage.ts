import { ImageSource } from 'react-native-vector-icons/Icon';

class IconStorageManager {
    private storage: Map<string, ImageSource> = new Map();

    saveImage(key: string, image: ImageSource) {
        this.storage.set(key, image);
    }

    getImage(key: string): ImageSource {
        return this.storage.get(key);
    }
}

const IconStorage = new IconStorageManager();

export default IconStorage;

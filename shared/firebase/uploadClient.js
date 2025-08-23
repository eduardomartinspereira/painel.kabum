import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/firebaseapi';

export async function uploadImageAndGetUrl(file, folder = 'images') {
    const ext = file.name.split('.').pop() || 'bin';
    const sanitized = file.name.replace(/\.[^.]+$/, '').slice(0, 40);
    const path = `${folder}/${Date.now()}-${crypto.randomUUID()}-${sanitized}.${ext}`;
    const storageRef = ref(storage, path);
    const snap = await uploadBytes(storageRef, file, {
        contentType: file.type,
    });
    return await getDownloadURL(snap.ref);
}

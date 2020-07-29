import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { FileItem } from '../models/file-item.model';
import * as firebase from 'firebase/app';
import { Item } from '../components/photos/photos.component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ImageUploadService {

    private IMAGE_FOLDER = 'img'
    private storage;
    constructor(private afs: AngularFirestore) {
        this.storage = firebase.storage();
    }

    getFiles(): Observable<Item[]> {
        return this.afs.collection<Item>(`${this.IMAGE_FOLDER}`).valueChanges();
    }

    uploadFirebaseFiles(images: FileItem[]) {
        for (let item of images) {
            item.isLoading = true;
            if (item.progress >= 100) {
                continue;
            }

            const uploadTask = firebase.storage().ref(`${this.IMAGE_FOLDER}`).child(item.fileName).put(item.file);

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snap) => item.progress = Math.round((snap.bytesTransferred / snap.totalBytes) * 100),
                error => console.log(error),
                async () => {
                    item.url = await firebase.storage().ref(`${this.IMAGE_FOLDER}`).child(item.fileName).getDownloadURL();
                    item.isLoading = false;
                    console.log(item);
                    await this.saveImage({ name: item.fileName, url: item.url });
                }
            )
        }
    }

    private async saveImage(image: { name: string, url: string }) {
        this.afs.collection(`${this.IMAGE_FOLDER}`).add(image);
    }

}
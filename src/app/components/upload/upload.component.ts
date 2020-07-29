import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item.model';
import { ImageUploadService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {

  public isOverDrop:boolean = false;
  public files:FileItem[] = [];

  constructor(private uploadImageService:ImageUploadService) { }

  ngOnInit() {
  }

  loadImages():void {
    this.uploadImageService.uploadFirebaseFiles(this.files);
  }

  cleanList() {
    this.files = [];
  }

}

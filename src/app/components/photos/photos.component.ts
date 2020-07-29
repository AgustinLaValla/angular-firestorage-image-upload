import { Component, OnInit } from '@angular/core';
import { ImageUploadService } from 'src/app/services/upload-image.service';
import { filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';

export interface Item { fileName:string, url:string };

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styles: []
})
export class PhotosComponent implements OnInit {

  public files: Observable<Item[]>;

  constructor(private uploadImage:ImageUploadService) { }

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.files = this.uploadImage.getFiles();
  }

}

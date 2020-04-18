import { async } from '@angular/core/testing';

import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
    //upload img
    @Output() onUpload: EventEmitter<{imageUploaded: Array<String>, isDoneUpload: boolean}>;
    @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
    files =[];
    imageUploaded = [];
    isDoneUpload = false;
    title = "cloudsSorage";
    downloadURL: Observable<string>;

  constructor( private storage: AngularFireStorage) { 
    this.onUpload = new EventEmitter(); 
  }

  ngOnInit() {
  }

 // upload img
 uploadFile(file) {
  var n = Date.now();
  const filePath = `dmm/${n}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(`dmm/${n}`, file);
  task
    .snapshotChanges()
    .pipe(
      finalize(async() => {
        this.downloadURL = await fileRef.getDownloadURL().toPromise();
            this.imageUploaded.push(this.downloadURL);
      })
    )
}

private uploadFiles(callback) {
  this.fileUpload.nativeElement.value = '';
  this.files.forEach(file => {
    this.uploadFile(file);
  });
  callback()
}

onClick() {
  this.files=[];
  this.imageUploaded = [];
  const fileUpload = this.fileUpload.nativeElement;
  fileUpload.onchange = () => {
    for (let index = 0; index < fileUpload.files.length; index++) {
      const file = fileUpload.files[index];
      if (file.type.match('image.*')) {
        var size = file.size;
        if (size > 2000000) {
          alert("Tệp ảnh không quá 2 MB");
        }
        else {
          this.files.push(file);
        }
      } else {
        alert('Tệp phải là định dạng hình ảnh');
      }
    }
    this.uploadFiles(() => {
      this.isDoneUpload = true;
      this.onUpload.next({imageUploaded: this.imageUploaded, isDoneUpload: this.isDoneUpload});
    });
  };
  fileUpload.click();
}
}

import { async } from '@angular/core/testing';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  @Output() onUpload: EventEmitter<string>;
  isHovering: boolean;
  files: File[] = [];
  constructor(){
    this.onUpload = new EventEmitter();
  }
  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  
  onDrop(files: FileList) {
    if(files?.length >= 10){
      alert('Vui lòng cung cấp < 10 tệp tin');
    }
    for (let i = 0; i < files.length; i++) {
  
      if (files.item(i).type.match('image.*')) {
        (files.item(i).size > 2000000) ? alert("Tệp ảnh không quá 2 MB") : this.files.push(files.item(i));
      } else {
        alert('Tệp phải là định dạng hình ảnh');
      }
    }
  }
  onUploadedFile(uploadLink: string) {
    this.onUpload.next(uploadLink);
  }
  }
  
// export class UploadComponent implements OnInit {

//     @Output() onUpload: EventEmitter<{imageUploaded: Array<String>, isDoneUpload: boolean}>;
//     @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
//     files =[];
//     imageUploaded = [];
//     isDoneUpload = false;
// downloadURL: string;

//   constructor( private storage: AngularFireStorage) { 
//     this.onUpload = new EventEmitter(); 
//   }

//   ngOnInit() {
//   }


// onClick() {
//   this.files=[];
//   this.imageUploaded = [];
//   const fileUpload = this.fileUpload.nativeElement;
//   fileUpload.onchange = () => {
//     for (let index = 0; index < fileUpload.files.length; index++) {
//       const file = fileUpload.files[index];
//       if (file.type.match('image.*')) {
//         var size = file.size;
//         if (size > 2000000) {
//           alert("Tệp ảnh không quá 2 MB");
//         }
//         else {
//           this.files.push(file);
//         }
//       } else {
//         alert('Tệp phải là định dạng hình ảnh');
//       }
//     }

//   };

//   fileUpload.click();
// }


// }


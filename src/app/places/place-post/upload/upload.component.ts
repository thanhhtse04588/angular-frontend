
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  @Output() upload: EventEmitter<string>;
  isHovering: boolean;
  files: File[] = [];
  constructor() {
    this.upload = new EventEmitter();
  }
  ngOnInit() { }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      this.files = [];
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        if (file.type.match('image.*')) {
          (file.size > 2000000) ? alert('Tệp ảnh không quá 2 MB') : this.files.push(file);
        } else {
          alert('Tệp phải là định dạng hình ảnh');
        }
      }
    };
    fileUpload.click();
  }

  onDrop(files: FileList) {
    this.files = [];
    if (files?.length >= 10) {
      alert('Vui lòng cung cấp < 10 tệp tin');
    }
    for (let i = 0; i < files.length; i++) {

      if (files.item(i).type.match('image.*')) {
        (files.item(i).size > 2000000) ? alert('Tệp ảnh không quá 2 MB') : this.files.push(files.item(i));
      } else {
        alert('Tệp phải là định dạng hình ảnh');
      }
    }
  }

  uploadTask(uploadLink: string) {
    this.upload.next(uploadLink);
  }
}


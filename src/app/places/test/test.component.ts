import { Component } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  imgLink : string;
  constructor(private storage: AngularFireStorage) {}
  ngOnInit() {}
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `Images/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Images/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          this.imgLink = url+''
          console.log(url);
        }
      });
  }
}

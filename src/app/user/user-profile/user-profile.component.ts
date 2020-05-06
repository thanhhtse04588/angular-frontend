import { SharedService } from './../../shared/service/shared.service';
import {  _OBSERVER } from './../../shared/common';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { UserProfile } from './../../shared/model/user.model';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: ["mat-form-field {margin-right: 12px;}.mat-card-avatar {height: 70px;width: 70px;}"]
})
export class UserProfileComponent {
  fileName: string;
  link: string;
  uploaded= true;
  profileForm = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    gender: [''],
    dob: [''],
    address: ['',[ Validators.maxLength(100),Validators.required]],
    phoneNumber: ['',[Validators.pattern('((\\+91-?)|0)?[0-9]*'),Validators.required]],
    email: ['',[Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    avatarLink: ['',Validators.required],
  });

  constructor(
    private sharedService: SharedService,
    private storage: AngularFireStorage,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserProfile) {
// can't pass link to input type="file" ;
      this.profileForm.patchValue(user);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event) {
    this.uploaded = false;
    const n = Date.now();
    const file = event.target.files[0];
    if (file.type.match('image.*')) {
      if(file.size > 2000000){ this.sharedService.loggerDialog(false,'Tệp ảnh không quá 2 MB'); return;}
    } else {
      this.sharedService.loggerDialog(false,'Tệp phải là định dạng hình ảnh')
      return;
    }
    this.fileName = file.name;
    const filePath = `avatar/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`avatar/${n}`, file);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(avatarLink=> {
        sessionStorage.setItem("avatarLink",avatarLink)
        this.uploaded=true;
      } );
    })).subscribe();
  }

  get name() {return this.profileForm.get("name"); }
  get gender() {return this.profileForm.get("gender"); }
  get dob() {return this.profileForm.get("dob"); }
  get address() {return this.profileForm.get("address"); }
  get email() {return this.profileForm.get("email"); }
  get phoneNumber() {return this.profileForm.get("phoneNumber"); }
  get avatarLink() {return this.profileForm.get("avatarLink"); }
}

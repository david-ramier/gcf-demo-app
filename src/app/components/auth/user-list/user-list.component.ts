import { Component, OnInit } from '@angular/core';
import { AppUser } from '../../../models/app-user';
import { AuthenticationService } from '../../../services/authentication.service';
import {UserDataSource} from '../../../services/user-data-source';

import {AngularFirestore} from '@angular/fire/firestore';
import {MatDialog, MatDialogRef} from '@angular/material';
import {UserDetailsEditComponent} from '../user-details-edit/user-details-edit.component';

// @ts-ignore
const USER_DATA: AppUser[] = [
  {uid: '1', email: 'marcomaccio', firstname: 'Marco', lastname: 'Maccio', profileType: 'Admin', onlineStatus: true},
  {uid: '2', email: 'marcomaccio', firstname: 'Marco', lastname: 'Maccio', profileType: 'Admin', onlineStatus: false},
  {uid: '3', email: 'marcomaccio', firstname: 'Marco', lastname: 'Maccio', profileType: 'Admin', onlineStatus: true},
  {uid: '4', email: 'marcomaccio', firstname: 'Marco', lastname: 'Maccio', profileType: 'Admin', onlineStatus: false},
  {uid: '5', email: 'marcomaccio', firstname: 'Marco', lastname: 'Maccio', profileType: 'Admin', onlineStatus: true},
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['uid', 'country', 'firstname', 'lastname', 'profileType', 'onlineStatus', 'edit', 'delete'];
  dataSource; // = USER_DATA;

  userDetailsDialogRef: MatDialogRef<UserDetailsEditComponent>;

  constructor(public auth: AuthenticationService,
              private afFirestore: AngularFirestore,
              private dialog: MatDialog) {
    this.dataSource = new UserDataSource(this.afFirestore);
  }

  ngOnInit() {
  }

  openUserEditDialog(user: AppUser) {
    this.userDetailsDialogRef = this.dialog.open(UserDetailsEditComponent, {
      hasBackdrop: true,
      data: user,
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh'
    });
  }
}

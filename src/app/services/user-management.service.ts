import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AppUser} from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private usersCollection: AngularFirestoreCollection<AppUser>;

  users: Observable<AppUser[]>;

  constructor(private afFirestore: AngularFirestore) {
    this.usersCollection = afFirestore.collection<AppUser>('users');
    this.users = this.usersCollection.valueChanges();
  }

  addUser(user: AppUser) {
    this.usersCollection.add(user);
  }
}

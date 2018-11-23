
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

import {AppUser} from '../models/app-user';


export class UserDataSource extends DataSource<any> {

  constructor(private afFirestore: AngularFirestore) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.afFirestore.collection<AppUser>('users').valueChanges();
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }
}

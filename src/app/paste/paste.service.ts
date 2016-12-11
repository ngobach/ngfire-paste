import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Query } from 'angularfire2/interfaces';
import { Paste } from './paste';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PasteService {

  constructor(private af: AngularFire) {
  }

  getPastes(opt: Query = {}): FirebaseListObservable<any[]> {
    opt = Object.assign({
      orderByChild: 'priority'
    }, opt);
    return this.af.database.list('/pastes', {query: opt});
  }

  getPaste(id: string): Promise<Paste> {
    return new Promise((res, rej) => {
      const sub = this.af.database.object('/pastes/' + id).subscribe(paste => {
        res(paste);
        sub.unsubscribe();
      });
    });
  }

  createPaste(paste: Paste): Promise<string> {
    paste.priority = -paste.createdAt;
    return this.af.database.list('/pastes').push(paste).then(x => x.getKey()).catch(this.handleError);
  }

  updatePaste(id: string, paste: Paste) {
    paste.priority = -paste.createdAt;
    return this.af.database.list('/pastes').update(id, paste);
  }

  deletePaste(id: string): firebase.Promise<void> {
    return this.af.database.object('/pastes/' + id).remove();
  }

  handleError(err: any) {
    console.error(err);
  }
}

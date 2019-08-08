import {observable, action} from 'mobx';
// import AuthAPI from '../lib/api/auth';

class Store {
  @observable blob = null;

  constructor() {
    console.log("hello world");
  }

  @action use = () => {
    console.log("hello world");
    this.blob = null;
  }

  @action setBlob = blob => this.blob = blob;
  @action remove = () => this.blob = null;
}

const store = new Store();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

export default store;

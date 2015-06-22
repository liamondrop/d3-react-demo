import Router from './router';

let app = {
  init() {
    this.router = new Router();
    this.router.history.start();
    return this;
  }
};

export default app.init();
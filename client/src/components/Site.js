export class Site {
  constructor(name, code, chef) {
    this._id = code;
    this.name = name;
    this.chef = chef;
  }
}
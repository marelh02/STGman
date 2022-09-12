export class Service {
  constructor(name, code, site, chef) {
    this._id = code;
    this.name = name;
    this.site = site;
    this.chef = chef;
  }
}
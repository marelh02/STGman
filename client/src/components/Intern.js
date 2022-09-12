export class Intern {
  constructor(famName,name,sex,cin,school,nBadge,service,site,mentor,startDate,duration) {
      this._id=nBadge;
      this.fname=famName;
      this.name=name;
      this.sex=sex;
      this.cin=cin;
      this.school=school;
      this.service=service;
      this.site=site;
      this.mentor=mentor;
      this.startDate=startDate;
      this.duration=duration;
      this.endDate=new Date(startDate);
      this.endDate.setDate(this.endDate.getDate() + duration);
    }
}
import Medication from "./medication.js";

const sortByDesc = (dosage1, dosage2) => {
  let date1 = dosage1.timeTaken;
  let date2 = dosage2.timeTaken;

  if (date1 > date2) return -1;
  if (date1 < date2) return 1;

  return 0;
};

export default class AppModel {
  dosages = [Medication];

  get activeDosages() {
    return this.dosages.filter(dosage => !dosage.hasExpired).sort(sortByDesc);
  }

  get expiredDosages() {
    return this.dosages.filter(dosage => dosage.hasExpired).sort(sortByDesc);
  }
}

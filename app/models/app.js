import Medication from "./medication.js";
import { filter } from "microstates";

const sortByDesc = (dosage1, dosage2) => {
  let date1 = dosage1.timeTaken.state;
  let date2 = dosage2.timeTaken.state;

  if (date1 > date2) return -1;
  if (date1 < date2) return 1;

  return 0;
};

export default class AppModel {
  dosages = [Medication];

  get activeDosages() {
    return filter(this.dosages, dosage => !dosage.hasExpired).sort(sortByDesc);
  }

  get expiredDosages() {
    return filter(this.dosages, dosage => dosage.hasExpired).sort(sortByDesc);
  }
}

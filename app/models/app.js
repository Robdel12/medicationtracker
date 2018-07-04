import Medication from "./medication.js";

export default class AppModel {
  dosages = [Medication];

  get activeDosages() {
    return this.dosages.filter(dosage => !dosage.hasExpired);
  }

  get expiredDosages() {
    return this.dosages.filter(dosage => dosage.hasExpired);
  }
}

import moment from "moment";

export default class Medication {
  name = String;
  dosage = String;
  timeTaken = String;
  dosageDuration = String;

  // Computeds
  get displayTakenTime() {
    return moment(this.timeTaken).format("h:mma (MM/DD)");
  }

  get timeUp() {
    return moment(this.timeTaken).add(this.dosageDuration, "hours");
  }

  get timeUpDisplay() {
    return this.timeUp.format("h:mma (MM/DD)");
  }

  get timeLeft() {
    return moment().to(this.timeUp);
  }

  get hasExpired() {
    return this.timeLeft.includes("ago");
  }

  get isValid() {
    let { name, timeTaken, dosageDuration } = this;

    if (name.length && timeTaken.length && dosageDuration.length) {
      return true;
    } else {
      return false;
    }
  }
}

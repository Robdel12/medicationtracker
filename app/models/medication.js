import moment from "moment";

export default class Medication {
  name = String;
  dosage = String;
  timeTaken = Object;
  dosageDuration = String;

  initialize({ timeTaken }) {
    let initialized = this;

    if (typeof timeTaken === "string") {
      initialized = initialized.timeTaken.set(new Date(timeTaken));
    }

    return initialized;
  }

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
    // if the number is negative, it has expired
    return this.timeUp.diff(new Date()) < 0;
  }

  get notificationDate() {
    // moment date
    // TODO allow config of this notification
    return this.timeUp.subtract(10, "minutes").toDate();
  }

  // TODO there should be date validation that you're not taking
  // things in the future.
  get isValid() {
    let { name, timeTaken, dosageDuration } = this;

    if (name.length && !!timeTaken && dosageDuration.length) {
      return true;
    } else {
      return false;
    }
  }
}

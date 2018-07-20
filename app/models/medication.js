import moment from "moment";

export default class Medication {
  name = String;
  dosage = String;
  timeTaken = Object;
  dosageDuration = Number;

  initialize({ timeTaken }) {
    let initialized = this;

    if (typeof timeTaken === "string") {
      initialized = initialized.timeTaken.set(new Date(timeTaken));
    }

    return initialized;
  }

  // Computeds
  get timeUp() {
    return moment(this.timeTaken).add(this.dosageDuration, "hours");
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

  // display formatting
  get formattedTakenTime() {
    return moment(this.timeTaken).format("h:mma");
  }

  get formattedExpireTime() {
    return this.timeUp.format("h:mma");
  }

  get formattedTakenFullDate() {
    return moment(this.timeTaken).format("MM/DD/YYYY");
  }
}

import Medication from "../../models/medication";

class FormModel extends Medication {
  showPicker = Boolean;

  get durationIsAnHour() {
    let duration = parseInt(this.dosageDuration.state, 10);

    return duration <= 24;
  }

  get isValid() {
    let { name, timeTaken, dosage, dosageDuration } = this;

    if (
      name.state.length &&
      !!timeTaken.state &&
      dosageDuration.state &&
      dosage.state.length &&
      this.durationIsAnHour
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export default FormModel;

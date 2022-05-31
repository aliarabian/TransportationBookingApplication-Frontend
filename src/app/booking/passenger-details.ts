export class PassengerDetails {
  firstName: string;
  lastName: string;
  nationalIdNO: string;
  birthdate: Date;
  passportNO: string;
  passportExpirationDate: Date;
  passportIssuingCountryCode: string;

  constructor(firstName: string, lastName: string, nationalIdNO: string,
              birthdate: Date,
              passportNO: string,
              passportExpirationDate: Date,
              passportIssuingCountryCode: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.nationalIdNO = nationalIdNO;
    this.birthdate = birthdate;
    this.passportNO = passportNO;
    this.passportExpirationDate = passportExpirationDate;
    this.passportIssuingCountryCode = passportIssuingCountryCode;
  }


}

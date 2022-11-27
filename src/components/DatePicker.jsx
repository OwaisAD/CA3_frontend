import React from "react";

const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const DatePicker = ({onChange}) => {
  var today = new Date();
  var dd = String(today.getDate());
  var mm = String(today.getMonth() + 1); //January is 0!
  var minimum_yyyy = today.getFullYear() - 125;
  var maximum_yyyy = today.getFullYear() - 18;

  const minimumDate = minimum_yyyy + "-" + mm + "-" + dd; // set because maximum age is 120
  const maximumDate = maximum_yyyy + "-" + mm + "-" + dd; // set because minimum age is 13

  return (
    <>
      <input type="date" id="age" min={minimumDate} max={maximumDate} required onChange={onChange}/>
    </>
  );
};

export { DatePicker, getAge };

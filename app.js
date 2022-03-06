const strengthPassword = document.querySelector(".strength-password");
const inputPassword = document.querySelector("#password");
const warningPassword = document.querySelector(".warning-password");

inputPassword.addEventListener("input", checkPassword);

function checkPassword() {
  let strength = 100;
  warningPassword.innerHTML = "";

  let arrWarning = assessmentsPassword(inputPassword.value);

  arrWarning.forEach((warning) => {
    if (warning == null) return;

    strength -= warning.strengthLost;

    const p = document.createElement("p");
    p.innerHTML = warning.warning;
    warningPassword.append(p);
  });
  strengthPassword.style.setProperty("--strength-password", strength);
}

// đưa các cảnh báo  vào 1 mảng
function assessmentsPassword(password) {
  let arrWarning = [];
  arrWarning.push(assessmentLengthPassword(password));
  arrWarning.push(assessmentLowerCasePassword(password));
  arrWarning.push(assessmentUpperCasePassword(password));
  arrWarning.push(assessmentNumber(password));
  arrWarning.push(assessmentSpecialCharacter(password));
  arrWarning.push(assessmentRepeatCharacter(password));
  return arrWarning;
}

// kiểm tra độ dài
function assessmentLengthPassword(password) {
  let length = password.length;
  if (length <= 6) {
    return {
      warning: "Mật khẩu quá ngắn",
      strengthLost: 40,
    };
  }
}

function assessmentLowerCasePassword(password) {
  return assessmentTypePassword(password, /[a-z]/g, " chữ  thường");
}
function assessmentUpperCasePassword(password) {
  return assessmentTypePassword(password, /[A-Z]/g, " chữ  hoa");
}
function assessmentNumber(password) {
  return assessmentTypePassword(password, /[0-9]/g, " số");
}
function assessmentSpecialCharacter(password) {
  return assessmentTypePassword(
    password,
    /([^0-9a-zA-Z\s])/g,
    " ký tự đặc biệt"
  );
}

// kiểm tra các loại (chữ thường, chữ hoa, số, ký tự đặc biệt )
function assessmentTypePassword(password, RegX, warning) {
  let checkPassword = password.match(RegX) || [];
  if (checkPassword.length === 0) {
    return {
      warning: `Mật khẩu cần có ${warning}`,
      strengthLost: 20,
    };
  }
  if (checkPassword.length <= 2) {
    return {
      warning: `Mật khẩu cần có nhiều ${warning} hơn`,
      strengthLost: 5,
    };
  }
}
// kiểm tra lặp ký tự
function assessmentRepeatCharacter(password) {
  let checkPasswordRepeat = password.match(/(.)\1/g) || [];
  console.log(checkPasswordRepeat.length);
  if (checkPasswordRepeat.length >= 2) {
    return {
      warning: "Mật khẩu có ký tự bị lặp lại",
      strengthLost: checkPasswordRepeat.length * 10,
    };
  }
}

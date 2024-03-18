const theme_switchs = document.querySelectorAll(".theme_switch input"),
  userInput = document.getElementById("userInput"),
  outPut = document.getElementById("outPut"),
  digit_btns = document.getElementsByName("digit"),
  math_exp = document.querySelectorAll(".math_exp");

// Define a class called CheckTheme
class CheckTheme {
  constructor() {}

  // Method to switch between different themes based on the checked switch
  SwitchTheme(index) {
    const body = document.body;
    // Check which switch is checked and set the theme accordingly
    if (index === 0) {
      body.className = "";
      this.saveTheme(null, 0);
    } else if (index === 1) {
      body.className = "Theme_2";
      this.saveTheme("Theme_2", 1);
    } else if (index === 2) {
      body.className = "Theme_3";
      this.saveTheme("Theme_3", 2);
    }
  }

  // Method to save the selected theme and input number to local storage
  saveTheme(ThemeNum, InputNum) {
    localStorage.setItem("Theme_Number", `${ThemeNum}`);
    localStorage.setItem("Input_Number", `${InputNum}`);
  }

  // Method to load the selected theme from local storage
  LoadTheme() {
    // Check if theme and input number are stored in local storage

    const isThemeFound_InStorage = localStorage.getItem("Theme_Number");
    const isInputChecked = localStorage.getItem("Input_Number");

    // If stored, apply the theme and set the corresponding switch as checked
    if (isThemeFound_InStorage && isInputChecked) {
      document.body.className = isThemeFound_InStorage;
      theme_switchs[isInputChecked].checked = true;
    }
  }
}

// Create an instance of the CheckTheme class
const ThemeSwitch_And_Save = new CheckTheme();

// Add event listeners to each theme switch
// Loop through each element in theme_switchs and add event listener
theme_switchs.forEach((switchElement, index) => {
  switchElement.addEventListener("change", () => {
    ThemeSwitch_And_Save.SwitchTheme(index);
  });
});

// Execute the LoadTheme method when the window loads
window.onload = () => {
  ThemeSwitch_And_Save.LoadTheme();
};

// Define a class
class Calculate {
  // Constructor to initialize property
  constructor() {
    this.currentDigit = "";
  }

  // add digits to the userInput element
  AddDigits(digit) {
    // Output the current text content of userInput
    console.log(userInput.innerText);

    // Replace 'x' with '*' for multiplication
    digit === "x" ? (digit = "*") : digit;

    // Check if the last character is an operator and the new digit is an operator or a decimal point
    if (
      userInput.innerText.slice(-1).match(/[+\-/*.]/g) &&
      digit.match(
        /[+\-/*.]/g || (userInput.innerText.includes(".") && digit === ".")
      )
    )
      return;

    // Set the current digit
    this.currentDigit = String(digit);

    // Display the output
    this.DisplayOutput(this.currentDigit);
  }

  // Method to reset the calculator
  Reset() {
    this.currentDigit = "";
    userInput.innerText = "";
    outPut.innerText = "";
  }

  // Method to remove the last character from userInput
  Reduce_1() {
    userInput.innerText = userInput.innerText.slice(0, -1);
  }

  // Method to calculate the final result
  FinalResult() {
    try {
      // Evaluate the expression and display the result with comma separators
      outPut.innerText = eval(userInput.innerText).toLocaleString();
      userInput.innerText = ""; // Reset userInput
    } catch (error) {
      // Display an alert if there's an error in the input
      alert(`Error in Input: ${error}`);
    }
  }

  // Method to display the output
  DisplayOutput(outPut_Element) {
    // Return if the length of userInput exceeds 12 characters
    if (userInput.innerText.length > 12) return;

    // Concatenate the output element to userInput
    if (
      userInput.innerText === "" &&
      outPut_Element.match(/[+\-/*.]/) &&
      !outPut.innerText.includes(".")
    ) {
      userInput.innerText = outPut.innerText + outPut_Element;
      outPut.innerText = "";
    } else {
      userInput.innerText = userInput.innerText
        .concat(outPut_Element)
        .toLocaleString();
    }
  }
}

// Create an instance of the Calculate class
const calculator = new Calculate();

// Add event listeners to digit buttons
digit_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.AddDigits(btn.innerText);
  });
});

// Add event listeners to math expression buttons
math_exp.forEach((exp) => {
  exp.addEventListener("click", () => {
    calculator.AddDigits(exp.innerText);
  });
});

// // function for saving Themes on localStorage
// const saveTheme = (theme_number, Input_number) => {
//   localStorage.setItem("colorScheme", `${theme_number}`);
//   localStorage.setItem("inputNumber", `${Input_number}`);
// };

// // function for changeing Theme

// const changeTheme = () => {
//   let body = document.body;
//   if (theme_switchs[0].checked) {
//     body.className = "";
//     saveTheme(null, 0);
//   } else if (theme_switchs[1].checked) {
//     body.className = "Theme_2";
//     saveTheme("Theme_2", 1);
//   } else if (theme_switchs[2]) {
//     body.className = "Theme_3";
//     saveTheme("Theme_3", 2);
//   }
// };

// // function for Loading Theme

// const loadTheme = () => {
//   let isThemeStore = localStorage.getItem("colorScheme");
//   let theme_number = localStorage.getItem("inputNumber");
//   if (isThemeStore && theme_number) {
//     document.body.className = isThemeStore;
//     theme_switchs[theme_number].checked = true;
//   }
// };
// // Called on page is load
// loadTheme();

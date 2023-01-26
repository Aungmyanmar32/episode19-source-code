const usersInfoTag = document.querySelector(".usersInfo");

//UI maker function
const showOnUI = (name, email) => {
  const userDiv = document.createElement("div");
  userDiv.classList.add("user");
  userDiv.innerHTML = `<h2>Welcome ${name}.</h2>
    <p>Your email is ${email} <p>`;

  usersInfoTag.append(userDiv);
};

//Get user data from server
const getUsersFromServer = async () => {
  const url = "http://localhost:3000/allUsers";
  const response = await fetch(url);
  const data = await response.json();
  for (let i = 0; i < data.length; i++) {
    let userName = data[i].name;
    let userEmail = data[i].email;
    showOnUI(userName, userEmail);
  }
};

getUsersFromServer();

//Get input tag
const inputedName = document.querySelector(".newUserName");
const inputedEmail = document.querySelector(".newUserEmail");

//define new user info
let newUserName;
let newUserEmail;
let newUserobject;

//get value from input
inputedName.addEventListener("change", (e) => {
  newUserName = e.target.value.toString();
});
inputedEmail.addEventListener("change", (e) => {
  newUserEmail = e.target.value.toString();
});

//empty input value function
const emptyInputvalue = () => {
  inputedName.value = "";
  inputedEmail.value = "";
  newUserName = "";
  newUserEmail = "";
};

//Post new user to server and get posted user
const registerNewUser = async () => {
  newUserobject = {
    name: newUserName,
    email: newUserEmail,
  };

  //check name and email is not empty
  if (newUserName || newUserEmail) {
    //Post data to server
    const response = await fetch("http://localhost:3000/allUsers", {
      method: "POST",
      body: JSON.stringify(newUserobject),
    });

    //appen new user info to front end ,then empty all input value
    const data = await response.json();
    let userName = data[data.length - 1].name;
    let userEmail = data[data.length - 1].email;
    await showOnUI(userName, userEmail);
    await emptyInputvalue();
  }
};

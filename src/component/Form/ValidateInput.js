export const validateInput = (values) => {
  const error = {};
  const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  if (!values.userName && "userName" in values) {
    error.userName = "Username is required!";
  } 
  if (!values.email) {
    error.email = "Email is required!";
  } else if (!regex.test(values.email)) {
    error.email = "Email is not valid!";
  }
  if (!values.password) {
    error.password = "Password is required!";
  } else if (values.password.length <= 5) {
    error.password = "Password must contain more than 5 characters!";
  }
  return error;
};

import { useState } from "react";
import { useDispatch } from "react-redux";

import { SignUpStart } from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss";

// ini adalah object yang mendefinisikan nilai awal untuk setiap field dalam form sign up
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();

  // `formField` adalah state yang menyimpan nilai dari field form. dan `setFormField` adalah function yang memperbarui state ini
  const [formField, setFormField] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formField;

  const resetFormFields = () => {
    setFormField(defaultFormFields);
  };

  // fungsi ini menangani perubahan input pada form. fungsi ini mengambil event sebagai parameter kemudian memperbarui formField berdasarkan name dan value dari input yang berubah.
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    try {
      dispatch(SignUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don&apos;t have an account?</h2>
      <p>Sign up with your email and password</p>
      <form onSubmit={handleSubmitForm}>
        <FormInput
          label="Display Name"
          type="text"
          onChange={handleFormChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          onChange={handleFormChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          onChange={handleFormChange}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleFormChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignUpForm;

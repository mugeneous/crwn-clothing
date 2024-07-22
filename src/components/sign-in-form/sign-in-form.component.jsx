import { useState, useContext } from "react";
import {
  signInWithGooglePopup,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase.utils";
import { UserContext } from "../contexts/user.context";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSignInWithGoogle = async (event) => {
    event.preventDefault();
    await signInWithGooglePopup();
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    try {
      const response = await signInUserWithEmailAndPassword(email, password);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          alert("Email atau kata sandi salah");
          break;

        default:
          console.log(error.code);
          break;
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <p>Sign in with your email and password</p>
      <form onSubmit={handleSubmitForm}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formFields.email}
          onChange={handleFormChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formFields.password}
          onChange={handleFormChange}
        />
        <div className="button-sign-in-container">
          <Button type="submit">SIGN IN</Button>
          <Button buttonType="google" onClick={handleSignInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

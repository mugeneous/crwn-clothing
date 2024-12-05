import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSignInWithGoogle = async (event) => {
    event.preventDefault();
    dispatch(googleSignInStart());
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
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

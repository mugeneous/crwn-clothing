import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase.utils";

const SignIn = () => {
  const handleSignInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(response.user);
  };
  return (
    <div>
      This is Sign In
      <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
    </div>
  );
};

export default SignIn;

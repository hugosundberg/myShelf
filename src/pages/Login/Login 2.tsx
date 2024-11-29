import styles from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";

const Login: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/account");
  }, [user, navigate]);

  const handleAddUser = async (user: User) => {
    try {
      // Use setDoc to create or update the user document
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
    }
  };

  // Sign in with Google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await handleAddUser(result.user); // Ensure user is added to Firestore
        navigate("/account");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className={styles.contentBody}>
      {loading ? (
        <div className={styles.spinnerDiv}>
          <span className={styles.loader}></span>
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <h2>Login</h2>
          <p>Sign in using one of the providers</p>
          <button className={styles.loginButton} onClick={GoogleLogin}>
            <h3>
              <FcGoogle className={styles.googleIcon} />
              Sign in using Google
            </h3>
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;

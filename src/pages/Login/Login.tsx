import styles from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Login: React.FC = () => {
  // Sign in with google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  if (user) navigate("/account");

  return (
    <>
      <div className={styles.contentBody}>
        <div className={styles.loginContainer}>
          <h2>Login</h2>
          <p>Sign in using one of the providers</p>
          <button
            className={styles.loginButton}
            onClick={() => {
              GoogleLogin();
              navigate("/account");
            }}
          >
            <h3>
              <FcGoogle className={styles.googleIcon} />
              Sign in using Google
            </h3>
          </button>

          <button className={styles.loginButton}>
            <h3>
              <FaFacebook className={styles.facebookIcon} />
              Sign in using Facebook
            </h3>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

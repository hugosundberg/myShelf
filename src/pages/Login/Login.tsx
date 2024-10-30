import styles from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login: React.FC = () => {
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(googleProvider, auth);
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.contentBody}>
        <div className={styles.loginContainer}>
          <h2>Login</h2>
          <p>Sign in using one of the providers</p>
          <button className={styles.loginButton}>
            <h3>
              <FcGoogle className={styles.googleIcon} />
              Log in using Google
            </h3>
          </button>

          <button className={styles.loginButton}>
            <h3>
              <FaFacebook className={styles.facebookIcon} />
              Log in using Facebook
            </h3>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

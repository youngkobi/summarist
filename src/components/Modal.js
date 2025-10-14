import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';


function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const [noAccount, setNoAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  function register() {
    e.preventDefault();
    console.log("works");
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // Signed up
        console.log(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  function login() {
    e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const isSuccess = true; 
           console.log("Submitting form with", { email, password });
             if (isSuccess) {
      // Redirect to the dashboard on successful login
     router.push('/foryou'); 
    } else {
      // Handle login failure
      alert('Login failed!');
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  return (
    noAccount ? 
    <>
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="modal-close-button">
          &times;
        </button>
        {children}
        <h2 className="modal-title">Sign up for Summarist</h2>

        <button className="login-button login-google no-cursor">
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M22.56 12.27c0-.78-.07-1.5-.18-2.22H12.01v4.16h5.8c-.25 1.25-.97 2.34-2.05 3.16v2.7h3.48c2.04-1.89 3.22-4.73 3.22-8.03z" />
            <path d="M12.01 19.34c-2.92 0-5.41-1.97-6.3-4.66H2.21v2.7h3.81c.88 2.05 2.5 3.66 4.49 4.14v-3.18z" />
            <path d="M5.71 12.01c-.18-.54-.28-1.12-.28-1.72s.1-1.18.28-1.72V5.87H1.9C1.35 6.94 1 8.2 1 9.57s.35 2.63.9 3.7l3.81-2.46z" />
            <path d="M12.01 4.75c1.69 0 3.22.58 4.41 1.71l3.05-2.94C17.38 1.28 14.86 0 12.01 0 8.89 0 6.01 1.77 4.39 4.43l3.82 2.94c.89-2.69 3.38-4.62 6.3-4.62z" />
          </svg>
          Sign-up with Google
        </button>

        <div className="or-divider">
          <span className="or-text">or</span>
        </div>

        <form onSubmit={register}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on change
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-button login-main">Signup</button>
        </form>

        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}

        <a href="#" className="link no-cursor">
          Forgot your password?
        </a>

        <a href="#" className="link" onClick={() => setNoAccount(false)}>
          Already have an account?
        </a>
      </div>
    </div>
    </>
    : 
    <>
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose} className="modal-close-button">
          &times;
        </button>
        {children}
        <h2 className="modal-title"> Log in to Summarist</h2>

        <button className="login-button login-guest">
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          Login as a Guest
        </button>

        <div className="or-divider">
          <span className="or-text">or</span>
        </div>

        <button className="login-button login-google">
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M22.56 12.27c0-.78-.07-1.5-.18-2.22H12.01v4.16h5.8c-.25 1.25-.97 2.34-2.05 3.16v2.7h3.48c2.04-1.89 3.22-4.73 3.22-8.03z" />
            <path d="M12.01 19.34c-2.92 0-5.41-1.97-6.3-4.66H2.21v2.7h3.81c.88 2.05 2.5 3.66 4.49 4.14v-3.18z" />
            <path d="M5.71 12.01c-.18-.54-.28-1.12-.28-1.72s.1-1.18.28-1.72V5.87H1.9C1.35 6.94 1 8.2 1 9.57s.35 2.63.9 3.7l3.81-2.46z" />
            <path d="M12.01 4.75c1.69 0 3.22.58 4.41 1.71l3.05-2.94C17.38 1.28 14.86 0 12.01 0 8.89 0 6.01 1.77 4.39 4.43l3.82 2.94c.89-2.69 3.38-4.62 6.3-4.62z" />
          </svg>
          Login with Google
        </button>

        <div className="or-divider">
          <span className="or-text">or</span>
        </div>

        <form onSubmit={login}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on change
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-button login-main">Login</button>
        </form>

        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}

        <a href="#" className="link no-cursor">
          Forgot your password?
        </a>

        <a href="#" className="link" onClick={() => setNoAccount(true)}>
          Don't have an account?
        </a>
      </div>
    </div>
    </>
  )
}

export default Modal;




//          {
// noAccount ?  <a href="#" className="link" onClick={()=>setNoAccount(false)}>Already have an account?</a>:

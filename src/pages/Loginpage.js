import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonImg,
  IonLabel,
  useIonRouter,
  IonGrid,
  IonRow,
  useIonAlert,
  useIonToast,
} from "@ionic/react";

import "./Logipage.css";
import img1 from "../assets/images/Google.png";
import img2 from "../assets/images/Facebook.png";
import img3 from "../assets/images/Twitter.png";
import img4 from "../assets/images/eatmore logo.png";
import { Link } from "react-router-dom";
import { firebaseApp } from "./firebase";
import { useState, useEffect } from "react";
import { toastController } from "@ionic/core";
import logo from "../assets/images/Group 12.png";
import { alertOutline } from "ionicons/icons";
const Login = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [PassswordError, setPasswordError] = useState("");
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();

  let router = useIonRouter();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };
  const authlistener = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };
  useEffect(() => {
    authlistener();
  }, []);

  const handleAlert = (err) => {
    presentAlert({
      header: "Alert",
      message: err,
      buttons: ["OK"],
      backdropDismiss: true,
      transculent: true,
      animated: true,
      cssClass: "lp-alert",
    });
  };

  const handleToast = (err) => {
    present({
      message: err,
      position: "top",
      animated: true,
      duration: 2000,
      color: "light",
      model: "ios",
      icon: alertOutline,
    });
  };

  const handlelogin = () => {
    clearErrors();

    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push("/dashboard");
      })
      .then(() => {
        handleToast(" You have login successfully");
      })

      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            handleAlert(err);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);

            break;
        }
      });
  };

  return (
    <IonPage>
      <IonContent className="ta-ta">
        <IonGrid className="log-grid">
          <IonRow className="logo-ro">
            <IonImg className="home-last1" src={logo} alt=" "></IonImg>
          </IonRow>
          <IonRow className="loginhead-row">
            <IonLabel className="logintxt">Login</IonLabel>
          </IonRow>
          <IonRow className="row-input">
            <IonInput
              className="row-input-1"
              placeholder="Enter your email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value)}
            ></IonInput>
            <IonInput
              className="row-input-2"
              type="password"
              placeholder="Enter your password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value)}
            ></IonInput>
          </IonRow>
          <IonRow className="login-row">
            <IonButton
              className="login-btn"
              onClick={handlelogin}
              color="danger"
              shape="round"
            >
              Login
            </IonButton>
          </IonRow>
          <IonRow className="or-text">
            <IonLabel className="OR">OR</IonLabel>
          </IonRow>
          <IonRow className="line-text">
            <IonLabel className="tagline-txt">
              Already have an Account ?{" "}
            </IonLabel>
            <Link className="link-lo" to="/signuppage">
              SignUp
            </Link>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;

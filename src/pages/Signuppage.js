import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonImg,
  IonLabel,
  IonGrid,
  IonRow,
  useIonRouter,
  useIonAlert,
  useIonToast,
} from "@ionic/react";

import "./Signuppage.css";
import img1 from "../assets/images/Google.png";
import img2 from "../assets/images/Facebook.png";
import img3 from "../assets/images/Twitter.png";

import { Link } from "react-router-dom";
import { firebaseApp } from "./firebase";
import { useState, useEffect } from "react";

import logo from "../assets/images/Group 12.png";
import { alertOutline } from "ionicons/icons";

const Signup = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [PassswordError, setPasswordError] = useState("");
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();

  let router = useIonRouter();

  const clearinputs = () => {
    setEmail("");
    setPassword("");
    setconfirmPassword("");
  };
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };
  const authlistener = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        clearinputs();
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
      cssClass: "lp-tp-alert",
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

  const handleSignup = () => {
    clearErrors();
    if(email == null || email ===""){
      const msg = "please enter your email";
      handleToast(msg);
    }else if (password == null || password ==="") {
      const msg = "please enter your password";
      handleToast(msg);
    }else if (password === confirmpassword) {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password, confirmpassword)
        .then(() => {
          router.push("/dashboard");
        })
        .then(() => {
          handleToast(" You have Registered successfully");
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              handleAlert(err);
              break;
            case "auth/weak-password":
              handleAlert(err);
              break;
          }
        });
    } else {
      handleAlert("password as didn't matched");
    }
  };
  return (
    <IonPage>
      <IonContent className="sign-cont">
        <IonGrid className="ga-mg">
          <IonRow className="logo-ro">
            <IonImg className="home-last1" src={logo} alt=" "></IonImg>
          </IonRow>
          <IonRow className="card-row">
            <IonLabel className="signtxt">SignUp</IonLabel>
          </IonRow>
          <IonRow className="inputs">
            <IonInput
              className="input1"
              placeholder="Enter your email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value)}
            ></IonInput>
            <IonInput
              className="input2"
              placeholder="Create your password"
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value)}
            ></IonInput>
            <IonInput
              className="input3"
              placeholder="Confirm your password"
              value={confirmpassword}
              type="password"
              onIonChange={(e) => setconfirmPassword(e.detail.value)}
            ></IonInput>
          </IonRow>
          <IonRow className="card-row">
            <IonButton
              onClick={handleSignup}
              color="danger"
              shape="round"
              className="Signupbtn"
            >
              <IonLabel>Signup</IonLabel>
            </IonButton>
          </IonRow>
          <IonRow className="card-row">
            <IonLabel className="or">OR</IonLabel>
          </IonRow>
          <IonRow className="text-row">
            <IonLabel className="text">Don't have any account ? </IonLabel>
            <Link to="/loginpage" className="txt">
              Login
            </Link>
          </IonRow>
          <IonRow>
            <IonLabel></IonLabel>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Signup;

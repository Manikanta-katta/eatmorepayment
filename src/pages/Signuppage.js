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
  IonSpinner,
  IonLoading,
  useIonLoading
} from "@ionic/react";

import "./Signuppage.css";
import img1 from "../assets/images/Google.png";
import img2 from "../assets/images/Facebook.png";
import img3 from "../assets/images/Twitter.png";

import { Link } from "react-router-dom";
import { firebaseApp } from "./firebase";
import { useState, useEffect } from "react";

import logo from "../assets/images/Eatmorelogo.png";
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
  const [presant, dismiss] =useIonLoading()

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
    clearinputs();
    if(email == null || email ===""){
      const msg = "please enter your email";
      handleToast(msg);
    }else if (password == null || password ==="") {
      const msg = "please enter your password";
      handleToast(msg);
    }else if (password === confirmpassword) {
     
      presant({
        message: 'Loading',
        duration:2000
      })
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password, confirmpassword)
   
        .then(() => {
          dismiss();
          router.push("/loginpage");
        
        })
        .then(() => {
          handleToast(" You have Registered successfully");
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
             dismiss();
            handleAlert(err);
              break;
            case "auth/weak-password":
             dismiss();
             handleAlert(err);
              break;
          }
        });
        
    } else {

      //dismiss();
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
            <Link onClick={clearinputs} to="/loginpage" className="txt">
              Login
            </Link>
          </IonRow>
          <IonRow className="gfauth-signrow">
          <Link >
              <IonImg className="image1" src={img1} alt=" "></IonImg>
            </Link>
            <Link >
              {" "}
              <IonImg className="image2" src={img2} alt=" "></IonImg>
            </Link>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Signup;

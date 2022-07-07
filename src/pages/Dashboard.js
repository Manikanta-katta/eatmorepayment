import {
  IonButton,
  IonCard,
  IonContent,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonTabBar,
  IonTabButton,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  useIonRouter,
} from "@ionic/react";

import {
  menu,
  homeSharp,
  searchSharp,
  cartSharp,
  personCircleSharp,
} from "ionicons/icons";
import "./Dashboard.css";
import logo from "../assets/images/Group 12.png";
import { firebaseApp } from "C:/Users/ManikantaKatta/Desktop/Eatmore/src/pages/firebase.js";

import img5 from "../assets/images/Pizza.png";
import pizalog from "../assets/images/pizalog.png";
import seafood from "../assets/images/seafood.png";
import softdrink from "../assets/images/softdrink.png";

import { toastController } from "@ionic/core";

const Dashboard = () => {
  let router = useIonRouter();
  const handleToast = async (err) => {
    const toast = await toastController.create({
      color: "light",
      position: "top",
      duration: 3000,
      message: err,
      translucent: false,
      showCloseButton: true,
    });
    await toast.present();
  };
  const handlelogout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        router.push("/loginpage");
      })
      .then(() => {
        handleToast("You have logout successfully");
      });
  };

  return (
    <IonPage>
      <IonContent fullscreen className="dash-cont">
        <IonGrid>
          <IonRow className="dashboard-row">
            <IonCol>
              <IonImg className="home-last" src={logo} alt=" "></IonImg>
            </IonCol>
            <IonCol className="col-men">
              {" "}
              <IonIcon className="icon-l" icon={menu} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonSearchbar
              className="Search"
              placeholder="Search"
            ></IonSearchbar>
          </IonRow>
          <IonRow>
            <IonText className="categoriestxt">Categories</IonText>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonCard className="card1">
                <IonImg className="pizalog" src={pizalog} alt=" "></IonImg>
                <IonLabel className="card1text">Pizza</IonLabel>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard className="card2">
                <IonImg className="sfo" src={seafood} alt=" "></IonImg>
                <IonLabel className="card2text">SeaFood</IonLabel>
              </IonCard>
            </IonCol>
            <IonCol size="4">
              <IonCard className="card3">
                <IonImg className="sft" src={softdrink} alt=" "></IonImg>
                <IonLabel className="card3text">SoftDrink</IonLabel>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow className="logout-row">
            <IonButton
              color="danger"
              className="logoutbtn"
              onClick={handlelogout}
            >
              <IonLabel>Logout</IonLabel>
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonTabBar slot="bottom" className="tab">
        <IonTabButton tab="tab1">
          <IonIcon icon={homeSharp} />
          <IonLabel>home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2">
          <IonIcon icon={searchSharp} />
          <IonLabel>Search</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3">
          <IonIcon icon={cartSharp} />
          <IonLabel>Orders</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3">
          <IonIcon icon={personCircleSharp} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default Dashboard;

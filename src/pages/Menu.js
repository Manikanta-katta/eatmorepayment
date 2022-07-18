import {
  IonContent,
  IonIcon,
  useIonRouter,
  IonLabel,
  IonPage,
  IonGrid,
  IonRow,
  useIonToast,
  IonTabBar,
  IonTabButton,
  IonText,
  IonList,
  IonItem,
  IonToolbar,
  IonHeader,
} from "@ionic/react";

import {
  searchSharp,
  homeSharp,
  cartSharp,
  personCircleSharp,
} from "ionicons/icons";
import { firebaseApp } from "./firebase";
import "./Menu.css";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
const Menu = () => {
  const [present] = useIonToast();
  const handleToast = (err) => {
    present({
      message: err,
      position: "top",
      animated: true,
      duration: 2000,
      color: "light",
      model: "ios",
    });
  };
  let router = useIonRouter();
  // const signOutGoogle = async () => {
  //    await  GoogleAuth.signOut();
  //     router.push("/loginpage");

  // };

  const handlelogout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        router.push("/");
      })
      .then(() => {
        handleToast("You have logout successfully");
      });
  };
  return (
    <IonPage>
      <IonContent fullscreen className="menu-cont">
        <IonToolbar className="menu-tb">
          <IonHeader className="menu-h">Menu</IonHeader>
        </IonToolbar>
        <IonGrid className="menu-grid">
          <IonList className="menu-list">
            <IonItem button>
              <IonRow className="dashboard-row">
                <IonLabel>Account Details</IonLabel>
              </IonRow>
            </IonItem>

            <IonItem button>
              <IonRow>
                <IonLabel>Settings</IonLabel>
              </IonRow>
            </IonItem>

            <IonItem button>
              <IonRow>
                <IonText>Categories</IonText>
              </IonRow>
            </IonItem>

            <IonItem button>
              <IonRow>
                <IonLabel> Your Orders</IonLabel>
              </IonRow>
            </IonItem>

            <IonItem button>
              <IonRow>
                <IonLabel
                  onClick={
                    // signOutGoogle();
                    handlelogout
                  }
                >
                  Logout
                </IonLabel>
              </IonRow>
            </IonItem>
          </IonList>
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

        <IonTabButton tab="">
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
export default Menu;

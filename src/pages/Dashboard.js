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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonViewWillEnter,
  
  
  IonToolbar
} from "@ionic/react";
import { data } from "./data";
import { useState} from "react";
import {
  menu,
  homeSharp,
  searchSharp,
  cartSharp,
  personCircleSharp,
} from "ionicons/icons";
import "./Dashboard.css";
import logo from "../assets/images/Eatmorelogo.png";







const Dashboard = () => {
  let router = useIonRouter();
  const [sdata, setData] = useState([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  
  const pushData = () => {
     const max = sdata.length + 10;
     const min = max - 10;
    const newData = [];

    if(sdata.length === 30){
     setInfiniteDisabled(true);
    }else{
    for(let i = min;i < max;i++){
   data[i].id = data[i].id + i*i;
   newData.push(data[i]);
    }
  
    
    setData([
      ...sdata,
      ...newData
    ]);
  }
}
  const loadData = (ev) => {
    console.log(sdata.length);
    setTimeout(() => {
      pushData();
      console.log('Loaded data');
      ev.target.complete();
      if (sdata.length === 10) {
        setInfiniteDisabled(sdata.length < 10);
      }
    }, 5000);
  }
  useIonViewWillEnter(() => {
    pushData();  
  });
  return (
    <IonPage>
      <IonToolbar className="tool-bar">
        <IonGrid >
        <IonRow className="dashboard-row">
            <IonCol className="logo-col">
              <IonImg className="home-logo" src={logo} alt=" "></IonImg>
            </IonCol>
            <IonCol className="col-men">
         <IonButton fill="clear" routerLink="/menu" className="menu-button">
              <IonIcon className="icon-l" icon={menu} />
              </IonButton>
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
        </IonGrid>
      </IonToolbar>
      

      <IonContent fullscreen className="dash-cont">
        
         <IonGrid className="dash-grid">
         
          {sdata.map((Data) =>{
            return(
              <IonRow key={Data.id}>
                <IonCol className="data">
                  <IonCard>
                    <IonImg src={Data.image} className="image_s"/>
                  </IonCard>
                </IonCol>
                <IonCol>
                  <IonGrid>
                    <IonRow>
                  <IonText>{Data.name}</IonText>
                  </IonRow>
                  <IonRow>
                  <IonText> Price :{Data.price}</IonText>
                  </IonRow>
                  <IonRow>
                    <IonButton color='danger'>
                      Order
                    </IonButton>
                  </IonRow>
                  </IonGrid>
                </IonCol>
              </IonRow>
            )
          })}
           <IonInfiniteScroll
          onIonInfinite={loadData}
          threshold="100px"
          disabled={isInfiniteDisabled}
        >
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
        
         
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

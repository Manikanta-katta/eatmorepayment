import {
  IonButton,
  IonCard,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  IonSearchbar,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonViewWillEnter,
  IonToolbar,
} from "@ionic/react";
import { datai } from "./data";
import { useState, useEffect } from "react";
import { menu, heartOutline } from "ionicons/icons";
import "./Dashboard.css";
import logo from "../assets/images/Eatmorelogo.png";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const Dashboard = (props) => {
  //let router = useIonRouter();
  const [product, setproduct] = useState([]);
  const productRef = collection(db, "App_products");

  const [sdata, setData] = useState([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");

    if (tabsEl) {
      tabsEl.hidden = false;
    }
  };
  useIonViewWillEnter(() => hideTabs());
  // adding to favourite list
  const addProduct = (id, name, image, price) => {
    setDoc(doc(db, "Favourite_products", id), {
      name: name,
      image: image,
      price: price,
    });
  };

  // adding addtocart
  const addtoCart = (id, name, image, price) => {
    setDoc(doc(db, "Addtocart_products", id), {
      name: name,
      image: image,
      price: price,
    });
  };

  const pushData = () => {
    const max = sdata.length + 10;
    const min = max - 10;
    const newData = [];

    if (sdata.length === 30) {
      setInfiniteDisabled(true);
    } else {
      for (let i = min; i < max; i++) {
        datai[i].id = datai[i].id + i * i;
        newData.push(datai[i]);
      }

      setData([...sdata, ...newData]);
    }
  };
  const loadingData = (ev) => {
    console.log(sdata.length);
    setTimeout(() => {
      pushData();
      console.log("Loaded data");
      ev.target.complete();
      if (sdata.length === 10) {
        setInfiniteDisabled(sdata.length < 10);
      }
    }, 5000);
  };
  useIonViewWillEnter(() => {
    pushData();
  });

  // getting products in to dashboard
  useEffect(() => {
    getDocs(productRef)
      .then((snapshot) => {
        let products = [];
        snapshot.docs.forEach((doc) => {
          products.push({ ...doc.data(), id: doc.id });
        });
        console.log(products);
        setproduct(products);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonToolbar className="tool-bar">
        <IonGrid>
          <IonRow className="dashboard-row">
            <IonCol className="logo-col">
              <IonImg className="home-logo" src={logo} alt=" "></IonImg>
            </IonCol>
            <IonCol className="col-men">
              <IonButton
                fill="clear"
                routerLink="/menu"
                className="menu-button"
              >
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
          {product.map((Data) => {
            return (
              <IonRow key={Data.id}>
                <IonCol className="data">
                  <IonCard>
                    <LazyLoadImage
                      effect="opacity"
                      src={Data.image}
                      className="image_s"
                    />
                  </IonCard>
                </IonCol>
                <IonCol className="col-text">
                  <IonGrid>
                    <IonRow>
                      <IonText className="res-name">{Data.Restaurant}</IonText>
                      <IonButton
                        fill="clear"
                        color="danger"
                        onClick={() => {
                          addProduct(
                            Data.id,
                            Data.name,
                            Data.image,
                            Data.price
                          );
                        }}
                      >
                        <IonIcon
                          className="icon-fav"
                          icon={heartOutline}
                        ></IonIcon>
                      </IonButton>
                    </IonRow>
                    <IonRow>
                      <IonText className="dish-name">{Data.name}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonText className="price"> Price :{Data.price}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonButton
                        color="danger"
                        onClick={() => {
                          addtoCart(Data.id, Data.name, Data.image, Data.price);
                        }}
                      >
                        Addtocart
                      </IonButton>
                    </IonRow>
                  </IonGrid>
                </IonCol>
              </IonRow>
            );
          })}
          <IonInfiniteScroll
            onIonInfinite={loadingData}
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
    </IonPage>
  );
};

export default Dashboard;

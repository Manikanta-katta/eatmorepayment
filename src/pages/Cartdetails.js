import {
  IonPage,
  IonSearchbar,
  IonToolbar,
  IonContent,
  IonGrid,
  IonRow,
  IonText,
  IonCol,
  IonButton,
  IonCard,
  IonIcon,
} from "@ionic/react";
import { collection, getDocs, deleteDoc, onSnapshot,doc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { trashOutline } from "ionicons/icons";
import "./Cartdetails.css";
import { UserAuth } from "./Authcontext";

const Cartlist = () => {
  const [product, setproduct] = useState([]);
  const {setcount} = UserAuth();


  // auth.onAuthStateChanged((user) => {
  //   setUserId(user.uid);
  //   console.log(user.uid);
  // });
  const addtocart = () => {
    const CartRef = collection(
      db,
      "Users",
      auth.currentUser.uid,
      "Addtocartproducts"
    );
    onSnapshot(CartRef, (snapshot) => {
      let products = [];
      snapshot.docs.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      console.log(products.length);
      setcount(products.length);
      setproduct(products);
    });
  };

  useEffect(() => {
    addtocart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const ondelete = (id) => {
  //   const deleteref = collection(
  //     db,
  //     "Users",
  //     auth.currentUser.uid,
  //     "Addtocartproducts",id
  //   );
  //   deleteDoc(deleteref, {
      
  //   });
  // };
  const ondelete =(id)=>{
    deleteDoc(doc(db,"Users",auth.currentUser.uid,"Addtocartproducts",id));
  } ;

  return (
    <IonPage>
      <IonToolbar className="cart-toolbar">
        <IonSearchbar className="search" placeholder="Search"></IonSearchbar>
        <IonGrid>
          <IonRow>
            <IonText className="Cartproducttxt">CartProducts</IonText>
          </IonRow>
        </IonGrid>
      </IonToolbar>

      <IonContent className="cart-content">
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
                      <IonText className="res-names">{Data.Restaurant}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonText className="dis-name">{Data.name}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonText className="price"> Price :{Data.price}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonButton color="danger" href="/tab/paymentpage">
                        Order
                      </IonButton>
                    </IonRow>
                    <IonRow>
                      <IonButton
                        fill="clear"
                        onClick={() => {
                          ondelete(Data.id);
                        }}
                      >
                        {" "}
                        <IonIcon icon={trashOutline}></IonIcon>
                      </IonButton>
                    </IonRow>
                  </IonGrid>
                </IonCol>
              </IonRow>
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Cartlist;

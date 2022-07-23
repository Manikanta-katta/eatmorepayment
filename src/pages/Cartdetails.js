import { IonPage, IonSearchbar, IonToolbar,IonContent,IonGrid,IonRow,IonText,IonCol,IonButton,IonCard, IonIcon} from "@ionic/react";
import {
    collection,
    getDocs,
    deleteDoc,
    doc
    
  } from "firebase/firestore";
  import { db } from "./firebase";
  import { useState, useEffect } from "react";
  import { LazyLoadImage } from "react-lazy-load-image-component";
  import {trashOutline} from "ionicons/icons";
const Cartlist = () => {
    const [product,setproduct] = useState([]);
    const CartRef = collection(db, "Addtocart_products");
    useEffect(() => {
        getDocs(CartRef)
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
      const ondelete = (id,name,image,price)=>{
        deleteDoc(doc(db, "Addtocart_products",id),{
          name:name,
          image:image,
          price:price,
        });
    
      }

  return (
    <IonPage>
      <IonToolbar>
        <IonSearchbar placeholder="Search"></IonSearchbar>
      </IonToolbar>
      <IonContent>
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
                      <IonText className="res-name">
                        {Data.Restaurant}
                      </IonText>
                    
                     
                    </IonRow>
                    <IonRow>
                      <IonText className="dish-name">{Data.name}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonText className="price"> Price :{Data.price}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonButton color="danger" onClick={()=>{
                     
                      }}>
                        Order
                      </IonButton>
                    </IonRow>
                    <IonRow>
                        <IonButton fill="clear" onClick={()=>{
                        ondelete(Data.id,Data.name, Data.image, Data.price)
                      }}>  <IonIcon icon={trashOutline}></IonIcon></IonButton>
                      
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
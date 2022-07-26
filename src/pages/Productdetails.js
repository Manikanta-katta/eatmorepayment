import { IonPage, IonSearchbar, IonToolbar,IonContent,IonGrid,IonRow,IonText,IonCol,IonButton,IonCard, IonIcon} from "@ionic/react";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot
    
  } from "firebase/firestore";
  import { db } from "./firebase";
  import { useState, useEffect } from "react";
  import { LazyLoadImage } from "react-lazy-load-image-component";
  import {trashOutline} from "ionicons/icons";
import { useParams } from "react-router";
const ProductDetails = () => {
    const id = useParams();
    const docref = doc(db,"App_products",id);
    const [details,setdetails] = useState({
        Restaurant:"",
        name:"",
        image:"",
        price:"",
    })
   
     useEffect(()=>{
        onSnapshot(docref,(doc)=>{

        
            if(doc.exists()){
           const data = doc.data().Restaurant;
           
            }
        })
     })

  return (
    <IonPage>
      <IonToolbar>
        <IonSearchbar placeholder="Search"></IonSearchbar>
      </IonToolbar>
      <IonContent>
      {/* <IonGrid className="dash-grid">
         
              <IonRow key={product.id}>
                <IonCol className="data">
                  <IonCard>
                    <LazyLoadImage
                      effect="opacity"
                      src={product.image}
                      className="image_s"
                    />
                  </IonCard>
                </IonCol>
                <IonCol className="col-text">
                  <IonGrid>
                    <IonRow>
                      <IonText className="res-name">
                        {product.Restaurant}
                      </IonText>
                    
                     
                    </IonRow>
                    <IonRow>
                      <IonText className="dish-name">{product.name}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonText className="price"> Price :{product.price}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonButton color="danger" onClick={()=>{
                     
                      }}>
                        Order
                      </IonButton>
                    </IonRow>
              
                  </IonGrid>
                </IonCol>
              </IonRow>
         
         
        </IonGrid> */}
      </IonContent>
    </IonPage>
  );
};
export default ProductDetails;
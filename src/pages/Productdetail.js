import { IonPage, IonSearchbar, IonToolbar,IonContent,IonGrid,IonLabel,IonRow,IonText,IonCol,IonButton,IonCard, IonIcon, } from "@ionic/react";
import { useState, useEffect } from "react";
  import { LazyLoadImage } from "react-lazy-load-image-component";
  import { db,auth} from "./firebase";

import { onSnapshot,doc } from "firebase/firestore";

import { useParams } from "react-router";
import { setCacheNameDetails } from "workbox-core";
import { image } from "ionicons/icons";

  const ProductDetails =()=>{
    const { id } = useParams();






    useEffect(() => {
        onSnapshot(doc(db,"App_products",id),(doc) => {
            if(doc.exists()){
             
            
            }
        });
            
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    return(
        <IonPage>
            <IonContent>
                <IonLabel>Products details page</IonLabel>
            </IonContent>
        </IonPage>
    )
  }
  export default ProductDetails;
 
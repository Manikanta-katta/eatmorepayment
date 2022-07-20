import {
    IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon ,
  IonLabel,
  IonPage,
  IonRow,
  IonSearchbar,
  IonToolbar
} from "@ionic/react";

const Search = () =>{

    return(
 <IonPage>
    <IonToolbar>
        <IonSearchbar placeholder="Search"></IonSearchbar>
    </IonToolbar>
 </IonPage>
    )
}
export default Search;
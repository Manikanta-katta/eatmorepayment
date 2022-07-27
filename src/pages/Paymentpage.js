import {
    IonButton,
    IonContent,
    IonPage,
    IonImg,
    IonLabel,
    IonGrid,
    IonRow,
  } from "@ionic/react";
  
  import "./Home.css";
  import img from "../assets/images/logo (2).png";
  import {Elements,CheckoutForm} from '@stripe/react-stripe-js';
  import {loadStripe} from '@stripe/stripe-js';

  
  const PaymentPage = () => {
   
    const stripePromise = loadStripe('pk_test_51LQ3MDSBZsnWZCC5NT8FjMT29baQo8xu9xIVjZatH4ec6ioWjjhjj4QqSrEVrmt5eCjPYdDUvNK6kONvCyJz8Ipr00M8oGkbhs');
    const options = {
        // passing the client secret obtained from the server
        clientSecret: '{{CLIENT_SECRET}}',
      };
    return (
      <IonPage>
        {/* <IonContent fullscreen color="danger">
        <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
        </IonContent> */}
      </IonPage>
    );
  };
  
  export default PaymentPage;
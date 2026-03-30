import {
  IonFab, IonFabButton, IonIcon, IonFabList,
  IonButton, IonButtons, IonContent, IonHeader,
  IonInput, IonItem, IonModal, IonPage,
  IonTitle, IonToolbar
} from '@ionic/react';

import './ExploreContainer.css';

import {
  chevronUpCircle,
  colorPalette,
  document,
  globe,
} from 'ionicons/icons';

import React, { useRef, useState } from 'react';
import { IonModalCustomEvent, OverlayEventDetail } from '@ionic/core/components';

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {

  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirm() {
    const value = input.current?.value as string;

    if (!value) return;

    modal.current?.dismiss(value, 'confirm');
  }

  function onWillDismiss(event: IonModalCustomEvent<OverlayEventDetail<any>>) {
    if (event.detail.role === 'confirm') {
      setMessage(`Hello, ${event.detail.data}!`);
    }
  }

  return (
  <>
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton>
        <IonIcon icon={chevronUpCircle}></IonIcon>
      </IonFabButton>

      <IonFabList side="top">
        <IonFabButton>
          <IonIcon icon={document}></IonIcon>
        </IonFabButton>
        <IonFabButton>
          <IonIcon icon={colorPalette}></IonIcon>
        </IonFabButton>
        <IonFabButton>
          <IonIcon icon={globe}></IonIcon>
        </IonFabButton>
      </IonFabList>
    </IonFab>

    <IonContent className="ion-padding">
      <IonButton id="open-modal" expand="block">
        Open
      </IonButton>

      <p>{message}</p>

      <IonModal
        ref={modal}
        trigger="open-modal"
        onWillDismiss={onWillDismiss}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Cancel
              </IonButton>
            </IonButtons>

            <IonTitle>Welcome</IonTitle>

            <IonButtons slot="end">
              <IonButton strong onClick={confirm}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonItem>
            <IonInput
              label="Enter your name"
              labelPlacement="stacked"
              ref={input}
              type="text"
              placeholder="Your name"
            />
          </IonItem>
        </IonContent>
      </IonModal>
    </IonContent>
  </>

  );
};

export default ExploreContainer;
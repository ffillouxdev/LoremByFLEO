import { defineStore } from "pinia";
import { ref } from "vue";
import { firestore } from "@/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

export const useClickStore = defineStore("clickStore", () => {
  const clickNumber = ref<number>(0);
  const clickDocRef = doc(firestore,import.meta.env.VITE_FIREBASE_IDENTIFIANT1 , import.meta.env.VITE_FIREBASE_IDENTIFIANT2);

  const loadClickNumber = async () => {
    try {
      const docSnapshot = await getDoc(clickDocRef);
      if (docSnapshot.exists()) {
        clickNumber.value = docSnapshot.data()?.nbcopies || 0;
      } else {
        console.log("Aucune donnée trouvée.");
      }
    } catch (error) {
      console.error("Erreur lors du chargement du compteur :", error);
    }
  };

  const incrementClick = async () => {
    try {
      await updateDoc(clickDocRef, {
        nbcopies: increment(1),
      });
      clickNumber.value++;
    } catch (error) {
      console.error("Erreur lors de l'incrémentation du compteur :", error);
    }
  };

  return {
    clickNumber,
    loadClickNumber,
    incrementClick,
  };
});

import { defineStore } from "pinia";
import { ref } from "vue";
import { database } from "@/firebase";
import { ref as dbRef, get, set } from "firebase/database";

export const useClickStore = defineStore("clickStore", () => {
  // ompteur de copies
  const clickNumber = ref<number>(0);

  // Charger le nombre de copies depuis la base de données Firebase
  const loadClickNumber = async () => {
    try {
      const snapshot = await get(dbRef(database, "clickNumber"));
      if (snapshot.exists()) {
        clickNumber.value = snapshot.val(); // Met à jour la valeur du compteur
      } else {
        console.log("Aucun compteur de copies trouvé dans la base de données.");
      }
    } catch (error) {
      console.error("Erreur lors du chargement du compteur de copies :", error);
    }
  };

  // Incrémenter le nombre de copies dans la base de données
  const incrementClick = async () => {
    try {
      clickNumber.value++;
      await set(dbRef(database, "clickNumber"), clickNumber.value);
    } catch (error) {
      console.error("Erreur lors de l'incrémentation du compteur de copies :", error);
    }
  };

  // Méthode pour définir manuellement le compteur de copies (optionnelle)
  const setClickNumber = async (newClickNumber: number) => {
    try {
      clickNumber.value = newClickNumber;
      await set(dbRef(database, "clickNumber"), clickNumber.value);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du compteur de copies :", error);
    }
  };

  return {
    clickNumber,
    loadClickNumber,
    incrementClick,
    setClickNumber,
  };
});

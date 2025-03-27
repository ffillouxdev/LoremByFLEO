import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useClickStore = defineStore('clickStore', () => {
  const clickNumber = ref<number>(0);
  const incrementClick = () => {
    clickNumber.value++;
  };

  const getClickNumber = () => {
    return clickNumber.value;
  };

  return {
    clickNumber,
    incrementClick,
    getClickNumber
  };
});

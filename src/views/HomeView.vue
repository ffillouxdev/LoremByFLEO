<script setup lang="ts">
import { useClickStore } from '@/stores/useClickStore';
import { ArrowBigUp } from 'lucide-vue-next'
import { ref, watch } from 'vue'

const loremText = ref<string>('');
const wordsNum = ref<number>(0);
const URL = import.meta.env.VITE_API_URL;
const toastMessage = ref<string>('');
  const clickStore = useClickStore();

const generateLorem = async (e: Event) => {
  e.preventDefault();
  try {
    const response = await fetch(URL);

    if (response.status === 200) {
      const data = await response.json();
      if (typeof data.text_lorem[0] === 'string') {
        loremText.value = data.text_lorem[0] || '';
        if (typeof wordsNum.value === 'number' && wordsNum.value > 0) {
          const words = loremText.value.split(' ');
          loremText.value = words.slice(0, wordsNum.value).join(' ');
          switch (loremText.value[loremText.value.length - 1]){
            case ',':
              loremText.value = loremText.value.slice(0, -1) + ".";
              break;
            case '.':
              loremText.value = loremText.value;
              break;

            default:
              loremText.value = loremText.value + '.';
              break;
          }
        }
      } else {
        console.error('Clé "text_lorem" manquante dans la réponse de l\'API');
      }
    } else {
      console.error('Erreur dans la récupération des données :', response.status);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
  }
}


const copyText = () => {
  if (!loremText.value.trim()) {
    return;
  }
  navigator.clipboard.writeText(loremText.value).then(() => {
    toastMessage.value = 'Texte copié !'
    setTimeout(() => {
      toastMessage.value = ''
    }, 2000)
    clickStore.incrementClick();
  });
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    generateLorem(e)
  }
}

watch(() => clickStore.clickNumber, (newValue) => {
  localStorage.setItem('clickNumber', newValue.toString());
});

</script>
<template>
  <div class="flex flex-col items-center md:p-0 p-6 justify-center w-full">
    <section class="flex items-center flex-col justify-center">
      <h1 class="font-semibold text-center text-4xl text-text-primary">
        Besoin de créer du Lorem Ipsum ?
      </h1>
      <br />
      <p class="max-w-md text-center">
        Créez facilement un texte Lorem Ipsum en quelques clics. Parfait pour remplir vos maquettes
        ou projets web!
      </p>
    </section>
    <form class="flex w-full max-w-2xl items-center space-x-4 p-5 justify-center rounded-xl">
      <input
        type="number"
        class="w-full h-full text-text-primary border-2 rounded-lg border-gray-200 text-left pl-2 text-lg focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300"
        placeholder="Nb"
        min="0"
        max="100"
        value="0"
        v-model="wordsNum"
      />
      <button
        @click="generateLorem"
        class="text-text-secondary rounded-full flex items-center justify-center h-12 w-14 font-semibold shadow-2xl bg-white transition-all duration-300 hover:border hover:border-gray-200 hover:bg-secondary hover:scale-105"
      >
        <ArrowBigUp class="text-black hover:text-white transition-all duration-300" />
      </button>
    </form>

    <div class="relative w-full max-w-2xl shadow-2xl h-40 p-4 mt-5 border-2 text-gray-400 border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary transition-all duration-300">
      <textarea
        class="w-full resize-none border-none outline-none h-full focus:ring-0"
        placeholder="Votre texte généré ici..."
        readonly
        :value="loremText"
        @keydown="handleKeyDown"
      />
      <button
        @click="copyText"
        class="absolute bottom-3 right-3 bg-secondary text-white p-1 rounded shadow-md hover:bg-secondary-dark transition-all duration-300"
      >
        Copier
      </button>
    </div>
    <div v-if="toastMessage"
      class="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform duration-500 ease-out"
      :class="{'translate-y-0': toastMessage, 'translate-y-12': !toastMessage}">
      {{ toastMessage }}
    </div>
    <p
    class="text-sm mt-2 font-extralight"
    >
    <span class="font-bold">
      {{ clickStore.clickNumber }}
    </span>
    personnes ont déjà copié du lorem sur notre site !
    </p>
     <a
      class="text-sm font-extralight text-gray-600 underline hover:no-underline"
      href="https://fleo-web.vercel.app/"
      target="_blank"
    > A propos de FLEO-Web
   </a>
  </div>
</template>
<style>
</style>

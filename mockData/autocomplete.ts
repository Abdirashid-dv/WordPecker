import { AutocompleteSuggestion } from "@/types/dictionary";

// Mock autocomplete suggestions for testing
// In a real app, these would come from an API

export const mockSuggestions: Record<string, AutocompleteSuggestion[]> = {
  "English": [
    { word: "apple", definition: "A round fruit with red, yellow, or green skin", frequency: 95 },
    { word: "application", definition: "A formal request for something", frequency: 90 },
    { word: "apply", definition: "To put something into practice", frequency: 88 },
    { word: "appointment", definition: "An arrangement to meet someone", frequency: 85 },
    { word: "appreciate", definition: "To recognize the full worth of something", frequency: 82 },
    { word: "approach", definition: "A way of dealing with something", frequency: 80 },
    { word: "appropriate", definition: "Suitable or proper in the circumstances", frequency: 78 },
    { word: "approval", definition: "The action of approving something", frequency: 75 },
    { word: "approximately", definition: "Used to show that something is almost, but not completely, accurate", frequency: 72 },
    { word: "april", definition: "The fourth month of the year", frequency: 70 },
    { word: "banana", definition: "A long curved fruit with a yellow skin", frequency: 95 },
    { word: "book", definition: "A written or printed work consisting of pages", frequency: 98 },
    { word: "cat", definition: "A small domesticated carnivorous mammal", frequency: 96 },
    { word: "dog", definition: "A domesticated carnivorous mammal", frequency: 97 },
    { word: "elephant", definition: "A very large plant-eating mammal", frequency: 92 },
    { word: "flower", definition: "The seed-bearing part of a plant", frequency: 94 },
    { word: "guitar", definition: "A musical instrument with strings", frequency: 91 },
    { word: "house", definition: "A building for human habitation", frequency: 99 },
    { word: "internet", definition: "A global computer network", frequency: 98 },
    { word: "jacket", definition: "A short coat", frequency: 93 },
  ],
  "Spanish": [
    { word: "manzana", definition: "Una fruta redonda con piel roja, amarilla o verde", frequency: 95 },
    { word: "plátano", definition: "Una fruta larga y curva con piel amarilla", frequency: 94 },
    { word: "gato", definition: "Un pequeño mamífero carnívoro domesticado", frequency: 96 },
    { word: "perro", definition: "Un mamífero carnívoro domesticado", frequency: 97 },
    { word: "elefante", definition: "Un mamífero muy grande que come plantas", frequency: 92 },
    { word: "flor", definition: "La parte de una planta que contiene semillas", frequency: 94 },
    { word: "guitarra", definition: "Un instrumento musical con cuerdas", frequency: 91 },
    { word: "casa", definition: "Un edificio para la habitación humana", frequency: 99 },
    { word: "internet", definition: "Una red informática global", frequency: 98 },
    { word: "chaqueta", definition: "Un abrigo corto", frequency: 93 },
  ],
  "French": [
    { word: "pomme", definition: "Un fruit rond à peau rouge, jaune ou verte", frequency: 95 },
    { word: "banane", definition: "Un fruit long et courbé à peau jaune", frequency: 94 },
    { word: "chat", definition: "Un petit mammifère carnivore domestiqué", frequency: 96 },
    { word: "chien", definition: "Un mammifère carnivore domestiqué", frequency: 97 },
    { word: "éléphant", definition: "Un très grand mammifère herbivore", frequency: 92 },
    { word: "fleur", definition: "La partie d'une plante qui porte les graines", frequency: 94 },
    { word: "guitare", definition: "Un instrument de musique à cordes", frequency: 91 },
    { word: "maison", definition: "Un bâtiment destiné à l'habitation humaine", frequency: 99 },
    { word: "internet", definition: "Un réseau informatique mondial", frequency: 98 },
    { word: "veste", definition: "Un manteau court", frequency: 93 },
  ],
};
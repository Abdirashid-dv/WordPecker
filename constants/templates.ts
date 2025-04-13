import { Language } from "@/types/wordList";

interface TemplateWord {
  term: string;
  definition: string;
  example?: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  wordCount: number;
  languages: Language[];
  words?: {
    [key in Language]?: TemplateWord[];
  };
}

// Sample template data
export const TEMPLATES: Template[] = [
  {
    id: "basic-vocabulary",
    name: "Basic Vocabulary",
    description: "Essential words for beginners",
    category: "General",
    wordCount: 20,
    languages: ["English", "Spanish", "French", "German"],
    words: {
      English: [
        { term: "hello", definition: "a greeting", example: "Hello, how are you?" },
        { term: "goodbye", definition: "a farewell", example: "Goodbye, see you tomorrow!" },
        { term: "please", definition: "used to make a polite request", example: "Please help me." },
        { term: "thank you", definition: "an expression of gratitude", example: "Thank you for your help." },
        { term: "yes", definition: "used to give an affirmative response", example: "Yes, I agree." },
        { term: "no", definition: "used to give a negative response", example: "No, I don't want to go." },
        { term: "excuse me", definition: "used to politely get attention or apologize", example: "Excuse me, could you tell me the time?" },
        { term: "sorry", definition: "used to express regret or apologize", example: "I'm sorry for being late." },
        { term: "water", definition: "a clear liquid that has no color, taste, or smell", example: "Could I have a glass of water?" },
        { term: "food", definition: "things that people or animals eat", example: "The food in this restaurant is excellent." },
        { term: "time", definition: "what is measured in minutes, hours, days, etc.", example: "What time is it?" },
        { term: "day", definition: "a period of 24 hours", example: "I work five days a week." },
        { term: "night", definition: "the time when it is dark outside", example: "I prefer to study at night." },
        { term: "today", definition: "on this day", example: "What are you doing today?" },
        { term: "tomorrow", definition: "on the day after today", example: "I'll see you tomorrow." },
        { term: "yesterday", definition: "on the day before today", example: "I saw him yesterday." },
        { term: "here", definition: "in, at, or to this place", example: "Come here, please." },
        { term: "there", definition: "in, at, or to that place", example: "Put it there on the table." },
        { term: "help", definition: "to make it easier for someone to do something", example: "Can you help me with this?" },
        { term: "friend", definition: "a person you know well and like", example: "She's my best friend." },
      ],
      Spanish: [
        { term: "hola", definition: "a greeting", example: "¡Hola! ¿Cómo estás?" },
        { term: "adiós", definition: "a farewell", example: "Adiós, ¡hasta mañana!" },
        { term: "por favor", definition: "used to make a polite request", example: "Ayúdame, por favor." },
        { term: "gracias", definition: "an expression of gratitude", example: "Gracias por tu ayuda." },
        { term: "sí", definition: "used to give an affirmative response", example: "Sí, estoy de acuerdo." },
        { term: "no", definition: "used to give a negative response", example: "No, no quiero ir." },
        { term: "disculpe", definition: "used to politely get attention or apologize", example: "Disculpe, ¿podría decirme la hora?" },
        { term: "lo siento", definition: "used to express regret or apologize", example: "Lo siento por llegar tarde." },
        { term: "agua", definition: "a clear liquid that has no color, taste, or smell", example: "¿Podría tomar un vaso de agua?" },
        { term: "comida", definition: "things that people or animals eat", example: "La comida en este restaurante es excelente." },
        { term: "tiempo", definition: "what is measured in minutes, hours, days, etc.", example: "¿Qué hora es?" },
        { term: "día", definition: "a period of 24 hours", example: "Trabajo cinco días a la semana." },
        { term: "noche", definition: "the time when it is dark outside", example: "Prefiero estudiar por la noche." },
        { term: "hoy", definition: "on this day", example: "¿Qué haces hoy?" },
        { term: "mañana", definition: "on the day after today", example: "Te veré mañana." },
        { term: "ayer", definition: "on the day before today", example: "Lo vi ayer." },
        { term: "aquí", definition: "in, at, or to this place", example: "Ven aquí, por favor." },
        { term: "allí", definition: "in, at, or to that place", example: "Ponlo allí en la mesa." },
        { term: "ayuda", definition: "to make it easier for someone to do something", example: "¿Puedes ayudarme con esto?" },
        { term: "amigo", definition: "a person you know well and like", example: "Ella es mi mejor amiga." },
      ],
    },
  },
  {
    id: "travel-phrases",
    name: "Travel Phrases",
    description: "Essential phrases for travelers",
    category: "Travel",
    wordCount: 15,
    languages: ["English", "Spanish", "French", "Italian"],
    words: {
      English: [
        { term: "Where is...?", definition: "Used to ask for directions", example: "Where is the bathroom?" },
        { term: "How much?", definition: "Used to ask about price", example: "How much does this cost?" },
        { term: "I would like...", definition: "Used to make a request", example: "I would like a coffee, please." },
        { term: "Do you speak English?", definition: "Used to ask if someone speaks English", example: "Excuse me, do you speak English?" },
        { term: "I don't understand", definition: "Used when you don't comprehend", example: "I'm sorry, I don't understand." },
        { term: "Can you help me?", definition: "Used to ask for assistance", example: "Can you help me find my hotel?" },
        { term: "I'm lost", definition: "Used when you can't find your way", example: "I'm lost. Can you show me on the map?" },
        { term: "The bill, please", definition: "Used to ask for the check at a restaurant", example: "Excuse me, the bill, please." },
        { term: "What time is it?", definition: "Used to ask for the current time", example: "Excuse me, what time is it?" },
        { term: "Is there a bathroom?", definition: "Used to ask for a restroom", example: "Is there a bathroom nearby?" },
        { term: "I need a doctor", definition: "Used in medical emergencies", example: "I need a doctor, it's urgent." },
        { term: "One ticket to...", definition: "Used to purchase transportation", example: "One ticket to Paris, please." },
        { term: "What is this?", definition: "Used to ask about an unknown item", example: "What is this dish?" },
        { term: "I'm allergic to...", definition: "Used to inform about allergies", example: "I'm allergic to nuts." },
        { term: "Can I have the Wi-Fi password?", definition: "Used to ask for internet access", example: "Can I have the Wi-Fi password, please?" },
      ],
    },
  },
  {
    id: "business-terms",
    name: "Business Terms",
    description: "Common business vocabulary",
    category: "Professional",
    wordCount: 15,
    languages: ["English", "German", "French"],
  },
  {
    id: "food-and-dining",
    name: "Food & Dining",
    description: "Vocabulary for restaurants and food",
    category: "Food",
    wordCount: 20,
    languages: ["English", "Italian", "French", "Spanish"],
  },
  {
    id: "academic-vocabulary",
    name: "Academic Vocabulary",
    description: "Words commonly used in academic settings",
    category: "Education",
    wordCount: 25,
    languages: ["English"],
  },
];
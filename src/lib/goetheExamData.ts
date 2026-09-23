export interface TranscriptLine {
  id: string;
  startTime: number; // in seconds
  endTime: number;
  german: string;
  english: string;
  contextNote?: string;
}

export interface VocabularyItem {
  german: string;
  english: string;
  type: string; // e.g. "Verb", "Noun", "Phrase"
}

export interface MicroFocus {
  title: string;
  description: string;
  examTip: string;
  vocabulary: VocabularyItem[];
  grammarRule: string;
}

export interface ExamLesson {
  id: string;
  lessonNumber: number;
  title: string;
  topic: string;
  duration: string;
  durationSeconds: number;
  instructor: string;
  thumbnail: string;
  videoUrl?: string;
  description: string;
  transcript: TranscriptLine[];
  microFocus: MicroFocus;
}

export interface GoetheLevel {
  id: string;
  levelCode: string; // "Goethe A1", "Goethe A2", etc.
  title: string;
  subtitle: string;
  description: string;
  lessons: ExamLesson[];
}

export const GOETHE_EXAM_DATA: GoetheLevel[] = [
  {
    id: "goethe-a1",
    levelCode: "Goethe A1",
    title: "Start Deutsch 1 (A1)",
    subtitle: "Everyday German Foundations",
    description: "Master basic greetings, self-introductions, ordering food, and elementary Goethe A1 speaking and listening exam scenarios.",
    lessons: [
      {
        id: "a1-lesson-1",
        lessonNumber: 1,
        title: "German A1 — Introducing Yourself",
        topic: "Sprechend — Teil 1 (Sich vorstellen)",
        duration: "04:15",
        durationSeconds: 255,
        instructor: "Anna Müller",
        thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop",
        description: "Learn how to state your name, origin, profession, and residence fluently for the Goethe A1 speaking test.",
        transcript: [
          {
            id: "t1",
            startTime: 0,
            endTime: 5,
            german: "Hallo! Guten Tag. Ich heiße Anna Müller.",
            english: "Hello! Good day. My name is Anna Müller.",
            contextNote: "Standard polite Goethe A1 greeting."
          },
          {
            id: "t2",
            startTime: 5,
            endTime: 10,
            german: "Ich komme aus Deutschland und wohne in Berlin.",
            english: "I come from Germany and live in Berlin.",
            contextNote: "High-yield Goethe A1 origin formula: 'Ich komme aus...' + 'Ich wohne in...'"
          },
          {
            id: "t3",
            startTime: 10,
            endTime: 16,
            german: "Ich bin 28 Jahre alt und von Beruf Deutschlehrerin.",
            english: "I am 28 years old and a German teacher by profession.",
            contextNote: "Notice: No article before job title ('von Beruf Deutschlehrerin')."
          },
          {
            id: "t4",
            startTime: 16,
            endTime: 22,
            german: "Ich spreche Deutsch, Englisch und ein bisschen Spanisch.",
            english: "I speak German, English, and a little bit of Spanish.",
            contextNote: "Essential language skill statement required in Goethe A1 oral exam."
          },
          {
            id: "t5",
            startTime: 22,
            endTime: 28,
            german: "Meine Hobbys sind Lesen, Musik hören und Reisen.",
            english: "My hobbies are reading, listening to music, and travelling.",
            contextNote: "Plural verb 'sind' when listing multiple hobbies."
          },
          {
            id: "t6",
            startTime: 28,
            endTime: 35,
            german: "Wie heißen Sie? Woher kommen Sie?",
            english: "What is your name? Where do you come from?",
            contextNote: "Formal 'Sie' questioning technique for Goethe Sprechend Teil 1."
          }
        ],
        microFocus: {
          title: "Introducing Yourself in German",
          description: "In the Goethe A1 speaking exam (Sprechend Teil 1), you are asked to introduce yourself using key prompt words.",
          examTip: "Always spell your surname clearly using the German alphabet when the examiner asks: 'Können Sie das bitte buchstabieren?'",
          grammarRule: "Regular verb conjugation: kommen → ich komme, du kommst, er/sie kommt, wir kommen.",
          vocabulary: [
            { german: "heißen", english: "to be called / named", type: "Verb" },
            { german: "wohnen in", english: "to reside / live in", type: "Verb + Prep" },
            { german: "von Beruf", english: "by profession", type: "Phrase" },
            { german: "ein bisschen", english: "a little bit", type: "Adverb" }
          ]
        }
      },
      {
        id: "a1-lesson-2",
        lessonNumber: 2,
        title: "At the Café & Ordering Food",
        topic: "Hören & Sprechend — Everyday Needs",
        duration: "03:45",
        durationSeconds: 225,
        instructor: "Anna Müller",
        thumbnail: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop",
        description: "Politely ordering food, asking prices, and understanding café announcements in German.",
        transcript: [
          {
            id: "a1-2-1",
            startTime: 0,
            endTime: 5,
            german: "Guten Tag! Was möchten Sie bestellen?",
            english: "Good day! What would you like to order?",
            contextNote: "Standard café waiter question."
          },
          {
            id: "a1-2-2",
            startTime: 5,
            endTime: 11,
            german: "Ich hätte gerne einen Kaffee und ein Stück Kuchen, bitte.",
            english: "I would like a coffee and a piece of cake, please.",
            contextNote: "Polite formula: 'Ich hätte gerne...' + Accusative ('einen Kaffee')."
          },
          {
            id: "a1-2-3",
            startTime: 11,
            endTime: 17,
            german: "Wie viel kostet das zusammen?",
            english: "How much does that cost altogether?",
            contextNote: "Essential price query verb 'kosten'."
          },
          {
            id: "a1-2-4",
            startTime: 17,
            endTime: 23,
            german: "Das macht zusammen sieben Euro fünfzig.",
            english: "That comes to seven euros fifty in total.",
            contextNote: "German total pricing phrase 'Das macht zusammen...'."
          }
        ],
        microFocus: {
          title: "Ordering & Prices in German",
          description: "Understanding prices and ordering food with 'hätte gerne' and Accusative case.",
          examTip: "Listen for numbers in Goethe A1 Hören (listening test). European decimals use commas (7,50 €).",
          grammarRule: "Accusative masculine article change: der Kaffee → einen Kaffee.",
          vocabulary: [
            { german: "hätte gerne", english: "would like (polite)", type: "Phrase" },
            { german: "kosten", english: "to cost", type: "Verb" },
            { german: "zusammen", english: "together / in total", type: "Adverb" }
          ]
        }
      }
    ]
  },
  {
    id: "goethe-a2",
    levelCode: "Goethe A2",
    title: "Goethe-Zertifikat A2",
    subtitle: "Routine Communication & Past Tense",
    description: "Master Perfekt past tense, giving directions, describing daily routine, and answering Goethe A2 email prompts.",
    lessons: [
      {
        id: "a2-lesson-1",
        lessonNumber: 1,
        title: "German A2 — Describing Your Weekend (Perfekt)",
        topic: "Schreiben — Teil 1 (Short Email)",
        duration: "05:10",
        durationSeconds: 310,
        instructor: "Markus Weber",
        thumbnail: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop",
        description: "Learn how to compose an informal A2 Goethe email using weak and strong Perfekt past tense forms.",
        transcript: [
          {
            id: "a2-t1",
            startTime: 0,
            endTime: 6,
            german: "Liebe Sarah, wie geht es dir? Ich hatte ein tolles Wochenende!",
            english: "Dear Sarah, how are you? I had a great weekend!",
            contextNote: "Standard informal email salutation for Goethe A2 writing."
          },
          {
            id: "a2-t2",
            startTime: 6,
            endTime: 12,
            german: "Am Samstag bin ich früh aufgestanden und in den Park gegangen.",
            english: "On Saturday I got up early and went to the park.",
            contextNote: "Perfekt auxiliary 'sein' used with movement verbs ('gegangen', 'aufgestanden')."
          },
          {
            id: "a2-t3",
            startTime: 12,
            endTime: 18,
            german: "Am Nachmittag habe ich meine Freunde getroffen und Pizza gegessen.",
            english: "In the afternoon I met my friends and ate pizza.",
            contextNote: "Perfekt auxiliary 'haben' used with transitive verbs ('getroffen', 'gegessen')."
          },
          {
            id: "a2-t4",
            startTime: 18,
            endTime: 25,
            german: "Hast du am nächsten Wochenende Zeit? Wir könnten ins Kino gehen.",
            english: "Do you have time next weekend? We could go to the cinema.",
            contextNote: "Invitation formula with modal verb 'könnten' (Konjunktiv II)."
          }
        ],
        microFocus: {
          title: "Mastering Perfekt Past Tense",
          description: "Over 80% of Goethe A2 writing tasks require expressing past actions accurately using Perfekt.",
          examTip: "Remember: Movement/change of state verbs take 'sein' (gegangen, gefahren). Other active verbs take 'haben'.",
          grammarRule: "Perfekt Structure: Subject + Aux (haben/sein) + ... + Past Participle (ge-...-t / ge-...-en) at sentence end.",
          vocabulary: [
            { german: "aufstehen", english: "to get up", type: "Separable Verb" },
            { german: "treffen", english: "to meet", type: "Strong Verb" },
            { german: "toll", english: "great / wonderful", type: "Adjective" }
          ]
        }
      }
    ]
  },
  {
    id: "goethe-b1",
    levelCode: "Goethe B1",
    title: "Goethe-Zertifikat B1",
    subtitle: "Independent Language Usage & Debate",
    description: "Express structured opinions, argue pros & cons, master subordinate clauses (weil, obwohl, dass), and pass B1 oral presentations.",
    lessons: [
      {
        id: "b1-lesson-1",
        lessonNumber: 1,
        title: "German B1 — Expressing Opinions & Arguments",
        topic: "Sprechend — Teil 2 (Presentation & Discussion)",
        duration: "05:50",
        durationSeconds: 350,
        instructor: "Dr. Elena Sommer",
        thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
        description: "Master high-scoring connectors and transition phrases for the Goethe B1 oral presentation.",
        transcript: [
          {
            id: "b1-t1",
            startTime: 0,
            endTime: 7,
            german: "Meiner Meinung nach ist das Thema 'Öffentlicher Nahverkehr' besonders wichtig.",
            english: "In my opinion, the topic of 'Public Transport' is particularly important.",
            contextNote: "High-scoring B1 opinion opener: 'Meiner Meinung nach' + Verb."
          },
          {
            id: "b1-t2",
            startTime: 7,
            endTime: 14,
            german: "Einerseits spart man Geld, andererseits schont man die Umwelt.",
            english: "On the one hand you save money, on the other hand you protect the environment.",
            contextNote: "Two-part connector: 'Einerseits..., andererseits...' (inversion of verb)."
          },
          {
            id: "b1-t3",
            startTime: 14,
            endTime: 21,
            german: "Obwohl Busse manchmal Verspätung haben, ziehe ich die Bahn vor.",
            english: "Although buses are sometimes delayed, I prefer the train.",
            contextNote: "Concessive clause with 'obwohl' sends verb 'haben' to the end."
          },
          {
            id: "b1-t4",
            startTime: 21,
            endTime: 28,
            german: "Zusammenfassend möchte ich betonen, dass nachhaltige Mobilität unsere Zukunft ist.",
            english: "In conclusion, I would like to emphasize that sustainable mobility is our future.",
            contextNote: "B1 concluding phrase: 'Zusammenfassend möchte ich betonen, dass...'"
          }
        ],
        microFocus: {
          title: "B1 Oral Presentation Connectors",
          description: "To achieve top marks in Goethe B1 Sprechend Teil 2, you must use structured connectors and subordinate clauses.",
          examTip: "Always structure your presentation: Introduction → Personal Experience → Pros & Cons → Situation in Country → Conclusion.",
          grammarRule: "Subordinate conjunctions (weil, dass, obwohl, wenn) force the conjugated verb to the absolute end of the clause.",
          vocabulary: [
            { german: "Meiner Meinung nach", english: "In my opinion", type: "Connector" },
            { german: "einerseits... andererseits", english: "on the one hand... on the other", type: "Two-part Connector" },
            { german: "schonen", english: "to protect / spare", type: "Verb" },
            { german: "obwohl", english: "although", type: "Subordinating Conjunction" }
          ]
        }
      }
    ]
  },
  {
    id: "goethe-b2",
    levelCode: "Goethe B2",
    title: "Goethe-Zertifikat B2",
    subtitle: "Advanced Nuance & Professional German",
    description: "Master complex sentence structures, Passive voice, Nomen-Verb-Verbindungen, formal complaints, and B2 professional discussions.",
    lessons: [
      {
        id: "b2-lesson-1",
        lessonNumber: 1,
        title: "German B2 — Formal Complaints & Business German",
        topic: "Schreiben — Teil 1 (Beschwerdebrief)",
        duration: "06:20",
        durationSeconds: 380,
        instructor: "Dr. Elena Sommer",
        thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
        description: "How to draft a C1-preparatory formal complaint letter for Goethe B2 writing exams.",
        transcript: [
          {
            id: "b2-t1",
            startTime: 0,
            endTime: 7,
            german: "Sehr geehrte Damen und Herren, hiermit möchte ich mich über Ihre Dienstleistung beschweren.",
            english: "Dear Sir/Madam, I hereby wish to complain about your service.",
            contextNote: "Gold standard B2 formal opening line for complaint letters."
          },
          {
            id: "b2-t2",
            startTime: 7,
            endTime: 15,
            german: "In Ihrer Anzeige wurde versprochen, dass der Kurs in Kleingruppen stattfinden würde.",
            english: "In your advertisement it was promised that the course would take place in small groups.",
            contextNote: "Passive voice past ('wurde versprochen') + Konjunktiv II ('stattfinden würde')."
          },
          {
            id: "b2-t3",
            startTime: 15,
            endTime: 22,
            german: "Entgegen meinen Erwartungen waren jedoch mehr als dreißig Teilnehmer anwesend.",
            english: "Contrary to my expectations, however, more than thirty participants were present.",
            contextNote: "Advanced preposition 'entgegen' taking Genitive or Dative."
          },
          {
            id: "b2-t4",
            startTime: 22,
            endTime: 30,
            german: "Aus diesem Grund fordere ich eine angemessene Rückerstattung des Kurspreises.",
            english: "For this reason, I demand an appropriate refund of the course fee.",
            contextNote: "Firm B2 business conclusion: 'fordere ich eine Rückerstattung'."
          }
        ],
        microFocus: {
          title: "Goethe B2 Formal Complaint Formula",
          description: "B2 writing evaluators look for precise passive structures, elevated Nomen-Verb collocations, and formal register.",
          examTip: "Avoid simple words like 'schlecht' or 'gut'. Use elevated vocabulary like 'mangelhaft', 'unzureichend', or 'einwandfrei'.",
          grammarRule: "Vorgangspassiv: werden + Past Participle (Präteritum: wurde + Past Participle).",
          vocabulary: [
            { german: "sich beschweren über", english: "to complain about", type: "Reflexive Verb" },
            { german: "entgegen (+ Dat)", english: "contrary to", type: "Preposition" },
            { german: "die Rückerstattung", english: "the refund", type: "Noun" },
            { german: "angemessen", english: "appropriate / reasonable", type: "Adjective" }
          ]
        }
      }
    ]
  }
];

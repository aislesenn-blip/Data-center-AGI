export interface TranscriptItem {
  timestamp: number; // In seconds
  german: string;
  english: string;
  context: string;
  speaker?: string;
}

export interface VocabularyItem {
  term: string;
  translation: string;
  note: string;
}

export interface ExamLesson {
  id: string;
  lessonNumber: number;
  title: string;
  duration: string;
  durationSeconds: number;
  description: string;
  examComponent: "Sprechen" | "Hören" | "Lesen" | "Schreiben";
  todaysFocus: string;
  examRule: string;
  proTip: string;
  vocabulary: VocabularyItem[];
  transcript: TranscriptItem[];
}

export interface ExamLevel {
  id: "A1" | "A2" | "B1" | "B2";
  badge: string;
  name: string;
  description: string;
  cefrDescription: string;
  examFormatInfo: string;
  recommendedTime: string;
  lessons: ExamLesson[];
}

export const GOETHE_EXAM_LEVELS: ExamLevel[] = [
  {
    id: "A1",
    badge: "Goethe-Zertifikat A1",
    name: "Goethe A1",
    description: "Start-Deutsch 1: Everyday greetings, introductions, basic questions, and immediate survival situations.",
    cefrDescription: "Understand and use familiar, everyday expressions and basic phrases aimed at the satisfaction of needs of a concrete type.",
    examFormatInfo: "4 Modules: Hören (20m), Lesen (25m), Schreiben (20m), Sprechen (15m)",
    recommendedTime: "4 - 6 weeks at 15 mins/day",
    lessons: [
      {
        id: "a1-lesson-1",
        lessonNumber: 1,
        title: "German A1 — Introducing Yourself (Sich vorstellen)",
        duration: "03:45",
        durationSeconds: 225,
        description: "Master Goethe A1 Sprechen Teil 1: Confident introductions, spelling your name, and stating your origin and telephone number.",
        examComponent: "Sprechen",
        todaysFocus: "Introducing yourself fluently for Goethe A1 Oral Exam Teil 1",
        examRule: "In Goethe A1 Sprechen Teil 1, you must state 6 key facts: Name, Alter, Land, Wohnort, Sprachen, and Beruf/Hobby.",
        proTip: "Use 'Ich komme aus...' for origin, but remember countries with articles like 'aus der Schweiz' or 'aus den USA'.",
        vocabulary: [
          { term: "Ich heiße...", translation: "My name is...", note: "Standard A1 introduction frame" },
          { term: "Ich komme aus...", translation: "I come from...", note: "Requires Dativ preposition 'aus'" },
          { term: "Ich wohne in...", translation: "I live in...", note: "Use 'in' + City name" },
          { term: "Mein Beruf ist...", translation: "My profession is...", note: "No article needed for job titles in German" }
        ],
        transcript: [
          {
            timestamp: 0,
            speaker: "Dozentin Anna",
            german: "Willkommen zum Goethe A1 Vorbereitungskurs!",
            english: "Welcome to the Goethe A1 preparation course!",
            context: "Introductory greeting & exam context setting"
          },
          {
            timestamp: 8,
            speaker: "Dozentin Anna",
            german: "Im ersten Teil der mündlichen Prüfung stellen Sie sich kurz vor.",
            english: "In the first part of the speaking exam, you briefly introduce yourself.",
            context: "Goethe A1 Sprechen Teil 1 overview"
          },
          {
            timestamp: 18,
            speaker: "Kandidat",
            german: "Guten Tag, ich heiße Anna Müller.",
            english: "Hello, my name is Anna Müller.",
            context: "Fact 1: Name statement (Clear pronunciation required)"
          },
          {
            timestamp: 26,
            speaker: "Kandidat",
            german: "Ich komme aus Deutschland und wohne jetzt in Berlin.",
            english: "I come from Germany and now live in Berlin.",
            context: "Fact 2 & 3: Country of origin and city of residence"
          },
          {
            timestamp: 36,
            speaker: "Kandidat",
            german: "Ich spreche Deutsch, Englisch und ein wenig Spanisch.",
            english: "I speak German, English, and a little Spanish.",
            context: "Fact 4: Spoken languages ('ein wenig' = a little)"
          },
          {
            timestamp: 48,
            speaker: "Kandidat",
            german: "Von Beruf bin ich Lehrerin.",
            english: "By profession, I am a teacher.",
            context: "Fact 5: Profession ('von Beruf bin ich...')"
          },
          {
            timestamp: 58,
            speaker: "Prüfer",
            german: "Können Sie Ihren Nachnamen bitte buchstabieren?",
            english: "Can you please spell your last name?",
            context: "Standard Examiner follow-up question in A1 Exam"
          },
          {
            timestamp: 70,
            speaker: "Kandidat",
            german: "Ja, natürlich: M - Ü - L - L - E - R.",
            english: "Yes, of course: M - Ü - L - L - E - R.",
            context: "Spelling test: Pay attention to German alphabet letters like Ü"
          },
          {
            timestamp: 85,
            speaker: "Prüfer",
            german: "Vielen Dank! Wie ist Ihre Telefonnummer?",
            english: "Thank you very much! What is your telephone number?",
            context: "Number test: Single digits stated clearly"
          },
          {
            timestamp: 98,
            speaker: "Kandidat",
            german: "Meine Telefonnummer ist 0-1-7-6-4-2-9-0.",
            english: "My telephone number is 0-1-7-6-4-2-9-0.",
            context: "Goethe A1 Number articulation point"
          },
          {
            timestamp: 112,
            speaker: "Dozentin Anna",
            german: "Sehr gut! Das war das perfekte Muster für A1 Sprechen Teil 1.",
            english: "Very good! That was the perfect template for A1 Speaking Part 1.",
            context: "Summary & confidence reinforcement"
          }
        ]
      },
      {
        id: "a1-lesson-2",
        lessonNumber: 2,
        title: "German A1 — Asking for Help & Directions (Hören & Alltag)",
        duration: "04:10",
        durationSeconds: 250,
        description: "Goethe A1 Hören & Lesen: Recognizing key information in public announcements, train stations, and polite request structures.",
        examComponent: "Hören",
        todaysFocus: "Deciphering train station and airport announcements in Goethe A1 Hören",
        examRule: "In Goethe A1 Hören, texts are played twice. Listen for signal words like 'Gleis', 'Abfahrt', and 'Verspätung'.",
        proTip: "Do not try to translate every single word. Focus strictly on numbers, track numbers, and times.",
        vocabulary: [
          { term: "Entschuldigung", translation: "Excuse me", note: "Essential polite phrase to start any question" },
          { term: "Der Bahnhof", translation: "The train station", note: "Masculine noun (der)" },
          { term: "Das Gleis", translation: "The platform/track", note: "Neuter noun (das) - crucial for train announcements" },
          { term: "Die Verspätung", translation: "The delay", note: "Feminine noun (die)" }
        ],
        transcript: [
          {
            timestamp: 0,
            speaker: "Durchsage",
            german: "Achtung am Gleis 4: Der ICE nach München fährt heute um 14:15 Uhr ab.",
            english: "Attention at platform 4: The ICE to Munich departs today at 14:15.",
            context: "Goethe Listening Task: Signal word 'Gleis 4' and '14:15 Uhr'"
          },
          {
            timestamp: 15,
            speaker: "Durchsage",
            german: "Der Zug hat etwa zehn Minuten Verspätung.",
            english: "The train has approximately ten minutes delay.",
            context: "Key question topic: How long is the delay?"
          },
          {
            timestamp: 28,
            speaker: "Fahrgast",
            german: "Entschuldigung, wo ist der Fahrkartenautomat?",
            english: "Excuse me, where is the ticket machine?",
            context: "Polite question format: 'Wo ist...' + Subject"
          },
          {
            timestamp: 42,
            speaker: "Passant",
            german: "Der Automat ist direkt dort drüben, neben dem Eingang.",
            english: "The machine is right over there, next to the entrance.",
            context: "Spatial directions in A1 German"
          }
        ]
      }
    ]
  },
  {
    id: "A2",
    badge: "Goethe-Zertifikat A2",
    name: "Goethe A2",
    description: "Start-Deutsch 2: Routine social interactions, shopping, public transit, doctor visits, and past event descriptions.",
    cefrDescription: "Understand sentences and frequently used expressions related to areas of most immediate relevance.",
    examFormatInfo: "4 Modules: Hören (30m), Lesen (30m), Schreiben (30m), Sprechen (15m)",
    recommendedTime: "6 - 8 weeks at 15 mins/day",
    lessons: [
      {
        id: "a2-lesson-1",
        lessonNumber: 1,
        title: "German A2 — Appointments & Transport (Termine & ÖPNV)",
        duration: "04:30",
        durationSeconds: 270,
        description: "Goethe A2 Sprechen Teil 2: Describing daily routines, rescheduling medical appointments, and giving clear temporal explanations.",
        examComponent: "Sprechen",
        todaysFocus: "Scheduling and rescheduling appointments politely in German A2",
        examRule: "A2 writing and speaking tasks require Modal Verben (können, müssen, wollen) and time prepositions (um, am, im).",
        proTip: "Use 'Passt es Ihnen am...' to suggest an appointment time politely.",
        vocabulary: [
          { term: "Der Termin", translation: "The appointment", note: "Masculine noun - extremely high frequency in A2" },
          { term: "Verschieben auf...", translation: "To postpone to...", note: "Requires Akkusativ preposition 'auf'" },
          { term: "Passt es Ihnen?", translation: "Does that suit you?", note: "Formal polite phrase with Dativ 'Ihnen'" },
          { term: "Dringend", translation: "Urgent", note: "Useful adjective for medical or work context" }
        ],
        transcript: [
          {
            timestamp: 0,
            speaker: "Dozentin Anna",
            german: "In der Goethe A2 Prüfung müssen Sie oft einen Termin vereinbaren oder verschieben.",
            english: "In the Goethe A2 exam, you often have to make or reschedule an appointment.",
            context: "Exam scenario breakdown"
          },
          {
            timestamp: 12,
            speaker: "Anrufer",
            german: "Guten Tag, hier ist Markus Weber. Ich möchte bitte einen Termin vereinbaren.",
            english: "Hello, this is Markus Weber. I would like to make an appointment, please.",
            context: "Standard phone opening for A2 oral exam"
          },
          {
            timestamp: 25,
            speaker: "Empfang",
            german: "Haben Sie am Dienstag um 10 Uhr Zeit?",
            english: "Do you have time on Tuesday at 10 o'clock?",
            context: "Preposition rule: 'am' for days, 'um' for exact times"
          },
          {
            timestamp: 38,
            speaker: "Anrufer",
            german: "Leider geht das nicht, da muss ich arbeiten. Passt es am Mittwoch?",
            english: "Unfortunately that doesn't work, I have to work then. Does Wednesday suit?",
            context: "Polite rejection & alternative proposition"
          },
          {
            timestamp: 55,
            speaker: "Empfang",
            german: "Ja, Mittwoch um 14 Uhr passt sehr gut.",
            english: "Yes, Wednesday at 2 pm suits very well.",
            context: "Agreement confirmation point"
          }
        ]
      }
    ]
  },
  {
    id: "B1",
    badge: "Goethe-Zertifikat B1",
    name: "Goethe B1",
    description: "Zertifikat Deutsch B1: Expressing opinions, handling workplace conversations, writing formal complaint letters, and debate.",
    cefrDescription: "Understand the main points of clear standard input on familiar matters regularly encountered in work, school, and leisure.",
    examFormatInfo: "4 Independent Modules: Hören (40m), Lesen (65m), Schreiben (75m), Sprechen (15m)",
    recommendedTime: "8 - 10 weeks at 20 mins/day",
    lessons: [
      {
        id: "b1-lesson-1",
        lessonNumber: 1,
        title: "German B1 — Expressing Opinions & Workplace Goethe Prep",
        duration: "05:00",
        durationSeconds: 300,
        description: "Goethe B1 Sprechen Teil 2 (Vortrag halten): Structuring a short presentation, stating pros and cons, and sharing personal experiences.",
        examComponent: "Sprechen",
        todaysFocus: "Structuring a 3-minute B1 presentation with connecting discourse markers",
        examRule: "Goethe B1 presentation requires 5 compulsory structures: Intro, Personal Experience, Situation in Home Country, Pros & Cons, Conclusion.",
        proTip: "Use 'Meiner Meinung nach...' (verb in 2nd position) or 'Ich bin der Meinung, dass...' (verb at end) to secure higher grammar points.",
        vocabulary: [
          { term: "Meiner Meinung nach...", translation: "In my opinion...", note: "Note inverted word order: verb immediately follows" },
          { term: "Einerseits ..., andererseits ...", translation: "On one hand ..., on the other hand ...", note: "Classic B1 contrast pair" },
          { term: "Vor- und Nachteile", translation: "Advantages and disadvantages", note: "Essential B1 evaluation vocabulary" },
          { term: "Aus diesem Grund...", translation: "For this reason...", note: "Causal connector with inverted word order" }
        ],
        transcript: [
          {
            timestamp: 0,
            speaker: "Dozentin Anna",
            german: "Das Thema meiner heutigen Präsentation lautet: 'Brauchen wir noch Plastikflaschen?'",
            english: "The topic of my presentation today is: 'Do we still need plastic bottles?'",
            context: "B1 Presentation Step 1: Formal Topic Introduction"
          },
          {
            timestamp: 15,
            speaker: "Dozentin Anna",
            german: "Ich möchte zuerst über meine persönlichen Erfahrungen sprechen.",
            english: "First, I would like to speak about my personal experiences.",
            context: "B1 Presentation Step 2: Transition to personal experience"
          },
          {
            timestamp: 30,
            speaker: "Dozentin Anna",
            german: "In meinem Heimatland kaufen fast alle Menschen Wasser in Plastikflaschen.",
            english: "In my home country, almost all people buy water in plastic bottles.",
            context: "B1 Presentation Step 3: Situation in home country"
          },
          {
            timestamp: 48,
            speaker: "Dozentin Anna",
            german: "Einerseits sind Plastikflaschen leicht, andererseits schaden sie der Umwelt.",
            english: "On one hand plastic bottles are light, on the other hand they harm the environment.",
            context: "B1 Presentation Step 4: Weighing Pros & Cons"
          },
          {
            timestamp: 68,
            speaker: "Dozentin Anna",
            german: "Meiner Meinung nach sollten wir Mehrwegflaschen bevorzugen.",
            english: "In my opinion, we should prefer reusable bottles.",
            context: "B1 Presentation Step 5: Personal conclusion & opinion"
          }
        ]
      }
    ]
  },
  {
    id: "B2",
    badge: "Goethe-Zertifikat B2",
    name: "Goethe B2",
    description: "Goethe B2 Professional: Nuanced argumentation, complex written essays, idiomatic academic discourse, and professional German.",
    cefrDescription: "Understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in specialized fields.",
    examFormatInfo: "4 Modules: Hören (40m), Lesen (65m), Schreiben (75m), Sprechen (15m)",
    recommendedTime: "10 - 12 weeks at 20 mins/day",
    lessons: [
      {
        id: "b2-lesson-1",
        lessonNumber: 1,
        title: "German B2 — Complex Arguments & Written Goethe Essay",
        duration: "05:15",
        durationSeconds: 315,
        description: "Goethe B2 Schreiben Teil 1 (Diskussionsbeitrag): Advanced argument building, Nomen-Verb-Verbindungen, and formal written connectors.",
        examComponent: "Schreiben",
        todaysFocus: "Mastering formal argumentation structures for Goethe B2 Written Exam (Part 1)",
        examRule: "B2 writing evaluators award maximum points for varied connectors (obwohl, wohingegen, demgegenüber) and elevated vocabulary.",
        proTip: "Replace basic verbs like 'beeinflussen' with B2 Nomen-Verb-Verbindungen like 'Einfluss ausüben auf + Akkusativ'.",
        vocabulary: [
          { term: "Einfluss ausüben auf", translation: "To exert influence on", note: "Nomen-Verb-Verbindung (elevated B2 phrase)" },
          { term: "In Betracht ziehen", translation: "To take into consideration", note: "Replaces basic verb 'überlegen'" },
          { term: "Wohingegen...", translation: "Whereas...", note: "Subordinating connector (verb moves to end)" },
          { term: "Es steht außer Zweifel, dass...", translation: "There is no doubt that...", note: "High-yield B2 introductory clause" }
        ],
        transcript: [
          {
            timestamp: 0,
            speaker: "Dozentin Anna",
            german: "Willkommen zum B2 Masterclass-Modul für den schriftlichen Ausdruck.",
            english: "Welcome to the B2 Masterclass module for written expression.",
            context: "B2 Advanced Exam focus introduction"
          },
          {
            timestamp: 14,
            speaker: "Dozentin Anna",
            german: "Es steht außer Zweifel, dass die Digitalisierung den Arbeitsmarkt nachhaltig verändert hat.",
            english: "There is no doubt that digitization has fundamentally changed the job market.",
            context: "Elevated B2 thesis statement ('Es steht außer Zweifel, dass...')"
          },
          {
            timestamp: 32,
            speaker: "Dozentin Anna",
            german: "Man muss jedoch auch die Risiken in Betracht ziehen.",
            english: "However, one must also take the risks into consideration.",
            context: "B2 Nomen-Verb-Verbindung: 'in Betracht ziehen'"
          },
          {
            timestamp: 50,
            speaker: "Dozentin Anna",
            german: "Während junge Fachkräfte profitieren, stehen ältere Arbeitnehmer vor Herausforderungen.",
            english: "While young professionals benefit, older employees face challenges.",
            context: "Complex contrast clause structure for B2 evaluation"
          }
        ]
      }
    ]
  }
];

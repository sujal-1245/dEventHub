// CareerPathAkinator_GodUI.jsx
// Drop this file into a Vite React project as src/App.jsx.
// Install dependencies first:
// npm install @mui/material @emotion/react @emotion/styled framer-motion react-icons react-hot-toast zustand

import React, { useState } from "react";
import {
  CssBaseline,
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { create } from "zustand";

// ---------- THEME ----------
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7c4dff" },
    background: { default: "#0b1020", paper: "#0f1724" },
  },
  typography: { fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif" },
});

// ---------- QUESTIONS ----------
const QUESTIONS = [
  {
    id: "stage",
    text: "Which academic junction are you choosing for?",
    options: [
      {
        id: "after10",
        label: "After 10th",
        img: "https://youthincmag.com/wp-content/uploads/2019/06/science-arts-commerce-IndiaEducationnet-1280x720.jpeg",
        impact: { general: 1 },
      },
      {
        id: "after12",
        label: "After 12th",
        img: "https://edumilestones.com/blog/images/What-after-12th.png",
        impact: { general: 2 },
      },
      {
        id: "grad",
        label: "After Graduation",
        img: "https://img.freepik.com/premium-photo/professional-successful-businessman-standing-front-commercial-building_693425-4470.jpg",
        impact: { higher: 2 },
      },
    ],
  },
  {
    id: "interest",
    text: "Which activity excites you the most?",
    options: [
      {
        id: "build",
        label: "Build things / Solve puzzles",
        img: "https://www.rd.com/wp-content/uploads/2024/04/GettyImages-1152894858-Jigsaw-Puzzle-Strategy-to-Solve-Puzzles-Fast-JVedit.jpg?fit=700,1024",
        impact: { engineering: 2, logic: 1 },
      },
      {
        id: "help",
        label: "Help people / Care",
        img: "https://cdn.vectorstock.com/i/500p/83/95/charity-icon-set-vector-6208395.jpg",
        impact: { empathy: 2, medical: 1 },
      },
      {
        id: "create",
        label: "Design / Create / Communicate",
        img: "https://www.epiclifecreative.com/wp-content/uploads/2023/06/Creative-Design-in-Business.png",
        impact: { creative: 2 },
      },
      {
        id: "numbers",
        label: "Numbers, markets & business",
        img: "https://static.scientificamerican.com/sciam/cache/file/5B151800-36AD-4142-A78E57F7571FB9BE_source.jpg?w=1200",
        impact: { business: 2 },
      },
      {
        id: "defense",
        label: "Discipline, patriotism & fitness",
        img: "https://m.media-amazon.com/images/I/61lpsqAbRmL.jpg",
        impact: { defense: 2 },
      },
    ],
  },
  {
    id: "strengths",
    text: "Which subject do you enjoy the most?",
    options: [
      {
        id: "maths",
        label: "Mathematics",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxF4kgUXva7RjTc_RI1JNxcE8KR9Q9AA_XWw&s",
        impact: { engineering: 2, analytical: 1 },
      },
      { id: "bio", label: "Biology", img: "https://admin.wadham.ox.ac.uk/images/-wSX1dBYaO4k0B3aGmduF5WKMe8=/4871/format-webp%7Cwidth-600/biology.jpg", impact: { medical: 2 } },
      {
        id: "arts",
        label: "Arts / Languages",
        img: "https://cdn.britannica.com/78/43678-050-F4DC8D93/Starry-Night-canvas-Vincent-van-Gogh-New-1889.jpg?w=400&h=225&c=crop",
        impact: { arts: 2 },
      },
      {
        id: "commerce",
        label: "Commerce / Accounts",
        img: "https://media.geeksforgeeks.org/wp-content/uploads/20230613172545/Commerce-Landing-page-copy.webp",
        impact: { business: 2 },
      },
      {
        id: "sports",
        label: "Physical Education",
        img: "https://www.billabonghighschool.com/blogs/wp-content/uploads/2024/02/blog-45-Benefits-of-Physical-Education-in-Schools.jpg",
        impact: { defense: 1, sports: 2 },
      },
    ],
  },
  {
    id: "values",
    text: "What matters most to you in a career?",
    options: [
      {
        id: "impact",
        label: "Helping society",
        img: "https://img.freepik.com/premium-vector/volunteers-help-charity-set-with-people-care-helping-seniours-invalids-poor-social-support-illustrations-set-volunteering-community-donation-voluntary_109722-2233.jpg",
        impact: { empathy: 2 },
      },
      {
        id: "money",
        label: "Financial growth",
        img: "https://thumbs.dreamstime.com/b/generated-image-331018579.jpg",
        impact: { business: 2 },
      },
      {
        id: "creativity",
        label: "Creative freedom",
        img: "https://skye-studio.com/wp-content/uploads/2023/04/5-Steps-to-Design-Your-Career-Using-Design-Thinking-1024x585.jpg",
        impact: { creative: 2 },
      },
      {
        id: "stability",
        label: "Job security",
        img: "https://knowledge.wharton.upenn.edu/wp-content/uploads/2023/05/5.3.23-joao-gomes-financial-stability-policy-GettyImages-853891122.jpg",
        impact: { govt: 2 },
      },
    ],
  },
  {
    id: "lifestyle",
    text: "Which lifestyle attracts you?",
    options: [
      {
        id: "tech",
        label: "Tech hubs & startups",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxBztn2GFD74q18AFwc39W1SExTR3jTO02fQ&s",
        impact: { engineering: 2, business: 1 },
      },
      {
        id: "med",
        label: "Hospitals / Clinics",
        img: "https://static.vecteezy.com/system/resources/previews/038/252/707/non_2x/hospital-building-illustration-medical-clinic-isolated-on-white-background-vector.jpg",
        impact: { medical: 2 },
      },
      {
        id: "artsy",
        label: "Studios & agencies",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE24rcUuttPJLlZpl9WCyaPX1Y52hSwoWmEA&s",
        impact: { creative: 2 },
      },
      {
        id: "uniform",
        label: "Uniform & service",
        img: "https://www.shutterstock.com/image-vector/isometric-hotel-services-receptionist-baker-260nw-2451202481.jpg",
        impact: { defense: 2, govt: 1 },
      },
    ],
  },
  {
    id: "skills",
    text: "Pick your strongest natural skill:",
    options: [
      {
        id: "logic",
        label: "Logical reasoning",
        img: "https://passpsychometric.com/wp-content/uploads/2019/03/logical.jpg",
        impact: { engineering: 2 },
      },
      {
        id: "talk",
        label: "Communication",
        img: "https://clariti.app/wp-content/uploads/2025/05/Why-business-communication-is-critical-to-your-companys-success-and-tips-to-improve-them.jpg",
        impact: { business: 1, creative: 1 },
      },
      {
        id: "lead",
        label: "Leadership",
        img: "https://www.leadershipchoice.com/wp-content/uploads/2024/02/proving-leadership-training-is-worth-it-980x504-1.jpg",
        impact: { business: 2, govt: 1 },
      },
      {
        id: "care",
        label: "Empathy / Care",
        img: "https://careclinic.io/wp-content/uploads/2023/11/empathy-fatigue-jpg.webp",
        impact: { medical: 2 },
      },
    ],
  },
  {
    id: "dream",
    text: "Where do you see yourself?",
    options: [
      {
        id: "lab",
        label: "In a lab building solutions",
        img: "https://engineering.tamu.edu/mechanical/_files/_images/_content-images/LAB-MEEN-CiMDM.jpg",
        impact: { engineering: 2 },
      },
      {
        id: "clinic",
        label: "In a clinic saving lives",
        img: "https://impeccabuild.com.au/wp-content/uploads/2020/07/Medical-Clinic-Interior-Design-Ideas-Medical-Fitouts-ImpeccaBuild-3-scaled.jpg",
        impact: { medical: 2 },
      },
      {
        id: "stage",
        label: "On stage or in front of a camera",
        img: "https://www.pixartprinting.co.uk/blog/wp-content/uploads/2023/09/Influencer-marketing-come-funziona-1.jpg",
        impact: { arts: 2, creative: 1 },
      },
      {
        id: "office",
        label: "In an office leading projects",
        img: "https://www.livehome3d.com/assets/img/social/fb-types-of-office-layouts.jpg",
        impact: { business: 2 },
      },
      {
        id: "uniform2",
        label: "Serving in uniform",
        img: "https://external-preview.redd.it/VIR-651FhMC24pWPosluz3__qeHgS5VinyhoIb53tBM.jpg?width=1080&crop=smart&auto=webp&s=8524e8a9f5892f918cf737aa35864f52edd34a1b",
        impact: { defense: 3 },
      },
    ],
  },
];

// ---------- CAREERS ----------
const CAREER_PROFILES = [
  {
    id: "cse",
    label: "Computer Science Engineer",
    tags: ["engineering", "logic"],
    desc: "B.Tech CSE, Software Dev, AI, Product Management",
  },
  {
    id: "mech",
    label: "Mechanical Engineer",
    tags: ["engineering"],
    desc: "Automobiles, Manufacturing, Robotics, Design",
  },
  {
    id: "civil",
    label: "Civil Engineer",
    tags: ["engineering"],
    desc: "Infrastructure, Construction, Govt Exams, RTO Inspector",
  },
  {
    id: "iti",
    label: "ITI / Diploma Technician",
    tags: ["engineering", "vocational"],
    desc: "Welder, Electrician, Machinist, Diesel Mechanic",
  },
  {
    id: "diploma",
    label: "Polytechnic Diploma Engineer",
    tags: ["engineering"],
    desc: "Entry to engineering jobs or higher studies (B.E./B.Tech)",
  },
  {
    id: "doctor",
    label: "Doctor (MBBS)",
    tags: ["medical", "empathy"],
    desc: "Clinical practice, Surgery, Research",
  },
  {
    id: "nurse",
    label: "Nurse / Paramedical",
    tags: ["medical", "empathy"],
    desc: "Patient care, Clinical support, Hospital roles",
  },
  {
    id: "mlt",
    label: "Lab Technician (DMLT/MLT)",
    tags: ["medical"],
    desc: "Diagnostics, Laboratory, Pathology",
  },
  {
    id: "bpharma",
    label: "Pharmacy (B.Pharm / D.Pharm)",
    tags: ["medical"],
    desc: "Pharmaceutical industry, Hospitals, Research",
  },
  {
    id: "finance",
    label: "Finance / CA / Investment",
    tags: ["business", "analytical"],
    desc: "CA, CFA, Banking, Investment Banking",
  },
  {
    id: "mba",
    label: "MBA / Management",
    tags: ["business", "leadership"],
    desc: "Marketing, Finance, HR, Operations, Consulting",
  },
  {
    id: "bank",
    label: "Banking / Insurance Officer",
    tags: ["business", "govt"],
    desc: "Bank PO, LIC Officer, Clerical exams",
  },
  {
    id: "clerk",
    label: "Government Clerk / Stenographer",
    tags: ["govt"],
    desc: "SSC, MPSC, UPSC clerical grade exams",
  },
  {
    id: "nda",
    label: "Defense (Army/Navy/Airforce)",
    tags: ["defense"],
    desc: "NDA, CDS, Technical entries in armed forces",
  },
  {
    id: "police",
    label: "Police / Sub-Inspector",
    tags: ["defense", "govt"],
    desc: "Law enforcement, Police Dept. exams",
  },
  {
    id: "paramilitary",
    label: "BSF / CRPF / CISF",
    tags: ["defense"],
    desc: "Paramilitary services, Constable/Sub-Inspector exams",
  },
  {
    id: "pilot",
    label: "Pilot / Air Hostess / Aviation",
    tags: ["defense", "travel"],
    desc: "Commercial Pilot Licence, Flight Steward, Aviation roles",
  },
  {
    id: "designer",
    label: "Designer (Fashion / Product / Interior)",
    tags: ["creative"],
    desc: "Design schools, Agencies, Creative industries",
  },
  {
    id: "finearts",
    label: "Fine Arts / Teacher",
    tags: ["arts", "creative"],
    desc: "BFA, Art colleges, Art teacher diploma",
  },
  {
    id: "media",
    label: "Media & Journalism",
    tags: ["arts", "creative"],
    desc: "Mass Communication, TV, Advertising, Film",
  },
  {
    id: "acting",
    label: "Acting / Performing Arts",
    tags: ["arts", "creative"],
    desc: "NSD, Drama, Film & Theatre, Event Management",
  },
  {
    id: "agriculture",
    label: "B.Sc. Agriculture",
    tags: ["science"],
    desc: "Farming, Research, Govt Agriculture Jobs",
  },
  {
    id: "dairy",
    label: "Dairy Technology / Animal Husbandry",
    tags: ["science"],
    desc: "Veterinary, Dairy management, Food science",
  },
  {
    id: "hotel",
    label: "Hotel Management / Tourism",
    tags: ["business", "creative"],
    desc: "Hospitality industry, Event management, Tourism",
  },
  {
    id: "mscit",
    label: "Computer & IT Courses (MS-CIT / BCA / MCA)",
    tags: ["engineering", "logic"],
    desc: "IT jobs, Software development, Data entry, Networking",
  },
];

// ---------- STORE ----------
const useStore = create((set) => ({
  answers: [],
  traits: {},
  addAnswer: (qId, opt) =>
    set((s) => ({
      answers: [...s.answers, { qId, opt }],
      traits: mergeTraits(s.traits, opt.impact || {}),
    })),
  reset: () => set({ answers: [], traits: {} }),
}));

function mergeTraits(base, impact) {
  const out = { ...base };
  Object.entries(impact || {}).forEach(([k, v]) => {
    out[k] = (out[k] || 0) + v;
  });
  return out;
}

function scoreCareers(traits) {
  const scores = CAREER_PROFILES.map((profile) => {
    let score = 0;
    profile.tags.forEach((tag) => {
      score += traits[tag] || 0;
    });
    return { profile, score };
  });

  // Sort descending by score
  scores.sort((a, b) => b.score - a.score);

  // Find maximum score
  const maxScore = scores[0]?.score || 0;

  // Keep only careers with the highest score
  return scores
    .filter((s) => s.score === maxScore && maxScore > 0)
    .map((s) => s.profile);
}

// ---------- FLOATING MASCOT ----------
function FloatingMascot({ src }) {
  return (
    <motion.img
      src={src}
      alt="mascot"
      style={{
        width: 120,
        height: 120,
        borderRadius: "50%",
        objectFit: "cover",
      }}
      animate={{ y: [0, -12, 0] }}
      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    />
  );
}

// ---------- OPTION CARD ----------
function OptionCard({ option, onSelect, sx }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ flex: 1, display: "flex" }}
    >
      <Paper
        onClick={() => onSelect(option)}
        elevation={6}
        sx={{
          cursor: "pointer",
          overflow: "hidden",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          ...sx,
        }}
      >
        {/* Image container with fixed aspect ratio */}
        <Box
          sx={{
            width: "100%",
            aspectRatio: "4/3", // forces all images to have same proportion
            backgroundImage: `url(${option.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Content */}
        <Box sx={{ p: 2, flexGrow: 1 }}>
          <Typography variant="h6">{option.label}</Typography>
          <Typography variant="body2" color="text.secondary">
            Tap to choose
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
}

// ---------- MAIN APP ----------
export default function Hackinator() {
  const { answers, traits, addAnswer, reset } = useStore();
  const [qIndex, setQIndex] = useState(0);
  const [results, setResults] = useState(null);
  const q = QUESTIONS[qIndex];

  function handleSelect(option) {
    addAnswer(q.id, option);
    toast.success(option.label);

    if (qIndex + 1 >= QUESTIONS.length) {
      const finalTraits = mergeTraits(traits, option.impact);
      setResults(scoreCareers(finalTraits));
    } else {
      setQIndex(qIndex + 1);
    }
  }

  function handleRestart() {
    reset();
    setQIndex(0);
    setResults(null);
    toast("Restarted");
  }

  const progress = Math.round(
    ((answers.length + (results ? 1 : 0)) / (QUESTIONS.length + 1)) * 100
  );

  const mascotSrc = qIndex % 2 === 0 ? "/ginie.png" : "/giniedidi.png";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: (theme) => (theme.palette.mode === "dark" ? "#000" : "#fff"),
          p: 3,
        }}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={10}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#111" : "#fafafa",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.1), 0 6px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              {/* Left Sidebar */}
              <Box
                sx={{
                  flex: "0 0 320px",
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#111" : "#fefefe",
                  borderRight:
                    theme.palette.mode === "dark"
                      ? "1px solid #222"
                      : "1px solid #eee",
                }}
              >
                <FloatingMascot src={mascotSrc} />

                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ mt: 3, color: "#004d40" }}
                >
                  Career Akinator
                </Typography>

                <Box sx={{ width: "100%", my: 3 }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    style={{
                      height: 10,
                      background: "linear-gradient(90deg,#00bfa5,#1de9b6)",
                      borderRadius: 12,
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Progress {progress}%
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleRestart}
                  sx={{
                    mt: 2,
                    borderColor: "#00bfa5",
                    color: "#00bfa5",
                    "&:hover": { backgroundColor: "#e0f2f1" },
                  }}
                >
                  Restart
                </Button>
              </Box>

              {/* Right Content */}
              <Box sx={{ flex: 1, p: 4 }}>
                <AnimatePresence mode="wait">
                  {!results && (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                    >
                      <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ color: "#006064" }}
                      >
                        {q.text}
                      </Typography>
                      <Grid
  container
  spacing={3}
  alignItems="stretch"
>
  {q.options.map((opt) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={opt.id}
      sx={{ display: "flex" }}
    >
      <OptionCard
        option={opt}
        onSelect={handleSelect}
        sx={{ flex: 1 }}
      />
    </Grid>
  ))}
</Grid>


                    </motion.div>
                  )}

                  {results && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ color: "#FFFFFF" }}
                      >
                        I think these paths suit you
                      </Typography>
                      <Grid container spacing={3}>
                        {results.map((r) => (
                          <Grid item xs={12} md={6} key={r.id}>
                            <Paper
                              elevation={6}
                              sx={{
                                p: 3,
                                display: "flex",
                                gap: 2,
                                borderLeft: "4px solid #00bfa5",
                                bgcolor: (theme) =>
                                  theme.palette.mode === "dark"
                                    ? "#111"
                                    : "#f9f9f9",
                              }}
                            >
                              <Avatar sx={{ bgcolor: "#00bfa5" }}>
                                {r.label
                                  .split(" ")
                                  .map((x) => x[0])
                                  .join("")}
                              </Avatar>
                              <Box>
                                <Typography
                                  variant="h6"
                                  sx={{ color: "#006064" }}
                                >
                                  {r.label}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {r.desc}
                                </Typography>
                                <Button
                                  variant="contained"
                                  sx={{
                                    mt: 1,
                                    bgcolor: "#00bfa5",
                                    "&:hover": { bgcolor: "#008e76" },
                                  }}
                                  onClick={() => toast("Open roadmap (mock)")}
                                >
                                  View Roadmap
                                </Button>
                              </Box>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                      <Button
                        variant="outlined"
                        onClick={handleRestart}
                        sx={{
                          mt: 3,
                          borderColor: "#00bfa5",
                          color: "#00bfa5",
                          "&:hover": { backgroundColor: "#e0f2f1" },
                        }}
                      >
                        Try Again
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

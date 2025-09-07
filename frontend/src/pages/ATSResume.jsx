import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Loader2,
  FileText,
  Phone,
  Mail,
  Award,
  BookOpen,
  Briefcase,
  Star,
  CheckCircle,
  XCircle,
  Linkedin,
  Github,
  Globe,
  Sparkles,
  Shield,
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ATSResume = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const scoreRef = useRef(null);

  const rawURL = import.meta.env.VITE_ML_BACKEND_URL || "";
  const mlBackendURL = rawURL.replace(/\/+$/, "");

  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDarkMode(dark);

    const observer = new MutationObserver(() => {
      const darkModeNow = document.documentElement.classList.contains("dark");
      setIsDarkMode(darkModeNow);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
    setAnalysis(null);
  };

  const analyzeResume = async () => {
    if (!resumeFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", resumeFile);

    try {
      const res = await axios.post(`${mlBackendURL}/resume`, formData);
      setAnalysis(res.data.analysis || {});
      setTimeout(() => {
        scoreRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (err) {
      console.error("Error analyzing resume:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const groupedSkills = (skills) => {
    if (!skills?.length) return {};
    const categories = {
      Languages: [],
      Frontend: [],
      Backend: [],
      Databases: [],
      "Tools & Others": [],
    };

    skills.forEach((skill) => {
      const s = skill.toLowerCase();
      if (["html", "css", "javascript", "tailwind", "react.js"].includes(s))
        categories.Frontend.push(skill);
      else if (["node.js", "express.js", "flask", "rest"].includes(s))
        categories.Backend.push(skill);
      else if (["mongodb", "sql"].includes(s)) categories.Databases.push(skill);
      else if (
        ["git", "github", "numpy", "pandas", "matplotlib", "dsa", "oop"].includes(s)
      )
        categories["Tools & Others"].push(skill);
      else categories.Languages.push(skill);
    });

    return categories;
  };

  const skillsGrouped = groupedSkills(analysis?.skills);

  // Expanded marketing copy for explanation sections
  const explanationSections = [
    {
      title: "Why your resume needs to beat ATS",
      desc: "Over 95% of Fortune 500 companies rely on Applicant Tracking Systems (ATS) to filter candidates before a human recruiter even looks at resumes. If your resume isn’t ATS-friendly, it might never reach the hiring manager. dEventHub ATS ensures your document is optimized to pass through filters and showcase your value.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      title: "How we evaluate your resume",
      desc: "Our system scans your resume just like an ATS would, checking for structure, formatting, and keyword presence. We evaluate the content quality, grammar, and quantified achievements, ensuring your resume demonstrates real impact instead of generic buzzwords.",
      img: "https://cdn-icons-png.flaticon.com/512/1995/1995515.png",
    },
    {
      title: "Actionable feedback you can trust",
      desc: "Instead of vague scoring, dEventHub ATS gives you specific feedback. Missing keywords? Weak bullet points? Overused jargon? We flag them and provide direct suggestions for improvement so you can revise with confidence.",
      img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    },
    {
      title: "AI-powered rewriting assistance",
      desc: "Our built-in AI assistant, powered by GPT, helps you instantly rewrite weak sentences, generate powerful summaries, and tailor your resume for each job application. No more staring at a blank page — let AI accelerate your success.",
      img: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
    },
    {
      title: "Comprehensive resume checklist",
      desc: "We don’t just stop at ATS parsing. Our checker reviews 16+ key factors across content, design, and clarity — from grammar and section order to file size, bullet length, and keyword coverage. It’s like having a career coach on demand.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135673.png",
    },
    {
      title: "Guaranteeing ATS compatibility",
      desc: "Our scoring system reverse-engineers popular ATS like Workday, Taleo, and Greenhouse. We highlight issues that can block your resume from being read correctly, so you never get rejected for formatting errors again.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
    },
    {
      title: "Level up with dEventHub’s resume builder",
      desc: "Once you know what to fix, you can use our builder to polish your resume further. Add missing sections, adjust layout, and export perfectly formatted, ATS-optimized PDFs in minutes.",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135800.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Is your <span className="text-blue-600">resume</span> ready to win interviews?
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              dEventHub’s <span className="font-semibold">AI Resume Checker</span> runs{" "}
              <span className="font-semibold">16+ ATS-focused checks</span> to ensure
              your resume passes filters and lands on the recruiter’s desk.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <Sparkles className="text-blue-500 w-5 h-5" /> ATS scan simulation
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="text-blue-500 w-5 h-5" /> Keyword & grammar analysis
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="text-blue-500 w-5 h-5" /> Personalized improvement tips
              </li>
            </ul>
            <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Shield size={16} className="text-green-500" /> 100% privacy guaranteed
            </p>
          </div>

          {/* Right uploader */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 text-center">
            <FileText className="mx-auto mb-4 text-blue-600 dark:text-blue-400 w-12 h-12" />
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 rounded-xl cursor-pointer p-10 transition duration-300 hover:shadow-lg bg-gray-50 dark:bg-gray-800/50">
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                {resumeFile ? resumeFile.name : "Click or Drag your file here (.pdf/.doc/.docx)"}
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <button
              onClick={analyzeResume}
              disabled={loading || !resumeFile}
              className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-3 transition disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Analyze Resume"}
            </button>
          </div>
        </section>

        {/* Alternating explanation sections */}
        <div className="mt-24 space-y-24">
          {explanationSections.map((sec, i) => (
            <div
              key={i}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={`${i % 2 === 1 ? "order-2" : ""}`}>
                <img
                  src={sec.img}
                  alt={sec.title}
                  className="w-full max-w-md mx-auto rounded-2xl"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {sec.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {sec.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Analysis Section */}
        {analysis && (
          <motion.div
            ref={scoreRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-12 mt-20"
          >
            {/* ATS Score Card */}
            <div className="relative rounded-3xl bg-white dark:bg-gray-900 shadow-2xl flex flex-col md:flex-row items-center justify-between p-12 gap-8">
              <div className="w-52 h-52 md:w-60 md:h-60 flex-shrink-0 z-10">
                <CircularProgressbar
                  value={analysis.score || 0}
                  text={`${analysis.score || 0}/100`}
                  styles={buildStyles({
                    pathColor:
                      analysis.score > 85
                        ? "#34d399"
                        : analysis.score > 60
                        ? "#facc15"
                        : "#f87171",
                    textColor: isDarkMode ? "#fff" : "#111827",
                    trailColor: "rgba(203, 213, 225, 0.4)",
                    textSize: "20px",
                  })}
                />
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 justify-center text-gray-800 dark:text-gray-200 font-semibold z-10">
                {analysis.contact && (
                  <div className="flex items-center gap-3 text-blue-500 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl">
                    <Phone className="w-5 h-5" /> {analysis.contact}
                  </div>
                )}
                {analysis.email && (
                  <div className="flex items-center gap-3 text-green-500 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl">
                    <Mail className="w-5 h-5" /> {analysis.email}
                  </div>
                )}
                {analysis.linkedin && (
                  <a
                    href={
                      analysis.linkedin.startsWith("http")
                        ? analysis.linkedin
                        : `https://${analysis.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-700 dark:text-blue-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl"
                  >
                    <Linkedin className="w-5 h-5" /> LinkedIn
                  </a>
                )}
                {analysis.github && (
                  <a
                    href={
                      analysis.github.startsWith("http")
                        ? analysis.github
                        : `https://${analysis.github}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl"
                  >
                    <Github className="w-5 h-5" /> GitHub
                  </a>
                )}
                {analysis.portfolio && (
                  <a
                    href={analysis.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-purple-700 dark:text-purple-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl"
                  >
                    <Globe className="w-5 h-5" /> Portfolio
                  </a>
                )}
              </div>
            </div>

            {/* Detailed Analysis Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* ATS Feedback */}
              <div className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-blue-600" /> ATS Feedback
                </h3>
                {analysis.feedback?.length > 0 ? (
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    {analysis.feedback.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                        {f}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No feedback available</p>
                )}
              </div>

              {/* Skills */}
              <div className="bg-blue-50 dark:bg-blue-900/40 rounded-2xl p-6 shadow-md border border-blue-200 dark:border-blue-700">
                <h3 className="text-2xl font-bold flex items-center gap-2 mb-4 text-blue-700 dark:text-blue-300">
                  <Star className="w-6 h-6" /> Skills
                </h3>
                {skillsGrouped && Object.keys(skillsGrouped).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(skillsGrouped).map(
                      ([category, list]) =>
                        list.length > 0 && (
                          <div key={category}>
                            <h4 className="font-semibold text-blue-800 dark:text-blue-400">
                              {category}:
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {list.map((skill, i) => (
                                <span
                                  key={i}
                                  className="bg-blue-200 dark:bg-blue-700 px-3 py-1 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                ) : (
                  <p>No skills detected</p>
                )}
              </div>

              {/* Education */}
              <div className="bg-green-50 dark:bg-green-900/40 rounded-2xl p-6 shadow-md border border-green-200 dark:border-green-700">
                <h3 className="text-2xl font-bold flex items-center gap-2 mb-4 text-green-700 dark:text-green-300">
                  <BookOpen className="w-6 h-6" /> Education
                </h3>
                {analysis.education?.length ? (
                  <div className="space-y-4">
                    {analysis.education.map((edu, i) => (
                      <div
                        key={i}
                        className="bg-green-100 dark:bg-green-800/50 p-4 rounded-xl"
                      >
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <p>
                          {edu.university}{" "}
                          <span className="text-gray-500">
                            ({edu.duration || "N/A"})
                          </span>
                        </p>
                        {edu.GPA && (
                          <span className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            GPA: {edu.GPA}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No education detected</p>
                )}
              </div>

              {/* Experience */}
              <div className="bg-yellow-50 dark:bg-yellow-900/40 rounded-2xl p-6 shadow-md border border-yellow-200 dark:border-yellow-700">
                <h3 className="text-2xl font-bold flex items-center gap-2 mb-4 text-yellow-700 dark:text-yellow-300">
                  <Briefcase className="w-6 h-6" /> Experience
                </h3>
                {analysis.experience?.length ? (
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    {analysis.experience.map((exp, i) => (
                      <li key={i}>
                        <span className="font-semibold">{exp.position}</span> @{" "}
                        {exp.company} ({exp.duration || "N/A"})
                        {exp.achievements?.length > 0 && (
                          <ul className="ml-5 mt-1 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            {exp.achievements.map((ach, j) => (
                              <li key={j} className="flex items-center gap-1">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                {ach}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No experience detected</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ATSResume;

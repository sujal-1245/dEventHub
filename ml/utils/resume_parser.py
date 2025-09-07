import docx2txt
from pdfminer.high_level import extract_text
import re

# Predefined technical skills
SKILL_KEYWORDS = [
    "python", "javascript", "react", "node", "machine learning", 
    "ai", "nlp", "data analysis", "tensorflow", "pandas"
]

def extract_text_from_file(file_path):
    if file_path.endswith(".pdf"):
        return extract_text(file_path)
    elif file_path.endswith(".docx"):
        return docx2txt.process(file_path)
    else:
        return ""

def analyze_resume(file_path):
    text = extract_text_from_file(file_path).lower()
    
    # Extract skills
    skills = [skill for skill in SKILL_KEYWORDS if skill in text]
    
    # Extract education (simple regex)
    education = re.findall(r"(b\.sc|m\.sc|bachelor|master|ph\.d|bs|ms)", text)
    
    # Extract experience (simple regex)
    experience_years = re.findall(r"(\d+)\s?(years|yrs)", text)
    
    # Compute simple ATS score
    score = min(100, len(skills) * 10 + len(education) * 5 + len(experience_years) * 5)
    
    # Feedback
    feedback = []
    if len(skills) < 3:
        feedback.append("Add more relevant technical skills.")
    if not education:
        feedback.append("Mention your educational qualifications.")
    if not experience_years:
        feedback.append("Include your work experience duration.")
    
    return {
        "skills": skills,
        "education": education,
        "experience": experience_years,
        "score": score,
        "feedback": feedback
    }

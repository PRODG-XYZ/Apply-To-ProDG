# 🎨 Design & Technical Handoff — Application Webapp

## Overview
A clean, minimal, professional web application for developer recruitment.  
Design language: Apple-inspired → **big typography, whitespace, smooth animations, parallax transitions**.  
Tone: Professional + approachable, with **safe, light humor** sprinkled through microcopy.  

Framework: **Next.js 14 (App Router)**  
Styling: **Tailwind CSS**  
Animations: **Framer Motion** for transitions, **React Spring / react-scroll-parallax** for parallax effects.  
Storage: **Supabase** (form data + file uploads).  
Deployment: **Vercel**  

---

## 🗺️ Page-by-Page Flow

### 1. Landing Page
- **Copy:**
  - Headline: “We’d love to get to know you better.”
  - Subline: “This won’t take long — promise.”
  - CTA: “Start Application”

- **Design:**
  - Fullscreen hero, centered text.
  - Gradient or subtle particle background.
  - Large CTA button with hover glow.

- **Animations:**
  - Text fade/slide in with **Framer Motion**.
  - Background parallax (subtle slow scroll).

---

### 2. Step 1 — Basic Info
- **Fields:**
  - Name → Placeholder: “What should we call you?”
  - Email → Placeholder: “Where should we send good news?”
  - Phone → Placeholder: “Only used when email isn’t fast enough.”

- **Design:**
  - Vertical stacked form.
  - Progress indicator at top: “Step 1 of 5”.

- **Animations:**
  - Inputs slide in from bottom.
  - Focus state: underline grows with smooth easing.
  - Progress bar animates width with Framer Motion.

---

### 3. Step 2 — CV Upload
- **Fields:** File upload (PDF/DOC).
- **Copy:**
  - Empty state: “Upload your CV (PDF or DOC).”
  - Success: “Got it — looks like you’ve been busy.”

- **Design:**
  - Drag-and-drop card with icon.
  - Uploaded file appears as a clean card with filename.

- **Animations:**
  - On drag over → border color animates with `framer-motion`.
  - On upload → document card “floats in” with slight scale-up.

- **Implementation Notes:**
  - Store in Supabase storage bucket.
  - Save file URL to applicant record.

---

### 4. Step 3 — Motivation
- **Question:** “What excites you most about building in tech and startups?”
- **Hint:** “This is your chance to be cooler than you think you are.”

- **Design:**
  - Centered big question text.
  - Text area below.

- **Animations:**
  - Question fades in with parallax shift.
  - As user types → subtle glowing caret effect (CSS animation).

---

### 5. Step 4 — Insight Questions
- **Q1:** “What’s a project you’re proud of?”  
  - Hint: “Big or small, it counts if it mattered to you.”
- **Q2:** “If you had no limits, what would you build?”  
  - Hint: “Ambition is welcome here.”

- **Design:**
  - One question per screen (horizontal swipe).
  - Large centered text with plenty of whitespace.

- **Animations:**
  - Horizontal page transitions with Framer Motion.
  - Parallax text reveal (text and background move at different speeds).

---

### 6. Step 5 — Links
- **Fields:**
  - GitHub: “Share your GitHub (if you have one).”
  - LinkedIn: “A LinkedIn, if you’d like us to see it.”
  - Portfolio/Other: “Any other link that shows your work.”

- **Design:**
  - Grid layout with clean icons next to each field.
  - Subtle hover effects on icons.

- **Animations:**
  - Icons float in with staggered animation.
  - On input, field highlight animates.

---

### 7. Final Page — Submission
- **Copy:**
  - Headline: “All done. That was quick.”
  - Subline: “We’ll review your application and be in touch soon.”
  - Microcopy: “(Faster than your last npm install… probably.)”

- **Design:**
  - Fullscreen success message, centered.
  - Subtle celebratory animation (confetti dots, not cartoonish).

- **Animations:**
  - Fade-in confetti (CSS keyframes or `react-confetti`).
  - Exit animation → background fade to white.

---

## ⚙️ Technical Implementation Notes

### Structure
- `/` → Landing page.
- `/apply` → Multi-step form wizard.
- `/success` → Submission complete.

### Form Handling
- **react-hook-form** for validation + controlled inputs.
- Store intermediate state in context or local state.
- Save data on final submit → Supabase.

### Animations
- **Framer Motion:**  
  - Page transitions (`AnimatePresence`).  
  - Progress bar (`motion.div` width animation).  
  - Staggered input reveals.  

- **Parallax:**
  - Use `react-scroll-parallax` for background image depth.
  - Light 10–20px offset per scroll for subtle effect.

### File Upload
- Drag-and-drop → `react-dropzone`.
- Upload to Supabase storage bucket.
- Save public file URL to DB.

### Admin (Phase 2)
- Protected `/admin` route.
- List applicants (Supabase table).
- Links to CV + answers.

---

## 🎯 Key Design Principles
1. **Minimalist:** Large typography, clean layouts, whitespace.  
2. **Professional:** Neutral colors, subtle gradients, no gimmicks.  
3. **Playful but safe:** Encouraging, light humor in microcopy.  
4. **Engaging:** Smooth animations, parallax storytelling.  
5. **Usable:** Clear flow, short steps, mobile-friendly.

---

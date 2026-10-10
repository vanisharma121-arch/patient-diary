# Patient Diary

An AI workflow layer for outpatient encounters. Patient Diary sits on top of the hospital EHR and follows one visit from wristband scan to signed record:

1. **Identify:** scan the wristband and open the patient file.
2. **Capture:** symptom checklist, vitals and live transcription that sorts the conversation into key terms and action items.
3. **Ready for doctor:** one tap hands the encounter to the physician.
4. **Clinical review:** workflow board from intake to follow-up, an approval checklist, and an EHR consultation note recorded from the doctor–patient conversation.
5. **Sign-off:** signature, EHR update and a prescription emailed to the patient.

All patients and records are synthetic. Nothing connects to a real EHR or sends real email.

**Live site:** https://vanisharma121-arch.github.io/patient-diary/

## Run it locally

```bash
npm install
npm run dev
```

## Stack

Vite, React 19, TypeScript, Tailwind CSS 4, Motion and lucide-react. Every push to `main` builds and deploys to GitHub Pages.

`prototype/patient-diary.html` is the original single-file prototype, kept as the reference while screens move into React.

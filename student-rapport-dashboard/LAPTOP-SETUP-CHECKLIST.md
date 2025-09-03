# MacBook Setup Checklist - Student Rapport Dashboard + AI Workflow

**Goal:** Transfer this project to MacBook M2 (24GB) and set up local AI integration

## 🔄 Step 1: Sync Second Brain

### On MacBook Terminal:
```bash
cd /path/to/secondbrain
git pull origin master
```

**What this does:** Gets all the dashboard files and documentation we created tonight

## 🐍 Step 2: Python Environment Setup  

### Install/Verify Python:
```bash
python3 --version
# Should be 3.8+ 
```

### Navigate to Dashboard:
```bash
cd ~/secondbrain/student-rapport-dashboard
```

### Install Dependencies:
```bash
pip3 install flask sqlite3
# OR if you have requirements.txt:
pip3 install -r requirements.txt
```

### Test the Dashboard:
```bash
python3 app.py
```
**Expected:** Dashboard runs at http://localhost:5000

---

## 🤖 Step 3: Local AI Setup (Choose One)

### Option A: LM Studio (Recommended - GUI Interface)

1. **Download:** https://lmstudio.ai/
2. **Install:** Drag to Applications folder
3. **Launch LM Studio**
4. **Download a Model:**
   - Click "Discover" tab
   - Search for "Llama-3.1-8B" or "CodeLlama"
   - Download (this will take 10-20 minutes)
5. **Start Local Server:**
   - Click "Local Server" tab
   - Select your downloaded model
   - Click "Start Server"
   - Note the URL (usually http://localhost:1234)

### Option B: Ollama (Command Line)

1. **Install:** https://ollama.com/download/mac
2. **Download a Model:**
   ```bash
   ollama pull llama3.1:8b
   # OR for coding:
   ollama pull codellama
   ```
3. **Start Server:**
   ```bash
   ollama serve
   ```

---

## 📝 Step 4: Cursor IDE Setup

### Download & Install:
1. **Download:** https://cursor.sh/
2. **Install:** Drag to Applications folder
3. **Launch Cursor**

### Configure for Local AI:
1. **Open Settings:** Cmd+, 
2. **Go to:** "AI" or "Models" section
3. **Add Custom Model:**
   - Model URL: `http://localhost:1234/v1` (LM Studio) or `http://localhost:11434` (Ollama)
   - Model Name: Whatever you downloaded
4. **Test:** Try asking Cursor AI a question

### Open Dashboard Project:
```bash
# In terminal:
cursor ~/secondbrain/student-rapport-dashboard
```

---

## 🔧 Step 5: Test Everything Works

### Test 1: Dashboard Running
- Browser to http://localhost:5000
- Should see your 6 classes and sample students

### Test 2: Local AI Responding  
- In Cursor, ask: "Explain this Python code"
- Should get response from local model (not cloud)

### Test 3: File Editing
- Make a small change to dashboard code in Cursor
- Ask AI: "Add a comment to this function"
- AI should suggest edits and Cursor should apply them

---

## 🎯 Step 6: First AI-Assisted Task

### Goal: Add AI Discussion Parsing
1. **Open:** `discussion_parser.py` in Cursor
2. **Ask Cursor AI:** 
   ```
   "This parser currently uses basic text matching. Can you enhance it 
   to use AI to better identify student names and responses from messy 
   Canvas discussion text?"
   ```
3. **Review the suggestions** Cursor provides
4. **Test with sample text**

---

## 📋 Step 7: Save Your Setup

### Document What Worked:
Create `~/secondbrain/AI-WORKFLOW-NOTES.md`:
- Which AI model you chose
- What Cursor settings worked  
- Any issues you encountered
- URL/port numbers for your setup

### Backup Command (if you change things):
```bash
cd ~/secondbrain
git add .
git commit -m "MacBook AI setup and dashboard enhancements"
git push
```

---

## 🚨 Troubleshooting Quick Reference

### Dashboard Won't Start:
```bash
pip3 install flask
python3 setup_database.py
python3 app.py
```

### AI Model Won't Load:
- Check available RAM: Activity Monitor
- Try smaller model if needed
- Restart LM Studio/Ollama

### Cursor Won't Connect to Local AI:
- Verify AI server is running (check localhost URL in browser)
- Check Cursor model settings
- Try restarting Cursor

---

## 💡 Next Session Goals

### Once Everything is Working:
1. **Enhance discussion parser** with AI
2. **Add automatic personality summary generation**
3. **Create AI-powered student insights**
4. **Test with real Canvas discussion data**

### Future AI Integration Ideas:
- Auto-categorize student responses by personality type
- Generate teaching strategy suggestions per student
- Create personalized conversation starters
- Predict which students might need extra attention

---

## 🎯 Success Criteria

**You'll know it's working when:**
- ✅ Dashboard runs on MacBook at localhost:5000
- ✅ Local AI model responds in Cursor
- ✅ You can ask Cursor to modify dashboard code
- ✅ AI suggestions apply directly to files
- ✅ No student data leaves your computer

**Then you're ready to build AI-powered teaching tools that respect student privacy!**

---

## 📞 If You Get Stuck

### Self-Help Order:
1. **Check this checklist** for missed steps
2. **Google the specific error message**
3. **Try restarting** the problematic component
4. **Check GitHub Issues** for Cursor/LM Studio
5. **Ask Claude Code** for help with specific error messages

### What to Tell Future Claude Sessions:
"I have a Student Rapport Dashboard at ~/secondbrain/student-rapport-dashboard/ with local AI setup via [LM Studio/Ollama] and Cursor IDE. The dashboard works but I want to enhance [specific feature] with AI."
// Simple Presentation Tool
class SimplePresentation {
    constructor() {
        this.sessions = [];
        this.currentSessionIndex = -1;
        this.init();
    }

    async init() {
        try {
            await this.loadSessionData();
            this.renderSessionList();
            this.setupEventListeners();
            // Auto-select Daily Routine by default (index 1)
            console.log(`Auto-selecting session at index 1: ${this.sessions[1]?.title}`);
            this.selectSession(1);
        } catch (error) {
            console.error('Failed to initialize presentation:', error);
            this.showError('Failed to load session data');
        }
    }

    async loadSessionData() {
        try {
            const response = await fetch('teacher-guide.md');
            const content = await response.text();
            this.sessions = this.parseTeacherGuide(content);
            // Add indicator for dynamic loading
            document.getElementById('sidebar').setAttribute('data-mode', 'live');
        } catch (error) {
            console.error('Failed to load teacher guide:', error);
            // Fallback to hardcoded data
            document.getElementById('sidebar').setAttribute('data-mode', 'backup');
            this.sessions = [
            {
                id: 'first-time-setup',
                title: 'First Time Setup',
                description: 'Password check and Canvas tour',
                content: this.getFirstTimeSetupContent()
            },
            {
                id: 'daily-routine',
                title: 'Daily Routine',
                description: 'What to do every day',
                content: this.getDailyRoutineContent()
            },
            {
                id: 'project-overview',
                title: 'Project Overview',
                description: 'What we\'re building this week',
                content: this.getProjectOverviewContent()
            },
            {
                id: 'assignment',
                title: 'Assignment Instructions',
                description: 'Step-by-step what to do',
                content: this.getAssignmentContent()
            },
            {
                id: 'file-management',
                title: 'File Management Basics',
                description: 'Saving files and understanding extensions',
                content: this.getFileManagementContent()
            },
            {
                id: 'copy-paste',
                title: 'Copy, Cut, and Paste',
                description: 'Essential computer skills',
                content: this.getCopyPasteContent()
            },
            {
                id: 'save-vs-save-as',
                title: 'Save vs Save As',
                description: 'When to use each command',
                content: this.getSaveContent()
            },
            {
                id: 'find-with-ctrl-f',
                title: 'Finding with Ctrl+F',
                description: 'Searching for text in documents',
                content: this.getFindContent()
            },
            {
                id: 'html-introduction',
                title: 'What is HTML?',
                description: 'Introduction to web development',
                content: this.getHTMLContent()
            },
            {
                id: 'css-styling',
                title: 'CSS: Making Things Look Good',
                description: 'Styling and colors',
                content: this.getCSSContent()
            },
            {
                id: 'personalization',
                title: 'Personalizing Your Code',
                description: 'Making the project your own',
                content: this.getPersonalizationContent()
            }
        ];
        }
    }

    parseTeacherGuide(content) {
        const sessions = [];
        // Use regex to find complete session blocks from ### title through ---
        const sessionRegex = /### ([^\n]+)\n\*\*Description:\*\* ([^\n]+)\s+#### Content:\s+([\s\S]*?)(?=\n---|\n### [^\n]+\n\*\*Description:\*\*|$)/g;
        
        let match;
        while ((match = sessionRegex.exec(content)) !== null) {
            const title = match[1].trim();
            const description = match[2].trim();
            const rawContent = match[3].trim();
            
            console.log(`Raw markdown for ${title} (${rawContent.length} chars):`, rawContent.substring(0, 200));
            const htmlContent = this.markdownToHtml(rawContent);
            console.log(`HTML for ${title} (${htmlContent.length} chars):`, htmlContent.substring(0, 100) + '...');
            
            sessions.push({
                id: this.slugify(title),
                title: title,
                description: description,
                content: htmlContent
            });
            console.log(`Added session: ${title}`);
        }
        
        console.log(`Total sessions parsed: ${sessions.length}`);
        return sessions;
    }
    
    slugify(text) {
        return text.toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    }
    
    markdownToHtml(markdown) {
        let html = markdown
            // Headers
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^\*\*(.+)\*\*$/gm, '<div class="definition-box"><h4>$1</h4>')
            
            // Bold text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            
            // Lists
            .replace(/^- (.+)$/gm, '• $1<br>')
            .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
            
            // Line breaks
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
            
        // Wrap in paragraphs
        html = '<p>' + html + '</p>';
        
        // Fix definition boxes and lists
        html = html
            .replace(/<p><h/g, '<h')
            .replace(/<\/h(\d)><\/p>/g, '</h$1>')
            .replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>')
            .replace(/<p>(<ol>)/g, '$1')
            .replace(/(<\/ol>)<\/p>/g, '$1');
        
        return html;
    }

    renderSessionList() {
        const sessionList = document.getElementById('session-list');
        sessionList.innerHTML = '';

        this.sessions.forEach((session, index) => {
            const sessionDiv = document.createElement('div');
            sessionDiv.className = 'session-item';
            sessionDiv.dataset.sessionIndex = index;
            
            sessionDiv.innerHTML = `
                <div class="session-title">${session.title}</div>
                <div class="session-description">${session.description}</div>
            `;
            
            sessionDiv.addEventListener('click', () => this.selectSession(index));
            sessionList.appendChild(sessionDiv);
        });
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prev-btn').addEventListener('click', () => this.previousSession());
        document.getElementById('next-btn').addEventListener('click', () => this.nextSession());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousSession();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSession();
            }
        });
    }

    selectSession(index) {
        if (index < 0 || index >= this.sessions.length) return;

        // Update UI
        document.querySelectorAll('.session-item').forEach((item, i) => {
            item.classList.toggle('selected', i === index);
        });

        this.currentSessionIndex = index;
        this.displaySession(this.sessions[index]);
        this.updateNavigation();
    }

    displaySession(session) {
        console.log(`Displaying session: ${session.title}`);
        console.log(`Content length: ${session.content.length}`);
        const slideContainer = document.getElementById('current-slide');
        console.log(`Slide container found:`, slideContainer);
        slideContainer.innerHTML = session.content;
        console.log(`Content set in container`);
        slideContainer.classList.add('slide-enter');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            slideContainer.classList.remove('slide-enter');
        }, 300);
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const counter = document.getElementById('slide-counter');

        prevBtn.disabled = this.currentSessionIndex <= 0;
        nextBtn.disabled = this.currentSessionIndex >= this.sessions.length - 1;

        if (this.currentSessionIndex >= 0) {
            const current = this.currentSessionIndex + 1;
            const total = this.sessions.length;
            counter.textContent = `${current} / ${total}`;
        } else {
            counter.textContent = 'Welcome';
        }
    }

    previousSession() {
        if (this.currentSessionIndex > 0) {
            this.selectSession(this.currentSessionIndex - 1);
        }
    }

    nextSession() {
        if (this.currentSessionIndex < this.sessions.length - 1) {
            this.selectSession(this.currentSessionIndex + 1);
        }
    }

    // Content methods - these will be populated with actual teaching content
    getFirstTimeSetupContent() {
        return `
            <h2>🔧 First Time Setup</h2>
            
            <div class="call-to-action">
                <h4>Today Only - Login Process</h4>
                <ol>
                    <li>Log into your computer</li>
                    <li>Log into Canvas</li>
                </ol>
            </div>

            <h3>Computer Login</h3>
            <ul>
                <li><strong>Username:</strong> Your 9 number</li>
                <li><strong>Password:</strong> First initial (capital) + Last initial (capital) + Shift+Grade level + SSID</li>
            </ul>

            <h3>Canvas Login</h3>
            <ul>
                <li>Ask for help if needed</li>
            </ul>

            <h3>Canvas Tour</h3>
            <ul>
                <li>📋 Where assignments are</li>
                <li>💬 Where discussions are</li>
            </ul>
        `;
    }

    getDailyRoutineContent() {
        return `
            <h2>🚀 Daily Routine</h2>
            
            <div class="call-to-action">
                <h4>Do This First Every Day</h4>
                <ol>
                    <li>Log into Canvas</li>
                    <li>Check for any announcements</li>
                    <li>Work on and complete discussion starter</li>
                </ol>
            </div>
        `;
    }

    getProjectOverviewContent() {
        return `
            <h2>🕐 Project Overview: Personal Desktop Clock</h2>
            
            <h3>What You're Building This Week</h3>
            <p>You will create your own personalized desktop clock that shows:</p>
            <ul>
                <li>✅ Current time and date</li>
                <li>✅ What class period you're in</li>
                <li>✅ How much time is left in class</li>
                <li>✅ Your name and custom colors</li>
            </ul>

            <div class="call-to-action">
                <h4>The Big Idea</h4>
                <p>By Friday, you will have built something you'll actually use every day. No more asking "What time is it?" - you'll have your own personal clock!</p>
            </div>

            <h3>Skills You'll Learn</h3>
            <ul>
                <li>💾 File management (save, save as, file types)</li>
                <li>📋 Copy and paste basics</li>
                <li>🔍 Finding things with Ctrl+F</li>
                <li>🌐 Basic HTML, CSS, and JavaScript</li>
                <li>🎨 Customization and design thinking</li>
            </ul>

            <div class="definition-box">
                <h4>Real-World Connection</h4>
                <p>Every website you've ever visited uses HTML, CSS, and JavaScript. By the end of this week, you'll understand the building blocks of the entire internet!</p>
            </div>
        `;
    }

    getAssignmentContent() {
        return `
            <h2>📋 Assignment Instructions</h2>
            
            <div class="call-to-action">
                <h4>Your Mission</h4>
                <p>Create your personal desktop clock that shows the current time, class periods, and time remaining - with your name and custom colors!</p>
            </div>

            <h3>Step-by-Step Instructions</h3>
            <ol>
                <li>📝 Open Notepad</li>
                <li>📋 Copy the HTML code from Canvas</li>
                <li>📄 Paste it into Notepad</li>
                <li>💾 Save as "clock.html" on your desktop (choose "All Files")</li>
                <li>🌐 Double-click clock.html to open in your browser - you'll see a working clock!</li>
                <li>📝 Go back to Notepad to edit the code</li>
                <li>🔍 Use Ctrl+F to find "CHALLENGE 1" in the code</li>
                <li>✏️ Make the change described in the challenge</li>
                <li>💾 Save the file in Notepad (Ctrl+S)</li>
                <li>🔄 Go back to your browser and refresh (F5) - you'll see your change!</li>
                <li>🔁 Repeat steps 7-10 for all 9 challenges</li>
                <li>🎨 Use the color picker on your clock to test colors, then copy the hex codes into your challenges</li>
                <li>🔖 When finished, bookmark your clock</li>
            </ol>

            <h3>The 9 Challenges</h3>
            <ul>
                <li>🏷️ Change browser tab title to include your name</li>
                <li>🎨 Customize background color</li>
                <li>🎨 Customize time box color</li>
                <li>🎨 Customize status box color</li>
                <li>🎨 Customize controls box color</li>
                <li>🎨 Customize progress box color</li>
                <li>🎨 Customize progress bar color</li>
                <li>📝 Change page title to include your name</li>
                <li>🙈 Hide color picker when done</li>
            </ul>

            <div class="definition-box">
                <h4>Success Looks Like</h4>
                <p>A working clock with your name in the title, your chosen colors, and a bookmark that opens your personal clock instantly!</p>
            </div>
        `;
    }

    getFileManagementContent() {
        return `
            <h2>📁 File Management Basics</h2>
            
            <div class="definition-box">
                <h4>File Extension</h4>
                <p>The letters after the dot in a filename (.html, .jpg, .docx). These tell the computer what type of file it is and which program should open it.</p>
            </div>

            <h3>Why File Extensions Matter</h3>
            <ul>
                <li>💻 Computer needs to know how to open the file</li>
                <li>📄 Different programs handle different file types</li>
                <li>🌐 .html files open in web browsers</li>
                <li>📝 .docx files open in Word</li>
            </ul>

            <div class="call-to-action">
                <h4>Try This: File Detective Challenge</h4>
                <p>Look at your desktop or any folder. Find 3 different files and write down their full names (including the letters after the dot). What do you think those letters tell the computer?</p>
            </div>

            <h3>Teaching Tips</h3>
            <ul>
                <li>Show examples on your computer</li>
                <li>Let students explore their own files</li>
                <li>Explain that this is like labeling boxes</li>
                <li>Connect to apps on their phones</li>
            </ul>
        `;
    }

    getCopyPasteContent() {
        return `
            <h2>✂️ Copy, Cut, and Paste Superpowers</h2>
            
            <div class="definition-box">
                <h4>The Big Three</h4>
                <p><strong>Copy (Ctrl+C):</strong> Makes a duplicate - original stays, copy goes to clipboard</p>
                <p><strong>Cut (Ctrl+X):</strong> Moves something - removes original, puts it on clipboard</p>
                <p><strong>Paste (Ctrl+V):</strong> Takes whatever is on clipboard and puts it somewhere new</p>
            </div>

            <h3>Why This is Essential</h3>
            <ul>
                <li>⚡ Saves time and prevents mistakes</li>
                <li>🔄 Works across all programs</li>
                <li>🎯 Fundamental computer skill</li>
                <li>📚 You'll use it in every class</li>
            </ul>

            <div class="call-to-action">
                <h4>Try This Right Now</h4>
                <p>Copy some text from this slide and paste it into a new document. Notice how the original text stays here!</p>
            </div>

            <h3>Real-World Uses</h3>
            <ul>
                <li>📝 Moving quotes in essays</li>
                <li>🔗 Sharing links with friends</li>
                <li>📊 Copying data between spreadsheets</li>
                <li>💻 Any computer-based homework</li>
            </ul>
        `;
    }

    getSaveContent() {
        return `
            <h2>💾 Save vs Save As</h2>
            
            <div class="definition-box">
                <h4>Save (Ctrl+S)</h4>
                <p>Saves your work. First time asks where to put it and what to name it. After that, just saves changes to the same file.</p>
                
                <h4>Save As</h4>
                <p>Always asks where to put it and what to name it. Use when you want to make a copy with a different name.</p>
            </div>

            <h3>When to Use Each</h3>
            <ul>
                <li>💾 <strong>Save:</strong> First time asks for name/location, then just saves changes</li>
                <li>📁 <strong>Save As:</strong> Always asks for name/location</li>
                <li>✅ Both work for new projects</li>
                <li>📄 Save As is useful for making copies</li>
            </ul>

            <div class="call-to-action">
                <h4>Your Turn</h4>
                <p>We're about to save your HTML file to the desktop. Remember: choose "All Files" as the file type, not "Text Document"!</p>
            </div>

            <h3>Pro Tips</h3>
            <ul>
                <li>Save early and save often</li>
                <li>Use Save As to make backup copies</li>
                <li>Pay attention to file types</li>
                <li>Organize files in folders</li>
            </ul>
        `;
    }

    getFindContent() {
        return `
            <h2>🔍 Finding Things with Ctrl+F</h2>
            
            <div class="definition-box">
                <h4>Find (Ctrl+F)</h4>
                <p>Searches for specific words in your document. Essential for finding things in code and long documents.</p>
            </div>

            <h3>Ctrl+F is a Superpower</h3>
            <ul>
                <li>⚡ Quickly locate specific words</li>
                <li>🎯 Essential for finding challenges in code</li>
                <li>💻 Works in almost every program</li>
                <li>⏰ Saves tons of scrolling time</li>
            </ul>

            <div class="call-to-action">
                <h4>Try This</h4>
                <p>Press Ctrl+F right now and search for the word "CHALLENGE" in your HTML code. See how it highlights every instance?</p>
            </div>

            <h3>Where You'll Use This</h3>
            <ul>
                <li>📝 Finding specific parts of essays</li>
                <li>💻 Locating code challenges</li>
                <li>📚 Searching through research</li>
                <li>🌐 Finding information on websites</li>
            </ul>
        `;
    }

    getHTMLContent() {
        return `
            <h2>🌐 What is HTML?</h2>
            
            <div class="definition-box">
                <h4>HTML</h4>
                <p><strong>HyperText Markup Language</strong> - The structure/skeleton of every webpage. It tells the browser what goes where.</p>
            </div>

            <h3>HTML is Everywhere</h3>
            <ul>
                <li>🌐 Every website you've ever seen</li>
                <li>📱 Your phone apps use similar code</li>
                <li>📺 Social media, games, school websites</li>
                <li>😊 Not as hard as it looks!</li>
            </ul>

            <div class="call-to-action">
                <h4>Think About It</h4>
                <p>Right now you're looking at HTML! This webpage, TikTok, YouTube, Google - all built with HTML. You're about to join millions of people who know how to create for the web.</p>
            </div>

            <h3>What HTML Does</h3>
            <ul>
                <li>📖 Creates headings and paragraphs</li>
                <li>🔗 Makes links clickable</li>
                <li>🖼️ Displays images</li>
                <li>📋 Organizes information in lists</li>
            </ul>
        `;
    }

    getCSSContent() {
        return `
            <h2>🎨 CSS: Making Things Look Good</h2>
            
            <div class="definition-box">
                <h4>CSS</h4>
                <p><strong>Cascading Style Sheets</strong> - Controls how websites look (colors, fonts, layout). Like decorating your room!</p>
                
                <h4>Hex Code</h4>
                <p>A way to specify exact colors using numbers/letters. Example: #FF0000 = red</p>
            </div>

            <h3>Why CSS Matters</h3>
            <ul>
                <li>🎨 Makes websites beautiful instead of boring</li>
                <li>🌈 Controls colors, fonts, and layout</li>
                <li>📱 Makes sites work on phones and computers</li>
                <li>✨ Brings your creative vision to life</li>
            </ul>

            <div class="call-to-action">
                <h4>Practice Time</h4>
                <p>Change one color in your code using the color picker. Watch how CSS instantly transforms your clock!</p>
            </div>

            <h3>Color Psychology</h3>
            <ul>
                <li>🔴 Red: Energy, excitement</li>
                <li>🔵 Blue: Calm, trustworthy</li>
                <li>🟢 Green: Growth, harmony</li>
                <li>🟡 Yellow: Happy, optimistic</li>
            </ul>
        `;
    }

    getPersonalizationContent() {
        return `
            <h2>✨ Personalizing Your Code</h2>
            
            <h3>Why We Customize</h3>
            <ul>
                <li>🏠 Makes it yours</li>
                <li>🎯 Increases engagement</li>
                <li>🧠 Teaches design thinking</li>
                <li>⚡ Shows cause and effect</li>
            </ul>

            <div class="call-to-action">
                <h4>Your Goal</h4>
                <p>Bookmark your finished clock so you can use it every day. This isn't just a school project - it's a tool you'll actually use!</p>
            </div>

            <h3>Design Thinking Questions</h3>
            <ul>
                <li>❓ What colors make you feel focused?</li>
                <li>❓ How do you want others to see your work?</li>
                <li>❓ What would make this more useful to you?</li>
                <li>❓ How does color affect your mood?</li>
            </ul>

            <div class="definition-box">
                <h4>The Psychology of Ownership</h4>
                <p>When you put your name on something and make it your own, you care more about it. That's why we're not just copying code - we're creating something personal that reflects who you are.</p>
            </div>
        `;
    }

    showError(message) {
        const slideContainer = document.getElementById('current-slide');
        slideContainer.innerHTML = `
            <h2>❌ Error</h2>
            <p>${message}</p>
            <p>Please refresh the page and try again.</p>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SimplePresentation();
});
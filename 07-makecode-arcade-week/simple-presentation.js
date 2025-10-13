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
            // Auto-select the first session by default
            console.log(`Auto-selecting session at index 0: ${this.sessions[0]?.title}`);
            this.selectSession(0);
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
                    id: 'week-overview',
                    title: 'Week Overview',
                    description: 'Themes and pacing guide',
                    content: this.getWeekOverviewContent()
                },
                {
                    id: 'day-1-sprites',
                    title: 'Day 1 — Sprites & Movement',
                    description: 'Create a hero sprite and learn the editor',
                    content: this.getDayOneContent()
                },
                {
                    id: 'day-2-animation',
                    title: 'Day 2 — Animation & Control',
                    description: 'Velocity, stay on screen, and simple loops',
                    content: this.getDayTwoContent()
                },
                {
                    id: 'day-3-interactions',
                    title: 'Day 3 — Collisions & Score',
                    description: 'Collectibles, hazards, and variables',
                    content: this.getDayThreeContent()
                },
                {
                    id: 'day-4-python',
                    title: 'Day 4 — Tilemaps + Python Peek',
                    description: 'Design levels and tweak code in Python',
                    content: this.getDayFourContent()
                },
                {
                    id: 'day-5-showcase',
                    title: 'Day 5 — Polish & Share',
                    description: 'Debug, document, and present games',
                    content: this.getDayFiveContent()
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

        // Font size control
        const fontSelect = document.getElementById('font-size');
        if (fontSelect) {
            fontSelect.addEventListener('change', (e) => {
                document.body.style.fontSize = `${e.target.value}px`;
                console.log(`Font size changed to ${e.target.value}px`);
            });
        }

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

    // Content methods - fallback MakeCode Arcade snapshots
    getWeekOverviewContent() {
        return `
            <h2>🎮 MakeCode Arcade Week</h2>
            <p>Quick reference if the teacher guide cannot be loaded.</p>
            <h3>Daily Snapshot</h3>
            <ul>
                <li><strong>Day 1:</strong> Sprite editor, controller events, hero setup</li>
                <li><strong>Day 2:</strong> Animation loops, velocity, stay-on-screen</li>
                <li><strong>Day 3:</strong> Overlaps, scoring, lives, projectiles</li>
                <li><strong>Day 4:</strong> Tilemaps, story, Python tweaks</li>
                <li><strong>Day 5:</strong> Polish, debug, showcase</li>
            </ul>
        `;
    }

    getDayOneContent() {
        return `
            <h2>Day 1 — Sprites & Movement</h2>
            <h3>Objectives</h3>
            <ul>
                <li>Launch new project at <a href="https://arcade.makecode.com/" target="_blank">arcade.makecode.com</a></li>
                <li>Create custom player sprite with the pixel editor</li>
                <li>Use controller blocks to move the sprite</li>
            </ul>
            <h3>Teacher Tips</h3>
            <ul>
                <li>Model undo/redo and naming the sprite</li>
                <li>Encourage students to tell a story about their character</li>
                <li>Collect exit ticket: “What makes a sprite memorable?”</li>
            </ul>
        `;
    }

    getDayTwoContent() {
        return `
            <h2>Day 2 — Animation & Control</h2>
            <h3>Objectives</h3>
            <ul>
                <li>Build a simple two-frame animation loop</li>
                <li>Use <code>setStayInScreen(true)</code> and velocity adjustments</li>
                <li>Experiment with button-triggered animations</li>
            </ul>
            <h3>Teacher Tips</h3>
            <ul>
                <li>Show the difference between 100 and 200 ms intervals</li>
                <li>Offer advanced challenge: add a companion sprite</li>
                <li>Exit ticket idea: capture a screenshot of animation frames</li>
            </ul>
        `;
    }

    getDayThreeContent() {
        return `
            <h2>Day 3 — Collisions & Score</h2>
            <h3>Objectives</h3>
            <ul>
                <li>Use <code>sprites.onOverlap</code> to react to collectibles</li>
                <li>Track score and lives with the <code>info</code> blocks</li>
                <li>Introduce hazards or timers for difficulty</li>
            </ul>
            <h3>Teacher Tips</h3>
            <ul>
                <li>Model placing items randomly on tiles or at locations</li>
                <li>Have students playtest with partners and trade feedback</li>
                <li>Exit ticket: describe the win/lose condition</li>
            </ul>
        `;
    }

    getDayFourContent() {
        return `
            <h2>Day 4 — Tilemaps + Python Peek</h2>
            <h3>Objectives</h3>
            <ul>
                <li>Create a tilemap to shape the level or story area</li>
                <li>Place sprites on tiles and set walls for collisions</li>
                <li>Switch to Python view to tweak one gameplay value</li>
            </ul>
            <h3>Teacher Tips</h3>
            <ul>
                <li>Warn students before switching views so they do not panic</li>
                <li>Focus Python edit on a single change (speed or spawn rate)</li>
                <li>Exit ticket: “One thing I adjusted in Python was…”</li>
            </ul>
        `;
    }

    getDayFiveContent() {
        return `
            <h2>Day 5 — Polish & Share</h2>
            <h3>Objectives</h3>
            <ul>
                <li>Run a debug checklist for controls, scoring, and endings</li>
                <li>Add final polish: music, splash screens, or story text</li>
                <li>Publish via MakeCode share link or screenshot</li>
            </ul>
            <h3>Teacher Tips</h3>
            <ul>
                <li>Schedule short peer demos with feedback cards</li>
                <li>Offer recognition: Best Art, Most Replayable, Wildcard</li>
                <li>Exit ticket: goal for next coding project</li>
            </ul>
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

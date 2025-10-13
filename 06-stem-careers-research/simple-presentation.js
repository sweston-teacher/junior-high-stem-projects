// Copied from latest template (micro:bit) so it loads teacher-guide.md sessions
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
            // Default to the second item (often Daily Routine)
            this.selectSession(Math.min(1, this.sessions.length - 1));
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
            document.getElementById('sidebar').setAttribute('data-mode', 'live');
        } catch (error) {
            console.error('Failed to load teacher guide:', error);
            document.getElementById('sidebar').setAttribute('data-mode', 'backup');
            this.sessions = [];
        }
    }

    parseTeacherGuide(content) {
        const sessions = [];
        const sessionRegex = /### ([^\n]+)\n\*\*Description:\*\* ([^\n]+)\s+#### Content:\s+([\s\S]*?)(?=\n---|\n### [^\n]+\n\*\*Description:\*\*|$)/g;
        let match;
        while ((match = sessionRegex.exec(content)) !== null) {
            const title = match[1].trim();
            const description = match[2].trim();
            const rawContent = match[3].trim();
            const htmlContent = this.markdownToHtml(rawContent);
            sessions.push({ id: this.slugify(title), title, description, content: htmlContent });
        }
        return sessions;
    }

    markdownToHtml(markdown) {
        // Match behavior of latest working template for clear bullets and spacing
        let html = markdown
            // Headers
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^\*\*(.+)\*\*$/gm, '<div class="definition-box"><h4>$1</h4>')
            // Bold
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            // Unordered bullets → separate lines with bullets
            .replace(/^- (.+)$/gm, '• $1<br>')
            // Ordered list (simple)
            .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
            // Line breaks
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');

        // Wrap in paragraphs and tidy
        html = '<p>' + html + '</p>'
            .replace(/<p><h/g, '<h')
            .replace(/<\/h(\d)><\/p>/g, '</h$1>')
            .replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>')
            .replace(/<p>(<ol>)/g, '$1')
            .replace(/(<\/ol>)<\/p>/g, '$1');
        return html;
    }

    slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

    renderSessionList() {
        const list = document.getElementById('session-list');
        list.innerHTML = '';
        this.sessions.forEach((s, i) => {
            const div = document.createElement('div');
            div.className = 'session-item';
            div.innerHTML = `<div class="session-title">${s.title}</div><div class="session-description">${s.description}</div>`;
            div.addEventListener('click', () => this.selectSession(i));
            list.appendChild(div);
        });
    }

    setupEventListeners() {
        const prev = document.getElementById('prev-btn');
        const next = document.getElementById('next-btn');
        prev.addEventListener('click', () => this.selectSession(this.currentSessionIndex - 1));
        next.addEventListener('click', () => this.selectSession(this.currentSessionIndex + 1));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.selectSession(this.currentSessionIndex - 1);
            if (e.key === 'ArrowRight') this.selectSession(this.currentSessionIndex + 1);
        });
        const fontSelect = document.getElementById('font-size');
        if (fontSelect) {
            fontSelect.addEventListener('change', (e) => {
                document.body.style.fontSize = `${e.target.value}px`;
            });
        }
    }

    selectSession(index) {
        if (index < 0 || index >= this.sessions.length) return;
        this.currentSessionIndex = index;
        const s = this.sessions[index];
        document.getElementById('current-slide').innerHTML = `<h1>${s.title}</h1>${s.content}`;
        document.getElementById('slide-counter').textContent = `${index + 1} / ${this.sessions.length}`;
        document.getElementById('prev-btn').disabled = index === 0;
        document.getElementById('next-btn').disabled = index === this.sessions.length - 1;
        const items = document.querySelectorAll('.session-item');
        items.forEach((el, i) => el.classList.toggle('selected', i === index));
    }

    showError(msg) {
        document.getElementById('current-slide').innerHTML = `<div class="definition">${msg}</div>`;
    }
}

window.addEventListener('DOMContentLoaded', () => new SimplePresentation());

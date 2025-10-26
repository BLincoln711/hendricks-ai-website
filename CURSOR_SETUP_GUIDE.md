# Cursor Setup Guide for Hendricks.AI Website

## 🚀 Quick Start

Your Cursor workspace is already configured! This guide shows you how to use it effectively.

## 📦 Essential Extensions (Auto-Install Recommended)

When you open this project in Cursor, you'll be prompted to install recommended extensions. Click "Install All" for:

1. **Prettier** - Auto-formats code on save
2. **ESLint** - Catches JavaScript/TypeScript errors
3. **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
4. **Material Icon Theme** - Better file icons
5. **Error Lens** - Shows errors inline
6. **GitLens** - Enhanced git features
7. **Auto Rename Tag** - Automatically renames paired HTML/JSX tags
8. **Code Spell Checker** - Catches typos in code

## ⌨️ Essential Keyboard Shortcuts

### File Navigation
- `Cmd+P` - Quick open file
- `Cmd+Shift+P` - Command palette
- `Cmd+B` - Toggle sidebar
- `Cmd+J` - Toggle terminal
- `Cmd+\` - Split editor

### Editing
- `Cmd+D` - Select next occurrence
- `Cmd+Shift+L` - Select all occurrences
- `Option+Up/Down` - Move line up/down
- `Option+Shift+Up/Down` - Copy line up/down
- `Cmd+/` - Toggle comment
- `Cmd+Shift+F` - Find in all files

### Git
- `Ctrl+Shift+G` - Open source control
- `Cmd+K Cmd+C` - Stage selected changes

### AI Features (Cursor Specific)
- `Cmd+K` - AI edit (select code, then press)
- `Cmd+L` - AI chat (ask questions about code)
- `Cmd+I` - AI inline completion

## 🎨 Cursor AI Features

### 1. AI Chat (Cmd+L)
Best for:
- "How does this component work?"
- "Add error handling to this function"
- "Explain this code"
- "Write a test for this"

### 2. AI Edit (Cmd+K)
Best for:
- Select code → Cmd+K → "Add TypeScript types"
- Select code → Cmd+K → "Refactor to use hooks"
- Select code → Cmd+K → "Add comments"

### 3. AI Compose
Best for:
- Writing new components from scratch
- Generating boilerplate code
- Creating new files

## 📁 Recommended File Organization in Cursor

### Sidebar Layout (Left)
1. **Explorer** - Your files
2. **Search** - Find/replace across project
3. **Source Control** - Git changes
4. **Extensions** - Manage extensions

### Use Workspaces
Create workspace for common tasks:
- Blog editing
- Homepage updates
- Styling changes

Save as: `hendricks-ai.code-workspace`

## 🔧 Workflow Tips

### Daily Workflow
1. Open Cursor → Your project auto-loads
2. `Cmd+Shift+P` → "Git: Pull" (get latest changes)
3. Make your edits
4. `Cmd+S` to save (auto-formats)
5. Terminal: `npm run dev` to preview
6. Git commit when ready

### Git Integration
Your terminal commands:
```bash
# See what changed
git status

# Stage and commit
git add .
git commit -m "Description of changes"

# Push to GitHub (triggers Vercel deploy)
git push origin main
```

### Better: Use Cursor's Git UI
1. `Ctrl+Shift+G` - Open source control
2. Click `+` next to files to stage
3. Type commit message at top
4. Click ✓ to commit
5. Click `...` → Push

## 🎯 Cursor-Specific Productivity Tips

### 1. Multi-Cursor Editing
- Hold `Option` + Click to add cursors
- `Cmd+D` to select next match
- `Cmd+Shift+L` to select all matches

### 2. Command Palette Power
`Cmd+Shift+P` then type:
- "Format Document" - Format current file
- "Organize Imports" - Clean up imports
- "Reload Window" - Restart Cursor
- "Toggle Word Wrap" - Wrap long lines

### 3. Terminal Shortcuts
- `Cmd+J` - Toggle terminal
- `Cmd+Shift+5` - Split terminal
- `Cmd+\`` - Create new terminal

### 4. Breadcrumbs Navigation
Top of editor shows: `app > insights > page.tsx`
- Click any part to navigate
- `Cmd+Shift+.` to focus breadcrumbs

## 🔍 Search Like a Pro

### Quick Find
- `Cmd+F` - Find in current file
- `Cmd+Shift+F` - Find in all files
- `Cmd+H` - Find and replace

### Advanced Search
Use regex patterns:
- Find all TODOs: `TODO:.*`
- Find all console.logs: `console\.log\(.*\)`

## 📝 Snippets (Type and press Tab)

Already configured for React/Next.js:
- `rfc` → React Functional Component
- `imp` → Import statement
- `clg` → console.log
- `ust` → useState hook
- `uef` → useEffect hook

## 🎨 Theme & Appearance

Recommended settings:
1. `Cmd+,` to open settings
2. Search "theme"
3. Try: "One Dark Pro" or "GitHub Dark"
4. Font: "Fira Code" or "JetBrains Mono" (with ligatures)

Enable font ligatures:
```json
"editor.fontLigatures": true,
"editor.fontSize": 14,
"editor.lineHeight": 24
```

## 🐛 Debugging

### TypeScript Errors
- Hover over red squiggles
- `Cmd+.` for quick fixes
- Click "Problems" tab at bottom

### npm Errors
Terminal → Check error messages
Common fixes:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🔄 Git Best Practices in Cursor

### Before Starting Work
```bash
git pull origin main
```

### Making Changes
1. Create descriptive commits
2. Commit related changes together
3. Push frequently

### Good Commit Messages
✅ "Add blog post about AI search visibility"
✅ "Fix CTA button contrast on homepage"
❌ "updates"
❌ "fix"

## 📚 Resources

### Learn More
- Cursor docs: cursor.sh/docs
- Next.js docs: nextjs.org/docs
- Tailwind docs: tailwindcss.com/docs

### This Project
- Homepage: `app/page.tsx`
- Blog posts: `app/insights/[slug]/page.tsx`
- Metadata: `app/metadata.ts`
- Project guide: `PROJECT_GUIDE.md`

## 🎯 Pro Tips

1. **Use AI Chat for Documentation**
   - Ask "How does the metadata system work?"
   - Ask "Where should I add a new FAQ?"

2. **Zen Mode for Focus**
   - `Cmd+K Z` - Enter Zen Mode (distraction-free)
   - `Esc Esc` - Exit Zen Mode

3. **Quick File Switching**
   - `Cmd+P` → Type filename
   - Works with fuzzy matching: "meta" finds "metadata.ts"

4. **Integrated Terminal is Your Friend**
   - Keep terminal open at bottom
   - Run `npm run dev` and keep it running
   - Use for git commands

5. **Save Layouts**
   - Arrange your editor splits
   - File → Save Workspace As
   - Reopens with same layout

---

**Remember:** Cursor = VS Code + AI superpowers. Everything VS Code can do, Cursor does better with AI assistance!

For help: Press `Cmd+L` and ask Cursor AI!

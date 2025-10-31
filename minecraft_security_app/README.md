# Minecraft Education Plot Security Builder

A single-file web application for managing Minecraft Education Edition plot security using tag-based logic. Generate all the commands needed for owner tag setup, ticking areas, and a repeating security function.

## Features (Implemented)

✅ **Core Functionality**
- Per-plot data model with multi-owner support
- Class-scoped localStorage (6 classes: 1st Stem, 3rd CC, 4th Stem, 5th CC, 6th Stem, 7th CC)
- Live detector-line preview per plot
- Owner-tag setup line preview
- Clean code export with copy buttons
- Export/Import JSON with timestamps and schema versioning

✅ **Code Generation**
- Owner tag setup commands (correct Bedrock syntax with `@a[name=...]` selectors)
- Optional ticking areas (default OFF)
- Repeating function body (`my_security.mcfunction`)
- Cleanup commands
- Audit/debug tools

✅ **Validation & Safety**
- Overlapping plot detection
- Tag name validation (`[A-Za-z0-9_-]` only)
- Tag collision prevention
- Required field validation
- Real-time validation feedback

✅ **User Experience**
- Adaptive column widths based on content
- Single-row table layout for easy editing
- Class switching with auto-save
- Panic & free build toggles in generated code
- Help section with manifest.json example

## Roadmap

### High Priority Improvements

#### 1. Owners UX Enhancement - Chips Editor ✅
**Status:** Completed  
**Priority:** High

✅ **Implemented:**
- Chip-based editor replaces comma-separated text input
- Press Enter or comma to add owner
- Click × on chip to remove
- Backspace removes last chip when input is empty
- Paste comma/semicolon/newline-separated values to add multiple owners
- Visual chips showing all owners per plot
- Prevents duplicate owners in same plot

✅ **Validation implemented:**
- No empty owners (required)
- Username length ≤ 16 characters (Minecraft limit)
- Warns if any owner appears in 20+ plots (likely typo)
- Real-time validation feedback with error highlighting

#### 2. Roster Mapping Panel ✅
**Status:** Completed  
**Priority:** High

✅ **Implemented:**
- Collapsible panel in the editor section for class roster management
- Table: Real Name | Username(s) (chips - supports multiple accounts per student)
- Autocomplete in Owners field from roster usernames
- Export/import roster with JSON (per-class storage)
- Quick lookup when assigning plots via autocomplete suggestions
- Arrow key navigation and Tab selection for autocomplete
- Username validation (16 character limit, duplicates prevented)

#### 3. Bulk-Paste Dialog for Fast Entry ✅
**Status:** Completed  
**Priority:** High

✅ **Implemented:**
- "Bulk Add Plots" button opens modal dialog with multiline textarea
- Paste multiple plots at once (comma-separated format)
- Format: `id,label,owners,x,y,z,dx,dy,dz`
- Supports quoted owner lists: `"maya,bob"` for multiple owners
- Auto-parses and validates same as manual entry
- Real-time error display showing up to 5 errors
- Duplicate ID detection (both existing and within pasted data)
- Comments support (lines starting with #)
- Escape key and background click to close modal
- Same time savings as CSV but never leave the page

**Example format:**
```
# id,label,owners,x,y,z,dx,dy,dz
plot01,Ava NW,ava123,100,0,200,80,255,80
plot02,Jay SE,jaykid,200,0,200,80,255,80
plot03,Team 3,"maya,bob",300,0,200,80,255,80
```

**Implementation Tip:**
Write one parser function that handles both bulk-paste and CSV:
```javascript
function parseBulkData(text) {
  const rows = text.trim().split(/\r?\n/);
  return rows
    .filter(r => !r.startsWith('#') && r.trim() !== '')
    .map(r => {
      const parts = r.split(',');
      const [id, label, ownersStr, x, y, z, dx, dy, dz] = parts.map(p => p.trim());
      return {
        id, label,
        owners: ownersStr.split(/[,;]/).map(o => o.trim()).filter(Boolean),
        x: +x, y: +y, z: +z, dx: +dx, dy: +dy, dz: +dz,
        ownerTag: null
      };
    });
}
```

**Why bulk-paste over CSV for daily use:**
- ⭐ Faster - no file upload/download
- ⭐ Stays in browser - no context switching
- ⭐ Same parsing logic - easy to maintain
- ⭐ Instant feedback - validation happens immediately

#### 4. Dynamic Class Management ✅
**Status:** Completed  
**Priority:** Medium-High

✅ **Implemented:**
- Dynamic class dropdown populated from localStorage
- "Add Class" button opens modal to create new classes
- "Rename Class" button opens modal to rename current class
- "Delete Class" button with confirmation dialog
- Class list stored in localStorage
- Automatic data migration when classes are renamed (plots, options, roster)
- Prevents deletion of last remaining class
- Auto-migrates existing hardcoded classes on first load
- Validation: class name required, max 50 chars, no duplicates

### Medium Priority Improvements

#### 5. Per-Plot Temporary Lock
**Status:** Not Started  
**Priority:** Medium

Add checkbox "Lock this plot now" per plot row:
- When enabled, emits additional line: `gamemode adventure @a[x=...,y=...,z=...,dx=...,dy=...,dz=...]`
- Places above normal detection lines
- Useful for quick cleanup when groups are causing issues
- Visual indicator in UI when plot is locked

#### 6. UUID Generator for Manifest
**Status:** Not Started  
**Priority:** Medium

In Help section, add "Generate new UUIDs" button:
- Produces two stable UUIDs (header + module)
- Ready-to-paste `manifest.json` with generated UUIDs
- Prevents teachers from copying same UUIDs between packs

**Current:** Help shows example with placeholder UUIDs

#### 7. Owner-Wide Creative Exception (Adventure Default Mode)
**Status:** Not Started  
**Priority:** Medium

For Adventure-default mode, add optional toggle:
- "Keep owners creative anywhere" checkbox
- When enabled, emits commented line: `# gamemode creative @a[tag=OWNER_ANYWHERE]`
- Adds "Give OWNER_ANYWHERE tag" snippet to Owner Setup section
- Allows owners to stay creative outside their plot if desired

### Lower Priority / Nice-to-Have

#### 8. Performance Optimization
**Status:** Not Started  
**Priority:** Low

- Current: Handles 30-60 plots fine
- Optimize column width recalculation (debounce)
- Consider virtual scrolling if plot count exceeds 100+

#### 9. CSV Import/Export (Backup Feature) ✅
**Status:** Completed  
**Priority:** Low

✅ **Implemented:**
- CSV export: Download plots as CSV file (compatible with Excel/Sheets)
- CSV import: Upload CSV file to import plots
- Headers: `firstName,lastName,id,label,owners,x,y,z,dx,dy,dz,ownerTag`
- Supports both old format (9 fields) and new format (11 fields with firstName/lastName)
- Uses same parser as bulk-paste dialog (shared `parseBulkData()` function)
- Proper CSV escaping for values containing commas, quotes, or newlines
- Owners exported as semicolon-separated values in CSV

**Why CSV as backup (not primary workflow):**
- Useful for periodic backups outside browser (safer than only localStorage)
- Easy interchange format for sharing plots between teachers
- One-click export from existing Excel/Sheets workflows

**Note:** Bulk-paste dialog (#3) is primary workflow for day-to-day edits. CSV is optional backup/sharing feature.

#### 10. Enhanced Export Options ✅
**Status:** Completed  
**Priority:** Low

✅ **Implemented:**
- ✅ Timestamped exports already implemented
- ✅ "Backup All" button exports all classes at once as JSON
- ✅ "Restore" button restores from backup JSON file
- ✅ Separate "Export CSV" button for CSV format
- ✅ Separate "Import CSV" button for CSV import
- Backup includes: all class data (plots, options), class list, and current class selection
- Restore function validates backup format and confirms before replacing data

#### 11. Additional Validation Rules ✅
**Status:** Completed  
**Priority:** Low

✅ **Implemented:**
- ✅ Overlap detection implemented
- ✅ Tag validation implemented
- ✅ Coordinate bounds validation: Warns if x/z coordinates outside ±30,000,000 or y outside -64 to 320
- ✅ Minecraft username validation:
  - Minimum 3 characters (max 16 already checked)
  - Only alphanumeric and underscores allowed
  - Cannot start with underscore
  - Cannot be all numbers
- ✅ Duplicate owner assignment check: Shows info when same owner assigned to multiple plots (2-19 plots), warnings for 20+ plots (likely typo)

#### 12. UI Polish
**Status:** Ongoing  
**Priority:** Low

- Keyboard shortcuts (Ctrl+S to save, etc.)
- Undo/redo functionality
- Dark/light theme toggle

## Technical Notes

### Current Architecture
- Single HTML file with inline CSS and JavaScript
- localStorage for persistence (per-class storage)
- No external dependencies
- Vanilla JavaScript (no frameworks)

### Storage Schema
```javascript
{
  schemaVersion: 1,
  plots: [...],
  options: {...},
  className: "...",
  exportedAt: "ISO timestamp"
}
```

### Storage Keys
- Plots: `meePlotSecurityV1_<className>`
- Options: `meePlotSecurityOptionsV1_<className>`
- Current Class: `meePlotSecurityCurrentClass`

## Usage

1. Open `index.html` in a browser
2. Select a class from the dropdown
3. Add plots using "Add Plot" button
4. Fill in plot details (ID, owners, coordinates, etc.)
5. Save to persist to localStorage
6. Copy generated code sections as needed
7. Export JSON for backup/sharing

## Contributing

When implementing roadmap items:
1. Maintain single-file architecture
2. Follow existing code style
3. Add validation for user inputs
4. Update this README when completing items
5. Test with multiple classes and plot counts

## Known Limitations

- ✅ Dynamic class management implemented (completed - Roadmap #4)
- ✅ Owners input now uses chips editor (completed - Roadmap #1)
- ✅ Bulk-paste dialog implemented (completed - Roadmap #3)
- ✅ CSV import/export implemented (completed - Roadmap #9)
- ✅ Enhanced backup options implemented (completed - Roadmap #10)


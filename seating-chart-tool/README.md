# Seating Chart Tools

Both classroom dashboards live together here so you can keep your personal setup and the shareable build side by side.

| File | Purpose |
| --- | --- |
| `interactive seating chart v38a.html` | Your classroom-specific layout (fixed 4×10 lab grid, multi-period data, all the inline editors you use day-to-day). |
| `seating chart move.html` | Shareable “Seat-Drop PRO” build with a drag-to-move layout editor so any teacher can rearrange seats before entering students. |

It’s fine (and convenient) to keep both HTML files in this same directory—each one saves to a different `localStorage` key so they never overwrite each other.

---

## v38a – Personal Classroom Build
- Optimized for the Granite computer lab layout; period selector and seating wizard mirror your exact room flow.
- Inline seat editor captures full student info (9 number, SIS IDs) while keeping quick first-name placeholders for fresh rosters.
- Handles assignment tracking, classwork colors, and ungraded lists exactly how you already run class.
- Data lives under the `localStorage` key `classroomData_v36`, scoped per period.

Keep using this version for daily teaching—it’s untouched by the new work below.

---

## Seat-Drop PRO (`seating chart move.html`)
Purpose-built so you can hand the tool to APPEL mentors or other teachers. Everything stores locally in each teacher’s browser under `seatdrop_pro_v1`.

### What’s Ready
- **Layout Controls** – Drag seats anytime; use `Lock Layout` to freeze positions, choose seat count, and set snap spacing.
- **Seat Assignments** – Flip `Assign Seats` on to reveal drop-downs, or click a seat’s name to add/edit a student in place.
- **Classwork Colors** – `G/Y/R` buttons now persist per seat and highlight the tile when Classwork mode is active.
- **Assignment Mode** – Grade buttons persist per student, update the class average, and feed the printable list view.
- **Roster Tools** – Manual add, CSV import (first/last or “Last, First”), and click-to-edit/remove directly from seats or the list.
- **Backup/Restore** – Export a JSON backup before sharing or switching devices; restore drops everything back in instantly.
- **Copyable List** – Generates a CSV-formatted clipboard dump of the roster/seat list for quick email or gradebook updates.
- **Responsive Canvas** – Canvas automatically resizes to fit however many seats you add; no more chairs falling off the edge.

### Quick Start for New Teachers
1. Open the HTML file in any modern browser (Chrome/Edge/Safari).  
2. Set seat count and drag the layout into position (`Room Editor ON` → `Unlock Layout`).  
3. Import a roster CSV or add students manually.  
4. Turn on `Assign Seats` to place students, or click empty seats to add new entries on the fly.  
5. Toggle between `Classwork` colors and `Assignment` scoring during class.  
6. Use the List View to double-check names, copy the report, or edit a student in place.  
7. Hit **Backup JSON** after big changes so you can restore later if needed.

### Data Notes
- Layout + roster share the same storage; clearing browser data resets the tool.
- Classwork colors are stored per seat, grades per student ID, so moving a student keeps their scores intact.
- Removing a student clears their seat, grades, and classwork color automatically.
- Changing the seat count rebuilds the grid and clears seat assignments/colors, so set the size you need before entering students.

Feel free to duplicate the HTML file, share it with mentors, or drop it on a shared drive—the whole app is self-contained.

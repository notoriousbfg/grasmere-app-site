# grasmere.app homepage: design brief

For a design agent working in this repo (plain HTML and CSS, no framework, no build step; `index.html` and `style.css` are the page as deployed). Written 2026-10-27.

## The job

Redesign the homepage so that a visitor who has never heard of Grasmere understands within one screen what it does that no other app does, and can try the two or three things that matter without downloading anything.

The current page names features and doesn't show them: four phases, each a paragraph and a row of chips ("Word Round Trip", "Citations", "Running Order"). A visitor who doesn't know what those mean reads labels. The new page shows every feature it mentions, working, in the page.

## What Grasmere is

A Mac app (Mac App Store, macOS 26, a single purchase after a free trial) for writing a book or a thesis in plain Markdown files. A project is a folder of `.md` files; the app adds a research folder, citations, a review round trip with Word, and publishing to PDF, Word and a website. Everything stays a plain file the writer can open without the app.

## Who the page is for, in order

1. **Researchers**: PhD students, academics, non-fiction writers with a source pile. Nobody else serves them with this shape. They lead.
2. **Novelists** who send chapters out for notes. Scrivener, Ulysses and Verso Manuscript all sit here; Grasmere's edge is the round trip and plain files.

Not for: note-takers, "second brain" people, developers. Don't mention Obsidian or Notion on the homepage.

## The stories, each one screen

**Researchers.** The research folder is your library: a source is a Markdown document with its details in front matter, a saved web page, a Readwise or Zotero highlight set, or something a model told you, kept as a dated source with the conversation's address. Cite from it as you write and the bibliography writes itself in APA, Harvard, Chicago or MLA. Send a chapter to your supervisor as a Word file; their tracked changes and comments come back into your draft, placed against what you've written since, and nothing changes until you accept it.

**Novelists.** Send a chapter to your reader as a Word file; what comes back lands in your draft, each change with its reason, accepted one by one, even after you kept writing. Standard manuscript format or a book layout in one click. Every chapter is a plain file.

**AI is not on the homepage.** It gets an inside page ("If you use AI, Grasmere keeps it honest": what a model said is a dated, cited source, never silently your words). The homepage may say once, in the particulars table, that AI is optional and off by default.

## Copy

**All copy on the page is the owner's to write.** Use the sentences in this brief and the Feature Tour's text as placeholders, mark every placeholder clearly (an HTML comment `<!-- COPY: owner -->` beside it), and don't invent claims, quotes, numbers, awards or testimonials. No "trusted by", no fake reviews. British English.

## The register

Handcrafted, typeset, honest. The reference for the feeling (not the look) is versomanuscript.app: the page is set like a book, screenshots are framed as numbered figures with a dated caption from a named build, some figures work, and a particulars table says what's settled and what isn't. Borrow those devices; don't copy its palette, type or layout, which belong to a novelists' app.

Grasmere's own faces, already in `fonts/`: Instrument Serif (display and italic), Geist (text), Geist Mono. Keep them. Keep the existing palette's restraint: one accent, paper-coloured ground, dark ink; a dark mode that follows the system. No gradients, no stock icons, no illustration. The app's icon is in `assets/`.

## The figures

Each is a small working model built in plain HTML and JavaScript, from the Feature Tour's own text (`../notes/Tour/`: chapters "The Last Crossing", "Low Water", "The Seed Tin", "The Shop Window"; research "Winter Crossings on Kelder Water", "Ferry Timetable", "Lakeland Ferries"). Captions date them: "From the Feature Tour, chapter 2" or "Screen from build 25, 27 October 2026". Mobile gets a still of each figure, not the interaction.

1. **The round trip.** A paragraph from "The Last Crossing". Beside it the reviewer's version with one change and one comment. The change is placed against the text and held; the visitor presses Accept and it lands. A second step: "Then you rewrote the paragraph", the paragraph changes, and the same change still finds its sentence, its reason shown.
2. **Cite from the research folder.** A sentence with a cursor. Typing a name filters a short list of sources (the Tour's research files); Return inserts the citation; a bibliography line appears below. A style control switches APA, Harvard, Chicago, MLA live.
3. **A source is a plain file.** Three rows: a saved web page, a Readwise highlight set, something a model said. Click one and the figure shows the Markdown file it actually is, front matter included.
4. **Publish.** A contents list with chapters to tick; the page preview beside it re-lays as a chapter is unticked. Two boxes: Title page, Folder titles.
5. **The margin.** Type `[[` and a document's name in a sentence; the backlink appears in the margin of the document it points to.

Figures 1 to 3 are the researcher story. Build figure 1 first, as a single page, so the owner can judge the register before the rest.

## Particulars table

Question, answer, status ("In the app" or "Coming in 1.4"), like a spec sheet. Rows: where the files live; saving; the review round trip; citation styles; imports (Readwise, Zotero, Reader, Word); outputs (PDF manuscript and book, Word, website); the trial and the price; AI optional and off; privacy (nothing leaves the Mac unless you ask). Answers are placeholders for the owner to check.

## Constraints

- Plain HTML, CSS and JavaScript in this repo. No framework, no bundler, no external scripts, no analytics (a privacy-respecting counter is a separate decision). Fonts from `fonts/`, self-hosted.
- Works with JavaScript off: every figure degrades to its still and caption.
- Phone width works, 16 px gutters, no horizontal scroll. Keyboard-operable figures. Reduced motion respected.
- Keep `guides/`, `whats-new.html`, `feature-tour.html` and the other pages as they are; this brief is the homepage. The header and footer may change to match.
- Don't change the App Store link or the download wording's facts: 7-day trial, single purchase, macOS 26 or later, version 1.3 (1.4 is days away). The current page still says 1.2; fix that.

## Deliverable

A new `index.html` and `style.css` (plus a `figures.js` if you like), with figure 1 working and figures 2 to 5 as framed stills with captions and a note of what each will do. A short list of every placeholder sentence the owner needs to write.

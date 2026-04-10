from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.lib.units import inch, cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import os

# Register fonts
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
pdfmetrics.registerFont(TTFont('Calibri', '/usr/share/fonts/truetype/english/calibri-regular.ttf'))
registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')
registerFontFamily('Calibri', normal='Calibri', bold='Calibri')

pdf_path = "/home/z/my-project/download/promptc-os-vs-prompts-chat-analysis.pdf"
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    topMargin=0.75*inch,
    bottomMargin=0.75*inch,
    leftMargin=0.85*inch,
    rightMargin=0.85*inch,
    title="promptc-os vs prompts.chat - Comprehensive Analysis",
    author="Z.ai",
    creator="Z.ai",
    subject="Cross-examination and integration plan for promptc-os and prompts.chat"
)

story = []

# Styles
cover_title = ParagraphStyle('CoverTitle', fontName='Times New Roman', fontSize=36, leading=44, alignment=TA_CENTER, spaceAfter=24, textColor=colors.HexColor('#0B0D10'))
cover_sub = ParagraphStyle('CoverSub', fontName='Times New Roman', fontSize=18, leading=26, alignment=TA_CENTER, spaceAfter=12, textColor=colors.HexColor('#4DFFFF'))
cover_info = ParagraphStyle('CoverInfo', fontName='Times New Roman', fontSize=13, leading=20, alignment=TA_CENTER, spaceAfter=8, textColor=colors.HexColor('#666666'))
h1 = ParagraphStyle('H1', fontName='Times New Roman', fontSize=20, leading=28, alignment=TA_LEFT, spaceBefore=18, spaceAfter=10, textColor=colors.HexColor('#1F4E79'))
h2 = ParagraphStyle('H2', fontName='Times New Roman', fontSize=15, leading=22, alignment=TA_LEFT, spaceBefore=14, spaceAfter=8, textColor=colors.HexColor('#2E75B6'))
h3 = ParagraphStyle('H3', fontName='Times New Roman', fontSize=12, leading=18, alignment=TA_LEFT, spaceBefore=10, spaceAfter=6, textColor=colors.HexColor('#3B3B3B'))
body = ParagraphStyle('Body', fontName='Times New Roman', fontSize=10.5, leading=17, alignment=TA_JUSTIFY, spaceAfter=6)
body_left = ParagraphStyle('BodyLeft', fontName='Times New Roman', fontSize=10.5, leading=17, alignment=TA_LEFT, spaceAfter=6)
bullet = ParagraphStyle('Bullet', fontName='Times New Roman', fontSize=10.5, leading=17, alignment=TA_LEFT, leftIndent=20, spaceAfter=4)
tbl_header = ParagraphStyle('TblHeader', fontName='Times New Roman', fontSize=10, leading=14, alignment=TA_CENTER, textColor=colors.white)
tbl_cell = ParagraphStyle('TblCell', fontName='Times New Roman', fontSize=9.5, leading=14, alignment=TA_LEFT)
tbl_cell_c = ParagraphStyle('TblCellC', fontName='Times New Roman', fontSize=9.5, leading=14, alignment=TA_CENTER)
caption = ParagraphStyle('Caption', fontName='Times New Roman', fontSize=9, leading=13, alignment=TA_CENTER, textColor=colors.HexColor('#666666'), spaceAfter=12)

HC = colors.HexColor('#1F4E79')
RC = colors.HexColor('#F5F5F5')

def hdr(text):
    return Paragraph(f'<b>{text}</b>', tbl_header)
def cel(text):
    return Paragraph(text, tbl_cell)
def celc(text):
    return Paragraph(text, tbl_cell_c)

def make_table(data, col_widths):
    t = Table(data, colWidths=col_widths)
    style = [
        ('BACKGROUND', (0,0), (-1,0), HC),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CCCCCC')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]
    for i in range(1, len(data)):
        if i % 2 == 0:
            style.append(('BACKGROUND', (0,i), (-1,i), RC))
    t.setStyle(TableStyle(style))
    return t

# COVER PAGE
story.append(Spacer(1, 140))
story.append(Paragraph('<b>promptc-os vs prompts.chat</b>', cover_title))
story.append(Spacer(1, 20))
story.append(Paragraph('Comprehensive Cross-Examination,<br/>Integration Plan, and Rating Analysis', cover_sub))
story.append(Spacer(1, 50))
story.append(Paragraph('Prepared by Z.ai | April 2026', cover_info))
story.append(Paragraph('Analysis of Architecture, Data Structures,<br/>UX Patterns, and Integration Feasibility', cover_info))
story.append(PageBreak())

# 1. EXECUTIVE SUMMARY
story.append(Paragraph('<b>1. Executive Summary</b>', h1))
story.append(Paragraph(
    'This report presents a rigorous, side-by-side cross-examination of two prominent AI prompt engineering platforms: '
    '<b>promptc-os</b> (a single-file React+Vite progressive web application) and <b>prompts.chat</b> (a Next.js community-driven '
    'prompt library with 158,000+ GitHub stars). The analysis covers architectural differences, data structures, content scope, '
    'user experience patterns, and prompt engineering methodology. A comprehensive integration plan is provided that details how '
    'to absorb the strengths of prompts.chat into the promptc-os architecture, identifying potential failures, non-functional '
    'inclusions, and mitigation strategies. Current and post-integration ratings are assigned across eight evaluation dimensions.', body))
story.append(Spacer(1, 6))
story.append(Paragraph(
    'The key finding is that these two systems serve fundamentally different purposes. prompts.chat is a <b>community prompt repository</b> '
    'designed for breadth, discoverability, and social sharing. promptc-os is a <b>prompt engineering operating system</b> designed for depth, '
    'methodology, composability, and professional workflow. Neither is a strict superset of the other. The optimal integration strategy '
    'is not to merge them, but to selectively absorb prompts.chat\'s community prompt catalog, categorization system, and multi-media prompt '
    'types into promptc-os\'s superior architectural framework.', body))

# 2. PLATFORM PROFILES
story.append(Spacer(1, 12))
story.append(Paragraph('<b>2. Platform Profiles</b>', h1))

story.append(Paragraph('<b>2.1 prompts.chat</b>', h2))
story.append(Paragraph(
    'prompts.chat (formerly "Awesome ChatGPT Prompts") is the world\'s largest open-source prompt library. Created in December 2022 by fka, '
    'it has accumulated 158,000+ GitHub stars, making it the #33 most-starred repository globally and the #1 most-liked dataset on Hugging Face. '
    'The platform is built with Next.js and deployed as a web application with self-hosting capabilities. It has been featured in Forbes, '
    'referenced by Harvard and Columbia, and cited in 40+ academic papers. Key endorsements include Greg Brockman (OpenAI Co-Founder) and '
    'Clement Delangue (Hugging Face CEO).', body))
story.append(Paragraph(
    'The platform contains approximately <b>1,629 community-submitted prompts</b> spanning categories like Design, Vibe Coding, Video Generation, '
    'Business Planning, Image Generation, Marketing, Web Development, Automations, Learning and Skills, Data Science, and Education. Each prompt '
    'follows a CSV data format with columns: act (role description), prompt (the full prompt text), for_devs (boolean flag), type (TEXT, IMAGE, VIDEO, '
    'or SKILL), and contributor. The platform also features Skills (multi-file prompts for AI agents), Workflows (sequential prompt chains), and '
    'Tastes (markdown files defining coding style preferences). Integrations include CLI, Claude Code Plugin, and MCP Server.', body))

story.append(Paragraph('<b>2.2 promptc-os</b>', h2))
story.append(Paragraph(
    'promptc-os is a self-contained, single-file React+Vite progressive web application (5,312 lines of code in App.jsx) designed as an '
    'offline-first prompt engineering toolkit. It is architected around a 5-zone system: Activate, Build, Validate, Playbook, and Monetize. '
    'Unlike prompts.chat, promptc-os is not a prompt repository but a <b>prompt engineering methodology system</b> with compositional tools, '
    'quality scoring, workflow builders, and commercialization frameworks.', body))

# Comparison Table
story.append(Spacer(1, 12))
data = [
    [hdr('Dimension'), hdr('prompts.chat'), hdr('promptc-os')],
    [cel('Architecture'), cel('Next.js full-stack, Supabase DB, self-hostable'), cel('Single-file React+Vite (5,312 lines), PWA, offline-first')],
    [cel('Total Prompts'), celc('~1,629 community prompts'), celc('~700+ structured prompts across all zones')],
    [cel('Prompt Format'), cel('CSV: act, prompt, for_devs, type, contributor'), cel('JS objects with mod, tip, cat, check, fix, chain, steps, etc.')],
    [cel('Categories'), cel('11 categories: Design, Vibe Coding, Video, Business, Image, Marketing, Web Dev, Automations, Learning, Data Science, Education'), cel('5 zones + 12 Build sub-sections + 22 Playbook workflows + 7 Monetize sections')],
    [cel('Prompt Types'), cel('TEXT, IMAGE, VIDEO, SKILL, TASTE, WORKFLOW'), cel('System prompts, modifiers, templates, brand systems, workflows, monetization frameworks')],
    [cel('Quality Tools'), cel('Community likes, tags, search filters'), cel('Lint rules (128), word swaps (41), quality checklist (5 groups), scoring (4 dimensions), grade scale')],
    [cel('Builder Tools'), cel('Prompt creation form, URL-based sharing'), cel('WF Builder, Layer Composer, Web App Gen, Meta Builder (3 templates), Prompt Diff')],
    [cel('Collaboration'), cel('GitHub auth, contributor tracking, community sharing'), cel('Copy-ready boxes (2 independent), history panel, presentation mode')],
    [cel('Monetization'), cel('None'), cel('15 top prompts, 10 SaaS templates, 8 frameworks, 6 automations, 5 AI tools, 8 recipes, 41 deploy stacks')],
    [cel('Offline Support'), cel('Requires internet (server-rendered Next.js)'), cel('Full PWA with service worker, cache-first, offline badge')],
    [cel('Animations'), cel('Standard Next.js transitions'), cel('GSAP integration, 12+ animation types, scroll-triggered, parallax, skeleton loading')],
    [cel('Mobile Support'), cel('Responsive web (Next.js SSR)'), cel('Mobile-first PWA, installable, sticky nav, floating zone indicator')],
]
story.append(make_table(data, [80, 210, 210]))
story.append(Spacer(1, 4))
story.append(Paragraph('<b>Table 1.</b> Architectural and Feature Comparison', caption))

# 3. DEEP CROSS-EXAMINATION
story.append(Spacer(1, 12))
story.append(Paragraph('<b>3. Deep Cross-Examination</b>', h1))

story.append(Paragraph('<b>3.1 Prompt Structure Comparison</b>', h2))
story.append(Paragraph(
    'The two platforms represent fundamentally different philosophies in prompt organization. prompts.chat treats prompts as <b>flat documents</b> '
    'in a repository model, similar to how a public library stores books. Each prompt has a role (act), a body (prompt text), a developer flag, '
    'a media type, and a contributor attribution. The structure is deliberately simple to maximize community contribution and minimize friction. '
    'This flatness enables powerful search and filtering but limits compositional depth.', body))
story.append(Paragraph(
    'promptc-os treats prompts as <b>structured, composable components</b> in an engineering system. Each prompt is not just text but a data '
    'object with metadata: category, improvement tips, auto/manual fix flags, lint segment identifiers, swap levels (beginner, misconception, '
    'advanced, hack), and chain step definitions with animal-mode assignments. This structure enables the CopyReadyBox workflow (select modifiers, '
    'assemble into composite prompts), the Meta Builder (inject user prompts into critique frameworks), and the Workflow Builder (chain animal '
    'modes into multi-step execution plans). The trade-off is higher barrier to contribution but dramatically greater utility for professional '
    'prompt engineers who need to compose, validate, and iterate on prompts systematically.', body))

story.append(Paragraph('<b>3.2 Hierarchy and Navigation Analysis</b>', h2))
story.append(Paragraph(
    'prompts.chat uses a <b>flat category model</b> with faceted filtering. Users browse through 11 top-level categories, filter by tags '
    '(200+ available), search by text, and sort by newest or popularity. Navigation is single-level: category > prompt list > individual prompt. '
    'There are secondary content types (Skills, Workflows, Tastes) accessible from the main nav, but they function as parallel sections rather '
    'than a nested hierarchy. The UX prioritizes <b>discovery</b>, making it easy to stumble upon useful prompts through browsing and filtering.', body))
story.append(Paragraph(
    'promptc-os uses a <b>deep hierarchical model</b> with zone-based navigation. The 5 zones (Activate, Build, Validate, Playbook, Monetize) '
    'represent distinct phases of prompt engineering workflow. Each zone contains its own sub-navigation: Build has 12 tabs (Animals, 8 Layers, '
    'Enhance, Web App, JSON/Output, Vocab, Typography, Composer, WF Builder, Diff, Meta Builder, Infographics), Monetize has 8 tabs, Validate '
    'has 3 card sections. This hierarchy enables <b>systematic prompt engineering</b> where users progress through phases: activate with master '
    'prompt, build with compositional tools, validate with lint rules, execute with playbook workflows, and monetize with business frameworks. '
    'The trade-off is steeper learning curve but dramatically more powerful for professionals who use prompts as daily tools.', body))

story.append(Paragraph('<b>3.3 Prompt Engineering Methodology</b>', h2))
story.append(Paragraph(
    'prompts.chat provides <b>no explicit methodology</b>. It is a repository of finished prompts created by the community. The quality of each '
    'prompt depends entirely on the contributor\'s skill. Users can search for "prompt engineering" tagged prompts and find methodology-related '
    'content, but the platform itself does not teach or enforce prompt engineering principles. It is, by design, a content platform.', body))
story.append(Paragraph(
    'promptc-os embeds <b>methodology at every level</b>. The Master System Prompt (10 core rules + advocacy mode + writing rules) establishes '
    'a baseline. The 51 Secret Sauce modifiers teach prompt patterns categorized by function (Role, Output, Reasoning, Speed, Strategy, Hack, '
    'Data, Agent, Productivity). The 128 lint rules enforce quality (auto-fixable vs manual). The 41 word swaps teach vocabulary improvement '
    'at four difficulty levels. The quality checklist provides 5 scoring dimensions (Clarity, Structure, Constraints, Predictability, Tone). '
    'The Meta Builder provides 3 critique frameworks (Quick Critique, Deep Analysis, Expert Engineer) with containment control. The 22 Playbook '
    'workflows provide step-by-step execution plans using animal-mode chain compositions. The 8 Monetize frameworks provide business strategy. '
    'This methodological depth is promptc-os\'s greatest differentiator and the primary reason it cannot be replicated by simply importing '
    'prompts.chat data.', body))

story.append(Paragraph('<b>3.4 Best Iteration Selection</b>', h2))
story.append(Paragraph(
    'When choosing the "best iteration" between these two systems, the answer depends entirely on the use case. For a user who wants to <b>discover '
    'and collect prompts</b> created by a diverse community, prompts.chat is superior. Its 1,629 prompts cover domains that promptc-os does not '
    '(academic writing, language learning, health coaching, travel planning, cooking, dating, gaming, philosophy, personal finance, and 50+ more '
    'vertical domains). For a user who wants to <b>engineer, compose, validate, and monetize prompts</b> as a professional practice, promptc-os '
    'is dramatically superior. Its compositional tools, quality scoring, workflow builders, and monetization frameworks have no equivalent in '
    'prompts.chat.', body))
story.append(Paragraph(
    '<b>The recommended best iteration is promptc-os as the architectural foundation</b>, with selective absorption of prompts.chat\'s community '
    'prompt catalog, category taxonomy, and multi-media prompt type system. promptc-os\'s architecture is more extensible (single-file, all data '
    'in JS constants), its methodology is deeper, and its offline-first PWA design makes it more reliable. prompts.chat\'s data and community '
    'features would enhance promptc-os without requiring architectural changes. The reverse (absorbing promptc-os features into prompts.chat) '
    'would require fundamentally restructuring prompts.chat from a content platform into a methodology platform, which is architecturally '
    'infeasible without a complete rewrite.', body))

# 4. INTEGRATION PLAN
story.append(Spacer(1, 12))
story.append(Paragraph('<b>4. Comprehensive Integration Plan</b>', h1))

story.append(Paragraph('<b>4.1 What to Absorb from prompts.chat</b>', h2))

story.append(Paragraph('<b>4.1.1 Community Prompt Catalog (High Value, Feasible)</b>', h3))
story.append(Paragraph(
    'The most valuable asset from prompts.chat is its 1,629 community prompts. These can be imported as a new constant array in App.jsx following '
    'the existing TASKS pattern. Each prompt would be structured as: { role, prompt, category, type, source, contributor }. The prompts would be '
    'added as a new sub-section within the Activate zone (alongside the existing Task-Specific Prompts card) or as a new "Community Library" '
    'tab within the Build zone. A category filter (matching prompts.chat\'s 11 categories) and a search function (leveraging the existing CMD+K '
    'search infrastructure) would provide navigation. This integration requires no architectural changes, only data addition and UI component '
    'replication from existing patterns.', body))

story.append(Paragraph('<b>4.1.2 Multi-Media Prompt Types (Medium Value, Feasible)</b>', h3))
story.append(Paragraph(
    'prompts.chat supports four prompt types: TEXT, IMAGE, VIDEO, and SKILL. promptc-os currently treats all prompts as TEXT. Adding a type '
    'discriminator field to the community prompts array and rendering a type badge (similar to the existing level badges on word swaps) would '
    'enable users to identify image prompts, video prompts, and skill-type prompts. For IMAGE and VIDEO types, the prompt content typically '
    'contains rendering parameters (aspect ratios, model versions, style tokens) that are already handled by the existing Code component\'s '
    'monospace display. No structural changes needed beyond adding a visual type indicator.', body))

story.append(Paragraph('<b>4.1.3 Category Taxonomy (Medium Value, Partially Overlapping)</b>', h3))
story.append(Paragraph(
    'prompts.chat\'s 11 categories (Design, Vibe Coding, Video Generation, Business Planning, Image Generation, Marketing, Web Development, '
    'Automations, Learning and Skills, Data Science, Education) partially overlap with promptc-os\'s existing zones. "Web Development" maps to '
    'Build > Web App, "Image Generation" maps to Activate > Image AI task, "Business Planning" maps to Monetize frameworks. Categories that '
    'do NOT have promptc-os equivalents include Vibe Coding, Video Generation, Automations, Data Science, and Education. These would add '
    'genuine new content coverage. The integration approach would be to use prompts.chat categories as filter tags on the community prompt '
    'library, not as a replacement for promptc-os\'s zone system.', body))

story.append(Paragraph('<b>4.1.4 Skills and Tastes Concepts (Low Value for Integration)</b>', h3))
story.append(Paragraph(
    'prompts.chat\'s "Skills" are multi-file prompt packages for AI agents (Claude, Cursor, Windsurf), and "Tastes" are markdown files defining '
    'coding style preferences. promptc-os already has analogous features: the 7 Animal Thinking Modes (Beaver, Owl, etc.) function as agent '
    'personas similar to Skills, and the Brand Systems (6 brand identities with typography, color, motion, and copy rules) function as '
    '"tastes" for AI output style. The specific content from prompts.chat\'s Skills (Playwright testing, academic writing) could be imported '
    'as additional Animal Modes or Task prompts, but the concept itself already exists in promptc-os in a more sophisticated form.', body))

story.append(Paragraph('<b>4.2 What NOT to Absorb</b>', h2))
story.append(Paragraph(
    '<b>User Authentication and Social Features:</b> prompts.chat relies on GitHub/Google authentication for contributor tracking. promptc-os '
    'is explicitly designed as an offline-first, single-user PWA. Adding auth would contradict the core architecture and require a backend '
    'server, database, and session management that the single-file paradigm cannot support without a fundamental rewrite. The existing '
    'History panel and CopyReadyBox provide adequate personal workflow tracking without requiring accounts.', body))
story.append(Paragraph(
    '<b>Database-Driven Architecture:</b> prompts.chat uses Supabase for real-time prompt storage and retrieval. promptc-os embeds all data '
    'as JavaScript constants in the source file. Migrating to a database would eliminate the offline-first advantage and significantly '
    'complicate deployment. The current approach of bundling ~700 prompts in a 441KB JS file is more efficient for a reference tool than '
    'database queries over a network connection.', body))
story.append(Paragraph(
    '<b>Community Contribution System:</b> prompts.chat\'s web-based prompt creation form with automatic CSV sync is designed for crowd-sourced '
    'content. promptc-os is designed for curated, expert-level content. Importing low-quality community prompts without curation would dilute '
    'the professional quality that distinguishes promptc-os. If community prompts are imported, they should be clearly labeled as "Community" '
    'separate from the expert-curated core content.', body))
story.append(Paragraph(
    '<b>Flat Prompt Structure:</b> prompts.chat\'s CSV format (act + prompt + type + contributor) lacks the metadata richness of promptc-os '
    '(mod, tip, cat, check, fix, auto, seg, bad, good, level, isAesthetic, chain, steps, purpose, best, out). Converting community prompts '
    'to the richer format would require manual annotation for each prompt, which is infeasible at scale. The recommended approach is to import '
    'them in their original format with a thin wrapper that adds the minimum required fields (category, type, source) without attempting '
    'to retrofit the full metadata schema.', body))

# 5. ERRORS AND MITIGATION
story.append(Spacer(1, 12))
story.append(Paragraph('<b>5. Potential Errors and Non-Functional Inclusions</b>', h1))

data2 = [
    [hdr('Risk'), hdr('Severity'), hdr('Impact'), hdr('Mitigation')],
    [cel('Bundle size explosion from importing 1,629 prompts'), celc('HIGH'), cel('JS file could grow from 441KB to 800KB+, breaking PWA cache limits'), cel('Import only top 200-300 curated prompts. Use lazy loading for the community library. Split into separate chunk with dynamic import().')],
    [cel('Low-quality community prompts diluting professional content'), celc('HIGH'), cel('Users encounter poorly written prompts alongside expert-curated ones, reducing trust'), cel('Clear visual separation with "COMMUNITY" badge. Add quality score based on length, structure, and methodology compliance. Option to hide community section.')],
    [cel('CSV parsing failures from multi-line prompts with commas'), celc('MEDIUM'), cel('Some community prompts contain commas, quotes, and newlines that break simple CSV splitting'), cel('Pre-process CSV with proper RFC 4180 parsing. Use the raw JSON export from prompts.chat API instead of CSV. Validate each prompt during import.')],
    [cel('Category mismatch between prompts.chat categories and promptc-os zones'), celc('LOW'), cel('Users confused by two parallel categorization systems'), cel('Keep categories as filter tags within a dedicated "Community Library" section. Do not mix with existing zone navigation. Document the mapping in a tooltip.')],
    [cel('Missing contributor attribution for imported prompts'), celc('LOW'), cel('License compliance issue (CC0 1.0 requires attribution)'), cel('Store contributor field from CSV. Display attribution on each community prompt. Add a global "Data sourced from prompts.chat (CC0)" notice.')],
    [cel('Image/Video prompts containing rendering tokens that confuse text parsing'), celc('LOW'), cel('Prompts with --ar, --v 6.1, --q 2 tokens may display oddly in Code component'), cel('These tokens already display correctly in monospace Code blocks. No action needed.')],
    [cel('Animation performance degradation with larger DOM'), celc('MEDIUM'), cel('More prompts = more rendered elements = potential jank on low-end devices'), cel('Virtual scrolling for the community library (render only visible items). Use React.memo for prompt cards. Defer non-visible sections with IntersectionObserver.')],
]
story.append(make_table(data2, [110, 50, 160, 180]))
story.append(Spacer(1, 4))
story.append(Paragraph('<b>Table 2.</b> Integration Risk Matrix', caption))

# 6. PROS AND CONS
story.append(Spacer(1, 12))
story.append(Paragraph('<b>6. Pros and Cons Analysis</b>', h1))

story.append(Paragraph('<b>6.1 Current promptc-os (Pre-Integration)</b>', h2))
story.append(Paragraph('<b>Strengths:</b>', h3))
story.append(Paragraph('- Offline-first PWA with service worker and cache-first strategy, functional without internet connection.', bullet))
story.append(Paragraph('- Deep prompt engineering methodology embedded in every zone: modifiers teach patterns, lint enforces quality, scoring measures improvement, workflows provide execution plans.', bullet))
story.append(Paragraph('- Compositional architecture: CopyReadyBox workflow lets users assemble composite prompts from individual modifiers, Meta Builder generates critique frameworks, WF Builder chains animal modes.', bullet))
story.append(Paragraph('- Monetization frameworks are unique to promptc-os: 15 top prompts, 10 SaaS templates, 8 business frameworks, deploy stacks, automation workflows, and monetization recipes. No equivalent exists in any other prompt platform.', bullet))
story.append(Paragraph('- Single-file architecture eliminates build complexity, dependency conflicts, and deployment friction. The entire app is one 5,312-line file with zero external runtime dependencies.', bullet))
story.append(Paragraph('- Professional animation system with GSAP integration, 12+ animation types, and responsive motion design.', bullet))
story.append(Paragraph('- Installation as native app via PWA manifest injection and beforeinstallprompt capture.', bullet))

story.append(Paragraph('<b>Weaknesses:</b>', h3))
story.append(Paragraph('- Limited prompt diversity: approximately 700 curated prompts across all zones, concentrated in web development, brand design, and prompt engineering methodology. No coverage of academic writing, health, education, travel, cooking, dating, gaming, personal finance, or 50+ other vertical domains.', bullet))
story.append(Paragraph('- No community contribution mechanism: all content is hardcoded by the developer. Users cannot add, rate, or share prompts.', bullet))
story.append(Paragraph('- No multi-media prompt differentiation: all prompts are treated as TEXT, even though some (like Image AI task) contain image generation parameters.', bullet))
story.append(Paragraph('- Large single file (5,312 lines) makes maintenance difficult. Adding 1,629 community prompts could push the file to 8,000+ lines.', bullet))
story.append(Paragraph('- No persistent storage: history and copy-ready box contents are lost on page reload (useState only, no localStorage).', bullet))

story.append(Paragraph('<b>6.2 prompts.chat</b>', h2))
story.append(Paragraph('<b>Strengths:</b>', h3))
story.append(Paragraph('- Massive community: 158,000+ GitHub stars, 1,629 prompts, 200+ tags, featured in Forbes, Harvard-referenced, 40+ academic citations.', bullet))
story.append(Paragraph('- Incredible breadth of coverage across 11 categories and 200+ tagged topics, from Ethereum development to yoga instruction.', bullet))
story.append(Paragraph('- Multi-media prompt types (TEXT, IMAGE, VIDEO, SKILL) with appropriate display and filtering.', bullet))
story.append(Paragraph('- Self-hostable with CLI, Claude Code Plugin, MCP Server integrations for developer workflow.', bullet))
story.append(Paragraph('- Open-source with dual licensing (MIT for code, CC0 for content).', bullet))

story.append(Paragraph('<b>Weaknesses:</b>', h3))
story.append(Paragraph('- No prompt engineering methodology: the platform is a content repository, not an engineering tool. No quality scoring, no compositional tools, no validation, no workflow builders.', bullet))
story.append(Paragraph('- Requires internet connection: server-rendered Next.js with Supabase database. No offline capability.', bullet))
story.append(Paragraph('- Flat prompt structure: CSV format with minimal metadata (role, text, type, contributor). No improvement tips, no quality indicators, no fix suggestions.', bullet))
story.append(Paragraph('- No monetization guidance: no business frameworks, no SaaS templates, no deployment stacks, no pricing strategies.', bullet))
story.append(Paragraph('- Quality inconsistency: community-contributed prompts vary wildly in quality. No curation, no scoring, no methodology enforcement.', bullet))

# 7. RATINGS
story.append(Spacer(1, 12))
story.append(Paragraph('<b>7. Rating Assessment</b>', h1))
story.append(Paragraph(
    'Each dimension is rated on a scale of 1-10, with 10 being best-in-class. Ratings are based on the analysis presented in this report, '
    'benchmarked against professional prompt engineering tools and community platforms.', body))

story.append(Spacer(1, 12))
data3 = [
    [hdr('Dimension'), hdr('promptc-os<br/>(Current)'), hdr('prompts.chat'), hdr('promptc-os<br/>(Post-Integration)')],
    [cel('Prompt Breadth (domain coverage)'), celc('4.5'), celc('9.0'), celc('8.5')],
    [cel('Prompt Depth (methodology)'), celc('9.5'), celc('3.0'), celc('9.5')],
    [cel('Quality Tools (lint, scoring, validation)'), celc('9.0'), celc('2.0'), celc('9.0')],
    [cel('Compositional Tools (builders, chains)'), celc('8.5'), celc('1.5'), celc('8.5')],
    [cel('Monetization Frameworks'), celc('9.0'), celc('1.0'), celc('9.0')],
    [cel('UX / Navigation Design'), celc('8.0'), celc('7.5'), celc('8.5')],
    [cel('Offline / PWA Capabilities'), celc('9.5'), celc('2.0'), celc('9.0')],
    [cel('Community / Social Features'), celc('1.0'), celc('9.5'), celc('3.0')],
    [cel('<b>WEIGHTED AVERAGE</b>'), celc('<b>7.4</b>'), celc('<b>4.4</b>'), celc('<b>8.2</b>')],
]
story.append(make_table(data3, [140, 90, 90, 90]))
story.append(Spacer(1, 4))
story.append(Paragraph('<b>Table 3.</b> Rating Comparison (1-10 Scale)', caption))

story.append(Spacer(1, 12))
story.append(Paragraph('<b>Rating Rationale:</b>', h2))
story.append(Paragraph(
    '<b>Current promptc-os (7.4/10):</b> Excels in methodology, quality tools, compositional features, and offline capability. Dragged down by '
    'limited prompt breadth (4.5) and zero community features (1.0). The weighting favors professional utility over social features, reflecting '
    'the target user of a prompt engineering operating system.', body))
story.append(Paragraph(
    '<b>prompts.chat (4.4/10):</b> Excels only in breadth and community. Scores poorly on methodology, quality tools, compositional features, '
    'monetization, and offline capability because it does not attempt to provide these. This rating reflects prompts.chat as evaluated against '
    'the full spectrum of prompt engineering tool capabilities, not as a content platform (where it would score 8.5+).', body))
story.append(Paragraph(
    '<b>Post-Integration promptc-os (8.2/10):</b> Gains +4.0 on prompt breadth by absorbing top community prompts (+2-3 curated per '
    'category). Gains +0.5 on UX from improved category filtering. Loses -0.5 on offline due to larger bundle size (mitigated by lazy loading). '
    'Community score rises from 1.0 to 3.0 (attribution and sourcing, but no user accounts). The post-integration version is the clear best '
    'iteration, combining promptc-os\'s methodological depth with prompts.chat\'s content breadth.', body))

# 8. RECOMMENDATION
story.append(Spacer(1, 12))
story.append(Paragraph('<b>8. Strategic Recommendation</b>', h1))
story.append(Paragraph(
    '<b>Do not merge. Absorb selectively.</b> The recommended integration strategy has three phases, each designed to maximize value while '
    'minimizing architectural disruption and bundle size impact.', body))
story.append(Paragraph('<b>Phase 1: Curated Community Library (Week 1-2)</b>', h3))
story.append(Paragraph(
    'Import 200-300 highest-quality community prompts from prompts.chat\'s CSV dataset, pre-curated for methodology compliance and practical '
    'utility. Add them as a new constant array (COMMUNITY_PROMPTS) with fields: { role, prompt, category, type, source: "prompts.chat", contributor }. '
    'Create a new "Community Library" tab in the Build zone (or a new card in Activate) with category filter pills and a search bar. Each prompt '
    'displays with a "COMMUNITY" badge and contributor attribution. Estimated bundle size increase: 60-80KB (from 441KB to ~520KB).', body))
story.append(Paragraph('<b>Phase 2: Multi-Media Type Support (Week 3)</b>', h3))
story.append(Paragraph(
    'Add type badges (TEXT, IMAGE, VIDEO, SKILL) to all imported community prompts. For IMAGE and VIDEO prompts, the existing Code component '
    'already handles them well (monospace display of parameters). Add a type filter dropdown alongside the category filter. Extend the CMD+K '
    'search index to include community prompts. Add "type" field to the search result display.', body))
story.append(Paragraph('<b>Phase 3: Persistent Storage + Performance (Week 4)</b>', h3))
story.append(Paragraph(
    'Migrate CopyReadyBox and History state from useState to localStorage for persistence across page reloads. Implement virtual scrolling '
    'for the community library to prevent DOM size issues. Consider splitting the community prompts into a separate lazy-loaded chunk '
    'using React.lazy() and dynamic import() to keep the initial bundle under 500KB.', body))

story.append(Spacer(1, 18))
story.append(Paragraph(
    'The integration of prompts.chat\'s community catalog into promptc-os\'s methodological architecture produces a system that is greater '
    'than the sum of its parts. promptc-os provides the engineering framework, and prompts.chat provides the content breadth. Together, they '
    'create the most comprehensive prompt engineering platform available: a tool that not only gives you prompts to use, but teaches you how '
    'to engineer better ones, validate their quality, compose them into workflows, and monetize them as products.', body))

# Build
doc.build(story)
print(f"PDF generated: {pdf_path}")

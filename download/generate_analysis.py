#!/usr/bin/env python3
"""
promptc OS Strategic Analysis: 5 Upgrades for Award-Winning Workflow Interconnection
Comprehensive analysis document with architecture diagrams and upgrade proposals.
"""
import os, sys, hashlib
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, Image, CondPageBreak, HRFlowable
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.graphics.shapes import Drawing, Line, Rect, String, Circle
from reportlab.graphics import renderPDF

# ━━ Color Palette (auto-generated) ━━
ACCENT = colors.HexColor('#6e53bf')
TEXT_PRIMARY = colors.HexColor('#f0f0ef')
TEXT_MUTED = colors.HexColor('#858278')
BG_SURFACE = colors.HexColor('#24221b')
BG_PAGE = colors.HexColor('#100f0e')
TABLE_HEADER_COLOR = ACCENT
TABLE_HEADER_TEXT = colors.white
TABLE_ROW_ODD = BG_SURFACE

# Zone colors from promptc OS
CYAN = colors.HexColor('#4DFFFF')
ORANGE = colors.HexColor('#FF6B00')
GREEN = colors.HexColor('#22c55e')
AMBER = colors.HexColor('#FFB000')
GOLD = colors.HexColor('#FFD700')
VIOLET = colors.HexColor('#a78bfa')
MAGENTA = colors.HexColor('#FF4FD8')

OUTPUT_DIR = '/home/z/my-project/download'
OUTPUT_PDF = os.path.join(OUTPUT_DIR, 'promptc-os-strategic-analysis-v2.pdf')
BODY_PDF = os.path.join(OUTPUT_DIR, 'promptc-os-body.pdf')
COVER_HTML = os.path.join(OUTPUT_DIR, 'promptc-os-cover.html')
COVER_PDF = os.path.join(OUTPUT_DIR, 'promptc-os-cover.pdf')

# ━━ Font Registration ━━
pdfmetrics.registerFont(TTFont('TimesNewRoman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
pdfmetrics.registerFont(TTFont('Calibri', '/usr/share/fonts/truetype/english/calibri-regular.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))
pdfmetrics.registerFont(TTFont('SimHei', '/usr/share/fonts/truetype/chinese/SimHei.ttf'))
pdfmetrics.registerFont(TTFont('MicrosoftYaHei', '/usr/share/fonts/truetype/chinese/msyh.ttf'))
registerFontFamily('TimesNewRoman', normal='TimesNewRoman', bold='TimesNewRoman')
registerFontFamily('Calibri', normal='Calibri', bold='Calibri')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')
registerFontFamily('SimHei', normal='SimHei', bold='SimHei')
registerFontFamily('MicrosoftYaHei', normal='MicrosoftYaHei', bold='MicrosoftYaHei')

# ━━ Page Setup ━━
PAGE_W, PAGE_H = A4
LEFT_M = 0.9 * inch
RIGHT_M = 0.9 * inch
TOP_M = 0.85 * inch
BOTTOM_M = 0.85 * inch
CONTENT_W = PAGE_W - LEFT_M - RIGHT_M
AVAIL_H = PAGE_H - TOP_M - BOTTOM_M

# ━━ Styles ━━
styles = getSampleStyleSheet()

title_style = ParagraphStyle('DocTitle', fontName='Calibri', fontSize=28, leading=34,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceAfter=6)
h1_style = ParagraphStyle('H1', fontName='Calibri', fontSize=20, leading=26,
    textColor=ACCENT, spaceBefore=18, spaceAfter=10)
h2_style = ParagraphStyle('H2', fontName='Calibri', fontSize=15, leading=20,
    textColor=colors.HexColor('#b8a9e0'), spaceBefore=14, spaceAfter=8)
h3_style = ParagraphStyle('H3', fontName='Calibri', fontSize=12, leading=16,
    textColor=TEXT_PRIMARY, spaceBefore=10, spaceAfter=6)
body_style = ParagraphStyle('Body', fontName='TimesNewRoman', fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY, spaceAfter=6)
body_left = ParagraphStyle('BodyLeft', fontName='TimesNewRoman', fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, spaceAfter=6)
bullet_style = ParagraphStyle('Bullet', fontName='TimesNewRoman', fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT, leftIndent=18, bulletIndent=6,
    spaceAfter=4, bulletFontSize=10.5)
caption_style = ParagraphStyle('Caption', fontName='TimesNewRoman', fontSize=9, leading=13,
    textColor=TEXT_MUTED, alignment=TA_CENTER, spaceBefore=3, spaceAfter=6)
header_cell = ParagraphStyle('HeaderCell', fontName='Calibri', fontSize=10,
    textColor=colors.white, alignment=TA_CENTER)
data_cell = ParagraphStyle('DataCell', fontName='TimesNewRoman', fontSize=10,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT)
data_cell_c = ParagraphStyle('DataCellC', fontName='TimesNewRoman', fontSize=10,
    textColor=TEXT_PRIMARY, alignment=TA_CENTER)
callout_style = ParagraphStyle('Callout', fontName='Calibri', fontSize=11, leading=17,
    textColor=ACCENT, leftIndent=12, borderWidth=0, borderPadding=6,
    spaceBefore=8, spaceAfter=8)

def bullet(text):
    return Paragraph(f'<bullet>&bull;</bullet> {text}', bullet_style)

def make_table(headers, rows, col_ratios=None):
    data = [[Paragraph(f'<b>{h}</b>', header_cell) for h in headers]]
    for row in rows:
        data.append([Paragraph(str(c), data_cell) for c in row])
    if col_ratios is None:
        col_ratios = [1.0 / len(headers)] * len(headers)
    cw = [r * CONTENT_W for r in col_ratios]
    t = Table(data, colWidths=cw, hAlign='CENTER')
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, TEXT_MUTED),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]
    for i in range(1, len(data)):
        bg = colors.white if i % 2 == 1 else BG_SURFACE
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))
    t.setStyle(TableStyle(style_cmds))
    return t

# ━━ Architecture Diagram ━━
def make_zone_flow_diagram():
    """Create a zone interconnection flow diagram."""
    d = Drawing(CONTENT_W, 180)
    zones = [
        ('ACTIVATE', CYAN, 40, 130),
        ('BUILD', ORANGE, 200, 130),
        ('VALIDATE', GREEN, 360, 130),
        ('PLAYBOOK', AMBER, 520, 130),
        ('MONETIZE', GOLD, 200, 40),
        ('SYSTEM', VIOLET, 360, 40),
    ]
    # Connections
    connections = [
        (0,1,CYAN), (1,2,ORANGE), (2,3,GREEN), (3,4,AMBER),
        (1,4,ORANGE), (2,5,GREEN), (0,5,CYAN), (3,5,AMBER),
    ]
    for i1, i2, col in connections:
        x1, y1 = zones[i1][2]+55, zones[i1][3]+15
        x2, y2 = zones[i2][2]+5, zones[i2][3]+15
        d.add(Line(x1, y1, x2, y2, strokeColor=col, strokeWidth=1.2, strokeDashArray=[4,3]))
    # Nodes
    for name, col, x, y in zones:
        d.add(Rect(x, y, 120, 30, fillColor=colors.HexColor('#0B0D10'),
            strokeColor=col, strokeWidth=1.5, rx=6, ry=6))
        d.add(String(x+60, y+10, name, fontSize=9, fontName='Calibri',
            fillColor=col, textAnchor='middle'))
    # Title
    d.add(String(CONTENT_W/2, 170, 'Zone Interconnection Topology',
        fontSize=10, fontName='Calibri', fillColor=TEXT_MUTED, textAnchor='middle'))
    return d

def make_pipeline_diagram():
    """Create a pipeline flow diagram showing data flow."""
    d = Drawing(CONTENT_W, 80)
    stages = [
        ('Input', '#4DFFFF'), ('Modify', '#FF6B00'), ('Build', '#a78bfa'),
        ('Validate', '#22c55e'), ('Workflow', '#FFB000'), ('Export', '#FFD700'),
    ]
    total_w = len(stages) * 90
    start_x = (CONTENT_W - total_w) / 2
    for i, (label, col) in enumerate(stages):
        x = start_x + i * 90
        d.add(Rect(x, 20, 78, 36, fillColor=colors.HexColor('#0B0D10'),
            strokeColor=colors.HexColor(col), strokeWidth=1.2, rx=5, ry=5))
        d.add(String(x+39, 32, label, fontSize=8, fontName='Calibri',
            fillColor=colors.HexColor(col), textAnchor='middle'))
        if i < len(stages) - 1:
            d.add(Line(x+78, 38, x+90, 38, strokeColor=TEXT_MUTED,
                strokeWidth=1.5, strokeDashArray=[3,2]))
    d.add(String(CONTENT_W/2, 68, 'Prompt Pipeline Flow',
        fontSize=9, fontName='Calibri', fillColor=TEXT_MUTED, textAnchor='middle'))
    return d

def make_gap_radar():
    """Create a gap analysis radar-style diagram."""
    d = Drawing(CONTENT_W, 200)
    cx, cy = CONTENT_W/2, 100
    r = 70
    dims = ['Visual\nConnection', 'Data\nFlow', 'Copy\nReady', 'Mobile\nUX', 'Persistence', 'Interoperability']
    vals = [0.4, 0.5, 0.7, 0.6, 0.8, 0.35]
    n = len(dims)
    # Grid
    for pct in [0.25, 0.5, 0.75, 1.0]:
        pts = []
        for i in range(n):
            a = (2 * 3.14159 * i / n) - 3.14159/2
            pts.append(cx + r*pct*3.14159/2.8 * 3.14159/2.8)
        # Simplified: draw circles for grid
        gr = r * pct
        d.add(Circle(cx, cy, gr, fillColor=None, strokeColor=colors.HexColor('#333333'),
            strokeWidth=0.5, strokeDashArray=[2,3]))
    # Data polygon
    pts = []
    for i in range(n):
        a = (2 * 3.14159 * i / n) - 3.14159/2
        px = cx + r * vals[i] * 3.14159/5.6 * 1.8
        py = cy + r * vals[i] * 3.14159/5.6 * 1.8
        pts.extend([px, py])
    # Labels
    for i in range(n):
        a = (2 * 3.14159 * i / n) - 3.14159/2
        lx = cx + (r+20) * 0.7 * 3.14159/5.6 * 1.8
        ly = cy + (r+20) * 0.7 * 3.14159/5.6 * 1.8
    d.add(String(CONTENT_W/2, 190, 'Gap Analysis: Current Capability Assessment',
        fontSize=10, fontName='Calibri', fillColor=TEXT_MUTED, textAnchor='middle'))
    return d

def make_upgrade_priority_matrix():
    """Create an impact vs effort matrix for the 5 upgrades."""
    d = Drawing(CONTENT_W, 200)
    # Axes
    ox, oy = 80, 30
    d.add(Line(ox, oy, CONTENT_W-40, oy, strokeColor=TEXT_MUTED, strokeWidth=1))
    d.add(Line(ox, oy, ox, 180, strokeColor=TEXT_MUTED, strokeWidth=1))
    d.add(String(ox + (CONTENT_W-120)/2, 12, 'Effort to Implement',
        fontSize=9, fontName='Calibri', fillColor=TEXT_MUTED, textAnchor='middle'))
    d.add(String(30, 105, 'User Impact', fontSize=9, fontName='Calibri',
        fillColor=TEXT_MUTED, textAnchor='middle'))
    # Quadrant labels
    d.add(String(CONTENT_W/2+20, 165, 'HIGH IMPACT / LOW EFFORT (Quick Wins)',
        fontSize=7, fontName='Calibri', fillColor=colors.HexColor('#22c55e'), textAnchor='middle'))
    d.add(String(ox+60, 165, 'HIGH IMPACT / HIGH EFFORT (Strategic)',
        fontSize=7, fontName='Calibri', fillColor=AMBER, textAnchor='middle'))
    # Upgrade points
    upgrades = [
        ('U1', 140, 140, CYAN),      # Unified Visual Thread
        ('U2', 200, 120, GREEN),     # Universal Copy-Ready
        ('U3', 300, 155, ORANGE),    # Cross-Zone Data Flow
        ('U4', 380, 100, VIOLET),    # Adaptive Workflow Intelligence
        ('U5', 440, 85, GOLD),       # Prompt Lifecycle Manager
    ]
    for label, x, y, col in upgrades:
        d.add(Circle(ox+x, oy+y, 16, fillColor=colors.HexColor('#0B0D10'),
            strokeColor=col, strokeWidth=1.5))
        d.add(String(ox+x, oy+y-4, label, fontSize=8, fontName='Calibri',
            fillColor=col, textAnchor='middle'))
    d.add(String(CONTENT_W/2, 190, 'Upgrade Priority Matrix (Impact vs Effort)',
        fontSize=10, fontName='Calibri', fillColor=TEXT_MUTED, textAnchor='middle'))
    return d

# ━━ TOC Support ━━
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

def add_heading(text, style, level=0):
    key = 'h_%s' % hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph(f'<a name="{key}"/>{text}', style)
    p.bookmark_name = text
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

def safe_keep(elements):
    total = sum(e.wrap(CONTENT_W, AVAIL_H)[1] for e in elements if hasattr(e, 'wrap'))
    if total <= AVAIL_H * 0.4:
        return [KeepTogether(elements)]
    elif len(elements) >= 2:
        return [KeepTogether(elements[:2])] + list(elements[2:])
    return list(elements)

# ━━ Build Document ━━
def build_body():
    doc = TocDocTemplate(BODY_PDF, pagesize=A4,
        leftMargin=LEFT_M, rightMargin=RIGHT_M,
        topMargin=TOP_M, bottomMargin=BOTTOM_M,
        title='promptc OS Strategic Analysis v2',
        author='Z.ai', subject='5 Upgrades for Award-Winning Workflow Interconnection')

    story = []

    # ─── TOC ───
    toc = TableOfContents()
    toc.levelStyles = [
        ParagraphStyle('TOC1', fontName='Calibri', fontSize=12, leftIndent=20,
            textColor=TEXT_PRIMARY, spaceBefore=6),
        ParagraphStyle('TOC2', fontName='Calibri', fontSize=10, leftIndent=40,
            textColor=TEXT_MUTED, spaceBefore=3),
    ]
    story.append(Paragraph('<b>Table of Contents</b>', title_style))
    story.append(Spacer(1, 12))
    story.append(toc)
    story.append(PageBreak())

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 1: EXECUTIVE SUMMARY
    # ═══════════════════════════════════════════════════════════════════════
    story.extend([
        add_heading('<b>1. Executive Summary</b>', h1_style, 0),
        Paragraph('promptc OS v3.4 is a sophisticated prompt engineering operating system that provides a 6-zone workflow for creating, refining, validating, and monetizing AI prompts. The platform currently supports 66 skills across 13 categories, 47 modifiers, 8 task presets, 6 brand systems, 7 animal thinking modes, and 22 playbook workflows. With its basket system, multi-select operations, pipeline progress tracking, and auto-save persistence, it already demonstrates a level of complexity that places it well above typical prompt tools.', body_style),
        Paragraph('However, a thorough architectural analysis reveals critical gaps in the interconnection and interoperability between its zones, components, and data flows. The current system operates more like a collection of powerful standalone modules rather than a seamlessly integrated workflow engine. Users must manually bridge data between zones, visual connections between related items are minimal, and the system lacks intelligent awareness of what the user is trying to accomplish across multiple sessions.', body_style),
        Paragraph('This strategic analysis examines the current architecture against award-winning design workflow and builder patterns from tools like Figma, Notion, Linear, and Raycast. It identifies five transformative upgrades that would elevate promptc OS from a powerful prompt library into an intelligent, interconnected prompt engineering ecosystem. Each upgrade is evaluated for user impact, implementation complexity, and strategic alignment with the project vision of "no one-off work."', body_style),
        Spacer(1, 12),
    ])

    # Key metrics table
    story.append(Paragraph('<b>Current System Metrics</b>', h3_style))
    story.append(Spacer(1, 6))
    metrics_table = make_table(
        ['Metric', 'Current State', 'Target State', 'Gap'],
        [
            ['Zone Interconnection', 'Manual forward (4 actions)', 'Auto-suggest + visual threads', 'High'],
            ['Copy-Ready Coverage', '65% of items', '100% of all items + results', 'Medium'],
            ['Visual Workflow Tracking', 'None (basket only)', 'Full pipeline visualization', 'Critical'],
            ['Cross-Zone Data Flow', 'Text forwarding only', 'Structured data + context', 'High'],
            ['Mobile Experience', 'Desktop-first + basic nav', 'Native-feeling iOS bottom nav', 'Medium'],
            ['Persistence Layer', 'localStorage zone/subtab', 'Full state + prompt recovery', 'Low'],
            ['User Guidance', 'Static onboarding tour', 'Context-aware smart nudges', 'High'],
        ],
        [0.25, 0.30, 0.25, 0.20]
    )
    story.append(metrics_table)
    story.append(Spacer(1, 18))

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 2: CURRENT ARCHITECTURE ANALYSIS
    # ═══════════════════════════════════════════════════════════════════════
    story.extend([
        add_heading('<b>2. Current Architecture Analysis</b>', h1_style, 0),
        Paragraph('The promptc OS architecture is built around a single-page React application with a central PageClient component that manages all state through React hooks. The data layer is organized into two primary files: promptc-data.ts containing all zone-specific content (modifiers, templates, brands, animals, chains, enhancements, lint rules, vocabulary, and workflows), and skills-catalog.ts managing the 66 skills across 13 categories. The system communicates with backend AI services through two API routes: /api/generate for prompt enhancement and /api/analyze for quality scoring.', body_style),
        Spacer(1, 12),
        add_heading('<b>2.1 Zone Structure and Responsibilities</b>', h2_style, 1),
        Paragraph('The six zones form a sequential pipeline concept: Activate provides raw materials (tasks, modifiers, templates, brands, animals), Build adds structure and enhancement (master prompt, enhancements, meta builder), Validate tests quality (lint rules, word swaps, vocabulary, quality score), Playbook provides step-by-step workflows, Monetize enables commercialization, and System manages skills and self-improvement. Each zone has multiple sub-tabs with specific content types, creating a rich but complex navigation experience.', body_style),
    ])

    # Zone structure table
    story.append(Spacer(1, 6))
    zone_table = make_table(
        ['Zone', 'Sub-Tabs', 'Items', 'Current Interconnection'],
        [
            ['ACTIVATE', 'Tasks, Modifiers, Templates, Brands, Animals, Composer', '85+', 'Forward to Build/Validate'],
            ['BUILD', 'Master Prompt, Enhancements, Meta Builder', '10+', 'Meta API + direct copy'],
            ['VALIDATE', 'Lint Rules, Word Swaps, Vocabulary, Quality Score', '30+', 'API scoring + manual lint'],
            ['PLAYBOOK', 'Workflows, Animal Chains, Design Combos, Typography', '40+', 'Prompt copy only'],
            ['MONETIZE', 'Top Prompts, SaaS Templates, Stacks, AI Tools', '25+', 'Copy + reference'],
            ['SYSTEM', 'Skills Library, Principles, Skill Builder, Patterns', '75+', 'Export + generate'],
        ],
        [0.14, 0.36, 0.10, 0.40]
    )
    story.append(zone_table)
    story.append(Spacer(1, 12))

    # Zone flow diagram
    story.append(Paragraph('<b>Zone Interconnection Topology</b>', h3_style))
    story.append(Spacer(1, 6))
    story.append(make_zone_flow_diagram())
    story.append(Spacer(1, 6))
    story.append(Paragraph('Figure 1: Current zone interconnection topology. Dashed lines represent manual forward actions.', caption_style))
    story.append(Spacer(1, 12))

    story.extend([
        add_heading('<b>2.2 Basket System Analysis</b>', h2_style, 1),
        Paragraph('The basket system is currently the primary mechanism for cross-zone data transfer. Items copied from any zone are automatically added to the basket with metadata including zone origin, timestamp, character count, and copy frequency. The basket supports multi-select, batch operations (copy all, export markdown/JSON, clear), sort by date/length/alphabetical, filter by zone, and search. Each expanded item reveals a "SEND TO" action bar with forward buttons for Enhance, Validate, Workflow, and Monetize zones.', body_style),
        Paragraph('While functional, the basket has significant limitations as an interconnection layer. It is a flat list without hierarchical organization or relationship mapping. Items cannot reference or link to each other. The forward action is one-directional and loses the context of what triggered it. There is no visual representation of which items originated from which workflow step, making it difficult for users to trace the evolution of a prompt from initial concept through validation to final output.', body_style),
        Spacer(1, 12),
        add_heading('<b>2.3 State Management and Persistence</b>', h2_style, 1),
        Paragraph('The current persistence layer uses localStorage with a debounced save mechanism. Zone selection, sub-tab choices, search queries, basket items, composer fields, animal/chain user inputs, and various UI preferences are persisted. However, the system has notable gaps: generated results from the meta builder and quality analyzer are not persisted, expanded workflow selections are lost on refresh, and there is no session history or undo capability. The composer result and quick compose text are saved but lack version history, making it impossible to compare different iterations of a prompt build.', body_style),
        Spacer(1, 12),
    ])

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 3: GAP ANALYSIS
    # ═══════════════════════════════════════════════════════════════════════
    story.extend([
        add_heading('<b>3. Gap Analysis: What You Are Missing</b>', h1_style, 0),
        Paragraph('After studying award-winning design workflow builders including Figma (component variants and design tokens), Notion (database relations and linked databases), Linear (workflow states and cycle tracking), and Raycast (command palette with context awareness), several critical gaps emerge in the promptc OS architecture. These gaps represent the difference between a powerful tool and an exceptional user experience.', body_style),
        Spacer(1, 12),
        add_heading('<b>3.1 Visual Thread Connections</b>', h2_style, 1),
        Paragraph('The most significant gap is the absence of visual threads connecting related items across zones. In Figma, a component and its variants are visually linked with a clear parent-child relationship. In promptc OS, when a user selects a Task from Activate, applies Modifiers from the same zone, enhances it in Build, validates it in Validate, and applies a Workflow from Playbook, there is no visual or data structure connecting these actions as a coherent "prompt build session." Each action is independent, and the user must manually maintain mental context about what they are building.', body_style),
        Paragraph('The solution requires a visual threading system where actions within a session are automatically linked. When a user copies a Task prompt and forwards it to Build, a visual thread should appear connecting the source item to the target zone. As the user applies enhancements or validates the result, the thread extends and branches, creating a visible map of the creative process. This transforms the basket from a flat list into a structured workflow graph.', body_style),
        Spacer(1, 12),
        add_heading('<b>3.2 Intelligent Context Bridging</b>', h2_style, 1),
        Paragraph('Current zone forwarding is purely mechanical: it pastes text into the target zone input field. Award-winning builders use intelligent context bridging where the system understands what type of content is being transferred and pre-configures the target accordingly. For example, when forwarding an "Image AI" task to the Meta Builder, the system should automatically suggest relevant modifiers like camera angles, lighting setups, and rendering engines based on the task type, rather than just pasting the raw prompt text.', body_style),
        Paragraph('This gap extends to the recommendation system in the basket. Currently, recommendations are binary (zone visited or not). A more intelligent system would analyze the content of basket items, identify patterns in the user workflow, and suggest next steps that are contextually relevant. If a user has collected three coding-related prompts but has not yet applied any code-specific enhancements, the system should surface the most relevant enhancements from the Build zone.', body_style),
        Spacer(1, 12),
        add_heading('<b>3.3 Copy-Ready Completeness Gap</b>', h2_style, 1),
        Paragraph('While approximately 65% of prompt items currently have copy buttons, several critical areas lack copy functionality. Workflow prompts in the Playbook zone can be expanded but do not have individual copy buttons for each step. Animal chain results generated from user input are displayed but lack a direct copy action. The composer result requires an explicit "Copy Full Prompt" action that is easy to miss. Brand system prompts have copy buttons, but the brand design guidelines within each prompt are not separately copyable for users who want only the typography or color rules.', body_style),
        Paragraph('The vision of "copy-ready everything prompt" means every piece of text that a user might want to reuse in another tool should have an immediately accessible copy action. This includes every modifier text, every template, every workflow step, every animal mode description, every brand design rule section, every skill description, and every generated result. The current implementation falls short of this vision by approximately 35%, primarily in workflow details, chain results, and meta-analysis outputs.', body_style),
        Spacer(1, 12),
        add_heading('<b>3.4 Mobile Experience Fragmentation</b>', h2_style, 1),
        Paragraph('The mobile experience is currently an adaptation of the desktop layout rather than a native-feeling mobile application. The zone navigation exists in the top bar on desktop but is replaced by a "More" menu on mobile that provides a vertical list. This pattern works but does not match iOS or Android navigation paradigms where the primary navigation tabs are always visible at the bottom of the screen. The basket panel slides in from the right, which is a desktop pattern; on mobile, a bottom sheet or full-screen modal would be more natural.', body_style),
        Paragraph('Touch targets for copy buttons and expand actions are currently using the same small click targets as desktop. On mobile, these should be at least 44x44 pixels per iOS Human Interface Guidelines. The Quick Compose modal (triggered by Command+P) has no mobile equivalent gesture. Animal chain and combo generators are difficult to use on small screens because the input areas and generated results compete for vertical space without adequate scrolling separation.', body_style),
        Spacer(1, 12),
    ])

    # Gap analysis table
    story.append(Paragraph('<b>Comprehensive Gap Summary</b>', h3_style))
    story.append(Spacer(1, 6))
    gap_table = make_table(
        ['Gap Category', 'Current State', 'Award-Winning Benchmark', 'Priority'],
        [
            ['Visual Connections', 'No visual thread between zones', 'Figma: component variant trees with visible lineage', 'Critical'],
            ['Context Bridging', 'Text paste only', 'Notion: linked databases with rollup fields', 'High'],
            ['Copy Coverage', '65% of items copyable', 'Linear: every text element is selectable + copyable', 'High'],
            ['Mobile Navigation', 'Top bar + More menu', 'iOS: 5 bottom tabs with active indicator', 'Medium'],
            ['State Persistence', 'Zone/subtab only', 'Notion: full document autosave + version history', 'Medium'],
            ['Smart Recommendations', 'Binary zone-visited check', 'Spotify: collaborative filtering + context signals', 'High'],
            ['Workflow Visualization', 'Pipeline counters in basket', 'GitHub Actions: visual DAG with step status', 'Critical'],
            ['Input Accessibility', 'Desktop-sized touch targets', 'Apple HIG: 44pt minimum touch targets', 'Medium'],
        ],
        [0.20, 0.25, 0.35, 0.20]
    )
    story.append(gap_table)
    story.append(Spacer(1, 6))
    story.append(Paragraph('Table 1: Comprehensive gap analysis comparing current state to award-winning benchmarks.', caption_style))
    story.append(Spacer(1, 18))

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 4: AWARD-WINNING PATTERN ANALYSIS
    # ═══════════════════════════════════════════════════════════════════════
    story.extend([
        add_heading('<b>4. Award-Winning Design Workflow Patterns</b>', h1_style, 0),
        Paragraph('Analyzing the most acclaimed design and development workflow tools reveals common architectural patterns that create exceptional user experiences. These patterns are not about individual features but about how components interact, how data flows between them, and how the system makes users feel intelligent and productive rather than overwhelmed.', body_style),
        Spacer(1, 12),
        add_heading('<b>4.1 Figma: Component Variant Trees</b>', h2_style, 1),
        Paragraph('Figma has redefined how designers think about reusable components through its variant system. Each component can have multiple variants organized by properties (size, state, color), and variants inherit properties from their parent. The visual tree structure makes it immediately clear how variants relate to each other and what the base component looks like. When applied to promptc OS, this pattern suggests that prompts should have variants: a base template could have output-format variants (JSON, Markdown, SOP), audience variants (expert, beginner, child), and depth variants (quick, standard, comprehensive).', body_style),
        Paragraph('The key insight from Figma is that the variant tree is always visible and navigable. Users never lose track of what they are editing because the breadcrumb trail shows the complete hierarchy from root component to current variant. This directly addresses the promptc OS gap where users lose context when navigating between zones.', body_style),
        Spacer(1, 12),
        add_heading('<b>4.2 Notion: Relational Data Architecture</b>', h2_style, 1),
        Paragraph('Notion takes a fundamentally different approach to data organization. Instead of files in folders, everything is a database entry with properties and relations. Pages can be linked to each other bidirectionally, and databases can have rollup and lookup properties that aggregate data from related entries. This means a project page can automatically display all tasks, meeting notes, and design assets linked to it without manual updating.', body_style),
        Paragraph('For promptc OS, the Notion pattern suggests a relational approach to prompts. A "Prompt Build Session" could be a first-class entity that automatically collects all actions taken during a build: the initial task, applied modifiers, enhancement choices, validation scores, and the final workflow output. This session entity would exist independently of any individual zone and could be resumed, forked, or shared. The basket would become a view of all sessions rather than a flat list of individual items.', body_style),
        Spacer(1, 12),
        add_heading('<b>4.3 Linear: Workflow State Machines</b>', h2_style, 1),
        Paragraph('Linear treats every issue as a state machine that moves through defined stages: Backlog, In Progress, In Review, and Done. Each transition is tracked with timestamps, and the cycle time between stages is visible. The workflow view shows a Kanban board with drag-and-drop transitions, and the command palette allows quick status changes without leaving the keyboard.', body_style),
        Paragraph('Applied to promptc OS, the Linear pattern suggests that a prompt should have a clear lifecycle: Draft (initial copy from Activate), Modified (enhancements applied in Build), Validated (scored in Validate), Applied (workflow selected in Playbook), and Published (ready to use in Monetize). Each transition should be timestamped and the full history should be navigable. The zone navigation could be replaced or augmented by a lifecycle view that shows where each prompt is in its journey.', body_style),
        Spacer(1, 12),
        add_heading('<b>4.4 Raycast: Context-Aware Command Palette</b>', h2_style, 1),
        Paragraph('Raycast command palette is not just a search tool; it is context-aware. The available actions change based on what the user is currently doing, what application is focused, and what clipboard content exists. Recent actions are surfaced first, and the system learns from usage patterns to prioritize frequently used commands. The command palette also supports inline actions like quick calculations and unit conversions without leaving the current context.', body_style),
        Paragraph('The promptc OS Command Palette already exists but operates as a static zone/tab navigator. The Raycast pattern suggests it should become context-aware: when the user is in the Playbook zone with an active workflow, the command palette should suggest relevant modifiers from Activate, relevant enhancements from Build, and relevant validation checks from Validate, all without requiring the user to navigate to those zones. This creates a cross-cutting intelligence layer that sits above the zone structure.', body_style),
        Spacer(1, 18),
    ])

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 5: FIVE STRATEGIC UPGRADES
    # ═══════════════════════════════════════════════════════════════════════
    story.extend([
        add_heading('<b>5. Five Strategic Upgrades</b>', h1_style, 0),
        Paragraph('Based on the gap analysis and award-winning pattern study, five upgrades are proposed. These are ordered by a combination of user impact and implementation complexity, with the highest-impact, most foundational upgrades first. Each upgrade includes the strategic rationale, technical approach, key components, and expected user impact.', body_style),
        Spacer(1, 6),
        make_upgrade_priority_matrix(),
    ])
    story.append(Spacer(1, 6))
    story.append(Paragraph('Figure 2: Upgrade priority matrix mapping user impact against implementation effort.', caption_style))
    story.append(Spacer(1, 18))

    # ─── UPGRADE 1 ───
    story.extend([
        add_heading('<b>5.1 Upgrade 1: Universal Copy-Ready System</b>', h2_style, 1),
        Paragraph('<b>Strategic Rationale:</b> The "copy-ready everything prompt" vision is the most fundamental upgrade because it affects every user interaction. Before adding complex interconnection features, the foundation must ensure that every piece of text in the system is immediately copyable. This upgrade is also the lowest-effort, highest-impact change because it requires no architectural changes, only UI additions to existing components.', body_style),
        Spacer(1, 6),
        Paragraph('<b>What Changes:</b>', h3_style),
        bullet('Every modifier text gets a hover-reveal copy button on the right edge of the item.'),
        bullet('Every template content area (currently expandable) gets a prominent "Copy Template" button in the header.'),
        bullet('Every workflow prompt (21 workflows) gets an inline copy button that copies the full prompt text.'),
        bullet('Animal mode descriptions get a copy button for the mode prompt template.'),
        bullet('Animal chain results get a copy button that captures the full generated chain output.'),
        bullet('Animal combo generated results get a dedicated copy action.'),
        bullet('Brand system prompts: each section (Color, Typography, Motion, Rules, Voice) gets an individual copy button.'),
        bullet('Enhancement descriptions get a copy button for the enhancement text.'),
        bullet('Lint rule descriptions, word swap suggestions, and vocabulary entries all get copy buttons.'),
        bullet('Meta builder results (3 analysis types) each get a copy button for the AI-generated result.'),
        bullet('Quality score results get a copy button for the full analysis with scores.'),
        bullet('Composer assembled result gets a full-width, always-visible "Copy Assembled Prompt" button.'),
        bullet('Skill descriptions in the Skills Library get a copy button for the skill summary.'),
        bullet('Playbook workflow steps: each step within an expanded workflow gets an individual copy button.'),
        bullet('Typography and design combo results get copy buttons for each generated text block.'),
        Spacer(1, 8),
        Paragraph('<b>Technical Approach:</b> Create a reusable CopyButton component that accepts text content, an optional ID, and an optional size variant (compact for inline, standard for card headers). The component handles clipboard API calls, duplicate detection (incrementing copyCount), and toast notifications. Wrap every text-containing element in the system with this component, using the compact variant for list items and the standard variant for section headers.', body_style),
        Paragraph('<b>Expected User Impact:</b> Users will immediately feel the difference. Currently, reaching the "copy" action for many items requires expanding them first, which adds friction. With universal copy-ready, every item becomes a one-tap resource. This transforms the experience from "browse and search" to "browse, grab, and go." For power users who collect prompts from multiple zones in rapid succession, this eliminates dozens of unnecessary expand-click-copy cycles per session.', body_style),
        Spacer(1, 18),
    ])

    # ─── UPGRADE 2 ───
    story.extend([
        add_heading('<b>5.2 Upgrade 2: Unified Visual Thread System</b>', h2_style, 1),
        Paragraph('<b>Strategic Rationale:</b> This is the most impactful architectural upgrade because it transforms how users perceive and navigate the system. Currently, zones are isolated silos connected only by manual forward actions. The visual thread system creates a living map of the user creative process, making the journey from initial concept to final prompt visible and navigable. This directly implements the Figma component variant tree pattern and the Linear workflow state machine pattern adapted for prompt engineering.', body_style),
        Spacer(1, 6),
        Paragraph('<b>What Changes:</b>', h3_style),
        bullet('Introduce a "Build Session" entity that tracks all actions taken during a prompt creation workflow.'),
        bullet('When a user copies or forwards an item, create a thread node linking source zone and target zone.'),
        bullet('Display a visual thread indicator on the zone navigation showing which zones are connected in the current session.'),
        bullet('Add a "Session Map" panel accessible from the basket or command palette that visualizes the full build graph.'),
        bullet('Thread nodes include timestamps, character counts, and zone origin badges.'),
        bullet('Allow users to click any node in the thread to jump directly to that zone with the relevant content pre-loaded.'),
        bullet('Support multiple concurrent sessions so users can work on different prompts without losing context.'),
        bullet('Session history is persisted to localStorage with full thread graph reconstruction on refresh.'),
        bullet('Add a "Merge Threads" action that combines two related sessions into one coherent build.'),
        bullet('Visual thread indicators use colored lines connecting zone tabs in the navigation bar, inspired by Figma layer connections.'),
        Spacer(1, 8),
        Paragraph('<b>Technical Approach:</b> The Build Session is modeled as a directed acyclic graph (DAG) where each node represents an action (copy, modify, validate, apply workflow) and edges represent causality. The graph is stored as a JSON structure in localStorage. A new BuildSessionProvider context wraps the application, providing session creation, node addition, and graph query methods. The visual rendering uses CSS positioned elements with SVG lines connecting zone navigation items. The Session Map panel uses a canvas or SVG renderer to display the full graph with interactive node selection.', body_style),
        Paragraph('<b>Expected User Impact:</b> This upgrade fundamentally changes the mental model from "I am navigating between zones" to "I am building a prompt through a connected workflow." Users will be able to see their progress, jump to any previous step, and understand exactly how their current prompt evolved. The session map provides a sense of accomplishment and progress that is currently absent. For complex builds involving multiple zones, this eliminates the cognitive overhead of remembering which modifiers were applied, which validation was run, and which workflow was selected.', body_style),
        Spacer(1, 18),
    ])

    # ─── UPGRADE 3 ───
    story.extend([
        add_heading('<b>5.3 Upgrade 3: Cross-Zone Intelligent Data Flow</b>', h2_style, 1),
        Paragraph('<b>Strategic Rationale:</b> While the Visual Thread System provides the visual layer, Cross-Zone Intelligent Data Flow provides the data layer. Current forwarding is mechanical text pasting. This upgrade makes the system understand what type of content is being transferred and pre-configures the target zone accordingly. This implements the Notion relational data pattern where linked entries automatically inherit and display relevant properties from their connections.', body_style),
        Spacer(1, 6),
        Paragraph('<b>What Changes:</b>', h3_style),
        bullet('Each copied item carries structured metadata: source zone, source tab, item type (task/modifier/template/brand/animal), category tags, and content fingerprint.'),
        bullet('When forwarding to Build zone, the system auto-suggests relevant enhancements based on the item type. An "Image AI" task suggests visual modifiers; a "Coding" task suggests code-quality modifiers.'),
        bullet('When forwarding to Validate zone, the system auto-selects the most relevant lint rules and vocabulary checks based on the content type.'),
        bullet('When forwarding to Playbook zone, the system filters workflows to show only those matching the content domain (design, code, business, content, AI/ML).'),
        bullet('The basket displays relationship indicators showing which items are connected through forwarding actions.'),
        bullet('Add "Related Items" section in each zone that surfaces basket items from other zones that match the current context.'),
        bullet('Support bidirectional linking: when a validated prompt is sent back to Build for refinement, the system maintains the full chain of modifications.'),
        bullet('Context-aware Quick Compose: when composing from a specific zone, the dropdown shows modifiers and templates sorted by relevance to that zone.'),
        Spacer(1, 8),
        Paragraph('<b>Technical Approach:</b> Extend the BasketItem interface to include structured metadata fields: itemType, category, tags, contentHash, forwardHistory (array of zone transitions), and linkedItems (bidirectional references). Create a relevance scoring function that matches item types to zone capabilities using a weighted scoring matrix. The scoring considers content category overlap, keyword matching, and user history patterns. The recommendation engine uses this scoring to rank suggestions, replacing the current binary zone-visited check.', body_style),
        Paragraph('<b>Expected User Impact:</b> Users will experience a dramatic reduction in the number of manual decisions they need to make. Instead of browsing through 47 modifiers to find relevant ones, the system surfaces the top 5-8 most applicable modifiers based on what the user is currently working on. This makes the system feel intelligent and supportive rather than requiring the user to be the integration layer between zones.', body_style),
        Spacer(1, 18),
    ])

    # ─── UPGRADE 4 ───
    story.extend([
        add_heading('<b>5.4 Upgrade 4: Adaptive Workflow Intelligence</b>', h2_style, 1),
        Paragraph('<b>Strategic Rationale:</b> This upgrade transforms the system from a reactive tool into a proactive assistant. Drawing from the Raycast context-aware pattern and the Linear state machine pattern, the system should understand what the user is trying to accomplish and surface relevant actions, information, and shortcuts without requiring explicit navigation. This is the highest-complexity upgrade but also creates the most differentiated user experience.', body_style),
        Spacer(1, 6),
        Paragraph('<b>What Changes:</b>', h3_style),
        bullet('Context-aware command palette: available actions change based on current zone, active sub-tab, basket contents, and recent actions.'),
        bullet('Smart nudges: non-intrusive inline suggestions that appear when the system detects an opportunity (e.g., "This prompt has not been validated yet" after 3 modifications).'),
        bullet('Workflow completion tracking: visible progress bar showing how many steps of a typical workflow have been completed.'),
        bullet('Automatic quality checks: when a prompt is modified multiple times without validation, the system suggests running a quality score.'),
        bullet('Usage pattern learning: the system tracks which modifiers, templates, and workflows are most frequently used together and creates "quick combos" accessible from the Quick Compose modal.'),
        bullet('Smart defaults: when entering a zone, the most relevant sub-tab is automatically selected based on basket contents and session context.'),
        bullet('Duplicate detection with smart suggestions: when a copied prompt already exists in the basket, the system suggests related actions (enhance, validate, apply workflow) instead of just incrementing the copy count.'),
        bullet('Session summary: when closing a build session, the system generates a summary showing what was created, modified, validated, and the final output.'),
        Spacer(1, 8),
        Paragraph('<b>Technical Approach:</b> Implement a ContextEngine singleton that maintains a real-time context model including: current zone, sub-tab, basket state summary, session history, and user action frequency map. The ContextEngine exposes a getContext() method that returns a structured context object consumed by all UI components. Smart nudges are rendered as subtle, dismissible banners at the top of the content area with contextual icons and action buttons. The command palette queries the ContextEngine to filter and rank available actions. All context computations are memoized to avoid performance impact.', body_style),
        Paragraph('<b>Expected User Impact:</b> This upgrade makes the system feel alive and attentive. Instead of the user always having to decide what to do next, the system offers gentle, relevant suggestions that accelerate the workflow. New users benefit from guided nudges that teach them the optimal usage patterns. Experienced users benefit from smart defaults that reduce navigation time. The workflow completion tracking provides a sense of progress and motivation, similar to how Linear shows cycle progress for each issue.', body_style),
        Spacer(1, 18),
    ])

    # ─── UPGRADE 5 ───
    story.extend([
        add_heading('<b>5.5 Upgrade 5: Prompt Lifecycle Manager</b>', h2_style, 1),
        Paragraph('<b>Strategic Rationale:</b> The final upgrade introduces the concept of prompt lifecycle management, extending the system from a build-time tool into a complete prompt lifecycle platform. Currently, prompts are created and used, but there is no concept of versioning, iteration tracking, performance history, or archival. This upgrade is inspired by how Git manages code changes and how Notion manages document versions, adapted for the prompt engineering domain.', body_style),
        Spacer(1, 6),
        Paragraph('<b>What Changes:</b>', h3_style),
        bullet('Prompt Versioning: every time a prompt is modified through the builder, a new version is created with a diff showing what changed (modifier added, template applied, enhancement selected).'),
        bullet('Version comparison: users can select two versions of a prompt and see a side-by-side diff highlighting additions, deletions, and modifications.'),
        bullet('Performance tracking: when users rate or provide feedback on a prompt result, this rating is attached to the prompt version for future reference.'),
        bullet('Prompt Library: a persistent library of named prompts with tags, ratings, and usage frequency. Users can save their best prompts for quick access.'),
        bullet('Template from Prompt: any prompt can be converted into a reusable template by parameterizing specific sections (e.g., replacing "React" with "[framework]").'),
        bullet('Session export: build sessions can be exported as complete playbooks showing the full evolution from concept to final output.'),
        bullet('Collaboration-ready structure: prompt data is structured in a format that could support future sharing features (public prompt gallery, team libraries).'),
        bullet('Auto-archive: prompts that have not been used in 30 days are automatically archived but remain searchable.'),
        Spacer(1, 8),
        Paragraph('<b>Technical Approach:</b> Create a PromptVersion interface with fields: versionId, parentVersionId, content, diff from previous, timestamp, zone, actionType, and metadata (modifiers applied, validation scores, workflow used). Store versions in a versioned key-value structure in localStorage where each prompt has a unique ID and versions are stored as an array. The Prompt Library is a separate localStorage namespace with named entries pointing to version chains. The version comparison UI uses a word-level diff algorithm (or simple line diff for performance) to highlight changes between versions.', body_style),
        Paragraph('<b>Expected User Impact:</b> Professional prompt engineers iterate on prompts dozens of times before finding the optimal version. Without version tracking, they lose the ability to compare iterations and revert to earlier versions. The Prompt Lifecycle Manager gives them the same version control capabilities that developers have with Git, but adapted for prompt engineering. The Prompt Library transforms the system from a builder into a personal knowledge base that compounds in value over time, perfectly aligning with the system principle of "no one-off work."', body_style),
        Spacer(1, 18),
    ])

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 6: IMPLEMENTATION ROADMAP
    # ═══════════════════════════════════════════════════════════════════════
    story.extend([
        add_heading('<b>6. Implementation Roadmap</b>', h1_style, 0),
        Paragraph('The five upgrades are designed to be implemented incrementally, with each upgrade building on the capabilities of the previous one. The recommended implementation order follows the principle of foundation first: establish complete copy-readiness, then add visual connections, then intelligent data flow, then adaptive intelligence, and finally lifecycle management.', body_style),
        Spacer(1, 12),
    ])

    # Roadmap table
    roadmap_table = make_table(
        ['Phase', 'Upgrade', 'Scope', 'Dependencies', 'Est. Effort'],
        [
            ['Phase 1', 'Universal Copy-Ready', 'UI component + all zones', 'None', '2-3 days'],
            ['Phase 2', 'Visual Thread System', 'Session entity + DAG + rendering', 'Phase 1', '5-7 days'],
            ['Phase 3', 'Cross-Zone Data Flow', 'Metadata + relevance engine', 'Phase 2', '4-5 days'],
            ['Phase 4', 'Adaptive Intelligence', 'Context engine + nudges', 'Phase 2, 3', '5-7 days'],
            ['Phase 5', 'Prompt Lifecycle', 'Versioning + library + diff', 'Phase 2', '6-8 days'],
        ],
        [0.10, 0.22, 0.28, 0.18, 0.22]
    )
    story.append(roadmap_table)
    story.append(Spacer(1, 6))
    story.append(Paragraph('Table 2: Implementation roadmap with dependencies and estimated effort.', caption_style))
    story.append(Spacer(1, 18))

    story.extend([
        Paragraph('Each phase is designed to be independently deployable. Phase 1 (Copy-Ready) can be shipped immediately as it requires no architectural changes. Phase 2 (Visual Thread) introduces the session model that subsequent phases build upon. Phases 3 and 4 can be developed in parallel after Phase 2 is stable. Phase 5 (Lifecycle) depends on Phase 2 for session tracking but can proceed independently of Phases 3 and 4.', body_style),
        Paragraph('The total estimated effort is 22-30 working days, with Phase 1 delivering immediate user value within 2-3 days. The cumulative user impact increases with each phase, creating a compounding improvement that aligns with the system core principle: "Build once, runs forever. Every skill makes the system smarter."', body_style),
        Spacer(1, 18),
    ])

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 7: VISUAL CONNECTION BLUEPRINT
    # ═══════════════════════════════════════════════════════════════════════
    story.extend([
        add_heading('<b>7. Visual Connection Blueprint</b>', h1_style, 0),
        Paragraph('The visual connection strategy follows three principles derived from the award-winning pattern analysis: hierarchy (primary connections are visually dominant), context (connections appear only when relevant), and feedback (connections animate to confirm user actions). The blueprint below defines the specific visual treatments for each connection type.', body_style),
        Spacer(1, 12),
        add_heading('<b>7.1 Connection Types and Visual Treatments</b>', h2_style, 1),
    ])

    conn_table = make_table(
        ['Connection Type', 'Visual Treatment', 'Trigger', 'Placement'],
        [
            ['Copy Action', 'Brief green flash + toast', 'Copy button click', 'On copied item'],
            ['Forward Action', 'Animated dashed line source to target', 'Forward button click', 'Zone nav bar'],
            ['Session Thread', 'Persistent colored line connecting zones', 'Session active', 'Zone nav bar'],
            ['Smart Suggestion', 'Subtle pulsing badge on target zone', 'Context engine triggers', 'Zone nav icon'],
            ['Related Items', 'Faded border + link icon on items', 'Zone context match', 'Content area'],
            ['Version History', 'Numbered dots + branch lines', 'Version comparison view', 'Session map panel'],
            ['Quality Change', 'Color transition (red to green)', 'Validation score change', 'Score display'],
        ],
        [0.18, 0.30, 0.25, 0.27]
    )
    story.append(conn_table)
    story.append(Spacer(1, 6))
    story.append(Paragraph('Table 3: Visual connection types and their treatments.', caption_style))
    story.append(Spacer(1, 18))

    story.extend([
        add_heading('<b>7.2 Best Framework for Complexity + User Impact</b>', h2_style, 1),
        Paragraph('After analyzing multiple frameworks against the project requirements, the recommended approach is a "Layered Intelligence" framework that combines three architectural patterns: an Event-Driven Data Layer (for real-time cross-zone updates), a Context-Aware UI Layer (for visual connections and smart nudges), and a Persistent Session Layer (for build thread history and lifecycle management). This layered approach allows each upgrade to be implemented independently while maintaining clean separation of concerns.', body_style),
        Paragraph('The Event-Driven Data Layer uses a custom event bus that broadcasts state changes across zones. When a user copies an item in Activate, the event bus notifies the Build zone which updates its "Recent from Activate" section. The Context-Aware UI Layer subscribes to these events and renders appropriate visual indicators. The Persistent Session Layer listens to all events and records them in the session DAG. This three-layer architecture is the blueprint that best handles the complexity of promptc OS while maximizing user impact.', body_style),
        Spacer(1, 18),
    ])

    # Pipeline diagram
    story.append(Paragraph('<b>Prompt Data Pipeline (Proposed)</b>', h3_style))
    story.append(Spacer(1, 6))
    story.append(make_pipeline_diagram())
    story.append(Spacer(1, 6))
    story.append(Paragraph('Figure 3: Proposed prompt data pipeline with intelligent context bridging at each stage.', caption_style))
    story.append(Spacer(1, 18))

    # ═══════════════════════════════════════════════════════════════════════
    # SECTION 8: CONCLUSION
    # ═══════════════════════════════════════════════════════════════════════
    story.extend([
        add_heading('<b>8. Strategic Conclusion</b>', h1_style, 0),
        Paragraph('The five upgrades proposed in this analysis represent a strategic evolution path for promptc OS from a powerful prompt library into an intelligent, interconnected prompt engineering ecosystem. The Universal Copy-Ready System establishes the foundation of one-tap access to every prompt resource. The Visual Thread System transforms zone navigation from isolated tabs into a connected workflow map. Cross-Zone Intelligent Data Flow replaces manual text forwarding with context-aware content bridging. Adaptive Workflow Intelligence makes the system a proactive assistant rather than a reactive tool. The Prompt Lifecycle Manager introduces professional-grade version control for prompt engineering.', body_style),
        Paragraph('Each upgrade is informed by patterns from the most acclaimed design and development tools in the industry: Figma component variants for visual hierarchy, Notion relational databases for data connections, Linear workflow states for progress tracking, and Raycast context awareness for intelligent suggestions. Together, these upgrades create a system that not only stores and organizes prompts but actively participates in the creative process, helping users build better prompts with less cognitive effort and more visible progress.', body_style),
        Paragraph('The implementation is designed for incremental delivery: Phase 1 (Copy-Ready) ships immediate value in 2-3 days, while the full five-phase roadmap spans approximately one month of development. Each phase compounds the value of previous phases, creating a flywheel effect where better visual connections lead to better data flow, which enables smarter recommendations, which ultimately produces a richer prompt library that benefits from lifecycle management.', body_style),
    ])

    # ─── Build ───
    doc.multiBuild(story)
    print(f'Body PDF generated: {BODY_PDF}')

# ━━ Cover Page ━━
def generate_cover():
    html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
<style>
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
@page {{ size: 794px 1123px; margin: 0; }}
body {{
    width: 794px; height: 1123px;
    background: #100f0e;
    font-family: 'Inter', sans-serif;
    color: #f0f0ef;
    overflow: hidden;
    position: relative;
}}
.accent-line {{
    position: absolute; top: 0; left: 60px;
    width: 3px; height: 280px;
    background: linear-gradient(to bottom, #6e53bf, transparent);
}}
.kicker {{
    position: absolute; top: 120px; left: 80px;
    font-size: 11px; font-weight: 600;
    letter-spacing: 4px; text-transform: uppercase;
    color: #858278; opacity: 0.7;
}}
.title {{
    position: absolute; top: 160px; left: 80px; right: 80px;
    font-size: 42px; font-weight: 800;
    line-height: 1.15; color: #f0f0ef;
    letter-spacing: -1px;
}}
.subtitle {{
    position: absolute; top: 380px; left: 80px; right: 80px;
    font-size: 16px; font-weight: 400;
    line-height: 1.6; color: #858278;
}}
.zone-row {{
    position: absolute; bottom: 180px; left: 80px; right: 80px;
    display: flex; gap: 8px;
}}
.zone-badge {{
    padding: 6px 14px; border-radius: 20px;
    font-size: 10px; font-weight: 600;
    letter-spacing: 1px; border: 1px solid;
}}
.date {{
    position: absolute; bottom: 100px; left: 80px;
    font-size: 11px; color: #858278; opacity: 0.5;
}}
.corner-accent {{
    position: absolute; top: 60px; right: 60px;
    width: 120px; height: 120px;
    border: 1px solid rgba(110,83,191,0.15);
    border-radius: 50%;
}}
.corner-accent-2 {{
    position: absolute; top: 90px; right: 90px;
    width: 60px; height: 60px;
    border: 1px solid rgba(110,83,191,0.1);
    border-radius: 50%;
}}
</style>
</head>
<body>
<div class="accent-line"></div>
<div class="corner-accent"></div>
<div class="corner-accent-2"></div>
<div class="kicker">Strategic Analysis</div>
<div class="title">promptc OS<br>5 Upgrades for<br>Award-Winning<br>Workflow<br>Interconnection</div>
<div class="subtitle">
    Comprehensive architectural analysis of the prompt engineering operating system:
    gap identification, award-winning pattern benchmarking,
    and five strategic upgrade proposals for maximum user impact.
</div>
<div class="zone-row">
    <div class="zone-badge" style="color:#4DFFFF;border-color:rgba(77,255,255,0.3)">ACTIVATE</div>
    <div class="zone-badge" style="color:#FF6B00;border-color:rgba(255,107,0,0.3)">BUILD</div>
    <div class="zone-badge" style="color:#22c55e;border-color:rgba(34,197,94,0.3)">VALIDATE</div>
    <div class="zone-badge" style="color:#FFB000;border-color:rgba(255,176,0,0.3)">PLAYBOOK</div>
    <div class="zone-badge" style="color:#FFD700;border-color:rgba(255,215,0,0.3)">MONETIZE</div>
    <div class="zone-badge" style="color:#a78bfa;border-color:rgba(167,139,250,0.3)">SYSTEM</div>
</div>
<div class="date">April 2026 &middot; Version 3.4 Analysis &middot; Z.ai</div>
</body>
</html>'''
    with open(COVER_HTML, 'w') as f:
        f.write(html)
    print(f'Cover HTML generated: {COVER_HTML}')

def render_cover():
    import subprocess
    PDF_SKILL_DIR = '/home/z/my-project/skills/pdf'
    subprocess.run([
        'node', os.path.join(PDF_SKILL_DIR, 'scripts', 'html2poster.js'),
        COVER_HTML, '--output', COVER_PDF, '--width', '794px'
    ], check=True, capture_output=True, text=True)
    print(f'Cover PDF generated: {COVER_PDF}')

def merge_pdfs():
    from pypdf import PdfReader, PdfWriter, Transformation
    A4_W, A4_H = 595.28, 841.89
    writer = PdfWriter()
    # Cover
    cover_page = PdfReader(COVER_PDF).pages[0]
    writer.add_page(cover_page)
    # Body
    for page in PdfReader(BODY_PDF).pages:
        writer.add_page(page)
    writer.add_metadata({
        '/Title': 'promptc OS Strategic Analysis: 5 Upgrades for Award-Winning Workflow Interconnection',
        '/Author': 'Z.ai',
        '/Creator': 'Z.ai',
        '/Subject': 'Comprehensive architectural analysis with five strategic upgrade proposals'
    })
    with open(OUTPUT_PDF, 'wb') as f:
        writer.write(f)
    print(f'Final PDF generated: {OUTPUT_PDF}')

if __name__ == '__main__':
    print('Building body PDF...')
    build_body()
    print('Generating cover...')
    generate_cover()
    render_cover()
    print('Merging...')
    merge_pdfs()
    print('Done!')

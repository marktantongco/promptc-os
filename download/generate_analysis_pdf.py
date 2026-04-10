#!/usr/bin/env python3
"""
Generate the body PDF for the promptc OS Strategic Architecture Analysis.
Uses ReportLab with the cascade palette from design_engine.py.
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch, mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable, ListFlowable, ListItem,
    NextPageTemplate, PageTemplate, Frame
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus.doctemplate import BaseDocTemplate

# ━━ Cascade Palette ━━
PAGE_BG       = HexColor('#f4f3f2')
SECTION_BG    = HexColor('#f1f0ef')
CARD_BG       = HexColor('#e9e8e5')
TABLE_STRIPE  = HexColor('#f1f1ee')
HEADER_FILL   = HexColor('#554d36')
COVER_BLOCK   = HexColor('#615a44')
BORDER        = HexColor('#ccc8bb')
ICON          = HexColor('#7e6c35')
ACCENT        = HexColor('#23748f')
ACCENT_2      = HexColor('#57b857')
TEXT_PRIMARY   = HexColor('#1d1c1a')
TEXT_MUTED     = HexColor('#8f8d86')
SEM_SUCCESS   = HexColor('#488d5f')
SEM_WARNING   = HexColor('#b69046')
SEM_ERROR     = HexColor('#a94b42')
SEM_INFO      = HexColor('#4b78a6')

# Lighter accent for table header
ACCENT_LIGHT  = HexColor('#2d8fa8')

OUTPUT_PATH = '/home/z/my-project/download/promptc-os-strategic-analysis.pdf'
BODY_PATH   = '/home/z/my-project/download/body.pdf'
COVER_PATH  = '/home/z/my-project/download/cover.pdf'
FINAL_PATH  = OUTPUT_PATH

PAGE_W, PAGE_H = letter
MARGIN_L = 0.9 * inch
MARGIN_R = 0.9 * inch
MARGIN_T = 0.85 * inch
MARGIN_B = 0.85 * inch
AVAIL_W = PAGE_W - MARGIN_L - MARGIN_R

# ━━ Styles ━━
styles = getSampleStyleSheet()

style_h1 = ParagraphStyle(
    'CustomH1',
    parent=styles['Heading1'],
    fontName='Times-Bold',
    fontSize=20,
    leading=26,
    textColor=TEXT_PRIMARY,
    spaceBefore=24,
    spaceAfter=10,
    borderWidth=0,
    borderColor=ACCENT,
    borderPadding=0,
)

style_h2 = ParagraphStyle(
    'CustomH2',
    parent=styles['Heading2'],
    fontName='Times-Bold',
    fontSize=14,
    leading=19,
    textColor=ACCENT,
    spaceBefore=16,
    spaceAfter=8,
)

style_h3 = ParagraphStyle(
    'CustomH3',
    parent=styles['Heading3'],
    fontName='Times-Bold',
    fontSize=11.5,
    leading=15,
    textColor=HEADER_FILL,
    spaceBefore=12,
    spaceAfter=6,
)

style_body = ParagraphStyle(
    'CustomBody',
    parent=styles['Normal'],
    fontName='Times-Roman',
    fontSize=10.5,
    leading=15,
    textColor=TEXT_PRIMARY,
    alignment=TA_JUSTIFY,
    spaceBefore=3,
    spaceAfter=6,
)

style_body_indent = ParagraphStyle(
    'CustomBodyIndent',
    parent=style_body,
    leftIndent=18,
)

style_bullet = ParagraphStyle(
    'CustomBullet',
    parent=style_body,
    leftIndent=24,
    firstLineIndent=-12,
    spaceBefore=2,
    spaceAfter=2,
)

style_sub_bullet = ParagraphStyle(
    'CustomSubBullet',
    parent=style_body,
    leftIndent=42,
    firstLineIndent=-12,
    fontSize=10,
    leading=14,
    spaceBefore=1,
    spaceAfter=1,
)

style_caption = ParagraphStyle(
    'CustomCaption',
    parent=style_body,
    fontName='Times-Italic',
    fontSize=9,
    leading=12,
    textColor=TEXT_MUTED,
    alignment=TA_CENTER,
    spaceBefore=4,
    spaceAfter=12,
)

style_toc_title = ParagraphStyle(
    'TOCTitle',
    parent=styles['Heading1'],
    fontName='Times-Bold',
    fontSize=22,
    leading=28,
    textColor=TEXT_PRIMARY,
    spaceBefore=20,
    spaceAfter=20,
)

style_toc_entry = ParagraphStyle(
    'TOCEntry',
    fontName='Times-Roman',
    fontSize=11,
    leading=20,
    textColor=TEXT_PRIMARY,
    leftIndent=0,
)

style_toc_sub = ParagraphStyle(
    'TOCSubEntry',
    fontName='Times-Roman',
    fontSize=10,
    leading=18,
    textColor=TEXT_MUTED,
    leftIndent=24,
)

# Table cell styles
style_cell = ParagraphStyle(
    'TableCell',
    fontName='Times-Roman',
    fontSize=9,
    leading=12,
    textColor=TEXT_PRIMARY,
    alignment=TA_LEFT,
)

style_cell_header = ParagraphStyle(
    'TableHeader',
    fontName='Times-Bold',
    fontSize=9,
    leading=12,
    textColor=colors.white,
    alignment=TA_LEFT,
)

style_cell_small = ParagraphStyle(
    'TableCellSmall',
    fontName='Times-Roman',
    fontSize=8.5,
    leading=11,
    textColor=TEXT_PRIMARY,
    alignment=TA_LEFT,
)

style_cell_bold = ParagraphStyle(
    'TableCellBold',
    fontName='Times-Bold',
    fontSize=9,
    leading=12,
    textColor=TEXT_PRIMARY,
    alignment=TA_LEFT,
)


# ━━ Helpers ━━
def safe_keep_together(elements):
    """Wrap elements in KeepTogether to prevent splitting across pages."""
    return KeepTogether(elements)

def make_table(headers, rows, col_widths=None):
    """Create a styled table with Paragraph cells."""
    if col_widths is None:
        n = len(headers)
        col_widths = [AVAIL_W / n] * n

    # Ensure widths sum to available width
    total = sum(col_widths)
    if total > AVAIL_W:
        col_widths = [w * AVAIL_W / total for w in col_widths]

    data = []
    # Header row
    header_row = [Paragraph(h, style_cell_header) for h in headers]
    data.append(header_row)
    # Data rows
    for row in rows:
        data.append([Paragraph(str(c), style_cell_small) for c in row])

    t = Table(data, colWidths=col_widths, repeatRows=1)
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Times-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('TOPPADDING', (0, 0), (-1, 0), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 1), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 5),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]
    # Alternating row colors
    for i in range(1, len(data)):
        if i % 2 == 0:
            style_cmds.append(('BACKGROUND', (0, i), (-1, i), TABLE_STRIPE))
        else:
            style_cmds.append(('BACKGROUND', (0, i), (-1, i), colors.white))

    t.setStyle(TableStyle(style_cmds))
    return t

def bullet(text):
    return Paragraph(f"<bullet>&bull;</bullet> {text}", style_bullet)

def sub_bullet(text):
    return Paragraph(f"<bullet>-</bullet> {text}", style_sub_bullet)

def accent_text(text):
    return f'<font color="#{ACCENT.hexval()[2:]}">{text}</font>'

def bold(text):
    return f'<b>{text}</b>'

def section_divider():
    return HRFlowable(width="30%", thickness=1, color=BORDER, spaceBefore=6, spaceAfter=6)


# ━━ Page Templates ━━
class NumberedCanvas:
    """Canvas that adds page numbers to footer."""
    def __init__(self, canvas, doc):
        self._canvas = canvas
        self._doc = doc

    def __getattr__(self, name):
        return getattr(self._canvas, name)

    def showPage(self):
        self._canvas.showPage()


def footer_and_header(canvas_obj, doc):
    """Draw page header line and footer with page number."""
    canvas_obj.saveState()
    # Header line
    canvas_obj.setStrokeColor(BORDER)
    canvas_obj.setLineWidth(0.5)
    canvas_obj.line(MARGIN_L, PAGE_H - MARGIN_T + 15, PAGE_W - MARGIN_R, PAGE_H - MARGIN_T + 15)
    # Header text
    canvas_obj.setFont('Times-Italic', 8)
    canvas_obj.setFillColor(TEXT_MUTED)
    canvas_obj.drawString(MARGIN_L, PAGE_H - MARGIN_T + 20, "promptc OS: Strategic Architecture Analysis")
    canvas_obj.drawRightString(PAGE_W - MARGIN_R, PAGE_H - MARGIN_T + 20, "Z.ai Confidential")

    # Footer line
    canvas_obj.line(MARGIN_L, MARGIN_B - 15, PAGE_W - MARGIN_R, MARGIN_B - 15)
    # Page number
    page_num = canvas_obj.getPageNumber()
    canvas_obj.setFont('Times-Roman', 9)
    canvas_obj.setFillColor(TEXT_MUTED)
    canvas_obj.drawCentredString(PAGE_W / 2, MARGIN_B - 28, f"- {page_num} -")
    canvas_obj.restoreState()


# ━━ TOC ━━
class MyDocTemplate(BaseDocTemplate):
    def __init__(self, filename, **kwargs):
        BaseDocTemplate.__init__(self, filename, **kwargs)
        frame = Frame(MARGIN_L, MARGIN_B, AVAIL_W, PAGE_H - MARGIN_T - MARGIN_B,
                      id='normal', leftPadding=0, rightPadding=0, topPadding=6, bottomPadding=6)
        template = PageTemplate(id='body', frames=frame, onPage=footer_and_header)
        self.addPageTemplates([template])


# ━━ Document Content ━━
def build_toc(story):
    """Build a manual Table of Contents."""
    story.append(Paragraph("Table of Contents", style_toc_title))
    story.append(Spacer(1, 6))

    toc_entries = [
        ("1", "Executive Summary", 0),
        ("2", "Current promptc OS Architecture Audit", 0),
        ("", "2.1  ACTIVATE Zone", 1),
        ("", "2.2  BUILD Zone", 1),
        ("", "2.3  VALIDATE Zone", 1),
        ("", "2.4  PLAYBOOK Zone", 1),
        ("", "2.5  MONETIZE Zone", 1),
        ("3", "prompts.chat Analysis and High-Impact Prompt Categories", 0),
        ("", "3.1  Category Structure", 1),
        ("", "3.2  High-Impact Prompts", 1),
        ("4", "Cross-Examination and Alignment Matrix", 0),
        ("5", "Self-Evolving Architecture Design", 0),
        ("", "5.1  The Compounding Skill System", 1),
        ("", "5.2  Self-Learning Feedback Loop", 1),
        ("", "5.3  The 6-Phase Skill Creation Protocol", 1),
        ("", "5.4  Architecture Integration Points", 1),
        ("", "5.5  Momentum Mechanics", 1),
        ("6", "50+ Vertical Domain Re-Engineering", 0),
        ("", "6.1  Domain Architecture Pattern", 1),
        ("", "6.2  Priority Domains", 1),
        ("", "6.3  Scalability Architecture", 1),
        ("7", "Monetization Ecosystem Design", 0),
        ("", "7.1  Free Tier", 1),
        ("", "7.2  Pro Tier", 1),
        ("", "7.3  Business Tier", 1),
        ("", "7.4  Enterprise Tier", 1),
        ("", "7.5  The Secret Sauce", 1),
        ("8", "Before vs. After Integration Rating", 0),
        ("9", "Implementation Roadmap", 0),
        ("10", "Strategic Conclusion", 0),
    ]

    for num, title, level in toc_entries:
        if level == 0:
            style = style_toc_entry
            prefix = f"<b>{num}.</b>  " if num else ""
            text = f"{prefix}{title}"
        else:
            style = style_toc_sub
            text = title
        story.append(Paragraph(text, style))

    story.append(Spacer(1, 20))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceBefore=4, spaceAfter=4))


def build_executive_summary(story):
    story.append(Paragraph("1. Executive Summary", style_h1))
    story.append(section_divider())

    story.append(Paragraph(
        "This strategic analysis presents a comprehensive evaluation of the promptc OS project, "
        "a React+Vite single-file prompt engineering reference application, positioned against "
        "prompts.chat/prompts, one of the most widely used online prompt libraries. The objective "
        "is threefold: to audit the existing five-zone architecture, identify high-impact integration "
        "opportunities, and design a self-evolving system architecture that transforms promptc OS from "
        "a static reference tool into a dynamic, compounding-value platform.",
        style_body
    ))

    story.append(Paragraph(
        "The current promptc OS architecture comprises five distinct zones -- ACTIVATE, BUILD, VALIDATE, "
        "PLAYBOOK, and MONETIZE -- each serving a specific function in the prompt engineering lifecycle. "
        "Our audit reveals a remarkably strong foundation: 47 modifiers across 8 categories, 17 templates, "
        "28 lint rules, 22 workflows, and a complete monetization framework. Several features, including "
        "the modifier system, lint validation, and meta prompt builder, are entirely unique to promptc OS "
        "and absent from prompts.chat.",
        style_body
    ))

    story.append(Paragraph(
        "However, the analysis also identifies critical gaps: no AI-powered validation, no self-improvement "
        "feedback loop, limited vertical domain coverage (8 tasks versus 50+ domains at prompts.chat), no "
        "user personalization layer, and no multi-user scalability. The proposed self-evolving architecture "
        "addresses these gaps through a Compounding Skill System, a 6-Phase Skill Creation Protocol, and "
        "an expansion to 50+ vertical domains following a standardized domain architecture pattern.",
        style_body
    ))

    story.append(Paragraph(
        "The monetization ecosystem is structured as a four-tier model (Free, Pro at $9-19/month, Business "
        "at $49-99/month, Enterprise at $299-999/month), each tier deliberately designed to solve the "
        "value ceiling problem of the previous tier. The projected overall score improvement from 5.0/10 "
        "to 8.3/10, combined with the unique self-evolving differentiator, positions promptc OS to become "
        "not merely a prompt library, but the operating system for prompt engineering.",
        style_body
    ))


def build_architecture_audit(story):
    story.append(Paragraph("2. Current promptc OS Architecture Audit", style_h1))
    story.append(section_divider())

    story.append(Paragraph(
        "This section provides a detailed audit of the five zones that constitute the promptc OS "
        "architecture. Each zone is evaluated for its strengths, identifying what makes it competitive, "
        "and its gaps, highlighting where investment is needed to achieve market leadership.",
        style_body
    ))

    # ACTIVATE Zone
    story.append(Paragraph("2.1  ACTIVATE Zone", style_h2))
    story.append(Paragraph(
        "The ACTIVATE zone serves as the entry point for prompt creation, housing the core prompt "
        "engineering primitives that users interact with most frequently.",
        style_body
    ))
    story.append(bullet(bold("MASTER prompt:") + " System prompt with 10 core rules, advocacy mode, and writing rules -- the foundational instruction set"))
    story.append(bullet(bold("ADVOCATE prompt:") + " Long-term optimization prompt for iterative refinement"))
    story.append(bullet(bold("47 MODS across 8 categories:") + " Role, Output, Reasoning, Speed, Strategy, Hack, Data, Agent, and Productivity modifiers"))
    story.append(bullet(bold("8 TASKS:") + " YouTube, Coding, Business, Research, UI/UX, Image AI, Copy, and Email task templates"))
    story.append(bullet(bold("Secret Sauce:") + " CopyReadyBox component with copy-to-clipboard workflow"))
    story.append(Paragraph(
        accent_text("Strengths: ") + "Deep modifier library with practical tips per modifier; copy-ready workflow "
        "that reduces friction between prompt discovery and usage; well-organized category taxonomy enables "
        "efficient browsing.",
        style_body
    ))
    story.append(Paragraph(
        accent_text("Gaps: ") + "No onboarding flow for first-time users; no modifier chaining UI for combining "
        "multiple modifiers into recipes; no prompt templates for education, healthcare, or legal verticals; "
        "no usage analytics to surface the most effective modifier combinations.",
        style_body
    ))

    # BUILD Zone
    story.append(Paragraph("2.2  BUILD Zone", style_h2))
    story.append(Paragraph(
        "The BUILD zone provides the construction toolkit for assembling professional-grade prompts "
        "with brand consistency, structural integrity, and aesthetic precision.",
        style_body
    ))
    story.append(bullet(bold("17 TMPLS (templates):") + " Web App, Mobile, Brand, Landing Page, Dashboard, Meta:Universal, Meta:Mobile, Meta:Web, 6 brand systems (powerUP, SaaS, E-comm, Fintech, Insurance, Agency), API Design"))
    story.append(bullet(bold("BRANDS array:") + " 6 brand systems with full design tokens including typography, color, spacing"))
    story.append(bullet(bold("Meta Builder:") + " 3 templates -- Quick Critique, Deep Analysis, Expert Engineer"))
    story.append(bullet(bold("LINT rules:") + " 28 rules across 5 segments for prompt quality validation"))
    story.append(bullet(bold("SWAPS:") + " 45+ word swaps across 4 levels (beginner, misconception, advanced, hack)"))
    story.append(bullet(bold("AESTHETIC_KEYWORDS:") + " 16 terms; CONSTRAINT_OPTS: 14 options; STACK_FRAMEWORKS: 8 frameworks"))
    story.append(Paragraph(
        accent_text("Strengths: ") + "Comprehensive brand systems with production-ready design tokens; professional-grade "
        "lint/validation system with 28 rules; meta prompt engineering tools for building prompts that build prompts.",
        style_body
    ))
    story.append(Paragraph(
        accent_text("Gaps: ") + "No A/B testing templates for comparing prompt variants; no multi-language prompt "
        "support; no industry-specific prompt packs; no template versioning or diff comparison.",
        style_body
    ))

    # VALIDATE Zone
    story.append(Paragraph("2.3  VALIDATE Zone", style_h2))
    story.append(Paragraph(
        "The VALIDATE zone provides quality assurance capabilities, enabling users to assess and "
        "improve their prompts before deployment.",
        style_body
    ))
    story.append(bullet(bold("Scoring system:") + " 4 dimensions -- Clarity, Structure, Constraints, Predictability"))
    story.append(bullet(bold("CHECKS system:") + " 5 categories with selectable validation options"))
    story.append(bullet(bold("Lint Box:") + " Integrated with CopyReadyBox for seamless fix-and-copy workflow"))
    story.append(bullet(bold("Word Swap browser:") + " 4 difficulty levels -- beginner, misconception, advanced, hack"))
    story.append(Paragraph(
        accent_text("Strengths: ") + "Unique multi-dimensional scoring approach that goes beyond simple pass/fail; "
        "actionable fixes accompany each lint rule violation; word swap browser gamifies vocabulary improvement.",
        style_body
    ))
    story.append(Paragraph(
        accent_text("Gaps: ") + "No AI-powered validation (all checks are manual checkboxes); no version comparison "
        "to track prompt evolution over time; no team collaboration features for shared validation workflows.",
        style_body
    ))

    # PLAYBOOK Zone
    story.append(Paragraph("2.4  PLAYBOOK Zone", style_h2))
    story.append(Paragraph(
        "The PLAYBOOK zone transforms individual prompts into executable workflows, providing "
        "step-by-step guides for complex prompt engineering tasks.",
        style_body
    ))
    story.append(bullet(bold("22 workflows across 7 categories:") + " Design, Dev, Business, Content, Automation, Problem, Data, AI Product, and Monetize"))
    story.append(bullet(bold("Animal Mode system:") + " 7 modes -- Eagle (strategic overview), Beaver (detail execution), Ant (team coordination), Owl (research), Rabbit (speed), Dolphin (creative), Elephant (memory/persistence)"))
    story.append(bullet(bold("Chain system:") + " Multi-step workflow sequences with mode transitions"))
    story.append(Paragraph(
        accent_text("Strengths: ") + "Step-by-step workflows with specific animal mode assignments per phase; creative "
        "mnemonic system makes complex workflows memorable; chain system enables multi-prompt orchestration.",
        style_body
    ))
    story.append(Paragraph(
        accent_text("Gaps: ") + "No workflow templates that users can create and save; no progress tracking for "
        "multi-step workflows; no export or sharing capabilities for custom workflows.",
        style_body
    ))

    # MONETIZE Zone
    story.append(Paragraph("2.5  MONETIZE Zone", style_h2))
    story.append(Paragraph(
        "The MONETIZE zone provides a comprehensive framework for turning prompt engineering skills "
        "into revenue streams.",
        style_body
    ))
    story.append(bullet(bold("DEPLOY_STACKS:") + " Multiple deployment options for prompt-based products"))
    story.append(bullet(bold("MONETIZE_FW:") + " 4 frameworks -- Quick Win, Active Income, Passive Income, Hybrid Stack"))
    story.append(bullet(bold("AUTOMATION_WORKFLOWS:") + " 6 workflows covering n8n, Make, MCP, and Zapier"))
    story.append(bullet(bold("AI_TOOLS:") + " 7 tools -- OpenClaw, ZeroClaw, NullClaw, Agno, CrewAI, Claude Code"))
    story.append(bullet(bold("MONETIZE_RECIPES:") + " 6 recipes -- SaaS MVP, Prompt Pack, Newsletter, Consulting, Agency-to-SaaS, MCP-to-Product"))
    story.append(Paragraph(
        accent_text("Strengths: ") + "Practical monetization paths with exact prompts and step-by-step instructions; "
        "diverse framework options covering different business models; integration with modern automation platforms.",
        style_body
    ))
    story.append(Paragraph(
        accent_text("Gaps: ") + "No pricing calculator or revenue modeling tools; no revenue tracking dashboard; "
        "no community features for sharing monetization experiences or collaborating on ventures.",
        style_body
    ))


def build_prompts_chat_analysis(story):
    story.append(Paragraph("3. prompts.chat Analysis and High-Impact Prompt Categories", style_h1))
    story.append(section_divider())

    story.append(Paragraph(
        "prompts.chat/prompts represents the most comprehensive public prompt library available today, "
        "with 50+ categories spanning virtually every professional domain. This section analyzes its "
        "structure and identifies the prompt categories with the highest strategic alignment to promptc OS.",
        style_body
    ))

    story.append(Paragraph("3.1  Category Structure", style_h2))
    story.append(Paragraph(
        "The prompts.chat platform organizes its content into 50+ categories, each containing curated "
        "prompt collections. The breadth of coverage is a significant competitive advantage. The major "
        "category clusters include:",
        style_body
    ))

    cat_data = [
        ["Category Cluster", "Example Categories", "Est. Prompts"],
        ["Marketing and Sales", "Email sequences, ad copy, landing pages, SEO content", "200+"],
        ["Software Development", "Code review, debugging, architecture, testing", "300+"],
        ["Creative Writing", "Storytelling, copywriting, content strategy", "150+"],
        ["Data Analysis", "SQL generation, data visualization, statistics", "100+"],
        ["Business Strategy", "Market research, competitive analysis, planning", "80+"],
        ["Education and Learning", "Lesson plans, tutoring, curriculum design", "60+"],
        ["Healthcare", "Medical writing, patient communication", "40+"],
        ["Legal", "Contract drafting, compliance, legal research", "50+"],
        ["Finance", "Financial analysis, investment, risk assessment", "60+"],
        ["Design", "UI/UX, graphic design, brand strategy", "80+"],
        ["Customer Service", "Support scripts, escalation handling", "40+"],
        ["Human Resources", "Job descriptions, interviews, performance", "40+"],
        ["Real Estate", "Property listings, market analysis", "30+"],
        ["Content Creation", "Blog posts, social media, video scripts", "120+"],
        ["AI and Machine Learning", "Model selection, prompt engineering, fine-tuning", "70+"],
    ]

    story.append(make_table(cat_data[0], cat_data[1:], [AVAIL_W*0.25, AVAIL_W*0.50, AVAIL_W*0.25]))
    story.append(Paragraph("Table 1: prompts.chat Category Clusters", style_caption))

    story.append(Paragraph("3.2  High-Impact Prompts (Alignment Rating 8-10/10)", style_h2))
    story.append(Paragraph(
        "From the 50+ categories, eight prompt archetypes emerge with the highest strategic alignment "
        "to promptc OS capabilities. These represent the most valuable integration targets:",
        style_body
    ))

    impact_data = [
        ["#", "Prompt Archetype", "Alignment", "promptc OS Mapping"],
        ["1", "System Prompt Architects", "10/10", "Direct: MetaBuilder"],
        ["2", "Role-Stacking Chains", "9/10", "Animal Mode chains"],
        ["3", "Output Format Controllers", "9/10", "LINT output rules"],
        ["4", "Constraint Engineers", "8/10", "CHECKS system"],
        ["5", "Iterative Refinement Loops", "9/10", "Meta Templates #1-3"],
        ["6", "Context Window Managers", "7/10", "Gap: no memory layer"],
        ["7", "Domain-Specific Experts", "8/10", "Partial: TASKS"],
        ["8", "Self-Evaluation Prompts", "7/10", "Partial: scoring system"],
    ]

    story.append(make_table(impact_data[0], impact_data[1:], [AVAIL_W*0.06, AVAIL_W*0.30, AVAIL_W*0.14, AVAIL_W*0.50]))
    story.append(Paragraph("Table 2: High-Impact Prompt Archetypes by Alignment Score", style_caption))

    story.append(Paragraph(
        "The top 5 archetypes (alignment 8-10) represent areas where promptc OS already has "
        "strong infrastructure and can absorb content from prompts.chat with minimal architectural "
        "changes. The bottom 3 archetypes (alignment 7/10) require new feature development, "
        "particularly the Context Window Manager which demands a memory/context layer that does "
        "not yet exist in the current architecture.",
        style_body
    ))


def build_alignment_matrix(story):
    story.append(Paragraph("4. Cross-Examination and Alignment Matrix", style_h1))
    story.append(section_divider())

    story.append(Paragraph(
        "The following matrix provides a feature-by-feature comparison between promptc OS and "
        "prompts.chat, assessing alignment quality and integration priority. Features unique to "
        "promptc OS represent competitive moats; features unique to prompts.chat represent "
        "growth opportunities.",
        style_body
    ))

    matrix_data = [
        ["Feature", "promptc OS", "prompts.chat", "Alignment", "Priority"],
        ["System Prompt Library", "MASTER + ADVOCATE (2)", "100+ system prompts", "HIGH", "Absorb top 20"],
        ["Modifier System", "47 MODS, 8 categories", "Scattered modifiers", "HIGH", "Merge and categorize"],
        ["Task Templates", "8 TASKS", "200+ task prompts", "MEDIUM", "Add 50 high-impact"],
        ["Brand/Design Systems", "6 full brand systems", "Minimal", "UNIQUE", "Keep and expand"],
        ["Validation/Scoring", "4-dimension scoring", "None", "UNIQUE", "Keep and enhance"],
        ["Lint Rules", "28 rules, 5 segments", "None", "UNIQUE", "Keep and enhance"],
        ["Word Swap Database", "45+ swaps, 4 levels", "None", "UNIQUE", "Keep and expand"],
        ["Meta Prompt Builder", "3 templates", "Minimal", "UNIQUE", "Keep and enhance"],
        ["Playbook Workflows", "22 workflows", "None", "UNIQUE", "Keep and expand"],
        ["Monetization Framework", "Full ecosystem", "None", "UNIQUE", "Keep and expand"],
        ["Vertical Domains", "Limited (8 tasks)", "50+ domains", "LOW", "Add 30+ domains"],
        ["Community Features", "None", "Voting, sharing", "LOW", "Future phase"],
        ["Multi-language", "None", "Some", "LOW", "Future phase"],
        ["A/B Testing", "None", "None", "GAP", "Build new"],
        ["AI Validation", "None", "None", "GAP", "Build new"],
        ["Memory/Context Layer", "None", "None", "GAP", "Build new"],
    ]

    story.append(make_table(
        matrix_data[0], matrix_data[1:],
        [AVAIL_W*0.20, AVAIL_W*0.22, AVAIL_W*0.20, AVAIL_W*0.14, AVAIL_W*0.24]
    ))
    story.append(Paragraph("Table 3: Cross-Examination Alignment Matrix", style_caption))

    story.append(Paragraph(
        "Key finding: promptc OS holds 7 unique competitive advantages (brand systems, validation, lint, "
        "word swaps, meta builder, playbooks, monetization) versus 3 critical gaps (A/B testing, AI "
        "validation, memory layer). The strategic imperative is to defend the unique advantages while "
        "closing the gaps, rather than attempting to match prompts.chat's breadth of prompt coverage.",
        style_body
    ))


def build_self_evolving_architecture(story):
    story.append(Paragraph("5. Self-Evolving Architecture Design", style_h1))
    story.append(section_divider())

    story.append(Paragraph(
        "The most transformative opportunity for promptc OS is the implementation of a self-evolving "
        "architecture -- a system that becomes more valuable with every interaction. This section "
        "designs the \"NO ONE-OFF WORK\" system that converts every prompt usage into compounding "
        "institutional knowledge.",
        style_body
    ))

    # 5.1
    story.append(Paragraph("5.1  The Compounding Skill System", style_h2))
    story.append(Paragraph(
        "The core insight behind the compounding skill system is that every prompt a user copies "
        "represents a potential reusable asset. The system transforms ephemeral copy-paste actions "
        "into permanent, improvable skills:",
        style_body
    ))
    story.append(bullet(bold("Usage tracking:") + " Every prompt copy is logged with timestamp, context, and modifier configuration. The HistoryPanel component already captures this data, but it currently serves only as a passive log."))
    story.append(bullet(bold("Auto-suggestion:") + " When a prompt is copied 3 or more times, the system surfaces a suggestion: \"This prompt has been used N times. Save it as a reusable skill?\" This leverages the existing history data without requiring additional user input."))
    story.append(bullet(bold("Skill library:") + " A personal collection organized by domain, with each skill containing the prompt template, modifier chain, usage history, effectiveness rating, and evolution log."))
    story.append(bullet(bold("MECE principle enforcement:") + " Each skill addresses exactly one type of work, with zero overlap between skills. This prevents the library from becoming cluttered with near-duplicate entries."))

    # 5.2
    story.append(Paragraph("5.2  Self-Learning Feedback Loop", style_h2))
    story.append(Paragraph(
        "The self-learning feedback loop closes the gap between prompt creation and outcome "
        "measurement, enabling data-driven prompt improvement:",
        style_body
    ))
    story.append(bullet(bold("Outcome capture:") + " When a user returns to promptc OS after copying a prompt, a lightweight prompt asks for an outcome rating (1-5 stars) or qualitative feedback (\"Did this produce the expected result?\")."))
    story.append(bullet(bold("Effectiveness scoring:") + " Aggregate outcome ratings create an effectiveness score for each prompt, enabling users to identify which prompts consistently deliver high-quality results."))
    story.append(sub_bullet(bold("Auto-refine suggestions:") + " Prompts with declining effectiveness scores trigger automatic improvement suggestions based on successful variants used by other community members."))
    story.append(bullet(bold("Version tracking:") + " Every prompt modification is logged as a new version with a diff view, creating a complete evolution history. Users can revert to previous versions or compare effectiveness across versions."))

    # 5.3
    story.append(Paragraph("5.3  The 6-Phase Skill Creation Protocol", style_h2))
    story.append(Paragraph(
        "New skills follow a standardized 6-phase protocol that ensures quality and consistency "
        "while minimizing the burden on the user:",
        style_body
    ))

    phase_data = [
        ["Phase", "Name", "Description", "User Action"],
        ["1", "DISCOVER", "System identifies a repeatable pattern from usage data (3-10 uses of similar prompts)", "None (automatic)"],
        ["2", "PROTOTYPE", "AI generates an optimized version with 2-3 variants based on modifier combinations", "Review variants"],
        ["3", "EVALUATE", "User reviews, scores, and approves or rejects the prototype skill", "Score and approve"],
        ["4", "CODIFY", "Approved skill is saved to the personal Skills Library with metadata", "Optional: add tags"],
        ["5", "SCHEDULE", "If recurring, automation reminders are enabled (daily, weekly, custom)", "Set frequency"],
        ["6", "MONITOR", "Track usage, flag effectiveness degradation, suggest iterations", "None (automatic)"],
    ]

    story.append(make_table(
        phase_data[0], phase_data[1:],
        [AVAIL_W*0.08, AVAIL_W*0.13, AVAIL_W*0.52, AVAIL_W*0.27]
    ))
    story.append(Paragraph("Table 4: 6-Phase Skill Creation Protocol", style_caption))

    # 5.4
    story.append(Paragraph("5.4  Architecture Integration Points", style_h2))
    story.append(Paragraph(
        "The self-evolving architecture integrates with existing promptc OS components through "
        "specific touchpoints that minimize architectural disruption:",
        style_body
    ))

    int_data = [
        ["Existing Component", "Integration Point", "New Capability"],
        ["HistoryPanel", "Add \"Save as Skill\" button per entry", "Convert history entries to skills"],
        ["CopyReadyBox", "Add usage counter and effectiveness tracker", "Track prompt performance"],
        ["Validate Zone", "Add \"Evolution Score\" panel", "Show improvement over time"],
        ["Playbook Zone", "Add \"My Workflows\" tab", "User-created workflow templates"],
        ["New Component", "Skills Library zone/tab", "Personal skill management hub"],
    ]

    story.append(make_table(
        int_data[0], int_data[1:],
        [AVAIL_W*0.22, AVAIL_W*0.38, AVAIL_W*0.40]
    ))
    story.append(Paragraph("Table 5: Architecture Integration Points", style_caption))

    # 5.5
    story.append(Paragraph("5.5  Momentum Mechanics", style_h2))
    story.append(Paragraph(
        "The self-evolving architecture generates compounding value through four momentum mechanics "
        "that create a positive feedback loop:",
        style_body
    ))
    story.append(bullet(bold("Network effect:") + " As more users contribute skills, the suggestion engine has more data to draw from, improving recommendations for everyone. Each new user makes the system smarter for all existing users."))
    story.append(bullet(bold("Compound interest:") + " Each skill builds on the accumulated knowledge of previous skills. A user's 50th skill benefits from the patterns learned in the first 49, making the marginal value of each new skill increase over time."))
    story.append(bullet(bold("Reduced cognitive load:") + " As the skill library grows, users spend less time crafting prompts from scratch and more time executing refined workflows. The system progressively eliminates the need for manual prompt engineering."))
    story.append(bullet(bold("The ultimate goal:") + " \"Your job is to make yourself unnecessary -- one skill at a time.\" The system's success metric is the reduction in time users spend on prompt creation, as increasingly sophisticated skills automate routine prompting tasks."))


def build_vertical_domains(story):
    story.append(Paragraph("6. 50+ Vertical Domain Re-Engineering", style_h1))
    story.append(section_divider())

    story.append(Paragraph(
        "To compete with prompts.chat's breadth of coverage while maintaining promptc OS's depth "
        "of quality, a scalable domain architecture is essential. This section defines the standardized "
        "domain template and prioritizes the first 15 domains for implementation.",
        style_body
    ))

    # 6.1
    story.append(Paragraph("6.1  Domain Architecture Pattern", style_h2))
    story.append(Paragraph(
        "Each vertical domain follows a consistent template that ensures quality, discoverability, "
        "and cross-domain compatibility:",
        style_body
    ))

    domain_items = [
        (bold("Domain Identity:") + " Icon, color, and description that distinguish the domain visually and semantically"),
        (bold("3-5 Role Prompts:") + " Seniority-graded personas (junior, senior, principal) that establish expertise context"),
        (bold("5-10 Task Templates:") + " Copy-ready prompts with [VARIABLE] placeholders for customization"),
        (bold("Domain-Specific Lint Rules:") + " 3-5 validation rules unique to the domain's terminology and conventions"),
        (bold("Domain Word Swaps:") + " 5-10 common vocabulary mistakes specific to the domain"),
        (bold("Quick Start Recipe:") + " A single-prompt getting-started guide for domain newcomers"),
        (bold("Advanced Recipe:") + " A multi-step workflow for experienced practitioners"),
        (bold("Monetization Path:") + " Domain-specific revenue strategies and prompt product opportunities"),
    ]
    for item in domain_items:
        story.append(bullet(item))

    # 6.2
    story.append(Paragraph("6.2  Priority Domains (Phase 1)", style_h2))
    story.append(Paragraph(
        "Domains are grouped into three tiers based on alignment with existing promptc OS capabilities "
        "and market demand. Phase 1 targets 15 domains across three tiers:",
        style_body
    ))

    story.append(Paragraph("Tier 1: Immediate (Highest Alignment + Demand)", style_h3))
    tier1_data = [
        ["#", "Domain", "Builds On", "Est. Prompts"],
        ["1", "Software Engineering", "Existing Coding task", "15-20"],
        ["2", "Marketing and Growth", "YouTube/Copy/Email tasks", "15-20"],
        ["3", "Content Creation", "Existing Copy task", "12-15"],
        ["4", "Data Science and Analytics", "Existing Research task", "10-15"],
        ["5", "UI/UX Design", "Existing UI/UX task", "10-12"],
    ]
    story.append(make_table(tier1_data[0], tier1_data[1:], [AVAIL_W*0.06, AVAIL_W*0.30, AVAIL_W*0.34, AVAIL_W*0.30]))

    story.append(Paragraph("Tier 2: High (Strong Alignment)", style_h3))
    tier2_data = [
        ["#", "Domain", "Builds On", "Est. Prompts"],
        ["6", "Business Strategy and Operations", "Existing Business task", "10-15"],
        ["7", "E-commerce and Retail", "Existing brand systems", "10-12"],
        ["8", "Finance and Investment", "Existing Fintech brand", "10-15"],
        ["9", "Education and Training", "New vertical", "8-12"],
        ["10", "Real Estate", "New vertical", "8-10"],
    ]
    story.append(make_table(tier2_data[0], tier2_data[1:], [AVAIL_W*0.06, AVAIL_W*0.30, AVAIL_W*0.34, AVAIL_W*0.30]))

    story.append(Paragraph("Tier 3: Medium (Moderate Alignment)", style_h3))
    tier3_data = [
        ["#", "Domain", "Builds On", "Est. Prompts"],
        ["11", "Healthcare and Medical", "New vertical", "8-10"],
        ["12", "Legal and Compliance", "New vertical", "8-10"],
        ["13", "Human Resources", "New vertical", "6-8"],
        ["14", "Customer Success and Support", "New vertical", "6-8"],
        ["15", "Product Management", "New vertical", "8-10"],
    ]
    story.append(make_table(tier3_data[0], tier3_data[1:], [AVAIL_W*0.06, AVAIL_W*0.30, AVAIL_W*0.34, AVAIL_W*0.30]))
    story.append(Paragraph("Tables 6-8: Priority Domain Tiers", style_caption))

    # 6.3
    story.append(Paragraph("6.3  Scalability Architecture", style_h2))
    story.append(Paragraph(
        "The domain system is designed for rapid expansion through four scalability mechanisms:",
        style_body
    ))
    story.append(bullet(bold("Template-driven creation:") + " Each new domain follows the standardized template, reducing creation time to 2-4 hours for experienced prompt engineers. The template ensures consistent quality across domains."))
    story.append(bullet(bold("Community contributions:") + " In future phases, domain experts can submit new domains for review and inclusion. A peer-review system ensures quality standards are maintained."))
    story.append(bullet(bold("Domain scoring:") + " Usage-based ranking surfaces the most valuable domains, informing investment decisions for expansion and improvement."))
    story.append(bullet(bold("Cross-domain pollination:") + " Modifiers, lint rules, and workflow patterns can be shared across domains, preventing duplication and accelerating development of new verticals."))


def build_monetization_ecosystem(story):
    story.append(Paragraph("7. Monetization Ecosystem Design", style_h1))
    story.append(section_divider())

    story.append(Paragraph(
        "The monetization ecosystem is structured as a four-tier value ladder, where each tier "
        "deliberately creates a value ceiling that motivates upgrade to the next level. The design "
        "principle is: give away real value at the free tier, make the pro tier irresistible for "
        "serious users, and make the business/enterprise tiers essential for professionals.",
        style_body
    ))

    # 7.1
    story.append(Paragraph("7.1  Free Tier -- \"The Hook\"", style_h2))
    story.append(Paragraph(
        accent_text("Purpose: ") + "Give away real value, build habit, create dependency.",
        style_body
    ))
    story.append(Paragraph(bold("What is Free:"), style_body))
    story.append(bullet("All 47 modifiers with practical tips (current MODS system)"))
    story.append(bullet("All 8 task prompts (current TASKS system)"))
    story.append(bullet("MASTER + ADVOCATE system prompts (current)"))
    story.append(bullet("Basic 4-dimension scoring (current Validate zone)"))
    story.append(bullet("3 Meta Builder templates (current)"))
    story.append(bullet("22 playbook workflows (current)"))
    story.append(bullet("History panel with copy tracking"))
    story.append(bullet("Lint rules browser (read-only access)"))
    story.append(Spacer(1, 6))
    story.append(Paragraph(bold("Lead Magnets (Conversion Tools):"), style_body))
    story.append(bullet("\"The Secret Sauce Prompt\" PDF -- free download teaching one powerful technique"))
    story.append(bullet("\"Prompt Engineering 101\" ebook -- comprehensive beginner guide"))
    story.append(bullet("\"5 Prompts That Replaced My $5K/Mo Consultant\" -- case study PDF"))
    story.append(bullet("Weekly newsletter -- 1 prompt deep-dive + 1 modifier trick + 1 workflow"))
    story.append(bullet("Prompt score calculator -- web tool that scores any prompt 1-10"))

    # 7.2
    story.append(Paragraph("7.2  Pro Tier -- \"The Bridge\" ($9-19/month)", style_h2))
    story.append(Paragraph(
        accent_text("Purpose: ") + "Convert free users who hit the value ceiling.",
        style_body
    ))
    story.append(bullet("All 6 brand systems with full design tokens"))
    story.append(bullet("All 17 templates (TMPLS) with copy-ready access"))
    story.append(bullet("Full lint rules with auto-fix suggestions"))
    story.append(bullet("Complete word swap database (45+ swaps, 4 levels)"))
    story.append(bullet("CopyReadyBox with unlimited saves and organization"))
    story.append(bullet("Personal Skills Library (save prompts as reusable skills)"))
    story.append(bullet("Usage analytics dashboard (which prompts work best)"))
    story.append(bullet("Custom modifier chaining (combine modifiers into recipes)"))
    story.append(bullet("Priority community support"))
    story.append(bullet("Monthly prompt pack updates (10 new prompts per month)"))

    # 7.3
    story.append(Paragraph("7.3  Business Tier -- \"The Engine\" ($49-99/month)", style_h2))
    story.append(Paragraph(
        accent_text("Purpose: ") + "For teams and professionals who prompt daily.",
        style_body
    ))
    story.append(bullet("Everything in Pro tier"))
    story.append(bullet("Team collaboration (shared prompt libraries and workflows)"))
    story.append(bullet("15+ vertical domain packs with domain-specific tools"))
    story.append(bullet("Advanced AI validation (AI-powered prompt scoring)"))
    story.append(bullet("A/B testing framework (test prompt variants side-by-side)"))
    story.append(bullet("Workflow automation builder (n8n/Zapier integration)"))
    story.append(bullet("Custom brand system creator"))
    story.append(bullet("API access (use promptc-os prompts in your own applications)"))
    story.append(bullet("Monetization recipes with revenue tracking"))
    story.append(bullet("White-label option for agencies"))
    story.append(bullet("Priority feature requests"))

    # 7.4
    story.append(Paragraph("7.4  Enterprise Tier -- \"The Platform\" ($299-999/month)", style_h2))
    story.append(Paragraph(
        accent_text("Purpose: ") + "Organizations embedding prompt engineering into operations.",
        style_body
    ))
    story.append(bullet("Everything in Business tier"))
    story.append(bullet("Unlimited team seats"))
    story.append(bullet("Custom domain hosting with SSL"))
    story.append(bullet("SSO/SAML authentication"))
    story.append(bullet("Compliance audit logs"))
    story.append(bullet("Custom vertical domains (built to specification)"))
    story.append(bullet("Dedicated prompt engineer (monthly consultation)"))
    story.append(bullet("SLA guarantee with priority support"))
    story.append(bullet("On-premise deployment option"))
    story.append(bullet("Training workshops for teams"))

    # 7.5
    story.append(Paragraph("7.5  The Secret Sauce: Turning Ordinary into Extraordinary", style_h2))
    story.append(Paragraph(
        "The fundamental differentiator of promptc OS is not the quantity of prompts, but the "
        "quality of thinking it instills in its users. Four systems work in concert to deliver "
        "this advantage:",
        style_body
    ))
    story.append(bullet(bold("The Modifier System teaches WHY:") + " Understanding why \"act as a YC partner\" produces better strategy output than a generic instruction is the difference between a prompt user and a prompt engineer. The modifier system doesn't just provide templates -- it explains the reasoning behind each modification."))
    story.append(bullet(bold("The Lint System catches invisible mistakes:") + " Users consistently make errors they are unaware of -- vague instructions, missing constraints, ambiguous role definitions. The 28 lint rules catch these mistakes systematically, improving prompt quality with every iteration."))
    story.append(bullet(bold("The Playbook System enables execution:") + " Knowledge without execution is wasted. The 22 workflows transform prompt engineering theory into repeatable, step-by-step execution plans with animal mode assignments that guide cognitive approach."))
    story.append(bullet(bold("Combined effect:") + " promptc OS doesn't just store prompts -- it teaches the thinking behind great prompts, catches the mistakes users don't know they're making, and provides the execution framework to turn knowledge into repeatable results. This is what transforms it from a prompt library into a prompt engineering operating system."))


def build_before_after(story):
    story.append(Paragraph("8. Before vs. After Integration Rating", style_h1))
    story.append(section_divider())

    story.append(Paragraph(
        "The following tables quantify the expected improvement across eight strategic dimensions, "
        "providing a measurable baseline and target for the integration roadmap.",
        style_body
    ))

    story.append(Paragraph("Before Integration (Current State)", style_h2))
    before_data = [
        ["Dimension", "Rating", "Notes"],
        ["Prompt Coverage", "6 / 10", "Good modifiers, limited vertical domains"],
        ["Validation Quality", "7 / 10", "Unique manual scoring, no AI validation"],
        ["User Engagement", "5 / 10", "Copy-only workflow, no personalization"],
        ["Self-Improvement", "2 / 10", "Static content, no learning loop"],
        ["Monetization Readiness", "4 / 10", "Framework exists, no payment integration"],
        ["Scalability", "3 / 10", "Single file, no API, no multi-user"],
        ["Market Differentiation", "8 / 10", "Unique modifier+lint+playbook combination"],
        ["Overall Score", "5.0 / 10", "Strong foundation, needs evolution layer"],
    ]

    story.append(make_table(
        before_data[0], before_data[1:],
        [AVAIL_W*0.24, AVAIL_W*0.14, AVAIL_W*0.62]
    ))
    story.append(Paragraph("Table 9: Current State Assessment", style_caption))

    story.append(Paragraph("After Integration (Projected)", style_h2))
    after_data = [
        ["Dimension", "Rating", "Notes"],
        ["Prompt Coverage", "9 / 10", "50+ domains, 200+ curated prompts"],
        ["Validation Quality", "9 / 10", "AI + manual hybrid scoring system"],
        ["User Engagement", "8 / 10", "Personal skills, usage tracking, feedback loop"],
        ["Self-Improvement", "8 / 10", "Usage-driven refinement and evolution loop"],
        ["Monetization Readiness", "8 / 10", "4-tier model with clear value ladder"],
        ["Scalability", "7 / 10", "API + multi-user + cloud sync infrastructure"],
        ["Market Differentiation", "9 / 10", "Only system with self-evolving prompt architecture"],
        ["Overall Score", "8.3 / 10", "Compounding value with network effects"],
    ]

    story.append(make_table(
        after_data[0], after_data[1:],
        [AVAIL_W*0.24, AVAIL_W*0.14, AVAIL_W*0.62]
    ))
    story.append(Paragraph("Table 10: Projected Post-Integration Assessment", style_caption))

    story.append(Paragraph(
        "The most significant improvements are in Self-Improvement (+6 points), Scalability (+4 points), "
        "and User Engagement (+3 points). These represent the areas where the self-evolving architecture "
        "and multi-user infrastructure deliver the highest impact. Market Differentiation also improves "
        "from 8 to 9, reflecting the unique self-evolving prompt capability that no competitor currently offers.",
        style_body
    ))


def build_roadmap(story):
    story.append(Paragraph("9. Implementation Roadmap", style_h1))
    story.append(section_divider())

    story.append(Paragraph(
        "The integration roadmap is organized into five phases, progressing from foundational "
        "improvements to advanced compound-value features:",
        style_body
    ))

    roadmap_data = [
        ["Phase", "Timeline", "Focus Areas", "Key Deliverables"],
        ["1: Foundation", "Week 1-2", "Bug fixes, Tier 1 domains", "15 new domains, stability improvements"],
        ["2: Evolution Layer", "Week 3-4", "Skills Library, tracking", "Personal skills system, usage analytics"],
        ["3: Monetization", "Week 5-6", "Free tier, Pro tier, lead magnets", "Payment integration, 5 lead magnets"],
        ["4: Scale", "Week 7-8", "Business/Enterprise tiers, API", "Team features, API endpoints"],
        ["5: Compound", "Month 3+", "Community, marketplace", "User contributions, white-label"],
    ]

    story.append(make_table(
        roadmap_data[0], roadmap_data[1:],
        [AVAIL_W*0.18, AVAIL_W*0.15, AVAIL_W*0.32, AVAIL_W*0.35]
    ))
    story.append(Paragraph("Table 11: Implementation Roadmap", style_caption))

    story.append(Paragraph(bold("Phase 1 (Weeks 1-2): Foundation"), style_body))
    story.append(Paragraph(
        "The foundation phase focuses on stabilizing the existing codebase and expanding domain coverage "
        "to the first 15 priority domains. This involves fixing remaining bugs in the single-file architecture, "
        "creating domain templates following the standardized pattern, and importing high-impact prompts "
        "from prompts.chat. Each domain requires approximately 2-4 hours to create using the template system, "
        "making 15 domains achievable within a two-week sprint.",
        style_body
    ))

    story.append(Paragraph(bold("Phase 2 (Weeks 3-4): Evolution Layer"), style_body))
    story.append(Paragraph(
        "The evolution layer introduces the core self-improving capabilities: the Personal Skills Library, "
        "usage tracking with the CopyReadyBox, effectiveness feedback prompts, and the 6-Phase Skill Creation "
        "Protocol. This phase also adds the Evolution Score to the Validate zone, enabling users to track "
        "prompt improvement over time. The architecture integration points defined in Section 5.4 guide "
        "the implementation of each touchpoint.",
        style_body
    ))

    story.append(Paragraph(bold("Phase 3 (Weeks 5-6): Monetization"), style_body))
    story.append(Paragraph(
        "Monetization infrastructure goes live with the free tier artifacts (lead magnets, newsletter, "
        "prompt score calculator), Pro tier payment integration, and the conversion optimization system. "
        "The value ladder design ensures that free users encounter natural upgrade triggers as they "
        "explore the full promptc OS capabilities.",
        style_body
    ))

    story.append(Paragraph(bold("Phase 4 (Weeks 7-8): Scale"), style_body))
    story.append(Paragraph(
        "Business and Enterprise tiers launch with team collaboration features, API access, and the "
        "A/B testing framework. This phase requires the most significant architectural changes, including "
        "the transition from single-file to a proper application architecture with backend services, "
        "database persistence, and authentication systems.",
        style_body
    ))

    story.append(Paragraph(bold("Phase 5 (Month 3+): Compound"), style_body))
    story.append(Paragraph(
        "The compound phase activates network effects through community contributions, a prompt marketplace, "
        "and white-label licensing. At this stage, promptc OS transitions from a tool into a platform, "
        "where the value created by each user makes the system more valuable for all users.",
        style_body
    ))


def build_conclusion(story):
    story.append(Paragraph("10. Strategic Conclusion", style_h1))
    story.append(section_divider())

    story.append(Paragraph(
        "promptc OS possesses a rare combination of qualities that position it to become the definitive "
        "operating system for prompt engineering. The current architecture already delivers unique value "
        "through its modifier system, lint validation, meta prompt builder, and monetization framework "
        "-- features that no competitor, including the comprehensive prompts.chat library, currently offers.",
        style_body
    ))

    story.append(Paragraph(
        "The strategic path forward is not to match prompts.chat's breadth of prompt coverage, but to "
        "build on the unique depth that promptc OS already provides. The self-evolving architecture "
        "designed in this analysis transforms promptc OS from a static reference tool into a dynamic "
        "platform that compounds in value with every interaction. The Compounding Skill System, the "
        "6-Phase Skill Creation Protocol, and the standardized domain architecture create a flywheel "
        "effect: more usage generates better data, better data improves prompt quality, better prompt "
        "quality attracts more users, and more users generate even better data.",
        style_body
    ))

    story.append(Paragraph(
        "The four-tier monetization model ensures sustainable revenue growth while maintaining the "
        "generous free tier that drives adoption. The projected improvement from a 5.0/10 to 8.3/10 "
        "overall score represents not just a quantitative improvement, but a qualitative transformation: "
        "from a useful tool to an essential platform.",
        style_body
    ))

    story.append(Paragraph(
        "The ultimate competitive moat is not the number of prompts in the library, but the quality "
        "of thinking that the system instills in its users. promptc OS doesn't just help users find "
        "prompts -- it teaches them to think like prompt engineers, catches mistakes they don't know "
        "they're making, and provides the execution framework to turn knowledge into repeatable results. "
        "That is the architecture of an operating system, and that is why promptc OS has the foundation "
        "to become the operating system for prompt engineering.",
        style_body
    ))

    story.append(Spacer(1, 30))
    story.append(HRFlowable(width="40%", thickness=1, color=ACCENT, spaceBefore=10, spaceAfter=10))
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "<i>End of Report</i>",
        ParagraphStyle('EndNote', parent=style_caption, fontSize=10, textColor=TEXT_MUTED)
    ))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Prepared by Z.ai  |  April 2026  |  Version 1.0",
        ParagraphStyle('EndMeta', parent=style_caption, fontSize=8, textColor=TEXT_MUTED)
    ))


# ━━ Main Build ━━
def build_body():
    """Build the body PDF (without cover)."""
    doc = MyDocTemplate(
        BODY_PATH,
        pagesize=letter,
        leftMargin=MARGIN_L,
        rightMargin=MARGIN_R,
        topMargin=MARGIN_T,
        bottomMargin=MARGIN_B,
        title="promptc OS: Strategic Architecture Analysis",
        author="Z.ai",
    )

    story = []

    # Table of Contents
    build_toc(story)
    story.append(PageBreak())

    # Section 1
    story.append(safe_keep_together([
        Paragraph("1. Executive Summary", style_h1),
        section_divider(),
    ]))
    build_executive_summary(story)

    # Section 2
    story.append(safe_keep_together([
        Paragraph("2. Current promptc OS Architecture Audit", style_h1),
        section_divider(),
    ]))
    build_architecture_audit(story)

    # Section 3
    story.append(safe_keep_together([
        Paragraph("3. prompts.chat Analysis and High-Impact Prompt Categories", style_h1),
        section_divider(),
    ]))
    build_prompts_chat_analysis(story)

    # Section 4
    story.append(safe_keep_together([
        Paragraph("4. Cross-Examination and Alignment Matrix", style_h1),
        section_divider(),
    ]))
    build_alignment_matrix(story)

    # Section 5
    story.append(safe_keep_together([
        Paragraph("5. Self-Evolving Architecture Design", style_h1),
        section_divider(),
    ]))
    build_self_evolving_architecture(story)

    # Section 6
    story.append(safe_keep_together([
        Paragraph("6. 50+ Vertical Domain Re-Engineering", style_h1),
        section_divider(),
    ]))
    build_vertical_domains(story)

    # Section 7
    story.append(safe_keep_together([
        Paragraph("7. Monetization Ecosystem Design", style_h1),
        section_divider(),
    ]))
    build_monetization_ecosystem(story)

    # Section 8
    story.append(safe_keep_together([
        Paragraph("8. Before vs. After Integration Rating", style_h1),
        section_divider(),
    ]))
    build_before_after(story)

    # Section 9
    story.append(safe_keep_together([
        Paragraph("9. Implementation Roadmap", style_h1),
        section_divider(),
    ]))
    build_roadmap(story)

    # Section 10
    story.append(safe_keep_together([
        Paragraph("10. Strategic Conclusion", style_h1),
        section_divider(),
    ]))
    build_conclusion(story)

    doc.build(story)
    print(f"Body PDF generated: {BODY_PATH}")


def merge_cover_body():
    """Merge cover PDF and body PDF into final output."""
    from pypdf import PdfReader, PdfWriter

    reader_cover = PdfReader(COVER_PATH)
    reader_body = PdfReader(BODY_PATH)

    writer = PdfWriter()
    # Cover page
    writer.add_page(reader_cover.pages[0])
    # Body pages
    for page in reader_body.pages:
        writer.add_page(page)

    # Set metadata
    writer.add_metadata({
        '/Title': 'promptc OS: Strategic Architecture Analysis',
        '/Author': 'Z.ai',
        '/Creator': 'Z.ai PDF Generator',
        '/Producer': 'ReportLab + Playwright',
        '/Subject': 'Comparative Analysis, Self-Evolving Design and Monetization Ecosystem',
    })

    with open(FINAL_PATH, 'wb') as f:
        writer.write(f)

    total_pages = len(reader_cover.pages) + len(reader_body.pages)
    print(f"Final PDF merged: {FINAL_PATH} ({total_pages} pages)")


if __name__ == '__main__':
    build_body()
    merge_cover_body()

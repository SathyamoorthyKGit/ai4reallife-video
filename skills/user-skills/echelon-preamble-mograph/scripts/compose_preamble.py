#!/usr/bin/env python3
"""
Echelon Preamble Motion Graphics Compositor
============================================
Composites keyword typography, cutaway screens, transitions, and end cards
onto a raw speaker edit to produce a finished 9:16 preamble.

Usage: This script is called by Claude during Phase 4 with a JSON config.
       Not intended for standalone CLI use — Claude builds the config from
       the approved plan and calls functions directly.

Dependencies: moviepy, Pillow, numpy
"""

import json
import math
import os
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ─── CONSTANTS ────────────────────────────────────────────────────────────────

W, H = 1080, 1920  # 9:16 vertical
FONT_DIR = Path(__file__).parent.parent / "assets" / "fonts"

# Font paths
FONTS = {
    "slam": FONT_DIR / "Anton-Regular.ttf",
    "heavy": FONT_DIR / "Montserrat-Black.ttf",
    "extrabold": FONT_DIR / "Montserrat-ExtraBold.ttf",
    "bold": FONT_DIR / "Montserrat-Bold.ttf",
    "semibold": FONT_DIR / "Montserrat-SemiBold.ttf",
    "regular": FONT_DIR / "Montserrat-Regular.ttf",
    "poppins": FONT_DIR / "Poppins-Bold.ttf",
}

# Verify fonts exist, fall back gracefully
for key, path in list(FONTS.items()):
    if not path.exists():
        print(f"⚠ Font missing: {path.name}, will use fallback")


# ─── TEXT RENDERING ───────────────────────────────────────────────────────────

def render_text_image(
    text: str,
    font_path: str,
    font_size: int,
    color: tuple = (255, 255, 255, 255),
    shadow: bool = True,
    shadow_offset: int = 3,
    shadow_color: tuple = (0, 0, 0, 128),
    letter_spacing: int = 0,
    max_width: int = 960,  # W - 2*60px margin
) -> Image.Image:
    """
    Render text onto a transparent RGBA image.
    Returns a cropped image just containing the text (with padding).
    """
    font = ImageFont.truetype(str(font_path), font_size)

    # Measure text
    dummy = Image.new("RGBA", (1, 1))
    draw = ImageDraw.Draw(dummy)

    if letter_spacing > 0:
        # Manual letter spacing
        total_w = 0
        for ch in text:
            bbox = draw.textbbox((0, 0), ch, font=font)
            total_w += (bbox[2] - bbox[0]) + letter_spacing
        total_w -= letter_spacing  # remove trailing space
    else:
        bbox = draw.textbbox((0, 0), text, font=font)
        total_w = bbox[2] - bbox[0]

    bbox = draw.textbbox((0, 0), text, font=font)
    text_h = bbox[3] - bbox[1]

    # Create image with padding
    pad = shadow_offset + 4 if shadow else 4
    img = Image.new("RGBA", (total_w + pad * 2, text_h + pad * 2), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    x, y = pad, pad - bbox[1]  # offset for font ascent

    if letter_spacing > 0:
        # Draw character by character with spacing
        cx = x
        if shadow:
            for ch in text:
                draw.text((cx + shadow_offset, y + shadow_offset), ch, fill=shadow_color, font=font)
                chbox = draw.textbbox((0, 0), ch, font=font)
                cx += (chbox[2] - chbox[0]) + letter_spacing
            cx = x
        for ch in text:
            draw.text((cx, y), ch, fill=color, font=font)
            chbox = draw.textbbox((0, 0), ch, font=font)
            cx += (chbox[2] - chbox[0]) + letter_spacing
    else:
        if shadow:
            draw.text((x + shadow_offset, y + shadow_offset), text, fill=shadow_color, font=font)
        draw.text((x, y), text, fill=color, font=font)

    return img


def render_watermark() -> Image.Image:
    """Render the ECHELON watermark as a transparent PNG."""
    return render_text_image(
        "ECHELON",
        str(FONTS["semibold"]),
        30,
        color=(255, 255, 255, 200),
        shadow=False,
        letter_spacing=8,
    )


def render_primary_slam(text: str, color=(255, 255, 255, 255), font_size=160) -> Image.Image:
    """Single large keyword — PRIMARY SLAM style."""
    return render_text_image(
        text.upper(),
        str(FONTS["slam"]),
        font_size,
        color=color,
        shadow=True,
        shadow_offset=3,
    )


def render_secondary_stack(
    line1: str, line2: str,
    color1=(255, 255, 255, 255), color2=(255, 255, 255, 255),
    size1=70, size2=140,
) -> tuple:
    """Two-line stack — returns (line1_img, line2_img) for staggered animation."""
    img1 = render_text_image(line1.upper(), str(FONTS["bold"]), size1, color=color1)
    img2 = render_text_image(line2.upper(), str(FONTS["slam"]), size2, color=color2)
    return img1, img2


def render_compound_block(
    primary: str, context: str,
    primary_size=160, context_size=48,
) -> Image.Image:
    """Big word + small context beneath — COMPOUND BLOCK style."""
    p_img = render_text_image(primary.upper(), str(FONTS["slam"]), primary_size)
    c_img = render_text_image(context.upper(), str(FONTS["regular"]), context_size, shadow=False)

    # Stack vertically
    total_w = max(p_img.width, c_img.width)
    total_h = p_img.height + c_img.height + 4
    combined = Image.new("RGBA", (total_w, total_h), (0, 0, 0, 0))
    combined.paste(p_img, (0, 0), p_img)
    combined.paste(c_img, (0, p_img.height + 4), c_img)
    return combined


def render_counter_frame(
    current_value: float, final_value: float,
    label: str, color=(200, 169, 110, 255),
) -> Image.Image:
    """Render one frame of a counting number animation."""
    if final_value >= 1_000_000_000:
        formatted = f"${current_value:,.0f}"
    elif final_value >= 1_000_000:
        formatted = f"${current_value:,.0f}"
    else:
        formatted = f"{current_value:,.0f}"

    num_img = render_text_image(formatted, str(FONTS["extrabold"]), 100, color=color)
    label_img = render_text_image(
        label.upper(), str(FONTS["regular"]), 36,
        color=(255, 255, 255, 255), shadow=False,
    )

    total_w = max(num_img.width, label_img.width)
    total_h = num_img.height + label_img.height + 8
    combined = Image.new("RGBA", (total_w, total_h), (0, 0, 0, 0))
    # Center both
    combined.paste(num_img, ((total_w - num_img.width) // 2, 0), num_img)
    combined.paste(label_img, ((total_w - label_img.width) // 2, num_img.height + 8), label_img)
    return combined


def render_tagline_stack(lines: list, font_size=70) -> Image.Image:
    """Even-weight stacked lines — TAGLINE STACK for end cards."""
    imgs = [
        render_text_image(
            line.upper(), str(FONTS["bold"]), font_size,
            shadow=False, letter_spacing=4,
        )
        for line in lines
    ]
    total_w = max(img.width for img in imgs)
    gap = 8
    total_h = sum(img.height for img in imgs) + gap * (len(imgs) - 1)
    combined = Image.new("RGBA", (total_w, total_h), (0, 0, 0, 0))
    y = 0
    for img in imgs:
        combined.paste(img, ((total_w - img.width) // 2, y), img)
        y += img.height + gap
    return combined


# ─── END CARD ─────────────────────────────────────────────────────────────────

def render_end_card(
    brand_name: str,
    tagline: str,
    bg_color: tuple = (10, 10, 10),
    accent_color: tuple = (227, 25, 55),
) -> Image.Image:
    """Render a complete end card frame (1080×1920)."""
    # Background gradient
    bg = Image.new("RGB", (W, H), bg_color)
    draw = ImageDraw.Draw(bg)

    # Subtle radial gradient overlay with accent color
    for r in range(600, 0, -2):
        alpha = int(40 * (r / 600))
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        od.ellipse(
            [W // 2 - r, H // 2 - r, W // 2 + r, H // 2 + r],
            fill=(*accent_color, alpha),
        )
        bg.paste(Image.alpha_composite(bg.convert("RGBA"), overlay).convert("RGB"))

    bg = bg.convert("RGBA")

    # Brand name
    brand_img = render_text_image(
        brand_name.upper(), str(FONTS["extrabold"]), 90,
        color=(255, 255, 255, 255), shadow=False, letter_spacing=3,
    )
    bx = (W - brand_img.width) // 2
    by = (H - brand_img.height) // 2 - 30
    bg.paste(brand_img, (bx, by), brand_img)

    # Tagline
    tag_img = render_text_image(
        tagline.upper(), str(FONTS["regular"]), 28,
        color=(255, 255, 255, 200), shadow=False, letter_spacing=5,
    )
    tx = (W - tag_img.width) // 2
    ty = by + brand_img.height + 16
    bg.paste(tag_img, (tx, ty), tag_img)

    return bg


# ─── DATA VISUALIZATION ──────────────────────────────────────────────────────

def render_bar_chart_frame(
    values: list,
    max_val: float,
    progress: float,  # 0.0 → 1.0 for animation
    bar_color: tuple = (100, 100, 220),
    canvas_size: tuple = (900, 600),
) -> Image.Image:
    """Render one frame of an animated bar chart on transparent background."""
    img = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    n = len(values)
    margin = 40
    bar_area_w = canvas_size[0] - 2 * margin
    bar_area_h = canvas_size[1] - 2 * margin
    bar_w = bar_area_w // (n * 2)
    gap = bar_w

    for i, val in enumerate(values):
        # Stagger: each bar starts its animation slightly later
        bar_progress = max(0, min(1, (progress - i * 0.08) / 0.6))
        # Ease-out
        bar_progress = 1 - (1 - bar_progress) ** 3

        bar_h = int((val / max_val) * bar_area_h * bar_progress)
        x = margin + i * (bar_w + gap)
        y = canvas_size[1] - margin - bar_h

        draw.rectangle([x, y, x + bar_w, canvas_size[1] - margin], fill=(*bar_color, 200))

    return img


# ─── BLUR / TRANSITION HELPERS ────────────────────────────────────────────────

def apply_gaussian_blur(img: Image.Image, radius: float) -> Image.Image:
    """Apply Gaussian blur to a PIL Image."""
    if radius <= 0:
        return img
    return img.filter(ImageFilter.GaussianBlur(radius=radius))


def ease_out_expo(t: float) -> float:
    """Exponential ease-out: fast start, slow finish."""
    return 1 - math.pow(2, -10 * t) if t < 1 else 1


def ease_in_out(t: float) -> float:
    """Smooth ease in-out."""
    return t * t * (3 - 2 * t)


# ─── MOVIEPY COMPOSITION HELPERS ─────────────────────────────────────────────

def pil_to_numpy(img: Image.Image) -> np.ndarray:
    """Convert PIL Image to numpy array for moviepy."""
    return np.array(img.convert("RGBA"))


def create_text_overlay_clip(
    text_img: Image.Image,
    start: float,
    duration: float,
    position: tuple,
    fade_in: float = 0.1,
    fade_out: float = 0.1,
    scale_slam: bool = False,
):
    """
    Create a moviepy ImageClip from a rendered text image with timing and animation.
    Returns a clip ready for compositing.

    NOTE: This function is called by Claude inline, not by this script directly.
    It demonstrates the pattern — Claude adapts it per keyword.
    """
    from moviepy import ImageClip
    from moviepy.video.fx import CrossFadeIn, CrossFadeOut

    arr = pil_to_numpy(text_img)
    clip = (
        ImageClip(arr, is_mask=False, transparent=True)
        .with_start(start)
        .with_duration(duration)
        .with_position(position)
    )

    effects = []
    if fade_in > 0:
        effects.append(CrossFadeIn(fade_in))
    if fade_out > 0:
        effects.append(CrossFadeOut(fade_out))
    if effects:
        clip = clip.with_effects(effects)

    return clip


# ─── MAIN COMPOSITION FLOW ───────────────────────────────────────────────────

def compose_preamble(config: dict, output_path: str):
    """
    Main composition function. Called by Claude with a config dict containing:

    {
        "source_video": "/path/to/raw_edit.mp4",
        "fps": 30,
        "keywords": [
            {
                "text": "TECHNOLOGY",
                "style": "slam",
                "start": 2.0,
                "duration": 1.3,
                "position": [60, 1250],
                "color": [255, 255, 255, 255],
                "font_size": 160
            },
            ...
        ],
        "cutaways": [
            {
                "type": "image",
                "path": "/path/to/higgsfield_generated.png",
                "start": 5.0,
                "duration": 4.0,
                "transition_in": "blur",
                "transition_out": "blur"
            },
            ...
        ],
        "end_card": {
            "brand_name": "DFCC BANK",
            "tagline": "CONVENIENCE OVER COMPLEXITY",
            "bg_color": [10, 10, 10],
            "accent_color": [227, 25, 55],
            "duration": 3.5
        },
        "theme_color": [227, 25, 55],
        "watermark": true
    }
    """
    from moviepy import (
        VideoFileClip, ImageClip, CompositeVideoClip,
        concatenate_videoclips,
    )
    from moviepy.video.fx import CrossFadeIn, CrossFadeOut

    # Load source
    source = VideoFileClip(config["source_video"])
    fps = config.get("fps", source.fps or 30)
    total_dur = source.duration

    clips = [source]

    # ── Watermark ──
    if config.get("watermark", True):
        wm_img = render_watermark()
        wm_arr = pil_to_numpy(wm_img)
        wm_clip = (
            ImageClip(wm_arr, transparent=True)
            .with_duration(total_dur)
            .with_position(("center", 50))
        )
        clips.append(wm_clip)

    # ── Keywords ──
    for kw in config.get("keywords", []):
        style = kw.get("style", "slam")
        text = kw["text"]
        font_size = kw.get("font_size", 160)
        color = tuple(kw.get("color", [255, 255, 255, 255]))

        if style == "slam":
            text_img = render_primary_slam(text, color=color, font_size=font_size)
        elif style == "compound":
            primary = kw.get("primary", text)
            context = kw.get("context", "")
            text_img = render_compound_block(primary, context, font_size, kw.get("context_size", 48))
        else:
            text_img = render_primary_slam(text, color=color, font_size=font_size)

        arr = pil_to_numpy(text_img)
        pos = tuple(kw.get("position", [60, 1250]))

        kw_clip = (
            ImageClip(arr, transparent=True)
            .with_start(kw["start"])
            .with_duration(kw["duration"])
            .with_position(pos)
            .with_effects([CrossFadeIn(0.1), CrossFadeOut(0.1)])
        )
        clips.append(kw_clip)

    # ── Cutaway screens ──
    for cut in config.get("cutaways", []):
        if cut["type"] == "image":
            cut_img = Image.open(cut["path"]).resize((W, H), Image.LANCZOS)
            cut_arr = np.array(cut_img.convert("RGB"))
            cut_clip = (
                ImageClip(cut_arr)
                .with_start(cut["start"])
                .with_duration(cut["duration"])
                .with_effects([CrossFadeIn(0.2), CrossFadeOut(0.2)])
            )
            clips.append(cut_clip)
        elif cut["type"] == "video":
            from moviepy import VideoFileClip as VFC
            cut_clip = (
                VFC(cut["path"])
                .subclipped(0, cut["duration"])
                .with_start(cut["start"])
                .with_effects([CrossFadeIn(0.2), CrossFadeOut(0.2)])
            )
            clips.append(cut_clip)

    # ── End card ──
    ec = config.get("end_card")
    if ec:
        ec_img = render_end_card(
            ec["brand_name"], ec["tagline"],
            bg_color=tuple(ec.get("bg_color", [10, 10, 10])),
            accent_color=tuple(ec.get("accent_color", [227, 25, 55])),
        )
        ec_arr = np.array(ec_img.convert("RGB"))
        ec_start = total_dur - ec["duration"]
        ec_clip = (
            ImageClip(ec_arr)
            .with_start(ec_start)
            .with_duration(ec["duration"])
            .with_effects([CrossFadeIn(0.33), CrossFadeOut(0.5)])
        )
        clips.append(ec_clip)

    # ── Composite ──
    final = CompositeVideoClip(clips, size=(W, H))
    final.write_videofile(
        output_path,
        fps=fps,
        codec="libx264",
        audio_codec="aac",
        bitrate="8M",
        logger="bar",
    )
    print(f"✅ Rendered: {output_path}")
    return output_path


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python compose_preamble.py <config.json> <output.mp4>")
        sys.exit(1)

    with open(sys.argv[1]) as f:
        config = json.load(f)

    compose_preamble(config, sys.argv[2])

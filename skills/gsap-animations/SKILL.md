# GSAP Animations Skill

When this skill is invoked, you MUST ask the user clarifying questions before writing any animation code. Use the AskUserQuestion tool to gather requirements.

## Required Questions (ALWAYS ASK)

Before implementing ANY animation, ask the user:

1. **What elements to animate?** - CSS selectors, component names, or element descriptions
2. **What type of animation?** - Choose from the categories below
3. **When should it trigger?** - On load, scroll, hover, click, or custom event
4. **Any specific timing preferences?** - Duration, delay, easing style

### Animation Categories to Present

When asking about animation type, present these options:

**Basic Animations:**
- Fade (in/out/cross-fade)
- Slide (up/down/left/right)
- Scale (grow/shrink/pulse)
- Rotate (spin/flip/wobble)
- Combined (fade + slide, scale + rotate, etc.)

**Advanced Animations:**
- Stagger (animate list items sequentially)
- Timeline (choreographed multi-step sequence)
- Morph (transform between shapes)
- Path (move along SVG path)
- Parallax (depth-based scroll effects)

**Scroll-Based:**
- Scroll-triggered (animate when element enters view)
- Scrub (animation linked to scroll position)
- Pin (freeze element while scrolling)
- Parallax layers (different speeds)
- Smooth scroll (momentum-based scrolling)

**Interactive:**
- Hover effects
- Click/tap animations
- Drag interactions
- Gesture responses

**Text Animations:**
- Typewriter effect
- Character-by-character reveal
- Word-by-word animation
- Line-by-line stagger
- Text morphing

**SVG Animations:**
- Draw stroke (line drawing effect)
- Morph shapes
- Path animation
- Fill transitions

---

## Installation

### CDN (All Plugins)
```html
<!-- Core -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>

<!-- Free Plugins -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/Draggable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/MotionPathPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/TextPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/Observer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollToPlugin.min.js"></script>

<!-- Club Plugins (require license) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/Flip.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollSmoother.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/DrawSVGPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/MorphSVGPlugin.min.js"></script>
```

### NPM
```bash
npm install gsap
```

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { Observer } from "gsap/Observer";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, Flip, Draggable, MotionPathPlugin, TextPlugin, Observer);
```

---

## Core Methods

### gsap.to() - Animate TO destination values
```javascript
gsap.to(".box", {
  x: 100,
  y: 50,
  rotation: 360,
  scale: 1.5,
  opacity: 0.5,
  duration: 1,
  ease: "power2.out"
});
```

### gsap.from() - Animate FROM starting values
```javascript
gsap.from(".box", {
  opacity: 0,
  y: -50,
  duration: 1
});
```

### gsap.fromTo() - Define both start and end
```javascript
gsap.fromTo(".box",
  { opacity: 0, x: -100 },
  { opacity: 1, x: 0, duration: 1 }
);
```

### gsap.set() - Instantly set properties (no animation)
```javascript
gsap.set(".box", { x: 100, opacity: 0.5 });
```

---

## All Animatable Properties

### Transform Properties
| Property | Description | Example |
|----------|-------------|---------|
| `x` | Horizontal position (px) | `x: 100` |
| `y` | Vertical position (px) | `y: -50` |
| `xPercent` | Horizontal position (%) | `xPercent: 50` |
| `yPercent` | Vertical position (%) | `yPercent: -100` |
| `rotation` | Rotation (degrees) | `rotation: 360` |
| `rotationX` | 3D X rotation | `rotationX: 45` |
| `rotationY` | 3D Y rotation | `rotationY: 180` |
| `rotationZ` | 3D Z rotation (same as rotation) | `rotationZ: 90` |
| `scale` | Uniform scale | `scale: 1.5` |
| `scaleX` | Horizontal scale | `scaleX: 2` |
| `scaleY` | Vertical scale | `scaleY: 0.5` |
| `skewX` | Horizontal skew (degrees) | `skewX: 20` |
| `skewY` | Vertical skew (degrees) | `skewY: 10` |
| `transformOrigin` | Transform pivot point | `transformOrigin: "center center"` |
| `transformPerspective` | 3D perspective | `transformPerspective: 500` |

### Appearance Properties
| Property | Description | Example |
|----------|-------------|---------|
| `opacity` | Transparency (0-1) | `opacity: 0.5` |
| `autoAlpha` | Opacity + visibility | `autoAlpha: 0` |
| `backgroundColor` | Background color | `backgroundColor: "#ff0000"` |
| `color` | Text color | `color: "blue"` |
| `borderRadius` | Corner radius | `borderRadius: "50%"` |
| `borderWidth` | Border thickness | `borderWidth: 2` |
| `boxShadow` | Shadow | `boxShadow: "0 10px 20px rgba(0,0,0,0.3)"` |
| `filter` | CSS filters | `filter: "blur(5px)"` |
| `clipPath` | Clip path | `clipPath: "circle(50%)"` |

### Size & Position
| Property | Description | Example |
|----------|-------------|---------|
| `width` | Element width | `width: 200` |
| `height` | Element height | `height: "50%"` |
| `top` | Top position | `top: 100` |
| `left` | Left position | `left: 50` |
| `right` | Right position | `right: 0` |
| `bottom` | Bottom position | `bottom: 20` |
| `padding` | Padding | `padding: 20` |
| `margin` | Margin | `margin: "10px 20px"` |

### Special Properties
| Property | Description | Example |
|----------|-------------|---------|
| `duration` | Animation length (seconds) | `duration: 1` |
| `delay` | Wait before starting | `delay: 0.5` |
| `ease` | Easing function | `ease: "power2.out"` |
| `stagger` | Offset for multiple targets | `stagger: 0.1` |
| `repeat` | Iterations (-1 = infinite) | `repeat: 2` |
| `repeatDelay` | Pause between repeats | `repeatDelay: 0.5` |
| `yoyo` | Reverse on repeat | `yoyo: true` |
| `paused` | Start paused | `paused: true` |
| `overwrite` | Handle conflicts | `overwrite: "auto"` |
| `immediateRender` | Render immediately | `immediateRender: false` |
| `lazy` | Lazy rendering | `lazy: true` |

### Callback Properties
| Property | Description | Example |
|----------|-------------|---------|
| `onStart` | Called when animation starts | `onStart: () => {}` |
| `onUpdate` | Called every frame | `onUpdate: () => {}` |
| `onComplete` | Called when finished | `onComplete: () => {}` |
| `onRepeat` | Called on each repeat | `onRepeat: () => {}` |
| `onReverseComplete` | Called when reversed | `onReverseComplete: () => {}` |
| `onStartParams` | Params for onStart | `onStartParams: [arg1, arg2]` |
| `onCompleteParams` | Params for onComplete | `onCompleteParams: ["done"]` |
| `callbackScope` | `this` scope for callbacks | `callbackScope: myObject` |

### Special Values
```javascript
x: "+=100"              // Relative: add 100
x: "-=50"               // Relative: subtract 50
x: "random(-100, 100)"  // Random between -100 and 100
x: "random(-100, 100, 5)" // Random with step of 5
rotation: "random([0, 90, 180, 270])" // Random from array
x: "50%"                // Percentage
x: "50vw"               // Viewport units
```

---

## All Easing Functions

Format: `ease: "name.direction"`

### Easing Names
| Name | Description |
|------|-------------|
| `none` | Linear, no easing |
| `power1` | Subtle acceleration (same as Quad) |
| `power2` | Moderate acceleration (same as Cubic) |
| `power3` | Strong acceleration (same as Quart) |
| `power4` | Very strong acceleration (same as Quint) |
| `back` | Overshoots then settles |
| `bounce` | Bounces like a ball |
| `circ` | Circular motion feel |
| `elastic` | Springy, elastic motion |
| `expo` | Exponential acceleration |
| `sine` | Sinusoidal, very smooth |
| `steps(n)` | Steps (n = number of steps) |

### Directions
| Direction | Description |
|-----------|-------------|
| `.in` | Start slow, end fast |
| `.out` | Start fast, end slow (most natural) |
| `.inOut` | Slow at both ends |

### Examples
```javascript
ease: "none"           // Linear
ease: "power1.out"     // Subtle ease out
ease: "power2.out"     // Smooth ease out (DEFAULT, most common)
ease: "power3.inOut"   // Strong ease in and out
ease: "back.out(1.7)"  // Overshoot (configurable)
ease: "elastic.out(1, 0.3)" // Elastic (amplitude, period)
ease: "bounce.out"     // Ball bounce
ease: "steps(12)"      // 12 discrete steps
ease: "slow(0.7, 0.7, false)" // SlowMo effect
ease: "rough({ strength: 1, points: 20 })" // Rough/shaky
```

---

## Timelines

### Basic Timeline
```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { y: 100, duration: 0.5 })
  .to(".box3", { rotation: 360, duration: 1 });
```

### Position Parameters
| Position | Description |
|----------|-------------|
| (none) | After previous animation ends |
| `"<"` | At start of previous animation |
| `">"` | At end of previous animation (same as default) |
| `"<0.5"` | 0.5s after previous starts |
| `">-0.5"` | 0.5s before previous ends |
| `"+=0.5"` | 0.5s after timeline ends |
| `"-=0.5"` | 0.5s before timeline ends |
| `2` | At exactly 2 seconds |
| `"myLabel"` | At label position |
| `"myLabel+=0.5"` | 0.5s after label |

```javascript
tl.to(".a", { x: 100 })
  .to(".b", { y: 100 }, "<")        // Starts with previous
  .to(".c", { opacity: 0 }, ">")    // Starts after previous ends
  .to(".d", { scale: 2 }, "+=0.5")  // 0.5s gap
  .to(".e", { x: 50 }, 2)           // At exactly 2 seconds
  .to(".f", { y: 50 }, "<0.5")      // 0.5s after previous starts
  .addLabel("middle")
  .to(".g", { rotation: 180 }, "middle");
```

### Timeline Controls
```javascript
const tl = gsap.timeline({ paused: true });

tl.play();              // Start playing
tl.pause();             // Pause
tl.resume();            // Resume from paused
tl.reverse();           // Play backwards
tl.restart();           // Restart from beginning
tl.seek(1.5);           // Jump to 1.5 seconds
tl.progress(0.5);       // Jump to 50%
tl.time(2);             // Jump to 2 seconds
tl.timeScale(2);        // 2x speed
tl.timeScale(0.5);      // Half speed
tl.kill();              // Destroy timeline
tl.invalidate();        // Clear recorded values
tl.clear();             // Remove all children
```

### Timeline Configuration
```javascript
const tl = gsap.timeline({
  repeat: -1,                    // Infinite loop
  repeatDelay: 1,                // 1s between repeats
  yoyo: true,                    // Reverse on repeat
  paused: true,                  // Start paused
  delay: 0.5,                    // Initial delay
  smoothChildTiming: true,       // Smooth timing adjustments
  autoRemoveChildren: false,     // Keep children after complete
  defaults: {                    // Default values for children
    duration: 1,
    ease: "power2.out"
  },
  onStart: () => console.log("Timeline started"),
  onUpdate: () => console.log("Frame update"),
  onComplete: () => console.log("Timeline complete"),
  onRepeat: () => console.log("Repeating"),
  onReverseComplete: () => console.log("Reversed complete")
});
```

### Nested Timelines
```javascript
function intro() {
  const tl = gsap.timeline();
  tl.from(".logo", { opacity: 0, y: -50 })
    .from(".tagline", { opacity: 0 });
  return tl;
}

function mainContent() {
  const tl = gsap.timeline();
  tl.from(".content", { opacity: 0, y: 50 })
    .from(".sidebar", { opacity: 0, x: 100 });
  return tl;
}

const master = gsap.timeline();
master
  .add(intro())
  .add(mainContent(), "+=0.5")
  .add(outro(), "-=0.2");
```

---

## ScrollTrigger Plugin

### Basic Usage
```javascript
gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  x: 500,
  scrollTrigger: ".box"  // Simple trigger
});
```

### Full Configuration
```javascript
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",           // Element that triggers
    start: "top 80%",          // When animation starts
    end: "bottom 20%",         // When animation ends
    scrub: true,               // Link to scroll (true or number for smoothing)
    pin: true,                 // Pin element during animation
    pinSpacing: true,          // Add spacing for pinned element
    anticipatePin: 1,          // Prepare pin in advance
    markers: true,             // Debug markers (remove in production!)
    toggleActions: "play pause resume reset",
    toggleClass: "active",     // Toggle CSS class
    snap: 1,                   // Snap to progress (0-1 or array)
    snap: {
      snapTo: [0, 0.5, 1],     // Snap points
      duration: 0.5,           // Snap duration
      ease: "power1.inOut"
    },
    onEnter: () => {},         // When trigger enters viewport
    onLeave: () => {},         // When trigger leaves viewport
    onEnterBack: () => {},     // When trigger re-enters from below
    onLeaveBack: () => {},     // When trigger leaves going up
    onUpdate: (self) => {},    // On scroll update
    onToggle: (self) => {},    // On active state change
    onScrubComplete: () => {}, // When scrub animation completes
    onRefresh: () => {},       // On ScrollTrigger refresh
    id: "my-trigger",          // Identifier
    invalidateOnRefresh: true, // Recalculate on refresh
    fastScrollEnd: true,       // Optimize end behavior
    preventOverlaps: true,     // Prevent overlapping triggers
  }
});
```

### Start/End Values
```javascript
start: "top top"        // Top of trigger at top of viewport
start: "top center"     // Top of trigger at center of viewport
start: "top 80%"        // Top of trigger at 80% down viewport
start: "center center"  // Centers aligned
start: "bottom top"     // Bottom of trigger at top of viewport
start: "top bottom-=100" // 100px offset
start: () => window.innerHeight / 2 // Function

end: "bottom top"       // Bottom of trigger at top of viewport
end: "+=500"            // 500px after start
end: "+=100%"           // 100% of trigger height after start
end: () => "+=" + document.querySelector(".box").offsetHeight
```

### toggleActions
Format: `"onEnter onLeave onEnterBack onLeaveBack"`

Values: `play`, `pause`, `resume`, `reset`, `restart`, `complete`, `reverse`, `none`

```javascript
toggleActions: "play none none none"    // Play once
toggleActions: "play pause resume reset" // Full control
toggleActions: "restart none restart none" // Restart each time
```

### With Timeline
```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    start: "top top",
    end: "+=1000",
    scrub: 1,
    pin: true
  }
});

tl.to(".box1", { x: 100 })
  .to(".box2", { y: 100 }, "<")
  .to(".box3", { rotation: 360 });
```

### Batch Animations
```javascript
ScrollTrigger.batch(".box", {
  onEnter: (elements) => {
    gsap.from(elements, {
      opacity: 0,
      y: 50,
      stagger: 0.1
    });
  },
  onLeave: (elements) => {
    gsap.to(elements, { opacity: 0 });
  }
});
```

### Horizontal Scroll
```javascript
const sections = gsap.utils.toArray(".panel");

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector(".container").offsetWidth
  }
});
```

### ScrollTrigger Utilities
```javascript
ScrollTrigger.create({ ... });          // Create standalone trigger
ScrollTrigger.getAll();                 // Get all instances
ScrollTrigger.getById("my-trigger");    // Get by ID
ScrollTrigger.refresh();                // Recalculate positions
ScrollTrigger.update();                 // Update on next tick
ScrollTrigger.sort();                   // Sort by start position
ScrollTrigger.clearScrollMemory();      // Clear cached scroll
ScrollTrigger.maxScroll(element);       // Get max scroll value
ScrollTrigger.scrollerProxy();          // Custom scroller
ScrollTrigger.matchMedia({              // Responsive breakpoints
  "(min-width: 800px)": function() {
    // Desktop animations
  },
  "(max-width: 799px)": function() {
    // Mobile animations
  }
});
```

---

## ScrollSmoother Plugin (Club)

### Setup
```html
<div id="smooth-wrapper">
  <div id="smooth-content">
    <!-- ALL CONTENT HERE -->
  </div>
</div>
```

```javascript
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
  smooth: 1,                 // Smoothing duration (seconds)
  effects: true,             // Enable data-speed/data-lag
  smoothTouch: 0.1,          // Touch device smoothing
  normalizeScroll: true,     // Fix mobile address bar issues
  ignoreMobileResize: true,  // Ignore mobile resize events
  ease: "expo"               // Easing function
});
```

### Parallax Effects
```html
<div data-speed="0.5">Moves at half speed</div>
<div data-speed="2">Moves at double speed</div>
<div data-speed="auto">Auto-calculated</div>
<div data-lag="0.5">Catches up with 0.5s delay</div>
```

```javascript
// Programmatic
smoother.effects(".box", { speed: 0.5, lag: 0.1 });
```

### Methods
```javascript
smoother.scrollTo(".section", true);  // Scroll to element (smooth)
smoother.scrollTo(500);               // Scroll to position
smoother.paused(true);                // Pause scrolling
smoother.getVelocity();               // Get scroll velocity
smoother.scrollTop();                 // Get current scroll
smoother.offset(".element", "top center"); // Get element offset
smoother.kill();                      // Destroy instance
```

---

## Flip Plugin (Club)

Animates layout changes seamlessly.

```javascript
gsap.registerPlugin(Flip);

// 1. Capture state
const state = Flip.getState(".boxes");

// 2. Make DOM changes
container.classList.toggle("reorder");
// or: parent.appendChild(element);
// or: element.classList.toggle("active");

// 3. Animate from old state to new state
Flip.from(state, {
  duration: 0.5,
  ease: "power1.inOut",
  stagger: 0.1,
  absolute: true,           // Use position:absolute during flip
  scale: true,              // Animate scale instead of width/height
  fade: true,               // Cross-fade entering/leaving elements
  nested: true,             // Handle nested flips
  spin: 1,                  // Add rotation
  toggleClass: "flipping",  // Add class during animation
  onEnter: elements => gsap.fromTo(elements, { opacity: 0 }, { opacity: 1 }),
  onLeave: elements => gsap.to(elements, { opacity: 0 })
});
```

### Flip.fit()
```javascript
// Resize element1 to match element2
Flip.fit(element1, element2, {
  scale: true,
  duration: 0.5
});
```

---

## Draggable Plugin

```javascript
gsap.registerPlugin(Draggable);

Draggable.create(".box", {
  type: "x,y",              // "x", "y", "x,y", "rotation", "top,left"
  bounds: "#container",     // Constrain to element
  bounds: { minX: 0, maxX: 500, minY: 0, maxY: 300 },
  inertia: true,            // Momentum (requires InertiaPlugin)
  edgeResistance: 0.65,     // Resistance at edges
  throwProps: true,         // Legacy inertia

  // Snapping
  snap: [0, 100, 200, 300], // Snap to values
  snap: {
    x: (value) => Math.round(value / 50) * 50,
    y: (value) => Math.round(value / 50) * 50
  },
  liveSnap: true,           // Snap while dragging

  // Behavior
  cursor: "grab",
  activeCursor: "grabbing",
  dragResistance: 0,        // Resistance while dragging
  zIndexBoost: true,        // Raise z-index while dragging
  allowContextMenu: false,
  allowEventDefault: false,
  clickableTest: (element) => true,

  // Callbacks
  onPress: function() {},
  onDragStart: function() {},
  onDrag: function() {},
  onDragEnd: function() {},
  onRelease: function() {},
  onThrowUpdate: function() {},
  onThrowComplete: function() {}
});
```

### Draggable Methods
```javascript
const draggable = Draggable.get(".box");
draggable.enable();
draggable.disable();
draggable.kill();
draggable.update();
draggable.startDrag(event);
draggable.endDrag(event);

// Properties
draggable.x;
draggable.y;
draggable.rotation;
draggable.isPressed;
draggable.isDragging;
draggable.isThrowing;
```

### Hit Testing
```javascript
if (Draggable.hitTest(element1, element2, "50%")) {
  // Elements overlap by at least 50%
}
```

---

## MotionPath Plugin

```javascript
gsap.registerPlugin(MotionPathPlugin);

gsap.to(".element", {
  duration: 5,
  motionPath: {
    path: "#svgPath",           // SVG path element
    // OR
    path: "M0,0 C100,0 100,100 200,100", // Path data string
    // OR
    path: [{x:0,y:0}, {x:100,y:50}, {x:200,y:0}], // Coordinates

    align: "#svgPath",          // Align element to path
    alignOrigin: [0.5, 0.5],    // Alignment point
    autoRotate: true,           // Rotate along path
    autoRotate: 90,             // Rotate with 90° offset
    start: 0,                   // Start position (0-1)
    end: 1,                     // End position (0-1)
    curviness: 1,               // Curve intensity (for coordinates)
    type: "cubic",              // Bezier type
    offsetX: 0,
    offsetY: 0
  },
  ease: "power1.inOut"
});
```

### Convert to Path
```javascript
MotionPathPlugin.convertToPath("circle, rect, ellipse, line, polyline, polygon");
```

### Get Path Data
```javascript
const rawPath = MotionPathPlugin.getRawPath("#path");
const point = MotionPathPlugin.getPositionOnPath(rawPath, 0.5); // {x, y, angle}
```

---

## Observer Plugin

Detects scroll, touch, and pointer events.

```javascript
gsap.registerPlugin(Observer);

Observer.create({
  target: window,                  // Element to observe
  type: "wheel,touch,pointer",     // Event types

  // Directional callbacks
  onUp: () => previousSlide(),
  onDown: () => nextSlide(),
  onLeft: () => {},
  onRight: () => {},

  // General callbacks
  onChange: (self) => {
    console.log(self.deltaX, self.deltaY);
    console.log(self.velocityX, self.velocityY);
  },
  onChangeX: (self) => {},
  onChangeY: (self) => {},
  onDrag: (self) => {},
  onDragStart: (self) => {},
  onDragEnd: (self) => {},
  onStop: (self) => {},
  onPress: (self) => {},
  onRelease: (self) => {},
  onHover: (self) => {},
  onHoverEnd: (self) => {},
  onClick: (self) => {},
  onWheel: (self) => {},
  onMove: (self) => {},

  // Configuration
  tolerance: 10,                  // Min distance to trigger
  preventDefault: true,
  ignore: "input, textarea",      // Ignore these elements
  wheelSpeed: 1,
  dragMinimum: 3,
  debounce: true,
  lockAxis: false,
  capture: false,
  onStopDelay: 0.25
});
```

---

## TextPlugin

```javascript
gsap.registerPlugin(TextPlugin);

// Simple text replacement
gsap.to(".element", {
  duration: 2,
  text: "New text content",
  ease: "none"
});

// Advanced options
gsap.to(".element", {
  duration: 2,
  text: {
    value: "New text content",
    delimiter: "",           // Character-by-character (default)
    delimiter: " ",          // Word-by-word
    type: "diff",           // Only animate changed characters
    speed: 1,               // Auto-adjust duration based on changes
    newClass: "new-char",   // Class for new characters
    oldClass: "old-char",   // Class for old characters
    padSpace: true,         // Pad with non-breaking spaces
    preserveSpaces: true,   // Keep extra spaces
    rtl: false              // Right-to-left
  }
});
```

---

## SplitText Plugin (Club)

```javascript
gsap.registerPlugin(SplitText);

// Create split
const split = SplitText.create(".text", {
  type: "chars, words, lines",   // What to split
  mask: "lines",                 // Wrap in clipping container
  autoSplit: true,               // Re-split on resize/font load
  onSplit: (self) => {           // Callback after split
    return gsap.from(self.chars, {
      opacity: 0,
      y: 50,
      stagger: 0.02
    });
  },
  aria: "auto",                  // Accessibility
  deepSlice: true                // Handle nested elements
});

// Access split elements
split.chars;    // Array of character elements
split.words;    // Array of word elements
split.lines;    // Array of line elements

// Animate
gsap.from(split.chars, {
  opacity: 0,
  y: 100,
  stagger: 0.02,
  duration: 0.5,
  ease: "back.out"
});

// Revert
split.revert();
```

---

## DrawSVG Plugin (Club)

```javascript
gsap.registerPlugin(DrawSVGPlugin);

// Draw from nothing to full
gsap.from(".svg-path", {
  duration: 2,
  drawSVG: 0               // Start from 0%
});

// Draw to specific range
gsap.to(".svg-path", {
  duration: 2,
  drawSVG: "20% 80%"       // Visible between 20%-80%
});

// Draw from center
gsap.fromTo(".svg-path",
  { drawSVG: "50% 50%" },  // Start from center
  { drawSVG: "0% 100%", duration: 2 }
);

// Animate dash along path
gsap.fromTo(".svg-path",
  { drawSVG: "0 5%" },
  { drawSVG: "95% 100%", duration: 2 }
);

// Live update (for responsive)
gsap.to(".svg-path", {
  drawSVG: "20% 70% live"
});

// Stagger multiple paths
gsap.from(".paths path", {
  drawSVG: 0,
  duration: 1,
  stagger: 0.2
});
```

---

## MorphSVG Plugin (Club)

```javascript
gsap.registerPlugin(MorphSVGPlugin);

// Basic morph
gsap.to("#circle", {
  duration: 2,
  morphSVG: "#star"
});

// With configuration
gsap.to("#shape1", {
  duration: 2,
  morphSVG: {
    shape: "#shape2",
    type: "rotational",          // "linear" or "rotational"
    origin: "50% 50%",           // Rotation origin
    shapeIndex: 5,               // Alignment offset
    map: "size",                 // "size", "position", "complexity"
    smooth: true,                // Add smoothing points
    smooth: { points: 80 },      // Custom smoothing
  }
});

// Convert shapes to paths
MorphSVGPlugin.convertToPath("#rect, #circle, #ellipse");
```

---

## Utility Methods

### gsap.utils.toArray()
```javascript
const boxes = gsap.utils.toArray(".box");
// Converts NodeList, selector, or single element to Array
```

### gsap.utils.clamp()
```javascript
const clamp = gsap.utils.clamp(0, 100);
clamp(150);  // 100
clamp(-50);  // 0
```

### gsap.utils.mapRange()
```javascript
const map = gsap.utils.mapRange(0, 100, 0, 1);
map(50);  // 0.5
```

### gsap.utils.wrap()
```javascript
const wrap = gsap.utils.wrap(0, 5);
wrap(7);  // 2 (wraps around)

const wrapArray = gsap.utils.wrap(["a", "b", "c"]);
wrapArray(4);  // "b"
```

### gsap.utils.random()
```javascript
gsap.utils.random(0, 100);           // Random 0-100
gsap.utils.random(0, 100, 5);        // With 5 step
gsap.utils.random([1, 5, 10, 20]);   // Random from array
gsap.utils.random(0, 100, true);     // Returns reusable function
```

### gsap.utils.snap()
```javascript
const snap = gsap.utils.snap(10);
snap(23);  // 20

const snapArray = gsap.utils.snap([0, 50, 100, 150]);
snapArray(80);  // 100
```

### gsap.utils.interpolate()
```javascript
const interp = gsap.utils.interpolate(0, 100);
interp(0.5);  // 50

// Works with colors, objects, etc.
const colorInterp = gsap.utils.interpolate("#ff0000", "#0000ff");
colorInterp(0.5);  // "#800080"
```

### gsap.utils.distribute()
```javascript
gsap.to(".box", {
  x: gsap.utils.distribute({
    base: 0,
    amount: 500,
    from: "center",   // "start", "end", "center", "edges", "random", or index
    ease: "power1.in"
  })
});
```

### gsap.utils.shuffle()
```javascript
const arr = [1, 2, 3, 4, 5];
gsap.utils.shuffle(arr);  // Shuffles in place
```

### gsap.utils.selector()
```javascript
const select = gsap.utils.selector("#container");
gsap.to(select(".box"), { x: 100 });  // Only selects .box inside #container
```

### gsap.utils.pipe()
```javascript
const transform = gsap.utils.pipe(
  gsap.utils.clamp(0, 100),
  gsap.utils.snap(5)
);
transform(97);  // 95
```

---

## gsap.context() - Framework Cleanup

```javascript
// Basic usage
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 100 });
  gsap.from(".title", { opacity: 0 });
  ScrollTrigger.create({ ... });
});

// Cleanup all animations in context
ctx.revert();

// With scope (limits selectors)
const ctx = gsap.context(() => {
  gsap.to(".box", { x: 100 });  // Only .box inside scopeElement
}, scopeElement);

// React example
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
  }, containerRef);

  return () => ctx.revert();
}, []);

// Vue example
onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
  }, container.value);
});

onUnmounted(() => {
  ctx.revert();
});
```

### React useGSAP Hook
```javascript
import { useGSAP } from "@gsap/react";

function Component() {
  const container = useRef();

  useGSAP(() => {
    gsap.to(".box", { x: 100 });
  }, { scope: container });

  return <div ref={container}><div className="box" /></div>;
}
```

---

## gsap.matchMedia() - Responsive

```javascript
const mm = gsap.matchMedia();

mm.add("(min-width: 800px)", () => {
  // Desktop animations
  gsap.to(".box", { x: 500 });

  return () => {
    // Cleanup when no longer matches
  };
});

mm.add("(max-width: 799px)", () => {
  // Mobile animations
  gsap.to(".box", { x: 100 });
});

mm.add({
  isDesktop: "(min-width: 800px)",
  isMobile: "(max-width: 799px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { isDesktop, isMobile, reduceMotion } = context.conditions;

  if (reduceMotion) {
    gsap.set(".box", { opacity: 1 });
  } else if (isDesktop) {
    gsap.to(".box", { x: 500, duration: 1 });
  } else {
    gsap.to(".box", { x: 100, duration: 0.5 });
  }
});

// Cleanup
mm.revert();
```

---

## Common Animation Patterns

### Page Load Sequence
```javascript
const tl = gsap.timeline();

tl.from(".logo", { opacity: 0, y: -50, duration: 0.5 })
  .from(".nav-item", { opacity: 0, y: -20, stagger: 0.1 }, "-=0.2")
  .from(".hero-title", { opacity: 0, x: -100, duration: 0.8 }, "-=0.3")
  .from(".hero-text", { opacity: 0, duration: 0.5 }, "-=0.4")
  .from(".cta-button", { opacity: 0, scale: 0.5, ease: "back.out" }, "-=0.2");
```

### Scroll-Triggered Sections
```javascript
gsap.utils.toArray(".section").forEach((section) => {
  gsap.from(section.querySelectorAll(".fade-in"), {
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});
```

### Infinite Marquee
```javascript
const marquee = document.querySelector(".marquee");
const content = marquee.querySelector(".content");
const contentWidth = content.offsetWidth;

gsap.to(content, {
  x: -contentWidth,
  duration: 20,
  ease: "none",
  repeat: -1,
  modifiers: {
    x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
  }
});
```

### Magnetic Button
```javascript
const button = document.querySelector(".magnetic");
const bounds = button.getBoundingClientRect();

button.addEventListener("mousemove", (e) => {
  const x = e.clientX - bounds.left - bounds.width / 2;
  const y = e.clientY - bounds.top - bounds.height / 2;

  gsap.to(button, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3
  });
});

button.addEventListener("mouseleave", () => {
  gsap.to(button, { x: 0, y: 0, duration: 0.3 });
});
```

### Card Flip
```javascript
const card = document.querySelector(".card");
const tl = gsap.timeline({ paused: true });

tl.to(".card-front", { rotationY: 180, duration: 0.6 })
  .to(".card-back", { rotationY: 0, duration: 0.6 }, 0);

card.addEventListener("click", () => {
  tl.reversed() ? tl.play() : tl.reverse();
});
```

### Counter Animation
```javascript
const counter = { value: 0 };
const target = document.querySelector(".counter");

gsap.to(counter, {
  value: 1000,
  duration: 2,
  ease: "power1.out",
  onUpdate: () => {
    target.textContent = Math.round(counter.value);
  }
});
```

### Reveal on Scroll (Clip Path)
```javascript
gsap.from(".reveal", {
  clipPath: "inset(0 100% 0 0)",
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".reveal",
    start: "top 80%"
  }
});
```

---

## Best Practices

1. **Use transforms** - `x`, `y`, `scale`, `rotation` instead of `left`, `top`, `width`, `height`
2. **Use `autoAlpha`** - Combines `opacity` with `visibility` for better performance
3. **Register plugins** - Always `gsap.registerPlugin()` before using
4. **Use `gsap.context()`** - Essential for React/Vue cleanup
5. **Remove markers** - Always remove `markers: true` in production
6. **Use `overwrite: "auto"`** - Prevents conflicting tweens
7. **Batch with stagger** - Use `stagger` instead of loops
8. **Use `will-change`** - Add `will-change: transform` to heavily animated elements
9. **Test reduced motion** - Respect `prefers-reduced-motion`
10. **Use `invalidateOnRefresh`** - For responsive ScrollTriggers
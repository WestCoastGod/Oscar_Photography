import type { P5CanvasInstance, SketchProps } from "react-p5-wrapper";

export const sketch = (p: P5CanvasInstance<SketchProps>) => {
  let grfx: any[] = [];
  let gOptionCount = 17; // Should be consistent with M_Grfx and other uses
  let bkgdColor: any, foreColor: any, typeColor: any;
  let color1: any, color2: any, color3: any;

  let darkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // This function attempts to create a global LCG state, which might help
  // if some p5 internals or legacy code expect it globally.
  function ensureLcgRandomGlobals() {
    if (!(window as any)._lcg_random) {
      (window as any)._lcg_random = {
        _lcg_random_state: Math.random() * 2147483648,
      }; // Initialize with a random seed
    }
    const desc = Object.getOwnPropertyDescriptor(window, "_lcg_random_state");
    if (!desc || !desc.get) {
      Object.defineProperty(window, "_lcg_random_state", {
        get() {
          return (window as any)._lcg_random._lcg_random_state;
        },
        set(val) {
          (window as any)._lcg_random._lcg_random_state = val;
        },
        configurable: true,
      });
    }
    // Also ensure p5 instance has its own LCG state if it relies on it.
    // p5 typically initializes this itself.
    if ((p as any)._lcg_random_state === undefined) {
      (p as any)._lcg_random_state = Math.random() * 2147483648;
    }
  }

  function updateColors() {
    // Updated background colors
    bkgdColor = darkMode ? p.color(0) : p.color(255); // Black for dark, White for light

    // Updated graph colors to shades of grey
    // You can use the same grey or vary them slightly
    const grey1 = p.color(128); // Mid-grey
    const grey2 = p.color(150);
    const grey3 = p.color(100);

    foreColor = grey1;
    typeColor = grey1; // Assuming typeColor also becomes grey

    color1 = grey1;
    color2 = grey2;
    color3 = grey3;

    // Sync to window for legacy code
    (window as any).bkgdColor = bkgdColor;
    (window as any).foreColor = foreColor;
    (window as any).typeColor = typeColor;
    (window as any).color1 = color1;
    (window as any).color2 = color2;
    (window as any).color3 = color3;
  }

  function generateGrfx() {
    if (typeof (window as any).M_Grfx !== "function") {
      console.warn(
        "M_Grfx class not found on window. Ensure m_grfx.js is loaded and window.M_Grfx is set."
      );
      return;
    }
    // Use p.random which is correctly bound
    let r_type = p.floor(p.random(gOptionCount));
    let x = p.random(p.width);
    let y = p.random(p.height);
    try {
      // M_Grfx constructor will use global p5 functions (e.g., random, color)
      let newGraphic = new (window as any).M_Grfx(x, y, r_type);
      grfx.push(newGraphic);
    } catch (e) {
      console.error("Error creating new M_Grfx instance in generateGrfx:", e);
    }
  }

  p.setup = () => {
    ensureLcgRandomGlobals(); // Call this early

    // --- Shim p5 properties and constants ---
    const p5PropsAndConsts = [
      "PI",
      "TWO_PI",
      "HALF_PI",
      "QUARTER_PI",
      "TAU",
      "CENTER",
      "RADIUS",
      "CORNER",
      "CORNERS",
      "RGB",
      "HSB",
      "HSL",
      "NORMAL",
      "ITALIC",
      "BOLD",
      "BOLDITALIC",
      "POINTS",
      "LINES",
      "TRIANGLES",
      "TRIANGLE_FAN",
      "TRIANGLE_STRIP",
      "QUADS",
      "QUAD_STRIP",
      "CLOSE",
      "OPEN",
      "WEBGL",
      "P2D",
      // Add any other constants your legacy code might use
    ];
    p5PropsAndConsts.forEach((prop) => {
      if ((p as any)[prop] !== undefined) {
        (window as any)[prop] = (p as any)[prop];
      }
    });

    // --- Shim p5 functions (bound to p) ---
    const p5FunctionsToShim = [
      "random",
      "round",
      "floor",
      "ceil",
      "map",
      "lerp",
      "sin",
      "cos",
      "tan",
      "asin",
      "acos",
      "atan",
      "atan2",
      "createGraphics",
      "color",
      "textSize",
      "textFont",
      "textWidth",
      "textAlign",
      "textLeading",
      "textStyle",
      "text",
      "noStroke",
      "stroke",
      "strokeWeight",
      "strokeCap",
      "strokeJoin",
      "fill",
      "noFill",
      "ellipse",
      "rect",
      "line",
      "point",
      "quad",
      "triangle",
      "arc",
      "beginShape",
      "vertex",
      "curveVertex",
      "bezierVertex",
      "quadraticVertex",
      "endShape",
      "push",
      "pop",
      "translate",
      "rotate",
      "scale",
      "shearX",
      "shearY",
      "rotateX",
      "rotateY",
      "rotateZ", // For WEBGL
      "image",
      "tint",
      "noTint",
      "imageMode",
      "texture",
      "textureMode",
      "textureWrap",
      "loadFont",
      "loadImage", // Async, ensure callbacks are handled if used directly by legacy
      "print", // for debugging
      // Add any other p5 functions your legacy code uses
    ];

    p5FunctionsToShim.forEach((fnName) => {
      if (typeof (p as any)[fnName] === "function") {
        (window as any)[fnName] = (p as any)[fnName].bind(p);
      }
    });

    // --- Shim p5 properties that change (like width, height, frameCount) ---
    (window as any).width = p.width; // Initial width
    (window as any).height = p.height; // Initial height
    (window as any).frameCount = 0; // Initial frameCount

    // --- Global variables for your legacy clutter_js scripts ---
    (window as any).gOptionCount = gOptionCount;
    (window as any).pg_grfx = []; // Initialize if textures.js expects it
    (window as any).pgT = []; // Initialize if textures.js expects it
    (window as any).grfx = grfx;

    // Initialize and sync colors
    updateColors();

    let cnv = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    const canvasParent = document.getElementById("about-bg-canvas");
    if (canvasParent) {
      cnv.parent(canvasParent);
    } else {
      console.error("Parent canvas 'about-bg-canvas' not found.");
    }

    p.frameRate(30);
    if ((p as any).textureMode) p.textureMode(p.NORMAL);

    if (window.matchMedia) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {
          darkMode = event.matches;
          updateColors();
        });
    }

    // Initialize graphics
    grfx.length = 0;
    for (let i = 0; i < 16; i++) {
      generateGrfx();
    }
  };

  p.draw = () => {
    (window as any).frameCount = p.frameCount;
    (window as any).width = p.width;
    (window as any).height = p.height;
    (window as any).deltaTime = p.deltaTime;
    (window as any).keyIsPressed = p.keyIsPressed;
    (window as any).key = p.key;
    (window as any).keyCode = p.keyCode;

    p.background(bkgdColor);
    p.translate(-p.width / 2, -p.height / 2);

    p.push();
    for (let i = 0; i < grfx.length; i++) {
      const graphicItem = grfx[i];
      if (graphicItem && typeof graphicItem.display === "function") {
        graphicItem.display();
      }
      if (graphicItem && typeof graphicItem.glide === "function") {
        graphicItem.glide();
      }
    }
    p.pop();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.keyPressed = () => {
    generateGrfx();
  };
};

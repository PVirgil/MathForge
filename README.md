# ∑ MathForge

### Learn. Solve. Graph. Practice. Master.

**MathForge** is an interactive mathematics workspace built to help students understand math—not just find answers.

It brings lessons, equation solving, graphing, guided help, practice questions, and progress tracking together in one focused experience.

> **Understand math. Not just answers.**

---

## About MathForge

MathForge was designed around a simple idea: learning mathematics should involve more than entering a problem and receiving an answer.

Instead, MathForge gives learners several ways to interact with mathematics:

- **Learn** concepts through concise lessons and worked examples
- **Solve** equations with built-in mathematical tools
- **Graph** functions to visualize mathematical relationships
- **Practice** with continuously generated questions
- **Track progress** and accuracy over time

Everything is designed to work together as a lightweight math workspace without requiring an account.

---

## Features

### 📚 Interactive Lessons

MathForge includes lessons across **12 mathematical subjects**, ranging from foundational arithmetic to advanced topics.

Current subjects include:

- Arithmetic
- Algebra
- Geometry
- Trigonometry
- Functions
- Calculus
- Statistics
- Probability
- Linear Algebra
- Discrete Mathematics
- Number Theory
- Precalculus

Each topic includes:

- A concise introduction
- Core concepts
- A worked example
- A quick self-check

The goal is to provide enough explanation to build intuition without overwhelming the learner.

---

### 🧮 Linear Equation Solver

Solve one-variable linear equations such as:

```text
3x + 7 = 22
```

MathForge determines the solution and explains the simplified relationship used to reach it.

It can also recognize special cases such as:

- One solution
- No solution
- Infinitely many solutions

---

### 📐 Quadratic Equation Solver

Enter the coefficients of:

```text
ax² + bx + c = 0
```

MathForge calculates the discriminant and determines whether the equation has:

- Two real roots
- One repeated real root
- Two complex roots

The result includes both the roots and information about what the discriminant means.

---

### 🔢 Scientific Calculator

MathForge includes a browser-based scientific expression calculator supporting:

```text
+  -  *  /  ^
```

along with:

```text
sin()
cos()
tan()
asin()
acos()
atan()
sqrt()
abs()
log()
ln()
exp()
floor()
ceil()
round()
```

It also supports mathematical constants including:

```text
π
e
```

Example:

```text
sqrt(144) + 2^5
```

---

### 💡 Guided Tutor

The Guided Tutor provides targeted hints for common mathematical topics.

It currently recognizes questions involving areas such as:

- Linear equations
- Quadratic equations
- Percentages
- Derivatives
- Right triangles
- The Pythagorean theorem

Rather than simply returning an answer, the tutor focuses on suggesting the mathematical idea or next step that can help solve the problem.

The current tutor is intentionally lightweight and rule-based rather than presented as a full AI system.

---

### 📈 Function Grapher

MathForge includes an interactive canvas-based function grapher.

Try functions such as:

```text
x^2
2x + 3
sin(x)
cos(x)
1/x
sqrt(abs(x))
```

Users can independently adjust:

- X minimum
- X maximum
- Y minimum
- Y maximum

The graph automatically redraws as the viewing range changes, making it useful for exploring the behavior and structure of functions.

---

### ✏️ Infinite Practice

MathForge generates practice questions directly in the browser.

Current practice categories include:

- Arithmetic
- Linear equations
- Percentages
- Geometry

Questions are generated dynamically, allowing practice sessions to continue indefinitely rather than relying on a fixed question bank.

Answers are checked immediately and session accuracy updates as you work.

---

### 📊 Progress Tracking

MathForge keeps track of:

- Questions answered
- Correct answers
- Overall accuracy
- Lessons opened
- Current practice-session score

Progress is stored locally in the browser.

There is no account requirement, and MathForge does not need to upload learning progress to a remote server.

Users can reset their saved progress at any time.

---

### 🌙 Light & Dark Themes

MathForge includes both dark and light interfaces.

The selected theme is remembered locally so the interface remains consistent between visits.

---

## Privacy by Design

MathForge is intentionally designed to perform its core functionality locally in the browser.

The current version does not require:

- User accounts
- Sign-ins
- Personal profiles
- Cloud progress storage
- API keys

Practice history and learning progress are stored using the browser's local storage.

This keeps the experience fast, simple, and private.

---

## How MathForge Works

MathForge is built with standard web technologies:

- **HTML5** for structure
- **CSS3** for the responsive interface and visual system
- **Vanilla JavaScript** for application logic
- **Canvas API** for function graphing
- **LocalStorage** for progress and theme persistence

The mathematical engine handles equation solving, expression evaluation, graph calculations, practice generation, and guided hints directly in the browser.

No large frontend framework is required.

---

## Project Philosophy

Many mathematical tools are excellent at producing answers.

MathForge is interested in the step before that:

**helping the learner understand what the mathematics is doing.**

The project is built around four principles:

### Understand before memorizing

Worked examples and explanations should reveal the structure behind a problem rather than encourage memorization alone.

### Visualize when possible

Functions become easier to understand when learners can see how changing an equation changes its graph.

### Practice actively

Understanding becomes mastery through repeated problem solving and immediate feedback.

### Keep the workspace focused

MathForge intentionally avoids unnecessary complexity so that mathematics remains the center of the experience.

---

## Current Scope

MathForge is an evolving educational project.

The current version provides a functional foundation for an all-in-one mathematics workspace, but it is not intended to replace a complete mathematics curriculum, professional computer algebra system, or human instructor.

Some areas are deliberately lightweight.

For example, the Guided Tutor currently uses local topic recognition and predefined mathematical guidance rather than a generative AI model.

That distinction is intentional: MathForge aims to be transparent about what its tools actually do.

---

## Potential Future Directions

MathForge has room to expand considerably.

Possible future additions include:

- Step-by-step symbolic equation solving
- Expanded lesson libraries
- More advanced algebra and calculus tools
- Interactive geometry
- Graph transformations
- Multiple simultaneous functions
- Saved graph configurations
- Adaptive practice difficulty
- Topic-specific practice modes
- Achievements and learning streaks
- More detailed mastery analytics
- Accessibility improvements
- Keyboard-focused workflows
- Optional cloud synchronization
- Personalized learning paths
- AI-assisted mathematical tutoring

The long-term concept is a mathematics workspace that can grow with the learner—from foundational arithmetic through increasingly advanced mathematics.

---

## Who Is MathForge For?

MathForge may be useful for:

**Students** who want a simple place to learn, experiment, and practice.

**Self-learners** revisiting mathematics or exploring new subjects independently.

**Teachers and tutors** looking for a lightweight supplementary tool.

**Developers and educators** interested in browser-based educational software and interactive mathematics.

**Anyone curious about math** who wants to experiment without creating an account or setting up specialized software.

---

## Technology Highlights

One of the goals of MathForge is demonstrating how much functionality can be created with a relatively small, dependency-light web application.

The project includes:

- Custom linear equation parsing
- Quadratic root calculation
- Mathematical expression evaluation
- Dynamic Canvas graph rendering
- Procedural practice-question generation
- Local progress persistence
- Theme persistence
- Responsive layouts
- Interactive lesson dialogs
- Rule-based tutoring guidance

All of these systems work together inside the browser.

---

## Project Structure

At a high level, MathForge consists of four major systems:

```text
MathForge
│
├── Learning
│   ├── 12 subject areas
│   ├── Core concepts
│   ├── Worked examples
│   └── Quick checks
│
├── Mathematical Tools
│   ├── Linear solver
│   ├── Quadratic solver
│   ├── Scientific calculator
│   └── Guided tutor
│
├── Visualization
│   └── Function grapher
│
└── Practice & Progress
    ├── Generated questions
    ├── Answer checking
    ├── Session scoring
    └── Local progress tracking
```

---

## Contributing

MathForge is an evolving project, and thoughtful improvements are welcome.

Useful contribution areas include:

- New lesson content
- Additional mathematical topics
- Improved equation parsing
- New practice-question generators
- Graphing improvements
- Accessibility enhancements
- Mobile usability improvements
- Mathematical accuracy testing
- UI/UX improvements

When contributing mathematical functionality, accuracy and clear explanation should take priority over simply adding more features.

---

## Feedback

If you try MathForge and find:

- A mathematical error
- A confusing explanation
- A graphing edge case
- A usability issue
- An accessibility problem
- A feature that would meaningfully improve learning

feedback is welcome.

MathForge is intended to improve through real use and experimentation.

---

## Built for Curious Minds

MathForge is an exploration of what a focused, modern mathematics workspace can look like when learning, solving, visualization, and practice are treated as parts of the same experience.

**Learn the idea.  
Solve the problem.  
See the structure.  
Practice the skill.  
Master the math.**

---

**MathForge** ∑  
*Understand math. Not just answers.*

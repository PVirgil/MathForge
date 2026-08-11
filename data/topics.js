window.MATHFORGE_TOPICS = [
  {
    "id": "arithmetic",
    "icon": "123",
    "title": "Arithmetic",
    "description": "Numbers, fractions, ratios, percentages, and powers.",
    "level": "Foundations",
    "intro": "Arithmetic is the language of quantity. Strong arithmetic is less about speed than recognizing useful relationships between numbers.",
    "key": [
      "Use order of operations consistently.",
      "Fractions are another way to express division.",
      "Percent means per hundred."
    ],
    "example": "To find 15% of 80, calculate 0.15 × 80 = 12.",
    "checkQuestion": "What is 25% of 60?",
    "checkAnswer": "15"
  },
  {
    "id": "algebra",
    "icon": "x",
    "title": "Algebra",
    "description": "Expressions, equations, inequalities, and functions.",
    "level": "Core",
    "intro": "Algebra uses symbols to represent unknown quantities and relationships. Solving means finding values that make a statement true.",
    "key": [
      "Perform the same valid operation on both sides.",
      "Combine like terms before isolating the variable.",
      "Check a solution by substituting it back."
    ],
    "example": "For 3x + 7 = 22, subtract 7 to get 3x = 15, then divide by 3: x = 5.",
    "checkQuestion": "Solve 2x + 4 = 14.",
    "checkAnswer": "5"
  },
  {
    "id": "geometry",
    "icon": "△",
    "title": "Geometry",
    "description": "Shapes, angles, area, similarity, and spatial reasoning.",
    "level": "Core",
    "intro": "Geometry studies size, shape, position, and spatial relationships.",
    "key": [
      "Triangle angles sum to 180°.",
      "Area measures two-dimensional space.",
      "The Pythagorean theorem applies only to right triangles."
    ],
    "example": "A right triangle with legs 3 and 4 has hypotenuse √(3² + 4²) = 5.",
    "checkQuestion": "A right triangle has legs 5 and 12. Its hypotenuse?",
    "checkAnswer": "13"
  },
  {
    "id": "trigonometry",
    "icon": "θ",
    "title": "Trigonometry",
    "description": "Sine, cosine, tangent, identities, and waves.",
    "level": "Intermediate",
    "intro": "Trigonometry connects angles to ratios of side lengths and extends naturally to periodic motion.",
    "key": [
      "sin θ = opposite / hypotenuse.",
      "cos θ = adjacent / hypotenuse.",
      "tan θ = opposite / adjacent."
    ],
    "example": "If opposite = 3 and hypotenuse = 5, then sin θ = 3/5 = 0.6.",
    "checkQuestion": "If opposite = 4 and hypotenuse = 5, sin θ = ?",
    "checkAnswer": "0.8"
  },
  {
    "id": "functions",
    "icon": "f",
    "title": "Functions",
    "description": "Inputs, outputs, transformations, inverses, and composition.",
    "level": "Intermediate",
    "intro": "A function assigns each allowed input exactly one output.",
    "key": [
      "Domain describes valid inputs.",
      "Range describes possible outputs.",
      "Graph transformations shift, stretch, compress, or reflect."
    ],
    "example": "If f(x) = x² + 1, then f(3) = 10.",
    "checkQuestion": "If f(x)=2x+1, what is f(4)?",
    "checkAnswer": "9"
  },
  {
    "id": "calculus",
    "icon": "∫",
    "title": "Calculus",
    "description": "Limits, derivatives, integrals, and change.",
    "level": "Advanced",
    "intro": "Calculus studies change and accumulation. Derivatives measure local rates; integrals measure accumulated quantity.",
    "key": [
      "A limit describes behavior near a value.",
      "The derivative is an instantaneous rate of change.",
      "An integral accumulates infinitesimal contributions."
    ],
    "example": "If f(x)=x³, the power rule gives f′(x)=3x².",
    "checkQuestion": "Derivative of x²?",
    "checkAnswer": "2x"
  },
  {
    "id": "statistics",
    "icon": "σ",
    "title": "Statistics",
    "description": "Data, distributions, inference, and uncertainty.",
    "level": "Intermediate",
    "intro": "Statistics turns data into evidence while accounting for variability and uncertainty.",
    "key": [
      "Mean measures one kind of center.",
      "Median is resistant to extreme values.",
      "Standard deviation summarizes spread."
    ],
    "example": "For 2, 4, 6, the mean is 4.",
    "checkQuestion": "Mean of 3, 6, and 9?",
    "checkAnswer": "6"
  },
  {
    "id": "probability",
    "icon": "P",
    "title": "Probability",
    "description": "Randomness, events, conditional probability, and expectation.",
    "level": "Intermediate",
    "intro": "Probability quantifies uncertainty from 0 to 1.",
    "key": [
      "Impossible events have probability 0.",
      "Certain events have probability 1.",
      "Independent events do not change one another's probabilities."
    ],
    "example": "For a fair six-sided die, P(rolling a 4)=1/6.",
    "checkQuestion": "Probability of heads on a fair coin?",
    "checkAnswer": "0.5"
  },
  {
    "id": "linear-algebra",
    "icon": "A",
    "title": "Linear Algebra",
    "description": "Vectors, matrices, transformations, and eigenvectors.",
    "level": "Advanced",
    "intro": "Linear algebra studies vector spaces and linear transformations.",
    "key": [
      "Vectors encode magnitude and direction.",
      "Matrices can represent linear transformations.",
      "The dot product combines matching vector components."
    ],
    "example": "(1,2)·(3,4)=11.",
    "checkQuestion": "(2,3)·(4,5)=?",
    "checkAnswer": "23"
  },
  {
    "id": "discrete",
    "icon": "∴",
    "title": "Discrete Math",
    "description": "Logic, sets, combinatorics, graphs, and proof.",
    "level": "Advanced",
    "intro": "Discrete mathematics studies countable structures and the logic used to reason about them.",
    "key": [
      "Logic formalizes valid inference.",
      "Combinatorics counts arrangements.",
      "Graph theory models networks."
    ],
    "example": "The number of ways to choose 2 items from 5 is 10.",
    "checkQuestion": "How many ways to choose 1 item from 7?",
    "checkAnswer": "7"
  },
  {
    "id": "number-theory",
    "icon": "ℕ",
    "title": "Number Theory",
    "description": "Primes, divisibility, congruences, and integer patterns.",
    "level": "Advanced",
    "intro": "Number theory investigates properties of integers, especially divisibility and prime structure.",
    "key": [
      "Prime numbers have exactly two positive divisors.",
      "The Euclidean algorithm finds greatest common divisors.",
      "Congruences describe remainder relationships."
    ],
    "example": "17 ≡ 2 (mod 5) because both leave remainder 2.",
    "checkQuestion": "What is 14 mod 5?",
    "checkAnswer": "4"
  },
  {
    "id": "precalculus",
    "icon": "∞",
    "title": "Precalculus",
    "description": "Polynomial, exponential, logarithmic, and rational models.",
    "level": "Intermediate",
    "intro": "Precalculus unifies algebraic and graphical ideas needed to study continuous change.",
    "key": [
      "Exponentials model multiplicative change.",
      "Logarithms invert exponentials.",
      "Polynomial end behavior depends on degree and leading term."
    ],
    "example": "Because 2³=8, log₂8=3.",
    "checkQuestion": "If 10²=100, log₁₀100 = ?",
    "checkAnswer": "2"
  }
];

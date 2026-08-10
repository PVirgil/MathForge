window.MATHFORGE_TOPICS = [
  {
    id: "arithmetic", icon: "123", title: "Arithmetic", description: "Numbers, fractions, ratios, percentages, and powers.",
    level: "Foundations",
    intro: "Arithmetic is the language of quantity. The goal is not merely calculation, but recognizing relationships between numbers.",
    key: ["Order of operations organizes multi-step expressions.", "Fractions represent division and ratios.", "Percent means “per hundred.”"],
    example: "To find 15% of 80, convert 15% to 0.15 and multiply: $0.15\\times80=12$."
  },
  {
    id: "algebra", icon: "x", title: "Algebra", description: "Expressions, equations, inequalities, and functions.",
    level: "Core",
    intro: "Algebra uses symbols to represent quantities and relationships. Solving an equation means finding values that make both sides equal.",
    key: ["Do the same valid operation to both sides.", "Like terms can be combined.", "A function maps inputs to outputs."],
    example: "For $3x+7=22$, subtract 7 from both sides to get $3x=15$, then divide by 3: $x=5$."
  },
  {
    id: "geometry", icon: "△", title: "Geometry", description: "Shapes, angles, area, similarity, and spatial reasoning.",
    level: "Core",
    intro: "Geometry studies space, form, size, and the relationships between shapes.",
    key: ["Triangle angles sum to $180^\\circ$.", "Area measures two-dimensional space.", "Similarity preserves shape while allowing scale to change."],
    example: "A right triangle with legs 3 and 4 has hypotenuse $c=\\sqrt{3^2+4^2}=5$."
  },
  {
    id: "trigonometry", icon: "θ", title: "Trigonometry", description: "Sine, cosine, tangent, identities, and waves.",
    level: "Intermediate",
    intro: "Trigonometry connects angles with ratios of side lengths and extends naturally to periodic motion.",
    key: ["$\\sin\\theta=\\frac{opposite}{hypotenuse}$.", "$\\cos\\theta=\\frac{adjacent}{hypotenuse}$.", "$\\sin^2\\theta+\\cos^2\\theta=1$."],
    example: "In a right triangle, if the opposite side is 3 and hypotenuse is 5, then $\\sin\\theta=3/5$."
  },
  {
    id: "functions", icon: "f", title: "Functions", description: "Inputs, outputs, transformations, inverses, and composition.",
    level: "Intermediate",
    intro: "A function is a rule assigning each allowed input exactly one output.",
    key: ["Domain describes valid inputs.", "Range describes possible outputs.", "Transformations shift, stretch, or reflect graphs."],
    example: "If $f(x)=x^2+1$, then $f(3)=3^2+1=10$."
  },
  {
    id: "calculus", icon: "∫", title: "Calculus", description: "Limits, derivatives, integrals, and change.",
    level: "Advanced",
    intro: "Calculus studies change and accumulation. Derivatives measure instantaneous rates; integrals measure accumulated quantity.",
    key: ["A limit describes behavior near a value.", "The derivative is a local rate of change.", "The definite integral measures net accumulation."],
    example: "If $f(x)=x^3$, the power rule gives $f'(x)=3x^2$."
  },
  {
    id: "statistics", icon: "σ", title: "Statistics", description: "Data, distributions, inference, and uncertainty.",
    level: "Intermediate",
    intro: "Statistics turns data into evidence while accounting for variability and uncertainty.",
    key: ["Mean summarizes center but can be affected by outliers.", "Standard deviation measures spread.", "Correlation alone does not establish causation."],
    example: "For 2, 4, 6, the mean is $(2+4+6)/3=4$."
  },
  {
    id: "probability", icon: "P", title: "Probability", description: "Randomness, events, conditional probability, and expectation.",
    level: "Intermediate",
    intro: "Probability quantifies uncertainty using values from 0 to 1.",
    key: ["Impossible events have probability 0.", "Certain events have probability 1.", "Independent events do not change each other's probabilities."],
    example: "For a fair six-sided die, $P(rolling\\ a\\ 4)=1/6$."
  },
  {
    id: "linear-algebra", icon: "A", title: "Linear Algebra", description: "Vectors, matrices, transformations, and eigenvectors.",
    level: "Advanced",
    intro: "Linear algebra studies vector spaces and linear transformations, providing a foundation for graphics, optimization, physics, and machine learning.",
    key: ["Vectors encode magnitude and direction.", "Matrices can represent linear transformations.", "Eigenvectors keep their direction under a transformation."],
    example: "The dot product $(1,2)\\cdot(3,4)=1\\cdot3+2\\cdot4=11$."
  },
  {
    id: "discrete", icon: "∴", title: "Discrete Math", description: "Logic, sets, combinatorics, graphs, and proof.",
    level: "Advanced",
    intro: "Discrete mathematics studies countable structures and the logic used to reason about them.",
    key: ["Logic formalizes valid inference.", "Combinatorics counts arrangements.", "Graph theory models networks of relationships."],
    example: "The number of ways to choose 2 objects from 5 is $\\binom{5}{2}=10$."
  },
  {
    id: "number-theory", icon: "ℕ", title: "Number Theory", description: "Primes, divisibility, congruences, and integer patterns.",
    level: "Advanced",
    intro: "Number theory investigates properties of integers, especially divisibility and prime structure.",
    key: ["Every integer greater than 1 factors uniquely into primes.", "Congruences describe remainders.", "The Euclidean algorithm efficiently finds greatest common divisors."],
    example: "$17\\equiv2\\pmod5$ because both leave remainder 2 after division by 5."
  },
  {
    id: "precalculus", icon: "∞", title: "Precalculus", description: "Polynomial, exponential, logarithmic, and rational models.",
    level: "Intermediate",
    intro: "Precalculus unifies algebraic and graphical ideas needed to study continuous change.",
    key: ["Exponentials model multiplicative change.", "Logarithms invert exponentials.", "Polynomial behavior depends strongly on degree and leading coefficient."],
    example: "Because $2^3=8$, we have $\\log_2 8=3$."
  }
];

If $X$ is a random variable and $Y = g(X)$, then $Y$ itself is a random variable. Consequently, we can discuss its PMF, CDF, and expected value. The range of $Y$ can be written as:

$$
\begin{equation}
R_Y = \{g(x) | x \in R_X\} \quad \text{where $R_x$ is the range of $X$}
\end{equation}
$$

To find the PMF of $Y = g(X)$ given the PMF of $X$, we can write:

$$
\begin{equation}
P_Y(y) = P(Y = y) = P(g(X) = y) = \sum_{x:g(x) = y} P_X(x)
\end{equation}
$$

### 1 Expected Value of a Function of a Random Variable (LOTUS)

Let $X$ be a discrete random variable with PMF $P_X(x)$, and let $Y = g(X)$. Suppose we want to find $E[Y]$. One approach is to first find the PMF of $Y$ and then use the expectation formula $E[Y] = E[g(X)] = \sum_{y \in R_Y} y P_Y(y)$. However, a more convenient method is the law of the unconscious statistician (LOTUS).

**Law of the Unconscious Statistician (LOTUS) for Discrete Random Variables:**

$$
\begin{equation}
E[g(X)] = \sum_{x_k \in R_X} g(x_k)P_X(x_k)
\end{equation}
$$

This can be proved by expressing $E[Y] = E[g(X)] = \sum_{y \in R_Y} y P_Y(y)$ in terms of $P_X(x)$. Typically, using LOTUS is easier than the direct definition when we need $E[g(X)]$.

### 2 Transformations of Random Variables

For a random variable $Y$, whether discrete or continuous, and a function $g: \mathbb{R} \to \mathbb{R}$, $W = g(Y)$ is also a random variable. Its distribution (pdf), mean, variance, etc., will differ from $Y$'s. Transformations of random variables are crucial in statistics.

#### Theorem:

Suppose $Y$ is a random variable, $g$ is a transformation, and $W = g(Y)$. Then:

1. If $Y$ is discrete, with pmf $p_Y$, we have:

$$
\begin{equation}
E[W] = \sum_{y \in S_Y} g(y) p_Y(y)
\end{equation}
$$

2. If $Y$ is continuous, with pdf $f_Y$, we have:

$$
\begin{equation}
E[W] = \int_{-\infty}^{\infty} g(y) f_Y(y) \, dy
\end{equation}
$$

#### The cdf-method

The fundamental formula of this theorem helps compute expectations, but it doesn't provide the distribution of $W = g(Y)$. To find the cdf $F_W$ of $W$, given the cdf $F_Y$ of $Y$, we can write:

$$
\begin{equation}
F_W(w) = P[W \leq w] = P[g(Y) \leq w]
\end{equation}
$$

The probability on the right needs to be expressed in terms of $Y$. If $g$ is strictly increasing, it admits an inverse function $g^{-1}$ and we can write:

$$
\begin{equation}
F_W(w) = P[g(Y) \leq w] = P[Y \leq g^{-1}(w)] = F_Y(g^{-1}(w))
\end{equation}
$$

For strictly decreasing $g$:

$$
\begin{equation}
P[g(Y) \leq w] = P[Y \geq g^{-1}(w)]
\end{equation}
$$

In continuous cases, $P[Y \geq y] = 1 - F_Y(y)$, so:

$$
\begin{equation}
F_W(w) = P[g(Y) \leq w] = P[Y \geq g^{-1}(w)] = 1 - F_Y(g^{-1}(w))
\end{equation}
$$

### 3 Functions of Two Random Variables

For two discrete random variables $X$ and $Y$, and $Z = g(X, Y)$, we can determine the PMF of $Z$ as:

$$
\begin{equation}
P_{Z}(z) = P(g(X, Y) = z) = \sum_{(x_i, y_j) \in A_z} P_{XY}(x_i, y_j), \quad \text{where } A_z = \{(x_i, y_j) \in R_{XY} : g(x_i, y_j) = z\}
\end{equation}
$$

For $E[g(X, Y)]$, we can use LOTUS:

**LOTUS for two discrete random variables:**

$$
\begin{equation}
E[g(X, Y)] = \sum_{(x_i, y_j) \in R_{XY}} g(x_i, y_j) P_{XY}(x_i, y_j)
\end{equation}
$$

**Linearity of Expectation:** For two discrete random variables $X$ and $Y$, $E[X + Y] = E[X] + E[Y]$.

Let $g(X, Y) = X + Y$. Using LOTUS, we have:

$$
\begin{equation}
E[X + Y] = \sum_{(x_i, y_j) \in R_{XY}} (x_i + y_j) P_{XY}(x_i, y_j)
\end{equation}
$$

$$
\begin{equation}
= \sum_{(x_i, y_j) \in R_{XY}} x_i P_{XY}(x_i, y_j) + \sum_{(x_i, y_j) \in R_{XY}} y_j P_{XY}(x_i, y_j)
\end{equation}
$$

$$
\begin{equation}
= \sum_{x_i \in R_X} \sum_{y_j \in R_Y} x_i P_{XY}(x_i, y_j) + \sum_{x_i \in R_X} \sum_{y_j \in R_Y} y_j P_{XY}(x_i, y_j)
\end{equation}
$$

$$
\begin{equation}
= \sum_{x_i \in R_X} x_i \sum_{y_j \in R_Y} P_{XY}(x_i, y_j) + \sum_{y_j \in R_Y} y_j \sum_{x_i \in R_X} P_{XY}(x_i, y_j) = \sum_{x_i \in R_X} x_i P_X(x_i) + \sum_{y_j \in R_Y} y_j P_Y(y_j) \quad \text{(marginal PMF)}
\end{equation}
$$

$$
\begin{equation}
= E[X] + E[Y]
\end{equation}
$$

#### Functions of Two Continuous Random Variables

For two continuous random variables $g(X, Y)$, the concepts are similar. For $E[g(X, Y)]$, we use LOTUS:

**LOTUS for two continuous random variables**:

$$
\begin{equation}
E[g(X, Y)] = \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} g(x, y) f_{XY}(x, y) \, dx \, dy
\end{equation}
$$

If $Z = g(X, Y)$ and we are interested in its distribution, we can start by writing:

$$
\begin{equation}
F_Z(z) = P(Z \leq z) = P(g(X, Y) \leq z) = \iint\limits_D f_{XY}(x, y) \, dx \, dy
\end{equation}
$$

where $D = \{(x, y) | g(x, y) \leq z\}$. To find the PDF of $Z$, we differentiate $F_Z(z)$.

### 4 Different Views of a Function of a Random Variable (FRV)

There are several different but essentially equivalent views of a function of a random variable (FRV). We will present two of them, highlighting their differences in emphasis.

Assume we have an underlying probability space $P = (\Omega, F, P)$ and a random variable $X$ defined on it. Recall that $X$ is a rule that assigns a number $X(\zeta)$ to every $\zeta \in \Omega$. $X$ transforms the $\sigma$-field of events $F$ into the Borel $\sigma$-field $B$ of sets of numbers on the real line. If $R_X$ denotes the subset of the real line reached by $X$ as $\zeta$ ranges over $\Omega$, we can regard $X$ as an ordinary function with domain $\Omega$ and range $R_X$. Now, consider a measurable real function $g(x)$ of the real variable $x$.

#### i) First View (Y: Ω → RY)

For every $\zeta \in \Omega$, we generate a number $g(X(\zeta)) = Y(\zeta)$. The rule $Y$, which generates the numbers $\{Y(\zeta)\}$ for random outcomes $\{\zeta \in \Omega\}$, is an RV with domain $\Omega$ and range $R_Y \subset \mathbb{R}$. For every Borel set of real numbers $B_Y$, the set $\{\zeta : Y(\zeta) \in B_Y\}$ is an event. Specifically, the event $\{\zeta : Y(\zeta) \leq y\}$ is equal to the event $\{\zeta : g(X(\zeta)) \leq y\}$.

In this view, the emphasis is on $Y$ as a mapping from $\Omega$ to $R_Y$, with the intermediate role of $X$ being suppressed.

#### ii) Second View (Input/Output Systems View)

For every value of $X(\zeta)$ in the range $R_X$, we generate a new number $Y = g(X)$ whose range is $R_Y$. The rule $Y$, whose domain is $R_X$ and range is $R_Y$, is a function of the random variable $X$. Here, the focus is on viewing $Y$ as a mapping from one set of real numbers to another. A model for this view is to regard $X$ as the input to a system with transformation function $g(\cdot)$. For such a system, an input $x$ gets transformed to an output $y = g(x)$, and an input function $X$ gets transformed to an output function $Y = g(X)$.

In general, we will write $\{Y \leq y\} = \{X \in C_y\}$ in the sequel. For $C_y$ so determined, it follows that:

$$
\begin{equation}
P[Y \leq y] = P[X \in C_y]
\end{equation}
$$

If $C_y$ is empty, then the probability of $\{Y \leq y\}$ is zero.

#### Input–Output Model

When dealing with the input–output model, it is convenient to omit references to an abstract underlying experiment and deal directly with the RVs $X$ and $Y$. In this approach, the observations on $X$ are the underlying experiments, events are Borel subsets of the real line $\mathbb{R}$, and the set function $P[\cdot]$ is replaced by the distribution function $F_X(\cdot)$. Then $Y$ is a mapping (an RV) whose domain is the range $R_X$ of $X$, and whose range $R_Y$ is a subset of $\mathbb{R}$. The functional properties of $X$ are ignored in favor of viewing $X$ as a mechanism that gives rise to numerically valued random phenomena. In this view, the domain of $X$ is irrelevant.

Additional discussion on the various views of an FRV is available in the literature.

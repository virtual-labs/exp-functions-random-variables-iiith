# Functions of Random Variables

If $X$ is a random variable and $Y = g(X)$, then $Y$ itself is a random variable. Consequently, we can discuss its PMF, CDF, and expected value. The range of $Y$ can be written as:

$$ R_Y = \{g(x) | x \in R_X\} $$

To find the PMF of $Y = g(X)$ given the PMF of $X$, we can write:

$$ P_Y(y) = P(Y = y) = P(g(X) = y) = \sum_{x:g(x) = y} P_X(x) $$

Let's look at an example.

**Example**

Let $X$ be a discrete random variable with $P_X(k) = \frac{1}{5}$ for $k = -1, 0, 1, 2, 3$. Let $Y = 2|X|$. Determine the range and PMF of $Y$.

**Solution**

First, note that the range of $Y$ is:

$$ R_Y = \{2|x| \text{ where } x \in R_X\} = \{0, 2, 4, 6\} $$

To find $P_Y(y)$, we need to determine $P(Y = y)$ for $y = 0, 2, 4, 6$. We have:

$$ P_Y(0) = P(Y = 0) = P(2|X| = 0) = P(X = 0) = \frac{1}{5} $$

$$ P_Y(2) = P(Y = 2) = P(2|X| = 2) = P(X = -1 \text{ or } X = 1) = P_X(-1) + P_X(1) = \frac{1}{5} + \frac{1}{5} = \frac{2}{5} $$

$$ P_Y(4) = P(Y = 4) = P(2|X| = 4) = P(X = 2) = \frac{1}{5} $$

$$ 
P_Y(6) = P(Y = 6) = P(2|X| = 6) = P(X = 3) = \frac{1}{5}
 $$

So, in summary,

$$ P_Y(k) = \begin{cases} 
\frac{1}{5} & \text{for } k = 0, 4, 6 \\
\frac{2}{5} & \text{for } k = 2 \\
0 & \text{otherwise}
\end{cases} $$

## Expected Value of a Function of a Random Variable (LOTUS)

Let $X$ be a discrete random variable with PMF $P_X(x)$, and let $Y = g(X)$. Suppose we want to find $E[Y]$. One approach is to first find the PMF of $Y$ and then use the expectation formula $E[Y] = E[g(X)] = \sum_{y \in R_Y} y P_Y(y)$. However, a more convenient method is the law of the unconscious statistician (LOTUS).

**Law of the Unconscious Statistician (LOTUS) for Discrete Random Variables:**

$$ E[g(X)] = \sum_{x_k \in R_X} g(x_k)P_X(x_k) $$

This can be proved by expressing $E[Y] = E[g(X)] = \sum_{y \in R_Y} y P_Y(y)$ in terms of $P_X(x)$. Typically, using LOTUS is easier than the direct definition when we need $E[g(X)]$.

Let's prove $E[aX + b] = aE[X] + b$ (linearity of expectation), where $g(X) = aX + b$:

$$ E[aX + b] = \sum_{x_k \in R_X} (ax_k + b)P_X(x_k) = \sum_{x_k \in R_X} ax_k P_X(x_k) + \sum_{x_k \in R_X} b P_X(x_k) = a \sum_{x_k \in R_X} x_k P_X(x_k) + b \sum_{x_k \in R_X} P_X(x_k) = a E[X] + b $$

## Transformations of Random Variables

For a random variable $Y$, whether discrete or continuous, and a function $g: \mathbb{R} \to \mathbb{R}$, $W = g(Y)$ is also a random variable. Its distribution (pdf), mean, variance, etc., will differ from $Y$'s. Transformations of random variables are crucial in statistics.

#### Theorem 4.1.1

Suppose $Y$ is a random variable, $g$ is a transformation, and $W = g(Y)$. Then:
1. If $Y$ is discrete, with pmf $p_Y$, we have:

$$ E[W] = \sum_{y \in S_Y} g(y) p_Y(y) $$

2. If $Y$ is continuous, with pdf $f_Y$, we have:

$$ E[W] = \int_{-\infty}^{\infty} g(y) f_Y(y) \, dy $$

#### The cdf-method

The fundamental formula of Theorem 4.1.1 helps compute expectations, but it doesn't provide the distribution of $W = g(Y)$. To find the cdf $F_W$ of $W$, given the cdf $F_Y$ of $Y$, we can write:

$$ F_W(w) = P[W \leq w] = P[g(Y) \leq w] $$

The probability on the right needs to be expressed in terms of $Y$. If $g$ is strictly increasing, it admits an inverse function $g^{-1}$ and we can write:

$$ F_W(w) = P[g(Y) \leq w] = P[Y \leq g^{-1}(w)] = F_Y(g^{-1}(w)) $$

For strictly decreasing $g$:

$$ P[g(Y) \leq w] = P[Y \geq g^{-1}(w)] $$

In continuous cases, $P[Y \geq y] = 1 - F_Y(y)$, so:

$$ F_W(w) = P[g(Y) \leq w] = P[Y \geq g^{-1}(w)] = 1 - F_Y(g^{-1}(w)) $$

## Functions of Two Random Variables

For two discrete random variables $X$ and $Y$, and $Z = g(X, Y)$, we can determine the PMF of $Z$ as:

$$ P_{Z}(z) = P(g(X, Y) = z) = \sum_{(x_i, y_j) \in A_z} P_{XY}(x_i, y_j), \quad \text{where } A_z = \{(x_i, y_j) \in R_{XY} : g(x_i, y_j) = z\} $$

For $E[g(X, Y)]$, we can use LOTUS:

**LOTUS for two discrete random variables:**

$$ E[g(X, Y)] = \sum_{(x_i, y_j) \in R_{XY}} g(x_i, y_j) P_{XY}(x_i, y_j) $$

**Linearity of Expectation:** For two discrete random variables $X$ and $Y$, $E[X + Y] = E[X] + E[Y]$. 

Let $g(X, Y) = X + Y$. Using LOTUS, we have:

$$ E[X + Y] = \sum_{(x_i, y_j) \in R_{XY}} (x_i + y_j) P_{XY}(x_i, y_j) $$

$$ = \sum_{(x_i, y_j) \in R_{XY}} x_i P_{XY}(x_i, y_j) + \sum_{(x_i, y_j) \in R_{XY}} y_j P_{XY}(x_i, y_j) $$

$$ = \sum_{x_i \in R_X} \sum_{y_j \in R_Y} x_i P_{XY}(x_i, y_j) + \sum_{x_i \in R_X} \sum_{y_j \in R_Y} y_j P_{XY}(x_i, y_j) $$

$$ = \sum_{x_i \in R_X} x_i \sum_{y_j \in R_Y} P_{XY}(x_i, y_j) + \sum_{y_j \in R_Y} y_j \sum_{x_i \in R_X} P_{XY}(x_i, y_j) = \sum_{x_i \in R_X} x_i P_X(x_i) + \sum_{y_j \in R_Y} y_j P_Y(y_j) \quad \text{(marginal PMF)} $$

$$ = E[X] + E[Y] $$

### Functions of Two Continuous Random Variables

For two continuous random variables $g(X, Y)$, the concepts are similar. For $E[g(X, Y)]$, we use LOTUS:

**LOTUS for two continuous random variables**:

$$ E[g(X, Y)] = \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} g(x, y) f_{XY}(x, y) \, dx \, dy $$

If $Z = g(X, Y)$ and we are interested in its distribution, we can start by writing:

$$ F_Z(z) = P(Z \leq z) = P(g(X, Y) \leq z) = \iint\limits_D f_{XY}(x, y) \, dx \, dy $$

where $D = \{(x, y) | g(x, y) \leq z\}$. To find the PDF of $Z$, we differentiate $F_Z(z)$.

### The Method of Transformations

When we have functions of two or more jointly continuous random variables, we may use a method similar to the previous theorems to find the resulting PDFs. Here's the theorem:


**Theorem**

Let $X$ and $Y$ be two jointly continuous random variables. Let $(Z, W) = g(X, Y) = (g_1(X, Y), g_2(X, Y))$, where $g: \mathbb{R}^2 \mapsto \mathbb{R}^2$ is a continuous one-to-one (invertible) function with continuous partial derivatives. Let $h = g^{-1}$, i.e., $(X, Y) = h(Z, W) = (h_1(Z, W), h_2(Z, W))$. Then $Z$ and $W$ are jointly continuous and their joint PDF, $f_{ZW}(z, w)$, for $(z, w) \in R_{ZW}$ is given by:

$$ f_{ZW}(z, w) = f_{XY}(h_1(z, w), h_2(z, w)) |J| $$

where $J$ is the Jacobian of $h$ defined by:

$$ J = \det \begin{bmatrix} 
\frac{\partial h_1}{\partial z} & \frac{\partial h_1}{\partial w} \\
\frac{\partial h_2}{\partial z} & \frac{\partial h_2}{\partial w} 
\end{bmatrix} = \frac{\partial h_1}{\partial z} \cdot \frac{\partial h_2}{\partial w} - \frac{\partial h_2}{\partial z} \cdot \frac{\partial h_1}{\partial w} $$

**Note**: If $X$ and $Y$ are two jointly continuous random variables and $Z = X + Y$, then:

$$ f_Z(z) = \int_{-\infty}^{\infty} f_{XY}(w, z - w) \, dw = \int_{-\infty}^{\infty} f_{XY}(z - w, w) \, dw $$

If $X$ and $Y$ are also independent, then:

$$ f_Z(z) = f_X(z) \ast f_Y(z) = \int_{-\infty}^{\infty} f_X(w) f_Y(z - w) \, dw = \int_{-\infty}^{\infty} f_Y(w) f_X(z - w) \, dw $$

### Moment Generating Functions

Moment generating functions (MGFs) are useful for several reasons, particularly for analyzing sums of random variables. Before discussing MGFs, let's define moments.

**Definition**: The **n-th moment** of a random variable $X$ is defined as $E[X^n]$. The **n-th central moment** of $X$ is defined as $E[(X - EX)^n]$.

For example, the first moment is the expected value $E[X]$. The second central moment is the variance of $X$. Other moments provide additional useful information about random variables.

The moment generating function (MGF) of a random variable $X$ is a function $M_X(s)$ defined as:

$$ M_X(s) = E\left[e^{sX}\right] $$

The MGF of $X$ exists if there is a positive constant $a$ such that $M_X(s)$ is finite for all $s \in [-a, a]$.

MGFs are useful for two main reasons. First, the MGF of $X$ provides all moments of $X$, hence its name. Second, the MGF (if it exists) uniquely determines the distribution. That is, if two random variables have the same MGF, they must have the same distribution. This method is particularly useful when working on sums of independent random variables.

### Finding Moments from MGF

Remember the Taylor series for $e^x$: for all $x \in \mathbb{R}$, we have:

$$ e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \ldots = \sum_{k=0}^{\infty} \frac{x^k}{k!} $$

Now, we can write:

$$ e^{sX} = \sum_{k=0}^{\infty} \frac{(sX)^k}{k!} = \sum_{k=0}^{\infty} \frac{X^k s^k}{k!} $$

Thus, we have:

$$ M_X(s) = E[e^{sX}] = \sum_{k=0}^{\infty} E[X^k] \frac{s^k}{k!} $$

We conclude that the $k$th moment of $X$ is the coefficient of $\frac{s^k}{k!}$ in the Taylor series of $M_X(s)$. Thus, if we have the Taylor series of $M_X(s)$, we can obtain all moments of $X$.

### Theorem

Consider two random variables $X$ and $Y$. Suppose there exists a positive constant $c$ such that the MGFs of $X$ and $Y$ are finite and identical for all values of $s$ in $[-c, c]$. Then,

$$ F_X(t) = F_Y(t), \text{ for all } t \in \mathbb{R} $$

### Sum of Independent Random Variables

Suppose $X_1, X_2, \ldots, X_n$ are $n$ independent random variables, and the random variable $Y$ is defined as:

$$ Y = X_1 + X_2 + \cdots + X_n $$

Then,

$$ M_Y(s) = E[e^{sY}] = E[e^{s(X_1 + X_2 + \cdots + X_n)}] = E[e^{sX_1} e^{sX_2} \cdots e^{sX_n}] $$

$$ = E[e^{sX_1}] E[e^{sX_2}] \cdots E[e^{sX_n}] \quad \text{(since the $X_i$'s are independent)} $$

$$ = M_{X_1}(s) M_{X_2}(s) \cdots M_{X_n}(s) $$





# Different Views of a Function of a Random Variable (FRV)

There are several different but essentially equivalent views of a function of a random variable (FRV). We will present two of them, highlighting their differences in emphasis.

Assume we have an underlying probability space $P = (\Omega, F, P)$ and a random variable $X$ defined on it. Recall that $X$ is a rule that assigns a number $X(\zeta)$ to every $\zeta \in \Omega$. $X$ transforms the $\sigma$-field of events $F$ into the Borel $\sigma$-field $B$ of sets of numbers on the real line. If $R_X$ denotes the subset of the real line reached by $X$ as $\zeta$ ranges over $\Omega$, we can regard $X$ as an ordinary function with domain $\Omega$ and range $R_X$. Now, consider a measurable real function $g(x)$ of the real variable $x$.

### First View (Y: Ω → RY)
For every $\zeta \in \Omega$, we generate a number $g(X(\zeta)) = Y(\zeta)$. The rule $Y$, which generates the numbers $\{Y(\zeta)\}$ for random outcomes $\{\zeta \in \Omega\}$, is an RV with domain $\Omega$ and range $R_Y \subset \mathbb{R}$. For every Borel set of real numbers $B_Y$, the set $\{\zeta : Y(\zeta) \in B_Y\}$ is an event. Specifically, the event $\{\zeta : Y(\zeta) \leq y\}$ is equal to the event $\{\zeta : g(X(\zeta)) \leq y\}$.

In this view, the emphasis is on $Y$ as a mapping from $\Omega$ to $R_Y$, with the intermediate role of $X$ being suppressed.

### Second View (Input/Output Systems View)
For every value of $X(\zeta)$ in the range $R_X$, we generate a new number $Y = g(X)$ whose range is $R_Y$. The rule $Y$, whose domain is $R_X$ and range is $R_Y$, is a function of the random variable $X$. Here, the focus is on viewing $Y$ as a mapping from one set of real numbers to another. A model for this view is to regard $X$ as the input to a system with transformation function $g(\cdot)$. For such a system, an input $x$ gets transformed to an output $y = g(x)$, and an input function $X$ gets transformed to an output function $Y = g(X)$.

In general, we will write $\{Y \leq y\} = \{X \in C_y\}$ in the sequel. For $C_y$ so determined, it follows that:

$$ P[Y \leq y] = P[X \in C_y] $$

If $C_y$ is empty, then the probability of $\{Y \leq y\}$ is zero.

### Input–Output Model
When dealing with the input–output model, it is convenient to omit references to an abstract underlying experiment and deal directly with the RVs $X$ and $Y$. In this approach, the observations on $X$ are the underlying experiments, events are Borel subsets of the real line $\mathbb{R}$, and the set function $P[\cdot]$ is replaced by the distribution function $F_X(\cdot)$. Then $Y$ is a mapping (an RV) whose domain is the range $R_X$ of $X, and whose range $R_Y$ is a subset of $\mathbb{R}$. The functional properties of $X$ are ignored in favor of viewing $X$ as a mechanism that gives rise to numerically valued random phenomena. In this view, the domain of $X$ is irrelevant.

Additional discussion on the various views of an FRV is available in the literature.

## Solving Problems of the Type $Y = g(X)$

Since the events $\{X < \frac{y-b}{a}\}$ and $\{X \geq \frac{y-b}{a}\}$ are disjoint and their union is the certain event, we obtain from Axiom 3:

$$ P\left[X < \frac{y - b}{a}\right] + P\left[X \geq \frac{y - b}{a}\right] = 1 $$

For a continuous RV:

$$ P\left[X < \frac{y - b}{a}\right] = P\left[X \leq \frac{y - b}{a}\right] \quad \text{and} \quad P\left[X \geq \frac{y - b}{a}\right] = P\left[X > \frac{y - b}{a}\right] $$

Thus, for $a < 0$:

$$ F_Y(y) = 1 - F_X\left(\frac{y - b}{a}\right) $$

and

$$ f_Y(y) = \frac{1}{|a|} f_X\left(\frac{y - b}{a}\right), \quad a \neq 0 $$

When $X$ is not necessarily continuous, we modify the development for $a < 0$ because it may no longer be true that $P\left[X < \frac{y - b}{a}\right] = P\left[X \leq \frac{y - b}{a}\right]$ due to the possibility that the event $\{X = \frac{y - b}{a}\}$ has a positive probability. The modified statement becomes $P\left[X < \frac{y - b}{a}\right] = P\left[X \leq \frac{y - b}{a}\right] - P[X = \frac{y - b}{a}] = F_X\left(\frac{y - b}{a}\right) - P_X\left(\frac{y - b}{a}\right)$.

## Solving Problems of the Type $Z = g(X, Y)$

In many science and engineering problems, a random variable $Z$ is functionally related to two (or more) random variables $X$ and $Y$. For example:

1. The signal $Z$ at the input of an amplifier consists of a signal $X$ to which independent random noise $Y$ is added. Thus, $Z = X + Y$. If $X$ is also an RV, what is the pdf of $Z$?

Problems of the type $Z = g(X, Y)$ are similar to those of $Y = g(X)$. For $Y = g(X)$, the basic problem was to find the point set $C_y$ such that the events $\{\zeta : Y(\zeta) \leq y\}$ and $\{\zeta : X(\zeta) \in C_y\}$ were equal. The same applies here: find the point set $C_z$ in the $(x, y)$ plane such that the events $\{\zeta : Z(\zeta) \leq z\}$ and $\{\zeta : X(\zeta), Y(\zeta) \in C_z\}$ are equal, indicated by:

$$ \{Z \leq z\} = \{(X, Y) \in C_z\} $$

and

$$ F_Z(z) = \int \int_{(x, y) \in C_z} f_{XY}(x, y) \, dx \, dy $$

The point set $C_z$ is determined from the functional relation $g(x, y) \leq z$. Problems of the type $Z = g(X, Y)$ involve joint densities or distributions and double integrals (or summations) instead of single ones. Hence, computing $f_Z(z)$ is generally more complex than computing $f_Y(y)$ in $Y = g(X)$. However, we can use two labor-saving methods:

1. Solve many $Z = g(X, Y)$-type problems using a "turn-the-crank" formula, an extension of Equation 3.2-23, through the use of auxiliary variables (Section 3.4).
2. Solve problems of the type $Z = X + Y$ using characteristic functions (Chapter 4).

### Sum of Two Independent Random Variables

The situation modeled by $Z = X + Y$ (and its extension $Z = \sum_{i=1}^N X_i$) occurs frequently in engineering and science. Computing $f_Z(z)$ is perhaps the most important problem of the type $Z = g(X, Y)$. We must find the set of points $C_z$ such that the event $\{Z \leq z\}$ is equal to $\{X + Y \leq z\}$, and thus to $\{(X, Y) \in C_z\}$. The set of points $C_z$ represents the shaded region to the left of the line $x + y \leq z$.

Using Equation 3.3-2, specialized for this case, we obtain:

$$ F_Z(z) = \int \int_{x + y \leq z} f_{XY}(x, y) \, dx \, dy = \int_{-\infty}^{\infty} \left(\int_{-\infty}^{z - y} f_{XY}(x, y) \, dx \right) dy = \int_{-\infty}^{\infty} [G_{XY}(z - y, y) - G_{XY}(-\infty, y)] \, dy $$

where $G_{XY}(x, y)$ is the indefinite integral:

$$ G_{XY}(x, y) = \int f_{XY}(x, y) \, dx $$

The pdf is obtained by differentiating $F_Z(z)$:

$$ f_Z(z) = \frac{dF_Z(z)}{dz} = \int_{-\infty}^{\infty} \frac{d}{dz} [G_{XY}(z - y, y)] \, dy = \int_{-\infty}^{\infty} f_{XY}(z - y, y) \, dy $$

This result is significant, and when $X$ and $Y$ are independent RVs such that $f_{XY}(x, y) = f_X(x) f_Y(y)$, it simplifies to the convolution integral:

$$ f_Z(z) = \int_{-\infty}^{\infty} f_X(z - y) f_Y(y) \, dy $$

This convolution can also be written as:

$$ f_Z(z) = \int_{-\infty}^{\infty} f_X(x) f_Y(z - x) \, dx $$

by using the variable transformation $x = z - y$.

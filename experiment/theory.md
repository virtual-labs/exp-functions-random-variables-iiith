# Functions of Random variables

If $X$ is a random variable and $Y = g(X)$, then $Y$ itself is a random variable. Thus, we can discuss its PMF, CDF, and expected value. First, note that the range of $Y$ can be written as:

$$ R_Y = \{g(x) | x \in R_X\} $$

If we already know the PMF of $X$, to find the PMF of $Y = g(X)$, we can write:

$$ P_Y(y) = P(Y = y) $$
$$ = P(g(X) = y) $$
$$ = \sum_{x:g(x) = y} P_X(x) $$

Let's look at an example.

---

**Example**

Let $X$ be a discrete random variable with $P_X(k) = \frac{1}{5}$ for $k = -1, 0, 1, 2, 3$. Let $Y = 2|X|$. Find the range and PMF of $Y$.

**Solution**

First, note that the range of $Y$ is:

$$ R_Y = \{2|x| \text{ where } x \in R_X\} $$
$$ = \{0, 2, 4, 6\} $$

To find $P_Y(y)$, we need to find $P(Y = y)$ for $y = 0, 2, 4, 6$. We have:

$$ P_Y(0) = P(Y = 0) = P(2|X| = 0) $$
$$ = P(X = 0) = \frac{1}{5} $$

$$ P_Y(2) = P(Y = 2) = P(2|X| = 2) $$
$$ = P(X = -1 \text{ or } X = 1) $$
$$ = P_X(-1) + P_X(1) = \frac{1}{5} + \frac{1}{5} = \frac{2}{5} $$

$$ P_Y(4) = P(Y = 4) = P(2|X| = 4) $$
$$ = P(X = 2) + P(X = -2) = \frac{1}{5} $$

$$ P_Y(6) = P(Y = 6) = P(2|X| = 6) $$
$$ = P(X = 3) + P(X = -3) = \frac{1}{5} $$

So, to summarize,

$$ P_Y(k) = \begin{cases} 
\frac{1}{5} & \text{for } k = 0, 4, 6 \\
\frac{2}{5} & \text{for } k = 2 \\
0 & \text{otherwise}
\end{cases} $$


## Expected Value of a Function of a Random Variable (LOTUS)

Let $X$ be a discrete random variable with PMF $P_X(x)$, and let $Y = g(X)$. Suppose that we are interested in finding $EY$. One way to find $EY$ is to first find the PMF of $Y$ and then use the expectation formula $EY = E[g(X)] = \sum_{y \in R_Y} y P_Y(y)$. But there is another way which is usually easier. It is called the law of the unconscious statistician (LOTUS).

**Law of the Unconscious Statistician (LOTUS) for Discrete Random Variables:**

$$ E[g(X)] = \sum_{x_k \in R_X} g(x_k)P_X(x_k) $$

You can prove this by writing $EY = E[g(X)] = \sum_{y \in R_Y} y P_Y(y)$ in terms of $P_X(x)$. In practice, it is usually easier to use LOTUS than direct definition when we need $E[g(X)]$.

Lets try to prove $E[aX + b] = aEX + b$ (linearity of expectation), here $g(X) = aX + b$, so using LOTUS we have:

$$ E[aX + b] = \sum_{x_k \in R_X} (ax_k + b)P_X(x_k) $$
$$ = \sum_{x_k \in R_X} ax_k P_X(x_k) + \sum_{x_k \in R_X} b P_X(x_k) $$
$$ = a \sum_{x_k \in R_X} x_k P_X(x_k) + b \sum_{x_k \in R_X} P_X(x_k) $$
$$ = a EX + b $$


## Transformations of Random Variables

Let $Y$ be a random variable, discrete or continuous, and let $g$ be a function from $\mathbb{R}$ to $\mathbb{R}$, which we think of as a transformation. For example, $Y$ could be the height of a randomly chosen person in a given population in inches, and $g$ could be a function that transforms inches to centimeters, i.e., $g(y) = 2.54 \times y$. Then $W = g(Y)$ is also a random variable, but its distribution (pdf), mean, variance, etc. will differ from that of $Y$. Transformations of random variables play a central role in statistics, and we will learn how to work with them in this section.

#### Theorem 4.1.1

Suppose that $Y$ is a random variable, $g$ is a transformation (i.e., a real function), and $W = g(Y)$. Then:
1. If $Y$ is discrete, with pmf $p_Y$, we have:

$$ E[W] = \sum_{y \in S_Y} g(y) p_Y(y) $$

2. If $Y$ is continuous, with pdf $f_Y$, we have:

$$ E[W] = \int_{-\infty}^{\infty} g(y) f_Y(y) dy $$

#### The cdf-method

The fundamental formula of Theorem 4.1.1 is useful for computing expectations, but it has nothing to say about the distribution of $W = g(Y)$. 

Suppose that we know the cdf $F_Y$ of $Y$ and that we are interested in the distribution of $W = g(Y)$. Using the definition of the cdf $F_W$ of $W$, we can write:

$$ F_W(w) = P[W \leq w] = P[g(Y) \leq w] $$

The probability on the right is not quite the cdf of $Y$, but we have to rewrite in terms of probabilities involving $Y$

1. If $g$ is strictly increasing, then it admits an inverse function $g^{-1}$ and we can write:

$$ F_W(w) = P[g(Y) \leq w] = P[Y \leq g^{-1}(w)] = F_Y(g^{-1}(w)) $$

And we have an expression of $F_W$ in terms of $F_Y$. Once $F_W$ is known, it can be used further to compute the pdf (in the continuous case) or the pmf (in the discrete case), or...

2. A very similar computation can be made if $g$ is strictly decreasing. The only difference is that now:

$$ P[g(Y) \leq w] = P[Y \geq g^{-1}(w)] $$

In the continuous case we have $P[Y \geq y] = 1 - F_Y(y)$ (why only in continuous?), so:

$$ F_W(w) = P[g(Y) \leq w] = P[Y \geq g^{-1}(w)] = 1 - F_Y(g^{-1}(w)) $$

## Functions of Two Random Variables

Analysis of a function of two random variables is pretty much the same as for a function of a single random variable. Suppose that you have two discrete random variables $X$ and $Y$, and suppose that $Z = g(X, Y)$, where $g: \mathbb{R}^2 \mapsto \mathbb{R}$. Then, if we are interested in the PMF of $Z$, we can write:

$$ P_{Z}(z) = P(g(X, Y) = z) = \sum_{(x_i, y_j) \in A_z} P_{XY}(x_i, y_j), \quad \text{where } A_z = \{(x_i, y_j) \in R_{XY} : g(x_i, y_j) = z\} $$

Note that if we are only interested in $E[g(X, Y)]$, we can directly use LOTUS, without finding $P_Z(z)$:


Law of the unconscious statistician (LOTUS) for two discrete random variables:

$$ E[g(X, Y)] = \sum_{(x_i, y_j) \in R_{XY}} g(x_i, y_j) P_{XY}(x_i, y_j) $$

**Linearity of Expectation:** For two discrete random variables $X$ and $Y$, $E[X + Y] = E[X] + E[Y]$. 

Let $g(X, Y) = X + Y$. Using LOTUS, we have:

$$ E[X + Y] = \sum_{(x_i, y_j) \in R_{XY}} (x_i + y_j) P_{XY}(x_i, y_j) $$

$$ = \sum_{(x_i, y_j) \in R_{XY}} x_i P_{XY}(x_i, y_j) + \sum_{(x_i, y_j) \in R_{XY}} y_j P_{XY}(x_i, y_j) $$

$$ = \sum_{x_i \in R_X} \sum_{y_j \in R_Y} x_i P_{XY}(x_i, y_j) + \sum_{x_i \in R_X} \sum_{y_j \in R_Y} y_j P_{XY}(x_i, y_j) $$

$$ = \sum_{x_i \in R_X} x_i \sum_{y_j \in R_Y} P_{XY}(x_i, y_j) + \sum_{y_j \in R_Y} y_j \sum_{x_i \in R_X} P_{XY}(x_i, y_j) $$

$$ = \sum_{x_i \in R_X} x_i P_X(x_i) + \sum_{y_j \in R_Y} y_j P_Y(y_j) \quad \text{(marginal PMF (Equation 5.1))} $$

$$ = E[X] + E[Y] $$

### Functions of Two Continuous Random Variables

When we have two continuous random variables $g(X, Y)$, the ideas are still the same. First, if we are just interested in $E[g(X, Y)]$, we can use LOTUS:

**LOTUS for two continuous random variables**:

$$ E[g(X, Y)] = \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} g(x, y) f_{XY}(x, y) \, dx \, dy $$

---

### Example

Let $X$ and $Y$ be two jointly continuous random variables with joint PDF:

$$ f_{XY}(x, y) = \begin{cases} 
x + y & 0 \leq x, y \leq 1 \\
0 & \text{otherwise} 
\end{cases} $$

Find $E[XY^2]$.

---

**Solution**

We have:

$$ E[XY^2] = \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} (xy^2) f_{XY}(x, y) \, dx \, dy = \int_{0}^{1} \int_{0}^{1} xy^2 (x + y) \, dx \, dy $$

$$ = \int_{0}^{1} \int_{0}^{1} (x^2 y^2 + xy^3) \, dx \, dy = \int_{0}^{1} \left(\frac{1}{3} y^2 + \frac{1}{2} y^3\right) dy $$

$$ = \frac{17}{72} $$

---

If $Z = g(X, Y)$ and we are interested in its distribution, we can start by writing:

$$ F_Z(z) = P(Z \leq z) = P(g(X, Y) \leq z) = \iint\limits_D f_{XY}(x, y) \, dx \, dy $$

where $D = \{(x, y) | g(x, y) \leq z\}$. To find the PDF of $Z$, we differentiate $F_Z(z)$.

---

### Example

Let $X$ and $Y$ be two independent $Uniform(0, 1)$ random variables, and $Z = XY$. Find the CDF and PDF of $Z$.

---

**Solution**

First note that $R_Z = [0, 1]$. Thus:

$$ F_Z(z) = 0 \quad \text{for } z \leq 0 $$

$$ F_Z(z) = 1 \quad \text{for } z \geq 1 $$

For $0 < z < 1$, we have:

$$ F_Z(z) = P(Z \leq z) = P(XY \leq z) = P\left(X \leq \frac{z}{Y}\right) $$

To get some practice, we will show you two ways to calculate $P\left(X \leq \frac{z}{Y}\right)$ for $0 < z < 1$. The first way is just integrating $f_{XY}(x, y)$ in the region $x \leq \frac{z}{y}$. We have:

$$ P\left(X \leq \frac{z}{Y}\right) = \int_{0}^{1} \int_{0}^{\frac{z}{y}} f_{XY}(x, y) \, dx \, dy = \int_{0}^{1} \int_{0}^{\min(1, \frac{z}{y})} 1 \, dx \, dy $$

$$ = \int_{0}^{1} \min\left(1, \frac{z}{y}\right) \, dy $$

Note that if we let $g(y) = \min\left(1, \frac{z}{y}\right)$, then:

$$ g(y) = \begin{cases} 
1 & 0 < y < z \\
\frac{z}{y} & z \leq y \leq 1 
\end{cases} $$

Therefore:

$$ P\left(X \leq \frac{z}{Y}\right) = \int_{0}^{z} 1 \, dy + \int_{z}^{1} \frac{z}{y} \, dy = z - z \ln z $$

The second way to find $P\left(X \leq \frac{z}{Y}\right)$ is to use the law of total probability. We have:

$$ P(X \leq \frac{z}{Y}) = \int_{0}^{1} P(X \leq \frac{z}{Y} | Y = y) f_Y(y) \, dy = \int_{0}^{1} P\left(X \leq \frac{z}{y}\right) f_Y(y) \, dy $$

Note that:

$$ P\left(X \leq \frac{z}{y}\right) = \begin{cases} 
1 & 0 < y < z \\
\frac{z}{y} & z \leq y \leq 1 
\end{cases} $$

Therefore:

$$ P\left(X \leq \frac{z}{Y}\right) = \int_{0}^{z} 1 \, dy + \int_{z}^{1} \frac{z}{y} \, dy = z - z \ln z $$

Thus, in the end we obtain:

$$ F_Z(z) = \begin{cases} 
0 & z \leq 0 \\
z - z \ln z & 0 < z < 1 \\
1 & z \geq 1 
\end{cases} $$

You can check that $F_Z(z)$ is a continuous function. To find the PDF, we differentiate the CDF. We have:

$$ f_Z(z) = \begin{cases} 
- \ln z & 0 < z < 1 \\
0 & \text{otherwise} 
\end{cases} $$

---

### The Method of Transformations

When we have functions of two or more jointly continuous random variables, we may be able to use a method similar to the previous theorems to find the resulting PDFs. In particular, we can state the following theorem. While the statement of the theorem might look a little confusing, its application is quite straightforward and we will see a few examples to illustrate the methodology.

---

**Theorem**

Let $X$ and $Y$ be two jointly continuous random variables. Let $(Z, W) = g(X, Y) = (g_1(X, Y), g_2(X, Y))$, where $g: \mathbb{R}^2 \mapsto \mathbb{R}^2$ is a continuous one-to-one (invertible) function with continuous partial derivatives. Let $h = g^{-1}$, i.e., $(X, Y) = h(Z, W) = (h_1(Z, W), h_2(Z, W))$. Then $Z$ and $W$ are jointly continuous and their joint PDF, $f_{ZW}(z, w)$, for $(z, w) \in R_{ZW}$ is given by:

$$ f_{ZW}(z, w) = f_{XY}(h_1(z, w), h_2(z, w)) |J| $$

where $J$ is the Jacobian of $h$ defined by:

$$ J = \det \begin{bmatrix} 
\frac{\partial h_1}{\partial z} & \frac{\partial h_1}{\partial w} \\
\frac{\partial h_2}{\partial z} & \frac{\partial h_2}{\partial w} 
\end{bmatrix} = \frac{\partial h_1}{\partial z} \cdot \frac{\partial h_2}{\partial w} - \frac{\partial h_2}{\partial z} \cdot \frac{\partial h_1}{\partial w} $$

---

### Example

Let $X$ and $Y$ be two independent standard normal random variables. Let also:

$$ \begin{cases} 
Z = 2X - Y \\
W = -X + Y 
\end{cases} $$

Find $f_{ZW}(z, w)$.

---

**Solution**

$X$ and $Y$ are jointly continuous and their joint PDF is given by:

$$ f_{XY}(x, y) = f_X(x) f_Y(y) = \frac{1}{2 \pi} \exp\left\{-\frac{x^2 + y^2}{2}\right\}, \quad \text{for all } x, y \in \mathbb{R} $$

Here, the function $g$ is defined by $(z, w) = g(x, y) = (g_1(x, y), g_2(x, y)) = (2x - y, -x + y)$. Solving for $x$ and $y$, we obtain the inverse function $h$:

$$ \begin{cases} 
x = z + w = h_1(z, w) \\
y = z + 2w = h_2(z, w) 
\end{cases} $$

We have:

$$ f_{ZW}(z, w) = f_{XY}(h_1(z, w), h_2(z, w)) |J| = f_{XY}(z + w, z + 2w) |J| $$

where:

$$ J = \det \begin{bmatrix} 
1 & 1 \\
1 & 2 
\end{bmatrix} = 1 $$

Thus, we conclude that:

$$ f_{ZW}(z, w) = f_{XY}(z + w, z + 2w) |J| = \frac{1}{2 \pi} \exp\left\{-\frac{(z + w)^2 + (z + 2w)^2}{2}\right\} = \frac{1}{2 \pi} \exp\left\{-\frac{2z^2 + 5w^2 + 6zw}{2}\right\} $$

---

### Example

Let $X$ and $Y$ be two random variables with joint PDF $f_{XY}(x, y)$. Let $Z = X + Y$. Find $f_Z(z)$.

---

**Solution**

To apply the theorem, we need two random variables $Z$ and $W$. We can simply define $W = X$. Thus, the function $g$ is given by:

$$ \begin{cases} 
z = x + y \\
w = x 
\end{cases} $$

Then, we can find the inverse transform:

$$ \begin{cases} 
x = w \\
y = z - w 
\end{cases} $$

Then, we have:

$$ |J| = \left| \det \begin{bmatrix} 
0 & 1 \\
1 & -1 
\end{bmatrix} \right| = |-1| = 1 $$

Thus:

$$ f_{ZW}(z, w) = f_{XY}(w, z - w) $$

But since we are interested in the marginal PDF, $f_Z(z)$, we have:

$$ f_Z(z) = \int_{-\infty}^{\infty} f_{XY}(w, z - w) dw $$

Note that, if $X$ and $Y$ are independent, then $f_{XY}(x, y) = f_X(x) f_Y(y)$ and we conclude that:

$$ f_Z(z) = \int_{-\infty}^{\infty} f_X(w) f_Y(z - w) dw $$

This integral is called the **convolution** of $f_X$ and $f_Y$, and we write:

$$ f_Z(z) = f_X(z) \ast f_Y(z) = \int_{-\infty}^{\infty} f_X(w) f_Y(z - w) dw = \int_{-\infty}^{\infty} f_Y(w) f_X(z - w) dw $$

---

**Note**: If $X$ and $Y$ are two jointly continuous random variables and $Z = X + Y$, then:

$$ f_Z(z) = \int_{-\infty}^{\infty} f_{XY}(w, z - w) dw = \int_{-\infty}^{\infty} f_{XY}(z - w, w) dw $$

If $X$ and $Y$ are also independent, then:

$$ f_Z(z) = f_X(z) \ast f_Y(z) = \int_{-\infty}^{\infty} f_X(w) f_Y(z - w) dw = \int_{-\infty}^{\infty} f_Y(w) f_X(z - w) dw $$

---

### Example

Let $X$ and $Y$ be two independent standard normal random variables, and let $Z = X + Y$. Find the PDF of $Z$.

---

**Solution**

We have:

$$ f_Z(z) = f_X(z) \ast f_Y(z) = \int_{-\infty}^{\infty} f_X(w) f_Y(z - w) dw $$

$$ = \int_{-\infty}^{\infty} \frac{1}{2 \pi} e^{-\frac{w^2}{2}} e^{-\frac{(z - w)^2}{2}} dw = \frac{1}{\sqrt{4 \pi}} e^{\frac{-z^2}{4}} \int_{-\infty}^{\infty} \frac{1}{\sqrt{\pi}} e^{-(w - \frac{z}{2})^2} dw $$

$$ = \frac{1}{\sqrt{4 \pi}} e^{\frac{-z^2}{4}} $$

where $\int_{-\infty}^{\infty} \frac{1}{\sqrt{\pi}} e^{-(w - \frac{z}{2})^2} dw = 1$ because it is the integral of the PDF of a normal random variable with mean $\frac{z}{2}$ and variance $\frac{1}{2}$. Thus, we conclude that $Z \sim N(0, 2)$. In fact, this is one of the interesting properties of the normal distribution: the sum of two independent normal random variables is also normal. In particular, similar to our calculation above, we can show the following:

---

**Theorem**

If $X \sim N(\mu_X, \sigma^2_X)$ and $Y \sim N(\mu_Y, \sigma^2_Y)$ are independent, then:

$$ X + Y \sim N(\mu_X + \mu_Y, \sigma_X^2 + \sigma_Y^2) $$

---

We will see an easier proof of this theorem when we discuss **moment generating functions**.



### Moment Generating Functions

Here, we will introduce and discuss **moment generating functions (MGFs)**. Moment generating functions are useful for several reasons, one of which is their application to analysis of sums of random variables. Before discussing MGFs, let's define moments.

**Definition**: The **n-th moment** of a random variable $X$ is defined to be $E[X^n]$. The **n-th central moment** of $X$ is defined to be $E[(X - EX)^n]$.

For example, the first moment is the expected value $E[X]$. The second central moment is the variance of $X$. Similar to mean and variance, other moments give useful information about random variables.

The moment generating function (MGF) of a random variable $X$ is a function $M_X(s)$ defined as:

$$ M_X(s) = E\left[e^{sX}\right] $$

We say that the MGF of $X$ exists if there exists a positive constant $a$ such that $M_X(s)$ is finite for all $s \in [-a, a]$.

Before going any further, let's look at an example.

---

### Example

For each of the following random variables, find the MGF.

a) $X$ is a discrete random variable, with PMF:

$$ P_X(k) = \begin{cases} 
\frac{1}{3} & k = 1 \\
\frac{2}{3} & k = 2 
\end{cases} $$

b) $Y$ is a $Uniform(0, 1)$ random variable.

---

**Solution**

a) For $X$, we have:

$$ M_X(s) = E\left[e^{sX}\right] = \frac{1}{3}e^s + \frac{2}{3}e^{2s} $$

which is well-defined for all $s \in \mathbb{R}$.

b) For $Y$, we can write:

$$ M_Y(s) = E\left[e^{sY}\right] = \int_{0}^{1} e^{sy} dy = \frac{e^s - 1}{s} $$

Note that we always have $M_Y(0) = E[e^{0 \cdot Y}] = 1$, thus $M_Y(s)$ is also well-defined for all $s \in \mathbb{R}$.

---

### Why is the MGF useful?

There are basically two reasons for this. First, the MGF of $X$ gives us all moments of $X$. That is why it is called the moment generating function. Second, the MGF (if it exists) uniquely determines the distribution. That is, if two random variables have the same MGF, then they must have the same distribution. Thus, if you find the MGF of a random variable, you have indeed determined its distribution. We will see that this method is very useful when we work on sums of several independent random variables. Let's discuss these in detail.

---

### Finding Moments from MGF

Remember the Taylor series for $e^x$: for all $x \in \mathbb{R}$, we have:

$$ e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \ldots = \sum_{k=0}^{\infty} \frac{x^k}{k!} $$

Now, we can write:

$$ e^{sX} = \sum_{k=0}^{\infty} \frac{(sX)^k}{k!} = \sum_{k=0}^{\infty} \frac{X^k s^k}{k!} $$

Thus, we have:

$$ M_X(s) = E[e^{sX}] = \sum_{k=0}^{\infty} E[X^k] \frac{s^k}{k!} $$

We conclude that the $k$th moment of $X$ is the coefficient of $\frac{s^k}{k!}$ in the Taylor series of $M_X(s)$. Thus, if we have the Taylor series of $M_X(s)$, we can obtain all moments of $X$.

---

### Example

If $Y \sim Uniform(0, 1)$, find $E[Y^k]$ using $M_Y(s)$.

---

**Solution**

We found $M_Y(s)$ earlier, so we have:

$$ M_Y(s) = \frac{e^s - 1}{s} = \frac{1}{s} \left(\sum_{k=0}^{\infty} \frac{s^k}{k!} - 1\right) = \frac{1}{s} \sum_{k=1}^{\infty} \frac{s^k}{k!} = \sum_{k=1}^{\infty} \frac{s^{k-1}}{k!} = \sum_{k=0}^{\infty} \frac{1}{k+1} \frac{s^k}{k!} $$

Thus, the coefficient of $\frac{s^k}{k!}$ in the Taylor series for $M_Y(s)$ is $\frac{1}{k+1}$, so:

$$ E[X^k] = \frac{1}{k+1} $$

---

We remember from calculus that the coefficient of $\frac{s^k}{k!}$ in the Taylor series of $M_X(s)$ is obtained by taking the $k$th derivative of $M_X(s)$ and evaluating it at $s=0$. Thus, we can write:

$$ E[X^k] = \left. \frac{d^k}{ds^k} M_X(s) \right|_{s=0} $$

We can obtain all moments of $X^k$ from its MGF:

$$ M_X(s) = \sum_{k=0}^{\infty} E[X^k] \frac{s^k}{k!} $$

$$ E[X^k] = \left. \frac{d^k}{ds^k} M_X(s) \right|_{s=0} $$

---

### Example

Let $X \sim Exponential(\lambda)$. Find the MGF of $X$, $M_X(s)$, and all of its moments, $E[X^k]$.

---

**Solution**

Recall that the PDF of $X$ is:

$$ f_X(x) = \lambda e^{-\lambda x} u(x) $$

where $u(x)$ is the unit step function. We conclude:

$$ M_X(s) = E[e^{sX}] = \int_{0}^{\infty} \lambda e^{-\lambda x} e^{sx} dx = \left[-\frac{\lambda}{\lambda - s} e^{-(\lambda - s) x}\right]_{0}^{\infty}, \quad \text{for } s < \lambda $$

$$ = \frac{\lambda}{\lambda - s}, \quad \text{for } s < \lambda $$

Therefore, $M_X(s)$ exists for all $s < \lambda$. To find the moments of $X$, we can write:

$$ M_X(s) = \frac{\lambda}{\lambda - s} = \frac{1}{1 - \frac{s}{\lambda}} = \sum_{k=0}^{\infty} \left(\frac{s}{\lambda}\right)^k, \quad \text{for } \left|\frac{s}{\lambda}\right| < 1 $$

$$ = \sum_{k=0}^{\infty} \frac{k!}{\lambda^k} \frac{s^k}{k!} $$

We conclude that:

$$ E[X^k] = \frac{k!}{\lambda^k}, \quad \text{for } k = 0, 1, 2, \ldots $$

---

### Example

Let $X \sim Poisson(\lambda)$. Find the MGF of $X$, $M_X(s)$.

---

**Solution**

We have:

$$ P_X(k) = e^{-\lambda} \frac{\lambda^k}{k!}, \quad \text{for } k = 0, 1, 2, \ldots $$

Thus:

$$ M_X(s) = E[e^{sX}] = \sum_{k=0}^{\infty} e^{sk} e^{-\lambda} \frac{\lambda^k}{k!} = e^{-\lambda} \sum_{k=0}^{\infty} e^{sk} \frac{\lambda^k}{k!} = e^{-\lambda} \sum_{k=0}^{\infty} \frac{(\lambda e^s)^k}{k!} = e^{-\lambda} e^{\lambda e^s} $$

$$ = e^{\lambda (e^s - 1)}, \quad \text{for all } s \in \mathbb{R} $$

---

As we discussed previously, the MGF uniquely determines the distribution. This is a very useful fact. We will see examples of how we use it shortly. Right now let's state this fact more precisely as a theorem. We omit the proof here.

### Theorem

Consider two random variables $X$ and $Y$. Suppose that there exists a positive constant $c$ such that MGFs of $X$ and $Y$ are finite and identical for all values of $s$ in $[-c, c]$. Then,

$$ F_X(t) = F_Y(t), \text{ for all } t \in \mathbb{R} $$

---

### Example

For a random variable $X$, we know that:

$$ M_X(s) = \frac{2}{2 - s}, \text{ for } s \in (-2, 2) $$

Find the distribution of $X$.

---

**Solution**

We note that the above MGF is the MGF of an exponential random variable with $\lambda = 2$. Thus, we conclude that $X \sim Exponential(2)$.

---

### Sum of Independent Random Variables

Suppose $X_1, X_2, \ldots, X_n$ are $n$ independent random variables, and the random variable $Y$ is defined as:

$$ Y = X_1 + X_2 + \cdots + X_n $$

Then,

$$ M_Y(s) = E[e^{sY}] = E[e^{s(X_1 + X_2 + \cdots + X_n)}] = E[e^{sX_1} e^{sX_2} \cdots e^{sX_n}] $$

$$ = E[e^{sX_1}] E[e^{sX_2}] \cdots E[e^{sX_n}] \quad \text{(since the $X_i$'s are independent)} $$

$$ = M_{X_1}(s) M_{X_2}(s) \cdots M_{X_n}(s) $$

---

**Note**: If $X_1, X_2, \ldots, X_n$ are $n$ **independent** random variables, then:

$$ M_{X_1 + X_2 + \cdots + X_n}(s) = M_{X_1}(s) M_{X_2}(s) \cdots M_{X_n}(s) $$

---

### Example

If $X \sim Binomial(n, p)$, find the MGF of $X$.

---

**Solution**

We can solve this question directly using the definition of MGF, but an easier way to solve it is to use the fact that a binomial random variable can be considered as the sum of $n$ independent and identically distributed (i.i.d.) Bernoulli random variables. Thus, we can write:

$$ X = X_1 + X_2 + \cdots + X_n $$

where $X_i \sim Bernoulli(p)$. Thus,

$$ M_{X}(s) = M_{X_1}(s) M_{X_2}(s) \cdots M_{X_n}(s) = \left(M_{X_1}(s)\right)^n \quad \text{(since the $X_i$'s are i.i.d.)} $$

Also,

$$ M_{X_1}(s) = E[e^{sX_1}] = p e^s + 1 - p $$

Thus, we conclude:

$$ M_{X}(s) = \left(p e^s + 1 - p\right)^n $$

---

### Example

Using MGFs, prove that if $X \sim Binomial(m, p)$ and $Y \sim Binomial(n, p)$ are independent, then $X + Y \sim Binomial(m + n, p)$.

---

**Solution**

We have:

$$ M_X(s) = \left(p e^s + 1 - p\right)^m $$

$$ M_Y(s) = \left(p e^s + 1 - p\right)^n $$

Since $X$ and $Y$ are independent, we conclude that:

$$ M_{X+Y}(s) = M_X(s) M_Y(s) = \left(p e^s + 1 - p\right)^{m + n} $$

which is the MGF of a $Binomial(m + n, p)$ random variable. Thus, $X + Y \sim Binomial(m + n, p)$.

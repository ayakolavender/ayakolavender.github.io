---
title: "Gradient Descent, From Scratch"
date: 2025-11-20
excerpt: "Building intuition for the optimizer that trains almost everything, with a tiny from-scratch implementation."
tags: ["Machine Learning", "Optimization"]
featured: true
---

Almost every model you've used was trained by some flavour of gradient descent. Let's build the basic version ourselves.

## The update rule

Given a loss $\mathcal{L}(\theta)$, gradient descent repeatedly steps **downhill**:

$$
\theta_{t+1} = \theta_t - \eta \, \nabla_\theta \mathcal{L}(\theta_t)
$$

The learning rate $\eta$ controls the step size. Too large and you overshoot; too small and training crawls.

## Adding momentum

Momentum smooths the path by accumulating past gradients:

$$
v_t = \beta v_{t-1} + \nabla_\theta \mathcal{L}(\theta_t), \qquad \theta_{t+1} = \theta_t - \eta\, v_t
$$

```python
import numpy as np

class Momentum:
    def __init__(self, lr=0.01, beta=0.9):
        self.lr, self.beta, self.v = lr, beta, None

    def step(self, params, grads):
        if self.v is None:
            self.v = [np.zeros_like(p) for p in params]
        for i, (p, g) in enumerate(zip(params, grads)):
            self.v[i] = self.beta * self.v[i] + g
            p -= self.lr * self.v[i]
```

## What to remember

- The gradient points *uphill*, so we subtract it.
- Momentum helps escape shallow regions and dampens oscillation.
- Modern optimizers like Adam combine momentum with per-parameter learning rates.

Understanding the plain version makes every fancier optimizer easier to reason about.

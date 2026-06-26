---
title: "Understanding Attention Mechanisms"
date: 2026-01-15
excerpt: "A short, friendly walk through the mathematics behind the attention mechanism, and a clean PyTorch implementation."
tags: ["Deep Learning", "NLP", "Tutorial"]
featured: true
---

Attention is the idea at the heart of modern language models. This post builds it up from scratch.

## The core idea

Attention lets a model decide *what to look at* when producing each output. The scaled dot-product attention is:

$$
\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

where $Q$ (queries), $K$ (keys), and $V$ (values) are learned projections of the input, and $d_k$ is the key dimension.

## A clean implementation

Here is the whole thing in a few lines of PyTorch:

```python
import torch
import torch.nn.functional as F

def attention(q, k, v, mask=None):
    d_k = q.size(-1)
    scores = q @ k.transpose(-2, -1) / d_k ** 0.5
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float("-inf"))
    weights = F.softmax(scores, dim=-1)
    return weights @ v, weights
```

## Why it works

> The strength of attention is modelling long-range dependencies while staying fully parallelizable, unlike recurrent networks.

| Operation | Time | Space |
|-----------|------|-------|
| Self-attention | $O(n^2 d)$ | $O(n^2)$ |
| Feed-forward | $O(n d^2)$ | $O(n d)$ |

That quadratic cost in sequence length $n$ is exactly what a lot of current research is trying to reduce.

## Takeaway

Once you see attention as a soft, differentiable lookup table, the rest of the Transformer falls into place.

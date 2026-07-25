# JOURNAL.md

# Development Journal

## Project Overview

I approached this assignment by prioritizing the complete customer journey rather than maximizing the number of features. My goal was to ensure the primary workflow—submitting a testimonial, moderating it, and displaying approved testimonials—worked reliably before investing time in additional functionality.

After completing the core requirements (P0), I focused on features that would improve the product from a real business perspective instead of adding complexity. This led me to build a standalone embeddable widget, implement spam prevention, and add AI-generated customer insights.

---

# Planning & Prioritization

Given the limited time, I divided the work into three stages.

### Stage 1 (P0)

Complete the end-to-end testimonial workflow:

* Public testimonial submission form
* Backend API with persistent database storage
* Moderation dashboard
* Public testimonials page

This ensured the primary flow worked before moving to additional features.

---

### Stage 2 (P1)

After the core functionality was complete, I implemented features that make the platform practical for real-world usage:

* Standalone embeddable JavaScript widget
* Pagination
* Duplicate submission prevention
* Spam detection
* Loading, empty, and error states
* Theme customization
* Accent color customization

---

### Stage 3 (P2)

Finally, I added an AI-powered feature that provides value without increasing API costs.

Instead of generating summaries for every testimonial, I generate a single customer insight after every five approved testimonials. The generated summary is stored in the database and served directly to clients.

---

# Product Decisions

## Embeddable Widget

I chose to build a standalone JavaScript widget instead of an iframe.

Reasons:

* Easier to embed into existing websites
* Better SEO
* Faster rendering
* Allows styling through configuration
* More closely resembles how commercial review widgets work

The widget only requires:

```html
<script src=".../widget.js"></script>

<div
    id="testimonial-widget"
    data-limit="6"
    data-theme="light"
    data-accent="#4F46E5">
</div>
```

No frontend framework is required.

---

## Pagination

Initially I considered infinite scrolling and a "Load More" button.

I ultimately chose numbered pagination because:

* Visitors immediately understand where they are.
* Easier navigation for large testimonial collections.
* Deterministic page loading.
* Simpler implementation for an embeddable widget.

---

## AI Feature

The assignment suggested AI features such as summarization or sentiment analysis.

Rather than generating AI content for every testimonial, I decided to summarize the overall customer feedback.

Whenever the number of approved testimonials reaches a multiple of five:

* newest testimonials are selected
* middle testimonials are selected
* oldest testimonials are selected

These reviews are sent to Gemini to generate:

* an overall summary
* key customer tags

The generated insight is stored in the database.

The widget simply reads this cached summary.

Benefits:

* significantly fewer AI requests
* lower latency
* lower API usage
* consistent output for all visitors

---

# Technical Decisions

## Frontend

Built using:

* React
* Vite
* TailwindCSS

The frontend consists of:

* submission page
* moderation dashboard
* public testimonials page

---

## Backend

Built with:

* Express
* TypeScript
* PostgreSQL (Supabase)

The backend exposes endpoints for:

* submitting testimonials
* approving/rejecting testimonials
* fetching approved testimonials
* serving the embeddable widget
* generating AI insights

---

## Database

Testimonials remain in a pending state until approved.

This guarantees only moderated testimonials appear publicly.

A separate table stores cached AI summaries.

This avoids unnecessary AI generation on every request.

---

# Handling Edge Cases

I spent additional time handling situations that commonly occur in development.

### Duplicate submissions

Email addresses are unique.

If the same email submits again:

* insertion is ignored
* the API returns a meaningful error
* the UI displays an appropriate message

---

### Spam Detection

Basic spam filtering rejects:

* URLs
* repeated characters
* banned keywords
* extremely short text
* excessively long text

This helps reduce obvious spam before moderation.

---

### Rate Limiting

Submission endpoints are protected using rate limiting to reduce abuse.

---

### Widget States

The widget includes:

* loading state
* empty state
* error state
* pagination state

These provide a smoother experience for websites embedding the widget.

---

### Lazy Loading

Customer images are loaded using:

* `loading="lazy"`
* `decoding="async"`

This improves performance when many testimonials are displayed.

---

# AI Usage During Development

AI tools were used throughout development to accelerate implementation and explore alternative approaches.

Typical use cases included:

* brainstorming architecture
* discussing API design
* reviewing edge cases
* improving UI ideas
* debugging implementation issues
* refining prompts for Gemini
* documentation assistance

Every generated suggestion was reviewed, modified where necessary, and tested before being included in the project.

I made an effort to understand every piece of code that became part of the final solution.

---

# Assumptions Made

Some requirements were intentionally interpreted based on product judgment.

* The moderation dashboard is intentionally left without authentication because the assignment explicitly lists authentication as a non-goal.
* AI summaries are generated periodically instead of after every approval to reduce cost.
* Duplicate testimonials are prevented using email uniqueness.
* Public users only see approved testimonials.
* Widget customization focuses on the options most businesses typically need (theme, accent color, pagination).

---

# Verification

I manually tested the primary workflow multiple times.

Verified scenarios include:

* testimonial submission
* duplicate submissions
* spam rejection
* moderation approval
* moderation rejection
* public wall updates
* widget rendering
* pagination
* theme switching
* AI summary generation
* loading state
* empty state
* API error handling

---

# Challenges

The most interesting challenges were:

* designing a standalone embeddable widget
* balancing AI usefulness with API cost
* handling duplicate submissions cleanly
* generating valid JSON from Gemini
* keeping the widget framework-independent
* ensuring pagination and AI summaries worked together

---

# Future Improvements

If more time were available, I would add:

* multiple widget layouts (carousel, masonry)
* widget analytics
* search and filtering
* verified customer badges
* image upload instead of URL input
* automatic spam scoring using AI
* sentiment trend charts
* multi-business support
* authentication and role management
* webhook integrations
* email notifications

---

# Agent Configuration

I primarily used ChatGPT as my AI assistant during development for brainstorming, implementation guidance, debugging, reviewing architecture decisions, and documentation.

---

# Final Thoughts

The final result includes the complete P0 workflow, the majority of P1 features, and an AI-powered enhancement that adds practical value while remaining efficient to operate.

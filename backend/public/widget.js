(async function () {
    const container = document.getElementById("testimonial-widget");

    if (!container) return;
    const theme = container.dataset.theme || "light";

    if (theme === "auto") {
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", () => {
                location.reload();
            });
    }
    const isDark =
        theme === "dark" ||
        (theme === "auto" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches);
    const limit = Number(container.dataset.limit) || 10;
    const accent = container.dataset.accent || "#4F46E5";
    const layout = container.dataset.layout || "grid";
    const colors = isDark
        ? {
            bg: "#0f172a",
            card: "#1e293b",
            border: "#334155",
            text: "#f8fafc",
            muted: "#94a3b8",
            badge: "#312e81",
            quote: "#475569",
        }
        : {
            bg: "#ffffff",
            card: "#ffffff",
            border: "#e2e8f0",
            text: "#0f172a",
            muted: "#64748b",
            badge: "#eef2ff",
            quote: "#cbd5e1",
        };
    const style = document.createElement("style");

    style.textContent = `
#testimonial-widget{
    font-family:Inter,Arial,sans-serif;
}

.tw-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
    gap:20px;
}
.tw-card{
    background:${colors.card};
    border:1px solid ${colors.border};
}

.tw-card{
    border-radius:16px;
    padding:20px;
    box-shadow:0 8px 24px rgba(0,0,0,.08);
    transition:.25s;
}

.tw-card:hover{
    transform:translateY(-4px);
    box-shadow:0 16px 36px rgba(0,0,0,.12);
}

.tw-stars{
    color:#f59e0b;
    font-size:18px;
    margin-bottom:12px;
}

.tw-name{
    color:${accent};
    font-weight:700;
    font-size:18px;
}

.tw-company{
    color:${colors.muted};
    font-size:14px;
    margin-top:2px;
}

.tw-text{
    margin-top:15px;
    line-height:1.7;
}

.tw-text{
    color:${colors.text};
}

.tw-header{
    display:flex;
    align-items:center;
    gap:14px;
    margin-bottom:18px;
}

.tw-avatar{
    width:52px;
    height:52px;
    border-radius:999px;
    object-fit:cover;
    flex-shrink:0;
}

.tw-avatar-placeholder{
    width:52px;
    height:52px;
    border-radius:999px;
    background:${accent};
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:18px;
    font-weight:700;
    flex-shrink:0;
}

.tw-user{
    flex:1;
}

.tw-company-badge{
    display:inline-block;
    margin-top:6px;
    padding:4px 10px;
    border-radius:999px;
    background:${colors.badge};
    color:${accent};
    font-size:12px;
    font-weight:600;
}

.tw-quote{
    font-size:34px;
    color:${colors.quote};
    line-height:1;
    margin-bottom:10px;
}

.tw-footer{
    margin-top:18px;
    padding-top:14px;
    border-top:1px solid ${colors.border};
    font-size:12px;
    color:${colors.muted};
    text-align:right;
}

.tw-loading{
    display:flex;
    justify-content:center;
    align-items:center;
    padding:50px;
}

.tw-spinner{
    width:48px;
    height:48px;
    border:4px solid #e2e8f0;
    border-top:4px solid ${accent};
    border-radius:50%;
    animation:tw-spin .8s linear infinite;
}

@keyframes tw-spin{
    from{
        transform:rotate(0deg);
    }
    to{
        transform:rotate(360deg);
    }
}

.tw-pagination{
    display:flex;
    justify-content:center;
    gap:8px;
    margin-top:30px;
    flex-wrap:wrap;
}

.tw-page-btn{
    min-width:40px;
    height:40px;
    border:none;
    border-radius:10px;
    cursor:pointer;
    background:#eef2ff;
    color:${accent};
    font-weight:600;
    transition:.2s;
}

.tw-page-btn:hover{
    background:${accent};
    color:white;
}

.tw-page-btn.active{
    background:${accent};
    color:white;
}

.tw-summary-card{
    margin-bottom:28px;
    background:linear-gradient(135deg, ${accent}10, transparent);
}

.tw-summary-card .tw-name{
    display:flex;
    align-items:center;
    gap:8px;
    font-size:22px;
}

.tw-summary-card .tw-text{
    font-size:16px;
    line-height:1.8;
}
`;

    document.head.appendChild(style);

    const script =
        document.currentScript ||
        document.querySelector('script[src*="widget.js"]');

    const BASE_URL = new URL(script.src).origin;

    container.innerHTML = `
<div class="tw-loading">
    <div class="tw-spinner"></div>
</div>
`;

    let page = 1;

    async function loadTestimonials() {
        const res = await fetch(
            `${BASE_URL}/api/widget?page=${page}&limit=${limit}`
        );

        const json = await res.json();

        if (!json.data.length) {
            container.innerHTML = `
<div style="
padding:40px;
text-align:center;
border:1px solid #e2e8f0;
border-radius:16px;
">
No testimonials available.
</div>
`;
            return;
        }

        const cards = json.data
            .map((t) => {
                const initials = t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase();

                const avatar = t.photo_url
                    ? `<img class="tw-avatar" src="${t.photo_url}" alt="${t.name}" loading="lazy" decoding="async">`
                    : `<div class="tw-avatar-placeholder">${initials}</div>`;

                return `
<div class="tw-card">

<div class="tw-header">
${avatar}

<div class="tw-user">
<div class="tw-name">${t.name}</div>

${t.company
                        ? `<div class="tw-company-badge">${t.company}</div>`
                        : ""
                    }
</div>
</div>

<div class="tw-stars">
${"★".repeat(t.rating)}
${"☆".repeat(5 - t.rating)}
</div>

<div class="tw-quote">❝</div>

<div class="tw-text">
${t.testimonial}
</div>

<div class="tw-footer">
Powered by <strong>Testify</strong>
</div>

</div>
`;
            })
            .join("");

        let summaryCard = "";

        if (json.aiSummary) {
            summaryCard = `
<div class="tw-card tw-summary-card">
    <div class="tw-name">
        👾 AI Customer Insights
    </div>

    <div class="tw-text" style="margin-top:12px;">
        ${json.aiSummary.summary}
    </div>

    ${json.aiSummary.tags?.length
                    ? `
<div style="margin-top:18px;display:flex;gap:8px;flex-wrap:wrap;">
    ${json.aiSummary.tags
                        .map(
                            tag => `
<span class="tw-company-badge">
    ${tag}
</span>`
                        )
                        .join("")}
</div>
`
                    : ""
                }

    <div class="tw-footer">
        Based on customer reviews
    </div>
</div>
`;
        }
        const totalPages = Math.ceil(json.total / json.limit);

        let pagination = "";

        if (totalPages > 1) {
            pagination = `<div class="tw-pagination">`;

            for (let i = 1; i <= totalPages; i++) {
                pagination += `
<button
class="tw-page-btn ${i === page ? "active" : ""}"
data-page="${i}">
${i}
</button>`;
            }

            pagination += "</div>";
        }

        container.innerHTML = `
${summaryCard}

<div class="${layout === "carousel" ? "tw-carousel" : "tw-grid"}">
    ${cards}
</div>

${pagination}
`;

        container
            .querySelectorAll(".tw-page-btn")
            .forEach((btn) => {
                btn.onclick = async () => {
                    page = Number(btn.dataset.page);

                    container.innerHTML = `
<div class="tw-loading">
<div class="tw-spinner"></div>
</div>
`;

                    await loadTestimonials();

                    container.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                };
            });
    }

    try {
        await loadTestimonials(true);
    } catch (err) {
        console.error(err);

        container.innerHTML = `
<div style="
padding:40px;
text-align:center;
color:#dc2626;
background:#fef2f2;
border:1px solid #fecaca;
border-radius:16px;
">
Unable to load testimonials.
</div>
`;
    }
})();
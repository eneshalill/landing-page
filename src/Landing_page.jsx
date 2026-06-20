import  "./landing_page.css";

import Eat from "./assets/eat.png";
import Car from "./assets/car.png";
import Store from "./assets/store.png";

import { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   صور الأعمال — مضمّنة كـ base64 لضمان ظهورها فوراً بلا تأخير
   ============================================================ */

const WHATSAPP_NUMBER = "905340242575";
const waLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

/* ── أيقونة واتساب ── */
function WhatsIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/* ── أيقونة صح ── */
function CheckIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="#0ef686" fillOpacity="0.18" />
      <path d="M4.5 8.2L6.7 10.4L11.5 5.4" stroke="#07c26e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── بطاقة مشروع ── */
function ProjectCard({ image, sector, title, desc, liveUrl }) {
  return (
    <div className="proj-card">
      <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="proj-img-wrap" aria-label={`فتح موقع ${title} المباشر`}>
        <img src={image} alt={`معاينة موقع ${title}`} loading="lazy" />
        <span className="live-pill">
          <span className="live-dot" />
          عرض مباشر
        </span>
      </a>
      <div className="proj-body">
        <p className="proj-sector">{sector}</p>
        <h3>{title}</h3>
        <p className="proj-desc">{desc}</p>
        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="proj-link">
          زيارة الموقع ←
        </a>
      </div>
    </div>
  );
}

/* ── بطاقة سعر ── */
function PriceCard({ type, name, price, note, tag, tagStyle, features, btnLabel, btnStyle, badge, cardClass, ctaMsg }) {
  return (
    <div className={`pc ${cardClass}`}>
      {badge && <div className="pc-badge">{badge}</div>}
      <p className="pc-type">{type}</p>
      <p className="pc-name">{name}</p>
      <p className="pc-price"><span>$</span>{price}</p>
      <p className="pc-note">{note}</p>
      {tag && <span className="pc-tag" style={tagStyle}>{tag}</span>}
      <ul className="pc-features">
        {features.map((f, i) => (
          <li key={i} className={f.yes ? "yes" : "no"}>{f.text}</li>
        ))}
      </ul>
      <a
        className={cardClass === "decoy" ? "btn-sec" : "btn-wa"}
        href={cardClass === "decoy" ? waLink("أريد الاستفسار عن باقة المحتوى") : waLink(ctaMsg)}
        target="_blank"
        rel="noopener noreferrer"
        style={{ width: "100%", justifyContent: "center", ...(btnStyle || {}) }}
      >
        {cardClass !== "decoy" && <WhatsIcon />}
        {btnLabel}
      </a>
    </div>
  );
}

/* ── خطوة عملية ── */
function Step({ num, title, desc, isLast }) {
  return (
    <div className="step">
      <div className="step-line">
        <div className="step-circle">{num}</div>
        {!isLast && <div className="step-connector" />}
      </div>
      <div className="step-body">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════ */
export default function Landing_page() {
  const [shown, setShown] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const currentRefs = refs.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.dataset.key) {
            setShown((s) => ({ ...s, [e.target.dataset.key]: true }));
          }
        });
      },
      { threshold: 0.1 },
    );
    Object.values(currentRefs).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const reg = useCallback(
    (key) => (el) => {
      if (el) {
        el.dataset.key = key;
        refs.current[key] = el;
      }
    },
    [],
  );

  const projects = [
    {
      key: "pizza",
      image: Eat,
      sector: "مطعم · ألمانيا",
      title: "Angelo Della Pizza",
      desc: "موقع مطعم إيطالي — قائمة طعام تفاعلية وطلب مباشر من الجوال.",
      liveUrl: "https://angolodella-pizza.vercel.app/",
    },
    {
      key: "t2",
      image: Car,
      sector: "قطع غيار سيارات · العراق",
      title: "T2 Accessories",
      desc: "متجر إلكتروني لقطع غيار واكسسوارات السيارات.",
      liveUrl: "https://t2-accessories.vercel.app",
    },
    {
      key: "store",
      image: Store,
      sector: "متاجر إلكترونية · أثاث وديكور",
      title: "Star Center",
      desc: "متجر أثاث ومنتجات منزلية بتصميم عصري يرفع نسبة الشراء.",
      liveUrl: "https://enes-mobilia.vercel.app/",
    },
  ];

  const pricingCards = [
    {
      cardClass: "featured",
      badge: "⭐ الأذكى والأكثر طلباً",
      type: "الباقة الاحترافية",
      name: "موقع تعريفي كامل",
      price: "200",
      note: "دفعة واحدة · ملكيتك للأبد",
      tag: "✓ التوفير: 150$ مقارنة بالباقة الوسطى",
      features: [
        { yes: true,  text: "5 صفحات احترافية كاملة" },
        { yes: true,  text: "تصميم عصري متجاوب مع الجوال" },
        { yes: true,  text: "زر واتساب + خرائط جوجل" },
        { yes: true,  text: "محسّن لمحركات البحث SEO" },
        { yes: true,  text: "تسليم خلال 7 أيام" },
        { yes: true,  text: "تعديلات مجانية غير محدودة" },
        { yes: false, text: "متجر إلكتروني" },
      ],
      btnLabel: "ابدأ بـ 200$ الآن",
      ctaMsg: "مرحباً، أريد الباقة الاحترافية بـ 200$ — ما هي التفاصيل؟",
    },
    {
      cardClass: "decoy",
      badge: null,
      type: "باقة المحتوى",
      name: "موقع + إدارة محتوى",
      price: "350",
      note: "دفعة واحدة",
      tag: "قيمة أقل مقارنة بالباقات الأخرى",
      tagStyle: { background: "rgba(255,255,255,.04)", color: "#4A5A6A" },
      features: [
        { yes: true,  text: "كل ما في الباقة الاحترافية" },
        { yes: true,  text: "نظام إدارة محتوى بسيط" },
        { yes: false, text: "متجر إلكتروني" },
        { yes: false, text: "سلة تسوق" },
        { yes: false, text: "نظام طلبات" },
        { yes: false, text: "ربط بوسائل الدفع" },
        { yes: false, text: "دعم تقني موسّع" },
      ],
      btnLabel: "استفسر عنها",
      ctaMsg: "",
    },
    {
      cardClass: "",
      badge: null,
      type: "الباقة الذهبية",
      name: "موقع + متجر إلكتروني",
      price: "400",
      note: "دفعة واحدة · ملكيتك للأبد",
      tag: "🛒 للأعمال التي تبيع أونلاين",
      features: [
        { yes: true, text: "كل ما في الباقة الاحترافية" },
        { yes: true, text: "متجر إلكتروني كامل" },
        { yes: true, text: "سلة تسوق ونظام طلبات" },
        { yes: true, text: "ربط بوسائل الدفع" },
        { yes: true, text: "لوحة تحكم سهلة" },
        { yes: true, text: "دعم تقني شهر كامل" },
        { yes: true, text: "تدريب على الإدارة" },
      ],
      btnLabel: "احصل على الكامل",
      btnStyle: { background: "linear-gradient(90deg,#C9912A,#F0C96B)", color: "#0B1120" },
      ctaMsg: "مرحباً، أريد الباقة الذهبية موقع + متجر بـ 400$ — ما التفاصيل؟",
    },
  ];

  const steps = [
    { num: "١", title: "محادثة التعارف (مجانية)", desc: "نتواصل على واتساب — تخبرنا عن عملك وهدفك. لا حاجة لأي خبرة تقنية." },
    { num: "٢", title: "عرض السعر والتصميم",    desc: "نرسل لك عرضاً واضحاً بالسعر والمدة والمحتوى — بدون مفاجآت لاحقاً." },
    { num: "٣", title: "البناء والمراجعة",       desc: "نبني موقعك ونشاركك كل مرحلة لضمان رضاك التام — خلال 7 أيام فقط." },
    { num: "٤", title: "تسليم وانطلاق",          desc: "موقعك يصبح حياً وجاهزاً. ندربك على إدارته في 15 دقيقة." },
  ];

  const heroMsg = "مرحباً، شفت موقعكم وحاب أطلب موقع لمشروعي 🚀";
  const ctaMsg  = "أهلاً، جاهز أبدأ بموقعي الآن — كم التفاصيل والمدة؟";

  return (
    <div className="page" dir="rtl" lang="ar">

      {/* ── زر واتساب عائم ── */}
      <a className="float-wa" href={waLink(ctaMsg)} target="_blank" rel="noopener noreferrer" aria-label="تواصل عبر واتساب">
        <WhatsIcon size={28} />
      </a>

      {/* ══════════ HERO ══════════ */}
      <section className="hero">
        <div className="hero-bg" />
        <span className="badge">✦ مواقع احترافية · تسليم خلال 7 أيام</span>
        <h1>
          موقعك هو أقوى<br />
          <span className="grad">موظف مبيعات</span><br />
          يعمل 24 ساعة بلا إجازة
        </h1>
        <p className="sub">
          نحوّل زوار صفحتك إلى عملاء حقيقيين — بأسعار تبدأ من{" "}
          <strong>200$</strong> فقط، وتسليم سريع بلا تعقيد.
        </p>
        <a className="btn-wa" href={waLink(heroMsg)} target="_blank" rel="noopener noreferrer">
          <WhatsIcon />
          احصل على موقعك الآن
        </a>
        <div className="trust-bar">
          <span><i className="dot" /> تسليم خلال أسبوع</span>
          <span><i className="dot" /> دعم مجاني بعد التسليم</span>
          <span><i className="dot" /> متجاوب مع كل الأجهزة</span>
        </div>
      </section>

      {/* ══════════ PAIN ══════════ */}
      <section className="pain" ref={reg("pain")}>
        <div className={`reveal ${shown.pain ? "in" : ""}`}>
          <h2>عملك موجود — لكن لا أحد يجده أونلاين</h2>
          <div className="pain-row">
            <div className="pain-item"><span className="pain-ic">✋</span><p>عميلك يبحث عنك ولا يجدك، فيذهب لمنافسك مباشرة.</p></div>
            <div className="pain-item"><span className="pain-ic">💸</span><p>دفعت لمصمم سابقاً والنتيجة موقع لا يحقق أي مبيعات.</p></div>
            <div className="pain-item"><span className="pain-ic">📵</span><p>تعتمد فقط على السوشيال ميديا، وهي تتغير وتُحجب.</p></div>
          </div>
        </div>
      </section>

      {/* ══════════ WORK ══════════ */}
      <section className="work" ref={reg("work")} id="work">
        <div className={`reveal ${shown.work ? "in" : ""}`}>
          <p className="eyebrow">أعمال حقيقية · عملاء حقيقيون</p>
          <h2><span className="admin">آخر ثلاث عملاء</span> — نتائج تتكلم عن نفسها</h2>
        </div>
        <div className="proj-grid">
          {projects.map((p, i) => (
            <div
              key={p.key}
              ref={reg(`proj-${i}`)}
              className={`reveal ${shown[`proj-${i}`] ? "in" : ""}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <ProjectCard {...p} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ VALUE ══════════ */}
      <section className="value" ref={reg("value")}>
        <div className={`reveal ${shown.value ? "in" : ""}`}>
          <div className="value-grid">
            <div className="value-card"><CheckIcon /><p>تصميم احترافي مطابق لهوية عملك</p></div>
            <div className="value-card"><CheckIcon /><p>سرعة تحميل عالية تحافظ على عميلك</p></div>
            <div className="value-card"><CheckIcon /><p>زر واتساب جاهز لاستقبال طلباتك فوراً</p></div>
            <div className="value-card"><CheckIcon /><p>تسليم خلال أسبوع واحد فقط</p></div>
          </div>
        </div>
      </section>

      {/* ══════════ URGENCY BAR ══════════ */}
      <div className="urgency-bar" ref={reg("urgency")}>
        <p>⚡ <strong>متاح هذا الشهر: 4 مشاريع فقط</strong> — نقبل عدداً محدوداً لضمان الجودة. سارع قبل اكتمال المقاعد.</p>
      </div>

      {/* ══════════ PROCESS ══════════ */}
      <section className="process" ref={reg("process")}>
        <div className={`reveal ${shown.process ? "in" : ""}`}>
          <p className="eyebrow">كيف نعمل؟</p>
          <h2>من الفكرة إلى الموقع الحي<br />في 4 خطوات بسيطة</h2>
        </div>
        <div className="steps" ref={reg("steps")}>
          {steps.map((s, i) => (
            <div
              key={i}
              ref={reg(`step-${i}`)}
              className={`reveal ${shown[`step-${i}`] ? "in" : ""}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Step {...s} isLast={i === steps.length - 1} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ PRICING ══════════ */}
      <section className="pricing" ref={reg("pricing")}>
        <div className={`reveal ${shown.pricing ? "in" : ""}`} style={{ textAlign: "center" }}>
          <p className="eyebrow">الأسعار</p>
          <h2>اختر ما يناسب عملك</h2>
          <p className="sub" style={{ margin: "0 auto", maxWidth: 480 }}>
            لا رسوم خفية. السعر الذي تراه هو ما تدفعه تماماً.
          </p>
        </div>
        <div className="pricing-wrap">
          {pricingCards.map((card, i) => (
            <div
              key={i}
              ref={reg(`pc-${i}`)}
              className={`reveal ${shown[`pc-${i}`] ? "in" : ""}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <PriceCard {...card} />
            </div>
          ))}
        </div>
        <p
          ref={reg("pricing-hint")}
          className={`reveal ${shown["pricing-hint"] ? "in" : ""}`}
          style={{ textAlign: "center", marginTop: 24, fontSize: ".83rem", color: "#3A5070" }}
        >
          💡 لا تعرف أيهما يناسبك؟ تواصل معنا مجاناً وسنساعدك تختار الأنسب لعملك تحديداً.
        </p>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="cta" ref={reg("cta")}>
        <div className={`reveal ${shown.cta ? "in" : ""}`}>
          <h2>جاهز يبدأ موقعك هذا الأسبوع؟</h2>
          <p>راسلنا الآن على واتساب واحصل على عرض سعر فوري لمشروعك.</p>
          <a className="btn-wa lg" href={waLink(ctaMsg)} target="_blank" rel="noopener noreferrer">
            <WhatsIcon size={22} />
            تواصل معنا على واتساب
          </a>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer>
        <p>© 2026 — جميع الحقوق محفوظة</p>
      </footer>

    </div>
  );
}
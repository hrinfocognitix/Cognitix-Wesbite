import React, { useState, useEffect, useRef } from 'react';

// Internship curriculum dataset from the Cognitix profile
const INTERNSHIP_MODULES = [
  {
    number: '01',
    title: 'React Native (Android/iOS)',
    category: 'mobile',
    badge: 'Mobile App Dev',
    points: [
      'Building cross-platform mobile applications.',
      'State management with Redux or Context API.',
      'Native module integration and third-party library usage.',
      'Debugging and performance optimization.',
    ],
  },
  {
    number: '02',
    title: 'React JS',
    category: 'frontend',
    badge: 'Frontend SPA',
    points: [
      'Building scalable and dynamic web applications.',
      'Routing and state management with Redux or Context API.',
      'Component-based architecture and hooks.',
    ],
  },
  {
    number: '03',
    title: 'JavaScript and Frontend',
    category: 'frontend',
    badge: 'Core Web & ES6+',
    points: ['Core JavaScript concepts (ES6+).'],
  },
  {
    number: '04',
    title: 'jQuery, HTML, CSS',
    category: 'frontend',
    badge: 'UI & Markup',
    points: [
      'Semantic HTML5 and CSS3 for clean, accessible websites.',
      'Responsive design (Flexbox, Grid, Media Queries).',
      'DOM manipulation and interactive UI with jQuery animations.',
      'AJAX and API integration.',
    ],
  },
  {
    number: '05',
    title: 'UI/UX Design',
    category: 'frontend',
    badge: 'Design Systems',
    points: [
      'UX/UI principles for creating user-friendly websites.',
      'Using design tools like Figma, Adobe XD, or Sketch.',
      'Converting mockups into functional websites.',
    ],
  },
  {
    number: '06',
    title: 'Java (Hibernate/Spring Boot)',
    category: 'backend',
    badge: 'Enterprise Backend',
    points: [
      'Developing backend systems using Hibernate ORM.',
      'Creating RESTful APIs with Spring Boot.',
      'Managing database connections with Hibernate.',
    ],
  },
  {
    number: '07',
    title: 'MongoDB and Node.js',
    category: 'backend',
    badge: 'NoSQL & Node',
    points: [
      'Building scalable backend systems.',
      'MongoDB for NoSQL database design.',
      'Using Express.js for creating server-side applications.',
    ],
  },
  {
    number: '08',
    title: 'PhoneGap and Cordova',
    category: 'mobile',
    badge: 'Hybrid Mobile',
    points: [
      'Developing hybrid mobile applications.',
      'Integrating plugins for device functionalities like camera and GPS.',
    ],
  },
  {
    number: '09',
    title: 'AngularJS (All Versions)',
    category: 'frontend',
    badge: 'SPA Framework',
    points: [
      'Building dynamic single-page applications.',
      'Component-based architecture and RxJS for state management.',
    ],
  },
  {
    number: '10',
    title: 'PHP',
    category: 'backend',
    badge: 'Web Backend',
    points: [
      'Backend development using PHP frameworks like Laravel.',
      'API development and database management.',
    ],
  },
  {
    number: '11',
    title: 'Testing',
    category: 'devops',
    badge: 'QA & Automation',
    points: [
      'Unit testing with tools like Jest, Mocha, or NUnit.',
      'End-to-end testing with Selenium or Cypress.',
      'Automated testing and CI/CD integration.',
    ],
  },
  {
    number: '12',
    title: 'Git and Version Control',
    category: 'devops',
    badge: 'Source & CI/CD',
    points: [
      'Core Git commands (init, add, commit, push, pull).',
      'Branching, merging, and handling conflicts.',
      'Best practices for Git workflows and collaboration.',
      'Using GitHub or GitLab for repository management.',
      'Integrating CI/CD pipelines with Git.',
    ],
  },
  {
    number: '13',
    title: '.NET Development',
    category: 'backend',
    badge: '.NET Core & MVC',
    points: [
      'Introduction to .NET Framework and .NET Core.',
      'Building web applications using ASP.NET MVC or ASP.NET Core.',
      'Entity Framework for ORM and database management.',
      'Developing RESTful APIs with .NET.',
      'Understanding .NET integrations with frontend technologies like Angular or React.',
    ],
  },
  {
    number: '14',
    title: 'Internship Projects',
    category: 'devops',
    badge: 'Live Delivery',
    points: [
      'Real-world projects based on the above technologies.',
      'Full-cycle development: Requirement gathering, coding, testing, and deployment.',
      'Students will work collaboratively on Git-managed projects.',
    ],
  },
  {
    number: '15',
    title: 'Python Programming',
    category: 'backend',
    badge: 'Python & Data',
    points: [
      'Core Python concepts: variables, data types, functions, and modules.',
      'Advanced Python: file handling, exception handling, and object-oriented programming.',
      'Developing REST APIs with Python frameworks like Flask or Django.',
      'Data manipulation and analysis using Pandas and NumPy.',
      'Python scripting for automation and task management.',
      'Integration with databases (MySQL, PostgreSQL, MongoDB).',
    ],
  },
  {
    number: '16',
    title: 'Flutter & Dart',
    category: 'mobile',
    badge: 'Cross-Platform Apps',
    points: [
      'Building cross-platform Android and iOS applications with Flutter.',
      'Creating responsive interfaces with Flutter widgets and layouts.',
      'Managing app state and connecting applications to REST APIs.',
      'Testing, debugging, and preparing apps for release.',
    ],
  },
  {
    number: '17',
    title: 'Full-Stack MERN Development',
    category: 'backend',
    badge: 'MongoDB, Express, React, Node.js',
    points: [
      'Building full-stack applications with MongoDB, Express.js, React, and Node.js.',
      'Creating REST APIs and connecting frontend applications to backend services.',
      'Managing application state, authentication, and database operations.',
      'Deploying and testing complete web applications.',
    ],
  },
  {
    number: '18',
    title: 'Data Analytics',
    category: 'backend',
    badge: 'Data & Insights',
    points: [
      'Preparing, cleaning, and exploring datasets with Python and spreadsheets.',
      'Analyzing data with Pandas and creating clear visualizations.',
      'Building dashboards and communicating actionable insights.',
      'Applying basic statistics to real-world business data.',
    ],
  },
  {
    number: '19',
    title: 'Digital Marketing',
    category: 'marketing',
    badge: 'Digital Growth',
    points: [
      'Planning digital campaigns across search, social media, and email.',
      'Learning SEO, content strategy, and paid advertising fundamentals.',
      'Tracking campaign performance with web analytics and reporting.',
      'Using audience insights to improve reach and engagement.',
    ],
  },
];

const MODULE_COUNT = INTERNSHIP_MODULES.length;
const HR_EMAIL = 'hrinfocognitix@gmail.com';

// Hero slider slides data
const HERO_SLIDES = [
  {
    tag: 'Slide 01 • Training & Internships',
    title: 'Real-World Coding & Live Software Delivery',
    ctaLabel: 'View Syllabus',
    ctaHref: '#curriculum',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    alt: 'Software developers collaborating on a coding project',
  },
  {
    tag: 'Slide 02 • IT Services & Security',
    title: 'Systems Audit, VAPT, GRC & ISO 27000 Compliance',
    ctaLabel: 'Explore Services',
    ctaHref: '#services',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cybersecurity, VAPT, Ethical Hacking, GRC and ISO 27000 Audits',
  },
  {
    tag: 'Slide 03 • Consultancy & Projects',
    title: 'Startups, SMEs & College Mini/Major Projects',
    ctaLabel: 'Get in Touch',
    ctaHref: '#contact',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    alt: 'IT Project Consultancy and Custom Project Development',
  },
];

// Error Boundary so unexpected render errors never crash the app silently
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message || 'Unexpected error occurred.' };
  }

  componentDidCatch(error, info) {
    console.error('CognitixApp Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7FF] p-6">
          <div className="max-w-md w-full rounded-3xl bg-white border border-[#D8C4FF] p-8 text-center shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Something went wrong</h2>
            <p className="text-sm text-slate-600">{this.state.errorMessage}</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, errorMessage: '' })}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white text-sm font-bold"
            >
              Reload View
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  // Mobile menu & slider state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartXRef = useRef(0);

  // Curriculum filters & search state
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Inquiry form state
  const [inquiryTab, setInquiryTab] = useState('internship'); // 'internship' | 'consultancy'
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [officeHub, setOfficeHub] = useState('Kolhapur (Karvir)');
  const [track, setTrack] = useState('General Internship Program');
  const [requirementType, setRequirementType] = useState('Hands-On Internship');
  const [orgName, setOrgName] = useState('');
  const [serviceScope, setServiceScope] = useState('Systems Audit');
  const [message, setMessage] = useState('');

  // Confirmation modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSummary, setModalSummary] = useState('');
  const [emailDraftUrl, setEmailDraftUrl] = useState(
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(HR_EMAIL)}`
  );

  // Auto-advance hero slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Scroll-triggered reveal observer
  useEffect(() => {
    const elements = document.querySelectorAll('.ctx-reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('ctx-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ctx-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleTouchStart = (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      touchStartXRef.current = e.changedTouches[0].clientX;
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        } else {
          setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
        }
      }
    }
  };

  const selectModuleForEnrollment = (moduleLabel) => {
    setInquiryTab('internship');
    const matchedOption = INTERNSHIP_MODULES.map((m) => `${m.number}. ${m.title}`).find(
      (opt) => opt === moduleLabel
    );
    if (matchedOption) {
      setTrack(matchedOption);
    }
  };

  const resetCurriculumFilters = () => {
    setActiveFilter('all');
    setSearchQuery('');
  };

  const filteredModules = INTERNSHIP_MODULES.filter((mod) => {
    const matchesCategory = activeFilter === 'all' || mod.category === activeFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      mod.title.toLowerCase().includes(q) ||
      mod.badge.toLowerCase().includes(q) ||
      mod.points.some((p) => p.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      const typeLabel =
        inquiryTab === 'internship'
          ? 'Student Internship / Project'
          : 'Enterprise IT Consultancy / VAPT Audit';

      const detailLine =
        inquiryTab === 'internship'
          ? `Track: ${track} | Requirement: ${requirementType}`
          : `Organization: ${orgName.trim() || 'Not specified'} | Scope: ${serviceScope}`;

      const summary = `Thank you, ${fullName.trim()}. Your ${typeLabel} request (${detailLine}) for ${officeHub} is ready. Open the email draft to send it to ${HR_EMAIL}, or call +91 7030901355.`;
      setModalSummary(summary);

      const subject = encodeURIComponent(`[Cognitix Inquiry] ${typeLabel} - ${fullName.trim()}`);
      const body = encodeURIComponent(
        `Inquiry Type: ${typeLabel}\nName: ${fullName.trim()}\nPhone: ${phone.trim()}\nEmail: ${email.trim()}\nPreferred Hub: ${officeHub}\n${detailLine}\nDetails: ${message.trim() || 'N/A'}`
      );
      setEmailDraftUrl(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(HR_EMAIL)}&su=${subject}&body=${body}`
      );
      setModalOpen(true);
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  const closeModalAndReset = () => {
    setModalOpen(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setOrgName('');
  };

  return (
    <AppErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-[#FAF7FF] via-[#FFFFFF] to-[#F3ECFF] text-slate-800 antialiased selection:bg-[#7C3AED] selection:text-white overflow-x-hidden">
        {/* Custom animations & responsive touch styles */}
        <style>{`
          @keyframes ctxFloatSlow {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-10px) scale(1.03); }
          }
          @keyframes ctxPulseSoft {
            0%, 100% { opacity: 0.75; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.12); }
          }
          @keyframes ctxFadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .ctx-float-slow { animation: ctxFloatSlow 7s ease-in-out infinite; }
          .ctx-pulse-soft { animation: ctxPulseSoft 4.5s ease-in-out infinite; }
          .ctx-hero-entry { animation: ctxFadeUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) both; }
          .ctx-card-anim { animation: ctxFadeUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
          .ctx-reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1), transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: opacity, transform;
          }
          .ctx-reveal.ctx-visible {
            opacity: 1;
            transform: translateY(0);
          }
          .ctx-card {
            transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease, border-color 0.28s ease;
          }
          .ctx-card:hover { transform: translateY(-4px); }
          .ctx-card:active { transform: scale(0.985); }
          .ctx-btn {
            transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease, box-shadow 0.2s ease;
          }
          .ctx-btn:hover { transform: translateY(-1px); }
          .ctx-btn:active { transform: scale(0.97); }
          @media (prefers-reduced-motion: reduce) {
            .ctx-float-slow, .ctx-pulse-soft, .ctx-hero-entry, .ctx-card-anim, .ctx-reveal, .ctx-card, .ctx-btn {
              animation: none !important;
              transition: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>

        {/* Top Contact Strip */}
        <div className="bg-gradient-to-r from-[#F3ECFF] via-[#EADFFF] to-[#D8C4FF] text-slate-900 text-xs py-2.5 px-3 sm:px-4 border-b border-[#D8C4FF]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="inline-block w-2 h-2 rounded-full bg-[#6D28D9] ctx-pulse-soft shrink-0" />
              <span className="font-medium tracking-wide text-slate-900">
                Cognitix Software and Consultancy Pvt. Ltd. — Bridging Academic Knowledge &amp; Industry
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-slate-900">
              <a
                href="tel:+917030901355"
                className="hover:underline flex items-center gap-1.5 transition font-semibold text-slate-900 py-1 px-1.5 rounded-lg active:bg-white/50"
              >
                <svg className="w-3.5 h-3.5 text-[#5B21B6] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+91 7030901355</span>
              </a>
              <span className="text-slate-400">|</span>
              <a
                href={`mailto:${HR_EMAIL}`}
                className="hover:underline flex items-center gap-1.5 transition font-semibold text-slate-900 py-1 px-1.5 rounded-lg active:bg-white/50"
              >
                <svg className="w-3.5 h-3.5 text-[#5B21B6] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>{HR_EMAIL}</span>
              </a>
              <span className="hidden md:inline text-slate-400">|</span>
              <a
                href="https://cognitix.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex hover:underline items-center gap-1.5 transition font-semibold text-slate-900"
              >
                <svg className="w-3.5 h-3.5 text-[#5B21B6] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span>https://cognitix.tech/</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sticky Navigation Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EADFFF] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20 gap-3 sm:gap-5">
              <a href="#" className="flex items-center gap-3 group shrink-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#7C3AED] via-[#800080] to-[#9333EA] flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md group-hover:scale-105 transition shrink-0">
                  C
                </div>
                <div>
                  <div className="font-bold text-xl sm:text-2xl tracking-tight text-slate-900 leading-none">
                    COGNITIX
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium text-slate-600 mt-1">
                    IT Services &amp; Consulting
                  </div>
                </div>
              </a>

              <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
                <a href="#about" className="hover:text-slate-950 transition py-1 whitespace-nowrap">About</a>
                <a href="#services" className="hover:text-slate-950 transition py-1 whitespace-nowrap">Services</a>
                <a href="#curriculum" className="hover:text-slate-950 transition py-1 whitespace-nowrap">Curriculum ({MODULE_COUNT})</a>
                <a href="#expertise" className="hover:text-slate-950 transition py-1 whitespace-nowrap">Expertise</a>
                <a href="#roadmap" className="hover:text-slate-950 transition py-1 whitespace-nowrap">Roadmap</a>
                <a href="#contact" className="hover:text-slate-950 transition py-1 whitespace-nowrap">Contact</a>
              </nav>

              <div className="hidden md:flex items-center gap-2.5 lg:gap-3 shrink-0 md:ml-auto">
                <a
                  href="tel:+917030901355"
                  className="ctx-btn px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 bg-[#FAF7FF] border border-[#EADFFF] hover:bg-[#F3ECFF] flex items-center gap-1.5 whitespace-nowrap"
                >
                  <svg className="w-4 h-4 text-[#5B21B6] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>7030901355</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setInquiryTab('internship')}
                  className="ctx-btn px-4 lg:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#800080] to-[#9333EA] hover:opacity-95 text-white text-sm font-semibold shadow-md flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Apply / Consult</span>
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle Menu"
                aria-expanded={mobileMenuOpen}
                className="ctx-btn lg:hidden p-2.5 rounded-xl text-slate-800 bg-[#FAF7FF] border border-[#EADFFF] hover:bg-[#F3ECFF] focus:outline-none shrink-0"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-[#EADFFF] px-4 pt-3 pb-6 space-y-1.5 shadow-xl">
              {[
                { href: '#about', label: 'About' },
                { href: '#services', label: 'Services' },
                { href: '#curriculum', label: `Curriculum (${MODULE_COUNT} Modules)` },
                { href: '#expertise', label: 'Expertise' },
                { href: '#roadmap', label: 'Roadmap' },
                { href: '#contact', label: 'Contact' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-800 hover:bg-[#FAF7FF] active:bg-[#F3ECFF] transition"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:+917030901355"
                  className="ctx-btn py-3.5 px-4 rounded-xl border border-[#D8C4FF] bg-[#FAF7FF] text-center text-sm font-semibold text-slate-800"
                >
                  Call +91 7030901355
                </a>
                <a
                  href="#contact"
                  onClick={() => {
                    setInquiryTab('internship');
                    setMobileMenuOpen(false);
                  }}
                  className="ctx-btn py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-center text-sm font-semibold text-white shadow-md"
                >
                  Apply / Consult
                </a>
              </div>
            </div>
          )}
        </header>

        {/* Hero Section with Interactive Slide Images & Background Image */}
        <section className="relative bg-gradient-to-br from-[#FAF7FF] via-[#F3ECFF] to-[#EADFFF] text-slate-900 overflow-hidden border-b border-[#D8C4FF]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-15 mix-blend-multiply"
            style={{
              backgroundImage:
                "url('https://placehold.co/1600x900/EDE4FF/6D28D9?text=Cognitix+Software+%26+Consultancy+Workspace')",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FAF7FF]/85 via-[#F3ECFF]/80 to-[#EADFFF]/85"
          />
          <div className="pointer-events-none absolute -top-24 -right-24 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#D8C4FF]/65 blur-3xl ctx-float-slow" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#EADFFF]/85 blur-3xl ctx-pulse-soft" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-6 space-y-5 sm:space-y-6 ctx-hero-entry">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#D8C4FF] text-slate-900 text-xs sm:text-sm font-semibold shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#7C3AED] ctx-pulse-soft" />
                  <span>Cognitix Software and Consultancy Pvt. Ltd.</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[3rem] font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                  Let’s build a generation of exceptional coders and IT professionals together!
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed max-w-2xl">
                  <strong className="text-slate-900 font-semibold">Cognitix IT Services &amp; Consulting</strong> is an emerging leader in IT training, project development, and consultancy—bridging the gap between academic knowledge and industry requirements by providing real-world IT skills and hands-on experience through internships, education, and industrial projects.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-1">
                  <a
                    href="#curriculum"
                    className="ctx-btn w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#800080] to-[#9333EA] hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    <span>Explore Internship Programs</span>
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setInquiryTab('consultancy')}
                    className="ctx-btn w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#FAF7FF] text-slate-900 border border-[#D8C4FF] font-semibold text-sm sm:text-base shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <svg className="w-5 h-5 text-[#6D28D9] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span>Request IT Consultancy</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4 ctx-hero-entry">
                <div
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="relative rounded-3xl bg-white border border-[#D8C4FF] shadow-xl overflow-hidden"
                >
                  <div
                    className="flex transition-transform duration-500 ease-out touch-pan-y"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {HERO_SLIDES.map((slide) => (
                      <div key={slide.tag} className="w-full shrink-0 relative">
                        <img
                          src={slide.image}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = slide.fallback;
                          }}
                          alt={slide.alt}
                          className="w-full h-56 sm:h-64 md:h-72 object-cover block"
                        />
                        <div className="p-4 sm:p-5 bg-white/95 border-t border-[#EADFFF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6D28D9]">
                              {slide.tag}
                            </span>
                            <h2 className="font-bold text-slate-900 text-base sm:text-lg">
                              {slide.title}
                            </h2>
                          </div>
                          <a
                            href={slide.ctaHref}
                            onClick={() => {
                              if (slide.ctaHref === '#contact') setInquiryTab('consultancy');
                            }}
                            className="ctx-btn self-start sm:self-center px-4 py-2 rounded-xl bg-[#F3ECFF] hover:bg-[#EADFFF] text-slate-900 border border-[#D8C4FF] text-xs font-bold whitespace-nowrap"
                          >
                            {slide.ctaLabel}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                    }
                    aria-label="Previous Slide"
                    className="ctx-btn absolute top-24 sm:top-28 left-3 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 border border-[#D8C4FF] shadow-md flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                    aria-label="Next Slide"
                    className="ctx-btn absolute top-24 sm:top-28 right-3 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 border border-[#D8C4FF] shadow-md flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>

                  <div className="absolute top-48 sm:top-52 md:top-60 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/85 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#D8C4FF] shadow-sm">
                    {HERO_SLIDES.map((s, idx) => (
                      <button
                        key={s.tag}
                        type="button"
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Slide ${idx + 1}`}
                        className={
                          idx === currentSlide
                            ? 'w-6 h-2 rounded-full bg-[#7C3AED] transition-all'
                            : 'w-2 h-2 rounded-full bg-slate-400/70 hover:bg-slate-600 transition-all'
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/90 border border-[#EADFFF] shadow-sm">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">1. Training &amp; Internships</div>
                    <p className="text-[11px] text-slate-600 mt-0.5">Web, Mobile, Backend, Git &amp; DB under mentors.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/90 border border-[#EADFFF] shadow-sm">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">2. IT Security &amp; Audits</div>
                    <p className="text-[11px] text-slate-600 mt-0.5">VAPT, Ethical Hacking, GRC &amp; ISO 27000.</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/90 border border-[#EADFFF] shadow-sm">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">3. Consultancy &amp; Projects</div>
                    <p className="text-[11px] text-slate-600 mt-0.5">SME/Startup IT &amp; college project support.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Key Metrics */}
            <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 ctx-reveal">
              <div className="ctx-card rounded-2xl bg-white/95 border border-[#EADFFF] text-slate-900 p-5 shadow-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#9333EA] text-white flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
                <div>
                  <div className="font-extrabold text-xl text-slate-900">9–10+ Years</div>
                  <div className="text-xs font-medium text-slate-600">Industry Experience</div>
                </div>
              </div>

              <div className="ctx-card rounded-2xl bg-white/95 border border-[#EADFFF] text-slate-900 p-5 shadow-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#800080] text-white flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <div>
                  <div className="font-extrabold text-xl text-slate-900">{MODULE_COUNT} Specialized</div>
                  <div className="text-xs font-medium text-slate-600">Tech Modules</div>
                </div>
              </div>

              <div className="ctx-card rounded-2xl bg-white/95 border border-[#EADFFF] text-slate-900 p-5 shadow-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] text-white flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </div>
                <div>
                  <div className="font-extrabold text-xl text-slate-900">4 Core Service</div>
                  <div className="text-xs font-medium text-slate-600">Verticals</div>
                </div>
              </div>

              <div className="ctx-card rounded-2xl bg-white/95 border border-[#EADFFF] text-slate-900 p-5 shadow-md flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#9333EA] text-white flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="font-extrabold text-xl text-slate-900">2 Maharashtra</div>
                  <div className="text-xs font-medium text-slate-600">Hubs (Kolhapur &amp; Pune)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About, Vision & Mission */}
        <section id="about" className="py-16 sm:py-20 bg-white border-b border-[#EADFFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14 ctx-reveal">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-slate-900 bg-gradient-to-r from-[#F3ECFF] to-[#D8C4FF] border border-[#D8C4FF] px-4 py-1.5 rounded-full">
                About Cognitix
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
                Cognitix IT Services &amp; Consulting
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
                Cognitix IT Services &amp; Consulting is an emerging leader in IT training, project development, and consultancy. We bridge the gap between academic knowledge and industry requirements by providing real-world IT skills and hands-on experience through internships, education, and industrial projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 ctx-reveal">
              <div className="ctx-card rounded-3xl bg-gradient-to-b from-[#FAF7FF] to-white border border-[#EADFFF] p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Our Core Focus</h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Our mission is to develop students into competent IT professionals by focusing on coding, project-based learning, and direct engagement with industry-level tasks under seasoned working mentors.
                </p>
              </div>

              <div className="ctx-card rounded-3xl bg-gradient-to-br from-[#F3ECFF] via-[#EADFFF] to-[#D8C4FF] border border-[#D8C4FF] text-slate-900 p-6 sm:p-8 shadow-md">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                  To empower students and professionals with advanced IT skills and industry expertise, preparing them to meet the challenges of the dynamic global tech industry.
                </p>
              </div>

              <div className="ctx-card rounded-3xl bg-gradient-to-b from-[#FAF7FF] to-white border border-[#EADFFF] p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  To offer cutting-edge training, practical exposure, and technical guidance through real-world IT projects, ensuring our trainees become proficient and job-ready in their chosen domains.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Services & Offerings */}
        <section id="services" className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF7FF] via-[#F3ECFF] to-[#EADFFF]/70 border-b border-[#EADFFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 ctx-reveal">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-slate-900 bg-white border border-[#D8C4FF] px-4 py-1.5 rounded-full shadow-sm">
                Services &amp; Offerings
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
                4 Core Services &amp; Offerings
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 ctx-reveal">
              <div className="ctx-card rounded-3xl bg-white/95 border border-[#EADFFF] p-6 sm:p-8 shadow-md">
                <span className="px-3.5 py-1 rounded-full bg-[#F3ECFF] text-slate-900 border border-[#D8C4FF] text-xs font-bold">
                  01 • Training &amp; Internships
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-3">
                  Hands-On Training &amp; Real-World Internships
                </h3>
                <div className="space-y-2.5 text-sm text-slate-700">
                  <div className="p-3 rounded-xl bg-[#FAF7FF] border border-[#EADFFF]">
                    <strong className="text-slate-900">Web Development:</strong> HTML, CSS, JavaScript, jQuery, REACTJS.
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7FF] border border-[#EADFFF]">
                    <strong className="text-slate-900">Mobile Development:</strong> Flutter, Dart, React Native, PhoneGap, Cordova, Android, and iOS app development.
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7FF] border border-[#EADFFF]">
                    <strong className="text-slate-900">Backend Development:</strong> Java (Spring Boot, Hibernate), Python (Flask/Django), PHP.
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7FF] border border-[#EADFFF]">
                    <strong className="text-slate-900">Version Control &amp; Database:</strong> GIT repository management; MongoDB, MySQL.
                  </div>
                </div>
              </div>

              <div className="ctx-card rounded-3xl bg-white/95 border border-[#EADFFF] p-6 sm:p-8 shadow-md">
                <span className="px-3.5 py-1 rounded-full bg-[#F3ECFF] text-slate-900 border border-[#D8C4FF] text-xs font-bold">
                  02 • IT Services
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-3">
                  Cybersecurity, Audits &amp; Compliance
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="p-3 rounded-xl bg-[#FAF7FF] border border-[#EADFFF]">
                    <strong className="text-slate-900">Systems Audit:</strong> Comprehensive evaluation of IT infrastructure.
                  </li>
                  <li className="p-3 rounded-xl bg-[#FAF7FF] border border-[#EADFFF]">
                    <strong className="text-slate-900">Vulnerability Assessment &amp; Penetration Testing (VAPT).</strong>
                  </li>
                  <li className="p-3 rounded-xl bg-[#FAF7FF] border border-[#EADFFF]">
                    <strong className="text-slate-900">Ethical Hacking:</strong> Identifying and mitigating security risks.
                  </li>
                  <li className="p-3 rounded-xl bg-[#FAF7FF] border border-[#EADFFF]">
                    <strong className="text-slate-900">Governance, Risk, and Compliance (GRC) &amp; ISO 27000 Audits</strong> + Software Security Services.
                  </li>
                </ul>
              </div>

              <div className="ctx-card rounded-3xl bg-white/95 border border-[#EADFFF] p-6 sm:p-8 shadow-md">
                <span className="px-3.5 py-1 rounded-full bg-[#F3ECFF] text-slate-900 border border-[#D8C4FF] text-xs font-bold">
                  03 • Consultancy
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-3">
                  End-to-End IT Project Consultancy
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  End-to-end IT project consultancy for startups, SMEs, and educational institutions with assistance in building scalable and secure software solutions.
                </p>
              </div>

              <div className="ctx-card rounded-3xl bg-white/95 border border-[#EADFFF] p-6 sm:p-8 shadow-md">
                <span className="px-3.5 py-1 rounded-full bg-[#F3ECFF] text-slate-900 border border-[#D8C4FF] text-xs font-bold">
                  04 • Project Development
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-3">
                  Custom &amp; Academic Project Engineering
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Industry-level projects tailored to client needs, mini and major projects for college students, and support for college students in technical report writing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internship Program Curriculum */}
        <section id="curriculum" className="py-16 sm:py-20 bg-white border-b border-[#EADFFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 ctx-reveal">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-slate-900 bg-gradient-to-r from-[#F3ECFF] to-[#D8C4FF] border border-[#D8C4FF] px-4 py-1.5 rounded-full">
                {MODULE_COUNT}-Topic Industry Syllabus
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
                Topics for Internship Program
              </h2>
            </div>

            <div className="ctx-card mb-10 rounded-3xl bg-gradient-to-r from-[#FAF7FF] via-[#F3ECFF] to-[#EADFFF] border border-[#D8C4FF] text-slate-900 p-6 sm:p-8 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6 ctx-reveal">
              <div className="space-y-2 max-w-4xl">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-slate-900 border border-[#D8C4FF] text-xs font-bold shadow-sm">
                  Internship Focus
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Hands-On Coding Practice &amp; Real-World Industry Scenarios
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Our internships emphasize hands-on coding practice, aiming to develop students into proficient coders. Each intern is either tasked with completing their own project or contributing to assigned tasks that mirror real-world industry scenarios.
                </p>
              </div>
              <a
                href="#contact"
                onClick={() => setInquiryTab('internship')}
                className="ctx-btn shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:opacity-95 text-white font-bold text-sm text-center shadow-md"
              >
                Apply for Internship
              </a>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-8 bg-[#FAF7FF] p-4 rounded-2xl border border-[#EADFFF] ctx-reveal">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: `All ${MODULE_COUNT} Modules` },
                  { id: 'frontend', label: 'Frontend & Design' },
                  { id: 'mobile', label: 'Mobile Development' },
                  { id: 'backend', label: 'Backend & Full-Stack' },
                  { id: 'marketing', label: 'Marketing' },
                  { id: 'devops', label: 'Testing, Git & Projects' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    className={
                      activeFilter === tab.id
                        ? 'ctx-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white shadow-sm'
                        : 'ctx-btn px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-800 border border-[#D8C4FF] hover:bg-[#F3ECFF]'
                    }
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search MERN, Flutter, analytics, marketing..."
                className="w-full lg:w-72 px-4 py-2.5 rounded-xl border border-[#D8C4FF] bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              />
            </div>

            {filteredModules.length === 0 ? (
              <div className="text-center py-12 bg-[#FAF7FF] rounded-3xl border border-[#EADFFF]">
                <h4 className="font-bold text-slate-900">No matching modules found</h4>
                <button
                  type="button"
                  onClick={resetCurriculumFilters}
                  className="ctx-btn mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white text-sm font-semibold shadow-sm"
                >
                  Show All {MODULE_COUNT} Topics
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModules.map((mod, idx) => (
                  <div
                    key={mod.number}
                    style={{ animationDelay: `${Math.min(idx * 45, 360)}ms` }}
                    className="ctx-card ctx-card-anim rounded-3xl bg-white/95 border border-[#EADFFF] p-6 hover:border-[#D8C4FF] hover:shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white font-bold text-xs shadow-sm">
                          Topic {mod.number}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 bg-[#FAF7FF] border border-[#EADFFF] px-2.5 py-1 rounded-lg">
                          {mod.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">{mod.title}</h3>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {mod.points.map((point) => (
                          <li key={point} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#F3ECFF]">
                      <a
                        href="#contact"
                        onClick={() => selectModuleForEnrollment(`${mod.number}. ${mod.title}`)}
                        className="ctx-btn inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:opacity-95 text-white text-xs font-bold shadow-sm"
                      >
                        <span>Enroll in Module</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Technical Expertise & Future Roadmap */}
        <section id="expertise" className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF7FF] via-[#F3ECFF] to-[#EADFFF]/70 border-b border-[#EADFFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 ctx-reveal">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-slate-900 bg-white border border-[#D8C4FF] px-4 py-1.5 rounded-full shadow-sm">
                9–10+ Years Experience
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
                Technical Expertise &amp; Why Choose Cognitix
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-14 ctx-reveal">
              {[
                { title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'ReactJS'] },
                { title: 'Mobile', items: ['PhoneGap', 'Cordova'] },
                { title: 'Backend', items: ['Java (Spring Boot, Hibernate)', 'Python'] },
                { title: 'Database', items: ['MongoDB'] },
                { title: 'SDLC & Testing', items: ['SDLC', 'Testing'] },
              ].map((group) => (
                <div key={group.title} className="ctx-card rounded-3xl bg-white/95 border border-[#EADFFF] p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-base mb-3">{group.title}</h3>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    {group.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div id="roadmap" className="pt-10 border-t border-[#D8C4FF] ctx-reveal">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
                Future Plans (5 Strategic Initiatives)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {[
                  {
                    num: '01',
                    title: 'Expand Training Offerings',
                    desc: 'Introduce specialized courses in emerging technologies like AI, ML, Blockchain, and Cloud Computing.',
                  },
                  {
                    num: '02',
                    title: 'Global Reach',
                    desc: 'Expand our internship and consultancy services to an international audience.',
                  },
                  {
                    num: '03',
                    title: 'Educational Partnerships',
                    desc: 'Collaborate with colleges and educational institutions to strengthen industry-ready skill development.',
                  },
                  {
                    num: '04',
                    title: 'Corporate Training',
                    desc: 'Offer customized training programs tailored for enterprise teams and organizations.',
                  },
                  {
                    num: '05',
                    title: 'Product Development',
                    desc: 'Create proprietary software solutions to drive long-term innovation and value.',
                  },
                ].map((item) => (
                  <div key={item.num} className="ctx-card rounded-3xl bg-white/95 border border-[#EADFFF] p-6 shadow-sm">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#9333EA] text-white font-extrabold text-sm flex items-center justify-center mb-4">
                      {item.num}
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-2">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section & Form */}
        <section id="contact" className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start ctx-reveal">
              <div className="lg:col-span-5 ctx-card rounded-3xl bg-gradient-to-br from-[#F3ECFF] via-[#EADFFF] to-[#D8C4FF] border border-[#D8C4FF] text-slate-900 p-6 sm:p-8 shadow-lg space-y-5">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Cognitix Software and Consultancy Pvt. Ltd.
                </h2>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a href="tel:+917030901355" className="underline font-semibold">
                      +91 7030901355
                    </a>
                  </p>
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${HR_EMAIL}`} className="underline font-semibold">
                      {HR_EMAIL}
                    </a>
                  </p>
                  <p>
                    <strong>Website:</strong>{' '}
                    <a href="https://cognitix.tech/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                      https://cognitix.tech/
                    </a>
                  </p>
                </div>
                <div className="pt-4 border-t border-white/70 text-xs sm:text-sm space-y-3">
                  <div>
                    <strong>Kolhapur Office (Karvir):</strong>
                    <p className="text-slate-700 mt-0.5">
                      R.S.No 547 B wing Flat No 201 Indranand Greens (near Manora hotel), Karvir, Kolhapur, 416008.
                    </p>
                  </div>
                  <div>
                    <strong>Pune Office (Talawade, Pimpri Chinchwad):</strong>
                    <p className="text-slate-700 mt-0.5">
                      Flat 304,305 Jay Hari building, Near balaji English medium school talawade Pimpri Chinchwad, Pune, Maharashtra 411062.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 rounded-3xl bg-[#FAF7FF] border border-[#EADFFF] p-6 sm:p-8 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 rounded-2xl bg-white mb-6 border border-[#EADFFF]">
                  <button
                    type="button"
                    onClick={() => setInquiryTab('internship')}
                    className={
                      inquiryTab === 'internship'
                        ? 'ctx-btn py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white shadow-sm'
                        : 'ctx-btn py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-800 hover:bg-[#FAF7FF]'
                    }
                  >
                    Student Internship / Project
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryTab('consultancy')}
                    className={
                      inquiryTab === 'consultancy'
                        ? 'ctx-btn py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white shadow-sm'
                        : 'ctx-btn py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-800 hover:bg-[#FAF7FF]'
                    }
                  >
                    Enterprise IT Consultancy / VAPT Audit
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name *"
                      className="w-full px-4 py-3 rounded-xl border border-[#D8C4FF] bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number (+91) *"
                      className="w-full px-4 py-3 rounded-xl border border-[#D8C4FF] bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address *"
                      className="w-full px-4 py-3 rounded-xl border border-[#D8C4FF] bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    />
                    <select
                      value={officeHub}
                      onChange={(e) => setOfficeHub(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#D8C4FF] bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                    >
                      <option value="Kolhapur (Karvir)">Kolhapur (Karvir)</option>
                      <option value="Pune (Talawade, Pimpri Chinchwad)">Pune (Talawade, Pimpri Chinchwad)</option>
                      <option value="Remote / Online">Remote / Online</option>
                    </select>
                  </div>

                  {inquiryTab === 'internship' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <select
                        value={track}
                        onChange={(e) => setTrack(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#D8C4FF] bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                      >
                        <option value="General Internship Program">General Internship Program</option>
                        {INTERNSHIP_MODULES.map((m) => (
                          <option key={m.number} value={`${m.number}. ${m.title}`}>
                            {m.number}. {m.title}
                          </option>
                        ))}
                      </select>
                      <select
                        value={requirementType}
                        onChange={(e) => setRequirementType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#D8C4FF] bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                      >
                        <option value="Hands-On Internship">Hands-On Internship</option>
                        <option value="College Mini / Major Project">College Mini / Major Project</option>
                        <option value="Technical Report Writing Support">Technical Report Writing Support</option>
                      </select>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="Organization / Institution Name"
                        className="w-full px-4 py-3 rounded-xl border border-[#D8C4FF] bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                      />
                      <select
                        value={serviceScope}
                        onChange={(e) => setServiceScope(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#D8C4FF] bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                      >
                        <option value="Systems Audit">Systems Audit</option>
                        <option value="Vulnerability Assessment & Penetration Testing (VAPT)">
                          Vulnerability Assessment &amp; Penetration Testing (VAPT)
                        </option>
                        <option value="Ethical Hacking">Ethical Hacking</option>
                        <option value="Governance, Risk, and Compliance (GRC)">
                          Governance, Risk, and Compliance (GRC)
                        </option>
                        <option value="ISO 27000 Audits">ISO 27000 Audits</option>
                        <option value="Software Security Services">Software Security Services</option>
                        <option value="End-to-End IT Project Consultancy">End-to-End IT Project Consultancy</option>
                        <option value="Tailored Client Project Development">Tailored Client Project Development</option>
                      </select>
                    </div>
                  )}

                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your goals, timeline, college/company details, or questions..."
                    className="w-full px-4 py-3 rounded-xl border border-[#D8C4FF] bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />

                  <button
                    type="submit"
                    className="ctx-btn w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#800080] to-[#9333EA] hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-lg"
                  >
                    {inquiryTab === 'internship'
                      ? 'Submit Student Internship / Project Inquiry'
                      : 'Request Enterprise IT Consultancy / VAPT Audit'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Confirmation Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="ctx-card bg-white rounded-3xl border border-[#EADFFF] max-w-md w-full p-6 sm:p-8 shadow-2xl text-center space-y-5">
              <h3 className="text-2xl font-bold text-slate-900">Inquiry Prepared!</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{modalSummary}</p>
              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={emailDraftUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ctx-btn w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white text-sm font-bold shadow-md hover:opacity-95"
                >
                  Open Email Draft to HR / Consulting
                </a>
                <button
                  type="button"
                  onClick={closeModalAndReset}
                  className="ctx-btn w-full py-3.5 px-5 rounded-xl bg-[#FAF7FF] border border-[#D8C4FF] text-slate-800 text-sm font-semibold hover:bg-[#F3ECFF]"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-gradient-to-br from-[#FAF7FF] via-[#F3ECFF] to-[#EADFFF] text-slate-800 border-t border-[#D8C4FF] py-8 px-4 text-center text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Cognitix Software and Consultancy Pvt. Ltd. All rights reserved.
        </footer>
      </div>
    </AppErrorBoundary>
  );
}
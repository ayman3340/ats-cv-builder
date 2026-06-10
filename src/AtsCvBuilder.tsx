import React, { useState, useRef, useEffect } from 'react';
import { 
  User, Briefcase, GraduationCap, Wrench, 
  CheckCircle, Printer, Palette, Heart,
  Search, FileText, Plus, Trash2, Info, Layout, Image as ImageIcon,
  Download, Type, Moon, Sun, Zap, Languages, Globe2, FileOutput, Award, Maximize,
  ArrowUp, ArrowDown, Move, Upload
} from 'lucide-react';

const AtsCvBuilder = () => {
  const [activeTab, setActiveTab] = useState('editor');
  const [activeTemplate, setActiveTemplate] = useState('classic');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editLang, setEditLang] = useState('ar'); 
  const [printBilingual, setPrintBilingual] = useState(false); 
  const [notification, setNotification] = useState('');
  
  const fileInputRef = useRef(null);

  const [appSettings, setAppSettings] = useState({
    fontFamily: 'Cairo', 
    fontSizeAr: 14, 
    fontSizeFr: 14,
    lineHeightAr: 1.6,
    lineHeightFr: 1.6,
    showImage: true,
    imageSize: 100,
    scaleAr: 95, 
    scaleFr: 85,  
    sectionSizesAr: {
      summary: 100, experience: 100, volunteer: 100, education: 100, courses: 100, skills: 100, languages: 100
    },
    sectionSizesFr: {
      summary: 100, experience: 100, volunteer: 100, education: 100, courses: 100, skills: 100, languages: 100
    }
  });

  const [sectionOrder, setSectionOrder] = useState([
    'summary', 'experience', 'volunteer', 'education', 'courses', 'skills', 'languages'
  ]);

  const arabicAbbasData = {
    themeColor: '#1e3a8a', 
    personal: { 
      name: 'عباس يحيى محمد', 
      email: 'basyhyrb@gmail.com', 
      phone: '0023566708377', 
      linkedin: '', 
      location: 'تشاد , انجمينا' 
    },
    image: null,
    summary: 'أتمتع بخلفية أكاديمية ومهنية صلبة تنطلق من تخصصي في العلوم الشرعية والقانونية، وخبرتي في تدريس القرآن الكريم والتجويد والفقه. تتقاطع هذه الحصيلة المعرفية مع مسيرة مهنية متنوعة تجمع بين الإدارة التنفيذية، والإشراف الميداني، وريادة الأعمال. وقد أثمرت إدارتي لمشروع تنقية المياه عن كفاءة عالية في قيادة فرق العمل، وضبط العمليات والتدفقات المالية. كما أن تجربتي الميدانية في قطاع الحج والعمرة كمشرف، عززت مهاراتي في التخطيط، وإدارة الحشود، وتقديم رعاية متكاملة للوفود، مع سرعة البديهة وحسن التصرف في مختلف المواقف. وإلى جانب إجادتي لاستخدام الحاسب الآلي وبرامج Microsoft Office، أمتلك تجربة ناجحة في الاستثمار الزراعي عبر إدارة مشروع إنتاجي خاص، وخبرة في القطاع التجاري، مما يجعلني رصيداً قيماً ومؤهلاً للإسهام بفاعلية في أي مؤسسة تبحث عن الكفاءة.',
    experience: [
      { title: 'مدير مشروع ومشرّف ميداني', company: 'مشروع تنقية المياه', date: 'تاريخ سابق', description: '• قيادة فريق كبير من العاملين والإشراف الكامل على العمليات الميدانية.\n• ضبط الجوانب المالية للمشروع وإدارة الموارد بكفاءة.\n• إدارة الأعمال والفرق وتنسيق المهام لضمان سير العمل.' },
      { title: 'مشرف إدارة العمرة والحج', company: 'حملات الحج والعمرة', date: 'تاريخ سابق', description: '• تحمل المسؤولية الكاملة في مواسم الحج وإدارة تفويج المجموعات.\n• التنظيم والتنسيق الميداني وحل المشكلات وحسن التصرف في المواقف الحرجة.\n• خدمة ضيوف الرحمن وضمان تقديم أفضل مستوى من الرعاية.' },
      { title: 'معلم ومربي', company: 'قطاع التعليم', date: 'تاريخ سابق', description: '• تدريس القرآن الكريم والتجويد.\n• تدريس الفقه والمواد الشرعية الأساسية.' },
      { title: 'مدير مشروع زراعي وتاجر', company: 'أعمال حرة', date: 'تاريخ سابق', description: '• إدارة مشروع زراعي صغير والإشراف على العمليات الزراعية.\n• ممارسة التجارة وإدارة المبيعات والتسويق.' }
    ],
    volunteer: [
      { title: 'عضو فريق تطوعي', company: 'فريق ساهم التطوعي', date: '2020 - 2025', description: '• تقديم أكثر من 200 ساعة تطوعية في مجالات مختلفة.' },
      { title: 'إمام جامع', company: 'جامع الشهداء', date: 'تاريخ سابق', description: '• إمامة المصلين وتقديم الدروس والمواعظ وتوجيه المجتمع.' }
    ],
    education: [
      { degree: 'بكالوريوس الشريعة والقانون', institution: 'جامعة حائل - كلية الشريعة والقانون', date: '2024' }
    ],
    courses: [
      { title: 'دورة مهمات العلم', institution: 'المدينة المنورة', date: 'تم التكريم' },
      { title: 'دورة ابن جبرين', institution: 'الرياض', date: 'تم التكريم' },
      { title: 'دورة في تأهيل الأئمة والخطباء', institution: 'جهة معتمدة', date: 'تم التكريم' },
      { title: 'دورات في الآجرومية والفقه وأصول الفقه والعقيدة', institution: 'متعدد', date: 'تم التكريم' }
    ],
    languages: [
      { name: 'اللغة العربية', level: 'ممتاز' },
      { name: 'اللغة الفرنسية', level: 'متوسط' },
      { name: 'لغات محلية', level: 'لغتان أو أكثر' }
    ],
    skills: 'الإدارة والقيادة، الإشراف الميداني، التنظيم والتنسيق، حل المشكلات، إدارة المشاريع المالية، استخدام الحاسب الآلي، Microsoft Office'
  };

  const frenchAbbasData = {
    themeColor: '#1e3a8a', 
    personal: { 
      name: 'Abass Yahya Mahamat', 
      email: 'basyhyrb@gmail.com', 
      phone: '0023566708377', 
      linkedin: '', 
      location: 'Tchad, N\'Djaména' 
    },
    image: null,
    summary: 'Je possède une solide formation académique et professionnelle issue de ma spécialisation en sciences islamiques et juridiques, et de mon expérience dans l\'enseignement du Saint Coran, du Tajweed et du Fiqh. Ce bagage cognitif s\'entrecroise avec un parcours professionnel diversifié alliant gestion exécutive, supervision sur le terrain et entrepreneuriat. Ma gestion d\'un projet de purification d\'eau m\'a permis de développer une grande compétence dans la direction d\'équipes et le contrôle des opérations et des flux financiers. De plus, mon expérience sur le terrain dans le secteur du Hajj et de la Omra en tant que superviseur a renforcé mes compétences en planification, en gestion des foules et en prestation de soins complets aux délégations, avec une grande réactivité dans diverses situations. Outre ma maîtrise de l\'informatique et de Microsoft Office, j\'ai une expérience réussie dans l\'investissement agricole et le secteur commercial, ce qui fait de moi un atout précieux et qualifié pour contribuer efficacement au sein de toute institution recherchant compétence et discipline.',
    experience: [
      { title: 'Chef de projet et Superviseur terrain', company: 'Projet de purification d\'eau', date: 'Expérience précédente', description: '• Direction d\'une grande équipe et supervision complète des opérations sur le terrain.\n• Contrôle des aspects financiers du projet et gestion efficace des ressources.\n• Gestion des affaires et des équipes, coordination des tâches pour assurer le bon déroulement du travail.' },
      { title: 'Superviseur de la Omra et du Hajj', company: 'Campagnes du Hajj et de la Omra', date: 'Expérience précédente', description: '• Prise en charge complète lors des saisons du Hajj et gestion des groupes.\n• Organisation, coordination sur le terrain, résolution de problèmes et gestion des situations critiques.\n• Service aux pèlerins et garantie du meilleur niveau de soins.' },
      { title: 'Enseignant et Éducateur', company: 'Secteur de l\'éducation', date: 'Expérience précédente', description: '• Enseignement du Saint Coran et du Tajweed.\n• Enseignement du Fiqh et des sciences islamiques fondamentales.' },
      { title: 'Gestionnaire de projet agricole et Commerçant', company: 'Travailleur indépendant', date: 'Expérience précédente', description: '• Gestion d\'un petit projet agricole et supervision des opérations.\n• Pratique du commerce, gestion des ventes et du marketing.' }
    ],
    volunteer: [
      { title: 'Membre bénévole', company: 'Équipe de bénévolat Sahem', date: '2020 - 2025', description: '• Plus de 200 heures de bénévolat réalisées dans divers domaines.' },
      { title: 'Imam de mosquée', company: 'Mosquée Al-Shuhada', date: 'Expérience précédente', description: '• Direction des prières, sermons et orientation de la communauté.' }
    ],
    education: [
      { degree: 'Licence en Charia et Droit', institution: 'Université de Haïl', date: '2024' }
    ],
    courses: [
      { title: 'Cours Muhimmat Al-Ilm', institution: 'Médine', date: 'Honoré' },
      { title: 'Cours Ibn Jibreen', institution: 'Riyad', date: 'Honoré' },
      { title: 'Qualification des Imams et Prédicateurs', institution: 'Institution accréditée', date: 'Honoré' },
      { title: 'Cours en Grammaire (Ajurrumiyya), Fiqh et Dogme', institution: 'Divers', date: 'Honoré' }
    ],
    languages: [
      { name: 'Arabe', level: 'Excellent' },
      { name: 'Français', level: 'Intermédiaire' },
      { name: 'Langues locales', level: '2 langues ou plus' }
    ],
    skills: 'Gestion et Leadership, Supervision sur le terrain, Organisation et Coordination, Résolution de problèmes, Gestion financière de projets, Informatique, Microsoft Office'
  };

  const [resumeDataAr, setResumeDataAr] = useState(arabicAbbasData);
  const [resumeDataFr, setResumeDataFr] = useState(frenchAbbasData);
  const [jobDescription, setJobDescription] = useState('');
  const [atsAnalysis, setAtsAnalysis] = useState(null);

  const activeData = editLang === 'ar' ? resumeDataAr : resumeDataFr;
  const setActiveData = editLang === 'ar' ? setResumeDataAr : setResumeDataFr;

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const moveSectionOrder = (index, direction) => {
    const newOrder = [...sectionOrder];
    if (direction === 'up' && index > 0) {
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    } else if (direction === 'down' && index < newOrder.length - 1) {
      [newOrder[index + 1], newOrder[index]] = [newOrder[index], newOrder[index + 1]];
    }
    setSectionOrder(newOrder);
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    setResumeDataAr(prev => ({ ...prev, themeColor: color }));
    setResumeDataFr(prev => ({ ...prev, themeColor: color }));
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeDataAr(prev => ({ ...prev, image: reader.result }));
        setResumeDataFr(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setResumeDataAr(prev => ({ ...prev, image: null }));
    setResumeDataFr(prev => ({ ...prev, image: null }));
  };

  const updatePersonal = (field, value) => setActiveData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  const addField = (section, defaultObj) => setActiveData(prev => ({ ...prev, [section]: [...prev[section], defaultObj] }));
  const removeField = (section, index) => setActiveData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
  
  const updateSection = (section, index, field, value) => {
    setActiveData(prev => {
      const newData = [...prev[section]];
      newData[index][field] = value;
      return { ...prev, [section]: newData };
    });
  };

  const moveField = (section, index, direction) => {
    setActiveData(prev => {
      const newData = [...prev[section]];
      if (direction === 'up' && index > 0) {
        [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
      } else if (direction === 'down' && index < newData.length - 1) {
        [newData[index + 1], newData[index]] = [newData[index], newData[index + 1]];
      }
      return { ...prev, [section]: newData };
    });
  };

  const exportData = () => {
    const dataToExport = { ar: resumeDataAr, fr: resumeDataFr, settings: appSettings, order: sectionOrder };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport));
    const a = document.createElement('a');
    a.href = dataStr; a.download = "cv_abbas_backup.json"; a.click();
    showNotification("تم حفظ النسخة الاحتياطية بنجاح");
  };

  const importData = (e) => {
    const reader = new FileReader();
    reader.readAsText(e.target.files[0], "UTF-8");
    reader.onload = e => {
      try {
        const imported = JSON.parse(e.target.result);
        if(imported.ar) setResumeDataAr(imported.ar);
        if(imported.fr) setResumeDataFr(imported.fr);
        if(imported.settings) {
          const s = imported.settings;
          setAppSettings({
            ...s,
            fontSizeAr: s.fontSizeAr || s.fontSize || 14,
            fontSizeFr: s.fontSizeFr || s.fontSize || 14,
            lineHeightAr: s.lineHeightAr || s.lineHeight || 1.6,
            lineHeightFr: s.lineHeightFr || s.lineHeight || 1.6,
            sectionSizesAr: s.sectionSizesAr || s.sectionSizes || {summary: 100, experience: 100, volunteer: 100, education: 100, courses: 100, skills: 100, languages: 100},
            sectionSizesFr: s.sectionSizesFr || s.sectionSizes || {summary: 100, experience: 100, volunteer: 100, education: 100, courses: 100, skills: 100, languages: 100}
          });
        }
        if(imported.order) setSectionOrder(imported.order);
        showNotification("تم استرجاع البيانات بنجاح!");
      } catch (err) {
        showNotification("ملف غير صالح.");
      }
    };
  };

  const analyzeATS = () => {
    if (!jobDescription.trim()) return;
    const words = jobDescription.match(/[\u0600-\u06FFa-zA-Z]{3,}/g) || [];
    const stopWords = ['على', 'إلى', 'في', 'من', 'عن'];
    const wordCounts = {};
    words.forEach(w => {
      const lowerW = w.toLowerCase();
      if (!stopWords.includes(lowerW)) wordCounts[lowerW] = (wordCounts[lowerW] || 0) + 1;
    });
    const keywords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]).map(entry => entry[0]).slice(0, 15);
    const cvText = JSON.stringify(activeData).toLowerCase();
    const matched = keywords.filter(k => cvText.includes(k));
    const missing = keywords.filter(k => !cvText.includes(k));
    setAtsAnalysis({ matched, missing, score: Math.round((matched.length / (keywords.length || 1)) * 100) });
  };

  const handleAutoFit = (langCode) => {
    const container = document.getElementById(`cv-render-${langCode}`);
    if (!container) return;
    
    // إزالة تأثيرات التصغير مؤقتاً لقياس الحجم الطبيعي بدقة
    const originalZoom = container.style.zoom;
    const originalWidth = container.style.width;
    const originalMinHeight = container.style.minHeight;
    container.style.zoom = '1';
    container.style.width = '210mm';
    container.style.minHeight = '297mm';
    void container.offsetHeight; // فرض إعادة الحساب

    const rawHeight = container.scrollHeight;
    const a4HeightPx = 1122; // الارتفاع التقريبي لصفحة A4 بالبكسل
    
    if (rawHeight > a4HeightPx) {
      const newScale = Math.floor((a4HeightPx / rawHeight) * 98); // 98% لترك هامش بسيط
      setAppSettings(prev => ({ ...prev, [langCode === 'ar' ? 'scaleAr' : 'scaleFr']: Math.max(40, newScale) }));
      showNotification(`تم تصغير وتكيف النسخة (${langCode === 'ar' ? 'العربية' : 'الفرنسية'}) بنجاح!`);
    } else {
      setAppSettings(prev => ({ ...prev, [langCode === 'ar' ? 'scaleAr' : 'scaleFr']: 100 }));
      showNotification(`النسخة (${langCode === 'ar' ? 'العربية' : 'الفرنسية'}) بحجم مناسب ولا تتجاوز الصفحة.`);
    }

    // استعادة التأثيرات
    container.style.zoom = originalZoom;
    container.style.width = originalWidth;
    container.style.minHeight = originalMinHeight;
  };

  const sectionNames = {
    summary: editLang === 'ar' ? 'الملخص المهني' : 'Profil Professionnel',
    experience: editLang === 'ar' ? 'الخبرات العملية' : 'Expériences',
    volunteer: editLang === 'ar' ? 'الخبرات التطوعية' : 'Bénévolat',
    education: editLang === 'ar' ? 'التعليم والمؤهلات' : 'Éducation',
    courses: editLang === 'ar' ? 'الدورات التدريبية' : 'Formations',
    languages: editLang === 'ar' ? 'اللغات' : 'Langues',
    skills: editLang === 'ar' ? 'المهارات' : 'Compétences'
  };

  const renderDescription = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      if(line.trim()) return <div key={idx} className="mb-1 leading-relaxed break-words">{line.startsWith('•') ? line : `• ${line}`}</div>;
      return null;
    });
  };

  const getLighterColor = (hex) => `${hex}20`; 

  const renderLayout = (data, languageCode) => {
    const isFr = languageCode === 'fr';
    const docDir = isFr ? 'ltr' : 'rtl';
    const alignClass = isFr ? 'text-left' : 'text-right';
    
    const labels = {
      summary: isFr ? 'Profil Professionnel' : 'الملخص المهني',
      experience: isFr ? 'Expériences Professionnelles' : 'الخبرات العملية',
      volunteer: isFr ? 'Bénévolat et Engagements' : 'الخبرات التطوعية',
      education: isFr ? 'Éducation et Diplômes' : 'التعليم والمؤهلات',
      courses: isFr ? 'Formations et Certificats' : 'الدورات التدريبية',
      skills: isFr ? 'Compétences Clés' : 'المهارات',
      languages: isFr ? 'Langues' : 'اللغات',
      contact: isFr ? 'Contact' : 'التواصل'
    };

    const { personal, summary, experience, volunteer, education, courses, languages, skills, themeColor, image } = data;
    const s = appSettings;
    const currentFontSize = isFr ? s.fontSizeFr : s.fontSizeAr;
    const currentLineHeight = isFr ? s.lineHeightFr : s.lineHeightAr;
    const currentSectionSizes = isFr ? s.sectionSizesFr : s.sectionSizesAr;
    const imgSize = `${(s.imageSize / 100) * 100}px`; 

    const renderEmail = () => <span dir="ltr" className="inline-block" style={{ unicodeBidi: 'plaintext' }}>{personal.email}</span>;
    const renderPhone = () => <span dir="ltr" className="inline-block" style={{ unicodeBidi: 'plaintext' }}>{personal.phone}</span>;

    // تجهيز كتل المحتوى مع تطبيق نسبة تصغير كل حقل (sectionSizes) بشكل فردي
    const fs = (section) => `${currentFontSize * (currentSectionSizes?.[section] || 100) / 100}px`;

    const blocks = {
      summary: summary ? (
        <div className="mb-4" style={{ fontSize: fs('summary') }}>
          <h2 className="font-bold mb-2 pb-1 uppercase tracking-widest" style={{ fontSize: '1.2em', borderBottom: `1px solid ${themeColor}`, color: themeColor }}>{labels.summary}</h2>
          <p className="text-justify break-words">{summary}</p>
        </div>
      ) : null,
      experience: experience.length > 0 ? (
        <div className="mb-4" style={{ pageBreakInside: 'avoid', fontSize: fs('experience') }}>
          <h2 className="font-bold mb-3 pb-1 uppercase tracking-widest" style={{ fontSize: '1.2em', borderBottom: `1px solid ${themeColor}`, color: themeColor }}>{labels.experience}</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-3" style={{ pageBreakInside: 'avoid' }}>
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1 gap-1">
                <h3 className="font-bold text-slate-900 break-words" style={{ fontSize: '1.1em' }}>{exp.title}</h3>
                <span className="font-bold shrink-0" style={{ color: themeColor, fontSize: '0.9em' }}>{exp.date}</span>
              </div>
              <div className="font-semibold text-slate-700 mb-1 break-words">{exp.company}</div>
              <div className="text-slate-800 ml-4 pl-2 break-words" style={{ fontSize: '0.9em' }}>{renderDescription(exp.description)}</div>
            </div>
          ))}
        </div>
      ) : null,
      volunteer: volunteer.length > 0 ? (
        <div className="mb-4" style={{ pageBreakInside: 'avoid', fontSize: fs('volunteer') }}>
          <h2 className="font-bold mb-3 pb-1 uppercase tracking-widest" style={{ fontSize: '1.2em', borderBottom: `1px solid ${themeColor}`, color: themeColor }}>{labels.volunteer}</h2>
          {volunteer.map((vol, i) => (
            <div key={i} className="mb-3" style={{ pageBreakInside: 'avoid' }}>
              <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1 gap-1">
                <h3 className="font-bold text-slate-900 break-words" style={{ fontSize: '1.1em' }}>{vol.title}</h3>
                <span className="font-bold shrink-0" style={{ color: themeColor, fontSize: '0.8em' }}>{vol.date}</span>
              </div>
              <div className="font-semibold text-slate-600 break-words" style={{ fontSize: '0.9em' }}>{vol.company}</div>
              <div className="text-slate-700 ml-4 pl-2 break-words" style={{ fontSize: '0.9em' }}>{renderDescription(vol.description)}</div>
            </div>
          ))}
        </div>
      ) : null,
      education: education.length > 0 ? (
        <div className="mb-4" style={{ pageBreakInside: 'avoid', fontSize: fs('education') }}>
          <h2 className="font-bold mb-3 pb-1 uppercase tracking-widest" style={{ fontSize: '1.2em', borderBottom: `1px solid ${themeColor}`, color: themeColor }}>{labels.education}</h2>
          {education.map((edu, i) => (
            <div key={i} className="flex flex-col sm:flex-row justify-between items-baseline mb-2 gap-1" style={{ pageBreakInside: 'avoid' }}>
              <div className="break-words">
                <h3 className="font-bold text-slate-900 break-words" style={{ fontSize: '1.1em' }}>{edu.degree}</h3>
                <div className="text-slate-700 break-words" style={{ fontSize: '0.9em' }}>{edu.institution}</div>
              </div>
              <span className="font-bold shrink-0" style={{ color: themeColor, fontSize: '0.9em' }}>{edu.date}</span>
            </div>
          ))}
        </div>
      ) : null,
      courses: courses.length > 0 ? (
        <div className="mb-4" style={{ pageBreakInside: 'avoid', fontSize: fs('courses') }}>
          <h2 className="font-bold mb-3 pb-1 uppercase tracking-widest" style={{ fontSize: '1.2em', borderBottom: `1px solid ${themeColor}`, color: themeColor }}>{labels.courses}</h2>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1" style={{ fontSize: '0.9em' }}>
            {courses.map((c, i) => <div key={i} className="mb-1 break-words">• <strong>{c.title}</strong> - {c.institution} <span className="opacity-70">({c.date})</span></div>)}
          </div>
        </div>
      ) : null,
      languages: languages.length > 0 ? (
        <div className="mb-4" style={{ pageBreakInside: 'avoid', fontSize: fs('languages') }}>
          <h2 className="font-bold mb-2 pb-1 uppercase tracking-widest" style={{ fontSize: '1.2em', borderBottom: `1px solid ${themeColor}`, color: themeColor }}>{labels.languages}</h2>
          {languages.map((l, i) => <div key={i} className="mb-1 break-words" style={{ fontSize: '0.9em' }}>• <strong>{l.name}</strong>: {l.level}</div>)}
        </div>
      ) : null,
      skills: skills ? (
        <div className="mb-4" style={{ pageBreakInside: 'avoid', fontSize: fs('skills') }}>
          <h2 className="font-bold mb-2 pb-1 uppercase tracking-widest" style={{ fontSize: '1.2em', borderBottom: `1px solid ${themeColor}`, color: themeColor }}>{labels.skills}</h2>
          <p className="leading-relaxed break-words" style={{ fontSize: '0.9em' }}>{skills}</p>
        </div>
      ) : null,
    };

    switch(activeTemplate) {
      case 'classic':
      case 'professional-ats':
      case 'harvard':
      case 'academic':
      case 'journal':
      case 'minimalist':
        const isHarvard = activeTemplate === 'harvard' || activeTemplate === 'academic' || activeTemplate === 'journal';
        return (
          <div className={`p-[10mm] bg-white w-full min-h-[297mm] ${isHarvard ? 'font-serif' : ''} ${alignClass}`} dir={docDir} style={{ fontFamily: isHarvard ? 'Times New Roman, serif' : s.fontFamily, fontSize: `${currentFontSize}px`, lineHeight: currentLineHeight }}>
            <div className={`text-center pb-4 mb-4 ${activeTemplate === 'journal' ? 'border-b-4 border-double border-black' : 'border-b-2'}`} style={{ borderColor: themeColor }}>
              {s.showImage && image && <img src={image} alt="Profile" className="rounded-full mx-auto mb-3 object-cover border-2" style={{ borderColor: themeColor, width: imgSize, height: imgSize, maxWidth: '150px', maxHeight: '150px' }} />}
              <h1 className="text-3xl font-bold mb-2 uppercase break-words" style={{ color: isHarvard ? '#000' : themeColor }}>{personal.name}</h1>
              <div className="flex flex-wrap justify-center gap-x-3 text-slate-700 font-medium">
                {personal.location && <span>{personal.location}</span>}
                {personal.phone && <span>| {renderPhone()}</span>}
                {personal.email && <span>| {renderEmail()}</span>}
              </div>
            </div>
            
            {sectionOrder.map(sectionId => (
               <React.Fragment key={sectionId}>
                 {blocks[sectionId]}
               </React.Fragment>
            ))}
          </div>
        );

      case 'modern':
      case 'two-tone':
      case 'creative':
      case 'right-sidebar':
      case 'minimalist-split':
      case 'asymmetrical':
        const isRight = activeTemplate === 'right-sidebar' || activeTemplate === 'asymmetrical';
        const isCreative = activeTemplate === 'creative';
        const sidebarSectionsIds = ['languages', 'skills'];
        const mainSectionsIds = ['summary', 'experience', 'volunteer', 'education', 'courses'];
        
        return (
          <div className={`w-full min-h-[297mm] flex ${isRight ? (isFr ? 'flex-row-reverse' : 'flex-row-reverse') : 'flex-row'} text-slate-800`} dir={docDir} style={{ fontFamily: s.fontFamily, fontSize: `${currentFontSize}px`, lineHeight: currentLineHeight, backgroundColor: '#fff' }}>
            <div className={`w-[30%] p-[10mm] ${isCreative ? 'bg-slate-900 text-slate-300' : 'text-slate-900 border-x border-slate-200'}`} style={{ backgroundColor: isCreative ? '#0f172a' : getLighterColor(themeColor) }}>
              {s.showImage && image && <img src={image} alt="Profile" className={`rounded-full mx-auto mb-6 object-cover border-4 ${isCreative ? 'border-slate-800' : 'border-white'} shadow-md`} style={{ width: imgSize, height: imgSize, maxWidth: '150px', maxHeight: '150px' }}/>}
              <h2 className={`font-bold pb-1 mb-4 text-lg break-words ${isCreative ? 'text-white' : ''}`} style={{ borderBottom: `2px solid ${themeColor}` }}>{labels.contact}</h2>
              <div className="flex flex-col gap-3 mb-8 text-sm font-medium">
                {personal.phone && <div>{renderPhone()}</div>}
                {personal.email && <div className="break-words">{renderEmail()}</div>}
                {personal.location && <div className="break-words">{personal.location}</div>}
              </div>
              
              {sectionOrder.filter(id => sidebarSectionsIds.includes(id)).map(sectionId => (
                 <React.Fragment key={sectionId}>
                   {blocks[sectionId] && (
                      <div className="mb-6" style={{ pageBreakInside: 'avoid', fontSize: fs(sectionId) }}>
                        <h2 className={`font-bold pb-1 mb-4 break-words ${isCreative ? 'text-white' : ''}`} style={{ borderBottom: `2px solid ${themeColor}`, fontSize: '1.2em' }}>{labels[sectionId]}</h2>
                        {sectionId === 'languages' ? (
                           <div className="flex flex-col gap-2" style={{ fontSize: '0.9em' }}>
                             {languages.map((lang, i) => <div key={i} className="break-words"><strong>{lang.name}</strong><br/><span className="opacity-80 break-words">{lang.level}</span></div>)}
                           </div>
                        ) : (
                           <div className="leading-loose break-words" style={{ fontSize: '0.9em' }}>
                             {skills.split(',').map((sk, i) => sk.trim() && <div key={i} className="break-words">✓ {sk.trim()}</div>)}
                           </div>
                        )}
                      </div>
                   )}
                 </React.Fragment>
              ))}
            </div>
            
            <div className={`w-[70%] p-[10mm] ${alignClass}`}>
              <h1 className="font-black mb-6 break-words" style={{ fontSize: `${currentFontSize * 2.8}px`, color: themeColor }}>{personal.name}</h1>
              
              {sectionOrder.filter(id => mainSectionsIds.includes(id)).map(sectionId => (
                 <React.Fragment key={sectionId}>
                   {blocks[sectionId] && (
                     <div className="mb-6" style={{ pageBreakInside: 'avoid', fontSize: fs(sectionId) }}>
                       {sectionId === 'summary' && summary ? (
                          <div className="mb-6 p-4 rounded-lg bg-slate-50 border-r-4 border-l-4 border-transparent" style={{ [isFr ? 'borderLeftColor' : 'borderRightColor']: themeColor }}><p className="text-justify leading-relaxed break-words" style={{ fontSize: '0.9em' }}>{summary}</p></div>
                       ) : sectionId === 'experience' && experience.length > 0 ? (
                          <div>
                            <h2 className="font-bold mb-4 flex items-center gap-2 break-words" style={{ color: themeColor, fontSize: '1.3em' }}>{labels.experience}</h2>
                            {experience.map((exp, i) => (
                              <div key={i} className="mb-4" style={{ pageBreakInside: 'avoid' }}>
                                <h3 className="font-bold text-slate-900 break-words" style={{ fontSize: '1.1em' }}>{exp.title}</h3>
                                <div className="flex flex-col sm:flex-row sm:justify-between font-bold opacity-80 mb-2 gap-1" style={{ color: themeColor, fontSize: '0.9em' }}>
                                  <span className="break-words">{exp.company}</span><span className="shrink-0">{exp.date}</span>
                                </div>
                                <div className="pl-2 break-words" style={{ fontSize: '0.9em' }}>{renderDescription(exp.description)}</div>
                              </div>
                            ))}
                          </div>
                       ) : sectionId === 'volunteer' && volunteer.length > 0 ? (
                          <div>
                            <h2 className="font-bold mb-4 flex items-center gap-2 break-words" style={{ color: themeColor, fontSize: '1.3em' }}>{labels.volunteer}</h2>
                            {volunteer.map((vol, i) => (
                              <div key={i} className="mb-3 bg-slate-50 p-3 rounded" style={{ pageBreakInside: 'avoid' }}>
                                <h3 className="font-bold text-slate-900 break-words" style={{ fontSize: '1em' }}>{vol.title} <span className="font-normal opacity-70 break-words" style={{ fontSize: '0.8em' }}>({vol.company})</span></h3>
                                <div className="break-words" style={{ fontSize: '0.8em' }}>{renderDescription(vol.description)}</div>
                              </div>
                            ))}
                          </div>
                       ) : sectionId === 'education' && education.length > 0 ? (
                          <div>
                            <h2 className="font-bold mb-4 break-words" style={{ color: themeColor, fontSize: '1.3em' }}>{labels.education}</h2>
                            {education.map((edu, i) => (
                              <div key={i} className="mb-2" style={{ pageBreakInside: 'avoid' }}>
                                <h3 className="font-bold text-slate-900 break-words" style={{ fontSize: '1.1em' }}>{edu.degree}</h3>
                                <div className="flex flex-col sm:flex-row sm:justify-between text-slate-600 gap-1" style={{ fontSize: '0.9em' }}><span className="break-words">{edu.institution}</span><span style={{ color: themeColor }} className="font-bold shrink-0">{edu.date}</span></div>
                              </div>
                            ))}
                          </div>
                       ) : sectionId === 'courses' && courses.length > 0 ? (
                          <div>
                            <h2 className="font-bold mb-4 break-words" style={{ color: themeColor, fontSize: '1.3em' }}>{labels.courses}</h2>
                            {courses.map((c, i) => <div key={i} className="mb-1 break-words" style={{ fontSize: '0.9em' }}>• {c.title} - <span className="opacity-70">{c.institution}</span></div>)}
                          </div>
                       ) : null}
                     </div>
                   )}
                 </React.Fragment>
              ))}
            </div>
          </div>
        );

      case 'corporate':
      case 'executive':
      case 'stripe':
      case 'startup':
      case 'tech':
      case 'ribbon':
        return (
          <div className={`bg-white w-full min-h-[297mm] text-slate-800 ${alignClass}`} dir={docDir} style={{ fontFamily: s.fontFamily, fontSize: `${currentFontSize}px`, lineHeight: currentLineHeight }}>
             <div className="p-[10mm] text-white shadow-md relative overflow-hidden" style={{ backgroundColor: themeColor }}>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
               <div className="relative z-10 flex items-center gap-6">
                 {s.showImage && image && <img src={image} alt="Profile" className="rounded-full border-4 border-white shadow-xl object-cover shrink-0" style={{ width: imgSize, height: imgSize, maxWidth: '140px', maxHeight: '140px' }}/>}
                 <div>
                   <h1 className="text-4xl font-black mb-2 text-white drop-shadow-md break-words">{personal.name}</h1>
                   <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm opacity-90 font-medium">
                     {personal.email && <span>{renderEmail()}</span>}
                     {personal.phone && <span>{renderPhone()}</span>}
                     {personal.location && <span className="break-words">{personal.location}</span>}
                   </div>
                 </div>
               </div>
             </div>
             <div className="p-[10mm] pt-8">
               {sectionOrder.map(sectionId => <React.Fragment key={sectionId}>{blocks[sectionId]}</React.Fragment>)}
             </div>
          </div>
        );

      case 'boxed':
      case 'cards':
      case 'grid-layout':
      case 'compact':
        const isGrid = activeTemplate === 'grid-layout';
        return (
          <div className={`p-[8mm] bg-slate-100 w-full min-h-[297mm] text-slate-800 ${alignClass}`} dir={docDir} style={{ fontFamily: s.fontFamily, fontSize: `${currentFontSize}px`, lineHeight: currentLineHeight }}>
             <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 text-center border-t-8" style={{ borderColor: themeColor }}>
               {s.showImage && image && <img src={image} alt="Profile" className="rounded-full mx-auto mb-3 object-cover shadow-sm border-2" style={{ borderColor: themeColor, width: imgSize, height: imgSize, maxWidth: '120px', maxHeight: '120px' }}/>}
               <h1 className="text-3xl font-black mb-2 break-words" style={{ color: themeColor }}>{personal.name}</h1>
               <div className="text-slate-600 text-sm flex flex-wrap justify-center gap-3 font-semibold">
                 {personal.email && <span>{renderEmail()}</span>}
                 {personal.phone && <span>{renderPhone()}</span>}
                 {personal.location && <span>{personal.location}</span>}
               </div>
             </div>
             <div className={isGrid ? (isFr ? "columns-1 md:columns-2 gap-6 space-y-6 dir-ltr" : "columns-1 md:columns-2 gap-6 space-y-6") : "space-y-4"}>
               {sectionOrder.map(sectionId => blocks[sectionId] ? (
                 <div key={sectionId} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 break-inside-avoid w-full inline-block">
                   {blocks[sectionId]}
                 </div>
               ) : null)}
             </div>
          </div>
        );

      case 'terminal':
      case 'dark-elegant':
        const isTerm = activeTemplate === 'terminal';
        return (
          <div className={`p-[10mm] w-full min-h-[297mm] template-dark ${alignClass}`} dir={docDir} style={{ backgroundColor: isTerm ? '#0a0a0a' : '#0f172a', '--theme-color': isTerm ? '#22c55e' : themeColor, fontFamily: isTerm ? 'monospace' : s.fontFamily, fontSize: `${currentFontSize}px`, lineHeight: currentLineHeight }}>
            <div className="border-b-2 pb-6 mb-8" style={{ borderColor: 'var(--theme-color)' }}>
              <div className="flex items-center gap-6">
                 {s.showImage && image && <img src={image} alt="Profile" className={`object-cover shrink-0 ${isTerm ? 'rounded-none grayscale opacity-80' : 'rounded-full border-2 border-white shadow-lg'}`} style={{ width: imgSize, height: imgSize, maxWidth: '130px', maxHeight: '130px' }}/>}
                 <div>
                   <h1 className="text-4xl font-black mb-2 break-words" style={{ color: 'var(--theme-color)' }}>{isTerm ? `> ${personal.name}_` : personal.name}</h1>
                   <div className="flex flex-wrap gap-4 text-sm opacity-80 text-white font-mono">
                      {personal.email && <span>{renderEmail()}</span>}
                      {personal.phone && <span>{renderPhone()}</span>}
                      {personal.location && <span>{personal.location}</span>}
                   </div>
                 </div>
              </div>
            </div>
            <div className="space-y-2">
             {sectionOrder.map(sectionId => (
               <React.Fragment key={sectionId}>{blocks[sectionId]}</React.Fragment>
            ))}
            </div>
          </div>
        );

      case 'avatar-centered':
      case 'luxury':
      case 'sleek':
      case 'rounded':
      case 'modern-minimal':
        return (
          <div className={`p-[10mm] bg-white w-full min-h-[297mm] text-slate-800 ${alignClass}`} dir={docDir} style={{ fontFamily: s.fontFamily, fontSize: `${currentFontSize}px`, lineHeight: currentLineHeight }}>
             <div className="flex flex-col items-center text-center mb-8 pb-6 border-b" style={{ borderColor: `${themeColor}40` }}>
               {s.showImage && image && <img src={image} alt="Profile" className="rounded-full mb-5 object-cover shadow-2xl border-4" style={{ borderColor: themeColor, width: '150px', height: '150px' }} />}
               <h1 className="text-4xl font-black mb-3 tracking-wide uppercase break-words" style={{ color: themeColor }}>{personal.name}</h1>
               <div className="w-16 h-1 mb-4 rounded-full" style={{ backgroundColor: themeColor }}></div>
               <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold opacity-75">
                  {personal.email && <span>{renderEmail()}</span>}
                  {personal.phone && <span>{renderPhone()}</span>}
                  {personal.location && <span>{personal.location}</span>}
               </div>
             </div>
             <div className="px-4 md:px-8 space-y-2">
               {sectionOrder.map(sectionId => <React.Fragment key={sectionId}>{blocks[sectionId]}</React.Fragment>)}
             </div>
          </div>
        );

      case 'timeline':
      case 'geometric':
      case 'overlay':
      case 'split-header':
      default:
        return (
          <div className={`p-[10mm] bg-white w-full min-h-[297mm] text-slate-800 ${alignClass}`} dir={docDir} style={{ fontFamily: s.fontFamily, fontSize: `${currentFontSize}px`, lineHeight: currentLineHeight }}>
             <div className="relative mb-10 p-6 rounded-br-[40px] rounded-tl-[40px] shadow-sm" style={{ backgroundColor: `${themeColor}10`, borderLeft: isFr ? 'none' : `8px solid ${themeColor}`, borderRight: isFr ? `8px solid ${themeColor}` : 'none' }}>
               <div className="flex items-center gap-6">
                 {s.showImage && image && <img src={image} alt="Profile" className="rounded-2xl object-cover shadow-md shrink-0" style={{ width: imgSize, height: imgSize, maxWidth: '120px', maxHeight: '120px' }}/>}
                 <div>
                   <h1 className="text-4xl font-black mb-3 break-words" style={{ color: themeColor }}>{personal.name}</h1>
                   <div className="text-sm font-bold text-slate-700 flex flex-wrap gap-4">
                     {personal.email && <span>{renderEmail()}</span>}
                     {personal.phone && <span>{renderPhone()}</span>}
                     {personal.location && <span>{personal.location}</span>}
                   </div>
                 </div>
               </div>
             </div>
             <div className={`relative ${activeTemplate === 'timeline' ? (isFr ? 'border-l-2 ml-4 pl-6' : 'border-r-2 mr-4 pr-6') : ''}`} style={{ borderColor: themeColor }}>
               {sectionOrder.map(sectionId => <React.Fragment key={sectionId}>{blocks[sectionId]}</React.Fragment>)}
             </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen text-slate-900 font-sans flex flex-col h-screen overflow-hidden ${isDarkMode ? 'dark' : ''}`} dir="rtl">
      
      {/* Toast Notification */}
      {notification && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-fade-in font-bold">
          {notification}
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&family=Cairo:wght@400;700;900&family=Readex+Pro:wght@400;700&family=Tajawal:wght@400;700;900&display=swap');
        
        .dark { background: #0f172a; color: #f8fafc; }
        .dark .bg-white { background: #1e293b !important; border-color: #334155; }
        .dark .bg-slate-50, .dark .bg-slate-100 { background: #0f172a !important; }
        .dark .text-slate-800, .dark .text-slate-900 { color: #f8fafc !important; }
        .dark .text-slate-600, .dark .text-slate-700, .dark .text-slate-500 { color: #cbd5e1 !important; }
        .dark input, .dark textarea, .dark select { background: #0f172a; color: white; border-color: #334155; }
        
        .template-dark * { color: #f8fafc !important; border-color: rgba(255,255,255,0.15) !important; }
        .template-dark h2, .template-dark h3 { color: var(--theme-color) !important; border-bottom-color: var(--theme-color) !important; }
        .template-dark .bg-slate-50, .template-dark .bg-slate-100 { background-color: transparent !important; }
        .template-dark p, .template-dark div, .template-dark span { color: inherit !important; }

        .break-words {
          word-break: break-word;
          overflow-wrap: break-word;
        }

        @media print {
          @page { size: A4; margin: 0; }
          body, html, #root, .min-h-screen, main, .print-area { 
            height: auto !important; 
            min-height: auto !important;
            overflow: visible !important;
            display: block !important;
            background: white !important;
          }
          .no-print { display: none !important; }
          .print-area { 
            width: 100% !important; 
            margin: 0 !important; 
            padding: 0 !important; 
          }
          .cv-page-container {
             position: relative !important;
             margin: 0 auto !important;
             padding: 0 !important;
             box-shadow: none !important;
             border: none !important;
             page-break-after: always; 
             overflow: visible !important;
             background-image: none !important; 
          }
          .cv-page-container:last-of-type {
             page-break-after: auto; 
          }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
        }
      `}} />

      <header className="bg-slate-900 text-white p-3 shadow-lg no-print z-20 shrink-0">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="text-yellow-400" />
            <h1 className="text-xl font-bold tracking-wide">CV Pro Builder (Ultimate)</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setPrintBilingual(!printBilingual)} 
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold transition text-sm ${printBilingual ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
              title="طباعة النسختين معاً في PDF واحد"
            >
              <FileOutput size={18} /> {printBilingual ? 'الطباعة: دمج اللغتين' : 'الطباعة: صفحة منفصلة'}
            </button>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded hover:bg-slate-800 transition">
              {isDarkMode ? <Sun size={20} className="text-yellow-400"/> : <Moon size={20}/>}
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg font-bold transition shadow-lg shadow-emerald-500/20">
              <Printer size={18} /> تصدير PDF
            </button>
          </div>
        </div>
      </header>

      {/* حساب متغيرات الاحتواء الذكي */}
      {(() => {
        const activeScaleFactor = (printBilingual ? appSettings.scaleAr : (editLang === 'ar' ? appSettings.scaleAr : appSettings.scaleFr)) / 100;
        const vWidthActive = 210 / activeScaleFactor;
        const vHeightActive = 297 / activeScaleFactor;
        
        const frScaleFactor = appSettings.scaleFr / 100;
        const vWidthFr = 210 / frScaleFactor;
        const vHeightFr = 297 / frScaleFactor;

        return (
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        <div className="w-full lg:w-[45%] xl:w-[40%] bg-white flex flex-col border-l border-slate-200 no-print h-full shrink-0 shadow-lg z-10 transition-colors">
          
          <div className="flex flex-wrap bg-slate-50 border-b border-slate-200 shrink-0">
            {[
              { id: 'editor', icon: FileText, label: 'البيانات' },
              { id: 'tools', icon: Wrench, label: 'إعدادات ⚙️' },
              { id: 'templates', icon: Layout, label: 'القوالب' },
              { id: 'ats', icon: Search, label: 'فحص ATS' }
            ].map(tab => (
              <button 
                key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-sm font-bold flex flex-col justify-center items-center gap-1 transition-colors ${activeTab === tab.id ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
            
            {/* Editor Area */}
            {activeTab === 'editor' && (
              <div className="space-y-8 animate-fade-in">
                
                <div className="flex bg-slate-200 p-1 rounded-lg mb-6">
                  <button onClick={() => setEditLang('ar')} className={`flex-1 py-2 rounded-md font-bold text-sm transition-colors ${editLang === 'ar' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}>🇸🇦 النسخة العربية</button>
                  <button onClick={() => setEditLang('fr')} className={`flex-1 py-2 rounded-md font-bold text-sm transition-colors ${editLang === 'fr' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}>🇫🇷 النسخة الفرنسية</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <section className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
                    <h2 className="text-sm font-bold text-slate-800 mb-3 w-full text-center">الصورة الشخصية</h2>
                    <div className="flex flex-col items-center gap-4 w-full">
                      {activeData.image ? (
                        <div className="relative">
                          <img src={activeData.image} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-sm" />
                          <button onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm"><Trash2 size={12}/></button>
                        </div>
                      ) : (
                        <label className="flex items-center justify-center w-16 h-16 bg-white rounded-full cursor-pointer hover:bg-slate-100 transition border-2 border-dashed border-slate-300 shadow-sm">
                          <Plus size={18} className="text-slate-400"/>
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                      )}
                      
                      <div className="w-full mt-2 flex flex-col items-center">
                         <div className="flex items-center justify-between w-full text-xs text-slate-500 mb-1">
                            <span className="flex items-center gap-1"><ImageIcon size={12}/> تصغير</span>
                            <span className="flex items-center gap-1"><Maximize size={12}/> تكبير</span>
                         </div>
                         <input type="range" min="50" max="150" value={appSettings.imageSize} onChange={(e) => setAppSettings(prev => ({...prev, imageSize: parseInt(e.target.value)}))} className="w-full accent-blue-600" />
                      </div>
                    </div>
                  </section>

                  <section className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-between">
                    <h2 className="text-sm font-bold text-slate-800 mb-3">لون القالب</h2>
                    <input type="color" value={activeData.themeColor} onChange={handleColorChange} className="w-16 h-16 rounded cursor-pointer border-none shadow-sm" />
                  </section>
                </div>

                <section>
                  <h2 className="text-lg font-bold border-b pb-2 mb-4"><User size={18} className="inline mr-2 text-blue-600"/> المعلومات الشخصية</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" placeholder={editLang === 'ar' ? 'الاسم الكامل' : 'Nom Complet'} value={activeData.personal.name} onChange={(e) => updatePersonal('name', e.target.value)} className="col-span-1 sm:col-span-2 p-2 border rounded text-sm" />
                    <input type="text" placeholder={editLang === 'ar' ? 'البريد الإلكتروني' : 'Email'} value={activeData.personal.email} onChange={(e) => updatePersonal('email', e.target.value)} className="p-2 border rounded text-sm text-left" dir="ltr" />
                    <input type="text" placeholder={editLang === 'ar' ? 'الهاتف' : 'Téléphone'} value={activeData.personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} className="p-2 border rounded text-sm text-left" dir="ltr" />
                    <input type="text" placeholder={editLang === 'ar' ? 'العنوان' : 'Adresse'} value={activeData.personal.location} onChange={(e) => updatePersonal('location', e.target.value)} className="col-span-1 sm:col-span-2 p-2 border rounded text-sm" />
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-bold border-b pb-2 mb-4"><FileText size={18} className="inline mr-2 text-blue-600"/> الملخص المهني</h2>
                  <textarea value={activeData.summary} onChange={(e) => setActiveData(prev => ({...prev, summary: e.target.value}))} className="w-full p-3 border rounded-lg h-28 text-sm leading-relaxed" />
                </section>

                {['experience', 'volunteer', 'education', 'courses', 'languages'].map(sectionName => (
                  <section key={sectionName}>
                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                      <h2 className="text-lg font-bold flex items-center gap-2 capitalize">
                        {sectionName === 'experience' && <Briefcase size={18} className="text-blue-600"/>}
                        {sectionName === 'volunteer' && <Heart size={18} className="text-red-500"/>}
                        {sectionName === 'education' && <GraduationCap size={18} className="text-blue-600"/>}
                        {sectionName === 'courses' && <Award size={18} className="text-blue-600"/>}
                        {sectionName === 'languages' && <Languages size={18} className="text-blue-600"/>}
                        {sectionNames[sectionName]}
                      </h2>
                      <button onClick={() => addField(sectionName, sectionName === 'languages' ? {name:'', level:''} : (sectionName === 'education' ? {degree:'', institution:'', date:''} : {title:'', company:'', date:'', description:''}))} className="text-emerald-600 font-bold text-sm">+ إضافة</button>
                    </div>
                    {activeData[sectionName].map((item, index) => (
                      <div key={index} className="bg-slate-50 p-3 rounded-lg border border-slate-200 relative mb-3 pt-10">
                        <div className="absolute top-2 left-2 flex items-center gap-1 bg-white rounded-md p-1 border border-slate-200 shadow-sm z-10" dir="ltr">
                          <button onClick={() => removeField(sectionName, index)} className="p-1 rounded text-red-500 hover:bg-red-50" title="حذف"><Trash2 size={14}/></button>
                          <div className="w-px h-4 bg-slate-200 mx-1"></div>
                          <button onClick={() => moveField(sectionName, index, 'down')} disabled={index === activeData[sectionName].length - 1} className={`p-1 rounded transition-colors ${index === activeData[sectionName].length - 1 ? 'opacity-30 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}><ArrowDown size={14}/></button>
                          <button onClick={() => moveField(sectionName, index, 'up')} disabled={index === 0} className={`p-1 rounded transition-colors ${index === 0 ? 'opacity-30 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}><ArrowUp size={14}/></button>
                        </div>

                        {sectionName === 'languages' ? (
                          <div className="flex gap-2 mb-2">
                             <input type="text" placeholder='اللغة' value={item.name} onChange={(e) => updateSection(sectionName, index, 'name', e.target.value)} className="flex-1 p-2 border rounded text-sm" />
                             <input type="text" placeholder='المستوى' value={item.level} onChange={(e) => updateSection(sectionName, index, 'level', e.target.value)} className="flex-1 p-2 border rounded text-sm" />
                          </div>
                        ) : sectionName === 'education' || sectionName === 'courses' ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                            <input value={item.degree || item.title} onChange={(e) => updateSection(sectionName, index, sectionName==='education'?'degree':'title', e.target.value)} className="col-span-1 sm:col-span-2 p-2 border rounded text-sm" placeholder='العنوان / الدرجة'/>
                            <input value={item.institution} onChange={(e) => updateSection(sectionName, index, 'institution', e.target.value)} className="p-2 border rounded text-sm" placeholder='الجهة / المؤسسة'/>
                            <input value={item.date} onChange={(e) => updateSection(sectionName, index, 'date', e.target.value)} className="p-2 border rounded text-sm" placeholder='التاريخ'/>
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                              <input type="text" placeholder='المسمى' value={item.title} onChange={(e) => updateSection(sectionName, index, 'title', e.target.value)} className="col-span-1 sm:col-span-2 p-2 border rounded text-sm" />
                              <input type="text" placeholder='الجهة' value={item.company} onChange={(e) => updateSection(sectionName, index, 'company', e.target.value)} className="p-2 border rounded text-sm" />
                              <input type="text" placeholder='التاريخ' value={item.date} onChange={(e) => updateSection(sectionName, index, 'date', e.target.value)} className="p-2 border rounded text-sm" />
                            </div>
                            <textarea placeholder='الوصف والمهام...' value={item.description} onChange={(e) => updateSection(sectionName, index, 'description', e.target.value)} className="w-full p-2 border rounded text-sm h-20 resize-none" />
                          </>
                        )}
                      </div>
                    ))}
                  </section>
                ))}

                <section>
                  <h2 className="text-lg font-bold border-b pb-2 mb-4"><Wrench size={18} className="inline mr-2 text-blue-600"/> المهارات المتفرقة</h2>
                  <textarea value={activeData.skills} onChange={(e) => setActiveData(prev => ({...prev, skills: e.target.value}))} className="w-full p-3 border rounded-lg h-24 text-sm leading-relaxed" placeholder="المهارات مفصولة بفواصل" />
                </section>
              </div>
            )}

            {/* Tools Area */}
            {activeTab === 'tools' && (
              <div className="space-y-6 animate-fade-in">
                
                <section className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2"><Upload size={18}/> الحفظ والاسترجاع (نسخة احتياطية)</h3>
                  <div className="flex gap-2">
                    <button onClick={exportData} className="flex-1 bg-blue-600 text-white py-2 rounded text-sm font-bold shadow-sm hover:bg-blue-700">تصدير (حفظ)</button>
                    <input type="file" ref={fileInputRef} onChange={importData} accept=".json" className="hidden" />
                    <button onClick={() => fileInputRef.current.click()} className="flex-1 bg-white text-blue-600 border border-blue-300 py-2 rounded text-sm font-bold shadow-sm hover:bg-blue-50">استرجاع (رفع)</button>
                  </div>
                </section>

                <section className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                     <h3 className="font-bold text-amber-900 flex items-center gap-2"><Maximize size={18}/> أداة ضبط الطباعة</h3>
                     <button onClick={() => { handleAutoFit('ar'); handleAutoFit('fr'); }} className="text-xs bg-amber-600 text-white px-3 py-1.5 rounded hover:bg-amber-700 font-bold transition">احتواء ذكي 🪄</button>
                  </div>
                  <p className="text-xs text-amber-700 mb-4">إذا كانت السيرة تتجاوز الصفحة، استخدم الاحتواء الذكي أو قم بالتصغير يدوياً.</p>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded border border-amber-100">
                       <label className="flex justify-between text-sm font-bold text-slate-800 mb-2"><span className="flex items-center gap-2">🇸🇦 تصغير/تكبير (العربية) <button onClick={() => handleAutoFit('ar')} className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-700 px-1.5 py-0.5 rounded">احتواء</button></span> <span>{appSettings.scaleAr}%</span></label>
                       <input type="range" min="50" max="100" value={appSettings.scaleAr} onChange={(e) => setAppSettings(prev => ({...prev, scaleAr: parseInt(e.target.value)}))} className="w-full accent-amber-500" />
                    </div>
                    <div className="bg-white p-3 rounded border border-amber-100">
                       <label className="flex justify-between text-sm font-bold text-slate-800 mb-2"><span className="flex items-center gap-2">🇫🇷 تصغير/تكبير (الفرنسية) <button onClick={() => handleAutoFit('fr')} className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-700 px-1.5 py-0.5 rounded">احتواء</button></span> <span>{appSettings.scaleFr}%</span></label>
                       <input type="range" min="50" max="100" value={appSettings.scaleFr} onChange={(e) => setAppSettings(prev => ({...prev, scaleFr: parseInt(e.target.value)}))} className="w-full accent-amber-500" />
                    </div>
                  </div>
                </section>

                <section className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-indigo-900 flex items-center gap-2"><Type size={18}/> إعدادات الخط والأقسام</h3>
                    <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-1 rounded font-bold">النسخة: {editLang === 'ar' ? 'العربية 🇸🇦' : 'الفرنسية 🇫🇷'}</span>
                  </div>

                  <div className="bg-white p-3 rounded border border-indigo-100 mb-4">
                     <label className="flex justify-between text-sm font-bold text-slate-800 mb-2"><span>حجم الخط الأساسي</span> <span>{editLang === 'ar' ? appSettings.fontSizeAr : appSettings.fontSizeFr}px</span></label>
                     <input type="range" min="10" max="24" value={editLang === 'ar' ? appSettings.fontSizeAr : appSettings.fontSizeFr} onChange={(e) => setAppSettings(prev => ({...prev, [editLang === 'ar' ? 'fontSizeAr' : 'fontSizeFr']: parseInt(e.target.value)}))} className="w-full accent-indigo-600" />
                  </div>

                  <p className="text-xs text-indigo-700 mb-3 font-semibold">تحكم بحجم خط كل قسم بشكل مستقل:</p>
                  <div className="space-y-3">
                    {Object.keys(sectionNames).map(secId => {
                      const activeSecSizes = editLang === 'ar' ? appSettings.sectionSizesAr : appSettings.sectionSizesFr;
                      const sizeKey = editLang === 'ar' ? 'sectionSizesAr' : 'sectionSizesFr';
                      return (
                      <div key={secId} className="bg-white p-2.5 rounded border border-indigo-100 shadow-sm">
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>{sectionNames[secId]}</span>
                          <span>{activeSecSizes?.[secId] || 100}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="60" 
                          max="140" 
                          value={activeSecSizes?.[secId] || 100} 
                          onChange={(e) => setAppSettings(prev => ({
                            ...prev, 
                            [sizeKey]: {
                              ...prev[sizeKey],
                              [secId]: parseInt(e.target.value)
                            }
                          }))} 
                          className="w-full accent-indigo-600 cursor-pointer" 
                        />
                      </div>
                    )})}
                  </div>
                </section>

                <section className="bg-purple-50 p-4 rounded-xl border border-purple-200 shadow-sm">
                  <h3 className="font-bold text-purple-900 mb-4 flex items-center gap-2"><Move size={18}/> ترتيب أقسام السيرة</h3>
                  <div className="flex flex-col gap-2">
                    {sectionOrder.map((section, index) => (
                      <div key={section} className="flex justify-between items-center bg-white p-3 border border-purple-100 rounded-lg shadow-sm">
                        <span className="font-bold text-sm text-slate-800">{sectionNames[section]}</span>
                        <div className="flex items-center gap-1 bg-slate-50 rounded-md border p-1" dir="ltr">
                          <button onClick={() => moveSectionOrder(index, 'up')} disabled={index === 0} className={`p-1 rounded transition-colors ${index === 0 ? 'opacity-30 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-200 hover:text-blue-600'}`} title="نقل للأعلى"><ArrowUp size={16}/></button>
                          <div className="w-px h-4 bg-slate-300 mx-1"></div>
                          <button onClick={() => moveSectionOrder(index, 'down')} disabled={index === sectionOrder.length - 1} className={`p-1 rounded transition-colors ${index === sectionOrder.length - 1 ? 'opacity-30 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-200 hover:text-blue-600'}`} title="نقل للأسفل"><ArrowDown size={16}/></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'templates' && (
              <div className="animate-fade-in space-y-3">
                <h2 className="font-bold mb-4">أبرز القوالب</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'classic', name: '1. كلاسيكي (ATS 100%)', desc: 'نصي، بدون أعمدة.' },
                    { id: 'modern', name: '2. عصري (30/70)', desc: 'شريط جانبي رمادي يسار.' },
                    { id: 'corporate', name: '3. شركات (Header)', desc: 'ترويسة علوية ملونة.' },
                    { id: 'creative', name: '4. إبداعي (Dark Side)', desc: 'شريط جانبي أسود.' },
                    { id: 'academic', name: '5. أكاديمي (Centered)', desc: 'توسيط كامل.' },
                    { id: 'timeline', name: '6. مسار زمني', desc: 'نقاط زمنية.' },
                    { id: 'right-sidebar', name: '7. شريط أيمن', desc: 'الشريط الجانبي يمين.' },
                    { id: 'cards', name: '8. بطاقات مظللة', desc: 'الخبرات داخل مربعات بيضاء.' },
                    { id: 'geometric', name: '9. هندسي مائل', desc: 'ترويسة مائلة حديثة.' },
                    { id: 'minimalist', name: '10. بسيط جداً', desc: 'مساحات بيضاء واسعة.' },
                    { id: 'startup', name: '11. جريء (Startup)', desc: 'تباين عالي وألوان قوية.' },
                    { id: 'tech', name: '12. تقني (Tech)', desc: 'مناسب للمهندسين.' },
                    { id: 'luxury', name: '13. فاخر (Luxury)', desc: 'أنيق وهادئ.' },
                    { id: 'executive', name: '14. تنفيذي', desc: 'ترويسة مقسومة.' },
                    { id: 'sleek', name: '15. انسيابي', desc: 'نظيف ومرتب.' },
                    { id: 'dark-elegant', name: '16. داكن أنيق', desc: 'خلفية سوداء بالكامل.' },
                    { id: 'journal', name: '17. الجريدة', desc: 'تنسيق الصحف الكلاسيكية.' },
                    { id: 'split-header', name: '18. ترويسة مقسومة', desc: 'ترويسة من لونين.' },
                    { id: 'boxed', name: '19. صناديق', desc: 'كل قسم في إطار.' },
                    { id: 'modern-minimal', name: '20. عصري مبسط', desc: 'كلاسيكي حديث.' },
                    { id: 'two-tone', name: '21. ثنائي اللون', desc: 'شريط جانبي ملون.' },
                    { id: 'ribbon', name: '22. الشريط', desc: 'شريط علوي.' },
                    { id: 'avatar-centered', name: '23. صورة مركزية', desc: 'توسيط للصورة.' },
                    { id: 'grid-layout', name: '24. شبكي', desc: 'تنسيق المربعات.' },
                    { id: 'terminal', name: '25. مبرمج', desc: 'شاشة سوداء بخطوط.' },
                    { id: 'compact', name: '26. مضغوط', desc: 'هوامش ضيقة.' },
                    { id: 'stripe', name: '27. مخطط', desc: 'ترويسة مخططة.' },
                    { id: 'asymmetrical', name: '28. غير متماثل', desc: 'توزيع غير تقليدي.' },
                    { id: 'professional-ats', name: '29. احترافي ATS', desc: 'لعبور الفلاتر بدقة.' },
                    { id: 'rounded', name: '30. دائري', desc: 'حواف ناعمة.' },
                    { id: 'overlay', name: '31. تراكب', desc: 'تداخل مع الترويسة.' },
                    { id: 'minimalist-split', name: '32. انقسام بسيط', desc: 'عمودين بدون خلفيات.' },
                    { id: 'harvard', name: '33. هارفارد', desc: 'كلاسيكي جامعي 100%.' },
                  ].map(tmpl => (
                    <div key={tmpl.id} onClick={() => setActiveTemplate(tmpl.id)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${activeTemplate === tmpl.id ? 'border-blue-600 bg-blue-50 shadow-md scale-[1.01]' : 'border-slate-200 hover:border-blue-300'}`}>
                      <h3 className="font-bold text-md text-slate-800">{tmpl.name}</h3>
                      <p className="text-xs opacity-70 mt-1">{tmpl.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'ats' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
               <h2 className="text-xl font-bold mb-2 text-slate-800">تحليل التوافق (ATS)</h2>
               <textarea placeholder="الصق الوصف الوظيفي هنا..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="w-full p-4 border rounded h-40 focus:ring-2 outline-none mb-4" />
               <button onClick={analyzeATS} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded">فحص التوافق</button>
               {atsAnalysis && (
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-bold mb-2 text-emerald-600">نتيجة المطابقة: {atsAnalysis.score}%</h3>
                  </div>
               )}
              </div>
            )}
          </div>
        </div>

        {/* Print Preview Area */}
        <div className="flex-1 bg-slate-200 overflow-y-auto p-4 flex flex-col items-center gap-8 print-area custom-scrollbar">
          
          <div 
            id={`cv-render-${printBilingual ? 'ar' : editLang}`}
            className="cv-page-container relative shadow-2xl print:shadow-none bg-white origin-top transition-all" 
            style={{ 
              width: `${vWidthActive}mm`, 
              minHeight: `${vHeightActive}mm`,
              zoom: activeScaleFactor,
              backgroundImage: `linear-gradient(to bottom, transparent 0, transparent ${vHeightActive - 0.5}mm, #ef4444 ${vHeightActive - 0.5}mm, transparent ${vHeightActive}mm)`,
              backgroundSize: `100% ${vHeightActive}mm`
            }}
          >
            {renderLayout(printBilingual ? resumeDataAr : activeData, printBilingual ? 'ar' : editLang)}
          </div>

          {printBilingual && (
            <div 
              id="cv-render-fr"
              className="cv-page-container relative shadow-2xl print:shadow-none bg-white origin-top transition-all mt-8 print:mt-0" 
              style={{ 
                width: `${vWidthFr}mm`, 
                minHeight: `${vHeightFr}mm`,
                zoom: frScaleFactor,
                backgroundImage: `linear-gradient(to bottom, transparent 0, transparent ${vHeightFr - 0.5}mm, #ef4444 ${vHeightFr - 0.5}mm, transparent ${vHeightFr}mm)`,
                backgroundSize: `100% ${vHeightFr}mm`
              }}
            >
              {renderLayout(resumeDataFr, 'fr')}
            </div>
          )}

        </div>

      </main>
        );
      })()}
    </div>
  );
};

export default AtsCvBuilder;
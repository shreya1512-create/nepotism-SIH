const { useState, useEffect } = React;


// Supabase Initialization (Placeholder for actual URL and Key)
const supabaseUrl = 'https://xbkfolvziishncdnqcfz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhia2ZvbHZ6aWlzaG5jZG5xY2Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3MTA0NTQsImV4cCI6MjEwMzI4NjQ1NH0.Y-Mc6SizVDlHr-9fkEuyTquJaehRu8AVFaRvE7PmyZw';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Components
const Navbar = ({ currentView, setView }) => (
  <nav className="navbar">
    <div className="container navbar-content">
      <div className="logo" onClick={() => setView('home')} style={{cursor: 'pointer'}}>
        <i data-lucide="brain-circuit" style={{width: 28, height: 28, color: "var(--primary)"}}></i>
        <span>Sahāy <span style={{fontWeight: 300, color: 'var(--text-muted)'}}>AI</span></span>
      </div>
      <div className="nav-links">
        <a className={`nav-item ${currentView === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>Home</a>
        <a className={`nav-item ${currentView === 'wizard' ? 'active' : ''}`} onClick={() => setView('wizard')}>Recommender</a>
        <a className={`nav-item ${currentView === 'schemes' ? 'active' : ''}`} onClick={() => setView('schemes')}>Schemes</a>
        <a className={`nav-item ${currentView === 'calculator' ? 'active' : ''}`} onClick={() => setView('calculator')}>Calculator</a>
        <a className={`nav-item ${currentView === 'locator' ? 'active' : ''}`} onClick={() => setView('locator')}>Partner Locator</a>
      </div>
    </div>
  </nav>
);

const Home = ({ setView }) => (
  <div className="container hero">
    <div className="badge badge-primary mb-4 animate-fade-in stagger-1">SIH 26092 Prototype</div>
    <h1 className="animate-fade-in stagger-2">
      Empowering Marginalized Entrepreneurs with <span className="text-gradient">AI-Driven Scheme Matching</span>
    </h1>
    <p className="animate-fade-in stagger-3">
      Sahāy bridges the gap between government initiatives and the people who need them most. 
      Use our conversational AI to discover tailored financial assistance and support schemes instantly.
    </p>
    <div className="flex gap-4 animate-fade-in stagger-3 justify-center">
      <button className="btn btn-primary" onClick={() => setView('wizard')}>
        <i data-lucide="sparkles" style={{width: 20, height: 20}}></i>
        Smart Scheme Recommender
      </button>
      <button className="btn btn-outline" onClick={() => setView('calculator')}>
        <i data-lucide="calculator" style={{width: 20, height: 20}}></i>
        Financial Calculator
      </button>
      <button className="btn btn-outline" onClick={() => setView('locator')}>
        <i data-lucide="map-pin" style={{width: 20, height: 20}}></i>
        Partner Locator
      </button>
    </div>

    <div className="grid grid-cols-3 gap-4 mt-6 animate-fade-in" style={{marginTop: '80px'}}>
      <div className="glass-card text-center">
        <i data-lucide="message-square" style={{width: 32, height: 32, color: "var(--primary)", margin: "0 auto", display: "block", marginBottom: 16}}></i>
        <h3>Conversational AI</h3>
        <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Multilingual wizard that talks to you to determine eligibility without complex forms.</p>
      </div>
      <div className="glass-card text-center">
        <i data-lucide="brain-circuit" style={{width: 32, height: 32, color: "var(--secondary)", margin: "0 auto", display: "block", marginBottom: 16}}></i>
        <h3>Hybrid Match Engine</h3>
        <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Rule-based & AI hybrid system ensuring accurate mapping to government schemes.</p>
      </div>
      <div className="glass-card text-center">
        <i data-lucide="map-pin" style={{width: 32, height: 32, color: "var(--accent)", margin: "0 auto", display: "block", marginBottom: 16}}></i>
        <h3>Partner Locator</h3>
        <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Geo-spatial tagging to find nearby NGOs and CSCs for immediate assistance.</p>
      </div>
    </div>
  </div>
);

const Wizard = ({ setView }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! I am Sahāy AI. I will help you find government schemes tailored for your business. To start, what is your age and gender?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = '';
      if (messages.length === 1) {
        aiResponse = 'Thank you. Are you planning to start a new business, or do you already own one? What is the estimated cost of your project?';
      } else if (messages.length === 3) {
        aiResponse = 'Great! What is your annual family income? Do you belong to any special category such as SC/ST or OBC? (Note: Beneficiaries with income up to ₹5.00 Lakhs are eligible for highly concessional rates).';
      } else {
        aiResponse = 'Perfect! Based on your profile, I have found 3 highly relevant schemes for you. Let me show you.';
        setTimeout(() => setView('schemes'), 3000);
      }
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="container">
      <div className="wizard-container glass animate-fade-in" style={{padding: '32px'}}>
        <h2 className="mb-2 flex items-center gap-2">
          <i data-lucide="sparkles" style={{color: "var(--primary)"}}></i> 
          Smart Scheme Recommender
        </h2>
        <p className="mb-6" style={{color: 'var(--text-muted)'}}>Answer a few simple questions in your preferred language to find eligible schemes.</p>
        
        <div className="chat-window" style={{minHeight: '300px', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px'}}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.role === 'user' ? 'user-message' : ''}`}>
              <div className={`chat-avatar ${msg.role === 'ai' ? 'ai-avatar' : 'user-avatar'}`}>
                {msg.role === 'ai' ? <i data-lucide="brain-circuit" style={{width: 20, height: 20}}></i> : <span style={{fontSize: '0.8rem'}}>You</span>}
              </div>
              <div className={`chat-bubble ${msg.role === 'ai' ? 'ai-bubble' : 'user-bubble'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="chat-message">
               <div className="chat-avatar ai-avatar">
                 <i data-lucide="brain-circuit" style={{width: 20, height: 20}}></i>
               </div>
               <div className="chat-bubble ai-bubble flex gap-2">
                 <span className="dot-typing">...</span>
               </div>
             </div>
          )}
        </div>

        <form className="input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Type your response here..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
          />
          <button type="submit" className="btn btn-primary" disabled={isTyping}>
            <i data-lucide="send" style={{width: 18, height: 18}}></i>
          </button>
        </form>
      </div>
    </div>
  );
};

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  useEffect(() => {
    supabase.from('schemes').select('*').then(({ data }) => setSchemes(data || []));
  }, []);

  return (
    <div className="container animate-fade-in" style={{paddingTop: '40px'}}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2>Matched Schemes</h2>
          <p style={{color: 'var(--text-muted)'}}>Based on your AI profile, here are the most relevant government schemes.</p>
        </div>
        <div className="badge badge-success flex items-center gap-2" style={{padding: '8px 16px', fontSize: '0.9rem'}}>
          <i data-lucide="check-circle" style={{width: 16, height: 16}}></i> Profile Complete
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {schemes.map((scheme, idx) => (
          <div key={idx} className={`glass-card stagger-${idx + 1} animate-fade-in`} style={{position: 'relative', overflow: 'hidden'}}>
            <div style={{
              position: 'absolute', top: 0, right: 0, 
              background: 'linear-gradient(135deg, var(--success), #059669)', 
              color: 'white', padding: '4px 12px', 
              borderBottomLeftRadius: '12px', fontWeight: 'bold', fontSize: '0.8rem'
            }}>
              {scheme.match}% Match
            </div>
            <h3 className="mt-2">{scheme.name}</h3>
            <p className="mb-4 mt-2" style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{scheme.description}</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              {scheme.tags.map(tag => (
                <span key={tag} className="badge badge-primary">{tag}</span>
              ))}
            </div>
            <button className="btn btn-outline" style={{width: '100%'}}>
              View Details & Apply <i data-lucide="chevron-right" style={{width: 16, height: 16}}></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const LoanCalculator = () => {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6.5); // Concessional rate
  const [tenure, setTenure] = useState(60); // Months
  const [emi, setEmi] = useState(0);
  
  useEffect(() => {
    // EMI Formula: E = P x R x (1+R)^N / [(1+R)^N-1]
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure);
    
    if(p && r && n) {
      const e = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(e.toFixed(2));
    } else {
      setEmi(0);
    }
  }, [amount, rate, tenure]);

  return (
    <div className="container animate-fade-in" style={{paddingTop: '40px', maxWidth: '800px'}}>
      <h2 className="mb-2 flex items-center gap-2">
        <i data-lucide="calculator" style={{color: "var(--secondary)"}}></i>
        Financial Calculator
      </h2>
      <p className="mb-6" style={{color: 'var(--text-muted)'}}>Calculate projected EMIs accounting for specific scheme guidelines (e.g. concessional rates 6.5% - 8%).</p>
      
      <div className="glass-card grid grid-cols-2 gap-4">
        <div>
          <div className="input-group">
            <label>Loan Amount (₹)</label>
            <input type="number" className="chat-input" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Interest Rate (%) - *Concessional*</label>
            <input type="number" step="0.1" className="chat-input" value={rate} onChange={e => setRate(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Tenure (Months)</label>
            <input type="number" className="chat-input" value={tenure} onChange={e => setTenure(e.target.value)} />
          </div>
        </div>
        
        <div className="glass flex flex-col justify-center items-center" style={{padding: '24px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)'}}>
          <h3 style={{color: 'var(--text-muted)', marginBottom: '8px'}}>Estimated Monthly EMI</h3>
          <h1 className="text-gradient" style={{fontSize: '3rem'}}>₹{emi}</h1>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '16px'}}>Total Amount Payable: ₹{(emi * tenure).toFixed(2)}</p>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Total Interest: ₹{((emi * tenure) - amount).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

const PartnerLocator = () => {
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    supabase.from('channel_partners').select('*').then(({ data }) => setPartners(data || []));
  }, []);

  return (
    <div className="container animate-fade-in" style={{paddingTop: '40px'}}>
      <h2 className="mb-2 flex items-center gap-2">
        <i data-lucide="map-pin" style={{color: "var(--accent)"}}></i>
        Geo-Spatial Partner Locator
      </h2>
      <p className="mb-6" style={{color: 'var(--text-muted)'}}>Identify the nearest eligible Channel Partner (SCA/Bank/NBFC-MFI) to route your application.</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card" style={{minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'url("https://maps.wikimedia.org/osm-intl/12/2928/1723.png") center/cover'}}>
          {/* Mock Map View */}
          <div style={{background: 'rgba(10,10,15,0.8)', padding: '12px', borderRadius: '8px', backdropFilter: 'blur(4px)'}}>
            Mock Interactive Map 
          </div>
        </div>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {partners.map((p, idx) => (
            <div key={idx} className={`glass-card stagger-${idx+1} animate-fade-in`} style={{padding: '16px'}}>
              <div className="flex justify-between items-center">
                <h3>{p.name}</h3>
                <span className="badge badge-primary">{p.distance}</span>
              </div>
              <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', margin: '4px 0'}}>{p.type}</p>
              <div className="flex items-center gap-2 mt-2">
                <div style={{width: '8px', height: '8px', borderRadius: '50%', background: p.status === 'Optimal' ? 'var(--success)' : 'var(--warning)'}}></div>
                <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Fund Status: {p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentView, setView] = useState('home');

  useEffect(() => {
    // Re-render lucide icons after view change
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [currentView]);

  return (
    <>
      <Navbar currentView={currentView} setView={setView} />
      <main>
        {currentView === 'home' && <Home setView={setView} />}
        {currentView === 'wizard' && <Wizard setView={setView} />}
        {currentView === 'schemes' && <Schemes />}
        {currentView === 'calculator' && <LoanCalculator />}
        {currentView === 'locator' && <PartnerLocator />}
      </main>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

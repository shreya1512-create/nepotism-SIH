import re
import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace Wizard Component
wizard_replacement = '''const Wizard = ({ setView, formData, setFormData }) => {
  const [step, setStep] = useState(1);

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else {
      setTimeout(() => setView('schemes'), 500);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="container">
      <div className="wizard-container glass animate-fade-in" style={{padding: '32px', maxWidth: '600px'}}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="flex items-center gap-2 m-0" style={{margin:0}}>
            <i data-lucide="file-search" style={{color: "var(--primary)"}}></i> 
            Application Form
          </h2>
          <div className="badge badge-primary">Step {step} of 2</div>
        </div>
        
        <form onSubmit={handleNext}>
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <label>Age</label>
                  <input type="number" name="age" className="chat-input" value={formData.age} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Gender</label>
                  <select name="gender" className="chat-input" value={formData.gender} onChange={handleChange}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2 mb-6">
                <div className="input-group">
                  <label>Social Category</label>
                  <select name="category" className="chat-input" value={formData.category} onChange={handleChange}>
                    <option>SC</option>
                    <option>ST</option>
                    <option>OBC</option>
                    <option>General</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Requirement Type</label>
                  <select name="loanType" className="chat-input" value={formData.loanType} onChange={handleChange}>
                    <option>Business Loan</option>
                    <option>Education Loan</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
                Next Step <i data-lucide="chevron-right" style={{width: 18, height: 18}}></i>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <div className="input-group mt-2">
                <label>Annual Family Income (?)</label>
                <input type="number" name="income" className="chat-input" value={formData.income} onChange={handleChange} required />
              </div>

              <div className="input-group mt-2 mb-6">
                <label>Estimated Project/Education Cost (?)</label>
                <input type="number" name="cost" className="chat-input" value={formData.cost} onChange={handleChange} required />
              </div>

              <div className="flex gap-4">
                <button type="button" className="btn btn-outline" onClick={() => setStep(1)} style={{flex: 1}}>
                  Back
                </button>
                <button type="submit" className="btn btn-primary" style={{flex: 2}}>
                  <i data-lucide="sparkles" style={{width: 18, height: 18}}></i> Find Schemes
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};'''

html = re.sub(r'const Wizard =.*?};(.*?)const Schemes', wizard_replacement + '\\n\\nconst Schemes', html, flags=re.DOTALL)

# Replace Schemes Component
schemes_replacement = '''const Schemes = ({ setView, formData }) => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = supabase.from('schemes').select('*');
    
    // Strict match engine
    if (formData.category !== 'General') {
      query = query.or(	arget_category.eq.,target_category.eq.ALL);
    } else {
      query = query.eq('target_category', 'ALL');
    }
    
    if (formData.loanType) {
      query = query.eq('loan_type', formData.loanType);
    }

    query.then(({ data, error }) => {
      setSchemes(data || []);
      setLoading(false);
    });
  }, [formData]);

  if (loading) {
    return <div className="container text-center mt-6">Loading schemes...</div>;
  }

  return (
    <div className="container animate-fade-in" style={{paddingTop: '40px'}}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <button className="btn btn-outline mb-4" onClick={() => setView('wizard')} style={{padding: '6px 12px', fontSize: '0.85rem'}}>
            &larr; Back to Profile
          </button>
          <h2>Matched Schemes</h2>
          <p style={{color: 'var(--text-muted)'}}>Based on your exact profile, here are the strictly matched schemes.</p>
        </div>
        <div className="badge badge-success flex items-center gap-2" style={{padding: '8px 16px', fontSize: '0.9rem'}}>
          <i data-lucide="check-circle" style={{width: 16, height: 16}}></i> {schemes.length} Found
        </div>
      </div>

      {schemes.length === 0 ? (
        <div className="glass-card text-center" style={{padding: '40px'}}>
          <h3>No perfect matches found</h3>
          <p style={{color: 'var(--text-muted)'}}>Try adjusting your category or requirement type in your profile.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {schemes.map((scheme, idx) => (
            <div key={scheme.id} className={glass-card stagger- animate-fade-in} style={{position: 'relative', overflow: 'hidden'}}>
              <div style={{
                position: 'absolute', top: 0, right: 0, 
                background: 'linear-gradient(135deg, var(--success), #059669)', 
                color: 'white', padding: '4px 12px', 
                borderBottomLeftRadius: '12px', fontWeight: 'bold', fontSize: '0.8rem'
              }}>
                Eligible
              </div>
              <h3 className="mt-2">{scheme.name}</h3>
              <p className="mb-4 mt-2" style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{scheme.description}</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {scheme.tags && scheme.tags.map(tag => (
                  <span key={tag} className="badge badge-primary">{tag}</span>
                ))}
              </div>
              <button className="btn btn-outline" style={{width: '100%'}}>
                View Details & Apply <i data-lucide="chevron-right" style={{width: 16, height: 16}}></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};'''

html = re.sub(r'const Schemes =.*?};(.*?)const LoanCalculator', schemes_replacement + '\\n\\nconst LoanCalculator', html, flags=re.DOTALL)

# Replace App Component State
app_replacement = '''const App = () => {
  const [currentView, setView] = useState('home');
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    category: 'SC',
    loanType: 'Business Loan',
    income: '',
    cost: ''
  });

  useEffect(() => {
    // Re-render lucide icons after view change
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [currentView, formData]); // Also re-render icons if formData changes (e.g. step changes)

  return (
    <>
      <Navbar currentView={currentView} setView={setView} />
      <main>
        {currentView === 'home' && <Home setView={setView} />}
        {currentView === 'wizard' && <Wizard setView={setView} formData={formData} setFormData={setFormData} />}
        {currentView === 'schemes' && <Schemes setView={setView} formData={formData} />}
        {currentView === 'calculator' && <LoanCalculator />}
        {currentView === 'locator' && <PartnerLocator />}
      </main>
    </>
  );
};'''

html = re.sub(r'const App =.*?};', app_replacement, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

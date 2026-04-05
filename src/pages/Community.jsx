import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useT } from '../context/LanguageContext';
import { FiDownload, FiUser, FiCalendar, FiSearch, FiTrendingUp } from 'react-icons/fi';
import { showToast } from '../components/UIFeedback/Toast';
import CustomModal from '../components/UIFeedback/CustomModal';
import BuildCard from '../components/BuildCard';
import './Community.css';

export default function Community() {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: () => {} });
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { t } = useT();

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'https://mhur-backend.onrender.com';
    fetch(`${API_URL}/api/builds`)
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a,b) => (b.imports || 0) - (a.imports || 0));
        setBuilds(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching builds:", err);
        showToast(t('community_load_err'), "error");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleImportBuild = async (buildId) => {
    const currentlyBlocked = localStorage.getItem('mhur_import_blocked_until');
    if (currentlyBlocked && Date.now() < parseInt(currentlyBlocked)) {
      const timeLeft = Math.ceil((parseInt(currentlyBlocked) - Date.now()) / 1000);
      showToast(t('community_spam', timeLeft), "error");
      return;
    }

    let attemptsStr = localStorage.getItem('mhur_import_attempts');
    let attempts = attemptsStr ? JSON.parse(attemptsStr) : [];
    const now = Date.now();
    attempts = attempts.filter(time => now - time < 10000);
    attempts.push(now);
    
    if (attempts.length >= 4) {
      localStorage.setItem('mhur_import_blocked_until', (now + 60000).toString());
      localStorage.setItem('mhur_import_attempts', JSON.stringify([]));
      showToast(t('community_spam_block'), "error");
      return;
    }
    
    localStorage.setItem('mhur_import_attempts', JSON.stringify(attempts));

    try {
      showToast(t('community_loading_build'), "info");
      const API_URL = import.meta.env.VITE_API_URL || 'https://mhur-backend.onrender.com';
      
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const resp = await fetch(`${API_URL}/api/builds/${buildId}`, { headers });
      if (!resp.ok) throw new Error("Build not found");
      const detailedBuild = await resp.json();
      navigate('/creator', { state: { importedBuild: detailedBuild.build_data } });
    } catch (error) {
       showToast(t('community_load_build_err'), "error");
    }
  };

  const filteredBuilds = builds.filter(build => {
    const s = searchTerm.toLowerCase();
    const charMatch = build.character_name ? build.character_name.toLowerCase().includes(s) : false;
    const tagMatch = build.tags ? build.tags.some(tag => tag.toLowerCase().includes(s)) : false;
    const creatorMatch = build.creator_name ? build.creator_name.toLowerCase().includes(s) : false;
    return charMatch || tagMatch || creatorMatch;
  });

  const isSearching = searchTerm.trim().length > 0;
  const popularBuilds = !isSearching ? filteredBuilds.slice(0, 10) : [];
  const mainListSource = !isSearching ? filteredBuilds.slice(10) : filteredBuilds;
  
  const totalPages = Math.ceil(mainListSource.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBuilds = mainListSource.slice(startIndex, endIndex);

  const getPaginationGroup = () => {
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + 4, totalPages);
    if (end - start < 4) start = Math.max(end - 4, 1);
    return Array.from({ length: (end - start) + 1 }, (_, idx) => start + idx);
  };

  return (
    <main className="main-content community-page-container" style={{ display: 'block' }}>
      <CustomModal 
        {...modalConfig} 
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))} 
      />

      <section className="glass-panel community-section" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div className="community-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FiTrendingUp style={{ color: '#10b981' }} /> {t('community_title')}
            </h2>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
              {t('community_subtitle')}
            </p>
          </div>
          
          <div className="community-search-wrapper glass-panel">
            <FiSearch style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder={t('community_search')} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="community-search-input"
            />
          </div>
        </div>
      </section>

      {loading ? (
        <div className="loading-container" style={{ textAlign: 'center', padding: '3rem' }}>{t('community_loading')}</div>
      ) : (
        <div className="community-scroll-area">
          
          {!isSearching && popularBuilds.length > 0 && currentPage === 1 && (
            <div className="popular-section-container" style={{ marginBottom: '3rem' }}>
               <h3 className="section-title-label" style={{ 
                 marginBottom: '1.5rem', 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '0.6rem',
                 fontSize: '1.4rem',
                 color: '#10b981'
               }}>
                 {t('community_top10')}
               </h3>
               <div className="builds-grid">
                  {popularBuilds.map(build => (
                    <BuildCard key={build._id} build={build} onImport={handleImportBuild} />
                  ))}
               </div>
            </div>
          )}

          <div className="all-builds-section">
            <h3 className="section-title-label" style={{ 
              marginBottom: '1.5rem', 
              fontSize: '1.4rem', 
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}>
              {isSearching ? t('community_results', searchTerm) : t('community_recent')}
            </h3>
            
            {displayedBuilds.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                {t('community_no_results')}
              </p>
            ) : (
              <>
                <div className="builds-grid">
                  {displayedBuilds.map(build => (
                    <BuildCard key={build._id} build={build} onImport={handleImportBuild} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="pagination-container">
                    <button 
                      className="pagination-btn arrow" 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                      {t('community_prev')}
                    </button>
                    
                    {getPaginationGroup().map(page => (
                      <button 
                        key={page} 
                        className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}

                    <button 
                      className="pagination-btn arrow" 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                      {t('community_next')}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

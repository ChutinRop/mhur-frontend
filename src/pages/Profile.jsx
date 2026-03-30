import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { showToast } from '../components/UIFeedback/Toast';
import { useNavigate } from 'react-router-dom';
import TunerSlotsGrid from '../components/TunerSlotsGrid';
import BuildCard from '../components/BuildCard';
import CustomModal from '../components/UIFeedback/CustomModal';
import '../pages/Community.css'; // Para reusar los estilos de las cartas

const Profile = () => {
  const { user, token, isLoading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [claimedBuilds, setClaimedBuilds] = useState([]);
  const [unclaimedBuilds, setUnclaimedBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: () => {} });

  useEffect(() => {
    if (authLoading) return; // Esperar a que el Contexto lea el LocalStorage

    if (!user || !token) {
      navigate('/');
      return;
    }

    fetchProfileData();
  }, [user, token, authLoading, navigate]);

  const fetchProfileData = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/users/me/builds`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setClaimedBuilds(data.claimed_builds || []);
        setUnclaimedBuilds(data.unclaimed_builds || []);
      }
    } catch (error) {
      console.error(error);
      showToast('Error cargando el perfil', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClaimAll = async () => {
    const buildIds = unclaimedBuilds.map(b => b._id);
    if (buildIds.length === 0) return;

    setClaiming(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/api/users/me/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ buildIds })
      });

      if (res.ok) {
        showToast('¡Builds reclamadas exitosamente!', 'success');
        fetchProfileData();
      } else {
        const data = await res.json();
        showToast(data.error || 'Error al reclamar', 'error');
      }
    } catch (error) {
      showToast('Error de conexión', 'error');
    } finally {
      setClaiming(false);
    }
  };

  const handleDelete = (id) => {
    setModalConfig({
      isOpen: true,
      type: 'confirm',
      title: 'Borrar Build',
      message: '¿Estás seguro de que deseas borrar esta build permanentemente? Esta acción no se puede deshacer.',
      onConfirm: async () => {
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
          const res = await fetch(`${API_URL}/api/builds/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (res.ok) {
            showToast('Build borrada permanentemente', 'success');
            fetchProfileData();
          } else {
            const data = await res.json();
            showToast(data.error || 'Error al borrar', 'error');
          }
        } catch (error) {
          showToast('Error de conexión', 'error');
        }
      }
    });
  };

  const handleEditBuild = (build) => {
    navigate('/creator', { 
      state: { 
        importedBuild: build.build_data, 
        isEditMode: true, 
        editBuildId: build._id 
      } 
    });
  };

  if (loading) return <div style={{color:'white', textAlign:'center', marginTop:'50px'}}>Cargando Perfil...</div>;

  return (
    <div style={{ padding: '20px', color: 'white', maxWidth: '1000px', margin: '0 auto' }}>
      <CustomModal 
        {...modalConfig} 
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))} 
      />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
        <img src={user?.avatar} alt="Avatar" style={{width: 80, height: 80, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)'}} />
        <div>
          <h1 style={{margin:0, fontSize: '2rem'}}>{user?.username}</h1>
          <p style={{margin: '5px 0 0 0', opacity: 0.6}}>Perfil de Tuner de MHUR</p>
        </div>
      </div>

      {unclaimedBuilds.length > 0 && (
        <div style={{ background: 'rgba(88, 101, 242, 0.1)', border: '1px solid #5865F2', padding: '20px', borderRadius: '12px', marginBottom: '40px' }}>
          <h2 style={{color: '#5865F2', margin: '0 0 10px 0'}}>¡Atención! Encontramos builds antiguas</h2>
          <p style={{margin: '0 0 20px 0'}}>
            El sistema detectó <strong>{unclaimedBuilds.length} builds</strong> creadas bajo el nombre "{user?.username}" antes del sistema de Login con Discord. 
            ¿Quieres asociarlas permanentemente a tu cuenta de Discord?
          </p>
          <button 
            onClick={handleClaimAll} 
            disabled={claiming}
            className="action-btn publish-btn"
            style={{ backgroundColor: '#5865F2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {claiming ? 'Reclamando...' : 'Reclamar mis builds'}
          </button>
        </div>
      )}

      <h2>Mis Builds Reclamadas ({claimedBuilds.length})</h2>
      {claimedBuilds.length === 0 ? (
        <p style={{opacity: 0.5}}>No tienes builds creadas o reclamadas en tu cuenta.</p>
      ) : (
        <div className="builds-grid">
          {claimedBuilds.map(build => (
            <BuildCard 
              key={build._id} 
              build={build} 
              onEdit={handleEditBuild} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;

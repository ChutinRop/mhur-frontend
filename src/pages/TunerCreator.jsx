import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiSave, FiUploadCloud, FiShare2 } from 'react-icons/fi';
import CharacterSelector from '../components/CharacterSelector';
import TunerSlotsGrid from '../components/TunerSlotsGrid';
import TuningSelectorModal from '../components/TuningSelectorModal';
import StatsSummaryPanel from '../components/StatsSummaryPanel';
import { showToast } from '../components/UIFeedback/Toast';
import CustomModal from '../components/UIFeedback/CustomModal';
import { generateTags } from '../utils/tagGenerator';

export default function TunerCreator() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const location = useLocation();
  
  // Tuner Grid States
  const [activeSlotIndex, setActiveSlotIndex] = useState(null);
  const [activeSlotData, setActiveSlotData] = useState(null);
  const [isTuningModalOpen, setIsTuningModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  // The actual build: mapping of slotIndex -> tuningObject
  const [characterBuild, setCharacterBuild] = useState({});
  const [slotLevels, setSlotLevels] = useState({});
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: () => {} });

  // Handle imported build from Community page
  useEffect(() => {
    if (location.state && location.state.importedBuild) {
      console.log("Loading imported build:", location.state.importedBuild);
      const { selectedCharacter, characterBuild, slotLevels } = location.state.importedBuild;
      setSelectedCharacter(selectedCharacter);
      setCharacterBuild(characterBuild);
      setSlotLevels(slotLevels);
      
      // Clear state so it doesn't re-import on refresh/navigation
      window.history.replaceState({}, document.title);
      showToast("Build importada correctamente", "success");
    }
  }, [location.state]);

  const handleSlotClick = ({ index, data }) => {
    setActiveSlotIndex(index);
    setActiveSlotData(data);
    setIsTuningModalOpen(true);
  };

  const handleSelectTuning = (tuning) => {
    setCharacterBuild(prev => ({
      ...prev,
      [activeSlotIndex]: tuning
    }));
    setSlotLevels(prev => ({
      ...prev,
      [activeSlotIndex]: 1
    }));
  };

  const handleRemoveTuning = (e, index) => {
    e.stopPropagation();
    setCharacterBuild(prev => ({
      ...prev,
      [index]: null
    }));
    setSlotLevels(prev => ({
      ...prev,
      [index]: 1
    }));
  };

  const handleLevelChange = (e, index, delta, maxLevel) => {
    e.stopPropagation();
    setSlotLevels(prev => {
      const current = prev[index] || 1;
      const next = Math.max(1, Math.min(maxLevel, current + delta));
      return { ...prev, [index]: next };
    });
  };

  const handleMaxAllLevels = () => {
    if (!selectedCharacter || !selectedCharacter._entrada) return;
    const updatedLevels = { ...slotLevels };
    const ranuras = selectedCharacter._entrada.ranuras || [];

    Object.entries(characterBuild).forEach(([slotId, tuning]) => {
      if (!tuning) return;
      let maxLevel = 1;
      if (slotId === 'left-special') {
        maxLevel = 10;
      } else if (slotId === 'right-special') {
        maxLevel = 11;
      } else {
        const numericId = parseInt(slotId, 10);
        let slotData;
        if (numericId >= 1 && numericId <= 5) slotData = ranuras[numericId];
        else if (numericId >= 6 && numericId <= 10) slotData = ranuras[numericId + 1];
        if (slotData) maxLevel = (slotData.rol === 'Universal') ? 3 : 4;
        else maxLevel = 3;
      }
      updatedLevels[slotId] = maxLevel;
    });
    setSlotLevels(updatedLevels);
    showToast("¡Tunnings mejorados al máximo!", "success");
  };

  const handleCharacterChange = (newChar) => {
    setSelectedCharacter(newChar);
    setCharacterBuild({});
    setSlotLevels({});
    setActiveSlotIndex(null);
    setActiveSlotData(null);
    setIsTuningModalOpen(false);
  };

  const handleExportBuild = () => {
    if (!selectedCharacter) {
      setModalConfig({
        isOpen: true,
        type: 'alert',
        title: 'Atención',
        message: 'Selecciona un personaje primero para poder exportar la build.',
        onConfirm: () => {}
      });
      return;
    }
    const buildData = {
      characterName: selectedCharacter._entrada?.nombre_completo || selectedCharacter.nombre_completo,
      selectedCharacter,
      characterBuild,
      slotLevels
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(buildData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `MHUR_Build_${buildData.characterName.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showToast("Build exportada localmente", "info");
  };

  const handleImportBuild = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (importedData.selectedCharacter && importedData.characterBuild && importedData.slotLevels) {
          setSelectedCharacter(importedData.selectedCharacter);
          setCharacterBuild(importedData.characterBuild);
          setSlotLevels(importedData.slotLevels);
          showToast("¡Build importada exitosamente!", "success");
        } else {
          showToast("El archivo no tiene el formato correcto", "error");
        }
      } catch (error) {
        showToast("Error al leer el archivo JSON", "error");
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handlePublishBuild = async () => {
    const currentlyBlocked = localStorage.getItem('mhur_publish_blocked_until');
    if (currentlyBlocked && Date.now() < parseInt(currentlyBlocked)) {
      const timeLeft = Math.ceil((parseInt(currentlyBlocked) - Date.now()) / 1000);
      showToast(`Límite alcanzado. Espera ${timeLeft} segundos antes de volver a publicar.`, "error");
      return;
    }

    let attemptsStr = localStorage.getItem('mhur_publish_attempts');
    let attempts = attemptsStr ? JSON.parse(attemptsStr) : [];
    
    const now = Date.now();
    // Maintain a 30-second window to count 3 clicks
    attempts = attempts.filter(time => now - time < 30000);
    attempts.push(now);
    
    if (attempts.length >= 3) {
      localStorage.setItem('mhur_publish_blocked_until', (now + 60000).toString()); // 1 minute block
      localStorage.setItem('mhur_publish_attempts', JSON.stringify([]));
      showToast("Límite de spam alcanzado. Publicaciones bloqueadas por 1 minuto.", "error");
      return;
    }
    
    localStorage.setItem('mhur_publish_attempts', JSON.stringify(attempts));

    if (!selectedCharacter) {
      setModalConfig({
        isOpen: true,
        type: 'alert',
        title: 'Atención',
        message: 'Selecciona un personaje primero para poder publicar en la nube.',
        onConfirm: () => {}
      });
      return;
    }

    const creatorName = localStorage.getItem('mhur_username');
    if (!creatorName) {
      setModalConfig({
        isOpen: true,
        type: 'alert',
        title: 'Identificación Necesaria',
        message: "Por favor, identifícate primero en el botón 'Identificarse' del menú superior para poder publicar.",
        onConfirm: () => {}
      });
      return;
    }

    const buildData = {
      characterName: selectedCharacter._entrada?.nombre_completo || selectedCharacter.nombre_completo,
      selectedCharacter,
      characterBuild,
      slotLevels
    };

    const tags = generateTags(characterBuild, slotLevels);

    try {
      showToast("Publicando build...", "info");
      const response = await fetch('http://localhost:3001/api/builds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          character_name: buildData.characterName,
          creator_name: creatorName,
          build_data: buildData,
          tags: tags
        }),
      });

      if (response.ok) {
        showToast(`¡Build de ${buildData.characterName} publicada en la nube!`, "success");
      } else {
        const errorData = await response.json();
        if (response.status === 409) {
          setModalConfig({
            isOpen: true,
            type: 'alert',
            title: 'Configuración Duplicada',
            message: errorData.error,
            onConfirm: () => {}
          });
        } else {
          showToast(`Error: ${errorData.error || 'Fallo de publicación'}`, "error");
        }
      }
    } catch (error) {
      showToast("No se pudo conectar con el servidor", "error");
    }
  };

  return (
    <main className="main-content">
      <CustomModal 
        {...modalConfig} 
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))} 
      />

      <div className="left-column">
        <section className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Configuración de Personaje</h2>
          <CharacterSelector selectedChar={selectedCharacter} setSelectedChar={handleCharacterChange} />
        </section>

        {selectedCharacter?._entrada && (
          <section className="glass-panel" style={{ padding: '2rem', paddingBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <h2>Ranuras de Equipamiento</h2>
              <button className="max-all-btn" onClick={handleMaxAllLevels} title="Mejorar al máximo">Max.</button>
            </div>
            <TunerSlotsGrid 
              selectedChar={selectedCharacter}
              activeSlotIndex={activeSlotIndex}
              onSlotClick={handleSlotClick}
              characterBuild={characterBuild}
              slotLevels={slotLevels}
              onRemoveTuning={handleRemoveTuning}
              onLevelChange={handleLevelChange}
            />
          </section>
        )}
      </div>

      <aside className="right-column glass-panel" style={{ padding: '2rem', position: 'sticky', top: '2rem' }}>
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0 }}>
            Resumen {selectedCharacter && <span style={{fontSize: '1rem', color: 'var(--color-rapid)', marginLeft: '10px'}}>{selectedCharacter._entrada?.nombre_completo || selectedCharacter.nombre_completo}</span>}
          </h2>
          <div style={{ display: 'flex', gap: '15px' }}>
            <FiUploadCloud className="icon-btn" title="Importar" onClick={() => fileInputRef.current && fileInputRef.current.click()} />
            <input type="file" accept=".json" style={{ display: 'none' }} ref={fileInputRef} onChange={handleImportBuild} />
            <FiSave className="icon-btn" style={{ color: 'var(--color-rapid)' }} title="Exportar" onClick={handleExportBuild} />
            <FiShare2 className="icon-btn" style={{ color: 'var(--color-tecnico)' }} title="Publicar" onClick={handlePublishBuild} />
          </div>
        </div>
        <StatsSummaryPanel characterBuild={characterBuild} slotLevels={slotLevels} />
      </aside>

      <TuningSelectorModal 
        isOpen={isTuningModalOpen}
        onClose={() => setIsTuningModalOpen(false)}
        slotData={activeSlotData}
        characterData={selectedCharacter?._entrada}
        characterBuild={characterBuild}
        activeSlotIndex={activeSlotIndex}
        onSelectTuning={handleSelectTuning}
      />
    </main>
  );
}

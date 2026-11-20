/**
 * components/ProfilePage/ProfileMain.tsx
 * Composant principal de la page profil utilisateur
 */

import React from 'react';
import UserCard from './UserCard';
import { useUser } from '../../hooks/useUser';
import { mapApiUserToUserCard, getUserDescription } from '../../utils/userMapper';
import './ProfileMain.css';

interface ProfileMainProps {
  userId: number; // ID de l'utilisateur à afficher
}

const ProfileMain: React.FC<ProfileMainProps> = ({ userId }) => {
  // Utilisation du hook personnalisé pour récupérer les données
  const { user, loading, error, refetch } = useUser(userId);

  // État de chargement
  if (loading) {
    return (
      <main className="profile-main">
        <div className="profile-main__loading">
          <div className="spinner"></div>
          <p>Chargement du profil...</p>
        </div>
      </main>
    );
  }

  // Gestion des erreurs
  if (error) {
    return (
      <main className="profile-main">
        <div className="profile-main__error">
          <p className="error-message">❌ {error}</p>
          <button onClick={refetch} className="retry-button">
            Réessayer
          </button>
        </div>
      </main>
    );
  }

  // Si aucun utilisateur n'est trouvé
  if (!user) {
    return (
      <main className="profile-main">
        <div className="profile-main__empty">
          <p>Aucun utilisateur trouvé</p>
        </div>
      </main>
    );
  }

  // Conversion des données API vers le format UserCard
  const userCardData = mapApiUserToUserCard(user);
  const description = getUserDescription(user);

  // 🎭 DONNÉES RÉALISTES POUR ADA LOVELACE (inspirées de l'histoire)
  const demoData = {
    competences: [
      "Mathématiques avancées",
      "Logique algorithmique",
      "Programmation analytique",
      "Traduction scientifique",
      "Notation mathématique",
      "Pensée computationnelle"
    ],
    besoins: [
      "Collaboration avec ingénieurs mécaniques",
      "Accès à des machines de calcul",
      "Échange avec des mathématiciens",
      "Financement pour recherches",
      "Documentation de systèmes complexes",
      "Mentorat scientifique"
    ],
  };

  return (
    <main className="profile-main">
      <div className="profile-main__container">
        {/* Section gauche : Carte utilisateur */}
        <aside className="profile-main__sidebar">
          <UserCard {...userCardData} />
        </aside>

        {/* Section droite : Contenu principal */}
        <section className="profile-main__content">
          {/* Section "À propos de moi" */}
          <div className="about-section">
            <h2 className="section-title">À propos de moi</h2>
            <p className="about-text">{description}</p>
          </div>

          {/* Compétences et Besoins */}
          <div className="competences-besoins-wrapper">
            {/* Section Compétences */}
            <div className="section-card">
              <h3 className="section-card__title">Mes Compétences & expertises</h3>
              <ul className="section-card__list">
                {demoData.competences.map((competence, index) => (
                  <li key={index}>{competence}</li>
                ))}
              </ul>
            </div>

            {/* Section Besoins */}
            <div className="section-card">
              <h3 className="section-card__title">Mes Besoins</h3>
              <ul className="section-card__list">
                {demoData.besoins.map((besoin, index) => (
                  <li key={index}>{besoin}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Bouton pour recharger les données (optionnel - pour debug) */}
      {process.env.NODE_ENV === 'development' && (
        <button onClick={refetch} className="debug-reload">
          🔄 Recharger
        </button>
      )}
    </main>
  );
};

export default ProfileMain;
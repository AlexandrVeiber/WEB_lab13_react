import { useState } from 'react';

function TourCard({ tour }) {
    const [imageError, setImageError] = useState(false);

    const showPhoto = tour.photo && !imageError;

    return (
        <article className="tour-item-card">
            {showPhoto ? (
                <div className="tour-photo-wrap">
                    <img
                        src={tour.photo}
                        alt={tour.title}
                        className="tour-photo"
                        onError={() => setImageError(true)}
                    />
                </div>
            ) : (
                <div className="tour-photo-wrap tour-photo-placeholder">
                    <span>Новосибирск-Тур</span>
                </div>
            )}

            <div className="tour-item-top">
                <h3>
                    <a href="#tour-detail">{tour.title}</a>
                </h3>
                <span className="badge">{tour.status}</span>
            </div>

            <p className="tour-item-text">{tour.description}</p>

            <div className="tour-meta-list">
                <span>⏱ {tour.duration}</span>
                <span>📍 {tour.directionTitle}</span>
                <span>💳 {tour.price}</span>
            </div>

            <div className="card-actions">
                <a href="#tour-detail" className="btn btn-secondary">
                    Открыть
                </a>
            </div>
        </article>
    );
}

export default TourCard;
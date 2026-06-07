import TourCard from './TourCard';

function TourList({ tours }) {
    if (tours.length === 0) {
        return (
            <div className="page-card empty-state">
                Туры не найдены.
            </div>
        );
    }

    return (
        <div className="tour-grid">
            {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
            ))}
        </div>
    );
}

export default TourList;
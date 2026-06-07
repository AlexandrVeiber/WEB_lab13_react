import { useState } from 'react';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SortPanel from './components/SortPanel';
import TourList from './components/TourList';
import AddTourForm from './components/AddTourForm';
import { initialTours } from './data/tours';

const directionTitles = {
    city: 'Городские экскурсии',
    siberia: 'Туры по Сибири',
    weekend: 'Туры выходного дня',
};

function getPriceNumber(price) {
    return Number.parseInt(String(price).replace(/\D/g, ''), 10) || 0;
}

function App() {
    const [tours, setTours] = useState(initialTours);
    const [selectedDirection, setSelectedDirection] = useState('');
    const [selectedSort, setSelectedSort] = useState('new');

    const visibleTours = [...tours]
        .filter((tour) => {
            if (!selectedDirection) {
                return true;
            }

            return tour.direction === selectedDirection;
        })
        .sort((a, b) => {
            if (selectedSort === 'old') {
                return a.id - b.id;
            }

            if (selectedSort === 'title') {
                return a.title.localeCompare(b.title, 'ru');
            }

            if (selectedSort === 'price') {
                return getPriceNumber(a.price) - getPriceNumber(b.price);
            }

            return b.id - a.id;
        });

    function handleResetFilters() {
        setSelectedDirection('');
        setSelectedSort('new');
    }

    function handleAddTour(newTourData) {
        const nextId = tours.length
            ? Math.max(...tours.map((tour) => tour.id)) + 1
            : 1;

        const newTour = {
            id: nextId,
            title: newTourData.title.trim(),
            slug: newTourData.slug.trim().toLowerCase(),
            description: newTourData.description.trim() || 'Описание тура не указано.',
            duration: newTourData.duration.trim(),
            price: `${getPriceNumber(newTourData.price)} руб.`,
            direction: newTourData.direction,
            directionTitle: directionTitles[newTourData.direction],
            category: newTourData.category,
            tags: ['Новый тур'],
            status: 'Опубликовано',
            photo: newTourData.photo.trim(),
        };

        setTours((currentTours) => [newTour, ...currentTours]);
        setSelectedDirection('');
        setSelectedSort('new');
    }

    return (
        <>
            <Header />
            <Navbar />

            <main className="page-wrap">
                <div className="layout">
                    <Sidebar tours={tours} />

                    <section className="main-block">
                        <div className="content-header">
                            <div>
                                <h1>Турагентство «Новосибирск-Тур»</h1>
                                <p className="lead">
                                    Подбор туров и экскурсий по Новосибирску и Сибири
                                </p>
                            </div>
                        </div>

                        <div className="stats-row">
                            <div className="mini-stat">
                                <span className="mini-stat-label">Направлений</span>
                                <strong>3</strong>
                            </div>

                            <div className="mini-stat">
                                <span className="mini-stat-label">Найдено туров</span>
                                <strong>{visibleTours.length}</strong>
                            </div>
                        </div>

                        <SortPanel
                            selectedDirection={selectedDirection}
                            selectedSort={selectedSort}
                            onDirectionChange={setSelectedDirection}
                            onSortChange={setSelectedSort}
                            onReset={handleResetFilters}
                        />

                        <h2 className="section-title">Туры из массива данных</h2>

                        <TourList tours={visibleTours} />

                        <AddTourForm
                            onAddTour={handleAddTour}
                            existingSlugs={tours.map((tour) => tour.slug)}
                        />
                    </section>
                </div>
            </main>

            <footer className="site-footer">
                <p>© 2026 Турагентство «Новосибирск-Тур»</p>
            </footer>
        </>
    );
}

export default App;
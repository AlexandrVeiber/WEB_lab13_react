function Sidebar({ tours }) {
    const categories = [
        'Городские экскурсии',
        'Туры выходного дня',
        'Туры по Сибири',
    ];

    const tags = [
        'Активный',
        'Выходного дня',
        'Популярный',
        'Семейный',
        'Экскурсионный',
    ];

    const popularTours = tours.slice(0, 3);

    return (
        <aside className="sidebar">
            <div className="side-card categories-menu">
                <h3>Категории</h3>

                <ul className="side-list">
                    {categories.map((category, index) => (
                        <li key={category} className={index === 0 ? 'selected' : ''}>
                            {index === 0 ? (
                                <span>{category}</span>
                            ) : (
                                <a href="#category">{category}</a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="side-card tags-menu">
                <h3>Теги</h3>

                <ul className="side-list">
                    {tags.map((tag) => (
                        <li key={tag}>
                            <a href="#tag">{tag}</a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="side-card popular-services">
                <h3>Популярные туры</h3>

                <ul className="side-list">
                    {popularTours.map((tour) => (
                        <li key={tour.id}>
                            <a href="#popular">{tour.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
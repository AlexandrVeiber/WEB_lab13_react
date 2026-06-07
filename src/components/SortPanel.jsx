function SortPanel({
    selectedDirection,
    selectedSort,
    onDirectionChange,
    onSortChange,
    onReset,
}) {
    return (
        <div className="page-card filter-panel">
            <h2 className="section-title">Фильтрация и сортировка туров</h2>

            <form className="filter-form">
                <div className="form-group">
                    <label htmlFor="direction">Направление</label>
                    <select
                        id="direction"
                        className="form-select"
                        value={selectedDirection}
                        onChange={(event) => onDirectionChange(event.target.value)}
                    >
                        <option value="">Все направления</option>
                        <option value="city">Городские экскурсии</option>
                        <option value="siberia">Туры по Сибири</option>
                        <option value="weekend">Туры выходного дня</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="sort">Сортировка</label>
                    <select
                        id="sort"
                        className="form-select"
                        value={selectedSort}
                        onChange={(event) => onSortChange(event.target.value)}
                    >
                        <option value="new">Сначала новые</option>
                        <option value="old">Сначала старые</option>
                        <option value="title">По названию</option>
                        <option value="price">По стоимости</option>
                    </select>
                </div>

                <div className="filter-actions">
                    <button type="button" className="btn btn-light" onClick={onReset}>
                        Сбросить
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SortPanel;
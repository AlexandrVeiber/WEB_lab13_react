import { useState } from 'react';

const initialFormState = {
    title: '',
    slug: '',
    description: '',
    duration: '',
    price: '',
    direction: '',
    category: '',
    photo: '',
};

function validateForm(values, existingSlugs) {
    const errors = {};
    const normalizedSlug = values.slug.trim().toLowerCase();

    if (!values.title.trim()) {
        errors.title = 'Введите название тура.';
    } else if (values.title.trim().length < 5) {
        errors.title = 'Название должно содержать минимум 5 символов.';
    } else if (values.title.trim().length > 50) {
        errors.title = 'Название не должно превышать 50 символов.';
    }

    if (!values.slug.trim()) {
        errors.slug = 'Введите URL тура.';
    } else if (!/^[a-zA-Z0-9_-]{5,100}$/.test(values.slug.trim())) {
        errors.slug = 'URL должен содержать латинские буквы, цифры, дефис или подчёркивание.';
    } else if (existingSlugs.includes(normalizedSlug)) {
        errors.slug = 'Тур с таким URL уже существует.';
    }

    if (!values.duration.trim()) {
        errors.duration = 'Введите продолжительность тура.';
    }

    if (!values.price.trim()) {
        errors.price = 'Введите стоимость тура.';
    } else if (!/\d/.test(values.price)) {
        errors.price = 'Стоимость должна содержать число.';
    }

    if (!values.direction) {
        errors.direction = 'Выберите направление.';
    }

    if (!values.category) {
        errors.category = 'Выберите категорию.';
    }

    if (values.photo.trim() && !/^https?:\/\//i.test(values.photo.trim())) {
        errors.photo = 'Ссылка на фото должна начинаться с http:// или https://.';
    }

    return errors;
}

function AddTourForm({ onAddTour, existingSlugs }) {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    function handleChange(event) {
        const { name, value } = event.target;

        const updatedFormData = {
            ...formData,
            [name]: value,
        };

        setFormData(updatedFormData);

        if (isSubmitted) {
            setErrors(validateForm(updatedFormData, existingSlugs));
        }

        if (successMessage) {
            setSuccessMessage('');
        }
    }

    function handleReset() {
        setFormData(initialFormState);
        setErrors({});
        setIsSubmitted(false);
        setSuccessMessage('');
    }

    function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validateForm(formData, existingSlugs);
        setErrors(validationErrors);
        setIsSubmitted(true);

        if (Object.keys(validationErrors).length > 0) {
            setSuccessMessage('');
            return;
        }

        onAddTour(formData);

        setSuccessMessage(`Тур «${formData.title.trim()}» успешно добавлен.`);
        setFormData(initialFormState);
        setErrors({});
        setIsSubmitted(false);
    }

    function getFieldClass(fieldName, baseClassName) {
        return errors[fieldName]
            ? `${baseClassName} is-invalid`
            : baseClassName;
    }

    return (
        <div className="page-card form-page-card add-tour-form-card">
            <h2 className="section-title">Добавление нового тура</h2>

            <p className="lead">
                Заполните форму, чтобы добавить новую запись в список туров.
            </p>

            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="title">Название тура</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className={getFieldClass('title', 'form-control')}
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Например: Обзорная экскурсия"
                        />
                        {errors.title && (
                            <div className="field-error">{errors.title}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="slug">URL тура</label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            className={getFieldClass('slug', 'form-control')}
                            value={formData.slug}
                            onChange={handleChange}
                            placeholder="overview-tour"
                        />
                        {errors.slug && (
                            <div className="field-error">{errors.slug}</div>
                        )}
                    </div>

                    <div className="form-group form-group-wide">
                        <label htmlFor="description">Описание</label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Краткое описание тура"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration">Продолжительность</label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            className={getFieldClass('duration', 'form-control')}
                            value={formData.duration}
                            onChange={handleChange}
                            placeholder="4 часа"
                        />
                        {errors.duration && (
                            <div className="field-error">{errors.duration}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Стоимость</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            className={getFieldClass('price', 'form-control')}
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="4000"
                        />
                        {errors.price && (
                            <div className="field-error">{errors.price}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="direction">Направление</label>
                        <select
                            id="direction"
                            name="direction"
                            className={getFieldClass('direction', 'form-select')}
                            value={formData.direction}
                            onChange={handleChange}
                        >
                            <option value="">Направление не выбрано</option>
                            <option value="city">Городские экскурсии</option>
                            <option value="siberia">Туры по Сибири</option>
                            <option value="weekend">Туры выходного дня</option>
                        </select>
                        {errors.direction && (
                            <div className="field-error">{errors.direction}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Категория</label>
                        <select
                            id="category"
                            name="category"
                            className={getFieldClass('category', 'form-select')}
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">Категория не выбрана</option>
                            <option value="Городские экскурсии">Городские экскурсии</option>
                            <option value="Туры выходного дня">Туры выходного дня</option>
                            <option value="Туры по Сибири">Туры по Сибири</option>
                        </select>
                        {errors.category && (
                            <div className="field-error">{errors.category}</div>
                        )}
                    </div>

                    <div className="form-group form-group-wide">
                        <label htmlFor="photo">Ссылка на фото</label>
                        <input
                            type="text"
                            id="photo"
                            name="photo"
                            className={getFieldClass('photo', 'form-control')}
                            value={formData.photo}
                            onChange={handleChange}
                            placeholder="https://example.com/photo.jpg"
                        />
                        {errors.photo && (
                            <div className="field-error">{errors.photo}</div>
                        )}
                    </div>
                </div>

                <div className="card-actions form-actions">
                    <button type="submit" className="btn btn-primary">
                        Добавить тур
                    </button>

                    <button type="button" className="btn btn-light" onClick={handleReset}>
                        Очистить
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTourForm;
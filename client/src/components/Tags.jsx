import { tagGroups } from '../../utils/tagsList'

export default function TagsDropdown({ value, onChange }) {
    const toggleTag = (tag) => {
        onChange(
            value.includes(tag)
                ? value.filter((selected) => selected !== tag)
                : [...value, tag]
        )
    }

    return (
        <div className="tag-filter">
            {value.length > 0 && (
                <div className="tag-filter-summary">
                    <span>{value.length} selected</span>
                    <button type="button" className="btn btn-link btn-sm p-0" onClick={() => onChange([])}>
                        Clear
                    </button>
                </div>
            )}

            {tagGroups.map((group) => (
                <fieldset key={group.label} className="tag-filter-group">
                    <legend>{group.label}</legend>
                    <p>{group.description}</p>
                    <div className="tag-filter-pills">
                        {group.tags.map((tag) => {
                            const selected = value.includes(tag)
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    className={`tag-filter-pill ${selected ? 'is-selected' : ''}`}
                                    onClick={() => toggleTag(tag)}
                                    aria-pressed={selected}
                                >
                                    {selected && <i className="bi bi-check2" aria-hidden="true" />}
                                    {tag}
                                </button>
                            )
                        })}
                    </div>
                </fieldset>
            ))}
        </div>
    )
}

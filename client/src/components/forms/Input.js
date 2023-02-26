export default function Input({ label, value, setValue, type }) {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input value={value} onChange={(e) => setValue(e.target.value)} type={type} className="form-control" />
        </div>
    )
}
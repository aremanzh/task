export default function Input(props) {
    return (
        <div className="mb-3">
            <label class="form-label">Email address</label>
            <input value={props.email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" />
        </div>
    )
}
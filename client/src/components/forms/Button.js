import LoadingGif from "../../images/loading.gif";

export default function Button({ name = "", email, password = "", loading }) {
  return (
    <button type="submit"
      className="btn btn-primary"
      disabled={(name && !name) || !email || email < 6 || (password && password.length < 6)}>
      {loading ? <img src={LoadingGif} alt="loading" style={{ height: "20px" }} /> : "Submit"}
    </button>
  )
}
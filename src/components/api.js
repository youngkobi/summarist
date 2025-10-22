import AudioDurationLoader from "./AudioDurationLoader"

async function fetchBooks() {
  const res = await fetch(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
  );
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export default async function SelectedPage() {
  const books = await fetchBooks();

  return (
    <div className="selected-box-container">
      <h2 className="section-title">Selected just for you</h2>

      {/* Pass books data to client component */}
      <AudioDurationLoader books={books} />
    </div>
  );
}

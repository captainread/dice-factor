export default function Comment({ fetchedComments }) {
  return (
    <main>
      {fetchedComments.length === 0
        ? "Be the first to leave a comment."
        : fetchedComments.map((comment) => {
            return <p>{comment.body}</p>;
          })}
    </main>
  );
}

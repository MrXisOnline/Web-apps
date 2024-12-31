export default function Joke(props) {
  return (
    <div>
      <h1>{props.setup}</h1>
      <p>{props.punchline}</p>
        <p>Upvotes: {props.upvotes}</p>
        <p>Downvotes: {props.downvotes}</p>
    </div>
  );
}
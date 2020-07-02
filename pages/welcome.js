import { useCurrentUser } from '../lib/hooks';

function Home({ user }) {
  if (user) {
    return <span />;
  }

  return (
    <div>
      <h1>Welcome</h1>
      <p>
        Endless is a dating site that finds your perfect match according to your
        own custom preferences
      </p>
      <p>
        To find your perfect match, we'll compare the answers you give on a
        large stack of questions against other users of Endless. Want to give it
        a try?
      </p>
      <p>
        <a href="/register">Sign up</a> / <a href="/login">log in</a> now!
      </p>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  // const res = await fetch(`http://localhost:3000/api/list`)
  // const data = await res.json()

  // return { props: { data } }
  console.log(req.session);
  return { props: {} };
}

export default Home;

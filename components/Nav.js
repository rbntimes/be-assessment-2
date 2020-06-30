function Nav(user) {
  if (user) {
    return (
      <nav>
        <a href="/question">Questions</a>
        <a href="/">Matches</a>
        <a href="/ownquestions">Your questions</a>
        <a href="/profile">Profile</a>
      </nav>
    );
  }

  return null;
}

export default Nav;

function User({ user }) {
  return (
    <div>
      <img
        src={`https://randomuser.me/api/portraits/${
          user.gender === 'femal' ? 'women' : 'men'
        }/${user.age}.jpg`}
      />
      <h1>
        {user.name},{user.age}
      </h1>
      <div>
        <a href="/users/_id/chat>">Chat met {user.name}</a>
      </div>
    </div>
  );
}

export default User;

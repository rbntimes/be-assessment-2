function List({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li>
          <a href={`/user/${user._id}`}>
            <h3>
              {user.name}, {user.age}
            </h3>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default List;

// <div class="status">
//   <span>
//     <% if (data[index].match === true) { %>
//       <a href="/users/<%= data[index].id %>/<%= data[index].match === true ? 'match' : 'questions' %>">
//         Open chat
//       </a>
//       ❤️ ✍️
//     <% } else { %>
//       <%= data[index].unlocked && data[index].completed === true ? "Waiting ⭐️" : '' %>
//       <%= !data[index].unlocked && data[index].completed === true ? "Failed 🚫" : '' %>
//     <% } %>
//   </span>
//   <h3> <%= index + 1 %></h3>
// </div>
// </div>
// <p class=meta>
// <span><%= data[index].matchPercentage %>% match!</span>
// <span><%= data[index].distance %> kilometer</span>
// </p>

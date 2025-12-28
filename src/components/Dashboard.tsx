export default function Dashboard() {
  return (
    <main role="dashboard">
      <aside role="navigation">
        <nav>
          <h2>Navigation</h2>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#profile">Profile</a>
            </li>
            <li>
              <a href="#settings">Settings</a>
            </li>
            <li>
              <a href="#analytics">Analytics</a>
            </li>
          </ul>
        </nav>
      </aside>

      <section role="main">
        <header>
          <h1>Dashboard</h1>
        </header>

        <article>
          <p>Main content area goes here</p>
        </article>
      </section>
    </main>
  );
}

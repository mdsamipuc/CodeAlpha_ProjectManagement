<h1>📁 Project Management App</h1>

<p>A modern full-stack <strong>Project Management System</strong> built with <strong>Laravel</strong>, <strong>React</strong>, <strong>Inertia.js</strong>, and <strong>Tailwind CSS</strong>. This application empowers teams to manage projects, assign and track tasks, collaborate via comments, and monitor user responsibilities in a clean, intuitive interface.</p>


<hr>

<h2>✨ Features Overview</h2>

<h3>📂 Projects</h3>
<ul>
  <li>View a list of all projects</li>
  <li>🔍 Filter by: <code>Project Name</code>, <code>Status</code></li>
  <li>↕️ Sort by: <code>ID</code>, <code>Name</code>, <code>Created At</code>, <code>Due Date</code></li>
  <li>🖼️ Project image (stored via Laravel Storage)</li>
  <li>🛠️ Edit and 🗑️ Delete buttons</li>
  <li>Clickable project name to view <strong>Project Details Page</strong> (includes all related tasks)</li>
</ul>

<h3>✅ Tasks</h3>

<h4>All Tasks</h4>
<ul>
  <li>View all tasks across all projects</li>
  <li>🔍 Filter by: <code>Task Name</code>, <code>Status</code></li>
  <li>↕️ Sort by: <code>ID</code>, <code>Name</code>, <code>Created At</code>, <code>Due Date</code></li>
  <li>Columns: <code>Task Name</code>, <code>Project Name</code>, <code>Status</code>, <code>Created At</code>, <code>Due Date</code>, <code>Created By</code>, <code>Image</code></li>
  <li>Clickable <strong>Task Name</strong> opens the <strong>Task Details Page</strong> with:
    <ul>
      <li>Full task info</li>
      <li>💬 Comment section</li>
      <li>Linked project</li>
    </ul>
  </li>
</ul>

<h4>My Tasks</h4>
<ul>
  <li>Shows tasks assigned to the logged-in user</li>
  <li>Grouped by task status with progress format:
    <pre>
Pending Tasks:        2 / 5
In Progress Tasks:    3 / 7
Completed Tasks:      6 / 6
    </pre>
    <em>(Displayed as Completed / Total — dynamic values)</em>
  </li>
  <li>🔍 Filter by: <code>Task Name</code>, <code>Status</code></li>
  <li>↕️ Sort by: <code>ID</code>, <code>Name</code>, <code>Created At</code>, <code>Due Date</code></li>
</ul>

<h3>👤 Users</h3>
<ul>
  <li>Paginated list of all users</li>
  <li>🔍 Filter by: <code>Name</code>, <code>Email</code></li>
  <li>↕️ Sort by: <code>ID</code>, <code>Name</code>, <code>Email</code></li>
</ul>

<hr>

<h2>🔄 Pagination</h2>
<p>Pagination is implemented on:</p>
<ul>
  <li>✅ All Tasks</li>
  <li>📂 Projects</li>
  <li>🧑‍💻 My Tasks</li>
  <li>👤 Users</li>
</ul>

<hr>

<h2>🧰 Tech Stack</h2>
<table>
  <thead>
    <tr>
      <th>Layer</th>
      <th>Technology</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Backend</td>
      <td><a href="https://laravel.com/" target="_blank" rel="noopener noreferrer">Laravel</a></td>
    </tr>
    <tr>
      <td>Frontend</td>
      <td><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> + <a href="https://inertiajs.com/" target="_blank" rel="noopener noreferrer">Inertia.js</a></td>
    </tr>
    <tr>
      <td>Styling</td>
      <td><a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">Tailwind CSS</a></td>
    </tr>
    <tr>
      <td>Auth</td>
      <td>Laravel Breeze</td>
    </tr>
    <tr>
      <td>Database</td>
      <td>MySQL</td>
    </tr>
    <tr>
      <td>Storage</td>
      <td>Laravel <code>public/storage</code> for project/task images</td>
    </tr>
  </tbody>
</table>

<hr>

<h2>🛠️ Setup Instructions</h2>

<h3>1. Clone the Repository</h3>
<pre><code>git clone https://github.com/mdsamipuc/CodeAlpha_ProjectManagement.git
cd CodeAlpha_ProjectManagement
</code></pre>

<h3>2. Backend Setup</h3>
<pre><code>composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan storage:link
</code></pre>
<p>⚠️ Make sure to update your <code>.env</code> file with database credentials and app settings before migrating.</p>

<h3>3. Frontend Setup</h3>
<pre><code>npm install
</code></pre>

<h3>4. Run Development Servers</h3>

<h4>Run both backend and frontend together:</h4>
<pre><code>composer run dev
</code></pre>

<h4>Or run separately:</h4>
<pre><code># Backend
php artisan serve

# Frontend
npm run dev
</code></pre>

<hr>

<h2>🖼️ Image Uploads</h2>
<ul>
  <li>All images (projects and tasks) are stored in <code>storage/app/public</code></li>
  <li>Served through <code>public/storage</code> using:
    <pre><code>php artisan storage:link
</code></pre>
  </li>
</ul>

<hr>

<h2>💬 Task Comments</h2>
<p>Each task has a comment section for:</p>
<ul>
  <li>Updates</li>
  <li>Collaboration</li>
  <li>Communication between team members</li>
</ul>

<hr>

<h2>🤝 Contribution</h2>
<p>We welcome contributions!</p>
<ol>
  <li>Fork this repo</li>
  <li>Create a new branch (<code>feature/your-feature</code>)</li>
  <li>Make your changes</li>
  <li>Submit a pull request</li>
</ol>
<p>For large changes, open an issue first to discuss your proposal.</p>

<hr>

<h2>📄 License</h2>
<p>Licensed under the <strong>MIT License</strong>.<br>
See the <a href="LICENSE" target="_blank" rel="noopener noreferrer">LICENSE</a> file for more details.</p>

<hr>

<h2>🙌 Acknowledgements</h2>
<p>Built with ❤️ by <a href="https://github.com/mdsamipuc" target="_blank" rel="noopener noreferrer">@mdsamipuc</a><br>
Created for the <strong>CodeAlpha Internship Program</strong></p>

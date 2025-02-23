import API_URL from '/constants/utils.js';

const userName = document.querySelector('.username');

document.addEventListener('DOMContentLoaded', () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const token = localStorage.getItem('token');
  const loginButton = document.getElementById('login-button');
  const logoutButton = document.getElementById('logout-button');

  logoutButton.addEventListener('click', () => {
    handleAuthError();
    logoutButton.style.display = 'none';
    userName.style.display = 'none';
  });

  if (token) {
    if (isAdmin) {
      fetchAdminCourses(token)
        .then(() => {
          loginButton.style.display = 'none';
        })
        .catch((error) => {
          console.error('Error fetching admin courses');
          handleAuthError();
        })
        .finally(() => {
          logoutButton.style.display = 'inline-block';
          loginButton.style.display = 'none';
        });
    } else {
      fetchUserCourses(token)
        .then(() => {
          loginButton.style.display = 'none';
          console.log('user here');
        })
        .catch((error) => {
          console.error('Error fetching user courses');
          handleAuthError();
        })
        .finally(() => {
          logoutButton.style.display = 'inline-block';
          loginButton.style.display = 'none';
        });
    }
  }
});

async function fetchAdminCourses(token) {
  const courseCardsContainer = document.querySelector(
    '.course-cards-container'
  );
  try {
    const response = await fetch(`${API_URL}/admin/courses`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.username) localStorage.setItem('username', data.username);
    userName.innerHTML = `${data.username}`;
    console.log('Admin courses fetched:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchAdminCourses:', error);
    throw error;
  }
}

async function fetchUserCourses(token) {
  try {
    const response = await fetch(`${API_URL}/user/courses`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('User courses fetched:', data);
    userName.innerHTML = `${data.username}`;
    userName.style.display = 'inline-block';
    return data;
  } catch (error) {
    console.error('Error in fetchUserCourses:', error);
    throw error;
  }
}

function handleAuthError() {
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');

  const loginButton = document.getElementById('login-button');
  if (loginButton) {
    loginButton.style.display = 'block';
  }
}

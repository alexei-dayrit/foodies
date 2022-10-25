const fetchProfile = async (selectedUserId, token, setProfileInfo) => {
  const headers = { headers: { 'X-Access-Token': token } };

  const [fetchData1, fetchData2] = await Promise.all([
    fetch(`/api/posts/${selectedUserId}`, headers),
    fetch(`/api/user/${selectedUserId}`, headers)
  ]);
  const posts = await fetchData1.json();
  const selectedUser = await fetchData2.json();
  console.log('selectedUser:', selectedUser);

  setProfileInfo(prev => ({
    ...prev,
    posts
  }));

  setProfileInfo(prev => ({
    ...prev,
    selectedUser
  }));
};

export default fetchProfile;

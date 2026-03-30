const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API}/admin/events/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.url;
};

const uploadMultiple = async (files) => {
  const formData = new FormData();

  for (let file of files) {
    formData.append("images", file);
  }

  const res = await fetch(`${API}/admin/events/upload-multiple`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.urls;
};
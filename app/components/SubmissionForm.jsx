const submit = async () => {

const formData = new FormData();

formData.append("name", runner.name);
formData.append("email", runner.email);
formData.append("phone", runner.phone);
formData.append("distance", distance);
formData.append("file", file);

const res = await fetch("/api/submit-run", {
  method: "POST",
  body: formData
});

const data = await res.json();

if(data.error){
  alert(data.error);
}else{
  alert("Submitted successfully");
}
};
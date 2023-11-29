export const uploadFile = async (file) => {
  if (!file) throw new Error("No tenemos ningún archivo para subir");

  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dfzncn1pd/upload";
  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    console.log(response);
    if (!response.ok) throw new Error("No se pudo subir el archivo");

    const cloudinaryResponse = await response.json();
    console.log(cloudinaryResponse);
    return cloudinaryResponse.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

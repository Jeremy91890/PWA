export function ImagesFromPublic() {
  // display images from public folder

  const getImages = () => {
    const images = [];
    for (let i = 1; i <= 20; i++) {
      images.push(`/images/${i}.png`);
    }
    return images;
  };

  return (
    <>
      <h2>Images from public folder</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {getImages().map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>
    </>
  );
}

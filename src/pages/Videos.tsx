import video1 from "../assets/1.mp4";
import video2 from "../assets/2.mp4";

export default function Videos() {
  const videoArray = [video1, video2];

  return (
    <>
      <h2>Videos</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {videoArray.map((video, index) => (
          <video key={index} src={video} controls />
        ))}
      </div>
    </>
  );
}
